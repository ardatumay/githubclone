
import * as React from "react"
import { Avatar, Button, Popover } from "antd"
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
import { globalStorageActions, useGlobalStorage } from "../.."
import "./UserSummary.scss"
import { useGraphqlClientContext } from "../../../graphqlClient";

export const UserSummary: React.FunctionComponent = () => {

    const { state, dispatch } = useGlobalStorage()
    const { setPersonalAccessToken } = useGraphqlClientContext()

    const getAvatar = () => {
        return !state.user.avatarUrl ? <Avatar icon={<UserOutlined />} /> : <Avatar src={state.user.avatarUrl} />
    }

    const getTitle = () => {
        return (<div>
            <a target="_blank" href={state.user.url} ><p className="name" >{state.user.name}</p></a>
            <p className="login" >{state.user.login}</p>
        </div>
        )
    }

    const signOut = () => {
        dispatch({ type: globalStorageActions.LOGOUT })
        setPersonalAccessToken("")
    }

    const getPopoverContent = () => {
        return <div>
            <p>{state.user.location}</p>
            <p>{state.user.bio}</p>
            <Button onClick={signOut} >Sign Out</Button>
        </div>
    }

    return (
        <Popover placement="bottom" title={getTitle()} content={getPopoverContent()} trigger="click">
            <div className="user-layout-row"  >
                <p className="user-name" >{state.user.name}</p>
                {getAvatar()}
                <CaretDownOutlined className="caret-down" />
            </div>
        </Popover>

    )
}