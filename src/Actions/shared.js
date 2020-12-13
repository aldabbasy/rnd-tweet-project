import { getInitialData } from '../Services/api'
import { recieveTweets } from './tweets'
import { recieveUsers } from './users'
import { setAuthedUser } from  './authedUsers'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'sarah_edo'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData().then(({users, tweets}) => {
            dispatch(recieveUsers(users))
            dispatch(recieveTweets(tweets))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        })
    }
}