/**
 * Checks whether the menuitem request has a matching 
 * menu and password.
 */
 
module.exports = function(req, res, next) {

    var password = req.param('password');
    var menuItemId = req.param('id');
    var menuId = req.param('menu');
    
    if (menuId) {
        Menu
        .findOne(menuId)
        .exec(function(err, menu) {
            if (!menu) return res.notFound('No menu with this id exists.');
            if (menu.password && menu.password != password) return res.forbidden('The password for this menu was incorrect.');
            next();
        });
    } else if (menuItemId) {    
        MenuItem
        .findOne(menuItemId)
        .populate('menu')
        .exec(function(err, menuItem) {
            if (!menuItem) return res.notFound('No menuitem with this id exists.');
            if (menuItem.menu.password && menuItem.menu.password != password) return res.forbidden('The password for this menu was incorrect.');
            next();
        });
    } else {
        next();
    }
    
};
