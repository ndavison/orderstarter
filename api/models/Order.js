/**
* Order.js
*
* @description :: 
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    'menu': {
      model: 'Menu',
      required: true
    },
    'items': {
      collection: 'OrderItem',
      via: 'order'
    },
    'name': {
      type: 'string',
      required: true
    }
  }
  
};

