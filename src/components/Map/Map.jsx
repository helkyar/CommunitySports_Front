import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer, TransitLayer } from '@react-google-maps/api';
import house from '../../assets/img/home_icon.png';
import pin from '../../assets/img/chinche.png'
import { useTranslation } from "react-i18next"
import axios from 'axios'


const containerStyle = {
  width: '100%',
  height: '100%'
};

function Map({ data, homes, filter, setMyPosition }) {
  console.log(homes)
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MY_API_KEY
  })
  const [map, setMap] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 40.417163732639686, lng: -3.705418109893799 })
  const [zoomClick, setZoomClick] = useState(15)
  const [modalInfo, setModalInfo] = useState()
  const [markerId, setMarkerId] = useState()
  const [modal, setModal] = useState(false)

  useEffect(() => {

  }, [data])


  const onLoad = async () => {
    if (homes) {
      console.log('en if del homes')
      setMapCenter(homes)
    }
    else {
      console.log('en else del homes')
      function success(pos) {
        var crd = pos.coords;
        
        if (setMyPosition !== undefined) {
          setMyPosition({ lat: crd.latitude, long: crd.longitude })
        }
        setMapCenter({ lat: crd.latitude, lng: crd.longitude });
      };
      
      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        setMapCenter({ lat: 40.417163732639686, lng: -3.705418109893799 });
      };
      navigator.geolocation.getCurrentPosition(success, error);
    }
    }
    
  const handleForm = () => {
    console.log('open form')
  }


  const handleDrag = (e) => {
    if (setMyPosition !== undefined) setMyPosition({ lat: e.latLng.lat(e), long: e.latLng.lng(e) })
    setMapCenter({ lat: e.latLng.lat(e), lng: e.latLng.lng(e) })
  }

  const getInfo = (e) => {
    console.log(e)
  }

  const handleMarker = (e) => {
    setMarkerId(e.id)
    delete e.id;
    setModalInfo(e)
    setModal(true)
  }
  const getCoordenates = (e) => {
    if (setMyPosition !== undefined) {
      setMyPosition({ lat: e.latLng.lat(e), long: e.latLng.lng(e) })
    }
    console.log(e)
    console.log({ lat: e.latLng.lat(e), long: e.latLng.lng(e) })
  }

  return isLoaded ? (
    <main className="map--container"/* style={{width:"100vw",height:"90vh"}} */>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={homes || mapCenter}
        zoom={zoomClick}
        onLoad={onLoad}
        /* onLoad={map => setMap(map)} */
        onClick={getCoordenates}
      >
        { /* Child components, such as markers, info windows, etc. */}
        {!homes && <Marker
          position={mapCenter}
          draggable={true}
          onDragEnd={(e) => handleDrag(e)}
          title="your position"
          icon={pin}

        />}
        <MarkerClusterer averageCenter={true}>
          {(clusterer) => data.map((e, index) =>
            <Marker id={index} key={index}
              position={{ lat: e.latitude, lng: e.longitude }}
              clusterer={clusterer}
              onClick={() => handleMarker(e)}
              onMouseDown={getInfo}
            />)}
        </MarkerClusterer>
        <TransitLayer />
      </GoogleMap>
      {modal &&
        <div className="event--modal">
          <button type="button" onClick={() => setModal(false)}>X</button>
          <div className="event--modal-info">
            {Object.keys(modalInfo).map((e, index) =>
              <span className='event--modal-list-labels' key={`label${index}`}>{index===16? t('forms.date'):t(`forms.${e}`)}</span>
            )}
            {Object.values(modalInfo).map((e, index) =>
              (e === 0 || e === 1) ?
                <span className='event--modal-list-values' key={`value${index}`}>{e === 1 ? t(`forms.yes`) : t(`forms.no`)}</span> :
                <span className='event--modal-list-values' key={`value${index}`}>{index===16? new Date(e).toLocaleDateString():e}</span>
            )}
          </div>
          {modalInfo.capacity ? <button type="button" onClick={(e) => navigate(`/events/detail/${markerId}`)}>+ info</button> :
            <button type="button" onClick={(e) => navigate(`/centers/detail/${markerId}`)}>+ info</button>}
        </div>}
    </main>
  ) : <h1>Charging...</h1>
}

export default React.memo(Map)