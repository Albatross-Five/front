'use client'
import { Card } from "react-bootstrap"
export default function UserCard({ faceImg, nickname }) {
  return (
    <Card style={{ width: '15vw' }}>
      <Card.Img variant="top" src={faceImg} style={{ width: '100%', height: '30vh' }} />
      <Card.Body>
        <Card.Title>{nickname}</Card.Title>
      </Card.Body>
    </Card>
  )
}