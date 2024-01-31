import React from "react";
import Link from "next/link";

const Pagination = ({ page, pageCount, href }) => {
  return (
    <div className="flex gap-2">
      <PaginationLink href={`${href}?page=${page - 1}`} enabled={page > 1}>
        &lt;
        <span className="sr-only">previous page</span>
      </PaginationLink>
      <span>
        Page {page} of {pageCount}
      </span>
      <PaginationLink href={`${href}?page=${page + 1}`} enabled={page < pageCount}>
        &gt;
        <span className="sr-only">next page</span>
      </PaginationLink>
    </div>
  );
};

export default Pagination;

const PaginationLink = ({ children, enabled, href }) => {
  if (enabled) return <Link href={href}>{children}</Link>;
  return null;
};
