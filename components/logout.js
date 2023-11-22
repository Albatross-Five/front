import Cookies from 'js-cookie';

import { Button } from 'react-bootstrap';
export default function Logout() {
  const logout = () => {
    // 로그아웃 처리
    Cookies.remove('uuid')
    // 로그아웃 처리가 완료되면 로그인 페이지로 이동
    window.location.href = '/'
  }
  return (
    <Button variant='secondary' size='lg' onClick={logout}>로그아웃</Button>
  );
}


