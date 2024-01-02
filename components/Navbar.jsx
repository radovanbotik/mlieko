import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex w-full h-full gap-2">
        <li className="mr-auto">
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/reviews">reviews</Link>
        </li>
        <li>
          <Link href="/about">about</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
