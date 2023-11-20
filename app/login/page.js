"use client"

import axios from "axios"
import Cookies from "js-cookie"


export default function Login() {

  const signup = () => axios.post('/signup', {
  })
    .then((res) => {
      console.log(res.data.data.uuid)
      Cookies.set('uuid', res.data.data.uuid)
      console.log(Cookies.get('uuid'))
      // 페이지 이동
      window.location.href = '/'
    }
    )
    .catch((err) => {
      console.log(err)
    })


  return (
    <button onClick={signup}>
      GUEST로 시작하기
    </button>
  )
}