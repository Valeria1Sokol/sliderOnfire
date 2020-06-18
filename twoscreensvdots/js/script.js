/* Progress animation */
var progressElems = document.querySelectorAll(".inner__progress");
progressElems.forEach(function (elem, index) {
    elem.style.width = elem.dataset.width + "%"
});
/* Animation of days in habits */
var greenInterval = setInterval(function () {
    var greenElem = document.querySelectorAll(".green__elem");
    greenElem.forEach(function (elem, index) {
        elem.querySelector(".habits__stat").style.backgroundColor = "#00A662";
    });
}, 200);
/* Habits checkbox */
var habitsElem = document.querySelectorAll(".elem__habits");
habitsElem.forEach(function (elem, index) {
    elem.addEventListener('click', function (e) {
        if (this.querySelector(".form-group>input:checked") !== null) {
            this.querySelector(".form-group>input").checked = false;
            this.querySelector("img").src = "twoscreensvdots/img/checkgreendark.svg";
        } else {
            this.querySelector(".form-group>input").checked = true;
            this.querySelector("img").src = "twoscreensvdots/img/checkgreen.svg";
        }
    });
});
var tabsElem = document.querySelectorAll(".task__tab ul li a");
tabsElem.forEach(function (elem, index) {
    elem.addEventListener("click", function (e) {
        document.querySelector(".task__tab ul li a.active__tab").classList.remove("active__tab");
        elem.classList.add("active__tab");
        var datasetInfo = elem.dataset.block;
        document.querySelectorAll(".task__global").forEach(function (elem, index) {
            elem.style.display = "none";
        });
        fadeIn(datasetInfo);

        function show(value) {
            if (document.getElementById(datasetInfo).length != 0) {
                document.getElementById(datasetInfo).style.opacity = (parseFloat(document.getElementById(datasetInfo).style.opacity) + 0.1);
                if (document.getElementById(datasetInfo).style.opacity < 1) {
                    setTimeout(show, 25);
                }
            }
        }

        function fadeIn(value) {
            if (document.getElementById(datasetInfo).length != 0) {
                document.getElementById(datasetInfo).style.opacity = 0;
                document.getElementById(datasetInfo).style.display = 'block';
                setTimeout(show, 25);
            }
        }
    });
});
/* Menu arrow click */
var rightMenu = document.getElementById("right__hightlight");
var menuArrow = document.getElementById("open__menu");
menuArrow.addEventListener('click', function (e) {
    if (window.innerWidth >= 1366) {
        menuArrow.style.visibility = 'hidden';
        menuArrow.style.opacity = 0;
        rightMenu.style.right = "0px";
        rightMenu.style.visibility = 'visible';
    } else {
        menuArrow.style.opacity = 0;
        menuArrow.style.visibility = 'hidden';
        rightMenu.style.right = "0px";
        rightMenu.style.visibility = 'visible';
    }
});

/* Fullslide event */
var touchsurface = document.getElementById('right__hightlight');
window.addEventListener('load', function () {
    var startX,
        startY,
        dist,
        threshold = 150, //required min distance traveled to be considered swipe
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime

    function handleswipe(isrightswipe) {
        if (isrightswipe) {
            if (window.innerWidth >= 1366) {
                touchsurface.style.right = "-550px";
                rightMenu.style.visibility = 'hidden';
                menuArrow.style.opacity = 1;
                menuArrow.style.visibility = 'visible';
            } else {
                touchsurface.style.right = "-100%";
                rightMenu.style.visibility = 'hidden';
                menuArrow.style.opacity = 1;
                menuArrow.style.visibility = 'visible';
            }

        }
    }
    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0]
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        // e.preventDefault()
    }, false)
    touchsurface.addEventListener('touchmove', function (e) {
        // e.preventDefault()
    }, false)
    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
        handleswipe(swiperightBol)
        // e.preventDefault()
    }, false)

}, false) // end window.onload
function displayWindowSize() {
    if (window.innerWidth >= 1366) {
        touchsurface.style.right = "-550px";
        rightMenu.style.visibility = 'hidden';
        menuArrow.style.opacity = 1;
        menuArrow.style.visibility = 'visible';
    } else {
        touchsurface.style.right = "-100%";
        rightMenu.style.visibility = 'hidden';
        menuArrow.style.opacity = 1;
        menuArrow.style.visibility = 'visible';
    }
}
window.addEventListener("resize", displayWindowSize);
displayWindowSize();
