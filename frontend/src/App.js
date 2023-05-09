import './App.css';
import Login from "./components/usersModule/login";
import Signup from "./components/usersModule/signup";
import ItemsComponent from "./components/checkoutModule/items";
import CheckoutPage from "./components/checkoutModule/checkoutPage";
import {Routes, Route} from "react-router-dom";

function App() {
    return (
        <div className='app' style={{height: '100vh', width: '100vw'}}>
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
