import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const API_ENDPOINT = 'http://localhost:3000'

function Login() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const postData = async (postedData) => {
        const data = await fetch(`${API_ENDPOINT}/users/login`, {
            method: 'POST', body: JSON.stringify(postedData), headers: {
                "Content-Type": "application/json",
            },
        })
        const jsonData = await data.json();
        return jsonData;
    }

    const onSubmitfunc = async (data) => {
        console.log({data})
        const token = await postData(data);
        localStorage.setItem("token", token);
        navigate('/')
    }
    return (<div style={{
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <form
            onSubmit={handleSubmit(onSubmitfunc)}>
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
    </div>)
}

export default Login;