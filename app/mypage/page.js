'use client'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
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
      })
      .catch(err => console.log(err))
  }, [showNewUserModal])

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
        {/* {(userArray.length < 4) &&
          <Col>
            <Button onClick={() => setShowNewUserModal(true)} variant='secondary' style={{ fontSize: '25px', height: '80px', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              새 프로필 추가하기
            </Button>
          </Col>} */}
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