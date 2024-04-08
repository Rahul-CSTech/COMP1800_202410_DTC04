dateNow = new Date().toISOString();
console.log(dateNow);
let dateControl = document.querySelector('input[id="taskDate"]')
dateControl.value = dateNow.substring(0, 10)

let timeValue = document.querySelector('input[id="taskTime"]')
console.log('time is', timeValue.value)

 // the url is searched for the taskId to be edited to check if a task is intended to be edited from the tasks.html page,
 let urlParams = new URLSearchParams(window.location.search);
 let taskId = urlParams.get("taskId");
 const taskTime = urlParams.get("taskTime")


firebase.auth().onAuthStateChanged(function(user)  {
    if (user) { 
       let taskCollRef = db.collection("users").doc(user.uid).collection('tasks')
        
       // if taskId exists, then the 'taskTime' parameter is retrived to populate the form
        if (taskId) {
            editTask(taskCollRef)
        } 
  
    // 
    function saveTask() {

         
        let dateString = document.getElementById("taskDate").value
        let timeString = document.getElementById("taskTime").value
        let taskTimeStamp = combineDateTimeToTimestamp(dateString, timeString)
        let newTaskName = document.getElementById("taskName").value;
        let newTaskInfo = document.getElementById("taskInfo").value;

        // if task is intended to be edited, the task information in the database is updated with new data 
        if (taskId){

            
                async function updateTask() {
                  try {
                    const docSnapshot = await taskCollRef.doc(taskId).get();
                    const taskData = docSnapshot.data();
                    console.log("this is taskTime", taskTime)
                    console.log("this is obtained time", taskTimeStamp, typeof(taskTimeStamp))
                    // Filter the taskTimes within the async function
                    const filteredArray = taskData.taskTimes.filter(task => task != taskTime);
                    filteredArray.push(taskTimeStamp)
                    console.log("this is filtered arrayafter push", filteredArray)
                    // Update the document with new data 
                    await taskCollRef.doc(taskId).update({
                      taskName: newTaskName,
                      taskTimes: filteredArray,
                      taskInfo: newTaskInfo,

                    })
                    .then(() => history.back())
              
                    // Navigate back after successful update
                  } catch (error) {
                    console.error("Error updating task:", error);}
                }
              
                updateTask();
                            
        }

        // new data is added if new information

        else {
    
            taskCollRef.add({
            taskName: newTaskName,
            taskTimes: [taskTimeStamp],
            taskInfo: newTaskInfo

        }).then(() => history.back())}          
    }

    document.getElementById("save").addEventListener("click", saveTask)
    }

})



function combineDateTimeToTimestamp(dateStr, timeStr) {
    // Create a Date object from the date string
    console.log(dateStr, timeStr)
   
    const combinedString = `${dateStr}T${timeStr}`;

// Create a Date object with time zone offset (-7 hours for GMT-7)
    const date = new Date(combinedString + "-07:00")
    const timestamp = date.getTime();

    // Get the timestamp in milliseconds since epoch
    console.log(timestamp)
    return timestamp;
  }
  

function editTask(taskCollRef){

     
    //  let taskTime = urlParams.get("taskTime")

     let today = new Date(parseInt(taskTime))

     // changing taskDate format to yyyy-mm-dd
     let formattedDate = today.toLocaleString("en-GB").split(", ")[0].split('/').reverse().join("-")
     console.log(formattedDate)
    // 

     // changing tasktime to hh:mm:ss format
     let formattedTime = today.toLocaleString("en-GB").split(", ")[1]
     console.log(formattedDate, formattedTime)
     
     document.getElementById("save").innerText = "Update";
     // function editTask() 

     taskCollRef.doc(taskId).get()
     .then((doc) =>  doc.data())
     .then( (taskData) => {

     document.getElementById("taskName").value = taskData.taskName; 
     document.getElementById("taskDate").value = formattedDate;
     document.getElementById("taskTime").value = formattedTime;
     document.getElementById("taskInfo").value = taskData.taskInfo })
}
