// @flow

import React from 'react';
import { Route } from 'react-router';
import { push } from 'react-router-redux'
import App from './components/App';
import { connect } from 'react-redux';
import SplashPage from './components/SplashPage';
import HomeFeed from './components/HomeFeed';
import RecentPostsFeed from './components/RecentPostsFeed';
import SinglePost from './components/SinglePost';
import About from './components/About';
import NewPost from './components/NewPost';
import UserProfile from './components/UserProfile';

/**
 * All the routes.
 */
class Routes extends React.Component {

  /**
   * Properties types.
   */
  props: {
    firebase: {
      currentUser: Object
    },
    dispatch: Function
  };

  /**
   * @inheritDoc
   */
  render() {
    // Let's wait for the Firebase auth to be ready before rendering the UI.
    return (
      <App>
        <Route exact path="/" render={() => {
          if(this.props.firebase.currentUser) {
            this.props.dispatch(push('/home'));
            return <div/>;
          } else {
            return <SplashPage/>;
          }
        }}/>
        <Route path="/home" component={HomeFeed}/>
        <Route path="/recent" component={RecentPostsFeed}/>
        <Route path="/user/:id" component={UserProfile}/>
        <Route path="/post/:id" component={SinglePost}/>
        <Route path="/about" component={About}/>
        <Route path="/new" component={NewPost}/>
      </App>
    )
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
