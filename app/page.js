'use client'

import Logout from '@/components/logout'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToLogin from '@/components/toLogin'






export default function Home() {
  const [uuid, setUuid] = useState(null)
  useEffect(() => {
    setUuid(Cookies.get('uuid'))
    console.log(uuid)
  }, [uuid])

  if (!uuid) {
    return (
      <div>
        <ToLogin />
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
