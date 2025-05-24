document.addEventListener('DOMContentLoaded', function () {
    const overlapInput = document.querySelector('.overlap'); // 이름/이메일 입력 필드
    const requestButton = document.querySelector('.text-wrapper-5'); // 인증번호 요청 버튼
    const timerDisplay = document.querySelector('.text-wrapper-6'); // 타이머 표시
    const extendTimeButton = document.getElementById('extend-time-button'); // 시간 연장 버튼
    const serverURL = "http://127.0.0.1:3000"; // 서버 URL

    let timerDuration = 300; // 5분 (300초)
    let timerInterval; // 타이머 인터벌을 저장할 변수

    function startTimer() {
        clearInterval(timerInterval); // 기존 타이머가 있다면 초기화
        timerInterval = setInterval(() => {
            if (timerDuration <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "시간이 만료되었습니다."; // 타이머 만료 메시지
                extendTimeButton.style.display = 'none'; // 버튼 숨기기
            } else {
                const minutes = Math.floor(timerDuration / 60);
                const seconds = timerDuration % 60;
                timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // 타이머 표시

                if (timerDuration === 60) { // 60초 남았을 때
                    extendTimeButton.style.display = 'block'; // 버튼 표시
                }
                timerDuration--;
            }
        }, 1000); // 1초마다 실행
    }

    extendTimeButton.addEventListener('click', function() {
        timerDuration += 60; // 1분 연장
        extendTimeButton.style.display = 'none'; // 버튼 숨기기
        startTimer(); // 타이머 다시 시작
    });

    // 인증번호 요청 버튼 클릭 이벤트
    requestButton.addEventListener("click", async function () {
        const input = overlapInput.value.trim(); // 입력된 이름/이메일

        if (!input) {
            alert("이름 또는 이메일을 입력해 주세요."); // 입력이 없을 경우 경고
            return;
        }
``
        // 입력값이 이메일 형식인지 확인
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        
        // 서버에 인증 코드 요청
        const res = await fetch(`${serverURL}/auth/email_check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include', // 세션 쿠키 포함
            body: JSON.stringify(isEmail ? { email: input } : { id: input }) // 이메일이면 email, 아니면 id로 전송
        });

        const data = await res.json();

        if (data.success) {
            alert("인증 코드가 이메일로 전송되었습니다. 이메일을 확인해 주세요.");
            // 인증 코드 입력 페이지로 이동
            window.location.href = '/reset-password';
        } else {
            alert(data.message || "인증 코드 전송에 실패했습니다."); // 오류 메시지 표시
        }
    });

    startTimer(); // 타이머 시작
});