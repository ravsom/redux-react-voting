/**
 * Created by rs on 25/07/16.
 */

import {setEntries} from './core';

export const reducer = (state, action)=> {
	console.log(action.entries);
	switch (action.type) {
		case 'SET_ENTRIES':
			return setEntries(state, action.entries);
	}
};