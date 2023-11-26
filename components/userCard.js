'use client'
import { Card, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import PinModal from "./PinModal"
import NewVoiceModal from "./NewVoiceModal"

export default function UserCard({ faceImg, nickname, uuid, index }) {
  const [showPinModal, setShowPinModal] = useState(false)
  const [showNewVoiceModal, setShowNewVoiceModal] = useState(false)

  return (
    <Card style={{ width: '16vw', height: '55vh' }}>
      <NewVoiceModal show={showNewVoiceModal} handleClose={() => setShowNewVoiceModal(false)} nickname={nickname} />
      <PinModal show={showPinModal} handleClose={() => setShowPinModal(false)} index={index} nickname={nickname} />
      <Card.Img variant="top" src={faceImg} style={{ width: '100%', height: '30vh' }} />
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>{nickname}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Button variant='secondary' style={{ width: '100%', fontSize: '10px' }} onClick={() => setShowNewVoiceModal(true)}>음성 설정</Button>
        <Button variant='secondary' style={{ width: '100%', fontSize: '10px' }} onClick={() => setShowPinModal(true)}>PIN 로그인</Button>
      </Card.Footer>
    </Card>
  )
}