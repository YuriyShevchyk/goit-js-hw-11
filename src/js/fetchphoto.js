import axios from "axios";
import Notiflix from "notiflix";

const BASE_URL = `https://pixabay.com/api/`;
const PER_PAGES =39;
const KEY = `30593247-cec71ce7620e4a04353e92bf8`;

const fetchPhoto = async(searchQuery, page) => {
    try {
        const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGES}&page=${page}`);
        if (searchQuery ==="") {
            Notiflix.Notify.failure("You have not entred search data")
        }
        if (page === 1 && response.data.totalHits !== 0) {
            Notiflix.Notify.success("Hooray! We found totalHits images.")
        }
        if (PER_PAGES * page >= response.data.totalHits && response.data.totalHits !== 0) {
            setTimeout(()=> {
                Notiflix.Notify.info("We are sorry, but you have reached the end of search results.")
            },1000);
        }
        return response.data.hits;
    } catch (error) {
        Notiflix.Notify.failure("404 Images not found");
        console.log(error);
    }
}

export default fetchPhoto;