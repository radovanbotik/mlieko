import React from "react";
import Navlink from "./Navlink";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex w-full h-full gap-2">
        <li className="mr-auto">
          <Navlink href="/">homepage</Navlink>
        </li>
        <li>
          <Navlink href="/reviews">reviews</Navlink>
        </li>
        <li>
          <Navlink href="/about" prefetch={false}>
            about
          </Navlink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
