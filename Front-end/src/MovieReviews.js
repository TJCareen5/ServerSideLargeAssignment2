import React from "react";

const MovieReviews = ({ movies, onRemove }) =>{
  const handleRemove = (movieId) =>{
    onRemove(movieId);
  };
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {movies.map((movie) => (
        <Col key={movie.id}>
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
              <Button variant="danger" onClick={() => handleRemove(movie.id)}>Remove</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MovieReviews;