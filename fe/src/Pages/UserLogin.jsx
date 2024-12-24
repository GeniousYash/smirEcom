import React from 'react'
import logo from "/icons/blacklogotext.png"
import { Link } from 'react-router-dom'

const UserLogin = () => {
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-[30%] mb-8' src={logo} alt="App Logo" />
                <form >
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                    <input
                        required
                        value={password}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="password"
                        placeholder='Password'
                    />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
                </form>
                <p className='text-center'>New Here? <Link to='/signup' className='text-blue-600'>Create New Account</Link></p>
            </div>
        </div>
    )
}

export default UserLogin
