import Item from "./item";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"

function ItemsComponent() {
    const navigate = useNavigate();

    function parseJwt(token) {
        if (!token) {
            return;
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const name = parseJwt(localStorage.getItem('token'))?.name;

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/items').then(response => {
            setItems(response.data);
        })
        const cartedItems = JSON.parse(localStorage.getItem("cart"));
        if (!cartedItems)
            setItems(cartedItems);
    }, []);

    const addItemToCart = (id) => {
        let newItems = [...items];
        let item = newItems.find(i => i._id == id);
        item.count++;
        setItems(newItems);
        localStorage.setItem("cart", JSON.stringify(newItems));
    }

    const removeItemFromCart = (id) => {
        let newItems = [...items];
        const index = newItems.findIndex(i => i._id == id);
        newItems.splice(index, 1);
        setItems(newItems);
        localStorage.setItem("cart", JSON.stringify(newItems));
    }

    return (
        <>
            <h1 className='display-1 align-self-right col-8'>Products</h1>
            <small className="display-6 text-muted col-8 align-self-right p-1">Hi {name}, the items you pick will be
                added to your cart </small>
            <div
                className='d-flex flex-wrap justify-content-around p-2 mt-3 col-12 col-md-9 border border-primary rounded shadow p-3 mb-5 bg-white rounded'>
                {items.map((item) => <Item key={item._id} item={item} addItemToCart={addItemToCart}
                                           removeItemFromCart={removeItemFromCart}/>)}
            </div>
            <button className='btn btn-primary mt-3 mb-3 col-9' onClick={() => navigate('/checkout')}>Checkout</button>
        </>
    )

}

export default ItemsComponent;