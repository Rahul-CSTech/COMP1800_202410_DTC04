firebase.auth().onAuthStateChanged(function(user) {
  
    if (user) {
        // User is signed in.
        function makeCard() {
           
            
            db.collection("users").doc(user.uid).collection("tasks").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                    if (doc)   {
                    var newcard= document.getElementById("taskToday").cloneNode(true)
                    
                    var taskTime = doc.data().taskTime
                    var taskDate = doc.data().taskDate
                    var taskInfo = doc.data().taskInfo
                    var taskName = doc.data().taskName
                    
                    newcard.id = taskName
                    newcard.querySelector("#taskTodayName").innerHTML = taskName;
                    newcard.querySelector("#taskTodayInfo").innerHTML = taskInfo;
                    newcard.querySelector("#taskTodayDate").innerHTML = taskDate; 
                    newcard.querySelector("#taskTodayTime").innerHTML = taskTime;
                   
                    document.getElementById("todayTaskList").appendChild(newcard);
                    } 
                    
                    // else
                    // {    
                    //     console.log("nothing here")
                    // }
                        
                        // newcard.querySelector('a').href = "journal_edit.html?docID="+doc.id
                        
                    })
                })
        }
        makeCard();
        // var thislist = document.getElementById("taskToday")
        //             thislist.style.visibility ="hidden";
    } else {
        // No user is signed in.
        console.log("No user is signed in.")
    }
});