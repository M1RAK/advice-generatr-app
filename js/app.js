const quote = document.getElementById('quote')
const quoteSearch = document.querySelector('#quote-text')
const searchBtn = document.querySelector('#quote-search i')
const diceBtn = document.getElementById('dice')
const nextBtn = document.querySelector('.icon-next')
const prevBtn = document.querySelector('.icon-previous')
const id = document.getElementById('_id')
const error = document.getElementById('error')

let ADVICE_API_URL = "https://api.adviceslip.com/advice"

const fetchRandomQuote = async () => {
   await fetch(ADVICE_API_URL)
    .then(res => res.json())
    .then(data => displayQuote(data.slip));
}

let QUOTES = [];
const fetchSearchQuote = async () => {
 let searchTerm = quoteSearch.value;
 let SEARCH_URL = `https://api.adviceslip.com/advice/search/${searchTerm}`
   if(searchTerm){
   await fetch(SEARCH_URL)
    .then(res => res.json())
    .then(data => QUOTES = data.slips) 
     displaySearchQuotes(QUOTES,0)  
   }  
}

const displayQuote = (data) => {
   if(!data){
        id.textContent = '#117'
        quote.textContent =  `"
        It is easy to sit up and take notice,
        what's difficult is getting up and taking action.
        "`}
      clearButtons()
        id.textContent =  `#${data.id}`
        quote.textContent =  `"${data.advice}"`
}

let index = 0
const toggleCount = (number) => {
    index += number;
    if(index === QUOTES.length) index = 0;
    if(index < 0) index = QUOTES.length -1;
    displaySearchQuotes(QUOTES,index)
}

const clearButtons = () =>{
  nextBtn.style.display = 'none';
  prevBtn.style.display = 'none';
  error.style.display = 'none'
}

const displaySearchQuotes = (data,index) =>{
  // ERR HANDLER
  if(data === undefined) {
    error.style.display = 'block'
    setTimeout(() => {
         clearButtons()
    },1500)
    return
  }
// CLEAR INPUT
  if(data){
    if(data.length > 1){ 
        nextBtn.style.display = 'block';
        prevBtn.style.display = 'block';
        id.textContent = `#${data[index].id}`
        quote.textContent = `"${data[index].advice}"`
      }
      else if(data.length === 1){
        clearButtons()
        id.textContent =  `#${data[0].id}`
        quote.textContent =  `"${data[0].advice}"`
      }
  }

}



diceBtn.addEventListener("click",fetchRandomQuote)
searchBtn.addEventListener('click',fetchSearchQuote)