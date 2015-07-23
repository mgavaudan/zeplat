Router.route('/', {
	name: 'home',
    template: 'home'
});
Router.route('/user/:_id', {
	name: 'user',
    template: 'user'
});

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('home');
  }
  this.next();
};

var goToMain = function(pause) {
  if (Meteor.user()) {
    Router.go('user', {_id: Meteor.userId()});
  }
  this.next();
};

Router.onBeforeAction(mustBeSignedIn, {except: ['home']});
Router.onBeforeAction(goToMain, {only: ['home']});