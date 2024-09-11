import Nav from "./Nav";
import Container from "./Container";
import Card from "./Card";

const Home = async ({ searchParams }) => {
  const q = searchParams.q || "";
  const apiUrl = q
    ? `https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(q)}`
    : "https://phimapi.com/danh-sach/phim-moi-cap-nhat";

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const content = await res.json();
    const movies = q ? content.data.items : content.items;
    const infoText = q ? `Kết quả tìm kiếm cho "${q}"` : "Mới nhất";

    return (
      <>
        <Nav />
        <Container infoText={infoText}>
          {movies.map((movie) => (
            <Card key={movie._id} movie={movie} />
          ))}
        </Container>
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <>
        <Nav />
        <Container infoText={infoText}>
          <p>Error fetching data.</p>
        </Container>
      </>
    );
  }
};

export default Home;
