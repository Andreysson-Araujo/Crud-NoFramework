function corsMiddleware(req, res, next) {
    const allowedOrigins = ["http://localhost:3000","http://localhost:3000/produto" ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  }
  
  module.exports = corsMiddleware;
  