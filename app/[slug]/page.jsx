import React from "react";
import Movie from "./Movie";

async function MovieDetail({ params }) {
  const { slug } = params;
  const res = await fetch(`https://phimapi.com/phim/${slug}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  const movie = data.movie;
  const episodes = data.episodes;

  return <Movie movie={movie} episodes={episodes} />;
}

export default MovieDetail;
