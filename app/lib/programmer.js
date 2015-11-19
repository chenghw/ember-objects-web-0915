import Ember from 'ember';

export default Ember.Object.extend({
  greet: function(){
    return `Hi, My name is ${this.firstName} ${this.lastName}. You can call me ${this.nickName}`;
  },
  isOld: Ember.computed('age', function(){
    if(this.get('age') > 30){
      return true;
    } else {
      return false;
    }
  }),
  wroteRuby: Ember.computed('authorOf', function(){
    if(this.get('authorOf') === "Ruby"){
      return true;
    } else {
      return false;
    }
  }),
  addConference: function(conference){
    this.conferences.push(conference);
  },
  keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){
    return this.get('conferences').filterBy('keyNote', `${this.firstName} ${this.lastName}`);
  }),
  conferenceNames: Ember.computed("conferences.@each.name", function(){
    return this.get('conferences').mapBy('name');
  }),
  conferenceTotal: Ember.computed("conferences", function(){
    return this.get('conferences').length;
  }),
  itinerary: Ember.computed('nickName', 'conferenceTotal', function(){
    return `${this.nickName} is speaking at ${this.get('conferenceTotal')} conferences`;
  }),
  hasValidEmail: Ember.computed('email', function(){
    let emailRegex = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
    return emailRegex.test(this.get('email'));
  }),
  errors: Ember.computed('firstName', 'lastName', 'age', 'email', function(){
    var errors = [];
    if(!this.get('firstName')){
      errors.push("firstName cannot be blank");
    }
    if(!this.get('lastName')){
      errors.push("lastName cannot be blank");
    }
    if(!this.get('age')){
      errors.push("age cannot be blank");
    }
    if(!this.get('hasValidEmail')){
      errors.push("email must be valid");
    }
    return errors;
  }),
  isInvalid: Ember.computed('errors', function(){
    if(this.get('errors').length === 0) {
      return false;
    } else {
      return true;
    }
  }),
  hasErrors: Ember.computed('errors', function(){
    if(this.get('errors').length === 0){
      return false;
    } else {
      return true;
    }
  }),
  isValid: Ember.computed('isInvalid', function(){
    return !this.get('isInvalid');
  })
});
