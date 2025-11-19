const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Low, JSONFile } = require('lowdb');
const { nanoid } = require('nanoid');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// lowdb setup (file storage)
const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

async function initDB(){
  await db.read();
  db.data = db.data || { vehicles: [], parcels: [], bookings: [] };
  await db.write();
}
initDB();

// Helper: check if vehicle can fit parcel
function fits(vehicle, parcel){
  // compare length,width,height (any orientation allowed) and weight <= capacity
  const v = [Number(vehicle.length), Number(vehicle.width), Number(vehicle.height)].sort((a,b)=>b-a);
  const p = [Number(parcel.length), Number(parcel.width), Number(parcel.height)].sort((a,b)=>b-a);
  const dimsFit = p[0] <= v[0] && p[1] <= v[1] && p[2] <= v[2];
  const weightFit = Number(parcel.weight) <= Number(vehicle.capacity_weight);
  return dimsFit && weightFit;
}

// Add vehicle
app.post('/api/vehicles', async (req,res)=>{
  const { driverName, phone, start, end, length, width, height, capacity_weight, seats } = req.body;
  if(!driverName || !start || !end) return res.status(400).json({error:'Missing fields'});
  const vehicle = { id: nanoid(), driverName, phone, start, end, length, width, height, capacity_weight, seats, createdAt: Date.now() };
  await db.read();
  db.data.vehicles.push(vehicle);
  await db.write();
  res.json(vehicle);
});

// List vehicles
app.get('/api/vehicles', async (req,res)=>{
  await db.read();
  res.json(db.data.vehicles);
});

// Create parcel
app.post('/api/parcels', async (req,res)=>{
  const { senderName, phone, pickup, dropoff, length, width, height, weight } = req.body;
  if(!senderName || !pickup || !dropoff) return res.status(400).json({error:'Missing fields'});
  const parcel = { id: nanoid(), senderName, phone, pickup, dropoff, length, width, height, weight, createdAt: Date.now() };
  await db.read();
  db.data.parcels.push(parcel);
  await db.write();
  res.json(parcel);
});

// Match parcel to vehicles along similar route
app.post('/api/match', async (req,res)=>{
  const { parcelId } = req.body;
  await db.read();
  const parcel = db.data.parcels.find(p=>p.id===parcelId);
  if(!parcel) return res.status(404).json({error:'Parcel not found'});
  // naive route match: vehicle start/ end contain pickup/dropoff strings (simple contains)
  const candidates = db.data.vehicles.filter(v=>{
    const routeMatch = (v.start.toLowerCase().includes(parcel.pickup.toLowerCase()) || parcel.pickup.toLowerCase().includes(v.start.toLowerCase()))
                     && (v.end.toLowerCase().includes(parcel.dropoff.toLowerCase()) || parcel.dropoff.toLowerCase().includes(v.end.toLowerCase()));
    return routeMatch && fits(v, parcel);
  });
  res.json({parcel, matches: candidates});
});

// Book vehicle for parcel
app.post('/api/book', async (req,res)=>{
  const { parcelId, vehicleId } = req.body;
  await db.read();
  const parcel = db.data.parcels.find(p=>p.id===parcelId);
  const vehicle = db.data.vehicles.find(v=>v.id===vehicleId);
  if(!parcel || !vehicle) return res.status(404).json({error:'Parcel or vehicle not found'});
  // check already booked
  const already = db.data.bookings.find(b=>b.parcelId===parcelId);
  if(already) return res.status(400).json({error:'Parcel already booked'});
  const booking = { id: nanoid(), parcelId, vehicleId, vehicleDriver: vehicle.driverName, createdAt: Date.now() };
  db.data.bookings.push(booking);
  await db.write();
  res.json(booking);
});

// simple status
app.get('/api/status', (req,res)=> res.json({ok:true, time:Date.now()}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
