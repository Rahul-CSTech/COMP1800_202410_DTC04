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


console.log((document.getElementById("taskDate").value).toString());
console.log((document.getElementById("taskTime").value).toString());


function combineDateTimeToTimestamp(dateString, timeString) {
    // Create a Date object from the date string
    const date = new Date(dateString);
  
    // Parse the time string (assuming format HH:MM:SS)
    const timeParts = timeString.split(':');
    const hours = timeParts[0];
    const minutes = timeParts[1];
   
  
    // Set the time components of the Date object
    date.setHours(hours, minutes);
    console.log("this is the date ", date)
    // Get the timestamp in milliseconds since epoch
    const timestamp = date.getTime();
    console.log(timestamp)
    console.log(typeof(timestamp))
    return timestamp;
  }
  

function editTask(taskCollRef){

     
    //  let taskTime = urlParams.get("taskTime")

     let today = new Date(parseInt(taskTime))

     console.log("the obtained time is" , today)
     // changing taskDate format to yyyy-mm-dd
     let formattedDate = today.toLocaleDateString().split(", ").reverse().join("-");

     // changing tasktime to hh:mm:ss format
     let formattedTime = today.toLocaleString("en-GB")
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
