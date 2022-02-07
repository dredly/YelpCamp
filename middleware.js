module.exports.loginRequired = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Thou shallt be logged in to view this page');
        return res.redirect('/login');
    }
    next();
}

