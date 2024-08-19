import SensorData from '@/components/SensorData';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Joystick Dashboard</title>
      </Head>
      <main className="container mx-auto p-4">
        <SensorData />
      </main>
    </div>
  );
}