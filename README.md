# Connection Pool

Reuse database/socket connections. Prevent resource exhaustion.

```javascript
const pool = new ConnectionPool({ maxConnections: 10 }, factory);
const conn = await pool.acquire();
try { /* use connection */ } finally { pool.release(conn); }
```

The second constructor argument, `factory`, is a `() => Promise<T>` used to create new connections
up to `maxConnections`. It is optional but `acquire()` throws once the pool is exhausted if no
factory was provided to create additional connections.

Solves: Resource exhaustion, connection limits, performance.
License: MIT

Sponsored by [Ferrow](https://ferrow.ai)

---
Part of the [ferrow-toolkit](https://github.com/Ruzylo-cloud/ferrow-toolkit) collection · Sponsored by [Ferrow](https://ferrow.ai)
