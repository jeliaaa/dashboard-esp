// src/app/api/sensor-data/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { x, y } = await req.json();

  try {
    const sensorData = await prisma.sensorData.create({
      data: {
        x,
        y,
      },
    });

    return new Response(JSON.stringify(sensorData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET(req) {
  try {
    const sensorData = await prisma.sensorData.findMany({
      orderBy: { timestamp: 'desc' },
      take: 10,
    });

    return new Response(JSON.stringify(sensorData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
