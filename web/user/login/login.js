const menuImage = document.querySelector('.menu');
const NextBinLogo = document.querySelector('.text-wrapper-2');
const loginButton = document.querySelector('.div-wrapper');
const PWForget = document.querySelector('.text-wrapper-6');
const signup = document.querySelector('.text-wrapper-7');
const eyeSlash = document.querySelector('.eye-slash');
const passwordInput = document.querySelector('.overlap-2');
const idInput = document.querySelector('.overlap');
const idLabel = document.querySelector('.text-wrapper-4');
let PasswordVisible = false; // 비밀번호 가시성 상태 변수
const serverURL = "http://127.0.0.1:3000"; // 프로토콜 추가

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
        ddm = !ddm;
        dropdownMenu.style.display = ddm ? 'block' : 'none';
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

    PWForget.addEventListener("click", function () {
        window.location.href = '/user-verification'; // 비밀번호 재설정 페이지로 이동
        console.log('비밀번호 재설정 페이지로 이동합니다.');
    });

    loginButton.addEventListener("click", async function () {
        const id = idInput.value; // ID 입력 필드에서 값 가져오기
        const password = passwordInput.value; // 비밀번호 입력 필드에서 값 가져오기

        // 로그인 요청
        const res = await fetch(`${serverURL}/auth/login`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ id: id, password: password }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            const data = await res.json(); // 서버에서 반환하는 데이터 가져오기
            console.log('로그인 성공! 사용자 정보:', data); // 사용자 정보 출력
            window.location.href = '/'; // 대시보드 페이지로 리다이렉트
        } else {
            console.log('로그인 실패!'); // 로그인 실패 시 메시지 출력
        }
    });

    signup.addEventListener("click", function () {
        window.location.href = '/signup'; // 회원가입 페이지로 리다이렉트
        console.log('회원가입 페이지로 이동합니다.');
    });

    idInput.addEventListener('input', toggleIDText);
});