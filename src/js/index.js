import '../css/styles.css';
import getRefs from "./refs";
import fetchPhoto from './fetchphoto';
import markup from './markup';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = getRefs();

refs.btnLoad.classList.add('is-hidden');

refs.form.addEventListener('submit', onSearch);
refs.btnLoad.addEventListener('click', onLoad);

let pageNumber = 1;
let searchQuery ="";
const lightbox = new SimpleLightbox('.gallery a', 
{
    captionsData:'alt',
    captionsPosition: 'bottom',
    captionDelay: 250,
});

function onSearch(evt) {
    evt.preventDefault();
    searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
    if (searchQuery===0) {
        return;
    } else {
        clearGallery();
        pageNumber = 1;
        fetchPhoto(pageNumber, searchQuery);
    }
}

function clearGallery () {
    refs.gallery.innerHTML = "";
}