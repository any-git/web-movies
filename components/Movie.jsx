"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Movie({ movie, episodes }) {
  const [movieSrc, setMovieSrc] = useState(null);
  const [embedSrc, setEmbedSrc] = useState(null);
  const [currentEpisode, setCurrentEp] = useState(null);

  const handleEpisode = (data, i) => {
    setCurrentEp(i + 1);
    if (movieSrc) {
      setMovieSrc(data.link_m3u8);
    } else {
      setEmbedSrc(data.link_embed);
    }
  };

  const MovieInfo = ({ label, value, className = "" }) => (
    <motion.div
      className={`text-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="font-semibold">{label}:</span> {value}
    </motion.div>
  );

  const WatchButton = ({ label, onClick }) => (
    <motion.button
      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors text-sm"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <motion.div
          className="relative h-1/3 w-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-2 text-xs rounded-full z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <span>{movie.quality}</span>
              <span>•</span>
              <span>{movie.lang}</span>
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            {movieSrc ? (
              <motion.video
                key="video"
                controls
                className="relative insert-0 w-full h-auto rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <source src={movieSrc} />
              </motion.video>
            ) : embedSrc ? (
              <motion.iframe
                key="iframe"
                className="relative insert-0 w-full h-auto rounded-lg"
                src={embedSrc}
                title="Movie"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <motion.img
                key="poster"
                src={movie.poster_url}
                alt={movie.name}
                className="h-full w-auto object-cover rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl font-bold mb-1 flex"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {movie.name}
            {currentEpisode ? (
              <motion.p
                className="text-slate-300 text-lg m-1 ml-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                tập {currentEpisode}
              </motion.p>
            ) : null}
          </motion.h1>
          <motion.p
            className="text-gray-500 text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {movie.year}
          </motion.p>

          <div className="flex space-x-2 mb-4">
            <WatchButton
              label="Xem ngay"
              onClick={() => {
                setEmbedSrc(episodes[0]?.server_data[0]?.link_embed);
                setMovieSrc(null);
              }}
            />
            <WatchButton
              label="M3U8"
              onClick={() => {
                setMovieSrc(episodes[0]?.server_data[0]?.link_m3u8);
                setEmbedSrc(null);
              }}
            />
          </div>

          <motion.p
            className="mb-4 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {movie.content}
          </motion.p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 text-gray-600">
            <MovieInfo label="Thời gian" value={movie.time} />
            <MovieInfo label="Tình trạng" value={movie.status} />
            <MovieInfo
              label="Diễn viên"
              value={movie.actor.join(", ")}
              className="col-span-2"
            />
            <MovieInfo
              label="Đạo diễn"
              value={movie.director.join(", ")}
              className="col-span-2"
            />
            <MovieInfo
              label="Thể loại"
              value={movie.category.map((cat) => cat.name).join(", ")}
              className="col-span-2"
            />
            <MovieInfo
              label="Quốc gia"
              value={movie.country.map((c) => c.name).join(", ")}
              className="col-span-2"
            />
          </div>

          {episodes.length > 0 && episodes[0].server_data.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-3">Danh sách tập</h2>
              {episodes.map((episode, index) => (
                <motion.div
                  key={index}
                  className="mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  <h3 className="font-medium text-base mb-2">
                    {episode.server_name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {episode.server_data.map((data, i) => (
                      <motion.div
                        key={i}
                        className="flex space-x-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.5 + index * 0.1 + i * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <WatchButton
                          label={data.name}
                          onClick={() => {
                            handleEpisode(data, i);
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
