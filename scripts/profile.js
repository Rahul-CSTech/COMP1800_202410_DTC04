firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        function getUserName() {
          db.collection("users").doc(user.uid).get()
          .then((userDoc) => {
              var userName = userDoc.data().user;
              document.getElementById("user").innerHTML = userName;
          })
        }

        function getEmail() {
            db.collection("users").doc(user.uid).get()
            .then((userDoc) => {
                var userName = userDoc.data().email;
                document.getElementById("email").innerHTML = userName;
            })
          }

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

function save_user() {
    note = db.collection("users").doc(firebase.auth().currentUser.uid)

    note.update({
        user: document.getElementById("user_edit").value,
    })
    .then(() => {
        location.reload()
    })
    
}

function edit_profile() {
    $('#user').toggle()
    $('#user_edit').toggle()
    $('#save_buttons').toggle()
    $('#edit_buttons').toggle()
}