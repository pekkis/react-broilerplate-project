import socketIo from 'socket.io-client';

function createMiddleware(server) {

  const socket = socketIo(server);

  const middleware = store => {

    socket.on('connect', () => {
      console.log('connetto grandi');
    });

    socket.on('action', action => {

      store.dispatch({
        ...action,
        meta: {
          origin: 'server',
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('game over man');
    });

    return next => action => {

      if (!action.meta) {
        return next(action);
      }

      if (action.meta && action.meta.origin && action.meta.origin === 'server') {
        return next(action);
      }
    }
  };

  return middleware;

}

export default createMiddleware;
