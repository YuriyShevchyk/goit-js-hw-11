import '../css/styles.css';
import getRefs from "./refs";
import fetchPhoto from './fetchphoto';
import markup from './markup';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = getRefs();

// refs.btnLoad.classList.add('is-hidden');

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
    console.log(searchQuery);
    if (searchQuery === 0) {
        return;
    } else {
        clearGallery();
        pageNumber = 1;
        fetchPhoto(pageNumber, searchQuery);
    }
}

function onLoad() {
    refs.btnLoad.classList.add('is-hidden');
    pageNumber +=1;
    searchQuery = refs.input.value.trim();
    fetchPhoto(pageNumber, searchQuery);
}

function insertMarkup(img) {
    const result = createGallery(img);
    refs.gallery.insertAdjacentElement('beforeend', result);

}

function createGallery(img) {
    return img.reduce((acc, item) => acc + markup(item),"")
}

function clearGallery () {
    refs.gallery.innerHTML = "";
}