const menuImage = document.querySelector('.menu');
const NextBinLogo = document.querySelector('.text-wrapper');
const eyeSlash = document.querySelector('.eye-slash');
const signupButton = document.querySelector('.component-6'); // 회원가입 버튼
const idInput = document.querySelector('div.component input'); // ID 입력 필드 선택
const emailInput = document.querySelector('div.component-3 input'); // 이메일 입력 필드 선택
const nameInput = document.querySelector('div.component-2 input'); // 이름 입력 필드 선택
const passwordInput = document.querySelector('div.component-4 input'); // 비밀번호 입력 필드 선택
const passwordCheckInput = document.querySelector('div.component-5 input'); // 비밀번호 확인 입력 필드 선택
const dropdownMenu = document.querySelector('.dropdown-menu'); // 드롭다운 메뉴 선택
const idLabel = document.querySelector('.text-wrapper-3'); // ID 레이블 선택
let ddm = false; // ddm 변수를 정의

function toggleIDText() {
    if (idInput.value) {
        idLabel.style.display = 'none'; // 값이 있을 때 ID 텍스트 숨기기
    } else {
        idLabel.style.display = 'block'; // 값이 없을 때 ID 텍스트 보이기
    }
}

document.addEventListener('DOMContentLoaded', function () {

    NextBinLogo.addEventListener("click", function () {
        location.reload(true);
        console.log('logo가 클릭되었습니다!');
    });

    menuImage.addEventListener('click', function() {
        ddm = !ddm; // ddm 상태 토글
        dropdownMenu.style.display = ddm ? 'block' : 'none'; // 드롭다운 메뉴 표시/숨기기
        console.log('menu 이미지가 클릭되었습니다!');
    });

    eyeSlash.addEventListener("click", function () {
        PasswordVisible = !PasswordVisible; // 상태 토글
        if (PasswordVisible) {
            passwordInput.type = 'text'; // 비밀번호 보이기
            console.log('비밀번호가 보입니다!');
        } else {
            passwordInput.type = 'password'; // 비밀번호 숨기기
            console.log('비밀번호가 숨겨졌습니다!');
        }
    });

    // 회원가입 버튼 클릭 시 서버에 요청
    signupButton.addEventListener("click", async function () {
        const id = idInput.value; // ID 입력 필드에서 값 가져오기
        const email = emailInput.value; // 이메일 입력 필드에서 값 가져오기
        const name = nameInput.value; // 이름 입력 필드에서 값 가져오기
        const password = passwordInput.value; // 비밀번호 입력 필드에서 값 가져오기
        const passwordCheck = passwordCheckInput.value; // 비밀번호 확인 입력 필드에서 값 가져오기

        // 입력값 확인
        if (!id || !email || !name || !password || !passwordCheck) {
            alert("모든 필드를 입력해 주세요."); // 필드가 비어있을 경우 경고
            return; // 요청을 중단
        }

        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다!"); // 비밀번호 불일치 경고
            return; // 요청을 중단
        }

        // 회원가입 요청
        const res = await fetch("http://127.0.0.1:3000/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, email, name, password })
        });

        const data = await res.json();
        if (data.success) {
            console.log('회원가입 성공:', data.message);
            // 성공 시 추가 동작 (예: 로그인 페이지로 리다이렉트)
            window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        } else {
            console.log('회원가입 실패:', data.message);
            // 실패 시 사용자에게 알림 (예: alert)
            alert(data.message);
        }
    });

    idInput.addEventListener('input', toggleIDText); // 이벤트 리스너 추가
})