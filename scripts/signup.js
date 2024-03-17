var signupSuccess = false

document.getElementById("signup").addEventListener("click", () => {
    var htmlEmail = document.getElementById('email').value
    var htmlUser = document.getElementById('username').value.toLowerCase();
    var htmlPass = document.getElementById("password").value

    if (htmlUser.length == 0){
        document.getElementById("email").classList.remove("border-2", "border-red-500")
        document.getElementById("username").classList.remove("border-2", "border-red-500")
        document.getElementById("password").classList.remove("border-2", "border-red-500")
        document.getElementById("username").classList.add("border-2", "border-red-500")
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
            pass: htmlPass
        })
        console.log("New user UID:", user.uid)
        signupSuccess = true
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    if (errorCode == "auth/invalid-email") {
        document.getElementById("email").classList.remove("border-2", "border-red-500")
        document.getElementById("username").classList.remove("border-2", "border-red-500")
        document.getElementById("password").classList.remove("border-2", "border-red-500")
        document.getElementById("email").classList.add("border-2", "border-red-500")
        console.log(errorMessage)
    }
    if (errorCode == "auth/weak-password") {
        document.getElementById("email").classList.remove("border-2", "border-red-500")
        document.getElementById("username").classList.remove("border-2", "border-red-500")
        document.getElementById("password").classList.remove("border-2", "border-red-500")
        document.getElementById("password").classList.add("border-2", "border-red-500")
        console.log(errorMessage)
    }
    // ..
    })
    console.log(String(signupSuccess))
    if (signupSuccess == true)
        window.location.href = "/main.html"
})



