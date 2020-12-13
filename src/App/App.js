import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../Actions/shared'
import Dashboard from "../Components/Dashboard";
import NewTweet from "../Components/NewTweet";
import TweetPage from "../Components/TweetPage";
import LoadingBar from 'react-redux-loading'

function App({dispatch, loading}) {

  useEffect(() => {
    dispatch(handleInitialData())
  }, []);

  return (
    <div>
      <LoadingBar />
      {loading === true ? null : <TweetPage match={{params: {id: 'czpa59mg577x1oo45cup0d'}}} />}
    </div>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect()(App)
