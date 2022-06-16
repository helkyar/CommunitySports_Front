import Map from "components/Map/Map";
import { EventList } from "components/EventList";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import getCenterEvents from "helpers/events/getCenterEvents";
import getUserEvents from "helpers/events/getUserEvents";

export const Events = () => {
  const { jwt, user } = useSession();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const source = window.location.href.split("/events")[1];
    const fetchData = async () => {
      if (source.includes("/user") && user?.id) {
        const data = await getUserEvents(user.id, jwt);
        // console.log(data.events);
        setEvents(data.events);
      } else if (source.includes("/center")) {
        const id = source.split("/center/")[1];
        console.log("CENRTERS", id);
        const data = await getCenterEvents(id, jwt);
        console.log(data.events);
        setEvents(data.events);
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      {events[0] ? (
        <>
          {events.map((event, i) => (
            <EventList key={`event-${i}`} event={event} />
          ))}
        </>
      ) : (
        <h1 className="no-event"> NO HAY EVENTOS DISPONIBLES </h1>
      )}
      {/* <Map data={events} /> */}
    </>
  );
};

/* <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="sexo"
          value={event.sex}
          onChange={(e) => handleStateChange(e, "sex")}
        />
        <input
          type="text"
          placeholder="deporte"
          value={event.sport}
          onChange={(e) => handleStateChange(e, "sportid")}
        />
        <input
          type="text"
          placeholder="accesibilidad"
          value={event}
          onChange={(e) => handleStateChange(e, "accessibility")}
        />
        <input
          type="text"
          placeholder="nivel"
          value={event}
          onChange={(e) => handleStateChange(e, "level")}
        />
        <input
          type="text"
          placeholder="disponibilidad"
          value={event}
          onChange={(e) => handleStateChange(e, "date")}
        />
        <input
          type="text"
          placeholder="coste"
          value={event}
          onChange={(e) => handleStateChange(e, "cost")}
        />
        <button onClick={handleSearch}>Search</button>
      </form> */

// const handleCreate = async (e) => {
//   e.preventDefault();
//   setEvent((prevState) => {
//     let data = Object.assign({}, prevState);
//     data.author = user.id;
//     return data;
//   });
//   // validate all values
//   // This should be handled by map before selecting coordinates
//   await postEvent(event, jwt);
//   showMap(true);
// };

// const handleSearch = async (e) => {
//   e.preventDefault();
//   await getEvents(event, jwt);

//   setShowMap(true);
// };

// const handleStateChange = (e, key) => {
//   setEvent((prevState) => {
//     let data = Object.assign({}, prevState);
//     data[key] = e.target.value;
//     return data;
//   });
// };
