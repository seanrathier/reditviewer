/**
 *
 * RedditItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-mini';
import ArticleWrapper from './ArticleWrapper';
import { ItemHeader } from './ItemHeader';
import { ItemFooter } from './ItemFooter';
import H3 from '../H3';
import A from '../A';

function RedditItem(props) {
  const { reddit } = props;

  const shortUrl = url => new URL(url).hostname.replace('www.', '');
  const dateFromNow = moment.unix(reddit.created).fromNow();

  return (
    <ArticleWrapper>
      <ItemHeader>
        <div>Posted by {reddit.author}</div>
        <div>{dateFromNow}</div>
      </ItemHeader>
      <H3>{reddit.title}</H3>
      {reddit.url && (
        <div>
          <A href={reddit.url}>{shortUrl(reddit.url)}</A>
        </div>
      )}
      <div>
        {reddit.commentCount && (
          <ItemFooter>
            <A href={`https://www.reddit.com/${reddit.permalink}`}>{reddit.commentCount} Comments</A>
          </ItemFooter>
        )}
        {!reddit.commentCount && (
          <ItemFooter>
            <A href={`https://www.reddit.com/${reddit.permalink}`}>Comment</A>
          </ItemFooter>
        )}
      </div>
    </ArticleWrapper>
  );
}

RedditItem.propTypes = {
  reddit: PropTypes.object.isRequired,
};

export default memo(RedditItem);
