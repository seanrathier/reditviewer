/**
 *
 * RedditViewer
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
import SubRedditItems from './components/SubRedditItems';
import Button from '../../components/Button';

export function RedditViewer(props) {
  useInjectReducer({ key: 'redditViewer', reducer });
  useInjectSaga({ key: 'redditViewer', saga });

  // Load the initial redit data
  useEffect(() => {
    props.getReditData({ refresh: false });
  }, []);

  // refresh data every minute
  useEffect(() => {
    const refreshTimer = setInterval(
      () => props.getReditData({ refresh: true }),
      60000,
    );

    // clear Timeout when component unmounts like in willComponentUnmount
    return () => {
      clearInterval(refreshTimer);
    };
  }, []);

  return (
    <div>
      <section>
        <SubRedditItems subRedditData={props.subRedditData} />
      </section>
      <section>
        <Button
          type="button"
          // need to fix this,  arrow functions not good in render
          onClick={() => props.getReditData({ refresh: false })}
        >
          Load More
        </Button>
      </section>
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
