// Sign In Page

document.getElementById("login").addEventListener("click", () => {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var signinSuccess = false
    // Authenticate user
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Logged in with user:", user.uid)
            signinSuccess = true
            // ...
        })
        .catch((error) => {
            // Error Handling for Sign In
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/user-not-found") {
                document.getElementById("email").classList.remove("border-2", "border-red-500")
                document.getElementById("password").classList.remove("border-2", "border-red-500")
                document.getElementById("password_label").classList.remove("pb-2")
                document.getElementById("email").classList.add("border-2", "border-red-500")
                document.getElementById("email_label").classList.add("pb-2")
                document.getElementById("email_label").innerHTML="Email does not exist."
                console.log(errorMessage)
            }
            // add and remove HTML elements when signin failed to display error
            if (errorCode == "auth/wrong-password") {
                document.getElementById("email").classList.remove("border-2", "border-red-500")
                document.getElementById("password").classList.remove("border-2", "border-red-500")
                document.getElementById("email_label").classList.remove("pb-2")
                document.getElementById("password").classList.add("border-2", "border-red-500")
                document.getElementById("password_label").classList.add("pb-2")
                document.getElementById("password_label").innerHTML="Incorrect password."
                console.log(errorMessage)
            }

        })
        .then (() => {
            // Redirect on succesful sign in
            if (signinSuccess == true)
                window.location.href="main.html"
        });
})