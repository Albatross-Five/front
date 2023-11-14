'use client'
import CameraComponent from '@/components/camera';
import React from 'react';
import { useEffect, useState, useRef } from 'react';


export default function Drive() {
  // camera가 존재하고 권한이 있는지 확인하는 변수
  const [hasPermission, setHasPermission] = useState(null);


  // 운전이 끝났는지 확인하는 state
  const [isDriveEnd, setIsDriveEnd] = useState(false);


  return (
    <div>
      드라이브 <br />
      <CameraComponent
        hasPermission={hasPermission}
        setHasPermission={setHasPermission}
        isDriveEnd={isDriveEnd}
      />
    </div>
  )
}
