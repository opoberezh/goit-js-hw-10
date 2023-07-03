 

 const BASE_URL = 'https://api.thecatapi.com/v1';
 const API_KEY = 'live_5rkPHvMPWKYY4CGUok12TUJMrinBSK72oXjLeWWkPnEJujwJ8DS6j9WtHn7clyGN';



 function fetchBreeds(){
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
       .then(response => {
          if(!response.ok){
           throw new Error(response.statusText);
          } 
          return response.json();
       });  
   }
   
   function fetchCatByBreed(breedId){
    return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
       .then(response => {
          if(!response.ok){
           throw new Error(response.statusText);
          } 
          return response.json();
       });  
   }

   

   export {fetchBreeds, fetchCatByBreed}