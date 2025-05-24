document.addEventListener('DOMContentLoaded', async function () {
    const serverURL = "http://127.0.0.1:3000"; // 서버 URL

    // 세션 확인 함수
    async function checkSession() {
        const res = await fetch(`${serverURL}/auth/get_session`, { method: "GET", credentials: "include" });
        const data = await res.json();
        if (data.isLoggedIn) {
            document.querySelector('.user-name-display').textContent = data.username; // 사용자 이름 표시
        } else {
            window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        }
    }

    // 로그아웃 함수
    async function logout() {
        const res = await fetch(`${serverURL}/auth/logout`, { method: "GET", credentials: "include" });
        const data = await res.json();
        if (data.status == "200") {
            window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        } else {
            window.location.href = '/'; // 로그아웃 실패
        }
    }

    // 이벤트 리스너 추가
    document.querySelector('button').addEventListener('click', logout);

    // 페이지 로드 시 세션 확인
    checkSession();
});
