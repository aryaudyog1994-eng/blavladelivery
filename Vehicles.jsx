import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Vehicles(){
  const [vehicles, setVehicles] = useState([])
  useEffect(()=>{ axios.get('http://localhost:4000/api/vehicles').then(r=>setVehicles(r.data)).catch(()=>{}) },[])
  return (
    <div>
      <div className='card'><h3>Vehicles <Link to='/add-vehicle'><button style={{marginLeft:8}}>Add</button></Link></h3></div>
      <table className='table card'>
        <thead><tr><th>Driver</th><th>Route</th><th>Dimensions (L×W×H)</th><th>Capacity(kg)</th></tr></thead>
        <tbody>
          {vehicles.map(v=>(
            <tr key={v.id}><td>{v.driverName}<br/><span className='small'>{v.phone}</span></td><td>{v.start} → {v.end}</td><td>{v.length} × {v.width} × {v.height}</td><td>{v.capacity_weight}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
