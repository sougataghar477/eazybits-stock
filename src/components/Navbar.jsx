"use client"; 
// Marks this as a Client Component (needed because it uses hooks like usePathname).

import { usePathname } from "next/navigation"; // Hook to get the current route pathname
import Link from "next/link"; // Client-side navigation in Next.js

export default function Navbar() {
  const path = usePathname(); // Get the current URL path (e.g., "/", "/dashboard")

  return (
    // Sidebar container
    <aside className="md:fixed flex md:flex-col bg-[#040440] text-white md:h-screen p-4 md:w-60">
      
      {/* Home Link */}
      <Link
        href="/"
        className={
          "mb-4 font-bold p-4 rounded-lg hover:bg-[#3a3a80] " +
          (path === "/" ? "bg-[#2d2d69]" : "") // Highlight when active
        }
      >
        Home
      </Link>

      {/* Dashboard Link */}
      <Link
        href="/dashboard"
        className={
          "mb-4 font-bold p-4 rounded-lg hover:bg-[#3a3a80] " +
          (path === "/dashboard" ? "bg-[#2d2d69]" : "") // Highlight when active
        }
      >
        Dashboard
      </Link>

      {/* Portfolio Link */}
      <Link
        href="/portfolio"
        className={
          "mb-4 font-bold p-4 rounded-lg hover:bg-[#3a3a80] " +
          (path === "/portfolio" ? "bg-[#2d2d69]" : "") // Highlight when active
        }
      >
        Portfolio
      </Link>
    </aside>
  );
}
