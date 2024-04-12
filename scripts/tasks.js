//Make prototype object for task cards and banners to make task objects

let cardprototype = document.getElementById("taskToday").cloneNode(true);
let bannerprototype = document.getElementById("timeBanner").cloneNode(true);
let dropdownprototype = document.getElementById("threeDotButton").cloneNode(true);
let dropdownBoxprototype = document.getElementById("dropdownDots").cloneNode(true)

document.getElementById("timeBanner").remove()
// let addDelRow = document.getElementById("optionsRow").cloneNode(true)

// search URL for datestring from main page
let urlParams = new URLSearchParams(window.location.search);
let urlDate = urlParams.get("datestring");


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


                           
                        console.log("dateString", dateString)   
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
                if (urlDate) {
                    ScrollToText(urlDate);
                }
            } 
        }
        )
    }

    else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
});

// delete task from the document
function deleteTask(identity, refer) {
    refer.doc(identity).delete().then(() => {
        console.log(`${identity} deleted`)
    }).catch((error) => { console.error("Error removing the document.", error) })
}


function stampToDate(datestamp) {
   
    let stampdate = new Date(datestamp).toLocaleDateString("en-US", {
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
    let newcard = cardprototype.cloneNode(true);
    let taskTime = tasktime
    let taskInfo = doc.data().taskInfo
    let taskName = doc.data().taskName
    newcard.id = doc.id
    newcard.querySelector("#threeDotButton").remove()

    let dropdownElement = dropdownprototype.cloneNode(true)


    let button = dropdownElement.querySelector("#dropdownMenuIconHorizontalButton"); 
    let dropdownList = dropdownElement.querySelector("#dropdownDots"); 
    
    // Function to toggle visibility of the dropdown list
    function toggleDropdown() {
      if (dropdownList.classList.contains('hidden')) {
        dropdownList.classList.remove('hidden');
      } else {
        dropdownList.classList.add('hidden');
      }
    }  

    button.addEventListener('click', toggleDropdown);


    dropdownElement.querySelector("#deleteButton").addEventListener( 
        "click", () => {       
        newcard.remove();
        deleteTask(doc.id, tasksRef);
    })
    dropdownElement.querySelector("#editButton").addEventListener("click", () => {

        window.location.href = "task_new.html?taskId=" + doc.id + "&taskTime=" + taskTime
    }
    )

    // dropdownBoxElement.id = "dropdown" + doc.id
    newcard.querySelector("#firstRow").appendChild(dropdownElement);
    newcard.querySelector("#taskTodayName").innerHTML = taskName;
    newcard.querySelector("#taskTodayInfo").innerHTML = taskInfo;

    newcard.querySelector("#taskTodayTime").innerHTML = stampToTime(taskTime);
    // task prototype object inserted into the DOM
    document.getElementById("todayTaskList").appendChild(newcard);
}

// helper function to make_banner to convert date into ddmmyyy format 
function stampToBannerDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adjust for 0-based month index
    const year = date.getFullYear();
    ddmmyyString = day.toString() + month.toString() + year.toString()
    return ddmmyyString
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
   
    if (today === thedate) timeinput = "Today"
    let newBanner = bannerprototype.cloneNode(true);
    newBanner.id = stampToBannerDate(timeinput)
    newBanner.querySelector("time").innerText = timeinput;
    document.getElementById("todayTaskList").appendChild(newBanner);
}


function ScrollToText(seekString) {
 
    const timeElement = document.getElementById(seekString)
    timeElement.scrollIntoView({ behavior: "smooth" });
  }

