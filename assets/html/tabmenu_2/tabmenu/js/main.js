class Tab {

    constructor() {
        this.init();
        this.bindingEvent();
    }

    init(){
        this.main = document.querySelector("main");
        this.btns = this.main.querySelectorAll("ul li");
        this.boxes = this.main.querySelectorAll("section article");
        this.speed = this.convertSpeed(this.boxes[0]);
        this.enableClick = true;
    }
    
    bindingEvent(){
        //btns에 반복을 돌면서(forEach)
        this.btns.forEach((btn, index) => {
            btn.addEventListener("click", (e) => {//각 요소에 이벤트(클릭)을 부여
                e.preventDefault();//a 태그 링크이벤트방지
    
                // 재이벤트 방지구문
                let isOn = e.currentTarget.classList.contains("on");
                if (isOn) return;
    
                if (this.enableClick) {
                    this.enableClick = false;
                    this.activation(this.btns, index);
                    this.activation(this.boxes, index);
    
                    new Anim(this.main, {
                        prop: "height",
                        value: this.matchHT(index),
                        duration: this.speed
                    })
                }
    
            })
        })
    }
    
    //함수였던 애들은 메소드화해서 적용시켜야한다.
    
    //높이값 모션 함수
    matchHT(index) {
        let ht = getComputedStyle(this.boxes[index]).height;
        //값을 측정해서 가져오면 실수값으로 가지고 오는데 정수값으로 변환을 해야한다,.
        ht = parseInt(ht); //새롭게 정수값으로 저장
        return ht;
    }
    
    //속도 변환 함수
    convertSpeed(el) {
        let sd = getComputedStyle(el).transitionDuration;
        //sd = 0.5
    
        sd = parseFloat(sd) * 1000; //속성값으로 변환하기 위해서 500으로 변환시킴
        return sd;
    }
    
    
    activation(arr, index) {
        for (let el of arr) { el.classList.remove("on"); }
        arr[index].classList.add("on");
    
        setTimeout(() => {
            this.enableClick = true;
        }, this.speed);
    
        /*
        setTimeout(실행함수, 시간) 
        실행함수를 정해둔 시간 이후에 무조건 사용하도록
    
        setTimeout(실행함수,시간,앞의함수에파라미터가필요한경우)
        */
    }
    
}



// 여기서 쓰이는 this 뜻하는것은 붕어빵 틀용 this라고 붙이는 순간 앞으로 생성하게 될 메인을 나타냄 