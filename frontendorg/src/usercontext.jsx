import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Usercontext = createContext({});
export function Usercontextprovider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get("/profile");
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
                // Optionally handle error state or retry mechanism
            }
        };

        // Check if user is not already set to prevent unnecessary requests
        if (!user) {
            fetchUser();
        }
    }, [user]); // Add user to dependency array to prevent infinite loop

    return (
        <Usercontext.Provider value={{ user, setUser }}>
            {children}
        </Usercontext.Provider>
    );
}
