/**
 *
 * RedditItemList
 *
 * I prefer to locate components that are domain specific to the container
 * within the same directory.  Only shared components across container domains
 * should go into a glocal component directory. The RedditItemsList is a functional
 * component that accepts an array of Reddit objects as props.  The RedditItemsList does
 * a map of the array and returns a list of RedditItem(s) and renders them.
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import RedditItem from '../RedditItem';

export function RedditItemList(props) {
  const { reddits } = props;

  const content = reddits ? (
    reddits.map(reddit => <RedditItem key={reddit.id} reddit={reddit} />)
  ) : (
    <div />
  );

  return content;
}

RedditItemList.defaultProps = {
  reddits: [], // Array of reddit posts derived
};

RedditItemList.propTypes = {
  reddits: PropTypes.array, // Array of reddit posts derived
};

export default memo(RedditItemList);
