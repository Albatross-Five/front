'use client'
import { Modal, Button, Row, Form } from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"

export default function NewVoiceModal({ show, handleClose, nickname }) {
  const instance = axios.create({
    headers: {
      'Authorization': `Bearer ${Cookies.get('uuid')}`,
    }
  })
  // Array for voice files
  const [voice, setVoice] = useState([])
  // State for 존댓말 여부
  const [informal, setInformal] = useState(true)


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>음성 설정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>지인의 음성 파일을 업로드 해 주세요.</p>
        <Row>
          <Form>
            <Form.Group controlId="voice">
              <Form.Label>음성 파일</Form.Label>
              <Form.Control type="file" required onChange={
                (e) => {
                  if (e.target.files[0] === undefined) return
                  setVoice((prevVoice) => [...prevVoice, e.target.files[0]])

                }
              } />
            </Form.Group>
            <Form.Group controlId="voice1">
              <Form.Label>음성 파일</Form.Label>
              <Form.Control type="file" onChange={
                (e) => {
                  if (e.target.files[0] === undefined) return
                  setVoice((prevVoice) => [...prevVoice, e.target.files[0]])

                }
              } />
            </Form.Group>
            <Form.Group controlId="voice2">
              <Form.Label>음성 파일</Form.Label>
              <Form.Control type="file" onChange={
                (e) => {
                  if (e.target.files[0] === undefined) return
                  setVoice((prevVoice) => [...prevVoice, e.target.files[0]])

                }
              } />
            </Form.Group>
            <Form.Group controlId="informal">
              <Form.Label>존댓말 여부</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="예"
                  name="formal"
                  value={false}
                  checked={informal === false}
                  onChange={e => {
                    setInformal(false)
                  }}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="아니오"
                  name="informal"
                  value={true}
                  checked={informal === true}
                  onChange={e => {
                    setInformal(true)
                  }}
                />
              </div>
            </Form.Group>
          </Form>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={
          () => {
            const formData = new FormData()
            formData.append('nickname', nickname)
            console.log(voice)
            voice.forEach((v, i) => {
              formData.append('files', v)
            })
            formData.append('informal', informal)
            instance.post('/main/profile/voice', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(res => {
              console.log(res)
              window.location.reload()
            }).catch(err => {
              console.log(err)
            })
          }
        }>저장</Button>
      </Modal.Footer>
    </Modal>
  )
}