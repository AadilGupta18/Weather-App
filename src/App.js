import React, { useEffect, useState } from "react";
import "./App.css";
import Data from "./Data";

const App = () => {
  const API = "8e944d47bafb41d2b5a173932220606";
  const URL = "http://api.weatherapi.com/v1/current.json?key=" + API + "&q=";
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const success = (pos) => {
    const { latitude, longitude } = pos.coords;
    console.log(latitude, longitude);
    fetch(URL + latitude + "," + longitude)
      .then((res) => res.json())
      .then((main) => setData(main));
    setLoading(false);
  };

  useEffect(() => {
    if (query == "") {
      getLocation();
    } else {
      setLoading(true);
      fetch(URL + query)
        .then((res) => res.json())
        .then((main) => setData(main));
      setLoading(false);
    }
  }, [query]);

  const getLocation = async () => {
    const position = await navigator.geolocation.getCurrentPosition(
      success,
      error
    );
  };

  const error = () => {
    setData({});
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="search place..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {loading ? (
        "Loading..."
      ) : (
        <Data
          image={data?.current?.condition?.icon}
          city={data?.location?.name}
          weather={data?.current?.condition.text}
          temperature={data?.current?.temp_c}
        />
      )}
    </div>
  );
};

export default App;
