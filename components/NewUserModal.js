import { Modal, Button } from "react-bootstrap";

export default function NewUserModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>새로운 유저를 만들어주세요</Modal.Title>
      </Modal.Header>
      <Modal.Body>새로운 유저를 만들어주세요</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleClose}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}