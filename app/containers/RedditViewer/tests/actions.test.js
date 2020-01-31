import {
  getSubredditData,
  subredditFetching,
  subredditFetchSuccess,
  subredditFetchError,
} from '../actions';
import {
  SUBREDDIT_DATA_REQUEST,
  SUBREDDIT_DATA_FETCHING,
  SUBREDDIT_DATA_FETCH_SUCCESS,
  SUBREDDIT_DATA_FETCH_ERROR,
} from '../constants';

describe('RedditViewer actions', () => {
  describe('subredditFetching Action', () => {
    it('has a type of SUBREDDIT_DATA_FETCHING', () => {
      const expected = {
        type: SUBREDDIT_DATA_FETCHING,
      };
      expect(subredditFetching()).toEqual(expected);
    });
  });

  describe('getSubredditData Action', () => {
    it('has a type of SUBREDDIT_DATA_REQUEST', () => {
      const expected = {
        type: SUBREDDIT_DATA_REQUEST,
        options: {
          refresh: true,
        },
      };
      const actual = getSubredditData({ refresh: true });
      expect(actual).toEqual(expected);
    });
  });

  describe('subredditFetchSuccess Action', () => {
    it('has a type of SUBREDDIT_DATA_FETCH_SUCCESS', () => {
      const subReddits = {
        foo: 1,
      };
      const options = { refresh: true };

      const expected = {
        type: SUBREDDIT_DATA_FETCH_SUCCESS,
        subReddits,
        options,
      };
      const actual = subredditFetchSuccess(subReddits, options);
      expect(actual).toEqual(expected);
    });
  });

  describe('subredditFetchError Action', () => {
    it('has a type of SUBREDDIT_DATA_FETCH_ERROR', () => {
      const error = {
        message: 'some error message',
      };

      const expected = {
        type: SUBREDDIT_DATA_FETCH_ERROR,
        error,
      };
      const actual = subredditFetchError(error);
      expect(actual).toEqual(expected);
    });
  });
});
