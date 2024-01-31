"use client";
import React, { useState } from "react";
import { createCommentAction } from "@/app/reviews/[slug]/actions";
import useFormState from "@/hooks/useFormState";

const CommentForm = ({ title, slug }) => {
  const [state, handleSubmit] = useFormState(createCommentAction);
  // const [state, setState] = useState({ error: null, loading: false });

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   setState({ error: null, loading: true });
  //   const form = e.currentTarget;
  //   const formData = new FormData(form);
  //   const result = await createCommentAction({ formData, slug });
  //   if (result?.isError) {
  //     setError({ error: result, loading: false });
  //   } else {
  //     setError(prev => ({ ...prev, loading: false }));
  //     form.reset();
  //   }
  // };

  return (
    <div className="space-y-2">
      <p>
        Is <strong>{title}</strong> speaking to you? Let others know!
      </p>
      <form className="max-w-screen-sm flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="userField">Your name</label>
          <input type="text" id="userField" name="user" maxLength={50} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="messageField">Your comment</label>
          <textarea id="messageField" name="message" maxLength={500} minLength={5}></textarea>
        </div>
        {Boolean(state.error) && <p className="text-red-500">{state.error}</p>}
        <button
          type="submit"
          className="bg-amber-700 px-2 py-1 w-32 mx-auto capitalize disabled:bg-slate-500 disabled:cursor-not-allowed text-slate-50 rounded-md"
          disabled={state.loading}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
