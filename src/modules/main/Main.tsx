
import * as React from "react"
import { Layout } from 'antd';
import { RepositoryContainer } from "../repository";
import { BreadcrumbContainer, SearchBar, UserSummary } from "../common";
import "./Main.scss"

const { Header, Content, Footer } = Layout;

export const Main: React.FunctionComponent = () => {


    return (
        <Layout className="layout">
            <Header>
                <SearchBar />
                <UserSummary />
            </Header>
            <Content>
                <BreadcrumbContainer />
                <div className="site-layout-content">
                    <RepositoryContainer />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Github Clone - Arda Tümay - 2021</Footer>
        </Layout>
    )
}
