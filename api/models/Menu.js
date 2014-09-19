/**
* Menu.js
*
* @description :: A menu, which users can choose from to create an order. 
*                 Primarily a collection of MenuItem.js instances with identifying data.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    'id': {
      type: 'string',
      primaryKey: true,
      unique: true
    },
    'password': {
      type: 'string'
    },
    'title':  {
      type: 'string',
      required: true
    },
    'owner': {
      type: 'string',
      required: true
    },
    'items': {
      collection: 'MenuItem',
      via: 'menu'
    },
    'orders': {
      collection: 'Order',
      via: 'menu'
    }
  },
  
  /**
   * Generate a menuId automatically.
   */
  beforeCreate: function(values, cb) {
    
    values.id = MenuId.generate(6);
    
    cb();
  }
  
};

