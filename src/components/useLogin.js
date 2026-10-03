import { useState } from "react";
function useLogin() {
    const[isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    
    const login = async(username, password) => {
        setIsLoading(true);
        setMessage("");
        setIsSuccess(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (username === "admin" && password === "1234") {
                setIsSuccess(true);
                setMessage("Login Successful! Welcome back");
            } else {
                setIsSuccess(false);
                setMessage("Invalid username or password.")
            }
        } catch(error) {
            setIsSuccess(false);
            setMessage("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return { login, message, isSuccess, isLoading }
}

export default useLogin;