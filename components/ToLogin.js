import { Button, Container, Row } from "react-bootstrap";

export default function ToLogin() {
  return (
    <Container>
      <Row style={{ margin: '20vh' }}>
        <Button size='lg' variant="primary" href="/login">
          로그인 후 이용해주세요
        </Button>
      </Row>
    </Container>
  );
}