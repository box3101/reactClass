const frame = document.querySelector("#slider"); 
const panel = frame.querySelector(".panel"); 
const panel_li = panel.querySelectorAll("li"); 
const btns = frame.querySelectorAll(".btns li"); 

//btns의 갯수만큼 반복을 돌면서 btns li에 이벤트 연결
btns.forEach(function(btn,index){
    //버튼을 클릭했을 때 
    btn.addEventListener("click", function(e){
        e.preventDefault(); 

        //모든 버튼 비활성화 
        for(let el of btns){
            el.classList.remove("on"); 
        }
        //클릭한 순번의 버튼만 활성화 
        btns[index].classList.add("on"); 

        new Anim(panel,{
            prop : "margin-left", 
            value : -100 * index +"%" ,
            duration: 500
        })
    })
})