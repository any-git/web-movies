"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const menuVariants = {
    closed: { x: "-100%" },
    open: { x: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.nav
        className="flex justify-between items-center h-16 bg-white text-black sticky top-0 shadow-sm font-mono w-screen z-50"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <motion.div className="px-2 cursor-pointer">
          <motion.button
            className="text-2xl font-bold"
            onClick={() => setOpenMenu(!openMenu)}
            whileTap={{ scale: 0.95 }}
          >
            {!openMenu ? (
              <i className="material-icons">menu</i>
            ) : (
              <i className="material-icons">close</i>
            )}
          </motion.button>
        </motion.div>
        <motion.div
          className="px-2 py-2 border border-gray-300 rounded-md flex"
          whileHover={{ scale: 1.05 }}
        >
          <motion.input
            type="text"
            className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchContent}
            onChange={(e) => setSearch(e.target.value)}
          />
          <motion.a
            href={"/?q=" + encodeURIComponent(searchContent)}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="material-icons">search</i>
          </motion.a>
        </motion.div>
      </motion.nav>
      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="fixed inset-0 bg-slate-300 bg-opacity-50 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full w-1/2 bg-white shadow-lg"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.ul className="flex flex-col m-2 p-4 gap-4 mt-16">
                {categories.map((category, index) => (
                  <motion.li
                    key={category.name}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.a
                      href={category.link}
                      className={`block w-full font-sans overflow-hidden hover:underline hover:cursor-pointer hover:bg-slate-600 hover:text-white px-4 py-2 ${
                        currentPage === category.link
                          ? "bg-slate-600 text-white"
                          : "text-dark"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.name}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
