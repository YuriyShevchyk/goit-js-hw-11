const markup = (item) =>

`<div class="photo-card">
<a href="${item.largeImageURL}" class="gallery-link"
<img class="photo-img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" height="270px" />
<div class="info">
  <p class="info-item">
    <b>Likes</b>
    <br>${item.likes}</br>
  </p>
  <p class="info-item">
    <b>Views</b>
    <br>${item.views}</br>
  </p>
  <p class="info-item">
    <b>Comments</b>
    <br>${item.comments}</br>
  </p>
  <p class="info-item">
    <b>Downloads</b>
    <br>${item.downloads}</br>
  </p>
</div>
</div>`;

export default markup;