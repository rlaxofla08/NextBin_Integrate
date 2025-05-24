async function logout() {
    const res = await fetch(`${serverURL}/auth/logout`, { method: "GET", credentials: "include" });
    const data = await res.json();
    console.log(data.message);
    // 로그아웃 후 리다이렉트
    window.location.href = "/user";
}

// 페이지 로드 시 로그아웃 요청
window.onload = logout;
