"use client";

import { useState } from "react";

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
    <div className={`text-sm ${className}`}>
      <span className="font-semibold">{label}:</span> {value}
    </div>
  );

  const WatchButton = ({ label, onClick }) => (
    <button
      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors text-sm"
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative h-56 w-full">
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-2 text-xs rounded-full z-50">
            <div className="flex items-center space-x-2">
              <span>{movie.quality}</span>
              <span>•</span>
              <span>{movie.lang}</span>
            </div>
          </div>
          {movieSrc ? (
            <video
              controls
              className="absolute inset-0 w-full h-full rounded-lg"
            >
              <source src={movieSrc} />
            </video>
          ) : embedSrc ? (
            <iframe
              className="w-full h-full rounded-lg"
              src={embedSrc}
              title="Movie"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full items-center justify-center">
              <img
                src={movie.poster_url}
                alt={movie.name}
                className="h-full w-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1 flex">
            {movie.name}
            {currentEpisode ? (
              <p className="text-slate-300 text-lg m-1 ml-2">
                tập {currentEpisode}
              </p>
            ) : null}
          </h1>
          <p className="text-gray-500 text-sm mb-2">{movie.year}</p>

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

          <p className="mb-4 text-sm text-gray-600">{movie.content}</p>

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
            <div>
              <h2 className="text-xl font-semibold mb-3">Danh sách tập</h2>
              {episodes.map((episode, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-medium text-base mb-2">
                    {episode.server_name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {episode.server_data.map((data, i) => (
                      <div key={i} className="flex space-x-2">
                        <WatchButton
                          label={data.name}
                          onClick={() => {
                            handleEpisode(data, i);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
