import { createSelector } from 'reselect';

/**
 * Direct selector to the dataProvider state domain
 */
const selectDataProviderDomain = () => (state) => state.get('dataProvider');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DataProvider
 */

const makeSelectDataProvider = () => createSelector(
  selectDataProviderDomain(),
  console.log
  // (substate) => substate.get('selected')
);

export default makeSelectDataProvider;
export {
  selectDataProviderDomain,
};
