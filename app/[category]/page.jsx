import Container from "../Container";
import Card from "../Card";
import Nav from "../Nav";

async function Category({ params }) {
  const { category } = params;
  const res = await fetch(`https://phimapi.com/api/danh-sach/${category}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const content = await res.json();
  const movies = content.data.items;
  const infoText = `Danh sách phim ${category}`;
  const currentPage = `/${category}`;

  return (
    <>
      <Nav currentPage={currentPage} />
      <Container infoText={infoText}>
        {movies.map((movie) => (
          <Card key={movie._id} movie={movie} />
        ))}
      </Container>
    </>
  );
}

export default Category;
