import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../Services/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { handleToggleTweet } from '../Actions/tweets'
import { Link, withRouter, useHistory  } from 'react-router-dom';

function Tweet({tweet, dispatch, authedUser}) {
    const history = useHistory()
    const toParent = (e, id) => {
        e.preventDefault()
        //todo: redirect to Parent Tweet
        
        history.push(`/tweet/${id}`)
    }
    const handleLike = (e) => {
        e.preventDefault()

        dispatch(handleToggleTweet({
            id:tweet.id,
            hasLiked:tweet.hasLiked,
            authedUser 
        }))
    }

    if (tweet === null) {
        return <p>This Tweet doesn't existd</p>
    }

    const {name, avatar, timestamp, text, hasLiked, likes, replies, parent, id} = tweet

    return (
        <Link to={`/tweet/${id}`} className='tweet'>
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
        </Link>
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

export default withRouter(connect(mapStateToProps)(Tweet))