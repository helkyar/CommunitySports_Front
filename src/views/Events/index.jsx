import getEvents from "helpers/events/getEvents";
import postEvent from "helpers/events/postEvent";
import { useSession } from "helpers/session/useSession";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const eventData = [
  {
    id: "1",
    sportid: "11111",
    author: "111",
    accessibility: 2,
    date: new Date(),
    sex: "f",
    level: 5,
    placeid: "1111111111111",
    latitud: -3.7086993281311904,
    longitud: 40.47876758357458,
  },
  {
    id: "2",
    sportid: "22222",
    author: "222",
    accessibility: 3,
    date: new Date(),
    sex: "a",
    level: 2,
    placeid: "22222222222",
    latitud: -3.6737317205040503,
    longitud: 40.42810291538114,
  },
];

export const Events = () => {
  const { jwt, user } = useSession();
  const [event, setEvent] = useState({});
  const [showMap, setShowMap] = useState({});
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setEvent((prevState) => {
      let data = Object.assign({}, prevState);
      data.author = user.id;
      return data;
    });
    // validate all values

    await postEvent(event, jwt);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await getEvents(event, jwt);

    setShowMap(true);
  };

  const handleStateChange = (e, key) => {
    setEvent((prevState) => {
      let data = Object.assign({}, prevState);
      data[key] = e.target.value;
      return data;
    });
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="sexo"
          value={event.sex}
          onChange={(e) => handleStateChange(e, "sex")}
        />
        {/* Dynamic optained from back ID */}
        <input
          type="text"
          placeholder="deporte"
          value={event.sex}
          onChange={(e) => handleStateChange(e, "sportid")}
        />
        {/* ============================= */}
        <input
          type="text"
          placeholder="accesibilidad"
          value={event.sex}
          onChange={(e) => handleStateChange(e, "accessibility")}
        />
        <input
          type="text"
          placeholder="nivel"
          value={event.sex}
          onChange={(e) => handleStateChange(e, "level")}
        />
        <input
          type="text"
          placeholder="disponibilidad"
          value={event.sex}
          onChange={(e) => handleStateChange(e, "date")}
        />
        <input
          type="text"
          placeholder="coste"
          value={event.sex}
          onChange={(e) => handleStateChange(e, "cost")}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleCreate}>Create</button>
      </form>
      <button onClick={() => navigate("/")}>back</button>
      {/* <Map props={eventMap}/> */}
    </>
  );
};
