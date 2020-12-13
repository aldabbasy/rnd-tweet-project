import React, { useState } from 'react'
import { handleAddTweet } from '../Actions/tweets'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function NewTweet({dispatch, id}) {

    const [text, setText] = useState('')
    const [toHome, setToHome] = useState(false)
    const tweetLeft = 280 - text.length

    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(handleAddTweet(text, id))

        setText('')
        setToHome(id ? false : true)
    }

    if(toHome)
    {
        return(
            <Redirect to='/'/>
        )
    }

    return (
        <div>
            <h3 className='center'>Compose New Tweet</h3>
            <form className='new-tweet' onSubmit={handleSubmit}>
                <textarea 
                    className='textarea'
                    placeholder="Whats's Happenning?"
                    value={text}
                    onChange={handleTextChange}
                    maxLength={280}
                />
                {tweetLeft <= 100 && (
                    <div className='tweet-length'>
                        {tweetLeft}
                    </div>
                )}
                <button className='btn' type='submit' disabled={text === ''}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default connect()(NewTweet)