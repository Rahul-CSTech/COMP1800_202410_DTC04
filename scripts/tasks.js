firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        // Reference to the tasks collection

        var tasksRef = db.collection("users").doc(user.uid).collection("tasks")
        // User is signed in.
        function makeCard() {

            tasksRef.orderBy("taskTimes", "asc").get()
                .then((querySnapshot) => {

                    if (querySnapshot.empty != true) {
                        let cardprototype = document.getElementById("taskToday").cloneNode(true);
                        document.getElementById("taskToday").remove();
                        console.log(querySnapshot)
                        console.log(querySnapshot.size)

                        let addDelRow = document.getElementById("optionsRow").cloneNode(true)
                        
                        querySnapshot.forEach((doc) => {

                            

                            doc.data().taskTimes.forEach((tasktime) => {
                            var newcard = cardprototype.cloneNode(true);


                            var taskTime = tasktime
                           
                            var taskInfo = doc.data().taskInfo
                            var taskName = doc.data().taskName
                            newcard.id = doc.id
                            var row = addDelRow.cloneNode(true);
                            newcard.appendChild(row);
                            newcard.addEventListener("click", () => {
                                row.classList.toggle("hidden")
                                newcard.classList.toggle("pb-0")
                            });
                            newcard.querySelector("#deleteButton").addEventListener("click", () => {
                                newcard.remove();
                                deleteTask(doc.id, tasksRef);
                            })
                            newcard.querySelector("#editButton").addEventListener("click", () => {
                                
                                    window.location.href = "task_new.html?taskId="+doc.id
                                    }
                            )

                            newcard.querySelector("#taskTodayName").innerHTML = taskName;
                            newcard.querySelector("#taskTodayInfo").innerHTML = taskInfo;
                            newcard.querySelector("#taskTodayDate").innerHTML = stampToDate(tasktime);
                            newcard.querySelector("#taskTodayTime").innerHTML = stampToTime(taskTime);
                            document.getElementById("todayTaskList").appendChild(newcard);
                         }) });
                 
                    }

                }
                )
        }

        makeCard();
        // document.getElementById("todayTaskList").appendChild(cardprototype);
    }

    else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
});

function deleteTask(identity, tasksRef) {
    tasksRef.doc(identity).delete().then(() => {
        console.log(`${identity} deleted`)
    }).catch((error) => { console.error("Error removing the document.", error) })
}


function stampToDate(timestamp ){
    timestamp = new Date(timestamp)
    var stampdate = timestamp.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
      return stampdate
}

function stampToTime(timestamp) {
    timestamp = new Date(timestamp)
    var stamptime = timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

    return stamptime

}