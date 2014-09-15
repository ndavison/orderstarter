/**
* OrderItem.js
*
* @description :: An item on an order that a user has chosen.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    'order': {
      model: 'Order',
      required: true
    },
    'menuitem': {
      model: 'MenuItem',
      required: true
    }
  }
  
};

