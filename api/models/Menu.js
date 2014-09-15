/**
* Menu.js
*
* @description :: A menu, which users can choose from to create an order. 
*                 Primarily a collection of MenuItem.js instances with identifying data.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    'menuId': {
      type: 'string',
      unique: true,
      required: true
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
  }
  
};

