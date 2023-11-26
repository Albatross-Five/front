'use client'
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import UserCard from '@/components/userCard';
import NewUserModal from '@/components/NewUserModal';
import FaceRecogModal from '@/components/FaceRecogModal';


export default function Mypage() {
  // State for Modals
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showFaceRecogModal, setShowFaceRecogModal] = useState(false);
  const [showNewVoiceModal, setShowNewVoiceModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  // State for user data
  const [uuid, setUuid] = useState(null)
  useEffect(() => {
    setUuid(Cookies.get('uuid'))
  }, [uuid])

  const [userArray, setUserArray] = useState([])
  const instance = axios.create({
    headers: {
      'Authorization': `Bearer ${Cookies.get('uuid')}`,
    }
  })
  useEffect(() => {
    instance.get('/main/profile')
      .then(res => {
        setUserArray(res.data.data)
        setShowSpinner(false)
      })
      .catch(err => console.log(err))
  }, [showNewUserModal])
  if (showSpinner) return (
    <Container>
      <Row>
        <Col style={{ minHeight: '55vh', alignContent: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <Spinner animation='border' style={{ width: '100px', height: '100px', margin: 'auto' }} />
        </Col>
      </Row>
    </Container>
  )
  else {
    return (
      <Container>
        <NewUserModal show={showNewUserModal} handleClose={() => setShowNewUserModal(false)} />
        <FaceRecogModal show={showFaceRecogModal} handleClose={() => setShowFaceRecogModal(false)} userArray={userArray} />
        <Row>

          {userArray.map((user, i) => {
            const profileUrl = user.profileUrl
            const nickname = user.nickname
            return (
              <Col key={i}>
                <UserCard faceImg={profileUrl} nickname={nickname} uuid={uuid} index={i}></UserCard>
              </Col>
            )
          })}

          {[...Array(4 - userArray.length)].map((e, i) => {
            return (
              <Col key={i} style={{ minHeight: '55vh' }}>
                <Button onClick={() => setShowNewUserModal(true)} variant='secondary' style={{ fontSize: '30vh', height: '80px', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '50%' }}>
                  +
                </Button>
              </Col>
            )
          })}
        </Row>
        <Row style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
          {userArray.length > 0 ? <Button size='lg' onClick={() => setShowFaceRecogModal(true)} style={{ margin: '5px', width: '80%' }}>얼굴 인식하기</Button> : null}
        </Row>
      </Container>
    )
  }
}