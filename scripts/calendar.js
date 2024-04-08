
firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        var tasksRef = db.collection("users").doc(user.uid).collection("tasks")

        tasksRef.orderBy("taskTimes", "asc").get()
            .then((querySnapshot) => {

                let taskTimeArray = []
                if (querySnapshot) {


                    querySnapshot.forEach((doc) => {

                        doc.data().taskTimes.forEach((tasktime) => {

                            const newel = stampToDate(tasktime)
                            taskTimeArray.push(newel)
                        })
                    })
                } makeCal(taskTimeArray);

            }
            )
    }
})

function stampToDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adjust for 0-based month index
    const year = date.getFullYear();
    dateString = day.toString() + month.toString() + year.toString()
    return dateString
}



function makeCal(meArray) {

    const daysTag = document.querySelector(".days"),
        currentDate = document.querySelector(".current-date"),
        prevNextIcon = document.querySelectorAll(".icons span");

    // getting new date, current year and month
    let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

    // storing full name of all months in array
    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    function renderCalendar() {
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
            lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
            lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
            lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            // creating li of all days of current month
            // adding active class to li if the current day, month, and year matched

            let todaystring = i.toString() + (currMonth + 1).toString() + currYear.toString()
            console.log("this is todaystring", todaystring)
            let isToday = ""
            let clickScript = ""
            if (i === date.getDate() && currMonth === new Date().getMonth()
                && currYear === new Date().getFullYear())
                liTag += `<li class="active"}">${i}</li>`;

            // adding 'scheduled' class to dates which exist in database as tasks and making the element hyperlinks to tasks page
            else
                if (meArray.includes(todaystring)) {
                    liTag += `<li class="scheduled" onclick="
                    parent.window.location.href='../tasks.html?datestring=${todaystring}'">${i}</li>`;
                }
                else
                    liTag += `<li class=""}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        }
        currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
        daysTag.innerHTML = liTag;
    }
    renderCalendar();

    prevNextIcon.forEach(icon => { // getting prev and next icons
        icon.addEventListener("click", () => { // adding click event on both icons
            // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

            if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
                // creating a new date of current year & month and pass it as date value
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear(); // updating current year with new date year
                currMonth = date.getMonth(); // updating current month with new date month
            } else {
                date = new Date(); // pass the current date as date value
            }
            renderCalendar(); // calling renderCalendar function
        });
    });
}