import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useGlobalContext } from "../contexts/GlobalContext"; // Ensure this path is correct based on your project structure
import useNewsData from "./useNewsData";
import CustomPagination from "./CustomPagination";

const MyNewsList = ({ category, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const { user } = useGlobalContext(); // Access user info from GlobalContext
  const { newsData, loading, error } = useNewsData(category, searchTerm);

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const addToHistory = async (article, event) => {
    event.preventDefault(); // Prevent default link behavior

    if (!user) {
      alert("Please log in to track reading history.");
      return;
    }

    const articleId = encodeURIComponent(article.title);
    const historyUrl = `https://newroom-1a460-default-rtdb.firebaseio.com/users/${user.id}/history/${articleId}.json`;

    await fetch(historyUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    });

    // After updating history, navigate to the article URL
    window.open(article.url, "_blank");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!newsData || !Array.isArray(newsData)) return <div>No news data available.</div>;

  const totalArticles = newsData.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData.slice(startIndex, endIndex);

  return (
    <Container>
      <Row>
        {currentArticles.map((article, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={article.image || "https://via.placeholder.com/150"} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Link href={article.url} onClick={(e) => addToHistory(article, e)}>Read More</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Container>
  );
};

export default MyNewsList;
