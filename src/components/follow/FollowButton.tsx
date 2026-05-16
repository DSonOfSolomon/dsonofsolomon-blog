"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { getPushSubscriptionOptions } from "@/lib/push";

type FollowButtonProps = {
  className: string;
  children?: React.ReactNode;
};

type FollowState = "idle" | "supported" | "subscribed" | "blocked";

export default function FollowButton({
  className,
  children = "Follow",
}: FollowButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<FollowState>("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const devMode =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  useEffect(() => {
    let cancelled = false;

    async function syncSubscriptionState() {
      if (!("Notification" in window) || !("serviceWorker" in navigator)) {
        if (!cancelled) {
          setState("blocked");
          setMessage("This browser does not support push notifications.");
        }
        return;
      }

      if (Notification.permission === "denied") {
        if (!cancelled) {
          setState("blocked");
          setMessage("Notifications are blocked in this browser.");
        }
        return;
      }

      try {
        const registration = await navigator.serviceWorker.getRegistration("/");
        const subscription = await registration?.pushManager.getSubscription();

        if (cancelled) {
          return;
        }

        if (subscription) {
          setState("subscribed");
          setMessage("Notifications are enabled for future writings.");
        } else {
          setState("supported");
          setMessage("");
        }
      } catch {
        if (!cancelled) {
          setState("supported");
          setMessage("");
        }
      }
    }

    void syncSubscriptionState();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleEnable() {
    startTransition(async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        let permission = Notification.permission;

        if (permission !== "granted") {
          permission = await Notification.requestPermission();
        }

        if (permission !== "granted") {
          setState(permission === "denied" ? "blocked" : "supported");
          setMessage("Notifications were not enabled.");
          return;
        }

        const existingSubscription = await registration.pushManager.getSubscription();
        const subscription =
          existingSubscription ??
          (await registration.pushManager.subscribe(getPushSubscriptionOptions()));

        const response = await fetch("/api/followers/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription.toJSON()),
        });

        if (!response.ok) {
          throw new Error("Unable to save follow subscription.");
        }

        setState("subscribed");
        setMessage("Notifications are enabled for future writings.");
        router.refresh();
      } catch {
        setState("blocked");
        setMessage("This browser could not complete notification setup.");
      }
    });
  }

  function handleTestFollow() {
    startTransition(async () => {
      try {
        const endpoint = `test://local-follow-${crypto.randomUUID()}`;
        const response = await fetch("/api/followers/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            endpoint,
            keys: {
              p256dh: `test-p256dh-${crypto.randomUUID()}`,
              auth: `test-auth-${crypto.randomUUID()}`,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Unable to create test follower.");
        }

        setState("subscribed");
        setMessage("Local test follower created.");
        router.refresh();
      } catch {
        setMessage("Could not create a local test follower.");
      }
    });
  }

  function handleTurnOff() {
    startTransition(async () => {
      try {
        const registration = await navigator.serviceWorker.getRegistration("/");
        const subscription = await registration?.pushManager.getSubscription();

        if (subscription) {
          await fetch("/api/followers/unsubscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ endpoint: subscription.endpoint }),
          });
          await subscription.unsubscribe();
        }

        setState("supported");
        setMessage("Notifications are turned off.");
        router.refresh();
      } catch {
        setMessage("Could not turn notifications off here. Use browser settings if needed.");
      }
    });
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {state === "subscribed" ? "Following" : children}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111f]/55 px-6">
          <div className="relative w-full max-w-md rounded-[1.8rem] bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:opacity-60"
              aria-label="Close"
            >
              <FiX size={18} />
            </button>

            <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-500">
              Follow D•sonofSolomon
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-950">
              Enable notifications
            </h2>

            <div className="mt-4.5 space-y-1.5 text-[0.97rem] leading-6 text-gray-600">
              <p>Follow to hear when a new chapter enters the public universe.</p>
              <p>Notifications bring readers straight back into the exact writing.</p>
              <p>You can turn them off anytime in your browser or device settings.</p>
            </div>

            {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {state === "subscribed" ? (
                <button
                  type="button"
                  onClick={handleTurnOff}
                  disabled={isPending}
                  className="inline-flex h-[2.75rem] items-center justify-center rounded-full border border-gray-300 px-5 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900 disabled:opacity-60"
                >
                  Turn off notifications
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEnable}
                  disabled={isPending || state === "blocked"}
                  className="inline-flex h-[2.75rem] items-center justify-center rounded-full bg-[#0a192f] px-5 text-sm font-medium text-white transition-colors hover:bg-[#13294b] disabled:bg-gray-300"
                >
                  {isPending ? "Enabling..." : "Enable notifications"}
                </button>
              )}

              {devMode && state !== "subscribed" && (
                <button
                  type="button"
                  onClick={handleTestFollow}
                  disabled={isPending}
                  className="inline-flex h-[2.75rem] items-center justify-center rounded-full border border-dashed border-[#0a192f] px-5 text-sm font-medium text-[#0a192f] transition-colors hover:bg-[#0a192f]/5 disabled:opacity-60"
                >
                  Create local test follower
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
