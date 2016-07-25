/**
 * Created by rs on 25/07/16.
 */

import {setEntries, next, vote, INITIAL_STATE} from './core';

export const reducer = (state = INITIAL_STATE, action)=> {
	switch (action.type) {
		case 'SET_ENTRIES':
			return setEntries(state, action.entries);

		case 'NEXT':
			return next(state);

		case 'VOTE':
			return vote(state, action.entry);
	}
};