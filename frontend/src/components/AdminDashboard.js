import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('/api/orders')
            .then((response) => response.json())
            .then((data) => setOrders(data));
    }, []);

    const updateStatus = async (id, status) => {
        await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        setOrders((prev) =>
            prev.map((order) =>
                order._id === id ? { ...order, status } : order
            )
        );
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        <p>Order ID: {order._id}</p>
                        <p>Buyer: {order.buyer.name}</p>
                        <p>Status: {order.status}</p>
                        <button onClick={() => updateStatus(order._id, 'In Progress')}>In Progress</button>
                        <button onClick={() => updateStatus(order._id, 'Delivered')}>Delivered</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
