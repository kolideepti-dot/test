import { useState } from "react";
import useLogin from "./useLogin"
const Test = () => {
    const { login, message, isSuccess, isLoading } = useLogin();
    const [username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    }

   return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br /> <br />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /> <br />
                <button type="submit" disabled={isLoading}>{isLoading ? "Logging In" : "Login"}</button>
            </form>
            {message && (
                <p style={{ color: isSuccess ? "green" : "red"}}>{message}</p>
            )}
        </div>
   )
   
}

export default Test; 