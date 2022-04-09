/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//import * as buffer from 'buffer';
// import * as process from 'process';

//(window as any).Buffer = buffer.SlowBuffer;

/*(window as any).process = process;

(process as any).on('unhandledRejection', (reason: unknown, promise: unknown) =>
  console.log('unhandled', reason, promise)
);
(process as any).on('rejectionHandled', (promise: unknown) =>
  console.log('handled', promise)
);
*/
