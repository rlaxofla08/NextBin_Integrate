// main.js

// DOMContentLoaded 이벤트를 사용하여 DOM이 완전히 로드된 후에 코드를 실행합니다.
document.addEventListener('DOMContentLoaded', function() {
    // 'expand-left' 클래스를 가진 이미지를 선택합니다.
    const NextBinLogo =  document.querySelector('.admin-page .text-wrapper');
    const expandLeftImage = document.querySelector('.expand-left');
    const menuImage = document.querySelector('.menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const appbarpage = document.querySelector('.appbar-page');
    let apbr = true; // 상태를 관리하는 변수
    let ddm = false;

    const pages = {
        IntegratedMonitoring: document.querySelector('.Integrated-monitoring-page'),
        nextBinManagement: document.querySelector('.NextBin-management-page'),
        wasteManagement: document.querySelector('.waste-management-page'),
        inventoryManagement: document.querySelector('.inventory-management-page'),
        transportationManagement: document.querySelector('.transportation-management-page'),
    };
    

    const pageContainer = document.querySelector('.page-container'); // 상위 상자 선택

    function showPage(page) {
        // 모든 페이지 숨기기
        for (const key in pages) {
            if (pages.hasOwnProperty(key)) {
                if (pages[key]) {
                    pages[key].style.display = 'none';
                }
            }
        }
        // 선택된 페이지만 보이기
        if (pages[page]) {
            pages[page].style.display = 'block';
        } else {
            console.error(`Page ${page} does not exist.`);
        }
    }

    // 이미지가 클릭되었을 때 실행할 함수를 정의합니다.
    expandLeftImage.addEventListener('click', function() {
        // 여기에 클릭 시 수행할 동작을 작성합니다.
        appbarpage.style.transition = 'transform 0.5s ease'; // 애니메이션 효과 추가
        expandLeftImage.style.transition = 'transform 0.5s ease';
        pageContainer.style.transition = 'transform 0.5s ease width 0.5s ease';

        if (apbr) {
            appbarpage.style.transform = 'translateX(-100%)'; // 왼쪽으로 이동
            expandLeftImage.style.transform = 'translateX(67.5px) rotateY(180deg)';
            pageContainer.style.width = 'calc(1000px + 280px)'; // 너비 증가
            pageContainer.style.transform = 'translateX(-280px)'; // 부드러운 이동
        } else {
            appbarpage.style.transform = 'translateX(0)'; 
            expandLeftImage.style.transform = 'translateX(0) rotateY(0deg)';
            pageContainer.style.transform = 'translateX(0%)'; // 부드러운 이동
            pageContainer.style.width = '1000px'; // 너비 감소
        }

        // apbr 값을 증가시켜 다음 클릭 시 방향을 반전
        apbr = !apbr;
        console.log('expand-left 이미지가 클릭되었습니다!');
    });
    menuImage.addEventListener('click', async function() {
        ddm = !ddm;
        dropdownMenu.style.display = ddm ? 'block' : 'none';
        console.log('menu 이미지가 클릭되었습니다!');
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

    // 각 text-wrapper 요소 선택
    const textWrappers = document.querySelectorAll('.appbar-page .text-wrapper-4, .appbar-page .text-wrapper-5, .appbar-page .text-wrapper-6, .appbar-page .text-wrapper-7, .appbar-page .text-wrapper-8, .appbar-page .text-wrapper-9');

    textWrappers.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.textContent; // 클릭한 메뉴 항목의 텍스트 가져오기
            switch (action) {
                case '통합 모니터링':
                    showPage('IntegratedMonitoring');

                    break;
                case 'NextBin 관리':
                    showPage('nextBinManagement');

                    break;
                case '쓰레기 관리':
                    showPage('wasteManagement');

                    break;
                case '재고 관리':
                    showPage('inventoryManagement');

                    break;
                case '운송 관리':
                    showPage('transportationManagement');

                    break;
                case '관리자 계정 관리':
                    showPage('Account-information');
                    
                    break;
                default:
                    console.log('알 수 없는 메뉴 항목입니다.');
            }
        });
    });

    // 초기 페이지 설정
    showPage('nextBinManagement'); // 기본적으로 보일 페이지 설정

    NextBinLogo.addEventListener('click', function() {
        location.reload(true);
        console.log('logo가 클릭되었습니다!');
    });

    // 드롭다운 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function(event) {
        if (ddm && !dropdownMenu.contains(event.target) && !menuImage.contains(event.target)) {
            dropdownMenu.style.display = 'none'; // 드롭다운 메뉴 숨기기
            ddm = false; // 상태 업데이트
        }
    });
});