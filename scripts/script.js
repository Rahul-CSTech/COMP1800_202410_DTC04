// function logout() {
//     firebase.auth().signOut().then(() => {
//         console.log("logging out");
//       }).catch((error) => {
//       });
// }

function updateDateTime() {
    // create a new `Date` object
    const now = new Date();

    // get the current date and time as a string
    const currentDateTime = now.toLocaleString();

    // update the `textContent` property of the `span` element with the `id` of `dateSpan`
    document.querySelector('#dateSpan').textContent = currentDateTime.substring(0,8);

}
setInterval(updateDateTime, 1000);

// Motivaitional Quote API
const api_url ="https://api.quotable.io/quotes/random";

async function getapi(url)
{
  const response = await fetch(url);
  var quotes = await response.json();
  let quote = quotes[0].content;
  document.getElementById("motivQuote").innerHTML = quote;
  console.log(quote);
}

getapi(api_url);
