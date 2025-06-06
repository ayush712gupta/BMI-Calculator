import './App.css';
import React, { useState } from "react";

function App() {
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [bmi, setBMI] = useState('');
  const [message, setMessage] = useState('');
  const [unit, setUnit] = useState('metric');

  const calculateBMI = (e) => {
    e.preventDefault();

    const weightNum = parseFloat(weight);
    if (!weightNum || weightNum <= 0) {
      alert("Please enter a valid weight");
      return;
    }

    let bmiValue = 0;

    if (unit === 'metric') {
      const cm = parseFloat(heightCm);
      if (!cm || cm <= 0) {
        alert("Please enter a valid height in centimeters");
        return;
      }
      const heightInMeters = cm / 100;
      bmiValue = weightNum / (heightInMeters * heightInMeters);
    } else {
      const ft = parseFloat(heightFt);
      const inch = parseFloat(heightIn);
      if ((isNaN(ft) && ft !== 0) || (isNaN(inch) && inch !== 0) || ft < 0 || inch < 0) {
        alert("Please enter valid height in feet and inches");
        return;
      }
      const totalInches = (ft * 12) + inch;
      if (totalInches <= 0) {
        alert("Height must be greater than zero");
        return;
      }
      bmiValue = (weightNum * 703) / (totalInches * totalInches);
    }

    setBMI(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage("You are underweight");
    } else if (bmiValue < 25) {
      setMessage("You are in a healthy weight range");
    } else if (bmiValue < 30) {
      setMessage("You are overweight");
    } else {
      setMessage("You are obese");
    }
  };

  const reload = () => {
    setWeight('');
    setHeightCm('');
    setHeightFt('');
    setHeightIn('');
    setBMI('');
    setMessage('');
    setUnit('metric');
  };

  return (
    <div className="App">
      <div className="container">
        <h2>BMI Calculator</h2>
        <form onSubmit={calculateBMI}>
          <div>
            <label>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
            <input
              type="number"
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {unit === 'metric' ? (
            <div>
              <label>Height (cm)</label>
              <input
                type="number"
                placeholder="Enter height in centimeters"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <label>Height</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  placeholder="Feet"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Inches"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label>Unit</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, ft/in)</option>
            </select>
          </div>

          <div>
            <button className="btn" type="submit">Calculate</button>
            <button className="btn" type="button" onClick={reload}>Reload</button>
          </div>

          <div className="center">
            {bmi && (
              <>
                <h3>Your BMI is: {bmi}</h3>
                <p>{message}</p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
