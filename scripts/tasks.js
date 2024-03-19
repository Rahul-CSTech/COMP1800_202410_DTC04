firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        function readTask() {
            let cardTemplate = document.getElementById("todayTaskList")
        
            db.collection("users").doc(user.uid).collection("tasks").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var taskTime = doc.data.taskTime
                        var taskDate = doc.data().taskDate
                        var taskInfo = doc.data().taskInfo
                        var taskName = doc.data().taskName
                        let newcard = document.importNode(cardTemplate.content, true)
                        // newcard.getElementById("display_bg").classList.add("bg-submissive")
                        newcard.getElementById("taskTodayName").innerHTML = "test"
                        newcard.getElementById("taskTodayDate").innerHTML = taskDate
                        newcard.getElementById("taskTodayInfo").innerHTML = taskInfo
                        newcard.getElementById("taskTodayTime").innnerHTML = taskTime
                        // newcard.querySelector('a').href = "journal_edit.html?docID="+doc.id
        
                        document.getElementById("todayTaskList").appendChild(newcard)
                        console.log(newcard)
                    })
                })
        }
        readTask();
    } else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
});