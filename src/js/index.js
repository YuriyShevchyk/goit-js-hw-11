import '../css/styles.css';
import getRefs from "./refs";
import fetchPhoto from './fetchphoto';
import markup from './markup';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = getRefs();

let pageNumber = 1;
let searchQuery ="";
refs.btnLoad.classList.add('is-hidden');
const lightbox = new SimpleLightbox('.gallery a', 
{
    captionsData:'alt',
    captionsPosition: 'bottom',
    captionDelay: 250,
});


refs.form.addEventListener('submit', onSearch);
refs.btnLoad.addEventListener('click', onLoad);


function onSearch(evt) {
    evt.preventDefault();

    clearGallery();

    if (pageNumber > 0) {
        page = 1;
    }
    refs.btnLoad.classList.add('is-hidden');
    searchQuery = evt.currentTarget.elements.searchQuery.value.trim().toLowerCase();
    console.log(searchQuery);
    // if (searchQuery === 0) {
    //     return;
    // } else {
        // clearGallery();
        // pageNumber = 1;
        onFetch();
        console.log(onFetch);
        evt.target.reset();
    }


function onLoad() {
    refs.btnLoad.classList.add('is-hidden');
    lightbox.refresh();
    pageNumber +=1;
    // searchQuery = refs.input.value.trim();
    // fetchPhoto(pageNumber, searchQuery);
    onFetch();
}
function insertMarkup (el) {
    refs.gallery.insertAdjacentHTML("beforeend", markup(el));
}
function createMarkup(img) {
    img.forEach(el => {
        insertMarkup(el);
    })
}
// function insertMarkup(img) {
//     const result = createGallery(img);
//     refs.gallery.insertAdjacentElement('beforeend', result);

// }

// function createGallery(img) {
//     return img.reduce((acc, item) => acc + markup(item),"")
// }

function clearGallery () {
    refs.gallery.innerHTML = "";
}

function onFetch() {
    fetchPhoto(searchQuery, pageNumber)
    .then(img => {
        createMarkup(img);
        console.log(img);
        if (img.length === 39) {
            refs.btnLoad.classList.remove('is-hidden');
        }
        lightbox;
    })
}