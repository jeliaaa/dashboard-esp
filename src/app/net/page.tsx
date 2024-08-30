'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://info-ej7a8rsse-jeliaaas-projects.vercel.app/'); // Your Vercel app URL

const DamageStatus = () => {
    const [damageStatus, setDamageStatus] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server.');
        });

        // Listen for the update event
        socket.on('update', (data : any) => {
            console.log('Received update notification:', data);
            setDamageStatus(data.status); // Update state with the damage status
        });

        return () => {
            socket.off('update');
        };
    }, []);

    return (
        <div>
            <h1>Damage Status: {damageStatus}</h1>
        </div>
    );
};

export default DamageStatus;
