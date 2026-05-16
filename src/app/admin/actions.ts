"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  getPrimaryCreator,
  getUniquePostSlug,
} from "@/lib/admin";
import { fallbackSlug } from "@/lib/slugs";

function normalizeOptional(value: FormDataEntryValue | null) {
  const normalized = value?.toString().trim();
  return normalized ? normalized : null;
}

function normalizeRequired(value: FormDataEntryValue | null) {
  return value?.toString().trim() ?? "";
}

async function refreshAdminViews() {
  revalidatePath("/admin");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/subscribers");
  revalidatePath("/admin/letter-requests");
  revalidatePath("/");
  revalidatePath("/writings");
  revalidatePath("/unfiltered");
  revalidatePath("/request-a-letter");
}

export async function createPost(formData: FormData) {
  const creator = await getPrimaryCreator();
  const title = normalizeRequired(formData.get("title"));
  const manualSlug = normalizeOptional(formData.get("slug"));
  const excerpt = normalizeRequired(formData.get("excerpt"));
  const content = normalizeRequired(formData.get("content"));
  const status = normalizeRequired(formData.get("status")) || "draft";
  const universe = normalizeRequired(formData.get("universe")) || "public";
  const chapterLabel = normalizeOptional(formData.get("chapterLabel"));
  const categoryId = normalizeOptional(formData.get("categoryId"));
  const coverImage = normalizeOptional(formData.get("coverImage"));

  if (!title || !excerpt || !content) {
    throw new Error("Title, excerpt, and content are required.");
  }

  const slug = await getUniquePostSlug(creator.id, manualSlug ?? title);

  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      status,
      universe,
      chapterLabel,
      categoryId,
      coverImage,
      creatorId: creator.id,
      publishedAt: status === "published" ? new Date() : null,
    },
  });

  await refreshAdminViews();
  redirect("/admin/posts");
}

export async function updatePost(formData: FormData) {
  const creator = await getPrimaryCreator();
  const id = normalizeRequired(formData.get("id"));
  const title = normalizeRequired(formData.get("title"));
  const manualSlug = normalizeOptional(formData.get("slug"));
  const excerpt = normalizeRequired(formData.get("excerpt"));
  const content = normalizeRequired(formData.get("content"));
  const status = normalizeRequired(formData.get("status")) || "draft";
  const universe = normalizeRequired(formData.get("universe")) || "public";
  const chapterLabel = normalizeOptional(formData.get("chapterLabel"));
  const categoryId = normalizeOptional(formData.get("categoryId"));
  const coverImage = normalizeOptional(formData.get("coverImage"));

  const existing = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      slug: true,
      status: true,
      publishedAt: true,
    },
  });

  if (!existing) {
    throw new Error("Post not found.");
  }

  const nextSlug = manualSlug
    ? await getUniquePostSlug(creator.id, manualSlug, id)
    : existing.status === "published"
      ? existing.slug
      : await getUniquePostSlug(creator.id, title, id);

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug: nextSlug,
      excerpt,
      content,
      status,
      universe,
      chapterLabel,
      categoryId,
      coverImage,
      publishedAt:
        status === "published"
          ? existing.publishedAt ?? new Date()
          : null,
    },
  });

  await refreshAdminViews();
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  const id = normalizeRequired(formData.get("id"));

  await prisma.post.delete({
    where: { id },
  });

  await refreshAdminViews();
}

export async function togglePostStatus(formData: FormData) {
  const id = normalizeRequired(formData.get("id"));
  const nextStatus = normalizeRequired(formData.get("nextStatus"));

  await prisma.post.update({
    where: { id },
    data: {
      status: nextStatus,
      publishedAt: nextStatus === "published" ? new Date() : null,
    },
  });

  await refreshAdminViews();
}

export async function createSubscriber(formData: FormData) {
  const creator = await getPrimaryCreator();
  const email = normalizeRequired(formData.get("email")).toLowerCase();
  const name = normalizeOptional(formData.get("name"));
  const tier = normalizeRequired(formData.get("tier")) || "free";

  if (!email) {
    throw new Error("Email is required.");
  }

  await prisma.subscriber.upsert({
    where: {
      creatorId_email: {
        creatorId: creator.id,
        email,
      },
    },
    update: {
      name,
      tier,
    },
    create: {
      email,
      name,
      tier,
      creatorId: creator.id,
    },
  });

  await refreshAdminViews();
}

export async function deleteSubscriber(formData: FormData) {
  const id = normalizeRequired(formData.get("id"));

  await prisma.subscriber.delete({
    where: { id },
  });

  await refreshAdminViews();
}

export async function createLetterRequest(formData: FormData) {
  const creator = await getPrimaryCreator();
  const name = normalizeRequired(formData.get("name"));
  const email = normalizeRequired(formData.get("email")).toLowerCase();
  const tier = normalizeRequired(formData.get("tier"));
  const message = normalizeRequired(formData.get("message"));

  if (!name || !email || !message || !tier) {
    throw new Error("Name, email, tier, and message are required.");
  }

  await prisma.letterRequest.create({
    data: {
      name,
      email,
      tier,
      message,
      creatorId: creator.id,
    },
  });

  revalidatePath("/request-a-letter");
  revalidatePath("/admin/letter-requests");
  redirect("/request-a-letter?success=1");
}

export async function updateLetterRequestStatus(formData: FormData) {
  const id = normalizeRequired(formData.get("id"));
  const status = normalizeRequired(formData.get("status"));

  await prisma.letterRequest.update({
    where: { id },
    data: { status },
  });

  await refreshAdminViews();
}

export async function deleteLetterRequest(formData: FormData) {
  const id = normalizeRequired(formData.get("id"));

  await prisma.letterRequest.delete({
    where: { id },
  });

  await refreshAdminViews();
}

export async function subscribeToLetters(formData: FormData) {
  const creator = await getPrimaryCreator();
  const email = normalizeRequired(formData.get("email")).toLowerCase();
  const name = normalizeOptional(formData.get("name"));
  const tier = normalizeRequired(formData.get("tier")) || "free";
  const nextPath = normalizeOptional(formData.get("nextPath"));

  if (!email) {
    throw new Error("Email is required.");
  }

  await prisma.subscriber.upsert({
    where: {
      creatorId_email: {
        creatorId: creator.id,
        email,
      },
    },
    update: {
      name,
      tier,
    },
    create: {
      email,
      name,
      tier,
      creatorId: creator.id,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("subscriber_email", email, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  revalidatePath("/subscribe");
  revalidatePath("/");
  if (tier === "premium" && nextPath) {
    redirect(nextPath);
  }

  redirect(`/subscribe?success=1${tier === "premium" ? "&plan=premium" : ""}`);
}

export async function suggestSlug(formData: FormData) {
  return fallbackSlug(normalizeRequired(formData.get("title")));
}
