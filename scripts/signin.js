document.getElementById("login").addEventListener("click", () => {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var signinSuccess = false

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Logged in with user:", user.uid)
            signinSuccess = true
            // ...
        })
        .catch((error) => {
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
            if (errorCode == "auth/invalid-password") {
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
            if (signinSuccess == true)
                window.location.href="main.html"
        });
})