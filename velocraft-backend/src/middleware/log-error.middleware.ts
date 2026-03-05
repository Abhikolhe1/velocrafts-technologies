import {Middleware} from '@loopback/rest';

/**
 * Logs the real cause of errors (e.g. unwraps AggregateError from Node's
 * Happy Eyeballs / internalConnectMultiple) so 500s show the actual reason
 * (e.g. ECONNREFUSED, connect ECONNREFUSED 127.0.0.1:3306).
 */
export const logErrorMiddleware: Middleware = async (context, next) => {
  try {
    return await next();
  } catch (err) {
    const e = err as Error & {errors?: unknown[]; cause?: unknown};
    if (e?.name === 'AggregateError') {
      console.error('[REJECT] Unwrapped AggregateError:');
      if (e.errors?.length) {
        e.errors.forEach((sub, i) =>
          console.error(`  [${i}]`, sub instanceof Error ? sub.message : sub),
        );
      }
      if (e.cause != null) {
        console.error('  cause:', e.cause instanceof Error ? e.cause.message : e.cause);
      }
      console.error('  message:', e.message);
    } else if (e) {
      console.error('[REJECT]', e.message ?? e);
    }
    throw err;
  }
};
