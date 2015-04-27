/**
 * Checks whether the order request has a matching 
 * menu and password.
 */
 
module.exports = function(req, res, next) {

    var password = req.param('password');
    var orderId = req.param('id');
    var menuId = req.param('menu');
    
    if (menuId) {
        Menu
        .findOne(menuId)
        .exec(function(err, menu) {
            if (!menu) return res.notFound('No menu with this id exists.');
            if (menu.password && menu.password != password) return res.forbidden('The password for this menu was incorrect.');
            next();
        });
    } else if (orderId) {    
        Order
        .findOne(orderId)
        .populate('menu')
        .exec(function(err, order) {
            if (!order) return res.notFound('No order with this id exists.');
            if (order.menu.password && order.menu.password != password) return res.forbidden('The password for this menu was incorrect.');
            next();
        });
    } else {
        next();
    }
    
};
