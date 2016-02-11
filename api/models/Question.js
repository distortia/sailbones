/**
* Question.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      question:{
        type: 'string',
        unique: true,
        required: true
      },
      answer: 'array',
      isNumeric: { 
          type: 'boolean',
          defaultsTo: false
      },
      average: 'float',
      responses: 'integer'
  },
  
  beforeCreate: function(values, next) {
      values.responses = 1;
      if(values.isNumeric){
          values.average = values.answer[0];
      }
      next();
  },
    
  beforeUpdate: function(values, next){
      values.responses++;
      if(values.isNumeric){
          var sum = 0.0;
          for(var i = 0; i<values.answer.length; i++){
              sum += parseFloat(values.answer[i]);
          }
          values.average = (sum/values.responses);
      }
      next();
  }
    
};

