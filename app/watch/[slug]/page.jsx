import React from "react";
import Movie from "@/components/Movie";
import Nav from "@/components/Nav";

const movieCache = {};

async function getMovieContent(slug) {
  if (movieCache[slug]) {
    return movieCache[slug];
  }
  const res = await fetch(`https://phimapi.com/phim/${slug}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  movieCache[slug] = data; // Lưu vào cache
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getMovieContent(slug);
  const movie = data.movie;
  return {
    title: movie.name,
    description: movie.content,
    images: [movie.thumb_url],
  };
}

async function MovieDetail({ params }) {
  const { slug } = params;
  const data = await getMovieContent(slug);
  const movie = data.movie;
  const episodes = data.episodes;
  return (
    <>
      <Nav currentPage={`/watch/${slug}`} />
      <Movie movie={movie} episodes={episodes} />
    </>
  );
}

export default MovieDetail;
