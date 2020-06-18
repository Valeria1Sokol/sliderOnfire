(function () {

        let chooserAvatarList = document.querySelectorAll(".chooser__users .avatar");

        Array.from(chooserAvatarList).forEach(el => {
            el.addEventListener('click',function(e){
                
                // Find current user, deactivate and choose another
                let currentElem = document.querySelector(".chooser__users .avatar_selected");
                currentElem.classList.remove('avatar_selected');
               el.classList.add('avatar_selected');
            });
        });


        // Habits time control on habit time
        let timeControlItemList = document.querySelectorAll(".time-control-vert__item");
        let timeBoxes = document.querySelectorAll(".time-boxes .time-box");

        Array.from(timeControlItemList).forEach((el, index) => {
            el.addEventListener('click',function(e){

             // Find current time, deactivate and choose another 
            let currentElem = document.querySelector(".time-control-vert__item_active");
            currentElem.classList.remove('time-control-vert__item_active');
            el.classList.add('time-control-vert__item_active');

            // Find current time box, deactivate and choose another
            let currentTimeBox = document.querySelector(".time-box_active");
            
            currentTimeBox.classList.remove('time-box_active');
            timeBoxes[index].classList.add('time-box_active');

            });
        });


        // player

        let videOptions = {};

        let player = videojs('video-player-popup', videOptions, function onPlayerReady() {
        // // How about an event listener?
        // this.on('ended', function() {
        //     videojs.log('Awww...over so soon?!');
        // });
    });


        // Habit page
        
        let startLessonBtn = document.querySelector('.js-start-lesson');
        let completeLessonBtn = document.querySelector('.js-complete-lesson');
        let habitVideoPopup = document.querySelector('.habit-video-popup');
        let timer = null;

        startLessonBtn.addEventListener('click', () => {
            player.play();
            habitVideoPopup.style.display = 'flex';

            let timeMs = startLessonBtn.dataset.time;
            let msToTime = millisecondsToTime(timeMs);

            // 1 second
            let interval = 1000; 

            // Init time
            let formatedTime = moment({ minutes: msToTime.minutes, seconds: msToTime.seconds}).format('mm:ss');

            // Timer 
            let duration = timeMs;
           
             timer = setInterval(function(){
                    if(duration === 1000){
                        clearInterval(timer);
                    }
                    console.log(duration);
                    
                    duration = duration  - interval;
                    msToTime = millisecondsToTime(duration);
                    formatedTime = moment({ minutes: msToTime.minutes, seconds: msToTime.seconds}).format('mm:ss');
                    startLessonBtn.textContent = formatedTime;
                    
                }, interval);
          

        });

        completeLessonBtn.addEventListener('click', () => {
            player.pause();
            player.currentTime(0);
            clearInterval(timer);
            habitVideoPopup.style.display = 'none';
            startLessonBtn.textContent = 'Start';

        });

      

        // Ms to minutes and seconds
        function millisecondsToTime(timeMs){

                let seconds = Math.floor((timeMs / 1000) % 60);
                let minutes = Math.floor((timeMs / (60 * 1000)) % 60);
                return {
                    'minutes': minutes,
                    'seconds':  seconds
                };
            }

  
                    
})();