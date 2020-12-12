import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../Services/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { handleToggleTweet } from '../Actions/tweets'

function Tweet({tweet, dispatch, authedUser}) {

    const toParent = (e, id) => {
        e.preventDefault()
        //todo: redirect to Parent Tweet
    }
    const handleLike = (e) => {
        e.preventDefault()

        dispatch(handleToggleTweet({
            id:tweet.id,
            hasLiked:tweet.hasLiked,
            authedUser 
        }))
    }

    const {name, avatar, timestamp, text, hasLiked, likes, replies, parent} = tweet

    return (
        tweet === null ?
        <div className='tweet'>
            <p>this tweet doesn't exist</p>
        </div> :
        <div className='tweet'>
            <img 
                src={avatar}
                alt={`Avatar of ${name}`}
                className='avatar'
            />
            <div className='tweet-info'>
                <div>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {parent && (
                        <button className='replying-to' onClick={(e) => toParent(e, parent.id)}>
                            Replying to @{parent.author}
                        </button>
                    )}
                    <p>{text}</p>
                </div>

                <div className='tweet-icons'>
                    <TiArrowBackOutline className='tweet-icon'/>
                    <span>{ replies !== 0 && replies }</span>
                    <button className='heart-button' onClick={handleLike} >
                        {
                        hasLiked ? 
                        <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                        :<TiHeartOutline className='tweet-icon' />
                        }
                    </button>
                    <span>{likes !== 0 && likes}</span>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({authedUser, users, tweets}, { id }) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return{
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    }
}

export default connect(mapStateToProps)(Tweet)