//initialize throttleTimer as false
let throttleTimerNav = false;
let throttleTimerFade = false;

const throttleFade = (callback, time) => {
  //don't run the function while throttle timer is true
  if (throttleTimerFade) return;

  //first set throttle timer to true so the function doesn't run
  throttleTimerFade = true;

  setTimeout(() => {
    //call the callback function in the setTimeout and set the throttle timer to false after the indicated time has passed
    callback();
    throttleTimerFade = false;
  }, time);
};

const throttleNav = (callback, time) => {
  //don't run the function while throttle timer is true
  if (throttleTimerNav) return;

  //first set throttle timer to true so the function doesn't run
  throttleTimerNav = true;

  setTimeout(() => {
    //call the callback function in the setTimeout and set the throttle timer to false after the indicated time has passed
    callback();
    throttleTimerNav = false;
  }, time);
};

// Burger menu functionality and animation
window.addEventListener("DOMContentLoaded", (event) => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".links");

  const mobileMenuToggle = () => {
    let check = burger.classList.contains("active");
    if (check) {
      mobileMenuClose();
    } else {
      mobileMenuOpen();
    }
  };

  burger.addEventListener("click", mobileMenuToggle);

  function mobileMenuOpen() {
    burger.classList.add("active");
    navMenu.classList.add("active");
    let timeDelay = 400;
    for (let link of document.querySelectorAll(".links a")) {
      setTimeout(function () {
        link.classList.add("active-link");
      }, timeDelay);
      timeDelay += 250;
    }
  }

  function mobileMenuClose() {
    burger.classList.remove("active");
    navMenu.classList.remove("active");
    let timeDelay = 350;
    setTimeout(function () {
      for (let link of document.querySelectorAll(".links a")) {
        link.classList.remove("active-link");
      }
    }, timeDelay);
  }

  const navLink = document.querySelectorAll(".nav-item");

  navLink.forEach((n) => n.addEventListener("click", closeMenu));

  function closeMenu() {
    burger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Navbar scroll effect
let prevScrollpos = window.pageYOffset;
const navbarScroll = () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos || currentScrollPos < 106) {
    document.getElementById("navbar").style.top = "0px";
  } else {
    document.getElementById("navbar").style.top = "-106px";
  }
  prevScrollpos = currentScrollPos;
};

window.addEventListener("scroll", () => {
  throttleNav(navbarScroll, 250);
});

// Animate on scroll effect

window.addEventListener("DOMContentLoaded", (event) => {
  const scrollElements = document.querySelectorAll(".js-scroll");

  scrollElements.forEach((el) => {
    el.style.opacity = 0;
  });

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
      elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  const displayScrollElement = (element) => {
    element.style.opacity = 1;
  };

  const hideScrollElement = (element) => {
    element.style.opacity = 0;
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else if (elementOutofView(el)) {
        hideScrollElement(el);
      }
    });
  };

  handleScrollAnimation();

  window.addEventListener("scroll", () => {
    throttleFade(handleScrollAnimation, 250);
  });
});
