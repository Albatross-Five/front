'use client'
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import RecogCamera from './RecogCamera';
import style from '@/styles/CameraComponent.module.css'

export default function FaceRecogModal({ show, handleClose, userArray }) {
  // camera가 존재하고 권한이 있는지 확인하는 변수
  const [hasPermission, setHasPermission] = useState(null);
  return (
    <Modal show={show} onHide={handleClose}>
      <RecogCamera
        show={show}
        hasPermission={hasPermission}
        setHasPermission={setHasPermission}
        userArray={userArray}
      />
    </Modal>
  )
}