import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch('https://localhost:44356/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Success: Login successful! Redirecting...");
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } else {
                setIsError(true);
                setMessage("Error: " + (data.message || "Invalid credentials!"));
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
            setMessage("Error: Cannot connect to the backend server!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 font-sans px-4">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
                <h2 className="text-3xl font-extrabold text-center text-white mb-2">
                    Welcome Back 🔑
                </h2>
                <p className="text-sm text-center text-slate-400 mb-8">Sign in to your dashboard</p>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="01xxxxxxxxx"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200"
                    >
                        Log In
                    </button>
                </form>

                {message && (
                    <div className={`mt-6 text-center text-sm font-medium p-3 rounded-xl border ${isError ? 'bg-red-950/50 text-red-400 border-red-900' : 'bg-green-950/50 text-green-400 border-green-900'}`}>
                        {message}
                    </div>
                )}

                <p className="text-sm text-slate-400 text-center mt-6">
                    Don't have an account yet? <Link to="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}