'use client'
import CameraComponent from '@/components/camera';
import React from 'react';
import { useEffect, useState, useRef } from 'react';



export default function Drive() {
  // camera가 존재하고 권한이 있는지 확인하는 변수
  const [hasPermission, setHasPermission] = useState(null);


  // 운전이 끝났는지 확인하는 state
  const [isDriveEnd, setIsDriveEnd] = useState(false);
  const [isSleep, setIsSleep] = useState(0);
  const [isPhone, setIsPhone] = useState(0);

  return (
    <div>
      드라이브 <br /> {isSleep ? '자는중' : '안자는중'} {isPhone ? '폰중' : '안폰중'}
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
  )
}
