import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Stack, Typography, Slider, TextField, Card } from "@mui/material";


const FilterPage = ({ data, data1 }) => {
  console.log("props", data1)

  const [filterdata, setFilterdata] = useState({ start_date: "", end_date: "", city: "", property_type: "" });
  const [minNum, setMinNum] = useState(1000);
  const [maxNum, setMaxNum] = useState(100000);
  const [property_data, setProperty_data] = useState([])
  const [priceRangeValue, setPriceRangeValue] = useState([1000, 10000]);
  const minmin = 0;
  const maxmax = 50000;


  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  };


  let name, value;
  const handleInput = (e) => {
    name = e.target.name
    value = e.target.value
    setFilterdata({ ...filterdata, [name]: value })  //[] dynamic data for
  }

  const searchApi = () => {
    console.log("property_data", property_data)
    console.log("filterdata", filterdata)

    const start_date = new Date(filterdata.start_date);
    const end_date = new Date(filterdata.end_date);

    console.log("start_date", start_date)
    console.log("end_Date", end_date)

    const inputDate = new Date(start_date);
    const inputDate2 = new Date(end_date);


    // Convert the date to the ISO format ("YYYY-MM-DDTHH:mm:ss.sssZ")
    const isoDateStr = inputDate.toISOString();
    const isoDateStr2 = inputDate2.toISOString();


    const result = data1.filter((item) =>
      (item.address.city == filterdata.city) ||
      (item.property_type == filterdata.property_type) ||
      (item.price < maxNum) && (item.price > minNum) ||
      (item.available_date >= isoDateStr) && (item.available_date <= isoDateStr2)
    );

    console.log("result", result);
    data(result)

  }

  return (
    <>


      <div className="mb-2 row" style={{ backgroundColor: "gray", padding: "10px" }}>
        <div className="col-sm-2">
          <label> Select City</label> <br />
          <select className="form-select" id="city" onChange={handleInput} name="city" aria-label="select example">
            <option selected>City</option>
            <option value="delhi">delhi</option>
            <option value="Agra">Agra</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        <div className="col-sm-2">
          <label>Availabe From</label>
          <input type="Date"
            className="form-control"
            id="start_date"
            onChange={handleInput}
            name='start_date'
            placeholder="start_date.." />
        </div>

        <div className="col-sm-2">
          <label>Availabe End</label>
          <input type="Date"
            className="form-control"
            id="end_date"
            onChange={handleInput}
            name='end_date'
            placeholder="end_date.." />
        </div>

        <div className="col-sm-2">
          <label> Price </label>
          <Slider
            getAriaLabel={() => "Price range"}
            value={priceRangeValue}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={minmin}
            max={maxmax}
          />
          <Stack direction="row" justifyContent="space-evenly" alignItems="center">
            <TextField
              label="min"
              type="number"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ width: "90px" }}
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
        </div>

        <div className="col-sm-2">
          <label> property_type</label>
          <select className="form-select" id="property_type" onChange={handleInput} name="property_type" aria-label="select example">
            <option selected>property_type</option>
            <option value="flats">flats</option>
            <option value="office space">office space</option>
            <option value="commerical shop">commerical shop</option>
            <option value="house">house</option>
            <option value="villa">villa</option>
          </select>
        </div>

        <div className="col-sm-2">
          <button onClick={searchApi}>
            Apply
          </button>
        </div>
      </div>

    </>
  );
}

export default FilterPage;



