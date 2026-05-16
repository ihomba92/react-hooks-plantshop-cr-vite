import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import {useState, useEffect} from "react";

function PlantPage() {
const [plants, setPlants] = useState([]);
const[searchTerm, setSearchTerm] = useState("");


useEffect(() => {
  fetch("http://localhost:6001/plants")
  .then((response) => {
    if(!response.ok){throw new Error ("An issue with fetch")}
    else{return response.json()}
  })
  .then((data) => setPlants(data))
  .catch((error) => console.error("An error was encounted", error))
}, []);

//function to handle new plant after POST
  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }
// function to handle search input and filter plants
function handleSearch(term) {
  setSearchTerm(term);
};
const filteredPlants = plants.filter((plant) => 
  plant.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} searchTerm={searchTerm} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
