//Make prototype object for task cards and banners to make task objects

let cardprototype = document.getElementById("taskToday").cloneNode(true);
let bannerprototype = document.getElementById("timeBanner").cloneNode(true);
document.getElementById("timeBanner").remove()
let addDelRow = document.getElementById("optionsRow").cloneNode(true)

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
                
                
               // for time banner funcitonality which helps check if a a particular date is repeated among tasks
                let buffer_tasktime = 0
              
                 // data in querysnapshot looped for existing data
                querySnapshot.forEach((doc) => {
                    
                    doc.data().taskTimes.forEach((tasktime) => {


                        let taskdate = new Date(tasktime);
                        dateString = taskdate.toLocaleDateString("en-US",{ weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",})
                        
                            
                        if (buffer_tasktime != dateString)
                         {
                        // banner inserted into the DOM
                            make_banner(dateString);
                            buffer_tasktime = dateString
                         }
                        // cloned task objects populated with data from database  and append to DOM  
                        makeTaskCard(tasktime, doc,tasksRef);

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
    newcard.querySelector("#taskTodayDate").innerHTML = stampToDate(tasktime) + "at";
    newcard.querySelector("#taskTodayTime").innerHTML = stampToTime(taskTime);
    // task prototype object inserted into the DOM
    document.getElementById("todayTaskList").appendChild(newcard);

}


function make_banner(timeinput) {

    let today = new Date().toLocaleDateString("en-US",{ weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",})
    let thedate =  new Date(timeinput).toLocaleDateString("en-US",{ weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",})
    console.log(today)
    console.log(thedate)
    if (today === thedate) timeinput = "Today"
    let newBanner = bannerprototype.cloneNode(true);
    newBanner.querySelector("time").innerText = timeinput;
    document.getElementById("todayTaskList").appendChild(newBanner);
}