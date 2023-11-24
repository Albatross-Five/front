import axios from "axios"
import Cookies from "js-cookie"
//a010a07f-d3cd-47c7-a204-98255c3a9c3c

export default function addNewUser(nickname, pin, image) {
  const uuid = Cookies.get('uuid')
  const instance = axios.create({
    headers: {
      'Authorization': `Bearer ${uuid}`,
    }
  })
  console.log("addNewUser called")
  console.log(nickname, pin, image)
  console.log(uuid)

  const formData = new FormData()
  formData.append('nickname', nickname)
  formData.append('pin', pin)
  formData.append('faceImg', image)

  instance.post(
    '/main/profile',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
      }
    }
  )
    .then(res => {
      console.log(res.data)
      window.location.reload()
    })
    .catch(err => console.log(err)
    )
}