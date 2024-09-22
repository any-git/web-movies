import Container from "@/components/Container";
import Card from "@/components/Card";
import Nav from "@/components/Nav";

const contentCache = {};

async function getContent(category) {
  if (contentCache[category]) {
    return contentCache[category];
  }
  const res = await fetch(`https://phimapi.com/v1/api/danh-sach/${category}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const content = await res.json();
  contentCache[category] = content;
  return content;
}

export async function generateMetadata({ params }) {
  const { category } = params;
  const content = await getContent(category);

  return {
    title: content.data.seoOnPage.titleHead,
    description: content.data.seoOnPage.descriptionHead,
  };
}

async function Category({ params }) {
  const { category } = params;
  const currentPage = `/${category}`;
  const content = await getContent(category);
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
