/**
 * Created by rs on 24/07/16.
 */

import {Map} from 'immutable';

export const INITIAL_STATE = Map();

export const vote = (state, entry)=> {
	return state.updateIn(['tally', entry], 0, tally=>tally + 1);
};

const getWinners = (vote)=> {
//vote - pair - tally
	if (!vote) {
		return [];
	}
	const [a,b] = vote.get('pair');
	const aVotes = vote.getIn(['tally', a], 0);
	const bVotes = vote.getIn(['tally', b], 0);

	if (aVotes > bVotes) return [a];
	else if (aVotes < bVotes) return [b];
	return [a, b];

};
export const next = (state)=> {
	const vote = state.get('vote');
	var entries = state.get('entries').concat(getWinners(vote));
	if (entries.size === 1) {
		return state.remove('entries').remove('vote').set('winner', entries.first());
	}
	return state.merge({
			vote: Map({pair: entries.take(2)}),
			entries: entries.skip(2)
		}
	);
};

export const setEntries = (state, entries)=> {
	console.log('State is : ' + state);
	return state.set('entries', entries);
};