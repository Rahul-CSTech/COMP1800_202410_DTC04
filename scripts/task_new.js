dateNow = new Date().toISOString();
console.log(dateNow);
let dateControl = document.querySelector('input[id="taskDate"]')
dateControl.value = dateNow.substring(0, 10)

let timeValue = document.querySelector('input[id="taskTime"]')
console.log('time is', timeValue.value)


firebase.auth().onAuthStateChanged(function(user)  {
    if (user) { 
       var taskCollRef = db.collection("users").doc(user.uid).collection('tasks')
        
       // populate the fields in the page using the url 
        
        const urlParams = new URLSearchParams(window.location.search);
        const taskId = urlParams.get("taskId");
        
        if (taskId) {
        document.getElementById("save").innerText = "Update";
                         // function editTask() {
        taskCollRef.doc(taskId).get()
        .then((doc) =>  doc.data())
        .then( (taskData) => {
            
        document.getElementById("taskName").value = taskData.taskName; 
        document.getElementById("taskDate").value = taskData.taskDate;
        document.getElementById("taskTime").value = taskData.taskTime;
        document.getElementById("taskInfo").value = taskData.taskInfo })
        } 
        
         

    function saveTask() {
        if (taskId){
            taskCollRef.doc(taskId).set({
                taskName: document.getElementById("taskName").value,
                taskDate: document.getElementById("taskDate").value,
                taskTime: document.getElementById("taskTime").value,
                taskInfo: document.getElementById("taskInfo").value,
                }).then(() => history.back())
        }

        else {
        taskCollRef.add({
        taskName: document.getElementById("taskName").value,
        taskDate: document.getElementById("taskDate").value,
        taskTime: document.getElementById("taskTime").value,
        taskInfo: document.getElementById("taskInfo").value,
        }).then(() => history.back())}
        
    }
    document.getElementById("save").addEventListener("click", saveTask)
    }

} 

)
