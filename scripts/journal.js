async function addNote() {
    note = await db.collection("journal")
    note.add({
        title: document.getElementById("title").value,
        date: document.getElementById("date").value,
        note: document.getElementById("note").value,
    })
}

function readNote() {
    let cardTemplate = document.getElementById("note_template")


    db.collection("journal").get()
        .then(notes => {
            notes.forEach(doc => {
                var title = doc.data().title
                var date = doc.data().date
                var detail = doc.data().note
                let newcard = document.importNode(cardTemplate.content, true)
                
                newcard.getElementById("display_bg").classList.add("bg-submissive")
                newcard.getElementById("display_title").innerHTML = title
                newcard.getElementById("display_date").innerHTML = date
                newcard.getElementById("display_note").innerHTML = detail

                document.getElementById("note_card").appendChild(newcard)
            })
        })
}

try {
    readNote()
} catch(ReferenceError) {
    console.log("Read note reference error.")
}
    

try {
    document.getElementById("save").addEventListener("click", () => {
        addNote()
    })
} catch(TypeError) {
    console.log("Save button type error")
}