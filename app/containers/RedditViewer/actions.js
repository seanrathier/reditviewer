/*
 *
 * RedditViewer actions
 *
 */

import {
  SUBREDDIT_DATA_REQUEST,
  SUBREDDIT_DATA_FETCHING,
  SUBREDDIT_DATA_FETCH_SUCCESS,
  SUBREDDIT_DATA_FETCH_ERROR,
} from './constants';

export function getSubredditData(options) {
  return {
    type: SUBREDDIT_DATA_REQUEST,
    options,
  };
}

export function subredditFetching() {
  return {
    type: SUBREDDIT_DATA_FETCHING,
  };
}

export function subredditFetchSuccess(subReddits, options) {
  return {
    type: SUBREDDIT_DATA_FETCH_SUCCESS,
    subReddits,
    options,
  };
}

export function subredditFetchError(error) {
  return {
    type: SUBREDDIT_DATA_FETCH_ERROR,
    error,
  };
}
