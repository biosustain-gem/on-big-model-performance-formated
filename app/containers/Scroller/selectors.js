import { createSelector } from 'reselect';

/**
 * Direct selector to the scroller state domain
 */
const selectScrollerDomain = () => (state) => state.get('scroller');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Scroller
 */

const makeSelectScroller = () => createSelector(
  selectScrollerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectScroller;
export {
  selectScrollerDomain,
};
