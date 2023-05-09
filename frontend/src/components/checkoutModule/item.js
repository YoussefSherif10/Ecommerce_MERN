import {useState} from "react";

function Item({item}) {
    const ItemIsAddedToCart = () => {
        const allItems = JSON.parse(localStorage.getItem("cart"))
        if (!allItems) return null;
        else if (!allItems.find(i => i.id === item.id)) {
            return null;
        } else {
            return allItems.find(i => i.id === item.id);
        }
    }
    const [count, setCount] = useState(parseInt(ItemIsAddedToCart()?.count) || 0);

    const AddItemToCart = ({item, isMinus}) => {
        const allItems = JSON.parse(localStorage.getItem("cart"))
        if (!allItems) {
            localStorage.setItem("cart", JSON.stringify([{...item, count: 1}]));
        } else {
            const selectedItem = allItems?.find(i => {
                console.log({iId: i?.id, itemId: item?.id})
                return i.id == item.id
            });
            console.log({selectedItem})
            if (selectedItem) {
                if(isMinus) selectedItem.count--
                else selectedItem.count++
            } else {
                allItems.push({...item, count: 1});
            }
            localStorage.setItem("cart", JSON.stringify(allItems));
        }
    }
    return (
        <div
            style={{width: 'fit-content', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '16px'}}>
            <img src={item.image} alt='no image' width='200px' height='200px'/>
            <div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                {count > 0 ? (
                    <div style={{display: 'flex', gap: '8px'}}>
                        <button onClick={() => {
                            AddItemToCart({item, isMinus: true})
                            setCount(prevCount => --prevCount);
                        }}>-</button>
                        <p>{count}</p>
                        <button onClick={() => {
                            AddItemToCart({item});
                            setCount(prevCount => ++prevCount);
                        }}>+</button>
                    </div>
                ) : (
                    <button onClick={() => {
                        AddItemToCart({item})
                        setCount(prevCount => ++prevCount);
                    }}>Add item to cart</button>
                )}
            </div>
        </div>
    )
}

export default Item;