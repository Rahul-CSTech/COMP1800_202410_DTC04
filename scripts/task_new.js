// The current time is inserted into the time input form field as Placeholder value
dateNow = new Date().toISOString();
let dateControl = document.querySelector('input[id="taskDate"]')
dateControl.value = dateNow.substring(0, 10)
// The 
let timeValue = document.querySelector('input[id="taskTime"]')

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
    /** Reads values from fields in the HTML document and add them to database
     * @returns {void}
     */
    function saveTask() {

        let dateString = document.getElementById("taskDate").value
        let timeString = document.getElementById("taskTime").value
        let taskTimeStamp = combineDateTimeToTimestamp(dateString, timeString)
        let newTaskName = document.getElementById("taskName").value;
        let newTaskInfo = document.getElementById("taskInfo").value;
        // if task is intended to be edited, the task information in the database is updated with new data 
        if (taskId){
                /** Updates 'tasks' document in firebase
                 * @returns {none} - Only updates database
                 */
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
                    // Navigate to previous page
                    .then(() => history.back())
              
                    // Navigate back after successful update
                  } catch (error) {
                    console.error("Error updating task:", error);}
                }
                updateTask();
              }
        // new data is added if the information does not  
        else {
            taskCollRef.add({
            taskName: newTaskName,
            taskTimes: [taskTimeStamp],
            taskInfo: newTaskInfo
          // navigate back
        }).then(() => history.back())}          
    }
    document.getElementById("save").addEventListener("click", saveTask)
    }
})
/** Converts date and time strings into Unix Epoch timestamp
 * @param {string} dateStr - represents date, month and year
 * @param {string} timeStr - represents time
 * @returns {string} - timestamp is returned as string
 */
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
  
/** Populates the editted task element again qith a query from the database
 * @param {object} taskCollRef - reference to the document in the database
 * @returns {void} - Only manipulates DOM
 */
function editTask(taskCollRef){     
     let today = new Date(parseInt(taskTime))

     // changing taskDate format to yyyy-mm-dd
     let formattedDate = today.toLocaleString("en-GB").split(", ")[0].split('/').reverse().join("-")
     console.log(formattedDate)
    // 

     // changing tasktime to hh:mm:ss format
     let formattedTime = today.toLocaleString("en-GB").split(", ")[1]
     console.log(formattedDate, formattedTime)

    // The 'delete' button is changed into 'Update' button when as task is to be edited
     document.getElementById("save").innerText = "Update";

    // Database queried for data of a particular task using taskId
     taskCollRef.doc(taskId).get()
     .then((doc) =>  doc.data())
     .then( (taskData) => {
    // the fields are populated with details of the task to be edited
     document.getElementById("taskName").value = taskData.taskName; 
     document.getElementById("taskDate").value = formattedDate;
     document.getElementById("taskTime").value = formattedTime;
     document.getElementById("taskInfo").value = taskData.taskInfo 
    })
}
