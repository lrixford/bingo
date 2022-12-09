<!-- Copright Laird Rixford 2020 -->
var bingoed = false;
var blackedout = false;
var selectedNumbers = [12];
var boardPosition = 0;
var selectedDaubColor = "rgba(109, 225, 251, 0.6)";
if (localStorage.getItem("dauberColor")) {
    selectedDaubColor = localStorage.getItem("dauberColor");
}

if (isMSIE()) {
    alert("Please use Chrome, Firefox or Edge.")
} else {
    buildCard();
}

function buildCard() {

    // header
    let cardHeader = ["B", "I", "N", "G", "O"];
    for (let index = 0; index < cardHeader.length; index++) {
        createItem(cardHeader[index]);
    }

    let b = [], i = [], n = [], g = [], o = [];
    for (let bNum = 0; bNum < 15; bNum++) { b.push(bNum + 1); };
    for (let iNum = 15; iNum < 30; iNum++) { i.push(iNum + 1); };
    for (let nNum = 30; nNum < 45; nNum++) { n.push(nNum + 1); };
    for (let gNum = 45; gNum < 60; gNum++) { g.push(gNum + 1); };
    for (let oNum = 60; oNum < 75; oNum++) { o.push(oNum + 1); };

    for (let row = 0; row < 5; row++) {

        let varB = getNextNumber(b);
        createItem(varB);
        b.splice(b.indexOf(varB), 1);

        let varI = getNextNumber(i);
        createItem(varI);
        i.splice(i.indexOf(varI), 1);

        if (row == 2) {
            createItem("Free");
        } else {
            let varN = getNextNumber(n);
            createItem(varN);
            n.splice(n.indexOf(varN), 1);
        }

        let varG = getNextNumber(g);
        createItem(varG);
        g.splice(g.indexOf(varG), 1);

        let varO = getNextNumber(o);
        createItem(varO);
        o.splice(o.indexOf(varO), 1);

    }

    for (let sampleIndex = 0; sampleIndex < 5; sampleIndex++) {

        var itemToCreate = document.createElement("li");
        document.getElementById("daubers").appendChild(itemToCreate);

        let sampleColor;
        switch (sampleIndex) {
            case 0:
                itemToCreate.setAttribute("aria-label", "blue");
                sampleColor = "rgba(109, 225, 251, 0.6)";
                break;
            case 1:
                itemToCreate.setAttribute("aria-label", "orange");
                sampleColor = "rgba(250, 200, 113, 0.6)";
                break;
            case 2:
                itemToCreate.setAttribute("aria-label", "pink");
                sampleColor = "rgba(234, 127, 226, 0.6)";
                break;
            case 3:
                itemToCreate.setAttribute("aria-label", "green");
                sampleColor = "rgba(79, 224, 68, 0.6)";
                break;
            case 4:
                itemToCreate.setAttribute("aria-label", "purple");
                sampleColor = "rgba(152, 151, 241, 0.6)";
                break;
        }

        itemToCreate.prepend(createDaub(60, 60, 90, sampleColor));

        itemToCreate.addEventListener("click", function () {
            selectedDaubColor = sampleColor;
            localStorage.setItem("dauberColor", selectedDaubColor);
            document.getElementById("selectSound").play();
        });

    }
}

function getNextNumber(inColArray) {
    return inColArray[Math.floor(Math.random() * inColArray.length)];
}

function createItem(item) {
    var itemToCreate = document.createElement("li");
    switch (item) {
        case "B":
        case "I":
        case "N":
        case "G":
        case "O":
            itemToCreate.textContent = item;
            break;
        case "Free":
            itemToCreate.setAttribute("data-daubered", true);
            itemToCreate.classList.add("board");
            itemToCreate.innerHTML = "<img src='https://hexure.com/wp-content/uploads/2022/09/Favicon.svg' alt='Logo' class='centerLogo' />";
            itemToCreate.setAttribute("data-boardposition", boardPosition);
            boardPosition += 1;
            break;
        default:

            itemToCreate.setAttribute("data-boardposition", boardPosition);
            boardPosition += 1;

            itemToCreate.classList.add("board");

            var number = document.createElement("div");
            number.classList.add("number");
            number.textContent = item;
            itemToCreate.appendChild(number);

            itemToCreate.addEventListener("click", function (e) {

                var list = document.querySelectorAll("ol#card > li:nth-child(-n+5)");
                for (var i = 0; i < list.length; ++i) {
                    list[i].classList.remove('rainbow');
                };

                // confetti.stop();

                let daub = createDaub(e.offsetX, e.offsetY, 130, selectedDaubColor)
                e.target.parentElement.setAttribute("data-daubered", true);
                e.target.parentElement.appendChild(daub);
                selectedNumbers.push(Number(e.target.parentElement.getAttribute("data-boardposition")));
                document.getElementById("daubSound").play();

                checkForBingo();

            });
    }
    document.getElementById("card").appendChild(itemToCreate);

}

