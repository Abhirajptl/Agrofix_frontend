import React from 'react';
import Catalogue from '../components/Catalogue';
import OrderForm from '../components/OrderForm';
import OrderStatus from '../components/OrderStatus';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to Bulk Orders</h1>
            <Catalogue />
            <OrderForm />
            <OrderStatus />
        </div>
    );
};

export default HomePage;
