"use server";
import { createComment } from "@/lib/comments";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createCommentAction({ formData, slug }) {
  const data = {
    user: formData.get("user"),
    message: formData.get("message"),
    slug: slug,
  };
  const error = validate(data);
  if (error) {
    return { isError: true, message: error };
  }
  await createComment(data);
  revalidatePath(`/reviews/${slug}`);
  redirect(`/reviews/${slug}`);
}

function validate(data) {
  if (!data.user) {
    return "Name field is required";
  }
  if (!data.user.length > 50) {
    return "Name field cannot be longer than 50 chars";
  }
  if (!data.message) {
    return "Comment field is required";
  }
  if (!data.message.length > 500) {
    return "Message field cannot be longer than 500 chars";
  }
}
