import React from 'react'
import { connect } from 'react-redux'

function Dashboard({tweetIds}) {
    return (
        <div>
            <h3 className='center'>Your Timeline</h3>
            <ul className='dashboard-list'>
                {tweetIds.map((id) => (
                    <li key={id}>
                        <div>TWEET ID: {id}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function mapStateToProps ({ tweets }) {
    return {
        tweetIds: Object.keys(tweets)
            .sort((a,b) => tweets[b.timestamp - tweets[a].timestamp])
    }
}

export default connect(mapStateToProps)(Dashboard)
