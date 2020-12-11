export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'

export function recieveTweets (tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}