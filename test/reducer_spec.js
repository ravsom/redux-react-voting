/**
 * Created by rs on 25/07/16.
 */

import {fromJS, Map, List} from 'immutable'
import {expect} from 'chai'

import {reducer} from '../src/reducer'
import {describe} from "mocha/lib/mocha";

describe('reducer', ()=> {
	it('handles SET_ENTRIES', ()=> {
		const initialState = Map();

		const action = {type: 'SET_ENTRIES', entries: List.of('Lagaan', 'Dil')};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({entries: ['Lagaan', 'Dil']}));
	});

	it('handles NEXT', ()=> {
		const initialState = fromJS({entries: ['Lagaan', 'Taare Zameen Par']});

		const action = {type: 'NEXT'};
		const next = reducer(initialState, action);

		expect(next).to.equal(fromJS({vote: {pair: ['Lagaan', 'Taare Zameen Par']}, entries: []}));

	});

	it('handles VOTE', ()=> {
		const initialState = fromJS({vote: {pair: ['Lagaan', 'Taare Zameen Par']}, entries: ['Dil', 'Ghulam']});

		const action = {type: 'VOTE', entry: 'Lagaan'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Lagaan', 'Taare Zameen Par'],
				tally: {'Lagaan': 1}
			},
			entries: ['Dil', 'Ghulam']
		}));
	})
});