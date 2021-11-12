import React from 'react';
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")

    const fetchSignIn = async () => {
        const url = "http://localhost:4000/user/sign-in";
        const body = { email: email, password: password }
        const datos = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }

        try {
            const res = await fetch(url, datos)
            const data = await res.json()
            return data
        } catch {
            return { error: "Something went wrong. Try it again later on" }
        }
    }

    const history = useHistory();

    const handleButtonSI = async (e) => {
        e.preventDefault()

        const data = await fetchSignIn()
        if (data.jwtToken) {
            
            history.push("/Dashboard")
            localStorage.setItem(email, JSON.stringify(data.jwtToken));
            console.log("token en handle: ", data);

        } else if (data.error) {
            setError(data.error);
           history.push("/sign-up")
        }

    }
    return (
        <div>
            <form>
                <label>
                    <input type="text" placeholder="mail" value={email}
                        onChange={e => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    <input type="password" placeholder="password" value={password}
                        onChange={e => setPassword(e.target.value)} />
                </label>
                <br />
                <button onClick={handleButtonSI}>
                    Sign in
                </button>
                <br />
                {error}

                <br />
            </form>
        </div>
    )
};


export default SignIn
