module.exports = function dbToReq(req, res, next) {
    const db = req.app.get('db');
    req.db = db;
    next();
}