import Container from "../Container";
import Card from "../Card";
import Nav from "../Nav";

async function Category({ params }) {
  const { category } = params;
  const res = await fetch(`https://phimapi.com/api/danh-sach/${category}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  const movies = data.items;
  const infoText = `Danh sách phim ${category}`;

  return (
    <>
      <Nav currentPage={"/" + category} />
      <Container infoText={infoText}>
        {movies.map((movie) => (
          <Card key={movie._id} movie={movie} />
        ))}
      </Container>
    </>
  );
}

export default Category;