dateNow = new Date().toISOString();
console.log(dateNow);
let dateControl = document.querySelector('input[id="taskDate"]')
dateControl.value = dateNow.substring(0, 10)

let timeValue = document.querySelector('input[id="taskTime"]')
console.log('time is', timeValue.value)


firebase.auth().onAuthStateChanged(function(user)  {
    if (user) {

    function saveTask(event) {
       task = db.collection("users").doc(firebase.auth().currentUser.uid).collection('tasks')
       task.add({
        taskName: document.getElementById("taskName").value,
        taskDate: document.getElementById("taskDate").value,
        taskTime: document.getElementById("taskTime").value,
        taskInfo: document.getElementById("taskInfo").value,
       
    }) 
        event.preventDefault();
    }

    try {
        document.getElementById("save").addEventListener("click", saveTask);
        }
     catch(TypeError) {
        console.log("Save button type error")
    }

} 

});
