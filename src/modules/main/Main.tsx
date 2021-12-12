
import * as React from "react"
import { Layout } from 'antd';
import { BreadcrumbContainer, SearchBar, useGlobalStorage, UserSummary } from "../common";
import "./Main.scss"

var classNames = require('classnames');

const { Header, Content, Footer } = Layout;

export const Main: React.FunctionComponent = (props) => {

    const { state } = useGlobalStorage()

    return (
        <Layout className={classNames({ "full-height": !state.isLoggedIn || !state.searchText })}>
            <Header>
                {state.isLoggedIn && <>
                    <SearchBar />
                    <UserSummary />
                </>}
            </Header>
            <Content>
                {state.isLoggedIn && <BreadcrumbContainer />}
                <div className="site-layout-content">
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Github Clone - Arda Tümay - 2021</Footer>
        </Layout>
    )
}
