import React from 'react'
import "../styles/newForm.css";
function newForm() {
  return (
    <div>
      <div id="form-car-container" style={{ display: 'none', justifyContent: 'space-between' }}>
        <div className="form-container" id="predictionForm">
          <h1>enter new car </h1>
          <form>
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="color">Color:</label>
      <select id="color" name="color" onChange={(e) => setCarImageSrc(`images/car_${e.target.value}.png`)}>
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="model">Model:</label>
      <input type="text" id="model" name="model" required />
    </div>
  </div>
  
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="condition">Condition:</label>
      <select id="condition" name="condition" required>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="price">Price:</label>
      <input type="number" id="Price" name="Price" required />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label htmlFor="year">Year:</label>
      <input type="number" id="year" name="year" required />
    </div>
    <div className="form-group">
      <label htmlFor="engineSize">Engine Size:</label>
      <input type="number" id="engineSize" name="engineSize" step="0.1" required />
    </div>
  </div>

  <button type="submit" style={{ width: '100%', marginTop: '20px' }}>Predict Price</button>
</form>

        </div>
       
      </div>
      
    </div>
  )
}

export default newForm
