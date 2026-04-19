/**
 * A simple client-side cache singleton for handling data prefetching and retrieval.
 * This mimics the 'Shared Query Client' behavior without external dependencies.
 */

class DataStore {
  private cache: Map<string, any> = new Map();
  private promises: Map<string, Promise<any>> = new Map();

  async fetchCached(key: string, fetcher: () => Promise<any>) {
    // If data is already in cache, return it immediately
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    // If a request is already in flight, return that promise
    if (this.promises.has(key)) {
      return this.promises.get(key);
    }

    // Otherwise, fetch and cache
    const promise = fetcher().then((data) => {
      this.cache.set(key, data);
      this.promises.delete(key);
      return data;
    });

    this.promises.set(key, promise);
    return promise;
  }

  async prewarm(key: string, fetcher: () => Promise<any>) {
    if (this.cache.has(key) || this.promises.has(key)) return;
    
    console.log(`[Cache] Prewarming: ${key}`);
    return this.fetchCached(key, fetcher);
  }

  getCached(key: string) {
    return this.cache.get(key);
  }

  has(key: string) {
    return this.cache.has(key);
  }
}

// Export as a singleton
export const queryClient = new DataStore();
