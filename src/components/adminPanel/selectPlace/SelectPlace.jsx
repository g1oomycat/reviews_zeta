import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getPlaceList } from "../../../api/Place";
import { customStyles } from "../../../anyList/customSelect";

const SelectPlace = ({ setSelectedPlace, selectedPlace }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const request = async () => {
      try {
        const res = await getPlaceList();
        setOptions(
          [
            {
              value: "all",
              label: "Все",
            },
          ].concat(res.map((el) => ({ value: el.place, label: el.name })))
        );
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    request();
  }, []);
  return (
    <Select
      defaultValue={selectedPlace}
      onChange={setSelectedPlace}
      options={options}
      styles={customStyles}
    />
  );
};

export default SelectPlace;
