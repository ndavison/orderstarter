/**
 * Checks whether the request has a matching 
 * menu and password.
 */
 
module.exports = function(req, res, next) {

    var menuId = req.param('menu');
    var password = req.param('password');
    
    if (!password || !menuId) res.badRequest('Missing menuId and/or password.');
    
    Menu.findOne(menuId, function(err, menu) {
        if (!menu) return res.notFound('No menuId by this id exists.');
        if (menu.password != password) return res.forbidden('The password for this menu was incorrect.');
        next();
    });
};
