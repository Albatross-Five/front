'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import style from '@/styles/CameraComponent.module.css'

function CameraComponent({
  hasPermission,
  setHasPermission,
  isDriveEnd,
  isSleep,
  setIsSleep,
  isPhone,
  setIsPhone,
}) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

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
        formData.append('flag', 1);
        axios
          .post(
            'https://hgm-ml.p-e.kr/abnormal/detect',
            //'ml/abnormal/detect',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then(res => {
            console.log(res.data);
            if (res.data.sleep) {
              setIsSleep(1);
            } else {
              //setIsSleep(0);
            }
            if (res.data.phone) {
              setIsPhone(1);
            } else {
              //setIsPhone(0);
            }

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
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [hasPermission, stream]);


  useEffect(() => {
    if (isDriveEnd) {
      clearInterval(intervalId); // Clear the interval when exercise ends
    }
  }, [isDriveEnd]);


  useEffect(() => {
    if (hasPermission && !isDriveEnd) {
      const newIntervalId = setInterval(sendImage, 300); // set the sending rate
      setIntervalId(newIntervalId);

      return () => {
        clearInterval(newIntervalId); // Clean up interval on unmount
      };
    }
  }, [hasPermission, isDriveEnd]);

  // // 카메라가 없으면 카메라가 없다는 메세지 출력
  // if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  //   return <Alert variant="danger">기기에 카메라가 없습니다.</Alert>;
  // }
  // 에러 핸들링
  if (hasPermission === null) {
    return <div><Spinner></Spinner></div>;
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
    <video playsInline autoPlay ref={videoRef} className={style.camera} />
  );
}

export default CameraComponent;
