document.addEventListener('DOMContentLoaded', function () {
    const overlapInput = document.querySelector('.overlap'); // 이름/이메일 입력 필드
    const requestButton = document.querySelector('.text-wrapper-5'); // 인증번호 요청 버튼
    // const idInput = document.querySelector('.overlap'); // ID 입력 필드
    // const idLabel = document.querySelector('.text-wrapper-4'); // ID 레이블
    const serverURL = "http://127.0.0.1:3000"; // 서버 URL

    // function toggleIDText() {
    //     if (idInput.value) {
    //         idLabel.style.display = 'none'; // 값이 있을 때 ID 텍스트 숨기기
    //     } else {
    //         idLabel.style.display = 'block'; // 값이 없을 때 ID 텍스트 보이기
    //     }
    // }

    // 인증번호 요청 버튼 클릭 이벤트
    requestButton.addEventListener("click", async function () {
        const input = overlapInput.value.trim(); // 입력된 이름/이메일

        if (!input) {
            alert("이름 또는 이메일을 입력해 주세요."); // 입력이 없을 경우 경고
            return;
        }

        // 입력값이 이메일 형식인지 확인
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        try {
            // 서버에 인증 코드 요청
            const res = await fetch(`${serverURL}/auth/findpassword`, {
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
                window.location.href = '/Certification-number';
            } else {
                alert(data.message || "인증 코드 전송에 실패했습니다."); // 오류 메시지 표시
            }
        } catch (error) {
            
        }
    });

    // ID 입력 필드에서 입력 이벤트 발생 시 toggleIDText 호출
    // idInput.addEventListener('input', toggleIDText);
});
