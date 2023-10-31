const pipePlace = document.querySelector('.funny__main-bottom-row-pipe-place');
const ratPlace = document.querySelector('.funny__main-bottom-row-rat-place');
const ratPlaceContent = document.querySelector('.funny__main-bottom-row-rat-place-content');
const answerPlace = document.querySelector('.funny__main-top-row-answer-place');
const pipePlaceBtn = document.querySelector('.funny__main-bottom-row-pipe-place-btn');
const ratPlaceBtn = document.querySelector('.funny__main-bottom-row-rat-place-btn');
const answerPlaceBtn = document.querySelector('.funny__main-top-row-answer-place-btn');
const freeBird = new Audio('src/sounds/freebird.mp3');
const answerCountElem = document.querySelector('.funny__main-top-row-statistics-place-answer-count');
const ratTimeElem = document.querySelector('.funny__main-top-row-statistics-place-rat-time');
const pipeCountElem = document.querySelector('.funny__main-top-row-statistics-place-pipe-count')
const jokePlaceForm = document.querySelector('.funny__main-top-row-joke-place-form');
const answerCountKey = 'answerCount';
const ratTimeKey = 'ratTime';
const pipeCountKey = 'pipeCount';
const ratShownKey = 'ratShown';
const pipeShownKey = 'pipeShown';
const metalPipeSoundPath = 'src/sounds/metal-pipe-falling-sound-effect.mp3';
const pipeImgPath = 'src/pictures/MetalPipe.png';
const btnSoundOffOffText = 'Sound off';
const btnSoundOffOnText = 'Sound on';
const btnHideRatText = 'Hide rat';
const ratPlaceBtnShowRatText = 'Show rat';

if (localStorage.getItem(answerCountKey) !== '0' && localStorage.getItem(answerCountKey) !== 'null') {
    let answerCount = Number(localStorage.getItem(answerCountKey));
    answerCountElem.textContent = 'Answer requested ' + answerCount + ' times';
}
if (localStorage.getItem(ratTimeKey) !== '0' && localStorage.getItem(ratTimeKey) !== 'null') {
    let ratTime = Number(localStorage.getItem(ratTimeKey));
    ratTimeElem.textContent = 'Rat time: ' + ratTime + ' seconds';
}
if (localStorage.getItem(pipeCountKey) !== '0' && localStorage.getItem(pipeCountKey) !== 'null') {
    let pipeCount = Number(localStorage.getItem(pipeCountKey));
    pipeCountElem.textContent = 'You heard pipe ' + pipeCount + ' times';
}
const playFreeBird = () => {
    freeBird.loop = true;
    freeBird.play();
}

const startCountingRatTime = () => {
    const timer = setInterval(() => {
        let ratTime = Number(localStorage.getItem(ratTimeKey));
        ratTime++;
        localStorage.setItem(ratTimeKey, ratTime.toString());
        ratTimeElem.textContent = 'Rat time: ' + ratTime + ' seconds';
    }, 1000);
    return timer;
}
const stopCountingRatTime = (id) => {
    clearInterval(id);
}

const playMetalPipe = () => {
    const metalPipeSound = new Audio(metalPipeSoundPath);
    metalPipeSound.play();
    return metalPipeSound;
}
if (localStorage.getItem(ratShownKey) === 'true') {
    ratPlaceBtn.textContent = ratPlaceBtnShowRatText;
}

function createRat() {
    const ratUrl = 'https://gifdb.com/images/high/stationary-rat-horizontal-spin-vi7xniwe61qse4i5.gif';
    const ratGif = document.createElement('img');
    ratGif.src = ratUrl;
    ratGif.id = 'ratSpinning';
    return ratGif;
}

function createSoundOffButton() {
    const btnSoundOff = document.createElement('button');
    btnSoundOff.classList.add('btn', 'funny__main-bottom-row-rat-place-btn', 'on');
    btnSoundOff.innerText = btnSoundOffOffText;
    btnSoundOff.addEventListener('click', () => {
        if (btnSoundOff.classList.contains('on')) {
            freeBird.pause();
            btnSoundOff.classList.remove('on');
            btnSoundOff.classList.add('off');
            btnSoundOff.innerText = btnSoundOffOnText;
        } else {
            if (btnSoundOff.classList.contains('off')) {
                freeBird.play();
                btnSoundOff.classList.remove('off');
                btnSoundOff.classList.add('on');
                btnSoundOff.innerText = btnSoundOffOffText;
            }
        }
    })
    return btnSoundOff;
}

