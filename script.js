// include don't touch 

function includeHEADER() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-header");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /*remove the attribute, and call this function once more:*/

          elmnt.removeAttribute("w3-include-header");
          includeHEADER();


          // header JS start
          // //스크롤 시 헤더 영역 고정하기
          const content = document.querySelector('body');
          const wing = document.querySelector('header');
          // 컨텐츠 영역부터 브라우저 최상단까지의 길이 구하기
          const contentTop = content.getBoundingClientRect().top + window.scrollY;

          window.addEventListener('scroll', function () {
            if (window.scrollY > contentTop) {
              wing.classList.add('fixed');
            } else {
              wing.classList.remove('fixed');
            }
          });

          // //햄버거 메뉴 오픈
          const openIcon = document.querySelector("#openIcon");
          const hiddenMenu = document.querySelector("#hiddenMenu");
          let ham = 0;

          openIcon.addEventListener("click", function () {
            openIcon.classList.toggle("change");
            ham++;
            console.log(ham);
            if (ham % 2 !== 0) {
              document.body.style.overflow = "hidden";
              shadowBox.style.position = "fixed";
              shadowBox.style.top = currentP + "px";
              shadowBox.style.display = "block";
              hiddenMenu.style.maxHeight = hiddenMenu.scrollHeight + "px";
              hiddenMenu.style.zIndex = 100;
            }
            else {
              hiddenMenu.style.maxHeight = null;
              shadowBox.style.display = "none";
              document.body.style.removeProperty('overflow');
            }
          });

          // //검색창 모달 열고 닫기
          searchIcon = document.querySelector(".search-icon");
          searchModal = document.querySelector(".search-modal");
          searchClose = document.querySelector(".search-close");
          shadowBox = document.querySelector(".shadow-box");
          currentP = window.scrollY;

          searchIcon.onclick = function () {
            document.body.style.overflow = "hidden";
            shadowBox.style.position = "fixed";
            shadowBox.style.top = currentP + "px";
            shadowBox.style.display = "block";
            searchModal.style.position = "fixed";
            searchModal.style.top = currentP + "px";
            searchModal.style.maxHeight = searchModal.scrollHeight + "px";
          }

          searchClose.onclick = function () {
            searchModal.style.maxHeight = null;
            shadowBox.style.display = "none";
            document.body.style.removeProperty('overflow');
          }
          // header JS end

        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};


function includeFOOTER() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-footer");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-footer");
          includeFOOTER();

          // footer JS start
          //아코디언
          const acc = document.querySelector(".accordion");
          acc.addEventListener("click", function () {
            acc.classList.toggle("active");
            var panel = acc.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            }
          });

          //fixed-btns 
          var $target = $('.fixed-btns');
          var $footer = $('.trigger');
          $(window).on('scroll', function () {
            var $window = $(window), anchor = $window.scrollTop() + $window.height();
            var fot = $footer.offset().top;
            if (anchor > fot) $target.removeClass('footeron');
            else $target.addClass('footeron');
          });
          // footer JS end
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};


// ----- index.html JS start ----- 


//index - NOW TRENDIG 아티클
function openTab(evt, tabMenuName) {
  var i, x, tabMenu;
  x = document.getElementsByClassName("tabContent");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  tabMenu = document.getElementsByClassName("tabMenu");
  for (i = 0; i < x.length; i++) {
    tabMenu[i].className = tabMenu[i].className.replace(" tabmenu-color", "");
  }

  document.getElementById(tabMenuName).style.display = "flex";
  evt.currentTarget.className += " tabmenu-color";
}


//index - BLACKYAK FILM 아티클
// 유튜브 동영상 ID
var videoIDs = ["2fGP5jiIPfw", "sy-ReDjtM00"];
// 동영상 재생 시간 (초 단위)
var startSeconds = 0;
var endSeconds = 15;

// 동영상 플레이어 API를 비동기로 로드
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 유튜브 플레이어 API로드 시 호출되는 함수
function onYouTubeIframeAPIReady() {
  // 유튜브 동영상 플레이어 생성
  var players = [];
  var videoContainers = [];
  var filmThumbnails = [];

  for (var i = 0; i < videoIDs.length; i++) {
    players[i] = new YT.Player("bg-video" + (i + 1), {
      height: "100%",
      width: "100%",
      videoId: videoIDs[i],
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1,
        start: startSeconds,
        end: endSeconds,
        playlist: videoIDs[i],
        mute: 1,
        showinfo: 0,
        modestbranding: 1,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 1,
        rel: 0
      },
      events: {
        onReadyAndStateChange: function (event) {
          if (event.data === YT.PlayerState.PAUSED) {
            showOrHidePauseButton(event.target, true);
          } else if (event.data === YT.PlayerState.PLAYING) {
            showOrHidePauseButton(event.target, false);
          }
        }
      }
    });

    //썸네일 숨기기
    videoContainers[i] = document.getElementById("bg-video" + (i + 1));
  }

  //플레이 버튼 클릭
  const playBtns = document.querySelectorAll(".play-btn");

  for (var i = 0; i < playBtns.length; i++) {
    playBtns[i].addEventListener("click", function (index) {
      videoContainers[index].style.zIndex = "3";
      players[index].playVideo();
      playBtns[index].style.zIndex = "-1";
    }.bind(null, i));
  }

  //좌우 인디케이터 클릭
  let filmSlide1 = document.querySelector("#filmSlide1");
  let prevFilm = document.querySelector(".film-slide-prev-btn");
  let nextFilm = document.querySelector(".film-slide-next-btn");
  let filmsSlides = document.querySelectorAll(".filmSlide");

  prevFilm.addEventListener("click", function () {
    filmSlide1.style.left = "0px";
    videoContainers[1].style.zIndex = "-1";
    playBtns[1].style.zIndex = "5";
    nextFilm.style.cursor = "pointer";
    prevFilm.style.cursor = "auto";
  });
  nextFilm.addEventListener("click", function () {
    filmSlide1.style.left = "-1130px";
    videoContainers[0].style.zIndex = "-1";
    playBtns[0].style.zIndex = "5";
    nextFilm.style.cursor = "auto";
    prevFilm.style.cursor = "pointer";
  });

}



// ----- purchase.html JS start ----- 
// ---------- inner-left ----------
//스크롤 시 탭메뉴 활성화
window.addEventListener('scroll', function () {
  if (window.scrollY > innerLeftContentTop) {
    prdTabs.classList.add('prdTabsFixed');

    for (s = 0; s < sections.length; s++) {
      if (window.scrollY > scrollItemsTop[s]) {
        removeTabActive();
        gnbItems[s].classList.add("tabActive");
      }
    }
  } else {
    prdTabs.classList.remove('prdTabsFixed');
  }
});

//탭 메뉴 클릭하면 이동
gnbItems.forEach((gnbItem, index) => {
  gnbItem.addEventListener("click", (e) => {
    const sectionTop = sections[index].offsetTop - 45;
    removeTabActive();
    gnbItems[index].classList.add("tabActive")
    window.scroll({ top: sectionTop });
  });
});
//탭메뉴 활성화 제거
function removeTabActive() {
  for (let j = 0; j < gnbItems.length; j++) {
    gnbItems[j].classList.remove("tabActive");
  }
}