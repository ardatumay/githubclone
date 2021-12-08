
import * as React from "react"
import { Layout, Breadcrumb, Input } from 'antd';
import { RepositoryContainer, RepositoryList } from "../repository";
import "./Main.scss"

const { Header, Content, Footer } = Layout;
const { Search } = Input;

export const Main: React.FunctionComponent = () => {

    const [searchTerm, setSearchTerm] = React.useState("")

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Search style={{ width: 200 }} placeholder="input search text" onSearch={setSearchTerm} allowClear enterButton />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <RepositoryContainer searchTerm={searchTerm} listPageSize={50} />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}