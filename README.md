# Connection Pool

Reuse database/socket connections. Prevent resource exhaustion.

```javascript
const pool = new ConnectionPool({ maxConnections: 10 });
const conn = await pool.acquire();
try { /* use connection */ } finally { pool.release(conn); }
```

Solves: Resource exhaustion, connection limits, performance.
License: MIT
