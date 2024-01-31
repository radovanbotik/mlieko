import { getComments } from "@/lib/comments";
import React from "react";

const CommentList = async ({ slug }) => {
  const comments = await getComments(slug);

  if (comments.length < 1) return <p className="border-b px-3 py-2 border-none bg-amber-100">no comments yet</p>;

  return (
    <ul>
      {comments.map(comment => {
        return (
          <li key={comment.id} className="border-b px-3 py-2 last:border-none odd:bg-amber-100">
            <p className="pb-1 text-slate-500 capitalize">{comment.user}</p>
            <p className="italic first-letter:capitalize">{comment.message}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
