/*
key = AIzaSyCHRGhWih1oe8lM8qFEzX2KMaL4lfc8ufI
playList = PLYOPkdUKSFgVaH3wgkzGpMuGb29dDZl6j
UCYHwV0nTtnRos2W6e7prUrQ
*/

const vidlist = document.querySelector(".vidList");
const key = "AIzaSyCHRGhWih1oe8lM8qFEzX2KMaL4lfc8ufI";
const playList = "PLYOPkdUKSFgVaH3wgkzGpMuGb29dDZl6j"
const num = 5;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playList}&maxResults=${num}`;

fetch(url)
  .then((data) => {
    return data.json();
  })
  .then(json => {
    let items = json.items;
    console.log(items);

    let result = '';


    items.map((item) => {

      let title = item.snippet.title;
      let titleLength = title.length;

      if (titleLength > 30) {
        title = title.substr(0, 5) + "...";
      }

      let con = item.snippet.description;
      let conLength = con.length;

      if (conLength > 100) {
        con = con.substr(0, 50) + "..."
      }


      let date = item.snippet.publishedAt;
      date = date.split("T")[0];

      result += `


      <article>
        <a href="${item.snippet.resourceId.videoId}" class="pic">
          <img src="${item.snippet.thumbnails.medium.url}">
        </a>
        <div class="con">
          <h2>${title}</h2>
          <p>${con}</p>
          <span>${date}</span>
        </div>
      </article>

      `
    });
    vidlist.innerHTML = result;
  });

  vidlist.addEventListener("click",(e)=>{
    e.preventDefault();
    
    if(!e.target.closest("a")) return;

    const vidId = e.target.closest("a").getAttribute("href");

    let pop = document.createElement("figure");
    pop.classList.add("pop");

    pop.innerHTML = `<iframe src="https://www.youtube.com/embed/${vidId}" 
    frameborder="0" width="100%" height="100%" allowfullscreen>
    이브라우저는 iframe을 지원하지 않습니다</iframe>
    <span class="btnClose">close</span>
    `;
    vidlist.append(pop);
  });

  vidlist.addEventListener("click",(e)=>{
    const pop = vidlist.querySelector(".pop");
    console.log(e.target);
    if(pop){
      const close = pop.querySelector('.btnClose');
      if(e.target == close || e.target == pop ) pop.remove();
    }
  }); 