//get a reference
const news = document.querySelector("#newsSection");

//render html
let renderNews = (content, id) => {
    let dataid = id;
    let fullnews = content.fullnews;
    let heading = content.heading;
    let image = content.image;
    let summary = content.summary;
    let time = formatDate(content.time.toDate());

    let newshtmldata =
        `<div class="row my-4 content posts" data-id="${dataid}">
            <div class="col-md-4 col-sm-12 col-12 image">
                <img src="${image}" class="shadow p-3 bg-white rounded img-fluid">
                <p class="text-secondary text-center">Created at: ${time}</p>
            </div>
            <div class="col-md-8 col-sm-12 col-12 my-2">
                <a data-toggle="modal" data-target="#${dataid}">
                    <h5>${heading}</h5>
                    <p>${summary}</p>
                </a>

                <div class="modal fade" id="${dataid}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl" role="document">
                        <div class="modal-content">

                           <div class="modal-header text-center">
                            <h5 class="modal-title w-100" id="exampleModalLabel">${heading}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>

                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="text-center"><img src="${image}" class="shadow p-3 mb-5 bg-white rounded img-fluid"></div>
                                            ${fullnews}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    news.innerHTML += newshtmldata;
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
