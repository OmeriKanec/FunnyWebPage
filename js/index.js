const pipePlace = document.querySelector('.funny__main-bottom-row-pipe-place');
const ratPlace = document.querySelector('.funny__main-bottom-row-rat-place');
const jokePlace = document.querySelector('.funny__main-top-joke-meme-place');
const answerPlace = document.querySelector('.funny__main-top-row-answer-place');
const pipePlaceBtn = document.querySelector('.funny__main-bottom-row-pipe-place-btn');
const ratPlaceBtn = document.querySelector('.funny__main-bottom-row-rat-place-btn');
const jokePlaceBtn = document.querySelector('.funny__main-top-row-joke-place-form-btn');
const answerPlaceBtn = document.querySelector('.funny__main-top-row-answer-place-btn');
const freeBird = new Audio('src/sounds/freebird.mp3');
const answerCountElem = document.querySelector('.funny__main-top-row-statistics-place-answer-count');
const ratTimeElem = document.querySelector('.funny__main-top-row-statistics-place-rat-time');
const pipeCountElem = document.querySelector('.funny__main-top-row-statistics-place-pipe-count')
const jokePlaceForm = document.querySelector('.funny__main-top-row-joke-place-form');
if (localStorage.getItem('answerCount') !== '0'){
    let answerCount = Number(localStorage.getItem('answerCount'));
    answerCountElem.textContent = 'Answer requested ' + answerCount +' times';
}
if (localStorage.getItem('ratTime') !== '0'){
    let ratTime = Number(localStorage.getItem('ratTime'));
    ratTimeElem.textContent = 'Rat time: '+ ratTime +' seconds';
}
if (localStorage.getItem('pipeCount') !== '0'){
    let pipeCount = Number(localStorage.getItem('pipeCount'));
    pipeCountElem.textContent = 'You heard pipe ' + pipeCount +' times';
}
const playFreeBird = () => {
    freeBird.loop = true;
    freeBird.play();
}
const startCountingRatTime = () => {
    const timer = setInterval(() => {
        let ratTime = Number(localStorage.getItem('ratTime'));
        ratTime++;
        localStorage.setItem('ratTime', ratTime.toString());
        ratTimeElem.textContent = 'Rat time: '+ ratTime +' seconds';
    }, 1000);
    return timer;
}
const stopCountingRatTime = (id) => {
    clearInterval(id);
}
const playMetalPipe = () =>{
    const metalPipeSound = new Audio('src/sounds/metal-pipe-falling-sound-effect.mp3');
    metalPipeSound.play();
    return metalPipeSound;
}
if (localStorage.getItem('ratShown') === 'true'){
    ratPlaceBtn.textContent = 'Show rat';
}
ratPlaceBtn.addEventListener('click', (event) =>{
    localStorage.setItem('ratShown', 'true');
    let ratUrl = 'https://gifdb.com/images/high/stationary-rat-horizontal-spin-vi7xniwe61qse4i5.gif';
    let ratGif = document.createElement('img');
    ratGif.src = ratUrl;
    ratGif.id = 'ratSpinning';
    document.querySelector('.funny__main-bottom-row-rat-place-content').append(ratGif);
    playFreeBird();
    let id = startCountingRatTime();
    let btnSoundOff = document.createElement('button');
    btnSoundOff.classList.add('btn', 'funny__main-bottom-row-rat-place-btn', 'on');
    btnSoundOff.innerText = 'Sound off';
    btnSoundOff.addEventListener('click', (event) =>{
        if (btnSoundOff.classList.contains('on')){
            freeBird.pause();
            btnSoundOff.classList.remove('on');
            btnSoundOff.classList.add('off');
            btnSoundOff.innerText = 'Sound on';
        }else {
            if (btnSoundOff.classList.contains('off')) {
                freeBird.play();
                btnSoundOff.classList.remove('off');
                btnSoundOff.classList.add('on');
                btnSoundOff.innerText = 'Sound off';
            }
        }})
        let btnHideRat = document.createElement('button');
        btnHideRat.classList.add('btn', 'funny__main-bottom-row-rat-place-btn');
        btnHideRat.innerText = 'Hide Rat';
        btnHideRat.addEventListener('click', (event) =>{
            ratGif.remove();
            btnSoundOff.remove();
            btnHideRat.remove();
            freeBird.pause();
            stopCountingRatTime(id);
            ratPlaceBtn.textContent = 'Show rat';
            ratPlace.appendChild(ratPlaceBtn);
    })
    ratPlace.appendChild(btnSoundOff);
    ratPlace.appendChild(btnHideRat);
    ratPlaceBtn.remove();
})
 jokePlaceForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    let inputValue = document.getElementById('input').value;
    const postJoke = fetch('https://veryFunnyJokes.com',{
        method: 'POST',
        body:{
            joke: inputValue
        }
    }).catch((err) => console.log('bruh'))
     alert('You posted a very funny joke ')
 })

if (localStorage.getItem('pipeShown') === 'true'){
    pipePlaceBtn.textContent = 'Click for pipe';
}
pipePlaceBtn.addEventListener('click', (event) =>{
    localStorage.setItem('pipeShown', 'true');
    let pipePath = 'src/pictures/metalPipe.png';
    let pipeImg = document.createElement('img');
    pipeImg.src = pipePath;
    pipeImg.width = 600;
    pipeImg.height = 500;
    pipeImg.addEventListener('click', (event) =>{
        playMetalPipe();
        let pipeCount = Number(localStorage.getItem('pipeCount'));
        pipeCount++;
        pipeCountElem.textContent = 'You heard pipe ' + pipeCount +' times';
        localStorage.setItem('pipeCount' , pipeCount.toString());
    })
    pipePlaceBtn.remove();
    pipePlace.appendChild(pipeImg);
    const metalPipeSoundForCheckingIfEnded = playMetalPipe();
    let pipeCount = Number(localStorage.getItem('pipeCount'));
    pipeCount++;
    pipeCountElem.textContent = 'You heard pipe ' + pipeCount +' times';
    localStorage.setItem('pipeCount' , pipeCount.toString());
    metalPipeSoundForCheckingIfEnded.addEventListener('ended', (event) =>{
        pipeImg.remove();
        pipePlaceBtn.textContent = 'Click for pipe';
        pipePlace.appendChild(pipePlaceBtn);
    })
})
answerPlaceBtn.addEventListener('click', (event) =>{
    const answer = fetch('https://yesno.wtf/api').then((response) =>  response.json())
        .then((json) => json.image)
    let answerImage = document.createElement('img');
    answer.then((image) => answerImage.src = image);
    answerImage.width = 450;
    answerImage.height = 400;
    answerImage.addEventListener('click', (event) =>{
        answerImage.remove();
        answerPlace.appendChild(answerPlaceBtn);
    })
        let answerCount = Number(localStorage.getItem('answerCount'));
        answerCount++;
        answerCountElem.textContent = 'Answer requested ' + answerCount +' times';
        localStorage.setItem('answerCount' , answerCount.toString());
    answerPlaceBtn.remove();
    answerPlace.appendChild(answerImage);
})
