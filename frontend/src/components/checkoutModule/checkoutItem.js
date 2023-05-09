const CheckoutItem = ({item, increment, decrement}) => {

    return (
        <>
            <img src={item.image} alt='image'/>
            <h1>{item.title}</h1>
            <h5>{item.description}</h5>
            <button onClick={() => decrement(item.id)}>-</button>
            <h3>{item.count}</h3>
            <button onClick={() => increment(item.id)}>+</button>
        </>
    );
}

export default CheckoutItem;