// 텍스트 자동 완성 & 삭제
(function () {
    const spanEl = document.querySelector('main h2 span');
    const txtArr = ['Back-End Developer', 'Front-End Developer'];
    let index = 0;
    let currentTxt = txtArr[index].split('');
    console.log(currentTxt);

    function writeTxt() {
        spanEl.textContent += currentTxt.shift();
        if (currentTxt.length !== 0) {
            execute(writeTxt);
        } else {
            currentTxt = spanEl.textContent.split('');
            setTimeout(deleteTxt, 3000);
        }
    }

    function deleteTxt() {
        currentTxt.pop();
        spanEl.textContent = currentTxt.join('');
        if (currentTxt.length !== 0) {
            execute(deleteTxt);
        } else {
            index += 1;
            currentTxt = txtArr[index % 2].split('');
            setTimeout(writeTxt, 300);
        }
    }

    function execute(func) {
        setTimeout(func, Math.floor(Math.random() * 100));
    }

    writeTxt();
})()
// 최초 한번만 실행되면 됨 > 즉시 실행함수로 작성. 코드가 메모리에 남지않는다 ?

// 수직 스크롤 발생하면 header 태그에 active 클래스 추가 및 삭제. 위에처럼 즉시실행 함수로 만들어도 작동은 정상적으로 함.
const headerEl = document.querySelector('header');
window.addEventListener('scroll', function(){
    // scrollCheck();   스크롤 될 때마다 실행 > 부담 증가
    this.requestAnimationFrame(scrollCheck);    //웹브라우저가 허용 가능한 범위 내에서 실행 ? 최적화
});

function scrollCheck() {
    const browserScrollY = window.scrollY;
    if (browserScrollY > 0) {
    headerEl.classList.add('active');
    }else{
        headerEl.classList.remove('active');
    }
    console.log('scroll');
}

//버튼
const scrollMoveEl = document.querySelectorAll('[data-animation-scroll="true"]');
for (let i = 0; i < scrollMoveEl.length; i++) {
    scrollMoveEl[i].addEventListener('click', function(e){
        animationMove(e.dataset.target)
        console.log(e.dataset.target);
    });
}

const animationMove = function(selector){
    const target = document.querySelector(selector);
    console.log(target);
}