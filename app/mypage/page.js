'use client'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import UserCard from '@/components/userCard';
import NewUserModal from '@/components/NewUserModal';

export default function Mypage() {
  // State for Modals
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showFaceRecogModal, setShowFaceRecogModal] = useState(false);
  const [showNewVoiceModal, setShowNewVoiceModal] = useState(false);

  // State for user data
  const [userArray, setUserArray] = useState([])
  const instance = axios.create({
    headers: {
      'Authorization': `Bearer ${Cookies.get('uuid')}`,
    }
  })
  useEffect(() => {
    instance.get('/main/profile')
      .then(res => {
        console.log(res.data)
        setUserArray(res.data.data)
        console.log(typeof (userArray))
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Container>
      <NewUserModal show={showNewUserModal} handleClose={() => setShowNewUserModal(false)} />
      <Row>

        {userArray.map((user, index) => {
          return (
            <Col key={index}>
              <userCard></userCard>
            </Col>
          )
        })}
        {(userArray.length < 4) &&
          <Col>
            <Button onClick={() => setShowNewUserModal(true)} variant='secondary' style={{ fontSize: '25px', height: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              유저 추가
            </Button>
          </Col>}
      </Row>
      <Button onClick={() => instance.get('/main/profile')
        .then(res => console.log(res.data))
        .catch(err => console.log(err))}>프로필 받아오기 테스트</Button>
    </Container>
  )
}