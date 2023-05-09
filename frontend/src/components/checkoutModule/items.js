import Item from "./item";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function ItemsComponent() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token) navigate('/login')
    },[])
    const items = [{
        id: 1,
        title: 'burger',
        description: 'stuffed with cheese',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    }, {
        id: 2,
        title: 'Pizza',
        description: 'stuffed with macaroni',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    }, {
        id: 3,
        title: 'chicken',
        description: ' stuffed with gambari',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    }, {
        id: 4,
        title: 'pepperoni',
        description: 'stuffed with meat bitch',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    }]
    return (
        <div style={{display: 'flex', flexDirection: 'row', gap: '24px', flexWrap: 'wrap', margin: '0 20px'}}>
            {items.map((item) => <Item key={item.id} item={item}/>)}
        </div>
    )

}

export default ItemsComponent;