const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCrX2OMYTBcodUKQMBLfMrJQ&part=snippet%2Cid&order=date&maxResults=20';

const content = null || document.getElementById('content');
//const videoMusical = document.querySelector('.videoMusical');
const modal = document.querySelector('.modal-video');
const btnCerrar = document.querySelector('.btn-cerrar');
const iframe = document.querySelector('iframe');

//videoMusical.addEventListener('click', () => {modal.showModal()});
btnCerrar.addEventListener('click', () => {
  modal.close();
  iframe.setAttribute('src', '');
});



const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4b3474ab2emsh5776a77bf209eaap1b37fbjsnf1f824cea498',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(urlAPI) {
    const response = await fetch(urlAPI, options);
    const data = await response.json();
    return data
}

 function handlerModal(idVideoModal) {
  const urlVideo = 'https://www.youtube.com/embed/' + idVideoModal
  console.log(idVideoModal);
  iframe.setAttribute('src', urlVideo)
  modal.showModal()
}

(async () => {
    try {
        const videos = await fetchData(url);
        //<a class="video" href="https://www.youtube.com/watch?v=${video.id.videoId}">
        console.log(videos.items[0].id.videoId);
        let view = `
        ${videos.items.map(video =>  `
        <a class="videoMusical cursor-pointer" onclick="handlerModal('${video.id.videoId}')">
          <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-400">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
              </h3>
            </div>
          </div>
        </a>
        
        `).slice(0,20).join('')}
        `;
        content.innerHTML = view;
    } catch (error){
      console.log(error);
    }
})();

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }