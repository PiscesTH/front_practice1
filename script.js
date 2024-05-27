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
const animationMove = function(selector){
    const target = document.querySelector(selector);
    const browserScrollY = window.scrollY;
    const targetScrollY = target.getBoundingClientRect().top + browserScrollY;
    window.scrollTo({top: targetScrollY, behavior:'smooth'});
}

const scrollMoveEl = document.querySelectorAll('[data-animation-scroll="true"]');
console.log(scrollMoveEl);
for (let i = 0; i < scrollMoveEl.length; i++) {
    scrollMoveEl[i].addEventListener("click", function(e){
        animationMove(this.dataset.target);
    });
}

//이메일 발송
(function() {
    // get all data in form and return object
    function getFormData(form) {
      var elements = form.elements;
      var honeypot;
  
      var fields = Object.keys(elements).filter(function(k) {
        if (elements[k].name === "honeypot") {
          honeypot = elements[k].value;
          return false;
        }
        return true;
      }).map(function(k) {
        if(elements[k].name !== undefined) {
          return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
          return elements[k].item(0).name;
        }
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });
  
      var formData = {};
      fields.forEach(function(name){
        var element = elements[name];
        
        // singular form elements just have one value
        formData[name] = element.value;
  
        // when our element has multiple items, get their values
        if (element.length) {
          var data = [];
          for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
              data.push(item.value);
            }
          }
          formData[name] = data.join(', ');
        }
      });
  
      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
      formData.formGoogleSendEmail
        = form.dataset.email || ""; // no email by default
  
      return {data: formData, honeypot: honeypot};
    }
  
    function handleFormSubmit(event) {  // handles form submit without any jquery
      event.preventDefault();           // we are submitting via xhr below
      var form = event.target;
      var formData = getFormData(form);
      var data = formData.data;
  
      // If a honeypot field is filled, assume it was done so by a spam bot.
      if (formData.honeypot) {
        return false;
      }
  
      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            form.reset();
            var formElements = form.querySelector(".form-elements")
            if (formElements) {
              formElements.style.display = "none"; // hide form
            }
            var thankYouMessage = form.querySelector(".thankyou_message");
            if (thankYouMessage) {
              thankYouMessage.style.display = "block";
              alert("메일 전송에 성공했습니다. 확인 후 회신드리겠습니다.")
            }
          }
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }
    
    function loaded() {
      // bind to the submit event of our form
      var forms = document.querySelectorAll("form.gform");
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", handleFormSubmit, false);
      }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);
  
    function disableAllButtons(form) {
      var buttons = form.querySelectorAll("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
    }
  })();