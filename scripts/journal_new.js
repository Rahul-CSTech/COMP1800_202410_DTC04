date_creation = document.getElementById("date").innerHTML = new Date().toLocaleDateString();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.

        function addNote() {
            note = db.collection("users").doc(firebase.auth().currentUser.uid).collection('notes')

            note.add({
                title: document.getElementById("title").value,
                date: date_creation,
                note: document.getElementById("note").value
            })
        }
        
        try {
            document.getElementById("save").addEventListener("click", () => {
                addNote()
            })
        } catch(TypeError) {
            console.log("Save button type error")
        }
    } else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
  });

