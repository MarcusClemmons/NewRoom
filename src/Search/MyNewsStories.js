import { useState } from "react";
import {
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  Container,
} from "react-bootstrap";
import { useGlobalContext } from '../contexts/GlobalContext';

import MyNewsList from "./MyNewsList";

function MyNewsStories() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (cetegory) => {
    setCategory(cetegory);
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCategory("");
    setSearchTerm(event.target.search.value);
  };


  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
            News App
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              
            </Nav>

            <Form onSubmit={handleSearch} className="d-flex">
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2"
                name="search"
              />

              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <h5>Categories</h5>
            <Nav className="flex-column">
              <Nav.Link onClick={() => handleCategoryClick("world")}>
                World
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("business")}>
                Business
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("technology")}>
                Technology
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("sports")}>
                Sports
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("entertainment")}>
                Entertainment
              </Nav.Link>
            </Nav>
          </Col>

          <Col xs={12} md={9}>
            <MyNewsList category={category} searchTerm={searchTerm} />
          </Col>
        </Row>
      </Container>
    </>
  );
}


export default MyNewsStories;

