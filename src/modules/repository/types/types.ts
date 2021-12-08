

import { SubscriptionState } from "../../common";

// Interface to define repository type for type-safe usage
// Must match with the type which is returned from graphql server
export interface Repository {
    id: string
    description: string
    name: string
    stargazerCount: number
    forkCount: number
    url: string
    viewerHasStarred: boolean
    viewerSubscription: SubscriptionState
    watchers: { totalCount }
    primaryLanguage: { name, color }
}