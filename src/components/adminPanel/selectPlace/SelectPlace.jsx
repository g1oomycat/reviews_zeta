import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getPlaceList } from "../../../api/Place";
import { customStyles } from "../../../anyList/customSelect";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const SelectPlace = observer(({ setSelectedPlace, selectedPlace }) => {
  const [options, setOptions] = useState([]);
  const { directorData, placeList } = useContext(Context);

  useEffect(() => {
    const changeOptions = () => {
      if (directorData.director.role === "admin") {
        setOptions(
          [
            {
              value: "all",
              label: "Все",
            },
          ].concat(
            placeList.placesData.map((el) => ({
              value: el.name,
              label: el.name,
            }))
          )
        );
      } else {
        setOptions(
          placeList.placesData.map((el) => ({
            value: el.name,
            label: el.name,
          }))
        );
      }
    };

    if (placeList.placesData.length) {
      changeOptions();
    }
  }, [placeList.placesData]);
  return (
    <Select
      value={selectedPlace}
      onChange={setSelectedPlace}
      options={options}
      styles={customStyles}
    />
  );
});

export default SelectPlace;
