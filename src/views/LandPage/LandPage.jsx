import Map from "components/Map/Map";
import React from "react";
import datas from '../../assets/data/instalaciones.json'

export const LandPage = () => {
  const myhome = { lat: datas[0].Longitud, lng: datas[0].Latitud }

  return (
    <div className="landpage--main">
      <Map data={datas} home={myhome} />
    </div>
  );
};
