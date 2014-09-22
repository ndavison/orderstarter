/**
 * Checks whether the request has a matching 
 * menu and password.
 */
 
module.exports = function(req, res, next) {

    var menuId = req.param('menu');
    var password = req.param('password');
    
    Menu
      .findOne(menuId)
      .exec(function(err, menu) {
        if (!menu) return res.badRequest('No menu by this id exists.');
        if (menu.password != password)  return res.forbidden('The password for this menu was incorrect.');
        next();
      });
};
