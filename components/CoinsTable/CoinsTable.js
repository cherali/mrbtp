import { useEffect, useState } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';


const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
})

const channel = pusher.subscribe('coins-list')



function CoinsTable() {
  const [coinsList, setCoinsList] = useState(null)


  useEffect(() => {
    channel.bind('coin-price', data => {
      setCoinsList(data)
    })

    pusher.connection.bind('connected', async () => {
      try {
        await axios.post('/coins-list', { lang: 'Fa' })
      } catch (error) {
        console.log(error)
      }
    })
    return () => {
      pusher.disconnect()
    }
  }, [])



  return (
    <div>
      fdfsdf
    </div>
  )
}

export default CoinsTable
