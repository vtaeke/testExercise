import React from 'react';
import { Card } from 'react-bootstrap';
import type { Review } from '../types';

type ReviewProps = {
  review: Review;
};

const ReviewComponent: React.FC<ReviewProps> = ({ review }) => (
  <Card style={{ marginBottom: '15px' }}>
    <Card.Body>
      <Card.Title>{review.name}</Card.Title>
      <Card.Text>{review.review}</Card.Text>
      <Card.Text>{review.date}</Card.Text>
    </Card.Body>
  </Card>
);

export default ReviewComponent;
