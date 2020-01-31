import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the redditViewer state domain
 */

const selectRedditViewerDomain = state => state.redditViewer || initialState;

/**
 * Other specific selectors
 */

const makeSelectLimit = () =>
  createSelector(
    selectRedditViewerDomain,
    redditViewer =>
      // Sean:  redo this code,  stinks
      redditViewer.limit,
  );

const makeSelectNextRedditsAfter = () =>
  createSelector(
    selectRedditViewerDomain,
    redditViewer =>
      // Sean:  redo this code,  stinks
      redditViewer.lastReddit,
  );

const makeSelectNextRedditsBefore = () =>
  createSelector(
    selectRedditViewerDomain,
    redditViewer =>
      // Sean:  redo this code,  stinks
      redditViewer.firstReddit,
  );

const makeSelectSubreddits = () =>
  createSelector(
    selectRedditViewerDomain,
    redditData =>
      // Sean:  redo this code,  stinks
      redditData.subReddits,
  );

const makeSelectSubredditsDerived = () =>
  createSelector(
    makeSelectSubreddits(),
    subReddits => {
      // Sean:  redo this code,  stinks
      const derivedState = subReddits
        ? subReddits.map(reddits => ({
          id: reddits.data.name,
          title: reddits.data.title,
          author: reddits.data.author,
          url: reddits.data.url,
          created: reddits.data.created_utc,
          score: reddits.data.score,
          permalink: reddits.data.permalink,
          commentCount: reddits.data.num_comments,
          thumbnail: reddits.data.thumbnail,
          thumbnailWidth: reddits.data.thumbnail_width,
          thumbnailHeight: reddits.data.thumbnail_height,
        }))
        : [];
      return derivedState;
    },
  );

/**
 * Default selector used by RedditViewer
 */

// const makeSelectRedditViewer = () =>
//   createSelector(
//     selectRedditViewerDomain,
//     substate => substate,
//   );

export {
  selectRedditViewerDomain,
  makeSelectSubreddits,
  makeSelectSubredditsDerived,
  makeSelectLimit,
  makeSelectNextRedditsAfter,
  makeSelectNextRedditsBefore,
};
