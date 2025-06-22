import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");

    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password,
        };
        
        try {
            await registerUser(data).unwrap();
            alert("Registration successful");
            navigate('/login');
        } catch (error) {
            setMessage("Registration failed");
        }
    };

    return (
        <section className='h-screen flex items-center justify-center'>
            <div className="max-w-sm mx-auto bg-white border shadow p-8">
                <h2 className="text-center text-2xl font-semibold pt-5">
                    Please Register
                </h2>
                <form
                    onSubmit={handleRegister}
                    className="space-y-5 max-w-sm mx-auto pt-8">
                    <input
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        required />

                    <input
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required />

                    <input
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required />

                    {message && (
                        <p className="text-red-500">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        // disabled={isLoading}
                        className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md">
                        Register
                    </button>
                </form>

                <p className="my-5 italic text-sm text-center">
                    Already have an account ? Please
                    <Link
                        to="/login"
                        className="text-red-700  px-1 underline">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;