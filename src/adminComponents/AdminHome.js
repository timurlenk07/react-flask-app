import {useEffect, useState} from "react";
import {authFetch} from "../auth";

export default function AdminHome(props) {
  const [msg, setMsg] = useState('No data')
  useEffect(() => {
    authFetch('/admin/home/data', {
      method: 'get'
    }).then(r => r.json())
      .then(r => {
        setMsg(r.message);
      }, [])
  })

  return (
    <div>
      <h1>
        Üdv az Admin otthonában!
      </h1>
      <p>
        Az üzenet: {msg}
      </p>
    </div>
  )
}