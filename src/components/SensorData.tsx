// components/SensorData.js
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SensorData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/sensor-data');
        setData(response.data);
      } catch (err : any) {
        setError(err.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Fetch data every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Joystick Sensor Data</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {data.map((entry : any) => (
            <div key={entry.id} className="p-4 border rounded-lg">
              <p><strong>X:</strong> {entry.x}</p>
              <p><strong>Y:</strong> {entry.y}</p>
              <p><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SensorData;
