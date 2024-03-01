import React from "react";
import { Card, Button } from "react-bootstrap";

const MovieReview = ({ movie, onRemove }) => {
  const handleRemove = () => {
    onRemove(movie);
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>{movie.name}</Card.Title>
      <Card.Img variant="top" src={movie.poster} alt={movie.name} />
      <Card.Body>
        <Card.Text>
          Rating: {movie.rating}<br />
          Release Date: {movie.releaseDate}<br />
          Description: {movie.description}<br />
          Actors: {movie.actors.join(", ")}
        </Card.Text>
        <Button variant="danger" onClick={handleRemove}>Remove</Button>
      </Card.Body>
    </Card>
  );
};

export default MovieReview;
