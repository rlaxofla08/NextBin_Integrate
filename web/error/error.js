document.addEventListener('DOMContentLoaded', async function () {
    const ellipse = document.querySelector('.ellipse'); // ellipse 요소
    const textWrapper2 = document.querySelector('.text-wrapper-2'); // text-wrapper-2 요소
    const textWrapper3 = document.querySelector('.text-wrapper-3'); // text-wrapper-3 요소
    const serverURL = "http://127.0.0.1:3000"; // 서버 URL

    // 로그인 상태 확인
    const checkLoginStatus = async () => {
        const res = await fetch(`${serverURL}/auth/get_session`, {
            method: "GET",
            credentials: "include"
        });
        const data = await res.json();
        return data.isLoggedIn; // 로그인 상태 반환
    };

    const isLoggedIn = await checkLoginStatus(); // 로그인 상태 확인

    // 로그인 상태에 따라 요소 표시
    if (isLoggedIn) {
        ellipse.style.display = 'block';
        textWrapper2.style.display = 'block';
        textWrapper3.style.display = 'block';
    } else {
        ellipse.style.display = 'none';
        textWrapper2.style.display = 'none';
        textWrapper3.style.display = 'none';
    }
});
