/**
* MenuItem.js
*
* @description :: An item on a menu that users can choose from when 
*                 creating their orders. 
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    'menu': {
      model: 'Menu',
      required: true
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

