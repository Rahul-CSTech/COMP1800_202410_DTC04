//Make prototype object for task cards and banners to make task objects
let cardprototype = document.getElementById("taskToday").cloneNode(true);
let bannerprototype = document.getElementById("timeBanner");
let addDelRow = document.getElementById("optionsRow").cloneNode(true)

// Heyyyyyyyyyyyy
//firebase authorization
firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        // User is signed in.
        // Reference to the tasks collection

        let tasksRef = db.collection("users").doc(user.uid).collection("tasks")

        // arrange data in asceding order according to time
        tasksRef.orderBy("taskTimes", "asc").get().then((querySnapshot) => {

            if (querySnapshot.empty != true) {
               
                // remove placeholder if data exists in database
                document.getElementById("taskToday").remove();
                // data in querysnapshot looped for existing data
                querySnapshot.forEach((doc) => {
                    doc.data().taskTimes.forEach((tasktime) => {
                        // cloned task objects populated with data from database  and append to DOM             
                        makeTaskCard(tasktime, doc,tasksRef);

                        // document.getElementById("todayTaskList").appendChild(newcard);

                    })
                });
            }
        }
        )

    }

    else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
});

function deleteTask(identity, refer) {
    refer.doc(identity).delete().then(() => {
        console.log(`${identity} deleted`)
    }).catch((error) => { console.error("Error removing the document.", error) })
}


function stampToDate(timestamp) {
    timestamp = new Date(timestamp)
    let stampdate = timestamp.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    })
    return stampdate
}

function stampToTime(timestamp) {
    timestamp = new Date(timestamp)
    let stamptime = timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return stamptime

}

function makeTaskCard(tasktime, doc, tasksRef) {
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

        window.location.href = "task_new.html?taskId=" + doc.id + "&taskTime=" + taskTime
    }
    )

    newcard.querySelector("#taskTodayName").innerHTML = taskName;
    newcard.querySelector("#taskTodayInfo").innerHTML = taskInfo;
    newcard.querySelector("#taskTodayDate").innerHTML = stampToDate(tasktime);
    newcard.querySelector("#taskTodayTime").innerHTML = stampToTime(taskTime);
    // task prototype object inserted into the DOM
    document.getElementById("todayTaskList").appendChild(newcard);

}