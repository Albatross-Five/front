'use client'
import { Modal, Button, Row } from "react-bootstrap"

export default function NewVoiceModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>음성 설정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>음성 파일을 업로드 해 주세요.</p>
        <Row>
          <input type="file" />
          <input type="file" />
          <input type="file" />
          <input type="file" />
          <input type="file" />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>저장</Button>
      </Modal.Footer>
    </Modal>
  )
}