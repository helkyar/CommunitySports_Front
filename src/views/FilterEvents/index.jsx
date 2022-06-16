import { useSession } from "helpers/session/useSession";
import { useForm } from "react-hook-form";
import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputCustom from '../../components/forms/InputCustom'
import {SelectCustom} from '../../components/forms/SelectCustom'
import {DateCustom} from '../../components/forms/DateCustom'
import { useTranslation } from "react-i18next"
import Map from '../../components/Map/Map'
import getAllEvents from '../../helpers/events/getAllEvents'


const schema = yup.object().shape({
  sport:yup
  .string()
  .trim()
  /* .min(6,'el campo debe tener minimo 6 caracteres') */
  ,
  gender : yup
  .string()
  /* .required() */

})

export const FilterEvents = () => {

  
  /* console.log(events.data) */
  const { jwt, user } = useSession();
  const [showMap, setShowMap] = useState(false);
  const [eventsFiltered, setEventsFiltered] = useState();
  const [eventsData, setEventsData] = useState();
  const navigate = useNavigate();
  const [t] = useTranslation("global");

  const getData = async () => {
    const data = await getAllEvents();
    let auxArray = [];
    data.forEach(e =>{
        let {id,accessibility, activity, author, capacity, direction, email, hour, 
          ind_magnetica, latitude, longitude, level, mobility, name, organizer, podotactile, sex, time} = {...e}

        auxArray.push({id:id,accessibility:accessibility,activity:activity,author:author,capacity:capacity,
          direction:direction,email:email,hour:hour,ind_magnetica:ind_magnetica,latitude:latitude,longitude:longitude,
          level:level,mobility:mobility,name:name,organizer:organizer,podotactile:podotactile,sex:sex,time:time})
    })
    setEventsFiltered(auxArray)
    setEventsData(auxArray)
    setShowMap(true)
  }
  const {
    control: controlFilter,
    handleSubmit,
    formState: { errors: errorsFilter },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {

    let datafiltered = eventsData.filter(e=>
      (e.sex.substring(0,2).toLowerCase() === data.sex.substring(0,2).toLowerCase() || data.sex === "") && 
      (e.mobility === 1 || data.movility === 'No') && 
      (e.podotactile === 1  || data.podotactil === 'No') && 
      (e.ind_magnetica === 1  || data.ind_magnetic === 'No') &&
      (data.date === undefined || data.date.toLocaleDateString() === new Date(e.time).toLocaleDateString())
    )
    setEventsFiltered(datafiltered)
    setShowMap(true)
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <form className="login-form session-form" onSubmit={handleSubmit(onSubmit)}>
        <SelectCustom
          name='sex'
          control={controlFilter}
          label={t("forms.sex")}
          id='gender-input'
          options={["",t("forms.maleTeam"),t("forms.femaleTeam"),t("forms.mixTeam")]}
        />
        <SelectCustom
          name='movility'
          control={controlFilter}
          label={t("forms.mobility")}
          id='movility-input'
          options={[t("forms.no"),t("forms.yes")]}
        />
        <SelectCustom
          name='podotactil'
          control={controlFilter}
          label={t("forms.podotactile")}
          id='podotactil-input'
          options={[t("forms.no"),t("forms.yes")]}
        />
        <SelectCustom
          name='ind_magnetic'
          control={controlFilter}
          label={t("forms.ind_magnetica")}
          id='ind_magnetic-input'
          options={[t("forms.no"),t("forms.yes")]}
          />
        <DateCustom
          name='date'
          type='date'
          label={t("forms.date")}
          errors={errorsFilter.date}
          control={controlFilter}
          id='date-input'
        />
        <div className="form-buttons">
          <button type="submit">{t("forms.search")}</button>
          <button onClick={() => navigate("/")}>{t("forms.back")}</button>
        </div>
      </form>
      {showMap && <div className="map-filtered"><Map data={eventsFiltered}/></div> }
    </>
  );
};
