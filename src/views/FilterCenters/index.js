import { useSession } from "helpers/session/useSession";
import { useForm } from "react-hook-form";
import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import centros from '../../assets/data/instalaciones.json'
import InputCustom from '../../components/forms/InputCustom'
import {SelectCustom} from '../../components/forms/SelectCustom'
import { useTranslation } from "react-i18next"
import Map from '../../components/Map/Map'
import getAllCenters from "helpers/centers/getAllCenters";

const schema = yup.object().shape({
  sport:yup
  .string()
  .trim()
  .min(6,'el campo debe tener minimo 6 caracteres')
  ,
  gender : yup
  .string()
  /* .required() */

})

export const FilterCenters = () => {
  const { jwt, user } = useSession();
  const [event, setEvent] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [centersFiltered, setCentersFiltered] = useState();
  const [centers, setCenters] = useState();
  const navigate = useNavigate();
  const [t] = useTranslation("global");
  const {
    control: controlFilter,
    handleSubmit,
    formState: { errors: errorsFilter },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getCenters = async()=> {
    const data = await getAllCenters();
    setCentersFiltered(data)
    setCenters(data)
    setShowMap(true)
  }

  const onSubmit = (data) => {
    let datafiltered = centers.filter(e=>(e.mobility === 1 || data.movility === "No") && 
    (e.podotactile=== 1 || data.podotactil === "No") && (e.ind_magnetica===1 || data.ind_magnetic === "No"))

    console.log(datafiltered)
    setCentersFiltered(datafiltered)
    setShowMap(true)
  }

  useEffect(() => {
    getCenters()
  }, []);

  return (
    <>
      <form className="login-form session-form" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="form-buttons">
          <button type="submit">{t("forms.search")}</button>
          <button onClick={() => navigate("/")}>{t("forms.back")}</button>
        </div>
      </form>
      {showMap && <div className="map-filtered"><Map data={centersFiltered}/></div> }
    </>
  );
};
