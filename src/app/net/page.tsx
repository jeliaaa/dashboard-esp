'use client'
import { useEffect, useState } from 'react';

const SensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    fetch('/api/net')
      .then((response) => response.json())
      .then((data) => {
        setSensorData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err);
        setError('Failed to fetch data.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data immediately on component mount

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="overflow-x-auto">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="min-w-full bg-white border">
          <thead>
            <tr className='text-black'>
              <th className="px-4 py-2 border">Timestamp</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((data: any, index) => (
              <tr key={index} className='text-black'>
                <td className="px-4 py-2 border">{new Date(data.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2 border">{data.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SensorData;
