import Ember from 'ember';

export default Ember.Object.extend({
    greet(){
        return `Hi, My name is ${this.get("firstName")} ${this.get("lastName")}. You can call me ${this.get("nickName")}`;
      },
    isOld: Ember.computed.gt("age",30),
    wroteRuby: Ember.computed.equal("authorOf","Ruby"),
   addConference: function(conference){
       this.conferences.push(conference);
   },
     keyNoteConferences: Ember.computed("conferences.@each.keyNote",function(){
       var name = this.firstName+' '+this.lastName;
       return this.conferences.filterBy('keyNote',name);
  }),
     conferenceNames: Ember.computed('conferences','conferences.@each.name',function() {
        return this.get('conferences').mapBy('name');
     }),

     conferenceTotal: Ember.computed.alias('conferences.length'),

     itinerary: Ember.computed("nickName","conferenceTotal",function(){
        return `${this.get('nickName')} is speaking at ${this.get('conferenceTotal')} conferences`;
     }),

     hasValidEmail: Ember.computed.match('email',/^.+@.+\..+$/),
     hasFirstName: Ember.computed.notEmpty('firstName'),

     hasLastName: Ember.computed.notEmpty('lastName'),

     hasAge: Ember.computed.notEmpty('age'),

     isInvalid: Ember.computed.not('isValid'),

     hasErrors: Ember.computed('errors', function(){
       return this.get('errors').length > 0;
     }),

     errors: Ember.computed('hasValidEmail', 'hasFirstName', 'hasLastName', 'hasAge', function(){
       let errors = [];
       if (!this.get('hasValidEmail')) {errors.push("email must be valid");}
       if (!this.get('hasFirstName')) {errors.push("firstName cannot be blank");}
       if (!this.get('hasLastName')) {errors.push("lastName cannot be blank");}
       if (!this.get('hasAge')) {errors.push("age cannot be blank");}
       return errors;
     }),

     isValid: Ember.computed.and("hasLastName", "hasFirstName", "hasValidEmail", "hasAge"),

});

