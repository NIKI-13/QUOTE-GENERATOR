const qContainer = document.getElementById('q_container');
const qText = document.getElementById('quote');
const authorText = document.getElementById('author');
const socialMedia = document.getElementById('social_media');
const newQuoteBtn = document.getElementById('new_btn');
const loader = document.getElementById('loader');

//==========================================GLOBAL VARIABLE
var apiQuotes = [];

//=============================SHOW LOADING AND HIDE THE QCONTAINER
function loading(){
    loader.hidden = false;
    qContainer.hidden = true;
}

//=============================HIDE LOADING AND SHOW THE QCONTAINER
function complete(){
    loader.hidden = true;
    qContainer.hidden = false;
}

//===========================================SHOW NEW QUOTE
function newQuote(){
    //================================CALL THE LOADER
    loading();
    
    //PICK A RANDOM QUOTE FROM apiQuotes ARRAY
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //IF THERE IS NO AUTHOR DISPLAY 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }

    //IF THE QUOTE IS TOO LONG, MAKE THE TEXT SMALLER
    //BY APPLYING THE CORRECT ID FROM CSS
    if(quote.text.length > 120){
        qText.classList.add('long-quote');
    }
    else{
        qText.classList.remove('long-quote');
    }
    //=======================================SET QUOTE
    qText.textContent = quote.text;
    //=====================================HIDE LOADER
    complete();
}

//=============================================================================GET QUOTES FROM API

async function getQuotes(){
    //================================CALL THE LOADER
    loading();

    const API_URL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(API_URL);
        apiQuotes = await response.json();
        //console.log(apiQuotes);
        newQuote();

    } 
    catch (error){
        //CATCH ERROR HERE
    }
}

//===================================================================================TWEET QUOTE
function tweetQ() {
    const twitUrl = `https://twitter.com/intent/tweet?text=${qText.textContent} - ${authorText.textContent}`;
    // _blank --->THIS IS TO OPEN THE TWITTER WINDOW IN A NEW TAB
    window.open(twitUrl, '_blank');
}

//===============================================================================EVENT LISTENERS
newQuoteBtn.addEventListener('click', newQuote);
socialMedia.addEventListener('click', tweetQ);


//====================================================================RUN THIS FUNCTION ON LOAD
getQuotes();
