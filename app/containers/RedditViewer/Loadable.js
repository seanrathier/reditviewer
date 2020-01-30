/**
 *
 * Asynchronously loads the component for RedditViewer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
