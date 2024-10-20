"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';

interface LoginModalProps {
    toggleModal: () => void;
}

const LoginModal = ({ toggleModal }: LoginModalProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error handling

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null); // Clear previous errors
        
        const result = await signIn('credentials', {
            redirect: false, // Prevent automatic redirection
            email,
            password,
        });

        if (result?.error) {
            setErrorMessage(result.error); // Display error message if login failed
        } else {
            console.log('Login successful:', result);
            toggleModal(); // Close the modal on success
        }
    };

    return (
        <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="container">
                <div className="w-full px-4 lg:w-6/12">
                    <div className="rounded-md bg-primary bg-opacity-5 p-8 dark:bg-opacity-10 relative">
                        {/* Close Modal Button */}
                        <button onClick={toggleModal} className="absolute top-2 right-2 text-black dark:text-white text-lg font-bold">
                            &times;
                        </button>

                        <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white text-center">
                            Login
                        </h2>

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="mb-4 text-red-500 text-center">
                                {errorMessage}
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-base leading-tight focus:border-primary focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-base leading-tight focus:border-primary focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                            >
                                Login
                            </button>
                        </form>

                        {/* GitHub Login */}
                        <button
                            onClick={() => signIn('github')}
                            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200 mt-4"
                        >
                            Continue with GitHub
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginModal;
