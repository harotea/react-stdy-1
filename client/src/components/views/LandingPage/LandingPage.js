import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {

  useEffect(() => {
    //get request를 server에 보냄
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  })

  return (
    <div>
        LandingPage 랜딩페이지 체크
    </div>
  )
}

export default LandingPage