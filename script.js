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

// 수직 스크롤 발생하면 header 태그에 active 클래스 추가 및 삭제
const headerEl = document.querySelector('header');
window.addEventListener('scroll', function(){
    scrollCheck();
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