import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Vehicles from './pages/Vehicles'
import AddVehicle from './pages/AddVehicle'
import Parcels from './pages/Parcels'
import AddParcel from './pages/AddParcel'
import Match from './pages/Match'
import Bookings from './pages/Bookings'

export default function App(){
  return (
    <div>
      <header className='header'>
        <div style={{fontWeight:700}}>BlaVlaDelivery Pro</div>
        <nav>
          <Link to="/" style={{color:'white', marginRight:12}}>Home</Link>
          <Link to="/vehicles" style={{color:'white', marginRight:12}}>Vehicles</Link>
          <Link to="/parcels" style={{color:'white', marginRight:12}}>Parcels</Link>
          <Link to="/match" style={{color:'white', marginRight:12}}>Match</Link>
          <Link to="/bookings" style={{color:'white'}}>Bookings</Link>
        </nav>
      </header>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/vehicles' element={<Vehicles/>}/>
          <Route path='/add-vehicle' element={<AddVehicle/>}/>
          <Route path='/parcels' element={<Parcels/>}/>
          <Route path='/add-parcel' element={<AddParcel/>}/>
          <Route path='/match' element={<Match/>}/>
          <Route path='/bookings' element={<Bookings/>}/>
        </Routes>
      </div>
    </div>
  )
}

function Home(){
  return (<div className='card'><h2>Welcome to BlaVlaDelivery Pro</h2><p className='small'>This demo matches parcels to vehicles based on length/width/height/weight and route similarity (simple contains match).</p><p><Link to='/add-parcel'><button>Create Parcel</button></Link> <Link to='/add-vehicle'><button style={{background:'#2563eb'}}>Add Vehicle</button></Link></p></div>)
}
