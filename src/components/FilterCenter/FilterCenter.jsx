import { LateralButtons } from "./internalComponents/LateralButtons"
import { MultiRangeSlider } from "./internalComponents/MultiRangeSlider"
import { NavSports } from "./internalComponents/NavSports"
import { useEffect, useState } from "react"
import Map from "components/Map/Map"
import getCentersWithSports from "helpers/centers/getCentersWithSports"
import { distanceToPoint } from "./funcionality"

export const FilterCenter = ({ search }) => {
    //Params
    const [distance, setDistance] = useState(100); //nº entero 0-100
    const [adapt, setAdapt] = useState([]); //arr de Strings
    const [sports, setSports] = useState([]); //arr de Strings
    const [myPosition, setMyPosition] = useState({ lat: 0, long: 0 })
    //Data
    const [data, setData] = useState(null);
    const [dataFiltered, setDataFiltered] = useState(null);

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (data !== null) {
            filters();
        }
    }, [distance, adapt, sports, myPosition])

    const getData = async () => {
        if (search === 'center') {
            setData(await getCentersWithSports())
            setDataFiltered([])
        } else {
            setData(await getCentersWithSports())
            setDataFiltered([])
        }
    }

    const filters = () => {
        const myCenters = []
        for (const center of data) {
            let comp = false
            for (const sport of sports) {
                if (center.sports.indexOf(sport, 0) > -1) {
                    comp = true
                }
            }
            for (const discapacitie of adapt) {
                if (center[discapacitie] > -1) {
                    comp = true
                }
            }

            if (comp) {
                const myDistance = distanceToPoint(myPosition.lat, myPosition.long, center.latitude, center.longitude)
                if (myDistance < distance) {
                    myCenters.push(center)
                }
            }
        }

        setDataFiltered(myCenters)
    }

    return (
        <section className="filter_center--exterior-main">
            <NavSports sports={sports} setSports={setSports} />
            <div className="filter_center--body">
                <div className="filter_center--body-map">
                    {data !== null ? <Map data={dataFiltered} setMyPosition={setMyPosition} /> : null}
                </div>
                <LateralButtons adapt={adapt} setAdapt={setAdapt} />
            </div>
            <div className="filter_center--slider">
                <MultiRangeSlider value={distance} setValue={setDistance} />
            </div>

        </section>
    )
}

