
import * as React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useGlobalStorage } from "../../common"


export const AuthenticateChildren: React.FunctionComponent = (props) => {

    const { state } = useGlobalStorage()
    let navigate = useNavigate();

    React.useEffect(() => {
        if (!state.isLoggedIn)
            navigate("/login", { replace: true })
    }, [state.isLoggedIn])

    return !state.isLoggedIn ? null : <>{props.children}</>
}