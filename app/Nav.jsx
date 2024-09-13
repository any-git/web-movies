"use client";

import { useState } from "react";

export default function Nav() {
  const [searchContent, setSearch] = useState("");

  return (
    <nav className="flex justify-between items-center h-16 bg-white text-black sticky top-0 shadow-sm font-mono w-screen">
      <div className="px-2 cursor-pointer font-bold">Phim điện ảnh</div>
      <div className="px-2 py-2 border border-gray-300 rounded-md flex">
        <input
          type="text"
          className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchContent}
          onChange={(e) => setSearch(e.target.value)}
        />
        <a
          href={"/?q=" + encodeURIComponent(searchContent)}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <i className="material-icons">search</i>
        </a>
      </div>
    </nav>
  );
}
