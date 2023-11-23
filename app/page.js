'use client'


import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
//import 'bootstrap/dist/css/bootstrap.min.css';
import ToLogin from '@/components/ToLogin'
import { Button, Container, Row, Col } from 'react-bootstrap'
import logout from '@/func/logout';
import axios from 'axios';




export default function Home() {
  const [uuid, setUuid] = useState(null)
  const getProfile = () => {
    axios.get('/main/profile')
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const instance = axios.create({
    headers: {
      'Authorization': `Bearer ${Cookies.get('uuid')}`,
      'Access-Control-Allow-Origin': '*',
    }
  })
  useEffect(() => {
    setUuid(Cookies.get('uuid'))
    console.log(uuid)
  }, [uuid])

  if (!uuid) {
    return (
      <ToLogin />
    )
  }

  console.log(uuid)
  return (
    <Container>
      <Row style={{ marginBottom: '20vh' }}>
        <h2>오늘도</h2>
        <h2>안전운전 하세요</h2>
        <Button onClick={() => instance.get('/main/profile')
          .then((res) => {
            console.log(res.data)
          }
          )
        }>api 테스트</Button>
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
