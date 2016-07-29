/**
 * Created by rs on 24/07/16.
 */

import {expect, assert} from 'chai';
import {List, Map, fromJS} from 'immutable';
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
	});

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
	});
	describe('a tree', ()=> {
		const addMovie = (currentState, movie)=> {
			return currentState.update('movies', movies => movies.push(movie));
		};

		it('a tree', ()=> {
			const state = Map.of('movies', List.of('kabali', 'udta punjab'));

			const nextState = addMovie(state, 'sultan');

			expect(nextState).to.equal(Map.of('movies', List.of('kabali', 'udta punjab', 'sultan')));
		})
	});
});

describe('functions of a map', () => {
	it('Map.of function', ()=> {
		const map1 = Map({
			'a': 3,
			'b': 5
		});
		expect(Map.of('a', 3, 'b', 5)).to.equal(map1);
	});

	it('update function', ()=> {
		const map1 = Map({'a': Map({'in_a': Map({'in_in_a': 5})}), 'b': 45, 'c': 34});

		const m1 = map1.update('a', value=>value.update('in_a', value=>value.update('in_in_a', a=>a + 10)));

		expect(m1).to.equal(fromJS({'a': {'in_a': {'in_in_a': 15}}, 'b': 45, 'c': 34}));

	});

	it('work with merge', ()=> {

		const map1 = fromJS({a: 10, b: 20, c: 30});
		const map2 = fromJS({d: 34, a: 25, e: 40});
		const map3 = map1.merge(map2);

		expect(map3).to.equal(fromJS({a: 25, b: 20, c: 30, d: 34, e: 40}));

	});

	it('work with updateIn', ()=> {
		const map1 = fromJS({'a': {'in_a': {'in_in_a': 5}}, 'b': 45, 'c': 34});

		const m1 = map1.updateIn(['a', 'in_a', 'in_in_a'], a=>a + 10);

		expect(m1).to.equal(fromJS({'a': {'in_a': {'in_in_a': 15}}, 'b': 45, 'c': 34}));
	});

	it('work with mergeIn', ()=> {
		const veggies = fromJS({
			red: 'capsicum',
			green: {
				leaves: {
					a: 'corriander',
					b: 'curry',
					c: 'mint'
				}
			},
			pink: 'beetroot'
		});
		const moreVeggies = fromJS({fruits: {d: 'custard apple'}});

		const x = veggies.mergeIn(['green'], moreVeggies);
	});


	it('work with mergeDeep', ()=> {
		var x = fromJS({a: {x: 10, y: 10}, b: {x: 20, y: 50}});
		var y = fromJS({a: {x: 2}, b: {y: 5}, c: {z: 3}});

		expect(x.mergeDeep(y)).to.equal(fromJS({'a': {'x': 2, 'y': 10}, 'b': {'x': 20, 'y': 5}, 'c': {'z': 3}}));
	});

});