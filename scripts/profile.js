firebase.auth().onAuthStateChanged(function(user) {
    if (user) { // User is signed in.

        /** Obtain username data from user data in firebase and add it to 'user' field in HTML page
         * @returns {void}
         */
        function getUserName() {
          db.collection("users").doc(user.uid).get()
          .then((userDoc) => {
              var userName = userDoc.data().user;
              document.getElementById("user").innerHTML = userName;
          })
        }
        
        /** Obtain email data from user data in firebase and add it to 'email' field in HTML page
         * @returns {void}
         */
        function getEmail() {
            db.collection("users").doc(user.uid).get()
            .then((userDoc) => {
                var userName = userDoc.data().email;
                document.getElementById("email").innerHTML = userName;
            })
          }

        // Add event listener to 'logout' button to sign out from the app and the firebase
        document.getElementById("logout").onclick = function () {
            firebase.auth().signOut().then(() => {
                console.log("Logging out.")
                location.href = "/index.html";
            }).catch((error) => {
                console.log(error)
            });
        };

        getEmail();
        getUserName();
    } else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
  });

/** Adds data to firebase for new user
 * @returns {void} - only adds data to firebase
 */
function save_user() {
    note = db.collection("users").doc(firebase.auth().currentUser.uid)

    note.update({
        user: document.getElementById("user_edit").value,
    })
    .then(() => {
        location.reload()
    })
    
}
/** Hides the placeholder element when elements are populated with data from firebase
 * @returns {void} - Only manipulates DOM
 */
function edit_profile() {
    $('#user').toggle()
    $('#user_edit').toggle()
    $('#save_buttons').toggle()
    $('#edit_buttons').toggle()
}