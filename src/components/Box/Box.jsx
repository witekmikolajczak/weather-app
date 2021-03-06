import { useRef, useState } from "react";
import { base_url } from "../../API/api";

import styles from "./Box.module.scss";
export const Box = (props) => {
  const city = useRef();

  const [forecast, setForecast] = useState();

  const search = async (evt) => {
    evt.preventDefault();
    const enteredCity = city.current.value;
    if (enteredCity !== "") {
      console.log("searching");
      await fetch(`${base_url}&q=${enteredCity}&days=3`)
        .then((response) => response.json())
        .then((result) => {
          setForecast(result.forecast);
          console.log(forecast);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Enter valid location");
    }

    props.forecastWeather(forecast);
  };

  return (
    <div className={styles.box}>
      <div className={styles.wrapper}>
        <form onSubmit={search}>
          <input type="text" placeholder="City" ref={city} />
          <button type="submit">Search Weather</button>
        </form>
      </div>
    </div>
  );
};
