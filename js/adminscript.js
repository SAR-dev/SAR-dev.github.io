//get form reference
const form = document.querySelector("#admin-form");

//save data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const now = new Date();
    db.collection('news').add({
        heading: form.heading.value,
        image: form.image.value,
        summary: form.summary.value,
        fullnews: form.fullnews.value,
        time: firebase.firestore.Timestamp.fromDate(now)
    });
    form.heading.value = '';
    form.image.value ='';
    form.summary.value ='';
    form.fullnews.value ='';
});


//get a reference
const news = document.querySelector("#viewnews");
let i = 0;

//render html
let renderNews = (content, id) => {
    let dataid = id;
    let fullnews = content.fullnews;
    let fullnewstext = stripHtml(fullnews);
    let heading = content.heading;
    let image = content.image;
    let summary = content.summary;
    let time = formatDate(content.time.toDate());

    let htmldata =
        `<div class="posts col-12" data-id="${dataid}">
         <hr class="adminhr">
         <h4 class="text-center"><strong class="pr-1">Data ID:</strong>${dataid}</h4>
         <div class="text-center"><button class="btn delete-btn" onclick="deleteelement(this)"><i class="fas fa-trash-alt"></i></button></div>
         <p class="font-weight-bold">Heading:<p> <p>${heading}</p>
         <p class="font-weight-bold">Thumbnail Link:<p> <p>${image}</p>
         <p class="font-weight-bold">Summary:<p> <p>${summary}</p>
         <p class="font-weight-bold">Full News(No Tags):<p> <p>${fullnewstext}</p>
         <p class="font-weight-bold">Date:<p> <p>${time}</p>
         </div>
         `;
    news.innerHTML += htmldata;
    i++;
}

//    delete data
function deleteelement (e) {
    let id = e.parentElement.parentElement.getAttribute("data-id");
    db.collection('news').doc(id).delete();
};

/// realtime listen and change in html
db.collection ('news').orderBy('time', "desc").onSnapshot (snapshot => {
   snapshot.docChanges().forEach( change => {
       if (change.type === 'added') {
          renderNews (change.doc.data(), change.doc.id); 
       }
       else if (change.type === 'removed') {
           document.querySelectorAll ('.posts').forEach ( posts => {
               if (posts.getAttribute('data-id') === change.doc.id) {
                   posts.remove();
               }
           });
       }
   });
});

//convert date
function formatDate(date) {
    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

//html to text
function stripHtml(html){
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}
