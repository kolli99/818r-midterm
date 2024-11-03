import React, { useState, useEffect } from 'react';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientName: '', doctorName: '', date: '' });

  useEffect(() => {
    // Fetch appointments from the backend service using the service name
    fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Error fetching appointments:", err)); // Added error handling
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post new appointment to the backend service using the service name
    fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(newAppointment => setAppointments([...appointments, newAppointment]))
    .catch(err => console.error("Error adding appointment:", err)); // Added error handling
  };

  return (
    <div>
      <h1>Doctor's Office Appointments</h1>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Patient Name" 
          value={form.patientName} 
          onChange={(e) => setForm({ ...form, patientName: e.target.value })} 
        />
        <input 
          placeholder="Doctor Name" 
          value={form.doctorName} 
          onChange={(e) => setForm({ ...form, doctorName: e.target.value })} 
        />
        <input 
          type="date" 
          value={form.date} 
          onChange={(e) => setForm({ ...form, date: e.target.value })} 
        />
        <button type="submit">Book Appointment</button>
      </form>

      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>{appt.patientName} with Dr. {appt.doctorName} on {new Date(appt.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

