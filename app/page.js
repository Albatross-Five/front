'use client'

import Logout from '@/components/logout'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
//import 'bootstrap/dist/css/bootstrap.min.css';
import ToLogin from '@/components/ToLogin'
import { Button, Container, Row, Col } from 'react-bootstrap'





export default function Home() {
  const [uuid, setUuid] = useState(null)
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
      <Row>
        <h2>오늘도</h2>
        <h2>안전운전 하세요</h2>
      </Row>
      <Row className='justify-content-center'>
        <Col className='text-center'>
          <Button size='lg' href="/drive">
            운전하기
          </Button>
        </Col>
        <Col className='text-center'>
          <Button size='lg' href="/mypage">
            마이페이지
          </Button>
        </Col>
        <Col className='text-center'>
          <Logout />
        </Col>
      </Row>
      {/*{uuid}*/}
    </Container>
  )
}
