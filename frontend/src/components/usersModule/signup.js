import {useForm} from "react-hook-form";
import {useState} from "react";

const API_ENDPOINT = 'http://localhost:3000'

function Signup() {
    const {register, handleSubmit} = useForm();

    const postData = async (postedData) => {
        const data = await fetch(`${API_ENDPOINT}/users/signup`, {
            method: 'POST', body: JSON.stringify(postedData), headers: {
                "Content-Type": "application/json",
            },
        })
        const jsonData = await data.json();
        return jsonData;
    }

    const onSubmitfunc = async (data) => {
        if (data.password === data.passwordConfirmation) {
            const {passwordConfirmation, ...restData} = data;
            const token = await postData(restData);
            localStorage.setItem("token", token);
        }
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
                <label htmlFor="exampleInputEmail1">Name</label>
                <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="Enter name" {...register('name')}/>
            </div>
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
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password confirmation</label>
                <input type="password" className="form-control" id="exampleInputPasswordConfirmation1"
                       placeholder="Password confirmation" {...register('passwordConfirmation')}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>)
}

export default Signup;