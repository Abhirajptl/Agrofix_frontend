import React, { useEffect, useState } from 'react';

const Catalogue = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <div>
            <h2>Product Catalogue</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - ${product.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Catalogue;
