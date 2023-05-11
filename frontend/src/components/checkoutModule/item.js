function Item({item, addItemToCart, removeItemFromCart}) {
    return (
        <div className='card m-2 shadow-sm p-3 mb-5 bg-white rounded col-6 col-md-3'>
            <img className='card-img-top' src={item.image} alt='no image' width='150px' height='200px'/>
            <div className='card-body'>
                <h1 className='card-title'>{item.title}</h1>
                <p className='card-text'>{item.description}</p>
                {item.count > 0 ? (
                    <div className='float-end' style={{display: 'flex', gap: '8px'}}>
                        <button className='btn btn-danger' onClick={() => removeItemFromCart(item._id)}>-</button>
                        <p>{item.count}</p>
                        <button className='btn btn-success' onClick={() => addItemToCart(item._id)}>+</button>
                    </div>
                ) : (
                    <button className='btn btn-success float-end' onClick={() => addItemToCart(item._id)}>Add item to cart</button>
                )}
            </div>
        </div>
    )
}

export default Item;