firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
       
        // User is signed in.
        function makeCard() {
           
            db.collection("users").doc(user.uid).collection("tasks").get()
                .then((querySnapshot) => {

                    if (querySnapshot.empty != true) {
                        let cardprototype = document.getElementById("taskToday").cloneNode(true);
                        document.getElementById("taskToday").remove();
                        console.log(querySnapshot)
                        console.log(querySnapshot.size)

                        querySnapshot.forEach((doc) => {

                            var newcard = cardprototype.cloneNode(true);
                            
                            var taskTime = doc.data().taskTime
                            var taskDate = doc.data().taskDate
                            var taskInfo = doc.data().taskInfo
                            var taskName = doc.data().taskName
                            newcard.id = taskDate

                            newcard.querySelector("#taskTodayName").innerHTML = taskName;
                            newcard.querySelector("#taskTodayInfo").innerHTML = taskInfo;
                            newcard.querySelector("#taskTodayDate").innerHTML = taskDate;
                            newcard.querySelector("#taskTodayTime").innerHTML = taskTime;
                            document.getElementById("todayTaskList").appendChild(newcard);
                        });
                        // document.getElementById("taskToday").remove();
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

