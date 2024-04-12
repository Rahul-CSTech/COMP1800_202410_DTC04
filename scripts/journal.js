// Journal Main Page

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        function readNote() {

            // DOM object copied to make fresh prototypes for each document in 'notes'
            let cardTemplate = document.getElementById("note_template")
        
            // Accesses user's notes, sorts by date and displays to journal
            db.collection("users").doc(user.uid).collection("notes").orderBy("date").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        // Data from each document in 'notes' copied to be added into fresh 'note' element object prototype 
                        var title = doc.data().title
                        var date = doc.data().date
                        var detail = doc.data().note
                        
                        //
                        let newcard = document.importNode(cardTemplate.content, true)

                        // Data copied into fresh 'note' element prototype
                        newcard.getElementById("display_bg").classList.add("bg-submissive")
                        newcard.getElementById("display_title").innerHTML = title
                        newcard.getElementById("display_date").innerHTML = date
                        newcard.getElementById("display_note").innerHTML = detail
                        // Add redirect link to the prototype
                        newcard.querySelector('a').href = "journal_edit.html?docID="+doc.id
                        // Append the prototype into the DOM
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

/** Toggle 'infoheader' to hide when page is populated with new 'note' html objects
 * @returns {void} - Only manipulates DOM
 */
function hide_info() {
    $('#infoHeader').toggle()
    console.log()
}