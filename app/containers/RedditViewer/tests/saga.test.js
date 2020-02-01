/**
 * Test sagas
 */
import { select, call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { REDDIT_URL } from '../constants';
import { getSubReddits } from '../saga';
import {
  makeSelectLimit,
  makeSelectNextRedditsAfter,
  makeSelectNextRedditsBefore,
} from '../selectors';
import { subredditFetchSuccess, subredditFetching } from '../actions';

const request = jest.fn();

describe.skip('Testing RedditViewer sagas', () => {
  const option = { refresh: false };
  const fakePayload = { fake: 'payload' };

  describe('Testing getSubReddits', () => {
    const it = sagaHelper(getSubReddits(option));

    it('should send fetch fetching action', result => {
      expect(result).toEqual(put(subredditFetching()));
    });
    it('should get the limit', result => {
      expect(result).toEqual(select(makeSelectLimit));
      return 25;
    });
    it('should get the last reddit', result => {
      expect(result).toEqual(select(makeSelectNextRedditsAfter));
      return 'last';
    });
    it('should get the first reddit', result => {
      expect(result).toEqual(select(makeSelectNextRedditsBefore));
      return 'first';
    });
    it('should get the fetch the data', result => {
      const requestUrl = `${REDDIT_URL}?limit=undefined&after=undefined`;
      expect(result).toEqual(call(request, requestUrl));
      return fakePayload;
    });
    it('should send fetch sucess action', result => {
      expect(result).toEqual(
        put(subredditFetchSuccess({ fake: 'payload' }, { refresh: false })),
      );
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
});
