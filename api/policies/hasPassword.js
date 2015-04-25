/**
 * Checks whether the request has a matching 
 * menu and password.
 */
 
module.exports = function(req, res, next) {

    // checks that the menu relevant to the request matches the provided password
    var checkMenuPassword = function(menuId, password) {
        Menu
        .findOne(menuId)
        .exec(function(err, menu) {
            if (!menu) return res.badRequest('No menu with this id exists.');
            if (menu.password != password)  return res.forbidden('The password for this menu was incorrect.');
            next();
        });
    };
    
    var menuId = req.param('menu');
    var password = req.param('password');
    if (!menuId) {
        var orderId = req.param('order');
        if (orderId) {
            Order.findOne(orderId).exec(function(err, order) {
                if (!order) return res.badRequest('No order with this id exists.');
                checkMenuPassword(order.menu, password);
            });
        } else {
            checkMenuPassword(req.param('id'), password);
        }
    } else {
        checkMenuPassword(menuId, password);
    }
    
};
