import {useEffect, useState} from 'react';
import './App.css';
import {useForm} from "react-hook-form";

const API_ENDPOINT = 'http://localhost:3000/'

function App() {
    const {register, handleSubmit} = useForm();
    const [loginData, setLoginData] = useState(null)
    console.log({loginData})

    const postData = async (postedData) => {
        const data = await fetch(`${API_ENDPOINT}/users/login`, {
            method: 'POST', body: JSON.stringify(postedData)
        })
        const jsonData = await data.json();
        return jsonData;
    }

    const onSubmitfunc = (data) => {
        console.log({data})
        const token = postData(data)
        setLoginData(token)
    }
    return (<div style={{display: 'flex', flexDirection: 'column', width: 'fit-content', height: '100%'}}>
            <form onSubmit={handleSubmit(onSubmitfunc)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Enter email" {...register('mail')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                           placeholder="Password" {...register('password')}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default App;
