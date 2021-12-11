
import * as React from "react"
import { Avatar, Popover } from "antd"
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
import { GlobalStorageContext } from "../.."
import "./UserSummary.scss"

export const UserSummary: React.FunctionComponent = () => {

    const { state } = React.useContext(GlobalStorageContext)

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

    const getPopoverContent = () => {
        return <div>
            <p>{state.user.location}</p>
            <p>{state.user.bio}</p>
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