
import * as React from "react"
import { List, Space, Button } from 'antd';
import { EyeOutlined, EyeFilled, BookOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { Mutations, Queries, SubscriptionState } from "../../common"
import { useLazyQuery, useMutation } from "../../graphqlClient";
import { Repository } from "../types";

interface IRepositoryListItem {
    item: Repository
}

export const RepositoryListItem: React.FunctionComponent<IRepositoryListItem> = (props) => {

    const [item, setItem] = React.useState<Repository>(props.item)

    const [getRepoWatcherCount, repoWathcherData, repoWathcherLoading, error] = useLazyQuery(Queries.GET_REPOSITORY_WATCHER_COUNT, { id: props.item.id })

    const [addStar, addStartData, addStarLoading, addStarError] = useMutation(Mutations.ADD_STAR, {
        input: {
            starrableId: props.item.id
        }
    })

    const [remStar, remStarData, remStarLoading, remStarError] = useMutation(Mutations.REMOVE_STAR, {
        input: {
            starrableId: props.item.id
        }
    })

    const [updateSubs, updateSubsData, updateSubsLoading, updateSubsError] = useMutation(Mutations.UPDATE_SUBSCRIPTION, {}, getRepoWatcherCount)

    React.useEffect(() => {
        !!addStartData && setItem({ ...item, stargazerCount: addStartData.addStar.starrable.stargazerCount, viewerHasStarred: addStartData.addStar.starrable.viewerHasStarred })
    }, [addStartData])

    React.useEffect(() => {
        !!remStarData && setItem({ ...item, stargazerCount: remStarData.removeStar.starrable.stargazerCount, viewerHasStarred: remStarData.removeStar.starrable.viewerHasStarred })
    }, [remStarData])

    React.useEffect(() => {
        !!updateSubsData && setItem({ ...item, viewerSubscription: updateSubsData.updateSubscription.subscribable.viewerSubscription })
    }, [updateSubsData])

    React.useEffect(() => {
        !!repoWathcherData && setItem({ ...item, watchers: repoWathcherData.node.watchers })
    }, [repoWathcherData])

    const getUpdateSubscribeRequestData = (state) => {
        return {
            input: {
                subscribableId: item.id,
                state: state
            }
        }
    }

    const onClickSubscribe = () => {
        if (item.viewerSubscription == SubscriptionState.SUBSCRIBED)
            updateSubs(getUpdateSubscribeRequestData(SubscriptionState.UNSUBSCRIBED))
        else
            updateSubs(getUpdateSubscribeRequestData(SubscriptionState.SUBSCRIBED))
    }

    const IconText = ({ icon, text, onClick }) => (
        <Button onClick={() => onClick()} >
            <Space>
                {React.createElement(icon)}
                {text}
            </Space>
        </Button>
    );

    return (
        <List.Item
            key={item.id}
            actions={[
                <IconText onClick={item.viewerHasStarred ? remStar : addStar} icon={item.viewerHasStarred ? StarFilled : StarOutlined} text={item.stargazerCount} key="list-vertical-star-o" />,
                <IconText onClick={onClickSubscribe} icon={item.viewerSubscription == SubscriptionState.SUBSCRIBED ? EyeFilled : EyeOutlined} text={item.watchers.totalCount} key="list-vertical-message" />,
            ]}
        >
            <List.Item.Meta
                avatar={<BookOutlined />}
                title={<a target="_blank" href={item.url}>{item.name}</a>}
                description={item.description}
            />
        </List.Item>
    )
}

