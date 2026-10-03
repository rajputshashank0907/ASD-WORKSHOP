const cacheStore = new Map();
const TTL = 60 * 1000; // 1 minute in milliseconds

const cacheMiddleware = (req, res, next) => {
    if (req.method !== 'GET') {
        return next();
    }

    const key = req.originalUrl;
    const cachedEntry = cacheStore.get(key);

    if (cachedEntry) {
        const age = Date.now() - cachedEntry.createdAt;

        if (age < TTL) {
            // Valid cache, return cached value
            res.set('X-Cache', 'HIT');
            return res.json(cachedEntry.data);
        } else {
            // Cache expired, delete it and let the request proceed to fetch fresh data
            cacheStore.delete(key);
        }
    }

    // If no cache or expired, it's a MISS
    res.set('X-Cache', 'MISS');

    // Intercept res.json to capture the response and store it in cache
    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cacheStore.set(key, {
                createdAt: Date.now(),
                data: body
            });
        }
        return originalJson(body);
    };

    next();
};

const invalidateCacheMiddleware = (req, res, next) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        // Intercept res.json to know when a mutation was successful
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                // Clear the cache since data has been modified
                cacheStore.clear();
            }
            return originalJson(body);
        };
    }
    next();
};

module.exports = {
    cacheMiddleware,
    invalidateCacheMiddleware
};
