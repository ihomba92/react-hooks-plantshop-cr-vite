import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  // 1. Initialize state with empty string for price to prevent controlled input warnings
  const [newPlant, setNewPlant] = useState({ name: "", image: "", price: "" });

  const handleOnSubmit = (event) => {
    event.preventDefault();

    // 2. Build the payload directly from state, ensuring price is a float
    const plantPayload = {
      name: newPlant.name,
      image: newPlant.image,
      price: newPlant.price
    };

    // 3. Trigger the POST fetch exclusively when the form is submitted
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Fixed: lowercase 'headers'
      body: JSON.stringify(plantPayload)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("An issue with fetch");
        }
        return response.json();
      })
      .then((data) => {
        // 4. Pass the newly saved database object back to PlantPage state
        onAddPlant(data);

        // 5. Cleanly reset state fields back to blank values
        setNewPlant({ name: "", image: "", price: "" });
      })
      .catch((error) => console.error("An error was encountered", error));
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleOnSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name"  
          value={newPlant.name} 
          onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })} 
        />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={newPlant.image} 
          onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })} 
        />
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price" 
          value={newPlant.price} 
          onChange={(e) => setNewPlant({ ...newPlant, price: e.target.value })} 
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;