/**
 * Checks whether the menu request has a matching 
 * menu and password.
 */
 
module.exports = function(req, res, next) {

    var password = req.param('password');
    var menuId = req.param('id');
    
    if (menuId) {
        Menu
        .findOne(menuId)
        .exec(function(err, menu) {
            if (!menu) return res.notFound('No menu with this id exists.');
            if (menu.password && menu.password != password) return res.forbidden('The password for this menu was incorrect.');
            next();
        });
    } else {
        next();
    }
};
