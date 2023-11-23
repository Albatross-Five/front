import Cookies from "js-cookie"
export default function logout() {
  try {
    Cookies.remove('uuid')
  }
  catch (e) {
    console.log(e)
  }

  try {
    Cookies.remove('nickname')
  }
  catch (e) {
    console.log(e)
  }

  window.location.href = '/'
}