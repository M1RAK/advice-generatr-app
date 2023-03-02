<!-- Pseudocode -->
The goal is to get the data based on user input,
if the user enters searchTerm, fetchUrl is changed
if res is > 1; then prev and next btns are displayed.
else they are removed.

const fetchSearchQuote = () => {
    let searchTerm = quoteSearch.value;
    let SEARCH_URL = `https://api.adviceslip.com/advice/search/${searchTerm}`
   if(searchTerm){
    fetch(SEARCH_URL)
    .then(res => res.json())
    .then(data => QUOTES = data.slips)
   }  
   displayQuote(QUOTES)
}



let index = 0;
const displayQuote = (data) => {
    if(data.length > 1){ 
      nextBtn.style.display = 'block';
      prevBtn.style.display = 'block';
    
      id.textContent = `#${data[index].id}`
      quote.textContent = `"${data[index].advice}"`
    }
    if(!data){
        id.textContent = '#117'
        quote.textContent =  `"
        It is easy to sit up and take notice,
        what's difficult is getting up and taking action.
        "`}
     id.textContent = `#${data.id}`
     quote.textContent = `"${data.advice}"`
}


const nextBtn = document.querySelector('.icon-next')
const prevBtn = document.querySelector('.icon-previous')


const toggleCount = (number) => {
    index += number;
    
}

nextBtn.addEventListener('click', () => {
    toggleCount(+1)
    displayQuote(QUOTES)
})

prevBtn.addEventListener('click',() => {
    toggleCount(-1)
    displayQuote(QUOTES)
})