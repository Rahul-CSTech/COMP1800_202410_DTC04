// Scripts for journal.html and Motivational Quote API on main page

// Motivaitional Quote API
const api_url = "https://api.quotable.io/quotes/random";
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    function readNote() {

      // Insert notes into the journal.html
      db.collection("users").doc(user.uid).collection("notes").orderBy("date").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var title = doc.data().title
            var detail = doc.data().note
            document.getElementById("display_title").innerHTML = title
            document.getElementById("display_note").innerHTML = detail
            document.querySelector('#user').href = "journal_edit.html?docID=" + doc.id
          })
        })
    }
    /** Gets username from database and adds it to 'user' field in HTML
     * @returns {void} - Only manipulates DOM
     */
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
/** Get quote from Quotable API
 * @param {string} url - Defined at the top of the page
 * @returns {void} - Only gets Quote string and inserts it into a widget in main page
 */
async function getapi(url) {
  const response = await fetch(url);
  var quotes = await response.json();
  let quote = quotes[0].content;
  document.getElementById("motivQuote").innerHTML = quote;
}

getapi(api_url);

