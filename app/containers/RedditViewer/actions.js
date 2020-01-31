/*
 *
 * RedditViewer actions
 *
 * The actions in this file are used to dispatch messages to the redux middleware.
 * These actions can be handled by either sagas, or reducers.
 *
 */

// Constants to be used as types of messages
import {
  SUBREDDIT_DATA_REQUEST,
  SUBREDDIT_DATA_FETCHING,
  SUBREDDIT_DATA_FETCH_SUCCESS,
  SUBREDDIT_DATA_FETCH_ERROR,
} from './constants';

// The getSubredditData action is the initial call to request data from Reddit
// The options have one property, refresh: boolean
export function getSubredditData(options) {
  return {
    type: SUBREDDIT_DATA_REQUEST,
    options,
  };
}

// The subredditFetching action is dispatched while the application is fetching
// data from Reddit call to request data from Reddit
export function subredditFetching() {
  return {
    type: SUBREDDIT_DATA_FETCHING,
  };
}

// This subredditFetchSuccess action is dispatched when the application has sucessfully
// fetched the data from Reddit call to request data from Reddit
// The subReddit payload is the raw data retreived from Reddit
// The options is what is passed to us from the initia request getSubredditData
export function subredditFetchSuccess(subReddits, options) {
  return {
    type: SUBREDDIT_DATA_FETCH_SUCCESS,
    subReddits,
    options,
  };
}

// The subredditFetchError action is dispatched when an error occurs while fetching
// data from Reddit
export function subredditFetchError(error) {
  return {
    type: SUBREDDIT_DATA_FETCH_ERROR,
    error,
  };
}
