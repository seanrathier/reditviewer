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
  limit: 24, // 0 based limit
  total: 0,
  firstReddit: null,
  lastReddit: null,
};

/* eslint-disable default-case, no-param-reassign */
const redditViewerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SUBREDDIT_DATA_FETCH_SUCCESS:
        if (
          action.subReddits &&
          action.subReddits.data &&
          action.subReddits.data.children
        ) {
          draft.subReddits = action.options.refresh
            ? [...action.subReddits.data.children, ...state.subReddits]
            : [...state.subReddits, ...action.subReddits.data.children];

          draft.total = draft.subReddits.length;
          // could be an error here if there is no draft.subReddits
          draft.firstReddit = draft.subReddits[0].data.name;
          draft.lastReddit =
            draft.subReddits[draft.subReddits.length - 1].data.name;
        }
        break;
    }
  });

export default redditViewerReducer;