function checkForBingo() {

    if (blackedout) { return false; };

    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].every(function (i) { return selectedNumbers.includes(i); })) {

        blackedout = true;
        console.log("Blackout");
        document.body.style.filter = "saturate(0)";
        // confetti.alpha = 1;
        // confetti.start();

        document.getElementById("clappingSound").play();

    }

    if (bingoed) { return false; };

    if ([0, 1, 2, 3, 4].every(function (i) { return selectedNumbers.includes(i); }) ||
        [5, 6, 7, 8, 9].every(function (i) { return selectedNumbers.includes(i); }) ||
        [10, 11, 12, 13, 14].every(function (i) { return selectedNumbers.includes(i); }) ||
        [15, 16, 17, 18, 19].every(function (i) { return selectedNumbers.includes(i); }) ||
        [20, 21, 22, 23, 24].every(function (i) { return selectedNumbers.includes(i); }) || 
        [0, 5, 10, 15, 20].every(function (i) { return selectedNumbers.includes(i); }) ||
        [1, 6, 11, 16, 22].every(function (i) { return selectedNumbers.includes(i); }) ||
        [2, 7, 12, 17, 22].every(function (i) { return selectedNumbers.includes(i); }) ||
        [3, 8, 13, 18, 23].every(function (i) { return selectedNumbers.includes(i); }) ||
        [4, 9, 14, 19, 24].every(function (i) { return selectedNumbers.includes(i); }) ||
        [0, 6, 12, 18, 24].every(function (i) { return selectedNumbers.includes(i); }) ||
        [4, 8, 12, 16, 20].every(function (i) { return selectedNumbers.includes(i); }))
    {

        bingoed = true;
        console.log("Bingo");
        // confetti.alpha = 0.9;
        // confetti.start();
        document.getElementById("clappingSound").play();

        var list = document.querySelectorAll("ol#card > li:nth-child(-n+5)");
        for (var i = 0; i < list.length; ++i) {
            list[i].classList.add('rainbow');
            list[i].style.animationDelay = (0.5 * i) + "s";
        };

    }

}

function createDaub(x, y, daubSize, dauberColor) {

    let middleOfDaub = daubSize / 2;
    let radius = (daubSize / 2) * 0.8;

    var c = document.createElement("canvas");
    c.classList.add("daub");
    c.style.left = (x - middleOfDaub) + "px";
    c.style.top = (y - middleOfDaub) + "px";
    c.setAttribute("height", daubSize);
    c.setAttribute("width", daubSize);

    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(middleOfDaub, middleOfDaub, radius, 0, 2 * Math.PI);
    ctx.fillStyle = dauberColor;
    ctx.fill();

    let step = 0;
    do {
        let random = Math.random();
        let [x, y] = pointsOnCircle({ radius: radius, angle: step, cx: middleOfDaub, cy: middleOfDaub });
        ctx.beginPath();
        ctx.arc(x + random, y + random, 5 * random, 0, 2 * Math.PI);
        ctx.fillStyle = dauberColor;
        ctx.fill();
        step += 5;
    } while (step < 360);

    step = 0;
    do {
        let random = Math.random();
        let [x, y] = pointsOnCircle({ radius: (radius - 10) + (random * 13), angle: step, cx: middleOfDaub, cy: middleOfDaub });
        ctx.beginPath();
        ctx.arc(x, y, 3 * random, 0, 2 * Math.PI);
        ctx.fillStyle = dauberColor;
        ctx.fill();
        step += (45 * random);
    } while (step < 2880);

    step = 0;
    do {
        let random = Math.random();
        let [x, y] = pointsOnCircle({ radius: radius * random, angle: step, cx: middleOfDaub, cy: middleOfDaub });
        ctx.beginPath();
        ctx.arc(x, y, 2 * random, 0, 2 * Math.PI);
        if (step % 2) {
            ctx.fillStyle = "#ffffff";
        } else {
            ctx.fillStyle = dauberColor;
        }
        ctx.fill();
        step += (60 * random);
    } while (step < 1440);

    return c;

}

function pointsOnCircle({ radius, angle, cx, cy }) {

    angle = angle * (Math.PI / 180); // Convert from Degrees to Radians
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return [x, y];

}

function isMSIE() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        return true;
    }
    else  // If another browser, return 0
    {
        return false;
    }
    
}
