/**
 * Generates a menuId value.
 *
 */

module.exports = {

    generate: function(length) {
        var range = 'ABCDEFGHKMNPQRSTWXYZ0123456789';
        var menuId = '';
        
        for (var i = 0; i < length; i++) {
            var index = Math.floor(Math.random() * range.length);
            menuId = menuId + range[index];
        }
        
        return menuId;
    }

};