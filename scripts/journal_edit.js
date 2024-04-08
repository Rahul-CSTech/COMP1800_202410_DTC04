// Journal Note Edit Page

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        let params = new URL( window.location.href ); //get URL of search bar
        let ID = params.searchParams.get( "docID" ); //get value for key "id"
        console.log( ID );

        db.collection("users").doc(firebase.auth().currentUser.uid).collection("notes").doc(ID).get()
        .then( doc => {
            title = doc.data().title;
            date = doc.data().date;
            detail = doc.data().note;
            
            // only populate title, and image
            document.getElementById("title").value = title;
            document.getElementById("date").innerHTML = date;
            document.getElementById("note").value = detail;
        })
        
        try {
            // Checks for save click to update note
            document.getElementById("save").addEventListener("click", () => {
                note = db.collection("users").doc(firebase.auth().currentUser.uid).collection('notes').doc(ID)

                note.update({
                    title: document.getElementById("title").value,
                    note: document.getElementById("note").value
                })
                .then(() => {
                    history.back()
                })
            })
            document.getElementById("delete").addEventListener("click", () => {
                db.collection("users").doc(firebase.auth().currentUser.uid).collection('notes').doc(ID).delete()
                .then(() => {
                    history.back()
                })
            })
        } catch(TypeError) {
            console.log("Save button type error")
        }
    } else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
  });

