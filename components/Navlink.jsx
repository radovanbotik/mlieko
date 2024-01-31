"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navlink({ children, prefetch, href }) {
  const pathname = usePathname();

  if (pathname === href) {
    return <span className="text-gray-400">{children}</span>;
  }
  return (
    <Link href={href} prefetch={prefetch}>
      {children}
    </Link>
  );
}
