/**
 *
 * RedditItem
 *
 * This is the component that renders the individual Reddit posts.
 * It accepts a property which is an individual Reddit post.
 * 1. It shortens the url using regex to the domain of the link.
 * 2. Uses moment-mini to get the time from the utc date the post was created
 * 3. Figures out if 'Comment' or 'Comments' should be used fot the comment link
 * 4. Adds the number of comments with a link to the Reddit post
 * 5. Shows the post title that links to the Reddit post (permalink)
 * 6. Shows the thumnai if there is one present.
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-mini';
import ArticleWrapper from './ArticleWrapper';
import { ItemHeader } from './ItemHeader';
import { ItemFooter, CommentLink } from './ItemFooter';
import { TitleLink } from './TitleLink';
import Img from '../../../../components/Img';
import H3 from '../../../../components/H3';
import A from '../../../../components/A';

function RedditItem(props) {
  const { reddit } = props;

  const shortUrl = url => new URL(url).hostname.replace('www.', '');
  const dateFromNow = moment.unix(reddit.created).fromNow();
  const commentLink =
    reddit.commentCount && reddit.commentCount > 0
      ? `${reddit.commentCount} Comments`
      : `Comment`;
  const permaLink = `https://www.reddit.com/${reddit.permalink}`;

  return (
    <ArticleWrapper>
      <ItemHeader>
        <div>Posted by {reddit.author}</div>
        <div>{dateFromNow}</div>
      </ItemHeader>
      <H3>
        <TitleLink href={permaLink}>{reddit.title}</TitleLink>
      </H3>
      {reddit.url && (
        <div>
          <A href={reddit.url}>{shortUrl(reddit.url)}</A>
        </div>
      )}
      {reddit.thumbnail && reddit.thumbnail !== 'self' && (
        <div>
          <Img
            alt={reddit.title}
            src={reddit.thumbnail}
            height={reddit.thumbnailHeight}
            width={reddit.thumbnailWidth}
          />
        </div>
      )}
      <ItemFooter>
        <CommentLink href={permaLink}>{commentLink}</CommentLink>
      </ItemFooter>
    </ArticleWrapper>
  );
}

RedditItem.propTypes = {
  reddit: PropTypes.object.isRequired,
};

export default memo(RedditItem);
