const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

var timeout;
function chaptaCircle() {
  var xscale = 1;
  var yscale = 1;
  var xpre = 0;
  var ypre = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    var xdiff = dets.clientX - xpre;
    var ydiff = dets.clientY - ypre;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    console.log(xdiff);
    xpre = dets.clientX;
    ypre = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        ".minicircle"
      ).style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1 , 1)  `;
    }, 100);
  });
}

chaptaCircle();
function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    //console.log(dets.clientX, dets.clientY);
    document.querySelector(
      ".minicircle"
    ).style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xscale} , ${yscale})  `;
  });
}

function fristPageAnimation() {
  var tl = gsap.timeline();

  tl.from(".nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from(".hero_footer", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -1,
    });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
});

fristPageAnimation();
circleMouseFollower();
