import delUserEvent from "helpers/events/delUserEvent";
import postUserEvent from "helpers/events/postUserEvent";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"
import VisibilityIcon from '@mui/icons-material/Visibility';
import HearingIcon from '@mui/icons-material/Hearing';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import Map from '../../components/Map/Map'


export const EventList = ({ event }) => {
  const navigate = useNavigate();
  const { user, jwt } = useSession();
  const [inscribed, setInscribed] = useState(false);
  const [t] = useTranslation("global");

  useEffect(() => {
    setInscribed(
      event.users && event.users.some((userId) => userId === user?.id)
    );
  }, [user]);

  const handleClick = (event) => {
    inscribed ? handleLeave(event) : handleInscription(event);
    setInscribed(!inscribed);
  };

  const handleInscription = async (event) => {
    if (event && user?.id) {
      await postUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  const handleLeave = async (event) => {
    if (event && user?.id) {
      await delUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  console.log(event);

  return (
    <>
      {event?.id ? (
        <div className="event-info">
        <div className="event-info-detail">
          <span className="event-propertie__name">{event.name}</span>
          <span className="event-propertie__direction">
            {event.direction}
          </span>
          <span className="event-propertie__email">{event.email} </span>
          <span className="event-propertie__time">{new Date(event.time).toLocaleDateString()}</span>
          <span className="event-propertie__hour">{event.hour}</span>
          <span className="event-propertie__organizer">
            {event.organizer ? event.organizer : t(`forms.no-organizer`)}
          </span>
          <span className="event-propertie__sex">{event.sex}</span>

          {/* <span>
            <span className="event-propertie__capacity">{t(`forms.capacity`)}</span>
            <span className="event-propertie__capacity">  {event.capacity}</span>
          </span>
          <span>
            <span className="event-propertie__capacity">{t(`forms.places`)} </span>
            <span className="event-propertie__users">
              {event.users ? event.capacity - event.users.length : event.capacity}
            </span>
          </span> */}
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
              {!inscribed ? `${t("forms.leave")}` : `${t("forms.signIn")}`}
            </button>
          </div>
          {/*  )} */}
        </div>
        <div className="event--map"><Map data={[event]} homes={{ lat: event.latitude, lng: event.longitude }} /></div>
      </div>
      ) : (
        <h1>{t('no-events')}</h1>
      )}
    </>
  );
};
