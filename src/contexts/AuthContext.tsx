import React from "react";
import { useState } from "react";
import { decodeUserFromToken, getToken } from "services/authService";

type AuthContextType = {
	authUser, setAuthUser
}

export type AuthUserType = {
	authorities, userId: number
}

const AuthContext = React.createContext<AuthContextType>({
	authUser: null,
	setAuthUser: () => {}
});

function AuthProvider(props) {

	const [authUser, setAuthUser] = useState<AuthUserType | null>(decodeUserFromToken(getToken()));

  return (
    <AuthContext.Provider value={{authUser, setAuthUser}} {...props} />
  )
}

const useAuth = () => React.useContext<AuthContextType>(AuthContext);

export {AuthProvider, useAuth}