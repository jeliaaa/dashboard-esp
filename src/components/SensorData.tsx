'use client'
import { useEffect, useState } from 'react';

const SensorData = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    fetch('/api/sensor-data')
      .then((response) => response.json())
      .then((data) => {
        setSensorData(data);
      });
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className='text-black'>
            <th className="px-4 py-2 border">Timestamp</th>
            <th className="px-4 py-2 border">X Value</th>
            <th className="px-4 py-2 border">Y Value</th>
          </tr>
        </thead>
        <tbody>
          {sensorData.map((data : any, index) => (
            <tr key={index} className='text-black'>
              <td className="px-4 py-2 border">{new Date(data.createdAt).toLocaleString()}</td>
              <td className="px-4 py-2 border">{data.x}</td>
              <td className="px-4 py-2 border">{data.y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorData;
