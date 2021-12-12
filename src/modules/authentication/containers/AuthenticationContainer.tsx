
import * as React from "react"
import { useNavigate } from "react-router-dom";
import { Authentication } from "..";
import { globalStorageActions, Queries, useGlobalStorage } from "../../common";
import { useGraphqlClientContext, useLazyQuery } from "../../graphqlClient";

export const AuthenticationContainer: React.FunctionComponent = () => {

    const { state, dispatch } = useGlobalStorage();
    const { setPersonalAccessToken, personalAccessToken } = useGraphqlClientContext()

    const [req, data, loading, error] = useLazyQuery(Queries.GET_AUTHENTICATED_USER, { avatarSize: 40 })

    const rememberMe = React.useRef(false)

    let navigate = useNavigate();

    const onFormSubmit = (values) => {
        setPersonalAccessToken(values.personalAccessToken)
        rememberMe.current = values.remember
    }

    React.useEffect(() => {
        if (!!personalAccessToken) {
            req()
        }
    }, [personalAccessToken])

    React.useEffect(() => {
        if (!loading) {
            if (!!data && !error) {
                // Successful login
                dispatch({ type: globalStorageActions.LOGIN, isLoggedIn: true, user: { ...data.viewer } })
            } else if (!data && !!error) {
                // Failed login

            }
        }
    }, [loading])

    React.useEffect(() => {
        if (state.isLoggedIn) {
            navigate("/repository", { replace: true });
        }
    }, [state.isLoggedIn])

    return (
        <Authentication onSubmit={onFormSubmit} />
    )
}