/* import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const products = [
  { id: 1, name: 'iPhone 15', price: '$1500', image: 'publicidad1.png' },
  { id: 2, name: 'iPhone 15 Pro Max', price: '$1800', image: 'iphone15promax.jpg' },
  { id: 3, name: 'AirPods', price: '$200', image: 'airpods.jpg' },
  { id: 4, name: 'MacBook Pro', price: '$2000', image: 'macbookpro.jpg' },
  { id: 5, name: 'iPad Pro', price: '$1200', image: 'ipadpro.jpg' },
  // Add more products as needed
];

const Product = () => {
  return (
    <Container>
      <h2 className="mt-5 mb-3" style={{ color: '#757575ff' }}>Productos Apple</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <Card className="bg-dark text-light">
              <Card.Img variant="top" src={require(`../../img/${product.image}`).default} alt={product.name} />
              <Card.Body>
                <Card.Title style={{ color: '#757575ff' }}>{product.name}</Card.Title>
                <Card.Text style={{ color: '#757575ff' }}>Precio: {product.price}</Card.Text>
                <Button variant="dark">Comprar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Product;
 */