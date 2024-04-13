// Journal New Note Page

date_creation = document.getElementById("date").innerHTML = new Date().toLocaleString();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        /** Access users collection to add 'note' into HTML Page
         * @returns {void} - Only manipulates DOM
         */
        async function addNote() {
            note = db.collection("users").doc(firebase.auth().currentUser.uid).collection('notes')
            // add 'notes' element to the page
            note.add({
                title: document.getElementById("title").value,
                date: date_creation,
                note: document.getElementById("note").value
            }).then(() => {
                history.back()
            })
        } 
        // Checks for on click event
        document.getElementById("save").addEventListener("click", () => {
            addNote()
        })
    } else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
  });

