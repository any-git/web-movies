"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav({ currentPage }) {
  const [searchContent, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const types = [
    { name: "Trang chủ", link: "/" },
    { name: "Đang chiếu", link: "/phim-dang-chieu" },
    { name: "Phim Chiếu Rạp", link: "/phim-le" },
    { name: "Truyền Hình", link: "/phim-bo" },
    { name: "TV Shows", link: "/tv-shows" },
  ];

  const categories = [
    { name: "Hành Động", link: "/category/hanh-dong" },
    { name: "Phiêu Lưu", link: "/category/phieu-luu" },
    { name: "Hoạt Hình", link: "/category/hoat-hinh" },
    { name: "Hài", link: "/category/hai" },
    { name: "Hình Sự", link: "/category/hinh-su" },
    { name: "Tài Liệu", link: "/category/tai-lieu" },
    { name: "Chính Kịch", link: "/category/chinh-kich" },
    { name: "Gia Đình", link: "/category/gia-dinh" },
    { name: "Giả Tưởng", link: "/category/gia-tuong" },
    { name: "Lịch Sử", link: "/category/lich-su" },
    { name: "Kinh Dị", link: "/category/kinh-di" },
    { name: "Nhạc", link: "/category/nhac" },
    { name: "Bí Ẩn", link: "/category/bi-an" },
    { name: "Lãng Mạn", link: "/category/lang-man" },
    { name: "Khoa Học Viễn Tưởng", link: "/category/khoa-hoc-vien-tuong" },
    { name: "Gây Cấn", link: "/category/gay-can" },
    { name: "Chiến Tranh", link: "/category/chien-tranh" },
    { name: "Tâm Lý", link: "/category/tam-ly" },
    { name: "Tình Cảm", link: "/category/tinh-cam" },
    { name: "Cổ Trang", link: "/category/co-trang" },
    { name: "Miền Tây", link: "/category/mien-tay" },
    { name: "Phim 18+", link: "/category/phim-18" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const menuVariants = {
    closed: { x: "-100%" },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        duration: 1,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const renderMenuSection = (title, items) => (
    <motion.div className="mb-4">
      <motion.div className="border-b dark:border-gray-700 p-4 font-bold text-lg bg-gray-100 dark:bg-gray-800">
        {title}
      </motion.div>
      <motion.ul className="flex flex-col gap-2 p-2 max-h-[50vh] overflow-y-auto">
        {items.map((item) => (
          <motion.li
            key={item.name}
            variants={itemVariants}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <motion.a
              href={item.link}
              className={`block w-full px-4 py-2 rounded-md ${
                currentPage === item.link
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );

  return (
    <>
      <motion.nav
        className="flex justify-center items-center h-16 bg-white text-black sticky top-0 shadow-sm font-mono w-screen z-50 dark:bg-gray-900 dark:text-white"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <motion.div className="px-2 cursor-pointer absolute left-4">
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
          className="w-full max-w-md px-2 py-2 border border-gray-300 rounded-md flex items-center dark:border-gray-700"
          whileHover={{ scale: 1.05 }}
        >
          <input
            type="text"
            className="flex-grow px-2 py-1 border-none focus:outline-none dark:bg-gray-800 dark:text-white"
            value={searchContent}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchContent.trim()) {
                window.location.href = `/search?kw=${encodeURIComponent(
                  searchContent.trim()
                )}`;
              }
            }}
          />
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenMenu(false)}
          >
            <motion.div
              className="absolute left-0 top-0 h-full w-3/4 bg-white dark:bg-gray-900 overflow-y-auto"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
            >
              {renderMenuSection("Loại Phim", types)}
              {renderMenuSection("Thể Loại", categories)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
