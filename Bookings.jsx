import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Bookings(){
  const [bookings, setBookings] = useState([])
  useEffect(()=>{ axios.get('http://localhost:4000/api/status').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/parcels').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/parcels').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/status').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/parcels').then(()=>{}).catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').then(()=>{}).catch(()=>{}); axios.get('http://localhost:4000/api/match').then(()=>{}).catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').then(()=>{}).catch(()=>{}); axios.get('http://localhost:4000/api/parcels').then(()=>{}).catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').then(()=>{}).catch(()=>{}) },[])
  return (
    <div className='card'>
      <h3>Bookings</h3>
      <p className='small'>Bookings are stored server-side in server/db.json under bookings[]. Open server/db.json to view details.</p>
    </div>
  )
}
