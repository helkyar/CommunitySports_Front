import delUserEvent from "helpers/events/delUserEvent";
import getEvent from "helpers/events/getEvent";
import postUserEvent from "helpers/events/postUserEvent";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"
import Map from '../../components/Map/Map'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HearingIcon from '@mui/icons-material/Hearing';


export const EventDetail = () => {
  const { user, jwt } = useSession();
  const navigate = useNavigate();
  const [inscribed, setInscribed] = useState(false);
  const [event, setEvent] = useState(useLocation().state);
  const [t] = useTranslation("global");

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

  };

  const handleInscription = async () => {
    console.log(event.id, "EVENTID");
    if (event?.id && user?.id) {
      try {
        await postUserEvent({ id_user: user.id, id_event: event.id }, jwt);
        setInscribed(!inscribed);
      } catch (err) {
        console.log(err);
      }

    }
  };

  const handleLeave = async () => {
    if (event && user?.id) {
      try {
        await delUserEvent({ id_user: user.id, id_event: event.id }, jwt);
        setInscribed(!inscribed);
      } catch (err) {
        console.log(err);
      }
    }
  };

  console.log(event);

  return (
    <>
      {event?.id ? (
        <div className="event-info">
          <div className="event-info-detail">
            <span className="event-propertie__name">{event.name}</span>
            <span className="event-propertie__time">{new Date(event.time).toLocaleDateString()}</span>
            <span className="event-propertie__direction">
              {event.direction}
            </span>
            <span className="event-propertie__email">{event.email} </span>
            <span className="event-propertie__hour">{event.hour}</span>
            <span className="event-propertie__organizer">
              {event.organizer ? event.organizer : t(`forms.no-organizer`)}
            </span>
            <span className="event-propertie__sex">{event.sex}</span>

            <span>
              <span className="event-propertie__capacity">{t(`forms.capacity`)}</span>
              <span className="event-propertie__capacity">  {event.capacity}</span>
            </span>
            <span>
              <span className="event-propertie__capacity">{t(`forms.places`)} </span>
              <span className="event-propertie__users">
                {event.users ? event.capacity - event.users.length : event.capacity}
              </span>
            </span>
            <div className="event-logos">
              {event.mobility === 1 ? <AccessibleForwardIcon /> : null}
              {event.podotactile === 1 ? <VisibilityIcon /> : null}
              {event.ind_magnetica === 1 ? <HearingIcon /> : null}
            </div>
            {/* ​​ ​{event.id_center} {event.id_event} ​ {event.id_sport} {event.longitude} {event.latitude} */}
            {/* </p> */}
            {/* {user?.id && ( */}
            <div className="event-info-button">
              <button onClick={() => handleClick()}>
                {inscribed ? `${t("forms.leave")}` : `${t("forms.signIn")}`}
              </button>
            </div>
            {/*  )} */}
          </div>
          <div className="event--map"><Map data={[event]} homes={{ lat: event.latitude, lng: event.longitude }} /></div>
        </div>
      ) : (
        <h1>No hay evevntos disponibles</h1>
      )}
    </>
  );
};
