import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const correctUsername = "Ntare";
    const correctPassword = "Alpha123!!!";

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username === correctUsername && password === correctPassword) {
            navigate("/")
            setError("");
        } else {
            setError("Incorrect username or password");
        }
    };

    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-200 rounded shadow-md p-4 border border-gray-300"
                >
                    <div className="flex flex-col space-y-3 mb-4">
                        <label htmlFor="name">Name</label>
                        <input
                            className="py-2 px-3 border border-black rounded-md"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div className="flex flex-col space-y-3 mb-4">
                        <label htmlFor="password">Password</label>
                        <input
                            className="py-2 px-3 border border-black rounded-md"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 rounded px-4 py-2 text-white"
                    >
                        Log in
                    </button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
}
