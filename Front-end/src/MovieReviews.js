import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const MovieReviews = ({ movies, onRemove }) =>{
  const handleRemove = (movieId) =>{
    onRemove(movieId);
  };
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {movies.map((movie) => (
        <Col key={movie._id}>
          <Card>
          <Card.Title>{movie.name}</Card.Title>
            <Card.Img variant="top" src={movie.poster} alt={movie.name} />
            <Card.Body>
              <Card.Text>
                <strong>Rating:</strong> {movie.rating}<br />
                <strong>Release Date:</strong> {movie.releaseDate}<br />
                <strong>Description:</strong> {movie.description}<br />
                <strong>Actors:</strong> {movie.actors.join(", ")}
              </Card.Text>
              <Button variant="danger" onClick={() => handleRemove(movie._id)}>Remove</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MovieReviews;