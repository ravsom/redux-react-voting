/**
 * Created by rs on 29/07/16.
 */

import Server from 'socket.io';

export const startServer = (store)=> {
	const io = new Server().attach(process.port || 8070);

	store.subscribe(()=> {
		console.log("Store subscribe called");
		io.emit('state', store.getState().toJS());
	});

	io.on('connection', (socket)=> {
		console.log("IO ON Connection called");
		socket.emit('state', store.getState().toJS());
		socket.on('action', store.dispatch.bind(store));
	})
};