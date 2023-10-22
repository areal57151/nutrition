
import './App.css';
import { useState, useEffect } from "react";
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";
import Swal from 'sweetalert2';

function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  //const APP_ID = 'e025f6f1';
  //const APP_KEY = 'd919faf9598dfb8f4d6973f0de6fa0b5	— ';
  //const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const fetchData = async (ingr) => {
    setStateLoader(true);

  const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=e025f6f1&app_key=d919faf9598dfb8f4d6973f0de6fa0b5`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      Swal.fire({
        title: 'ingredients entered incorrectly',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } 
  }
  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }
  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }
  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])
  return (
    <div className="App">
      <div className='text'>
        <h1>Nutrition Analysis</h1>
        {stateLoader && <LoaderPage/>}
       <form onSubmit={finalSearch}>  
          <input placeholder="Search..."
             onChange={myRecipeSearch} className='input'/>
           <button type="submit" className='button'>Search</button> 
       </form>
      <div >  
        {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
          .splice(0,9)
          .map(({label, quantity, unit}) =>
              <Nutrition  key={label}
                label= {label}
                quantity= {Math.round(quantity)}
                unit={unit}
                />
          )
        }
        </div>
   </div>
   </div>
  );
}

export default App;
