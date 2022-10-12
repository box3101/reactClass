const h1 = document.querySelector("h1");

//브라우저 스크롤시 현재 스크롤 거리값을 구해서 h1에 출력

const sections = document.querySelectorAll("section");
const lis = document.querySelectorAll("ul li");
const base = -300;

let posArr = []; // 빈배열을 만들어두고

/*
offsetTop : 각 요소의 세로 위치값으로 처음 시작점을 나타냄.
*/

// 각 센션의 갯수만큼 반복을 돌면서
for (let el of sections) {
  // posArr배열에 각 요소의 세로 위치값을 push로 저장
  posArr.push(el.offsetTop);
}

lis.forEach((el, index) => {
  el.addEventListener("click", (e) => {

    new Anim(window, {
      prop: "scroll",
      value: posArr[index],
      duration: 500
    });

    // 모든 버튼을 반복을 돌면서 on을 제거하여 비활성화
    // for (let el of lis) {
    //   el.classList.remove("on");
    // }

    // //클릭한 버튼만 on을 추가하여 활성화
    // el.classList.add("on");


  });
});


window.addEventListener("scroll", () => {

  let scroll = window.scrollY || window.pageYOffset; 


  //scrollY, pageYOffset: 문서가 수직으로 y축의 값으로 얼마나 스크롤 되었는지 픽셀 단위로 변환해주는 값

  //최신버전은 pageYoffset

  h1.innerText = scroll;


  sections.forEach((el, index) => {

    if ((posArr[index]+base <= scroll)) {

      //section 활성화
      lis.forEach((el,index)=>{
        el.classList.remove("on");
        sections[index].classList.remove("on");
      });

      // section 활성화2
      // for(let el of lis){
      //   el.classList.remove("on");
      //   sections[index].classList.remove("on");
      // }

      lis[index].classList.add("on");
      sections[index].classList.add("on");
    }




  });




});