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

let lightbox;

refs.form.addEventListener('submit', onSearch);
refs.btnLoad.addEventListener('click', onLoad);


function onSearch(evt) {
    evt.preventDefault();

    clearGallery();

    if (pageNumber > 0) {
        pageNumber = 1;
    }
    refs.btnLoad.classList.add('is-hidden');
    searchQuery = evt.currentTarget.elements.searchQuery.value.trim().toLowerCase();
    // console.log(searchQuery);
    onFetch();
    evt.target.reset();
    }


function onLoad() {
    refs.btnLoad.classList.add('is-hidden');
    lightbox.refresh();
    pageNumber +=1;
    onFetch();
}
const insertMarkup = (el) => {
    refs.gallery.insertAdjacentHTML("beforeend", markup(el));
}
function createMarkup(img) {
    img.forEach(el => {
        insertMarkup(el);
    })
}

function clearGallery () {
    refs.gallery.innerHTML = "";
}

function onFetch() {
    fetchPhoto(searchQuery, pageNumber)
    .then(img => {
        createMarkup(img);
        if (img.length === 39) {
            refs.btnLoad.classList.remove('is-hidden');
        }
        lightbox = new SimpleLightbox('.gallery a', 
{
    captionsData: 'alt',
    captionsPosition: 'bottom',
    captionDelay: 250,
});
    })
}


