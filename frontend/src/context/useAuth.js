import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.log("No token found.");
        return false;
    }

    try {
        const decoded = jwtDecode(token);

        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            console.log("Token has expired.");
            return false;
        }

        console.log("Token is valid and not expired.");
        return true;
    } catch (error) {
        console.error("Invalid token format or decoding failed:", error);
        return false;
    }
};
