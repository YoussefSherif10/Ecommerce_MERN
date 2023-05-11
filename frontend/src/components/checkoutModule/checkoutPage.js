import {useState} from "react";
import CheckoutItem from "./checkoutItem";

const CheckoutPage = () => {
    const locals = JSON.parse(localStorage.getItem("cart"));

    const [items, setItems] = useState(locals);
    const [order, setOrder] = useState(false);

    const increment = (id) => {
        let newItems = items.filter(i => i.count > 0);
        const selectedItem = newItems.find(i => i._id === id);
        selectedItem.count++;
        console.log({selectedItem})
        setItems(newItems);
        localStorage.setItem("cart", JSON.stringify(newItems));
    }

    const decrement = (id) => {
        let newItems = items.filter(i => i.count > 0);
        const selectedItem = newItems.find(i => i._id === id);
        selectedItem.count--;
        if (selectedItem.count === 0)
            newItems = newItems.filter(i => i._id !== selectedItem.id);
        setItems(newItems);
        localStorage.setItem("cart", JSON.stringify(newItems));
    }


    return (
        <>
            <h1 className='display-1 col-8 float-start'>Cart</h1>

            {items.filter(i => i.count > 0).length === 0 ? <h1>No items added to the cart</h1> :
                <ul className='list-group col-12 col-md-9 mt-3'>
                    {items.filter(i => i.count > 0).map(item => <CheckoutItem key={item.id} item={item}
                                                                              increment={increment}
                                                                              decrement={decrement}/>)}
                </ul>
            }

            {order && <div className="alert alert-success mt-3" role="alert">
                This order is Placed!
            </div>}

            <button className='btn btn-primary mt-3 mb-3 col-9' onClick={() => setOrder(true)}>Place Order</button>
        </>
    );
}

export default CheckoutPage;