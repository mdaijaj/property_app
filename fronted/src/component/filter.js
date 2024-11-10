import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Stack, Typography, Slider, TextField, Card } from "@mui/material";

const FilterPage = ({ data, data1 }) => {
  const [filterdata, setFilterdata] = useState({ start_date: "", end_date: "", city: "", property_type: "" });
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(200);
  const [priceRangeValue, setPriceRangeValue] = useState([0, 200]);
  const minmin = 0;
  const maxmax = 200;

  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  }; 

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFilterdata({ ...filterdata, [name]: value });
  };

  const filterApi = async () => {
    const result = data1.filter((item) =>
      (!filterdata.city || item.address.city.toLowerCase() === filterdata.city.toLowerCase()) &&
      (!filterdata.property_type || item.property_type === filterdata.property_type) &&
      item.price >= minNum && item.price <= maxNum
    );

    console.log("Filtered Results:", result);
    data(result);
  };

  return (
    <>
      <div className="mb-2 row" style={{ backgroundColor: "gray", padding: "20px" }}>
        <div className="col-sm-2">
          <label>Location</label><br />
          <input type="text" id="city" onChange={handleInput} name="city" aria-label="select example" placeholder="location." />
        </div>

        <div className="col-sm-2">
          <label>Property Type</label><br />
          <select className="form-select" id="property_type" onChange={handleInput} name="property_type" aria-label="select example">
            <option value="">Select Property Type</option>
            <option value="flat">Flat</option>
            <option value="office space">Office Space</option>
            <option value="commercial shop">Commercial Shop</option>
            <option value="plot">Plot</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
          </select>
        </div>

        <div className="col-sm-2">
          <label>Budget in Lakh</label>
          <Slider
            getAriaLabel={() => "Price range"}
            value={priceRangeValue}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={minmin}
            max={maxmax}
          />
        </div>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center">
          <TextField
            label="min"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}  
            sx={{ width: "90px"}}
            value={minNum}
            onChange={(e) => {
              setMinNum(Number(e.target.value));
              setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
            }}
          />
          <Typography>-</Typography>
          <TextField
            label="max"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ width: "90px" }}
            value={maxNum}
            onChange={(e) => {
              setMaxNum(Number(e.target.value));
              setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
            }}
          />
        </Stack>

        <div className="col-sm-2" style={{marginLeft: "30px", marginTop: "10px"}}>
          <button className="btn btn-success" onClick={filterApi}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPage;
