/**
* OrderItem.js
*
* @description :: An item on an order that a user has chosen.
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

