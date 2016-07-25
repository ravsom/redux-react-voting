/**
 * Created by rs on 24/07/16.
 */

import {expect} from 'chai';
import {List, Map} from 'immutable';
import {describe} from "mocha/lib/mocha";

describe('immutability', ()=> {
	describe('a number', ()=> {
			const increment = (number)=> {
				return number + 1;
			};

			it('is immutable', ()=> {
				let state = 43;
				let nextS = increment(state);

				expect(nextS).to.equal(44);
				expect(state).to.equal(43);
			});
		},
		describe('a list', ()=> {
				const addMovie = (currentState, movie) => {
					return currentState.push(movie);
				};

				it('is immutable', ()=> {
					let state = List.of('kabali', 'udta punjab', 'nil battey sannata');
					let nextState = addMovie(state, 'sultan');
					expect(nextState).to.equal(List.of('kabali', 'udta punjab', 'nil battey sannata', 'sultan'));
					expect(state).to.equal(List.of('kabali', 'udta punjab', 'nil battey sannata'));
				})
			},
			describe('a tree', ()=> {
				const addMovie = (currentState, movie)=> {
					return currentState.update('movies', movies => movies.push(movie));
				};

				it('a tree', ()=> {
					const state = Map.of('movies', List.of('kabali', 'udta punjab'));

					const nextState = addMovie(state, 'sultan');

					expect(nextState).to.equal(Map.of('movies', List.of('kabali', 'udta punjab', 'sultan')));
				})
			})))
});