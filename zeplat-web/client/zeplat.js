Session.setDefault('signvis',false);
Session.setDefault('loginvis',false);

Template.login.helpers({
	showForm:function(){
		var show = Session.get('loginvis');
		if(show === true){
			return true;
		}
		else{
		 	return false;
		}
	}
})

Template.login.destroyed = function(){
	Session.set('loginvis',false);
}

Template.body.events({

	'click #button2': function (e) {
        e.preventDefault();
        $( "#button2" ).animate({height: 200}); 
        Session.set("loginvis",true);
    },

    'click #button1': function (e) {
        e.preventDefault();
        $( "#button1" ).animate({height: 200});
        Session.set("signvis",true);
    }
});


Template.login.events({

	
	'submit #login-form' : function(e, t){
		e.preventDefault();

		var trimInput = function(val) {
			return val.replace(/^\s*|\s*$/g, "");
		}
		var isValidPassword = function(val) {
			if (val.length > 6){
				return true; 
			}
			else{
				return false;
			}
		}
		var email = t.find('#login-email').value, password = t.find('#login-password').value;
		email = trimInput(email); 

		if (isValidPassword(password)) {
		 
			Meteor.loginWithPassword(email, password, function(err){
				if (err){
					// The user might not have been found, or their passwword
					// could be incorrect. Inform the user that their
					// login attempt has failed. else
				}
				else{
					// The user has been logged in.
				}
			});
		}
		else {

			Session.set('displayMessage', 'Error &amp; Too short.')
		}

	 return false; 
	}		
});

Template.signup.helpers({
	showForm:function(){
		var show = Session.get('signvis');
		if(show === true){
			return true;
		}
		else{
		 	return false;
		}
	}
})

Template.signup.destroyed = function(){
  Session.set('signvis',false)
}


Template.signup.events({

	'submit #register-form' : function(e, t) {
	    e.preventDefault();

	  	var trimInput = function(val) {
			return val.replace(/^\s*|\s*$/g, "");
		}
		var isValidPassword = function(val) {
			if (val.length > 6)
				return true; 
			else
				return false;
		}

	    var email = t.find('#account-email').value, password = t.find('#account-password').value;
	    email = trimInput(email); 

		if (isValidPassword(password)) {

		    Accounts.createUser({email: email, password : password}, function(err){
			    if (err) {
					// Inform the user that account creation failed
				} 
				else {
					// Success. Account has been created and the user
					// has logged in successfully. 
				}

			});
		}
		else {

			Session.set('displayMessage', 'Error &amp; Too short.')
		}
	    return false;
	}
});

Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Meteor.autorun(function() {
    // Whenever this session variable changes, run this function.
    var message = Session.get('displayMessage');
    if (message) {
		var stringArray = message.split('&amp;');
		ui.notify(stringArray[0], stringArray[1])
		.effect('slide')
		.closable();

		Session.set('displayMessage', null);
	}
});


