function logout() {
    firebase.auth().signOut().then(() => {
        console.log("logging out");
      }).catch((error) => {
        });
  }

// Motivaitional Quote API
const api_url ="https://api.quotable.io/quotes/random";

// function updateDateTime() {
//     // create a new `Date` object
//     const now = new Date();

//     // get the current date and time as a string
//     const currentDateTime = now.toLocaleString();

//     // update the `textContent` property of the `span` element with the `id` of `dateSpan`
//     document.getElementById('dateSpan').textContent = currentDateTime.substring(0,8);

// }
// setInterval(updateDateTime, 1000);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      // User is signed in.
      function readNote() {
      
          db.collection("users").doc(user.uid).collection("notes").orderBy("date").get()
              .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      var title = doc.data().title
                      var detail = doc.data().note
                      document.getElementById("display_title").innerHTML = title
                      document.getElementById("display_note").innerHTML = detail
                      document.querySelector('a').href = "journal_edit.html?docID="+doc.id
                  })
          })
      }

      function getUserName() {
        db.collection("users").doc(user.uid).get()
        .then((userDoc) => {
            var userName = userDoc.data().user;
            document.getElementById("user").innerHTML = userName;
        })
      }

      getUserName();
      readNote();
  } else {
      // No user is signed in.
      console.log("No user is signed in.")
  }
});

async function getapi(url)
{
  const response = await fetch(url);
  var quotes = await response.json();
  console.log(quotes);
  let quote = quotes[0].content;
  document.getElementById("motivQuote").innerHTML = quote;
  console.log(quote);
}

getapi(api_url);

