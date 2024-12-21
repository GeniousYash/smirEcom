import React, { useState, useContext } from 'react'
import logo from "/icons/blacklogotext.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({})

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            phoneNumber: phoneNumber,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

        if (response.status === 201) {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/')
        }

        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
    }

    return (
        <div>
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                    <img className='w-[30%] mb-8' src={logo} alt="App Logo" />
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <h3 className='text-base font-medium mb-2'>What's your name</h3>
                        <div className='flex gap-4 mb-5'>
                            <input
                                required
                                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                                type="text"
                                placeholder='firstname'
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                            />
                            <input
                                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                                type="text"
                                placeholder='lastname'
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                            />
                        </div>


                        <h3 className='text-base font-medium mb-2'>What's your email</h3>
                        <input
                            required
                            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            type="email"
                            placeholder='email@example.com'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />

                        <h3 className='text-base font-medium mb-2'>What's your Phone Number</h3>
                        <input
                            required
                            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            type="number"
                            placeholder='0000000000'
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                            }}
                        />

                        <h3 className='text-base font-medium mb-2'>Enter Password</h3>

                        <input
                            required
                            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>
                    </form>
                    <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login here !</Link></p>
                </div>
                <div>
                    <p className='text-[12px] leading-tight'>By proceeding, you consent to get calls,WhatsApp or SMS messages, including by automated means, from SMIR and its affiliants to the number provided.</p>
                </div>
            </div>
        </div>
    )
}

export default UserSignup
