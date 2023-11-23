'use client'
import CameraComponent from '@/components/camera';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import ToLogin from '@/components/ToLogin';
import Cookies from 'js-cookie';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import style from '@/styles/Drive.module.css'
import axios from 'axios';

export default function Drive() {
  // camera가 존재하고 권한이 있는지 확인하는 변수
  const [hasPermission, setHasPermission] = useState(null);


  // 운전이 끝났는지 확인하는 state
  const [isDriveEnd, setIsDriveEnd] = useState(false);
  const [isSleep, setIsSleep] = useState(0);
  const [isPhone, setIsPhone] = useState(0);

  const [uuid, setUuid] = useState(null)
  useEffect(() => {
    setUuid(Cookies.get('uuid'))
    console.log(uuid)
  }, [uuid])

  // 운전 종료
  const sendDriveEnd = () => {
    const formData = new FormData();
    formData.append('file', null)
    formData.append('flag', 0);
    axios.post('https://hgm-ml.p-e.kr/abnormal/detect',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    setIsDriveEnd(true);
    //window.location.href = '/';
  }


  // 컴포넌트 렌더링
  if (!uuid) {
    return (
      <div>
        <ToLogin />
      </div>
    )
  }
  return (
    <Container>
      <Row>
        <Col className='text-center'>
          {isSleep ? <Alert variant='danger' className={style.item_alert}>졸음운전이 감지되었습니다</Alert> : <Alert className={style.item_alert}>졸음운전이 감지되지 않았습니다</Alert>}

        </Col>
        <Col className='text-center'>
          {isPhone ? <Alert variant='danger' className={style.item_alert}>휴대폰 사용이 감지되었습니다</Alert> : <Alert className={style.item_alert}>핸드폰 사용이 감지되지 않았습니다</Alert>}
        </Col>

      </Row>

      <div className={style.item_camera}>
        <CameraComponent
          hasPermission={hasPermission}
          setHasPermission={setHasPermission}
          isDriveEnd={isDriveEnd}
          isSleep={isSleep}
          setIsSleep={setIsSleep}
          isPhone={isPhone}
          setIsPhone={setIsPhone}
        />
      </div>
      <Row>
        <Button variant='danger' onClick={sendDriveEnd}>운전 종료</Button>
      </Row>
    </Container>
  )
}
