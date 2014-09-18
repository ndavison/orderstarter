/**
* Order.js
*
* @description :: 
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    'id': {
      type: 'integer',
      primaryKey: true,
      require: true,
      autoIncrement: true,
      unique: true
    },
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

