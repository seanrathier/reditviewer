import produce from 'immer';
import redditViewerReducer from '../reducer';
import { subredditFetchSuccess } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('redditViewerReducer', () => {
  let state;
  const subRedditsData = {
    data: {
      children: [
        {
          data: {
            name: 'fakeIdFirstElement',
            title: 'fakeTitle',
            author: 'fakeAuthor',
            url: 'http://fakeUrl.com/somethinelse',
            create_utc: 152334665,
            score: 23,
            permalink: 'fake/path/to/reddit/2134234',
            num_comments: 23,
            thumbnail: 'http://reddit.com/path/to/thumbnail.jpg',
            thumbnail_width: 100,
            thumbnail_hieght: 100,
          },
        },
        {
          data: {
            name: 'fakeIdLastElement',
            title: 'fakeTitle',
            author: 'fakeAuthor',
            url: 'http://fakeUrl.com/somethinelse',
            create_utc: 152334665,
            score: 23,
            permalink: 'fake/path/to/reddit/2134234',
            num_comments: 23,
            thumbnail: 'http://reddit.com/path/to/thumbnail.jpg',
            thumbnail_width: 100,
            thumbnail_hieght: 100,
          },
        },
      ],
    },
  };

  const subRedditsRefreshData = {
    data: {
      children: [
        {
          data: {
            name: 'fakeIdFirstRefreshElement',
            title: 'fakeTitle',
            author: 'fakeAuthor',
            url: 'http://fakeUrl.com/somethinelse',
            create_utc: 152334665,
            score: 23,
            permalink: 'fake/path/to/reddit/2134234',
            num_comments: 23,
            thumbnail: 'http://reddit.com/path/to/thumbnail.jpg',
            thumbnail_width: 100,
            thumbnail_hieght: 100,
          },
        },
        {
          data: {
            name: 'fakeIdLastRefreshElement',
            title: 'fakeTitle',
            author: 'fakeAuthor',
            url: 'http://fakeUrl.com/somethinelse',
            create_utc: 152334665,
            score: 23,
            permalink: 'fake/path/to/reddit/2134234',
            num_comments: 23,
            thumbnail: 'http://reddit.com/path/to/thumbnail.jpg',
            thumbnail_width: 100,
            thumbnail_hieght: 100,
          },
        },
      ],
    },
  };

  it('returns the initial state', () => {
    state = {
      subReddits: [],
      limit: 25, // 0 based limit
      firstReddit: null,
      lastReddit: null,
    };

    const expectedResult = state;
    expect(redditViewerReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the subredditFetchSuccess action initial load correctly', () => {
    state = {
      subReddits: [],
      limit: 25, // 0 based limit
      firstReddit: null,
      lastReddit: null,
    };

    const expectedResult = produce(state, draft => {
      draft.firstReddit = subRedditsData.data.children[0].data.name;
      draft.lastReddit =
        subRedditsData.data.children[
          subRedditsData.data.children.length - 1
        ].data.name;
      draft.subReddits = subRedditsData.data.children;
    });
    expect(
      redditViewerReducer(
        state,
        subredditFetchSuccess(subRedditsData, { refresh: false }),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the subredditFetchSuccess action refresh load correctly', () => {
    state = {
      subReddits: subRedditsData.data.children,
      limit: 25, // 0 based limit
      firstReddit: null,
      lastReddit: null,
    };

    const expectedResult = produce(state, draft => {
      draft.firstReddit = subRedditsRefreshData.data.children[0].data.name;
      draft.lastReddit =
        subRedditsData.data.children[
          subRedditsData.data.children.length - 1
        ].data.name;
      draft.subReddits = [
        ...subRedditsRefreshData.data.children,
        ...subRedditsData.data.children,
      ];
    });

    expect(
      redditViewerReducer(
        state,
        subredditFetchSuccess(subRedditsRefreshData, {
          refresh: true,
        }),
      ),
    ).toEqual(expectedResult);
  });
});
