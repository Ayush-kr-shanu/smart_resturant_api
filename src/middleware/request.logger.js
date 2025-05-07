function requestLogger(req, res, next) {
    const start = Date.now();
    
    const originalEnd = res.end;
    
    res.end = function (chunk, encoding) {
        const duration = Date.now() - start;
        
        const method = getColoredMethod(req.method);
        
        console.log(`${method} ${req.path} - ${duration}ms`);
        
        originalEnd.apply(res, arguments);
    };
    
    next();
}

// Helper function to colorize HTTP methods
function getColoredMethod(method) {
    const colors = {
        GET: '\x1b[32m', 
        POST: '\x1b[34m',
        PUT: '\x1b[33m',
        DELETE: '\x1b[31m',
        PATCH: '\x1b[36m',
    };
    
    const color = colors[method] || '\x1b[0m';
    return `${color}[${method}]\x1b[0m`;
}

module.exports = requestLogger;