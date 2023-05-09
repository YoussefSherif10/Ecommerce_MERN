import {useState} from "react";
import CheckoutItem from "./checkoutItem";

const CheckoutPage = () => {
    const locals = JSON.parse(localStorage.getItem("cart"));

    const [items, setItems] = useState(locals);

    const increment = (id) => {
        let newItems = [...items];
        const selectedItem = newItems.find(i => i.id === id);
        selectedItem.count++;
        console.log({selectedItem})
        setItems(newItems);
        localStorage.setItem("cart", JSON.stringify(newItems));
    }

    const decrement = (id) => {
        let newItems = [...items];
        const selectedItem = newItems.find(i => i.id === id);
        selectedItem.count--;
        if (selectedItem.count === 0)
            newItems = newItems.filter(i => i.id !== selectedItem.id);
        setItems(newItems);
        localStorage.setItem("cart", JSON.stringify(newItems));
    }

    return (
        <>
            {items.map(item => <CheckoutItem key={item.id} item={item} increment={increment} decrement={decrement}/>)}
        </>
    );
}

export default CheckoutPage;