function createHideRatButton(ratGif, btnSoundOff, id) {
    const btnHideRat = document.createElement('button');
    btnHideRat.classList.add('btn', 'funny__main-bottom-row-rat-place-btn');
    btnHideRat.innerText = btnHideRatText;
    btnHideRat.addEventListener('click', () => {
        ratGif.remove();
        btnSoundOff.remove();
        btnHideRat.remove();
        freeBird.pause();
        stopCountingRatTime(id);
        ratPlaceBtn.textContent = ratPlaceBtnShowRatText;
        ratPlace.appendChild(ratPlaceBtn);
    })
    return btnHideRat;
}

ratPlaceBtn.addEventListener('click', () => {
    localStorage.setItem(ratShownKey, 'true');
    const ratGif = createRat();
    ratPlaceContent.append(ratGif);
    playFreeBird();
    const id = startCountingRatTime();
    const btnSoundOff = createSoundOffButton();
    const btnHideRat = createHideRatButton(ratGif, btnSoundOff, id);
    ratPlace.appendChild(btnSoundOff);
    ratPlace.appendChild(btnHideRat);
    ratPlaceBtn.remove();
})
jokePlaceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = document.getElementById('input').value;
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            joke: inputValue
        })
    }).then(() => alert('You posted a very funny joke'))
        .catch(() => alert('Your joke could not be posted, but it was very funny'))
})

if (localStorage.getItem(pipeShownKey) === 'true') {
    pipePlaceBtn.textContent = 'Click for pipe';
}

function createPipeImg() {
    let pipeImg = document.createElement('img');
    pipeImg.src = pipeImgPath;
    pipeImg.width = 600;
    pipeImg.height = 500;
    pipeImg.addEventListener('click', () => {
        playMetalPipe();
        let pipeCount = Number(localStorage.getItem(pipeCountKey));
        pipeCount++;
        pipeCountElem.textContent = 'You heard pipe ' + pipeCount + ' times';
        localStorage.setItem(pipeCountKey, pipeCount.toString());
    })
    return pipeImg;
}

function increaseAndShowPipeCount() {
    let pipeCount = Number(localStorage.getItem(pipeCountKey));
    pipeCount++;
    pipeCountElem.textContent = 'You heard pipe ' + pipeCount + ' times';
    localStorage.setItem(pipeCountKey, pipeCount.toString());
}

pipePlaceBtn.addEventListener('click', () => {
    localStorage.setItem(pipeShownKey, 'true');
    const pipeImg = createPipeImg();
    pipePlaceBtn.remove();
    pipePlace.appendChild(pipeImg);
    const metalPipeSoundForCheckingIfEnded = playMetalPipe();
    increaseAndShowPipeCount();
    metalPipeSoundForCheckingIfEnded.addEventListener('ended', () => {
        pipeImg.remove();
        pipePlaceBtn.textContent = 'Click for pipe';
        pipePlace.appendChild(pipePlaceBtn);
    })
})

function getAnswerImage() {
    const answerUrl = 'https://yesno.wtf/api';
    const answer = fetch(answerUrl).then((response) => response.json())
        .then((json) => json.image)
    const answerImage = document.createElement('img');
    answer.then((image) => answerImage.src = image);
    answerImage.width = 450;
    answerImage.height = 400;
    answerImage.addEventListener('click', () => {
        answerImage.remove();
        answerPlace.appendChild(answerPlaceBtn);
    })
    return answerImage;
}

function increaseAndShowAnswerCount() {
    let answerCount = Number(localStorage.getItem(answerCountKey));
    answerCount++;
    answerCountElem.textContent = 'Answer requested ' + answerCount + ' times';
    localStorage.setItem(answerCountKey, answerCount.toString());
}

answerPlaceBtn.addEventListener('click', () => {
    const answerImage = getAnswerImage();
    increaseAndShowAnswerCount();
    answerPlaceBtn.remove();
    answerPlace.appendChild(answerImage);
})
