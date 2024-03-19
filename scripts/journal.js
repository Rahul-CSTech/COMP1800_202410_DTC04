firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        function readNote() {
            let cardTemplate = document.getElementById("note_template")
        
            db.collection("users").doc(user.uid).collection("notes").orderBy("date").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var title = doc.data().title
                        var date = doc.data().date
                        var detail = doc.data().note
                        let newcard = document.importNode(cardTemplate.content, true)
                        newcard.getElementById("display_bg").classList.add("bg-submissive")
                        newcard.getElementById("display_title").innerHTML = title
                        newcard.getElementById("display_date").innerHTML = date
                        newcard.getElementById("display_note").innerHTML = detail
                        newcard.querySelector('a').href = "journal_edit.html?docID="+doc.id
        
                        document.getElementById("note_card").appendChild(newcard)
                    })
                })
        }

        
        readNote();
    } else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
});