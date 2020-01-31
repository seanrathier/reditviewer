/*
 *
 * RedditViewer reducer
 *
 */
// Sean:  Document immer
import produce from 'immer';
import { SUBREDDIT_DATA_FETCH_SUCCESS } from './constants';

export const initialState = {
  subReddits: [],
  limit: 25, // 0 based limit
  firstReddit: null,
  lastReddit: null,
};

/* eslint-disable default-case, no-param-reassign */
const redditViewerReducer = (state = initialState, action) =>
  produce(state, draft => {
    // We are given the current state, and a draft of the state
    // We ONLY modify the draft to ensure immutabulility
    switch (action.type) {
      // This case will be executed when SUBREDDIT_DATA_FETCH_SUCCESS is dispatched
      case SUBREDDIT_DATA_FETCH_SUCCESS:
        // If we have data reteived from Reddit via sagas
        if (
          action.subReddits &&
          action.subReddits.data &&
          action.subReddits.data.children
        ) {
          // based on the inital call the get data, we need to know if
          // it is the latest posts to append them to the top or the bottom
          // of the current reddits in state
          draft.subReddits = action.options.refresh
            ? [...action.subReddits.data.children, ...state.subReddits]
            : [...state.subReddits, ...action.subReddits.data.children];

          // we need to know the first post to call the api to get the latest reddits
          draft.firstReddit = draft.subReddits[0].data.name;
          // we need to know the last post to call the api to get load
          // older reddits
          draft.lastReddit =
            draft.subReddits[draft.subReddits.length - 1].data.name;
        }
        break;
    }
  });

export default redditViewerReducer;
