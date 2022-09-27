const articles = document.querySelectorAll("article");
const aside = document.querySelector("aside");
const close = aside.querySelector("span");


//article의 갯수만큼 반복을 돌면서 
for (let el of articles) {

  // 마우스가 해당요소에 들어갈때의 이벤트
  el.addEventListener("mouseenter", (e) => {
    e.currentTarget.querySelector("video").play();
  });

  // 마우스가 떠나갈때 이벤트
  // 자식요소인 비디오를 찾아서 멈춤
  el.addEventListener("mouseleave", (e) => {
    e.currentTarget.querySelector("video").pause();
  });


  //각 article을 클릭하면
  el.addEventListener("click", (e) => {

    //1단계 aside 활성화클래스 on을 붙여서 활성화
    aside.classList.add("on");
    //1단계-2 aside안의 비디오를 활성화
    aside.querySelector("video").play();

    //2단계 먼저 각 값을 변수에 저장
    //txt 안의 텍스트(h2,p)와 비디오의 src 값을 변수로 담는것
    let tit = e.currentTarget.querySelector("h2").innerText;
    let txt = e.currentTarget.querySelector("p").innerText;
    let vidSrc = e.currentTarget.querySelector("video").getAttribute("src");

    //변수에 지정된 값을 대체해서 넣기
    aside.querySelector('h1').innerText = tit;
    aside.querySelector('p').innerText = txt;
    aside.querySelector('video').setAttribute("src", vidSrc);

  });
}

close.addEventListener("click", () => {
  //1단계 aside에 활성화클래스인 on을 없애서 비활성화 시킴
  aside.classList.remove("on");
  //1단계-2 비디오를 멈춤
  aside.querySelector("video").pause();
});