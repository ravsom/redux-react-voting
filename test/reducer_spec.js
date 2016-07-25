/**
 * Created by rs on 25/07/16.
 */

import {fromJS, Map} from 'immutable'
import {expect} from 'chai'

import {reducer} from '../src/reducer'
import {describe} from "mocha/lib/mocha";

describe('reducer', ()=> {
	it('handles SET_ENTRIES', ()=> {
		const initialState = Map();

		const action = {type: 'SET_ENTRIES', entries: ['Lagaan', 'Dil']};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({entries: ['Lagaan', 'Dil']}));
	})
});