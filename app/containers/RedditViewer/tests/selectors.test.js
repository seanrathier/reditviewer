import {
  makeSelectLimit,
  makeSelectNextRedditsAfter,
  makeSelectNextRedditsBefore,
  makeSelectSubredditsDerived,
} from '../selectors';

describe('RedditViewer selector tests', () => {
  const mockedState = {
    redditViewer: {
      subReddits: [
        {
          data: {
            name: 'fakeId',
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
      limit: 25,
      firstReddit: 'dummyFirstId',
      lastReddit: 'dummyLastId',
    },
  };

  const expectedRedditObj = [
    {
      id: mockedState.redditViewer.subReddits[0].data.name,
      title: mockedState.redditViewer.subReddits[0].data.title,
      author: mockedState.redditViewer.subReddits[0].data.author,
      url: mockedState.redditViewer.subReddits[0].data.url,
      created: mockedState.redditViewer.subReddits[0].data.created_utc,
      score: mockedState.redditViewer.subReddits[0].data.score,
      permalink: mockedState.redditViewer.subReddits[0].data.permalink,
      commentCount: mockedState.redditViewer.subReddits[0].data.num_comments,
      thumbnail: mockedState.redditViewer.subReddits[0].data.thumbnail,
      thumbnailWidth:
        mockedState.redditViewer.subReddits[0].data.thumbnail_width,
      thumbnailHeight:
        mockedState.redditViewer.subReddits[0].data.thumbnail_height,
    },
  ];

  describe('makeSelectLimit', () => {
    it('should select the limit state', () => {
      const selectLimit = makeSelectLimit();
      const expectedState = 25;
      expect(selectLimit(mockedState)).toEqual(expectedState);
    });
  });

  describe('makeSelectNextRedditsBefore', () => {
    it('should select firstReddit = dummyFirstId', () => {
      const selectFirst = makeSelectNextRedditsBefore();
      const expectedState = mockedState.redditViewer.firstReddit;
      expect(selectFirst(mockedState)).toEqual(expectedState);
    });
  });

  describe('makeSelectNextRedditsAfter', () => {
    it('should select subReddits and derive objects from raw data', () => {
      const selectLast = makeSelectNextRedditsAfter();
      const expectedState = mockedState.redditViewer.lastReddit;
      expect(selectLast(mockedState)).toEqual(expectedState);
    });
  });

  describe('makeSelectSubredditsDerived', () => {
    it('should select subReddits and derive objects from raw data', () => {
      const selectReddits = makeSelectSubredditsDerived();
      expect(selectReddits(mockedState)).toEqual(expectedRedditObj);
    });
  });
});
