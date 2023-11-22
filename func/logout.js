import Cookies from "js-cookie"
export default function logout() {
  try {
    Cookies.remove('uuid')
    window.location.href = '/'
  }
  catch (e) {
    console.log(e)
  }
}