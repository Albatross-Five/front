'use client'
import Cookies from "js-cookie"
import { Button, Modal, Form } from "react-bootstrap"

export default function PinModal({ show, handleClose, index, nickname }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>PIN 로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicPassword">

            <Form.Control type="password" placeholder="PIN 입력" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => {
          Cookies.set('nickname', nickname)
          window.location.href = '/'
        }}>로그인</Button>
      </Modal.Footer>
    </Modal>
  )
}