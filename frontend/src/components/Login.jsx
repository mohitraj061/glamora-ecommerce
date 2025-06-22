import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        };
        try {
            const response = await loginUser(data).unwrap();
            // console.log(response);
            const { token, user } = response;
            dispatch(setUser({ user }));
            alert('Login successful');
            navigate('/');

        } catch (error) {
            setMessage("Please provide a valid email and password!");
        }
    };

    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='max-w-sm border shadow bg-white mx-auto p-8'>
                <h2 className='text-center text-2xl font-semibold pt-5'>
                    Please login
                </h2>
                <form onSubmit={handleLogin}
                    className='space-y-5 max-w-sm mx-auto pt-8'>
                    <input
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required />

                    <input
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required />

                    {/* Display error message */}
                    {message && (
                        <p className="text-red-500">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        // disabled={loginLoading}
                        className='w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md'>
                        Login
                    </button>
                </form>

                <p className='my-5 italic text-sm text-center'>
                    Don't have an account ?
                    <Link to="/register" className='text-red-700  px-1 underline'> Register </Link> here.
                </p>
            </div>
        </section >
    );
};

export default Login;