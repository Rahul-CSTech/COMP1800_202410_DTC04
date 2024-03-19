date_creation = document.getElementById("date").innerHTML = new Date().toLocaleString();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.

        async function addNote() {
            note = db.collection("users").doc(firebase.auth().currentUser.uid).collection('notes')

            note.add({
                title: document.getElementById("title").value,
                date: date_creation,
                note: document.getElementById("note").value
            }).then(() => {
                history.back()
            })
        }
        
        document.getElementById("save").addEventListener("click", () => {
            addNote()
        })
    } else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
  });

