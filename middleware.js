module.exports.loginRequired = (req, res, next) => {
    console.log('req.user ......', req.user);
    if (!req.isAuthenticated()) {
        req.flash('error', 'Thou shallt be logged in to view this page');
        return res.redirect('/login');
    }
    next();
}

