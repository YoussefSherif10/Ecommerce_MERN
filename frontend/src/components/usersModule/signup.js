import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const API_ENDPOINT = 'http://localhost:3000'

function Signup() {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const [required, setRequired] = useState(false);
    const [confirm, setConfirm] = useState(false);

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
        if (!(data.mail && data.password))
            return setRequired(true);
        if (data.password === data.passwordConfirmation) {
            const {passwordConfirmation, ...restData} = data;
            const token = await postData(restData);
            localStorage.setItem("token", token);
            navigate('/');
        }
        else {
            setConfirm(true);
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmitfunc)}
            className='d-flex flex-column col-12 col-md-8 border border-primary rounded p-3 shadow p-3 mb-5 bg-white rounded'>
            <h1 className='display-1'>Signup</h1>
            {required && <div className="alert alert-danger" role="alert">
                All fields are required
            </div>}
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="Enter name" {...register('name')}/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="Enter email" {...register('mail')}/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                       placeholder="Enter Password" {...register('password')}/>
            </div>
            {confirm && <div className="alert alert-danger" role="alert">
                All fields are required
            </div>}
            <div className="form-group mt-2">
                <label htmlFor="exampleInputPassword1">Password confirmation</label>
                <input type="password" className="form-control" id="exampleInputPasswordConfirmation1"
                       placeholder="Enter Password confirmation" {...register('passwordConfirmation')}/>
            </div>
            <button type="submit" className="btn btn-primary mt-3 mb-2 align-self-center">Signup</button>
        </form>
    )
}

export default Signup;