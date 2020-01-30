import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { SUBREDDIT_DATA_REQUEST } from './constants';
import {
  makeSelectLimit,
  makeSelectNextRedditsAfter,
  makeSelectNextRedditsBefore,
} from './selectors';
import {
  subredditFetching,
  subredditFetchSuccess,
  subredditFetchError,
} from './actions';

export function* getSubReddits(action) {
  // Select subreddit from from store
  const limit =
    action.options && action.options.refresh
      ? yield select(makeSelectLimit())
      : yield select(makeSelectLimit());
  const nextAfter = yield select(makeSelectNextRedditsAfter());
  const before = yield select(makeSelectNextRedditsBefore());
  const fetchFrom =
    action.options && action.options.refresh
      ? `before=${before}`
      : `after=${nextAfter}`;

  const requestURL = `https://www.reddit.com/r/news/new.json?limit=${limit}&${fetchFrom}`;

  try {
    yield put(subredditFetching());
    // Call our request helper (see 'utils/request')
    const subreddits = yield call(request, requestURL);
    yield put(subredditFetchSuccess(subreddits, action.options));
  } catch (err) {
    yield put(subredditFetchError(err));
  }
}

// Individual exports for testing
export default function* redditViewerSaga() {
  // Watches for SUBREDDIT_DATA_REQUEST actions and calls getSubReddits when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It will be cancelled automatically on component unmount
  yield takeLatest(SUBREDDIT_DATA_REQUEST, getSubReddits);
}
