
import * as React from "react"
import { Button, Form, Input } from "antd"

interface IAuthenticationProps {
    onSubmit: (values) => void
}

export const Authentication: React.FunctionComponent<IAuthenticationProps> = (props) => {

    const onFinish = (values: any) => {
        props.onSubmit(values)
    };

    return (
        <Form
            name="basic"
            labelCol={{ offset: 6, span: 10 }}
            wrapperCol={{ offset: 6, span: 10 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item
                label="Personal Access Token"
                name="personalAccessToken"
                rules={[{ required: true, message: 'Please enter your personal access token.' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form >
    )
}