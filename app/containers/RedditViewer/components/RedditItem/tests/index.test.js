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

import RedditItem from '../index';

const mockReddit = {
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
};

describe('<RedditItem />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<RedditItem reddit={mockReddit} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect Comments to be 23 Comments', () => {
    const { getByText } = render(<RedditItem reddit={mockReddit} />);
    expect(getByText('23 Comments')).toBeTruthy();
  });

  it('Expect Title to be exist', () => {
    const { getByText } = render(<RedditItem reddit={mockReddit} />);
    expect(getByText('fakeTitle')).toBeTruthy();
  });

  /**
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<RedditItem reddit={mockReddit} />);
    expect(firstChild).toMatchSnapshot();
  });
});
