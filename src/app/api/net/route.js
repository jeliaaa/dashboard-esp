import dbConnect from '../../../lib/dbConnect';
import NetData from '../../../models/netData';

export async function POST(req, res) {
  await dbConnect();
  const { status } = await req.json(); // Expecting status field from the request

  try {
    const netData = await NetData.create({ status });
    return new Response(JSON.stringify(netData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save data' }), { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const sensorData = await NetData.find({}).sort({ createdAt: -1 }).limit(10);
    return new Response(JSON.stringify(sensorData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 400 });
  }
}
