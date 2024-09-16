"use client";
import { useState } from "react";

export default function Nav({ currentPage }) {
  const [searchContent, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const categories = [
    { name: "Trang chủ", link: "/" },
    { name: "Chương trình truyền hình", link: "/phim-bo" },
    { name: "Phim chiếu rạp", link: "/phim-le" },
    { name: "Phim hoạt hình", link: "/phim-hoat-hinh" },
    { name: "TV Shows", link: "/tv-shows" },
  ];

  return (
    <>
      <nav className="flex justify-between items-center h-16 bg-white text-black sticky top-0 shadow-sm font-mono w-screen">
        <div className="px-2 cursor-pointer">
          <button
            className="text-2xl font-bold"
            onClick={() => setOpenMenu(true)}
          >
            <i className="material-icons">menu</i>
          </button>
        </div>
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
      {openMenu && (
        <div className="fixed inset-0 bg-slate-300 bg-opacity-50 z-10">
          <div className="fixed top-0 left-0 bottom-0 w-1/2 bg-white shadow-lg">
            <button
              onClick={() => setOpenMenu(false)}
              className="absolute top-4 right-4 text-2xl font-bold"
            >
              <i className="material-icons">close</i>
            </button>
            <ul className="flex flex-col p-4 gap-4 mt-16">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.link}
                    className={`block w-full text-dark font-sans overflow-hidden hover:underline hover:cursor-pointer hover:bg-slate-600 hover:text-white px-4 py-2 ${
                      currentPage === category.link ? "underline" : ""
                    }`}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
