import Container from "../Container";
import Card from "../Card";
import Nav from "../Nav";

export async function generateMetadata({ params }) {
  const { category } = params;
  const res = await fetch(`https://phimapi.com/v1/api/danh-sach/${category}`);

  if (res.ok) {
    const content = await res.json();
    return {
      title: content.data.seoOnPage.titleHead,
      description: content.data.seoOnPage.descriptionHead,
    };
  }
}

async function Category({ params }) {
  const { category } = params;
  const currentPage = `/${category}`;
  const res = await fetch(`https://phimapi.com/v1/api/danh-sach/${category}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const content = await res.json();
  const movies = content.data.items;
  const infoText = `Danh sách ${content.data.titlePage}`;
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
