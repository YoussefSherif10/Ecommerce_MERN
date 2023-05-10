import './App.css';
import Login from "./components/usersModule/login";
import Signup from "./components/usersModule/signup";
import ItemsComponent from "./components/checkoutModule/items";
import CheckoutPage from "./components/checkoutModule/checkoutPage";
import {Routes, Route, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function App() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        if (!token)
            navigate("/login");
    }, []);

    return (
        <div className='d-flex flex-column flex-wrap align-items-center mt-4 p-2 col-12'>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/" element={<ItemsComponent/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
