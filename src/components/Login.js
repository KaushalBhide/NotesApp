import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});

    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const respone = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
          });
        const json = await respone.json();
        console.log(json);
        if(json.success){
            // Save the auth-token redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in successfully", "success");
            history.push("/");
        }
        else{
            props.showAlert("invalid credentials", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        // ... is spread operator which sets the input value to their corresponding name i.e set input value of title to "title"
    };

    return (
        <div>
            <h2 className='my-1'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit} className=' my-3'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
