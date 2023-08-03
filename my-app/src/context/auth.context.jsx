import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialState = { user: null };

const reducer = (state, action) => {

    switch (action?.type) {
        case "LOGIN":
            return { user: action?.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }

}

const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useNavigate();


    const login = (userdata) => {
        localStorage.setItem("CurrentUser", JSON.stringify(userdata));
        dispatch({
            type: "LOGIN",
            payload: userdata
        })
    }

    const logout = () => {
        localStorage.removeItem("CurrentUser");
        dispatch({
            type: "LOGOUT",
        })
        router('/');
    }

    useEffect(() => {
        const isUserLogin = JSON.parse(localStorage.getItem("CurrentUser"))
        if(isUserLogin){
            dispatch({
                type:"LOGIN",
                payload: isUserLogin
            })
        }
    }, [])


    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;