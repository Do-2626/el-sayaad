"use client";
import Link from "next/link";
import React, { useState } from "react";

function nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/" className="hover:text-gray-300">
            Brand
          </Link>
        </div>
        <div className="hidden md:flex gap-2">
          {/* <Link href="/" className="hover:text-gray-300">
            Home
          </Link> */}
          <Link href="/products" className="hover:text-gray-300">
            جميع المنتجات
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          {/* <Link href="/" className="block px-2 py-1 hover:bg-gray-700">
            Home
          </Link> */}
          <Link href="/products" className="block px-2 py-1 hover:bg-gray-700">
            جميع المنتجات
          </Link>
        </div>
      )}
    </nav>
  );
}

export default nav;
