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
        <div className='card mt-2 shadow-sm p-3 mb-5 bg-white rounded'>
            <img className='card-img-top' src={item.image} alt='no image' width='150px' height='150px'/>
            <div className='card-body'>
                <h1 className='card-title'>{item.title}</h1>
                <p className='card-text'>{item.description}</p>
                {count > 0 ? (
                    <div className='float-end' style={{display: 'flex', gap: '8px'}}>
                        <button className='btn btn-danger' onClick={() => {
                            AddItemToCart({item, isMinus: true})
                            setCount(prevCount => --prevCount);
                        }}>-</button>
                        <p>{count}</p>
                        <button className='btn btn-success' onClick={() => {
                            AddItemToCart({item});
                            setCount(prevCount => ++prevCount);
                        }}>+</button>
                    </div>
                ) : (
                    <button className='btn btn-success float-end' onClick={() => {
                        AddItemToCart({item})
                        setCount(prevCount => ++prevCount);
                    }}>Add item to cart</button>
                )}
            </div>
        </div>
    )
}

export default Item;