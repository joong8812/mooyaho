// csrf 토큰을 얻음
const getCsrfTokenElement = () => {
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0];
    const hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", csrfToken.name);
    hiddenField.setAttribute("value", csrfToken.value);
    return hiddenField;
}

// 동적 form(로그인) 요청
const submitDynamicForm = (loginInfo) => {
    const newForm = document.createElement('form');

    newForm.method = 'post';
    newForm.action = '/login/'

    for (const [key, value] of Object.entries(loginInfo)) {
        let inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'hidden');
        inputElement.setAttribute('name', key);
        inputElement.setAttribute('value', value);
        newForm.appendChild(inputElement);
    }

    newForm.appendChild(getCsrfTokenElement());

    document.body.appendChild(newForm);
    newForm.submit();
}

// 로그인 요청
const requestLogin = () => {
    const inputInfo = {
        'email': document.querySelector('#email').value,
        'password': document.querySelector('#userPw').value,
        'latitude': latitude,
        'longitude': longitude,
    }
    handleByEmailCheckbox(inputInfo.email);
    submitDynamicForm(inputInfo);
}

// 로그인 or 회원가입 버튼 눌렀을 때
const clickedButton = (e) => {
    if (e.target.innerText == '로그인') {
        if (!checkBlankLoginInfo()) return;
        requestLogin();
    } else {
        location.href = '/signup';
    }
}

// 사용자 위치정보를 얻음
const getUserLocation = () => {
    if (!navigator.geolocation) {
        throw "위치 정보가 지원되지 않습니다.";
    }
    navigator.geolocation.getCurrentPosition(({coords}) => {
        latitude = coords.latitude // 위도
        longitude = coords.longitude; // 경도
    });
}

// 로그인 정보(이메일, 비밀번호) 공백인지 확인
const checkBlankLoginInfo = () => {
    const loginInfo = [
        document.querySelector('#email'),
        document.querySelector('#userPw')
    ]
    for (let index in loginInfo) {
        if (loginInfo[index].value == '') {
            document.querySelector('#error-msg-area > span').innerText = '이메일 혹은 비밀번호가 공백입니다.'
            loginInfo[index].focus();
            return false;
        }
    }
    return true;
}

// 키보드를 눌렀을 때
const afterKeyDown = (e) => {
    if (e.keyCode == 13) { // enter
        if (!checkBlankLoginInfo()) return;
        requestLogin();
    }
}

const handleByEmailCheckbox = (emailAddr) => {
    const saveEmailCheckBox = document.querySelector('#remember-my-id');

    // 이메일 기억 체크박스 유무 확인 및 처리
    if (saveEmailCheckBox.checked == true) {
        setCookie('myEmail', emailAddr, 7); // 7일 동안 쿠키 저장
    } else {
        setCookie('myEmail', emailAddr, 0); // 날짜를 0으로 저장하여 쿠키 삭제
    }
}

// 쿠키에 value(이메일) 정보 저장
const setCookie = (name, value, expiredays) => {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires="
            + todayDate.toGMTString() + ";";
}

// 해당 이름의 쿠키 정보를 불러오기
const getCookie = (name) => {
    const search = name + '='; // 쿠키값에서 검색할 key값 설정
    const docCookie = document.cookie; // 현재 갖고 있는 쿠키값 불러오기

    if (docCookie.length > 0) { // 쿠키값이 있다면
        let offset = docCookie.indexOf(search); // 검색할 key 값에 첫번째 인덱스를 얻는다
        if (offset != -1) { // 그 인덱스가 -1이 아니라면(key값이 검색이 된다면)
            offset += search.length; // 해당 key의 value값 첫번째 index를 얻는다
            end = docCookie.indexOf(';', offset); // value값 이후로 ';' 인덱스 얻음(이 index가 value의 마지막 index다)
            if (end == -1) end = docCookie.length; // ';' 가 없다면 쿠키전체값의 길이를 마지막 인덱스로 넣음
            return unescape(docCookie.substring(offset, end)); // 얻고자 하는 쿠키 key의 value만 리턴
        }
    }
}

// 실행 부분
let latitude = 0;
let longitude = 0;
const buttons = document.querySelectorAll('#button-area > button');
for (let i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', clickedButton);
}

// 유저 위치 정보
getUserLocation();

// keyboard event
window.addEventListener('keydown', afterKeyDown);

// DOM 구성 후 
document.addEventListener("DOMContentLoaded", function () {
    // 정해진 이름의 쿠키 값이 있다면 ...
    if (getCookie('myEmail')) {
        document.querySelector('#email').value = getCookie('myEmail');
        document.querySelector('#remember-my-id').checked = true;
        document.querySelector('#userPw').focus();
    } else {
        document.querySelector('#email').focus();
    }
}); 