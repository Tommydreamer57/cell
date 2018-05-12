module.exports = function userToReq(req, res, next) {
    if (!req.session.user) {
        req.db.get_user_by_id({ id: 1 }).then(([user]) => {
            req.session.user = user;
            next();
        });
    } else next();
}