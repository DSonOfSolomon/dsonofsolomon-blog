export const PUSH_PUBLIC_KEY =
  "BGgREEECcENJg1gTSNxhFtfbTq9-_2kj2iZZ5kK4Og38kS93EMvXEDuf4J2XZswWUopgaWnXLt_zX-34uwKR7Ls";

export function getPushSubscriptionOptions() {
  return {
    userVisibleOnly: true,
    applicationServerKey: base64UrlToUint8Array(PUSH_PUBLIC_KEY),
  };
}

function base64UrlToUint8Array(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);

  return Uint8Array.from(raw, (character) => character.charCodeAt(0));
}
