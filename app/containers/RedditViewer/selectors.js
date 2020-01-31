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
    redditViewer => redditViewer.limit,
  );

const makeSelectNextRedditsAfter = () =>
  createSelector(
    selectRedditViewerDomain,
    redditViewer => redditViewer.lastReddit,
  );

const makeSelectNextRedditsBefore = () =>
  createSelector(
    selectRedditViewerDomain,
    redditViewer => redditViewer.firstReddit,
  );

const makeSelectSubreddits = () =>
  createSelector(
    selectRedditViewerDomain,
    redditData => redditData.subReddits,
  );

/*  eslint-disable prettier/prettier */
const makeSelectSubredditsDerived = () =>
  createSelector(
    makeSelectSubreddits(),
    subReddits =>
      subReddits
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
        : [],
  );
/*  eslint-enable prettier/prettier */

export {
  selectRedditViewerDomain,
  makeSelectSubreddits,
  makeSelectSubredditsDerived,
  makeSelectLimit,
  makeSelectNextRedditsAfter,
  makeSelectNextRedditsBefore,
};
