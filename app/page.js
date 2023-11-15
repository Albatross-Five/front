import Image from 'next/image'

import Link from 'next/link'
import Logout from '@/components/logout'
import LocalStorage from '@/func/localStorage';

export default function Home() {
  // localStorage 사용
  // 로그인 되어있지 않으면 로그인 링크를 보여준다.
  const isLogin = LocalStorage.getItem('isLogin');
  if (!isLogin) {
    return (
      <div>
        <Link href="/login">
          로그인
        </Link>
      </div>
    )
  }

  return (
    <div>
      하이
      <Logout />
    </div>
  )
}
