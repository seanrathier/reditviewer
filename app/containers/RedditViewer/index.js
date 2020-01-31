/**
 *
 * RedditViewer
 *
 * The RedditViewer page is the main container that connects to redux store,
 * and dipatches actions to load initial data and refesh the data every minute.
 *
 * The data request dispatches are initiated using React's useEffect hook.
 *
 * For the sake of showing that I understand Redux without hooks I implemented the connect
 * higher order component, and mapped state to props, and mapped dispatch the props. The
 * RedditViewer renders a button at the bottom of the page to load 25 more Reddit posts.
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectSubredditsDerived } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getSubredditData } from './actions';
import RedditItemList from './components/RedditItemList';
import Button from '../../components/Button';

export function RedditViewer(props) {
  // injects the reducer only when it is needed
  useInjectReducer({ key: 'redditViewer', reducer });
  // injects the sagas only when it is needed
  useInjectSaga({ key: 'redditViewer', saga });

  // Load the initial redit data
  useEffect(() => {
    // dispatches an action to fetch initial data. Refresh is false
    // and the saga will know to get the latest
    props.getReditData({ refresh: false });
  }, []);

  // refreshes data every minute
  useEffect(() => {
    const refreshInterval = setInterval(
      // dispatches an action to fetch more data. Refresh is true so the saga knows it
      // should fetch for new posts
      () => props.getReditData({ refresh: true }),
      60000, // every minute
    );
    // clear interval when component unmounts like in willComponentUnmount
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  // dispatches an action to fetch more data. Refresh is false so the saga knows it
  // should fetch more from the past
  const loadMoreData = () => props.getReditData({ refresh: false });

  return (
    <div>
      <section>
        <RedditItemList reddits={props.subRedditData} />
      </section>
      {props.subRedditData && props.subRedditData.length > 0 && (
        <section>
          <Button type="button" onClick={loadMoreData}>
            Older
          </Button>
        </section>
      )}
    </div>
  );
}

RedditViewer.propTypes = {
  getReditData: PropTypes.func.isRequired,
  subRedditData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  subRedditData: makeSelectSubredditsDerived(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReditData: options => dispatch(getSubredditData(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RedditViewer);
