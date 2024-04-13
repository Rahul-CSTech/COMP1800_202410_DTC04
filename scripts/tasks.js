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

    if (user) { // User is signed in.
        
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

                        // Date in each task formateed into a readable string
                        let taskdate = new Date(tasktime);
                        dateString = taskdate.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })

                        // code to make a unique banner element for each day which has at least one task
                        if (buffer_tasktime != dateString) {
                            // banner inserted into the DOM
                            make_banner(dateString);
                            buffer_tasktime = dateString
                        }
                        // cloned task objects populated with data from database  and append to DOM  
                        makeTaskCard(tasktime, doc, tasksRef);
                    })
                });
                // The date in the url is used to scroll down to the corresponding banner
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

/** Delete task from the firebase
 * @param {string} indentity - The ID of a task
 * @param {string} refer - The reference to the document in firebase
 * @return {void} - Only removes data from database
 */
function deleteTask(identity, refer) {
    refer.doc(identity).delete().then(() => {
        console.log(`${identity} deleted`)
    }).catch(
        (error) => { console.error("Error removing the document.", error) 
    })
}

/** Converts timestamp to formatted date string
 * @param {string} - String representing the task timestamp
 * @return {string} - String in yyy-mm-dd format
 */
function stampToDate(datestamp) {
    let stampdate = new Date(datestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    })
    return stampdate
}

/** Converts timestamp to hh:mm format time
 * @param {string} timestamp - String representing the task timestamp
 * @returns {string} - Time in hh:mm format
 */
function stampToTime(timestamp) {
    timestamp = new Date(timestamp)
    let stamptime = timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    return stamptime
}

/** Makes new DOM elements which represent tasks as saved in database
 * @param {string} tasktime - Timestamp representing time of a task
 * @param {object} doc - Object refering to the database collection
 * @param {object} tasksRef - Object pointing to the specific document in firebase
 * @returns {void} - Only manipulates DOM
 */
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

    // Add event listener to 'edit' button which redirects to task_new page with id of a task
    dropdownElement.querySelector("#editButton").addEventListener("click", () => {
        window.location.href = "task_new.html?taskId=" + doc.id + "&taskTime=" + taskTime
    }
    )

    // insert dropdown menu in each element
    newcard.querySelector("#firstRow").appendChild(dropdownElement);
    newcard.querySelector("#taskTodayName").innerHTML = taskName;
    newcard.querySelector("#taskTodayInfo").innerHTML = taskInfo;

    newcard.querySelector("#taskTodayTime").innerHTML = stampToTime(taskTime);
    // task prototype object inserted into the DOM
    document.getElementById("todayTaskList").appendChild(newcard);
}

/** Helper function to make_banner to convert date into ddmmyyy format 
 * @param {string} timestamp - String representing task time
 * @returns {string} - Formatted string
 */
function stampToBannerDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adjust for 0-based month index
    const year = date.getFullYear();
    ddmmyyString = day.toString() + month.toString() + year.toString()
    return ddmmyyString
}
/** Creates a 'banner' DOM object and inserts it into HTML
 * @param {string} timeinput - String representing time to be inserted into banner
 * @return {void} - Only manipulates DOM
 */
function make_banner(timeinput) {
    let today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })
    let thedate = new Date(timeinput).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    // replace the date with 'today' if the date matches with that on the banner
    if (today === thedate) timeinput = "Today"
    let newBanner = bannerprototype.cloneNode(true);
    newBanner.id = stampToBannerDate(timeinput)
    newBanner.querySelector("time").innerText = timeinput;
    document.getElementById("todayTaskList").appendChild(newBanner);
}

/** Scrolls the page down to the date as passed into the string
 * @param {string} seekString - String representing the ID of a banner
 * @return {void} - Only scrolls the page
 */
function ScrollToText(seekString) {
    const timeElement = document.getElementById(seekString)
    timeElement.scrollIntoView({ behavior: "smooth" });
}

