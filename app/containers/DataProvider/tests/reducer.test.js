
import { fromJS } from 'immutable';
import dataProviderReducer from '../reducer';

describe('dataProviderReducer', () => {
  it('returns the initial state', () => {
    expect(dataProviderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
