const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click",(e)=>{
  
    //isTxt함수의 반환값이 false라면 전송중지 true면 무시= 통과
    if(!isTxt("userid",5)) e.preventDefault();

    if(!isTxt("comments",20)) e.preventDefault();

    if(!isEmail("email")) e.preventDefault();

    if(!isCheck("gender")) e.preventDefault();

    if(!isCheck("hobby")) e.preventDefault();

    if(!isSelect("edu")) e.preventDefault();

    if(!isPwd("pwd1", "pwd2", 5)) e.preventDefault();
    /*
        1. text를 확인해서 일정글자이상인지? : 텍스트 인증함수

        2. email을 확인해서 @? : email 인증함수 

        3. 체크박스 값의 유무? : 체크박스인증함수

        4. select 선택유무 ? : select인증함수

        5. 비밀번호 글자수+특수문자+숫자등? : 비밀번호 인증함수
    */
})

//type이 text인 form요소 인증함수
//첫번째 인수로는 name에 적은 값을 받아주고, 두번째인수는 글자수를 전달
function isTxt(id,len){

    //만약 입력받은 글자수가 있는지?? 없음? 디폴트값을 지정 = 예외처리
    if(len === undefined ) len = 5;

    //해당 name값의 input요소를 찾아서
    let input = form.querySelector(`[name=${id}]`);
    //해당 input요소의 value값을 가지고옴
    let txt = input.value;

    //입력받은 value값의 글자수가 len글자 이상이면?
    if(txt.length >= len){

        //일단 에러메세지 p요소가 있으면 모두 선택
        const errMsgs = input.closest("td").querySelectorAll("p");
        //p요소가 있다면 제거합니다.
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();
        return true;
    }else{
        //일단 에러메세지 p요소가 있으면 모두 선택
        const errMsgs = input.closest("td").querySelectorAll("p");
        //p요소가 있다면 제거합니다.
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();

        //p태그로 에러메세지를 생성하여 해당 input요소의 부모 td의 뒤쪽에 삽입한다.
        const errMsg = document.createElement("p");
        errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
        input.closest("td").append(errMsg);
        return false;
    }
}

function isEmail(el){

    let input = form.querySelector(`[name=${el}]`);
    //해당 input요소의 value값을 가지고옴
    let txt = input.value;

    //정규식표현으로 @의 유무를 판단한다.
    if(/@/.test(txt)){

        //일단 에러메세지 p요소가 있으면 모두 선택
        const errMsgs = input.closest("td").querySelectorAll("p");
        //p요소가 있다면 제거합니다.
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();
        return true;
    }else{
        //일단 에러메세지 p요소가 있으면 모두 선택
        const errMsgs = input.closest("td").querySelectorAll("p");
        //p요소가 있다면 제거합니다.
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();

        //p태그로 에러메세지를 생성하여 해당 input요소의 부모 td의 뒤쪽에 삽입한다.
        const errMsg = document.createElement("p");
        errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요");
        input.closest("td").append(errMsg);
        return false;
    }
}   

function isCheck(el){
    let inputs = form.querySelectorAll(`[name=${el}]`);

    let isCheck = false;

    for(let el of inputs){
        if(el.checked) isCheck = true;
    }

    if(isCheck){
        const errMsgs = inputs[0].closest("td").querySelectorAll("p");
        //p요소가 있다면 제거합니다.
        if(errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();
        return true;
    }else{
        const errMsgs = inputs[0].closest("td").querySelectorAll("p");
        //p요소가 있다면 제거합니다.
        if(errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();

        //p태그로 에러메세지를 생성하여 해당 input요소의 부모 td의 뒤쪽에 삽입한다.
        const errMsg = document.createElement("p");
        errMsg.append("필수 입력 항목을 체크해주세요");
        inputs[0].closest("td").append(errMsg);
        return false;
    }

}

function isSelect(el){
    let sel = form.querySelector(`[name=${el}]`);
    let sel_index = sel.options.selectedIndex;
    let value = sel[sel_index].value;

    if(value !==""){
        const errMsgs = sel.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) sel.closest("td").querySelector("p").remove();
        return true;
    }else{
        const errMsgs = sel.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) sel.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append("항복을 선택해 주세요");
        sel.closest("td").append(errMsg);
        return false; 
    }
}

function isPwd(name1,name2,len){
    let pwd1 = form.querySelector(`[name=${name1}]`);
    let pwd2 = form.querySelector(`[name=${name2}]`);
    let pwd1_value = pwd1.value;
    let pwd2_value = pwd2.value;

    //숫자,영문,특수문자 조건을 정규식표현으로 변수에 저장
    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+?<>]/;

    //두개의 비밀 번호가 같고
    //비밀번호의 글자수가 len개 이상이고
    //비밀번호에 숫자, 영문, 특수문자 가 포함되어 있다면

    
    if(pwd1_value === pwd2_value && pwd1_value.length >= len && num.test(pwd1_value) && eng.test(pwd1_value) && spc.test(pwd1_value)){
        const errMsgs = pwd1.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();
        return true;
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();

        //p태그로 에러메세지를 생성하여 해당 input요소의 부모 td의 뒤쪽에 삽입한다.
        const errMsg = document.createElement("p");
        errMsg.append(`비밀번호는 ${len}글자 이상, 영문,숫자,특수문자를 포함하여 동일하게 입력하세요`);
        input.closest("td").append(errMsg);
        return false;
    }
}

/*
인증함수?

만약 조건을 만족한다면 return true;
만약 조건을 만족하지 않는다면 return false;

submit을 클릭하면??
인증함수의 결과값이 하나라도 false라면?? 결과값으로 가지못하게 e.preventDefault();
모두 결과값이 true? - result.html로 이동

if(조건문){
    코드
    return true;
}else{
    //경고문구
    return false;
}
*/