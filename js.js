
    const getStartButton = document.querySelector("#start-button");
    const getGameSettingsContainer =  document.querySelector(".game_settings-container");
    const getStartButtonContainer = document.querySelector("#start-button-container");
    const getGameWindowContainer = document.querySelector("#game_window-container");
    const getGameStatsContainer = document.querySelector("#game_stats-container");
    const getPlayAgainContainer = document.querySelector("#play_again-container");
    const getPlayAgainButtonTrue = document.querySelector("#play_again-button_true");
    const getPlayAgainButtonFalse = document.querySelector("#play_again-button_false");
    const getGameStopButton = document.querySelector("#game_stop-button");
    const getGameContainer = document.querySelector("#game-container");
    const getGreetings = document.querySelector("#greetings");
    const getGameSettingsInputButtonSelect = document.querySelector("#game_settings-input_button_select");
    const getGameButon = document.querySelector("#game-buton");

    const TBR = document.querySelector("#TBR");

    const responseTimesInSession = [];


    getStartButton.onclick = function () {
        getGameSettingsContainer.style.display ="none";
        getStartButtonContainer.style.display ="none";
        getGameWindowContainer.style.display="block";
        getGameStatsContainer.style.display="flex";
        startGame();
    }


    getPlayAgainButtonTrue.onclick = function () {
        getGameSettingsContainer.style.display ="block";
        getStartButtonContainer.style.display ="block";
        getGameWindowContainer.style.display="none";
        getGameStatsContainer.style.display="none";
        getPlayAgainContainer.style.display = "none";
    }

    getPlayAgainButtonFalse.onclick = function () {
        getGameContainer.style.display = "none";
        getGreetings.style.display = "block";
    }


    getGameSettingsInputButtonSelect.addEventListener("keypress", function (event) {
            getGameSettingsInputButtonSelect.value = '';
    })

    getGameSettingsInputButtonSelect.addEventListener("mousedown", function(event) {
        if (event.button === 0) {
            getGameSettingsInputButtonSelect.value = "LPM";
        } else if (event.button === 2) {
            getGameSettingsInputButtonSelect.value = "PPM";
        }
    });

    function startGame () {

        const SRT = document.querySelector("#SRT");
        const LRT = document.querySelector("#LRT");
        const ART = document.querySelector("#ART");
        const CBCC = document.querySelector("#CBCC");

        if (getGameSettingsInputButtonSelect.value === "LPM") {
            getGameButon.addEventListener("click", function (event) {
                if (event.button === 0) {
                    buttonClick();
                }
            })
        } else if (getGameSettingsInputButtonSelect.value === "PPM") {
            getGameButon.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                if (event.button === 2) {
                    buttonClick();
                }
            })
        } else {
            getGameButon.addEventListener("keydown", function (event) {
                if (event.key === getGameSettingsInputButtonSelect.value && !event.repeat) {
                    buttonClick();
                }
            })
        }

        SRT.innerHTML = "0.0";
        LRT.innerHTML = "0.0";
        ART.innerHTML = "0.0";
        CBCC.innerHTML = "0.0";

        getGameButon.style.backgroundColor = "#111111";

        getGameButon.focus();

        const responseTimes = [];

        let buttonFlag = true;

        const lives = document.querySelector("#game_settings-input_level_select");

        let i = 0;

        let clickBefore = 0;

        let startTime = Date.now();

        let isRunning = true;

        let click = false;

        function buttonClick() {

            click = true;

            if (!isRunning) {
                return;
            }

            if (buttonFlag === true) {
                clickBefore++;
                CBCC.innerHTML = clickBefore.toString();
            } else if (buttonFlag === false) {

                let responsetime = elapsedTime(startTime) / 1000;
                responseTimes.push(responsetime);
                responseTimesInSession.push(responsetime);
                SRT.innerHTML = shortestResponseTime(responseTimes).toString();
                LRT.innerHTML = longestResponseTime(responseTimes).toString();
                ART.innerHTML = averageResponseTime(responseTimes).toString();
                TBR.innerHTML = shortestResponseTime(responseTimesInSession).toString();

                buttonFlag = true;
            }
        }

        getGameStopButton.addEventListener("click", function () {
            getPlayAgainContainer.style.display = "block";
            getGameWindowContainer.style.display = "none";
            isRunning = false;
            clickBefore = 0;
            getPlayAgainButtonTrue.disabled = true;
            getPlayAgainButtonTrue.innerHTML = countdown();

            let countdownInterval = setInterval(() => {
                getPlayAgainButtonTrue.innerHTML = countdown();
                if (count < 1) {
                    clearInterval(countdownInterval);
                }
            }, 1000);
            let timeoutId = setTimeout(() => {
                getPlayAgainButtonTrue.disabled = false;
                getPlayAgainButtonTrue.innerHTML = "TAK";
            }, 8000);
        })


        function startInterval () {
            
            if (!isRunning) {
                return;
            }

            let intervalTime = Math.floor(Math.random() * (8000 - 1000 + 1)) + 1000;

            let intervalId = setTimeout(() => {

                if (i >= lives.value) {
                    clearInterval(intervalId);
                    getPlayAgainContainer.style.display = "block";
                    getGameWindowContainer.style.display = "none";
                    return;
                }

                switchColor();
                i++;
                buttonFlag = false;
                startTime = Date.now();


                startInterval();

            }, intervalTime);
        }

        startInterval();

        function switchColor() {

            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);

            getGameButon.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

        }

        function elapsedTime(startTime) {
            let endTime = Date.now() - startTime;
            return endTime;
        }

        function shortestResponseTime(responsesTimes) {
            let bestTime = 999;
            for (let i = 0; i < responsesTimes.length; i++) {
                if (responsesTimes[i] < bestTime) {
                    bestTime = responsesTimes[i];
                }
            }
            return bestTime;
        }

        function longestResponseTime(responsesTimes) {
            let worstTime = 0;
            for (let i = 0; i < responsesTimes.length; i++) {
                if (responsesTimes[i] > worstTime) {
                    worstTime = responsesTimes[i];
                }
            }
            return worstTime;
        }

        function averageResponseTime(responsesTimes) {
            let averageTime = 0;

            for (let i = 0; i < responsesTimes.length; i++) {
                averageTime = averageTime + responsesTimes[i];
            }

            return (averageTime / responsesTimes.length).toFixed(3);

        }

        let count = 8;

        function countdown() {
            if (count >= 1) {
                return count-- + '...';
            } else {
                return '';
            }
        }
    }