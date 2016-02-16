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
      isMultipleChoice: {
          type: 'boolean',
          defaultsTo: false
      },
      percentPerAnswer: 'json',
      average: 'float',
      responses: 'integer'
  },
  
  //Before a question object is created initialize the responses, averages, and the percentages  
  beforeCreate: function(values, next) {
      values.responses = 1;
      if(values.isNumeric){
          values.average = values.answer[0];
      }
      if(values.isMultipleChoice){
          values.percentPerAnswer = {};
          values.percentPerAnswer[values.answer[0]] = 100.0;
      }
      next();
  },
  
  //Before a question object is updated, increase the responses, re-caluclate the average, and 
  //re-calculate the percentages for each of the answers given
  beforeUpdate: function(values, next){
      values.responses++;
      if(values.isNumeric){
          var sum = 0.0;
          for(var i = 0; i<values.answer.length; i++){
              sum += parseFloat(values.answer[i]);
          }
          values.average = (sum/values.responses).toFixed(2);
      }
      if(values.isMultipleChoice){
          var tmpAnswers = values.answer;
          var occurences = countOccurences(tmpAnswers);
          for(var key in occurences){
              var percentage = (parseFloat(occurences[key])/values.responses) * 100.0;
              values.percentPerAnswer[key] = percentage.toFixed(2);
          }
      }
      next();
  }
    
};

//Counts the occurences of each answer in order to calcuate a percentage
function countOccurences(answers){
    var occurence = {}, prev; 
    answers.sort();
    for (var i = 0; i < answers.length; i++) {
        if (answers[i] !== prev){
            occurence[answers[i]] = 1;
        }else{
            occurence[answers[i]]++;
        }
        prev = answers[i];
    }  
    return occurence;
}



