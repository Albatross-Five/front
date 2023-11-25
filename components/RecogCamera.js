'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Spinner, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import style from '@/styles/CameraComponent.module.css'
import Cookies from 'js-cookie';
function RecogCamera({
  show,
  hasPermission,
  setHasPermission,
  userArray
}) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const uuid = Cookies.get('uuid')
  const [showSpinner, setShowSpinner] = useState(false);
  const instance = axios.create({
    headers: {
      'Authorization': `Bearer ${uuid}`,
    }
  })


  const sendImage = () => {
    if (!hasPermission) {
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    //canvas 화면 파일로 변환 후 콘솔에 출력



    canvas.toBlob(
      blob => {
        const formData = new FormData();
        // 사진 파일 출력
        formData.append('file', blob, 'file.jpg');
        setShowSpinner(true);
        instance
          .post(
            '/main/profile/recognition',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then(res => {
            setShowSpinner(false);
            console.log(res.data.data.index);
            Cookies.set('nickname', userArray[res.data.data.index].nickname)
            window.location.href = '/'
          })
          .catch(err => {
            console.log(err);
          });
      },
      'image/jpeg',
      0.075, // set the image quality
    );
  };


  useEffect(() => {
    //setUserId(localStorage.getItem('auth')); // get user id from local storage - TODO : change to user token
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        setHasPermission(true);
        setStream(stream);
      })
      .catch(err => {
        setHasPermission(false);
        console.log(err);
      });
    return () => {
      //clearInterval(intervalId); // Clean up interval on unmount
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [hasPermission, stream]);







  // // 카메라가 없으면 카메라가 없다는 메세지 출력
  // if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  //   return <Alert variant="danger">기기에 카메라가 없습니다.</Alert>;
  // }
  // 에러 핸들링
  if (hasPermission === null) {
    return <div style={{ justifyContent: 'center', alignContent: 'center' }}><Spinner></Spinner></div>;
  }
  // 권한이 없을 경우, 권한 요청 버튼
  if (hasPermission === false) {
    return (
      <Card className="text-center" style={{ width: '80%', margin: '1rem' }}>
        <Card.Header>카메라 권한이 필요합니다. </Card.Header>
        <Card.Body>카메라 접근을 허용해주세요. </Card.Body>
        <br />
        <Button
          style={{
            margin: '1rem',
          }}
          onClick={() => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then(stream => {
                setHasPermission(true);
                setStream(stream);
              })
              .catch(err => {
                setHasPermission(false);
                console.log(err);
              });
          }}>
          허용
        </Button>
      </Card>
    );
  }

  // 권한이 있으면 카메라 화면을 보여줌
  return (
    <Container>
      <Row style={{ alignContent: 'center', textAlign: 'center', justifyContent: 'center' }}>
        <video playsInline autoPlay ref={videoRef} className={style.camera} />

      </Row>
      <Row style={{ alignContent: 'center', textAlign: 'center', justifyContent: 'center', }}>
        {showSpinner && <Spinner></Spinner>}
      </Row>
      <Row style={{ alignContent: 'center', textAlign: 'center', justifyContent: 'center' }}>
        <Button onClick={sendImage} style={{ width: '80%', marginBottom: '3px', marginTop: '3px' }}>얼굴 인식하기</Button>
      </Row>

    </Container>
  );
}

export default RecogCamera;
