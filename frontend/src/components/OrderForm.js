import React, { useState } from 'react';
import  "./OrderForm.css"
const OrderForm = () => {
    const [form, setForm] = useState({
        buyerDetails: {
            name: '',
            contact: '',
            address: '',
        },
        items: [],
    });

    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleBuyerDetailsChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            buyerDetails: { ...form.buyerDetails, [name]: value },
        });
    };

    const handleAddItem = () => {
        if (product && quantity > 0) {
            setForm({
                ...form,
                items: [...form.items, { product, quantity }],
            });
            setProduct('');
            setQuantity(0);
        } else {
            alert('Please select a product and enter a valid quantity.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
          alert(`Order placed! ID: ${data.order._id}`);
        } else {
          alert(`Failed to place order: ${data.message || 'Unknown error'}`);
        }
      };
      

    return (
        <form onSubmit={handleSubmit}>
            <h2>Place an Order</h2>

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.buyerDetails.name}
                onChange={handleBuyerDetailsChange}
                required
            />
            <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={form.buyerDetails.contact}
                onChange={handleBuyerDetailsChange}
                required
            />
            <textarea
                name="address"
                placeholder="Address"
                value={form.buyerDetails.address}
                onChange={handleBuyerDetailsChange}
                required
            ></textarea>

            <h3>Add Items to Order</h3>
            <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required
            >
                <option value="">Select Product</option>
                <option value="Tomato">Tomato</option>
                <option value="Potato">Potato</option>
                <option value="Apple">Apple</option>
                <option value="Banana">Banana</option>
                <option value="Carrot">Carrot</option>
                <option value="Cucumber">Cucumber</option>
                <option value="Onion">Onion</option>
                <option value="Orange">Orange</option>
                <option value="Spinach">Spinach</option>
                <option value="Grapes">Grapes</option>
            </select>
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
            />
            <button type="button" onClick={handleAddItem}>
                Add Item
            </button>

            <h4>Items in Order:</h4>
            <ul>
                {form.items.map((item, index) => (
                    <li key={index}>
                        {item.product} - {item.quantity}
                    </li>
                ))}
            </ul>

            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;
