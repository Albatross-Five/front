'use client'


import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ToLogin from '@/components/ToLogin'
import { Button, Container, Row, Col } from 'react-bootstrap'
import logout from '@/func/logout';
import axios from 'axios';




export default function Home() {
  const [uuid, setUuid] = useState(null)
  const [nickname, setNickname] = useState(null)
  const instance = axios.create({
    headers: {
      'Authorization': `Bearer ${Cookies.get('uuid')}`,
    }
  })
  useEffect(() => {
    setUuid(Cookies.get('uuid'))
    setNickname(Cookies.get('nickname'))
    console.log(uuid)
  }, [uuid])

  // uuid가 없으면 로그인 페이지로 이동
  if (!uuid) {
    return (
      <ToLogin />
    )
  }
  // nickname이 없으면 마이페이지로 이동
  if (!nickname) {
    window.location.href = '/mypage'
  }

  return (
    <Container>
      <Row style={{ marginBottom: '20vh' }}>
        <h1>{nickname} 님</h1>
        <h2>오늘도</h2>
        <h2>안전운전 하세요</h2>
      </Row>
      <div >
        <Row className='justify-content-center'>
          <Col className='text-center'>
            <Button href="/drive" style={{ fontSize: '25px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              운전하기
            </Button>
          </Col>
          <Col className='text-center'>
            <Button href="/mypage" style={{ fontSize: '25px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              마이페이지
            </Button>
          </Col>
          <Col className='text-center' style={{ display: 'flex' }}>
            <Button onClick={logout} variant='secondary' style={{ fontSize: '25px', height: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              로그아웃
            </Button>
          </Col>
        </Row>
      </div>
      {/*{uuid}*/}
    </Container>
  )
}
