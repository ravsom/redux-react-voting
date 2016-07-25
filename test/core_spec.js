/**
 * Created by rs on 24/07/16.
 */
import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core'
import {describe} from "mocha/lib/mocha";

describe('application logic', ()=> {
	describe('set entries', ()=> {
			it('sets entries to state', () => {
				const state = Map();
				const entries = List.of('Udta', 'Madaari', 'Kabaali');

				const nextState = setEntries(state, entries);

				expect(nextState).to.equal(Map({
					'entries': List.of('Udta', 'Madaari', 'Kabaali')
				}))
				;
			})
		}, describe('next', ()=> {
			it('marks a winner when 1 entry is present', ()=> {
				const state = Map({
					vote: Map({
						pair: List.of('Special 26', 'Airlift'),
						tally: Map({'Special 26': 12, 'Airlift': 9})
					}),
					entries: List()
				});

				const nextS = next(state);
				expect(nextS).to.equal(Map({winner: 'Special 26'}));
			});

			it('takes the next two entries under vote', ()=> {
				const state = Map({
					entries: List.of('Special 26', 'Airlift', 'Baby')
				});

				const nextState = next(state);

				expect(nextState).to.equal(Map({
					vote: Map({
						pair: List.of('Special 26', 'Airlift')
					}),
					entries: List.of('Baby')
				}));
			});

			it('puts the winner of the current vote back to the entries', ()=> {
				const state = Map({
					vote: Map({pair: List.of('Special 26', 'Airlift'), tally: Map({'Special 26': 4, 'Airlift': 12})}),
					entries: List.of('Rustom', 'Khiladi', 'Aitraz')
				});
				const nextState = next(state);

				expect(nextState).to.equal(Map({
					vote: Map({pair: List.of('Rustom', 'Khiladi')}),
					entries: List.of('Aitraz', 'Airlift')
				}));
			});
		}),
		describe('vote', ()=> {
			it('creates tally for the voted entry', ()=> {
				const state = Map({
					vote: Map({
						pair: List.of('Special 26', 'Airlift')
					}),
					entries: List()
				});
				const nextState = vote(state, 'Airlift');

				expect(nextState).to.equal(Map({
					vote: Map({
						pair: List.of('Special 26', 'Airlift'),
						tally: Map({'Airlift': 1})
					}),
					entries: List()
				}));
			});

			it('adds to existing talled for voted entry', ()=> {
				const state = Map({
					vote: Map({
						pair: List.of('Special 26', 'Airlift'),
						tally: Map({'Special 26': 3, 'Airlift': 4})
					}),
					entries: List()
				});
				const nextState = vote(state, 'Airlift');

				expect(nextState).to.equal(Map({
					vote: Map({
						pair: List.of('Special 26', 'Airlift'),
						tally: Map({'Special 26': 3, 'Airlift': 5})
					}),
					entries: List()
				}));
			})
		})
	)
});