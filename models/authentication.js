import setScreen from "../index.js";
// import todoScreen from "../views/todo.js";
// import todoModel from "./trangtodolist.js";

const authenticationModel = {
	saveUser: async function (user) {
		const email = user.email;
		const password = user.password;
		const displayName = user.displayName;

		await firebase.auth().createUserWithEmailAndPassword(email, password);
		firebase.auth().currentUser.sendEmailVerification();
		firebase.auth().currentUser.updateProfile({
			displayName: displayName,
		});
	},
};

firebase.auth().onAuthStateChanged(function (user) {
	if (user !== null) {
		if (user.emailVerified) {
			console.log(user.uid);
			// redirect to todo screen
			function Redirect() {
				window.location = "../views/todo.html";
			}
			Redirect();
		} else {
			//Step 1: show email verified error
			alert("Please confirm your email!");
			//Step 2: sign out
			firebase.auth().signOut();
		}
	} else {
		// no login user
	}
});

export default authenticationModel;
