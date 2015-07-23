//******************** BUTTONS *************************//

Session.setDefault('signvis',false);
Session.setDefault('loginvis',false);

Template.home.events({

	
	'click #button2': function (e) {
		if (!Session.get('loginvis')){
			$( "#button2" ).animate({height: 200}); 
		}
        
        Session.set("loginvis", true);
    },

    'click #button1': function (e) {
    	if (!Session.get('signvis')){
        	$( "#button1" ).animate({height: 200});
        }
        Session.set("signvis", true);
    }
});

//******************** LOGIN *************************//

Template.login.helpers({
	// decide wheter the form appears on the screen
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

Template.login.events({
	
	'submit #login_form' : function(e, t){

		console.log("form submitted");

		var trimInput = function(val) {
			return val.replace(/^\s*|\s*$/g, "");
		}

		var email = t.find('#email_login').value, 
			password = t.find('#password_login').value;

		// email = trimInput(email); 

		console.log(email);
		console.log(password);

		Meteor.loginWithPassword(email, password, function(err){
			if (Meteor.user()){
				console.log("failed login");
				console.log(err.reason);
			}
			else{
				console.log("Success login");
				Router.go('user', {_id: Meteor.userId()});
			}

			return;
		});
		

	 return false; 
	}		
});



//******************** SIGNUP *************************//

Template.signup.helpers({
	// decide wheter the form appears on the screen
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
  Session.set('signvis', false)
}


Template.signup.events({

	'submit #register_form' : function(e, t) {
	    
	    console.log("form submitted");

	  	var trimInput = function(val) {
			return val.replace(/^\s*|\s*$/g, "");
		}
		var isValidPassword = function(val) {
			if (val.length > 6)
				return true; 
			else
				return false;
		}

	    var email = t.find('#email_signup').value,
	    	password = t.find('#password_signup').value;

	    // email = trimInput(email); 

	    console.log(email);
		console.log(password);

		if (isValidPassword(password)) {

		    Accounts.createUser({email: email, password : password}, function(err){
			    if (err) {
					console.log("failed signup");
				} 
				else {
					console.log("Success signup");
					Router.go('user', {_id: Meteor.userId()});
				}

			});
		}
		else {

			Session.set('displayMessage', 'Error &amp; Too short.')
		}
	    return false;
	}
});



// Meteor.autorun(function() {
//     // Whenever this session variable changes, run this function.
//     var message = Session.get('displayMessage');
//     if (message) {
// 		var stringArray = message.split('&amp;');
// 		ui.notify(stringArray[0], stringArray[1])
// 		.effect('slide')
// 		.closable();

// 		Session.set('displayMessage', null);
// 	}
// });


