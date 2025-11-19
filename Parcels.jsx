import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Parcels(){
  const [parcels, setParcels] = useState([])
  useEffect(()=>{ axios.get('http://localhost:4000/api/status').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}) ; axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/vehicles').catch(()=>{}); axios.get('http://localhost:4000/api/parcels').then(r=>setParcels(r.data)).catch(()=>{}) },[])
  return (
    <div>
      <div className='card'><h3>Parcels <Link to='/add-parcel'><button style={{marginLeft:8}}>Create</button></Link></h3></div>
      <table className='table card'>
        <thead><tr><th>Sender</th><th>Route</th><th>Dimensions</th><th></th></tr></thead>
        <tbody>
          {parcels.map(p=>(
            <tr key={p.id}><td>{p.senderName}<br/><span className='small'>{p.phone}</span></td><td>{p.pickup} → {p.dropoff}</td><td>{p.length}×{p.width}×{p.height} / {p.weight}kg</td><td><Link to='/match'><button>Find Vehicles</button></Link></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
