/**
* MenuItem.js
*
* @description :: An item on a menu that users can choose from when 
*                 creating their orders. 
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
    'orders': {
        collection: 'Order',
        via: 'items'
    },
    'title': {
      type: 'string',
      required: true
    },
    'description': {
      type: 'string'
    }
  }
  
};

