import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../Actions/shared'
import Dashboard from "../Components/Dashboard";
import LoadingBar from 'react-redux-loading'

function App({dispatch, loading}) {

  useEffect(() => {
    dispatch(handleInitialData())
  }, []);

  return (
    <div>
      <LoadingBar />
      {loading === true ? null : <Dashboard />}
    </div>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect()(App)
