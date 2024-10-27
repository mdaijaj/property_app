import { useEffect, useState } from "react";
import React from "react";
import Cart from './property_list'
import FilterPage from './filter'


const Home = () => {
  const [property_data, setProperty_data] = useState([])


  const apiCall = async () => {
    const res = await fetch('/api/getall_property');
    const result = await res.json()
    setProperty_data(result.data)
  }

  useEffect(() => {
    apiCall()
  }, [])

  const updateData = (data) => {
    setProperty_data(data)
  }

  return (
    <>
      <div className="home">
      </div>
      <FilterPage data1={property_data} data={updateData} />
      <Cart data={property_data} />
    </>
  );
}

export default Home;



