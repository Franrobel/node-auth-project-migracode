import React, { useState } from 'react'
import SignIn from './SignIn';
const SignUp = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const fetchSignUp = () => {
        const url = "http://localhost:4000/user/sign-up";
        const body = { name: name, email: mail, password: password }
        const datos = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }
        fetch(url, datos)
            .then(res => res.json())
            .then(data => {
                if (data.isAuthenticated) {
                    console.log("DATA IS AUTHENTICA ",data);
                };
            })
    }
    const handleButtonSU = (e) => {
        e.preventDefault()
        fetchSignUp()
    }

    return (
        <div>
            <div>
                YOU ARE NOT A USER
                <br />
                PLEASE SIGN UP TO ENTER TO THIS WEB
            </div>
            <div>
                <form>
                    <label>
                        <input type="text" placeholder="name" value={name}
                            onChange={e => setName(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        <input type="text" placeholder="mail" value={mail}
                            onChange={e => setMail(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        <input type="password" placeholder="password" value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <button onClick={handleButtonSU}>sign up</button>

                </form>
            </div>
        </div>
    )
}
export default SignUp
