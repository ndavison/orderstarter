/**
 * Checks that the items being selected in an order are from the 
 * order's menu.
 */

 module.exports = function(req, res, next) {

    var items = req.param('items');
    var menuId = req.param('menu');
    
    if (menuId && items && items.length > 0) {
        MenuItem
        .find({menu: menuId, id: items})
        .then(function(foundItems) {
            if (foundItems.length == items.length) {
                next();
            } else {
                return res.badRequest('The items provided are not from the menu for this order.');
            }
        })
        .catch(function(err) {
            return res.serverError(err);
        });
    } else {
        next();
    }
    
};
 