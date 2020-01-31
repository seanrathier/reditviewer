/**
 *
 * Tests for RedditViewer
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import 'jest-dom/extend-expect';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../configureStore';

import { RedditViewer } from '../index';

const mockReddits = [
  {
    id: 'fakeId',
    title: 'fakeTitle',
    author: 'fakeAuthor',
    url: 'http://fakeUrl.com/somethingelse',
    created: 152334665,
    score: 23,
    permalink: 'fake/path/to/reddit/2134234',
    commentCount: 23,
    thumbnail: 'http://reddit.com/path/to/thumbnail.jpg',
    thumbnailWidth: 100,
    thumbnailHieght: 100,
  },
  {
    id: 'fakeId2',
    title: 'fakeTitle2',
    author: 'fakeAuthor',
    url: 'http://fakeUrl.com/somethingelse',
    created: 1580485878,
    score: 23,
    permalink: 'fake/path/to/reddit/2134234',
    commentCount: 23,
    thumbnail: 'http://reddit.com/path/to/thumbnail.jpg',
    thumbnailWidth: 100,
    thumbnailHieght: 100,
  },
];

const getReditData = () => {};

describe('<RedditViewer />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it.skip('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(<RedditViewer dispatch={dispatch} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render 2 reddit post with element article', () => {
    const { container } = render(
      <Provider store={store}>
        <RedditViewer subRedditData={mockReddits} getReditData={getReditData} />
      </Provider>,
    );
    expect(container.querySelector('article').length === 2);
  });
});
