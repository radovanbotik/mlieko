"use client";
import React, { useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";

const ShareLinkButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 700);
  };

  return (
    <button
      className="px-2 py-1 rounded-sm bg-gray-400 hover:bg-gray-500 flex items-center gap-1"
      onClick={handleClick}
    >
      <LinkIcon className="h-4 w-4" />
      {clicked ? "Copied!" : "Copy Link"}
    </button>
  );
};

export default ShareLinkButton;
