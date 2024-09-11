export default function Card({ movie }) {
  let poster_url = movie.poster_url;
  if (!poster_url.includes("https://phimimg.com/")) {
    poster_url = "https://phimimg.com/" + poster_url;
  }
  return (
    <a href={`/${movie.slug}`}>
      <div
        key={movie._id}
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer hover:bg-slate-100"
      >
        <img
          src={poster_url}
          alt={movie.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{movie.name}</h2>
          <p className="text-gray-600">{movie.year}</p>
        </div>
      </div>
    </a>
  );
}
