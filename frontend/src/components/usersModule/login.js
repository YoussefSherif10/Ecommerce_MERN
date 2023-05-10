import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const API_ENDPOINT = 'http://localhost:3000'

function Login() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const [required, setRequired] = useState(false);
    const [msg, setMsg] = useState('');

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
        if (!(data.mail && data.password))
            return setRequired(true);
        const token = await postData(data);
        if (token.msg)
            return setMsg('User not found');
        localStorage.setItem("token", token);
        navigate('/')
    }
    return (
        <form onSubmit={handleSubmit(onSubmitfunc)}
              className='d-flex flex-column col-12 col-md-8 border border-primary rounded p-3 shadow p-3 mb-5 bg-white rounded'>
            <h1 className='display-1'>Login</h1>
            {required && <div className="alert alert-danger" role="alert">
                All fields are required
            </div>}
            {!!msg && <div className="alert alert-danger" role="alert">
                {msg}
            </div>}
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="Enter email" {...register('mail')}/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                       placeholder="Password" {...register('password')}/>
            </div>
            <button type="submit" className="btn btn-primary mt-2 align-self-center">Login</button>
            <p className='mt-3 align-self-center'>Don't have an account?
                <button className='btn btn-link'
                        onClick={() => navigate('/signup')}>signup</button>
            </p>
        </form>
    )
}

export default Login;