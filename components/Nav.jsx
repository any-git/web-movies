"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Nav({ currentPage }) {
  const [searchContent, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const categories = [
    { name: "Trang chủ", link: "/" },
    { name: "Phim Chiếu Rạp", link: "/phim-le" },
    { name: "Truyền Hình", link: "/phim-bo" },
    { name: "Hoạt Hình", link: "/hoat-hinh" },
    { name: "TV Shows", link: "/tv-shows" },
  ];

  return (
    <>
      <motion.nav className="flex justify-between items-center h-16 bg-white text-black sticky top-0 shadow-sm font-mono w-screen z-50 sticky">
        <motion.div className="px-2 cursor-pointer">
          <motion.button
            className="text-2xl font-bold"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {!openMenu ? (
              <i className="material-icons">menu</i>
            ) : (
              <i className="material-icons">close</i>
            )}
          </motion.button>
        </motion.div>
        <motion.div className="px-2 py-2 border border-gray-300 rounded-md flex">
          <motion.input
            type="text"
            className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchContent}
            onChange={(e) => setSearch(e.target.value)}
          />
          <motion.a
            href={"/?q=" + encodeURIComponent(searchContent)}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i className="material-icons">search</i>
          </motion.a>
        </motion.div>
      </motion.nav>
      {openMenu && (
        <motion.div className="fixed inset-0 bg-slate-300 bg-opacity-50 z-10">
          <motion.div className="relative left-0 bottom-0 w-1/2 bg-white shadow-lg">
            <motion.ul className="relative flex flex-col m-2 p-4 gap-4 mt-16">
              {categories.map((category) => (
                <motion.li key={category.name}>
                  <motion.a
                    href={category.link}
                    className={`block w-full font-sans overflow-hidden hover:underline hover:cursor-pointer hover:bg-slate-600 hover:text-white px-4 py-2 ${
                      currentPage === category.link
                        ? "bg-slate-600 text-white"
                        : "text-dark"
                    }`}
                  >
                    {category.name}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
