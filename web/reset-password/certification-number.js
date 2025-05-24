document.addEventListener('DOMContentLoaded', function () {
    const menuImage = document.querySelector('.Certification-number-screen .menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const inputs = document.querySelectorAll('.cert-input'); // 인증번호 입력 필드
    const verifyButton = document.querySelector('body > div > div > div.overlap-group > div.rectangle-3'); // 인증번호 확인 버튼
    const timerDisplay = document.querySelector('.text-wrapper-6'); // 타이머 표시 요소
    const extendTimeButton = document.getElementById('extend-time-button'); // 시간 연장 버튼
    const sentCode = "123456"; // 발송된 인증번호 (예시)
    const serverURL = "http://127.0.0.1:3000"; // 서버 URL
    let timerDuration = 300; // 타이머 초기값 (5분)
    let timerInterval;
    let ddm = false;

    console.log(timerDisplay);

    // 타이머 시작 함수
    function startTimer() {
        timerInterval = setInterval(() => {
            if (timerDuration <= 0) {
                clearInterval(timerInterval);
                alert("타이머가 만료되었습니다."); // 타이머 만료 알림
                window.location.href = '/user-verification';
                return;
            }
            timerDuration--;
            console.log(timerDuration)
            updateTimerDisplay();
        }, 1000); // 1초마다 실행
    }

    // 타이머 표시 업데이트 함수
    function updateTimerDisplay() {
        const minutes = Math.floor(timerDuration / 60);
        const seconds = timerDuration % 60;
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // 00:00 형식으로 표시
        }
        console.log(timerDuration)
        // 60초 남았을 때 시간 연장 버튼 표시
        if (timerDuration == 60 && extendTimeButton) {
            extendTimeButton.style.display = 'block';
        }
    }

    // 시간 연장 버튼 클릭 이벤트
    if (extendTimeButton) {
        extendTimeButton.addEventListener('click', function () {
            timerDuration += 60; // 60초 추가
            extendTimeButton.style.display = 'none'; // 버튼 숨기기
            updateTimerDisplay(); // 타이머 표시 업데이트
        });
    } else {
        console.error("extendTimeButton이 존재하지 않습니다."); // 디버깅을 위한 로그
    }

    // 입력 필드에서 한 글자 입력 시 다음 필드로 이동
    inputs.forEach((input, index) => {
        input.addEventListener('input', function () {
            if (this.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus(); // 다음 필드로 포커스 이동
            }
            // 입력한 문자가 있을 경우 해당 라인 숨기기
            if (this.value.length === 1) {
                this.previousElementSibling.style.display = 'none'; // 이전 라인 숨기기
            }
        });

        // 입력 필드에서 Backspace 키를 눌렀을 때
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Backspace' && this.value.length === 0 && index > 0) {
                inputs[index - 1].focus(); // 이전 필드로 포커스 이동
                inputs[index - 1].value = ''; // 이전 필드의 값 지우기
                inputs[index - 1].previousElementSibling.style.display = 'block'; // 이전 라인 보이기
            }
        });

        // 입력 필드에서 Backspace 키를 눌렀을 때 (마지막 입력 필드)
        input.addEventListener('input', function () {
            if (this.value.length === 0 && index > 0) {
                this.previousElementSibling.style.display = 'block'; // 이전 라인 보이기
            }
        });
    });

    // 인증번호 확인 버튼 클릭 이벤트
    if (verifyButton) {
        verifyButton.addEventListener('click', function () {
            const userInput = Array.from(inputs).map(input => input.value).join(''); // 입력된 인증번호 조합
            if (userInput === sentCode) {
                alert("인증번호가 확인되었습니다."); // 인증 성공 메시지
            } else {
                alert("인증번호가 일치하지 않습니다."); // 인증 실패 메시지
            }
        });
    } else {
        console.error("verifyButton이 존재하지 않습니다."); // 디버깅을 위한 로그
    }

    // 타이머 시작
    startTimer();

    // 드롭다운 메뉴 클릭 이벤트
    if (menuImage) {
        menuImage.addEventListener('click', function() {
            ddm = !ddm;
            if (dropdownMenu) {
                dropdownMenu.style.display = ddm ? 'block' : 'none'; // 드롭다운 메뉴 표시/숨기기
            }
            console.log('menu 이미지가 클릭되었습니다!');
        });
    } else {
        console.error("menuImage가 존재하지 않습니다."); // 디버깅을 위한 로그
    }

    // 문서 클릭 시 드롭다운 메뉴 숨기기
    document.addEventListener('click', function(event) {
        if (ddm && dropdownMenu && !dropdownMenu.contains(event.target) && !menuImage.contains(event.target)) {
            dropdownMenu.style.display = 'none'; // 드롭다운 메뉴 숨기기
            ddm = false; // 상태 업데이트
        }
    });

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', async function() {
            const action = this.textContent; // 클릭한 메뉴 항목의 텍스트 가져오기
            switch (action) {
                case '계정 관리':
                    // 계정 관리 동작
                    console.log('계정 관리가 선택되었습니다.');
                    break;
                case '계정 정보':
                    // 계정 정보 동작
                    window.location.href = '/Account-information';
                    console.log('계정 정보가 선택되었습니다.');
                    break;
                case '로그아웃':
                    const res = await fetch('http://127.0.0.1:3000/auth/logout', {
                        method: 'GET',
                        credentials: 'include'
                    });
                    if (res.ok) {
                        window.location.href = '/login'; // 올바른 경로로 수정
                    }
                    console.log('로그아웃이 선택되었습니다.');
                    // 예: 로그아웃 요청을 서버에 보낼 수 있습니다.
                    break;
                default:
                    console.log('알 수 없는 메뉴 항목입니다.');
            }
        });
    });
});