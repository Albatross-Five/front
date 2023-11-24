import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import addNewUser from "@/func/addNewUser";
import { useState } from "react";

export default function NewUserModal({ show, handleClose }) {
  const [image, setImage] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [pin, setPin] = useState(null);


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>신규 프로필 등록</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault();
          addNewUser(nickname, pin, image);
          handleClose();
        }}>
          <Row>
            <Col>
              <Form.Group controlId="image">
                <Form.Label>얼굴 이미지</Form.Label>
                <Form.Control type="file" required onChange={
                  (e) => {
                    setImage(e.target.files[0])
                  }
                } />
              </Form.Group>
            </Col>
            <Col>
              <Row>
                <Form.Group controlId="nickname">
                  <Form.Label>닉네임</Form.Label>
                  <Form.Control type="text" required onChange={
                    (e) => {
                      setNickname(e.target.value)
                    }

                  } />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId="pin">
                  <Form.Label>PIN</Form.Label>
                  <Form.Control type='password' required onChange={
                    (e) => {
                      setPin(e.target.value)
                    }

                  } />
                  <Form.Text className="text-muted">
                    얼굴 인식이 안될 경우 사용할 PIN을 입력해주세요.
                  </Form.Text>
                </Form.Group>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>

            </Col>
            <Col>
              <Button variant="secondary" onClick={handleClose} style={{ marginRight: '50px' }}>
                닫기
              </Button>
              <Button variant="primary" type="submit">
                저장
              </Button>
            </Col>
          </Row>

        </Form>
      </Modal.Body>

    </Modal>
  );
}