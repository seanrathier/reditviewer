/**
 *
 * SubRedditItems
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import RedditItem from '../../../components/RedditItem/Loadable';

export function SubRedditItems(props) {
  const { subRedditData } = props;

  const content = subRedditData ? (
    subRedditData.map(reddit => <RedditItem key={reddit.id} reddit={reddit} />)
  ) : (
    <div />
  );

  return content;
}

SubRedditItems.defaultProps = {
  subRedditData: PropTypes.array,
};

SubRedditItems.propTypes = {
  subRedditData: PropTypes.array,
};

export default memo(SubRedditItems);
