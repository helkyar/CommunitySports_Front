import delUserEvent from "helpers/events/delUserEvent";
import getEvent from "helpers/events/getEvent";
import postUserEvent from "helpers/events/postUserEvent";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const EventDetail = () => {
  const { user, jwt } = useSession();
  const navigate = useNavigate();
  const [inscribed, setInscribed] = useState(false);
  const [event, setEvent] = useState(useLocation().state);

  useEffect(() => {
    async function fetchdata() {
      if (!event) {
        const idEvent = window.location.href.split("/detail/")[1];
        if (!idEvent) return;
        console.log("event", idEvent);
        const data = await getEvent(idEvent, jwt);
        console.log("DATA", data);
        setEvent(data.event);
      }
    }
    // if (user?.id) fetchdata();
    fetchdata();
  }, [user]);

  useEffect(() => {
    if (event) {
      setInscribed(
        event.users && event.users.some((userId) => userId === user?.id)
      );
    }
  }, [user]);

  const handleClick = () => {
    inscribed ? handleLeave() : handleInscription();
    setInscribed(!inscribed);
  };

  const handleInscription = async () => {
    console.log(event.id, "EVENTID");
    if (event?.id && user?.id) {
      await postUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  const handleLeave = async () => {
    if (event && user?.id) {
      await delUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  console.log(event);

  return (
    <>
      {event?.id ? (
        <div className="event-info">
          <p className="event-detail">
            <span className="event-propertie__name">{event.name}</span>
            <span className="event-propertie__time">{event.time}</span>
            <span className="event-propertie__direction">
              {event.direction}
            </span>
            <span className="event-propertie__email">{event.email} </span>
            <span className="event-propertie__hour">{event.hour}</span>
            <span className="event-propertie__organizer">
              {event.organizer}
            </span>
            <span className="event-propertie__sex">{event.sex}</span>
            <span className="event-propertie__mobility">
              ​{event.mobility} ​{" "}
            </span>
            <span className="event-propertie__magnetic">
              {event.ind_magnetica}
            </span>
            <span className="event-propertie__podotactile">
              {event.podotactile} ​{" "}
            </span>
            <span className="event-propertie__capacity">{event.capacity}</span>
            <span className="event-propertie__users">
              {event.users ? event.users.length : "0"}
            </span>
            {/* ​​ ​{event.id_center} {event.id_event} ​ {event.id_sport} {event.longitude} {event.latitude} */}
          </p>
          {user?.id && (
            <button onClick={() => handleClick()}>
              {inscribed ? "Abandonar " : "Inscribirme "}
            </button>
          )}
        </div>
      ) : (
        <h1>No hay evevntos disponibles</h1>
      )}
    </>
  );
};
