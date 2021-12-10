
import * as React from "react"
import { List, Space, Button } from 'antd';
import { EyeOutlined, EyeFilled, BookOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { Mutations, Queries, SubscriptionState } from "../../common"
import { useLazyQuery, useMutation } from "../../graphqlClient";
import { Repository } from "../types";

interface IRepositoryListItem {
    item: Repository
    changedListData: (item) => void
}

export const RepositoryListItem: React.FunctionComponent<IRepositoryListItem> = (props) => {

    const [item, setItem] = React.useState<Repository>(props.item)

    const [getRepoWatcherCount, repoWathcherData, repoWathcherLoading, error] = useLazyQuery(Queries.GET_REPOSITORY_WATCHER_COUNT, { id: props.item.id })

    const [addStar, addStartData, addStarLoading, addStarError] = useMutation(Mutations.ADD_STAR, { input: { starrableId: props.item.id } })

    const [removeStar, removeStarData, remStarLoading, remStarError] = useMutation(Mutations.REMOVE_STAR, { input: { starrableId: props.item.id } })

    const [updateSubscription, updateSubsData, updateSubsLoading, updateSubsError] = useMutation(Mutations.UPDATE_SUBSCRIPTION, {}, getRepoWatcherCount)

    // When pagination change in list, item prop passed to this component is changed by list.
    // So set item with new item in props
    React.useEffect(() => {
        setItem(props.item)
    }, [props.item])

    React.useEffect(() => {
        if (!!addStartData) {
            setItem({ ...item, stargazerCount: addStartData.addStar.starrable.stargazerCount, viewerHasStarred: addStartData.addStar.starrable.viewerHasStarred })
            props.changedListData({ ...item, stargazerCount: addStartData.addStar.starrable.stargazerCount, viewerHasStarred: addStartData.addStar.starrable.viewerHasStarred })
        }
    }, [addStartData])

    React.useEffect(() => {
        if (!!removeStarData) {
            setItem({ ...item, stargazerCount: removeStarData.removeStar.starrable.stargazerCount, viewerHasStarred: removeStarData.removeStar.starrable.viewerHasStarred })
            props.changedListData({ ...item, stargazerCount: removeStarData.removeStar.starrable.stargazerCount, viewerHasStarred: removeStarData.removeStar.starrable.viewerHasStarred })
        }
    }, [removeStarData])

    React.useEffect(() => {
        if (!!updateSubsData) {
            setItem({ ...item, viewerSubscription: updateSubsData.updateSubscription.subscribable.viewerSubscription })
            props.changedListData({ ...item, viewerSubscription: updateSubsData.updateSubscription.subscribable.viewerSubscription })
        }
    }, [updateSubsData])

    React.useEffect(() => {
        if (!!repoWathcherData) {
            setItem({ ...item, watchers: repoWathcherData.node.watchers })
            props.changedListData({ ...item, watchers: repoWathcherData.node.watchers })

        }
    }, [repoWathcherData])

    // Get subscription input data based on new target state of subscription
    const getUpdateSubscribeRequestData = (state) => {
        return {
            input: {
                subscribableId: item.id,
                state: state
            }
        }
    }

    const onClickSubscribe = () => {

        // If user is subscribed, then clicking button will make user unsbcribed and vice versa
        if (item.viewerSubscription == SubscriptionState.SUBSCRIBED)
            updateSubscription(getUpdateSubscribeRequestData(SubscriptionState.UNSUBSCRIBED))
        else
            updateSubscription(getUpdateSubscribeRequestData(SubscriptionState.SUBSCRIBED))
    }

    const IconText = ({ icon, text, onClick }) => (
        <Button onClick={() => onClick()} >
            <Space>
                {React.createElement(icon)}
                {text}
            </Space>
        </Button>
    );

    const RepoDetail = ({ item }) => {
        return <div>
            <p style={{ color: "#24292F", margin: 0 }} >{item.description}</p>
            <div style={{ display: "flex", alignItems: "center" }} >
                <Space>
                    <div style={{ height: 11, width: 11, borderRadius: 50, backgroundColor: item.primaryLanguage?.color }} />
                    <span style={{ color: "#57606a", alignContent: "center" }} >{item.primaryLanguage?.name}</span>
                </Space>
            </div>
        </div>
    }

    return (
        <List.Item
            key={item.id}
            actions={[
                <IconText onClick={item.viewerHasStarred ? removeStar : addStar} icon={item.viewerHasStarred ? StarFilled : StarOutlined} text={item.stargazerCount} key="list-vertical-star-o" />,
                <IconText onClick={onClickSubscribe} icon={item.viewerSubscription == SubscriptionState.SUBSCRIBED ? EyeFilled : EyeOutlined} text={item.watchers.totalCount} key="list-vertical-message" />,
            ]}
        >
            <List.Item.Meta
                avatar={<BookOutlined />}
                title={<a target="_blank" href={item.url}>{item.name}</a>}
                description={<RepoDetail item={item} />}
            />
        </List.Item>
    )
}

