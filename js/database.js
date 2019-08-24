//// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBYjD7-EBtlOLoeb6G5g8EqASc-FIMs1c8",
    authDomain: "vocalog-68274.firebaseapp.com",
    databaseURL: "https://vocalog-68274.firebaseio.com",
    projectId: "vocalog-68274",
    storageBucket: "vocalog-68274.appspot.com",
    messagingSenderId: "808503735663",
    appId: "1:808503735663:web:c8e051828101adfe"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//get a reference
const news = document.querySelector("#news-firebase");

//render html
let renderNews = (content, id) => {
    let dataid = id;
    let fullnews = content.fullnews;
    let heading = content.heading;
    let image = content.image;
    let summary = content.summary;
    let time = formatDate(content.time.toDate());

    let newshtmldata =
        `<div class="col s12 l6 my-2">
            <div class="row mx-1 z-depth-1 border-round grey lighten-4">
                <div class="col s4 p-2 news-image">
                    <img src="${image}" class="materialboxed p-1">
                </div>
                <div class="col s8 my-3">
                    <a href="#${dataid}" class="blue-text text-darken-4 modal-trigger link">${heading}</a>
                    <small class="truncate my-2 grey-text text-darken-4">${summary}</small>
                    <small class="white-text px-2 py-1 yellow darken-4 date">${time}</small>
                    <small class="white-text px-2 py-1 red author">by Sayed Rafi</small>
                </div>

                <div id="${dataid}" class="modal modal-fixed-footer">
                    <div class="modal-content">
                        <h4 class="mb-3">${heading}</h4>
                        <img src="${image}" class="responsive-img mb-2" style="width: 100%">
                        ${fullnews}
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-small red white-text">CLOSE</a>
                    </div>
                </div>
            </div>
        </div>`;
    news.innerHTML += newshtmldata;
    $('.modal').modal();
}
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

/// realtime listen and change in html
db.collection('news').orderBy('time', "desc").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            renderNews(change.doc.data(), change.doc.id);
        } else if (change.type === 'removed') {
            document.querySelectorAll('.posts').forEach(posts => {
                if (posts.getAttribute('data-id') === change.doc.id) {
                    posts.remove();
                }
            });
        }
    });
});
