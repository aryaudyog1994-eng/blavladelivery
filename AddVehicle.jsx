import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddVehicle(){
  const [form, setForm] = useState({driverName:'', phone:'', start:'', end:'', length:'', width:'', height:'', capacity_weight:'', seats:''})
  const nav = useNavigate()
  const submit = async (e)=>{
    e.preventDefault()
    try{
      await axios.post('http://localhost:4000/api/vehicles', form)
      alert('Vehicle added')
      nav('/vehicles')
    }catch(err){ alert('Error adding vehicle') }
  }
  return (
    <div className='card'>
      <h3>Add Vehicle & Route</h3>
      <form onSubmit={submit}>
        <input placeholder='Driver name' value={form.driverName} onChange={e=>setForm({...form, driverName:e.target.value})} required/>
        <input placeholder='Phone' value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <input placeholder='Route start (city)' value={form.start} onChange={e=>setForm({...form, start:e.target.value})} required/>
        <input placeholder='Route end (city)' value={form.end} onChange={e=>setForm({...form, end:e.target.value})} required/>
        <input placeholder='Length (cm)' value={form.length} onChange={e=>setForm({...form, length:e.target.value})} required/>
        <input placeholder='Width (cm)' value={form.width} onChange={e=>setForm({...form, width:e.target.value})} required/>
        <input placeholder='Height (cm)' value={form.height} onChange={e=>setForm({...form, height:e.target.value})} required/>
        <input placeholder='Capacity weight (kg)' value={form.capacity_weight} onChange={e=>setForm({...form, capacity_weight:e.target.value})} required/>
        <input placeholder='Seats (optional)' value={form.seats} onChange={e=>setForm({...form, seats:e.target.value})}/>
        <button type='submit'>Save Vehicle</button>
      </form>
    </div>
  )
}
