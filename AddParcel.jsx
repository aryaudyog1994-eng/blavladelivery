import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddParcel(){
  const [form, setForm] = useState({senderName:'', phone:'', pickup:'', dropoff:'', length:'', width:'', height:'', weight:''})
  const nav = useNavigate()
  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:4000/api/parcels', form)
      alert('Parcel created')
      nav('/parcels')
    }catch(err){ alert('Error creating parcel') }
  }
  return (
    <div className='card'>
      <h3>Create Parcel</h3>
      <form onSubmit={submit}>
        <input placeholder='Sender name' value={form.senderName} onChange={e=>setForm({...form, senderName:e.target.value})} required/>
        <input placeholder='Phone' value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <input placeholder='Pickup city/address' value={form.pickup} onChange={e=>setForm({...form, pickup:e.target.value})} required/>
        <input placeholder='Dropoff city/address' value={form.dropoff} onChange={e=>setForm({...form, dropoff:e.target.value})} required/>
        <input placeholder='Length (cm)' value={form.length} onChange={e=>setForm({...form, length:e.target.value})} required/>
        <input placeholder='Width (cm)' value={form.width} onChange={e=>setForm({...form, width:e.target.value})} required/>
        <input placeholder='Height (cm)' value={form.height} onChange={e=>setForm({...form, height:e.target.value})} required/>
        <input placeholder='Weight (kg)' value={form.weight} onChange={e=>setForm({...form, weight:e.target.value})} required/>
        <button type='submit'>Create Parcel</button>
      </form>
    </div>
  )
}
