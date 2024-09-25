import { motion } from "framer-motion";
import { useState } from "react";

export default function Card({ movie }) {
  const [isClicked, setIsClicked] = useState(false);
  let poster_url = movie.poster_url;
  if (!poster_url.includes("https://phimimg.com/")) {
    poster_url = "https://phimimg.com/" + poster_url;
  }

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      window.location.href = `/watch/${movie.slug}`;
    }, 300); // Delay chuyển hướng 300ms để hoàn thành animation
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isClicked ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <a href={`/watch/${movie.slug}`} onClick={handleClick}>
        <motion.div
          key={movie._id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer hover:bg-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={poster_url}
            alt={movie.name}
            className="w-full h-64 object-cover rounded-t-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div className="mt-4">
            <motion.h2
              className="text-lg font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {movie.name}
            </motion.h2>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {movie.year}
            </motion.p>
          </motion.div>
        </motion.div>
      </a>
    </motion.div>
  );
}
