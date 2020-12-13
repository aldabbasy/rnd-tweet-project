import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../Actions/shared'
import Dashboard from "../Components/Dashboard";
import NewTweet from "../Components/NewTweet";
import TweetPage from "../Components/TweetPage";
import LoadingBar from 'react-redux-loading'
import Nav from "../Components/Nav";
import { Route } from 'react-router-dom'

function App({dispatch, loading}) {

  useEffect(() => {
    dispatch(handleInitialData())
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className='container'>
        <Nav />
        {loading === true ? null : 
          <div>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/tweet/:id' component={TweetPage}/>
            <Route path='/new' component={NewTweet}/>
          </div>}
      </div>
    </Fragment>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect()(App)
