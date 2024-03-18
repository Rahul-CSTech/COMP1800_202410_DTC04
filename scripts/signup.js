document.getElementById("signup").addEventListener("click", () => {
    var htmlEmail = document.getElementById('email').value
    var htmlUser = document.getElementById('username').value
    var htmlPass = document.getElementById("password").value
    let signupSuccess = false

    if (htmlUser.length == 0){
        document.getElementById("email").classList.remove("border-2", "border-red-500")
        document.getElementById("username").classList.remove("border-2", "border-red-500")
        document.getElementById("password").classList.remove("border-2", "border-red-500")
        document.getElementById("password_label").classList.remove("mb-2")
        document.getElementById("email_label").classList.remove("mb-2")
        document.getElementById("username").classList.add("border-2", "border-red-500")
        document.getElementById("username_label").classList.add("mb-2")
        document.getElementById("username_label").innerHTML="Enter a username."
        console.log("Nothing was entered for username.")
        return
    }

    firebase.auth().createUserWithEmailAndPassword(htmlEmail, htmlPass)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user
            db.collection('users').doc(user.uid).set({
                email: htmlEmail,
                user: htmlUser,
            })
            .then (() => window.location.href = "main.html");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            if (errorCode == "auth/email-already-in-use") {
                document.getElementById("email").classList.remove("border-2", "border-red-500")
                document.getElementById("username").classList.remove("border-2", "border-red-500")
                document.getElementById("password").classList.remove("border-2", "border-red-500")
                document.getElementById("password_label").classList.remove("mb-2")
                document.getElementById("username_label").classList.remove("mb-2")
                document.getElementById("email").classList.add("border-2", "border-red-500")
                document.getElementById("email_label").classList.add("mb-2")
                document.getElementById("email_label").innerHTML="Email already in use."
                console.log(errorMessage)
            }
            if (errorCode == "auth/invalid-email") {
                document.getElementById("email").classList.remove("border-2", "border-red-500")
                document.getElementById("username").classList.remove("border-2", "border-red-500")
                document.getElementById("password").classList.remove("border-2", "border-red-500")
                document.getElementById("password_label").classList.remove("mb-2")
                document.getElementById("username_label").classList.remove("mb-2")
                document.getElementById("email").classList.add("border-2", "border-red-500")
                document.getElementById("email_label").classList.add("mb-2")
                document.getElementById("email_label").innerHTML="Enter an email."
                console.log(errorMessage)
            }
            if (errorCode == "auth/weak-password") {
                document.getElementById("email").classList.remove("border-2", "border-red-500")
                document.getElementById("username").classList.remove("border-2", "border-red-500")
                document.getElementById("password").classList.remove("border-2", "border-red-500")
                document.getElementById("email_label").classList.remove("mb-2")
                document.getElementById("username_label").classList.remove("mb-2")
                document.getElementById("password").classList.add("border-2", "border-red-500")
                document.getElementById("password_label").classList.add("mb-2")
                document.getElementById("password_label").innerHTML="Password must be longer than 5 characters."
                console.log(errorMessage)
            }
        // ..
        })
})