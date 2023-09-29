import { useEffect, useState } from "react";
import React from "react";
import Cart from './cart'
import FilterPage from './filter'


const Home = () => {
  const [property_data, setProperty_data] = useState([])


  const apiCall = async () => {
    const res = await fetch('/api/getall_property');
    const result = await res.json()
    console.log("aijaj", result)
    setProperty_data(result.data)

  }

  useEffect(() => {
    apiCall()
  }, [])

  const updateData=(data) =>{
    console.log("kkkk", data)
    setProperty_data(data)
  }

  return (
    <>
      <div className="home">
        <h1>Welcome to Property Portal </h1>
        <h4>Search Properties for Rent </h4>
      </div>

      {console.log("property_data", property_data)}
      <FilterPage data1={property_data} data={updateData}/>
      <Cart data={property_data} />

    </>
  );
}

export default Home;



