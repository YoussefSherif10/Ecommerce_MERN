const CheckoutItem = ({item, increment, decrement}) => {

    return (
        <li className='list-group-item d-flex flex-wrap justify-content-around'>
            <img src={item.image} alt='image' width='100px' height='100px'/>
            <div className='d-flex flex-column'>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
                <div className='d-flex justify-content-around'>
            <button className='btn btn-danger' onClick={() => decrement(item.id)}>-</button>
            <h3>{item.count}</h3>
            <button className='btn btn-success' onClick={() => increment(item.id)}>+</button>
                </div>
            </div>
        </li>
    );
}

export default CheckoutItem;