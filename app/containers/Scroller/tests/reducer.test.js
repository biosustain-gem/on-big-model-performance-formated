
import { fromJS } from 'immutable';
import scrollerReducer from '../reducer';

describe('scrollerReducer', () => {
  it('returns the initial state', () => {
    expect(scrollerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
