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
      {loading === true ? null : <TweetPage match={{params: {id: 'r0xu2v1qrxa6ygtvf2rkjw'}}} />}
    </div>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect()(App)
