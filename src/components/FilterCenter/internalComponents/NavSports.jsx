import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import { Pagination } from "swiper";
// --- Styles Swiper ---
import "swiper/scss";
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/grid';
import { breakpoints } from "@mui/system";
import getAllSports from "helpers/sports/getAllSports";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const NavSports = ({ setSports: setSportsParent, sports: sportsParent }) => {
    const [sports, setSports] = useState(null)
    const [t, _] = useTranslation("global");

    useEffect(() => {
        getSports();
    }, [])

    const getSports = async () => {
        const sportsDB = await getAllSports()
        setSports(sportsDB)
    }

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const addSports = (e) => {

        if (sportsParent.indexOf(e, 0) === -1) {
            setSportsParent([...sportsParent, e])
        } else {
            const mySports = [...sportsParent]
            const filterSports = mySports.filter(sport => {
                if (sport !== e) return sport
            })
            setSportsParent(filterSports)
        }

    }
    return (
        <div className="filter_center--control-links">
            <Swiper
                slidesPerGroup={5}
                breakpoints={{
                    150: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    420: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    580: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    740: {
                        slidesPerView: 5,
                        spaceBetween: 40
                    },
                    880: {
                        slidesPerView: 6,
                        spaceBetween: 40
                    }
                }}
                speed={6000}
                direction={'horizontal'}
                loop={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 5000
                }}
            >
                {sports !== null ?
                    sports?.map((e, i) => {
                        const translation = `sports.${removeAccents(e.name)}`
                        const sport = { text: t(translation), id: e.id }
                        return (
                            <SwiperSlide className="filtercenter--sports" key={i}>
                                <button
                                    value={e.name}
                                    className={
                                        sportsParent.indexOf(e.name, 0) === -1 ?
                                            "filtercenter--sport-button" : "filtercenter--sport-button-added"
                                    }
                                    onClick={e => addSports(e.target.value)}
                                >
                                    {sport.text}
                                </button>
                            </SwiperSlide>
                        )
                    })
                    : null}
            </Swiper>
        </div>
    )
}