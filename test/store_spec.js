/**
 * Created by rs on 28/07/16.
 */

import {expect} from 'chai';
import {Map, fromJS, List} from 'immutable'
import {describe} from "mocha/lib/mocha";
import {makeStore} from '../src/store'

describe('store', ()=> {
	it('is a correct store configured with a reducer', ()=> {
		const store = makeStore();
		console.log(store.getState());
		expect(store.getState()).to.equal(Map());

		store.dispatch({type: 'SET_ENTRIES', entries: List.of('Kabaali', 'Shivaji')});

		expect(store.getState()).to.equal(fromJS({entries: ['Kabaali', 'Shivaji']}));
	})
});