import { useState } from "react";

import { UserContext } from "./UserContext";

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};
