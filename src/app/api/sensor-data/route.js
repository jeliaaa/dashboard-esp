import dbConnect from '../../../lib/dbConnect';
import SensorData from '../../../models/sensorData';

export async function POST(req, res) {
  await dbConnect();
  const { x, y } = await req.json();

  try {
    const sensorData = await SensorData.create({ x, y });
    return new Response(JSON.stringify(sensorData), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save data' }), { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const sensorData = await SensorData.find({}).sort({ createdAt: -1 }).limit(10);
    return new Response(JSON.stringify(sensorData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 400 });
  }
}
