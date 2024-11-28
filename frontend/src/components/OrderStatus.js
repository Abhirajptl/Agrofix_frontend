import React, { useState } from 'react';

const OrderStatus = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null);

    const checkStatus = async () => {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        setStatus(data.status);
    };

    return (
        <div>
            <h2>Order Status</h2>
            <input
                type="text"
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />
            <button onClick={checkStatus}>Check Status</button>
            {status && <p>Status: {status}</p>}
        </div>
    );
};

export default OrderStatus;
