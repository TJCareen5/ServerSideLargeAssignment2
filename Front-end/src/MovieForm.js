import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const MovieForm = ({ onAdd }) =>{
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    releaseDate: "",
    description: "",
    actors: "",
    poster: "",
  });

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      rating: "",
      releaseDate: "",
      description: "",
      actors: "",
      poster: "",
    });
  };
  return (
    <div>
      <h2>Add New Movie</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="rating">
          <Form.Label>Rating:</Form.Label>
          <Form.Control type="text" name="rating" value={formData.rating} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="releaseDate">
          <Form.Label>Release Date:</Form.Label>
          <Form.Control type="text" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="actors">
          <Form.Label>Actors:</Form.Label>
          <Form.Control type="text" name="actors" value={formData.actors} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="poster">
          <Form.Label>Image:</Form.Label>
          <Form.Control type="text" name="poster" value={formData.poster} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default MovieForm;
