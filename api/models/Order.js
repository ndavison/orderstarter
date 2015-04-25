/**
* Order.js
*
* @description :: an order created from an existing menu and its menuitem collection.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    'id': {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    'menu': {
      model: 'Menu',
      required: true
    },
    'items': {
      collection: 'MenuItem',
      via: 'orders',
      required: true,
      dominant: true
    },
    'name': {
      type: 'string',
      required: true
    }
  }
  
};

