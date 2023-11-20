'use client'
import Link from 'next/link'
import Logout from '@/components/logout'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Modal } from 'react-bootstrap';




export default function Home() {
  const [uuid, setUuid] = useState(null)
  useEffect(() => {
    setUuid(Cookies.get('uuid'))
    console.log(uuid)
  }, [])

  if (!uuid) {
    return (
      <div>
        <Link href="/login">
          로그인
        </Link>
      </div>
    )
  }

  console.log(uuid)
  return (
    <div>
      메인 페이지입니다. <br></br>
      {uuid}
      <Logout />
      
    </div>
  )
}
