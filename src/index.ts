export class ConnectionPool<T> {
  private available: T[] = [];
  private inUse = new Set<T>();
  private maxConnections: number;
  private factory?: () => Promise<T>;

  constructor(options: { maxConnections: number }, factory?: () => Promise<T>) {
    this.maxConnections = options.maxConnections;
    this.factory = factory;
  }

  async acquire(): Promise<T> {
    if (this.available.length > 0) {
      const conn = this.available.pop()!;
      this.inUse.add(conn);
      return conn;
    }
    if (this.inUse.size < this.maxConnections && this.factory) {
      const conn = await this.factory();
      this.inUse.add(conn);
      return conn;
    }
    throw new Error('Connection pool exhausted');
  }

  release(conn: T): void {
    if (!this.inUse.has(conn)) return; // guard against double-release
    this.inUse.delete(conn);
    this.available.push(conn);
  }
}
