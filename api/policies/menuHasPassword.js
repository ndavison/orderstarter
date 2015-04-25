/**
 * Checks whether the menu request has a matching 
 * menu and password.
 */
 
module.exports = function(req, res, next) {

    var password = req.param('password');
    var menuId = req.param('id');
    Menu
    .findOne(menuId)
    .exec(function(err, menu) {
        if (!menu) return res.badRequest('No menu with this id exists.');
        if (menu.password != password)  return res.forbidden('The password for this menu was incorrect.');
        next();
    });
    
};
