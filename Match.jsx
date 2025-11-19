import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Match(){
  const [parcels, setParcels] = useState([])
  const [selected, setSelected] = useState(null)
  const [matches, setMatches] = useState([])

  useEffect(()=>{ axios.get('http://localhost:4000/api/parcels').then(r=>setParcels(r.data)).catch(()=>{}) },[])

  const find = async ()=>{
    if(!selected) return alert('Select parcel')
    const res = await axios.post('http://localhost:4000/api/match', {parcelId:selected})
    setMatches(res.data.matches || [])
  }

  const book = async (vehicleId)=>{
    try{
      const res = await axios.post('http://localhost:4000/api/book', {parcelId:selected, vehicleId})
      alert('Booked! booking id: ' + res.data.id)
    }catch(err){ alert('Booking failed: ' + (err.response?.data?.error || '')) }
  }

  return (
    <div>
      <div className='card'>
        <h3>Match parcel to Vehicles</h3>
        <select onChange={e=>setSelected(e.target.value)} style={{padding:8,width:'100%'}}>
          <option value=''>-- Select parcel --</option>
          {parcels.map(p=> <option key={p.id} value={p.id}>{p.senderName} • {p.pickup}→{p.dropoff} • {p.length}×{p.width}×{p.height}/{p.weight}kg</option>)}
        </select>
        <p><button onClick={find}>Find matching vehicles</button></p>
      </div>

      <div className='card'>
        <h4>Matches</h4>
        {matches.length===0 && <p className='small'>No matches yet</p>}
        <table className='table'>
          <thead><tr><th>Driver</th><th>Route</th><th>Dims</th><th></th></tr></thead>
          <tbody>
            {matches.map(m=>(
              <tr key={m.id}><td>{m.driverName}<br/><span className='small'>{m.phone}</span></td><td>{m.start}→{m.end}</td><td>{m.length}×{m.width}×{m.height} / {m.capacity_weight}kg</td><td><button onClick={()=>book(m.id)}>Book</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
