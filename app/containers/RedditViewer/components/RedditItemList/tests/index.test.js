/**
 *
 * Tests for RedditItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import RedditItemList from '../index';

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

describe('<RedditItemList />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<RedditItemList />);
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<RedditItemList />);
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render 2 reddit post with element article', () => {
    const { container } = render(<RedditItemList reddits={mockReddits} />);
    expect(container.querySelector('article').length === 2);
  });
});
