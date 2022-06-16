import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import { Pagination } from "swiper";
// --- Styles Swiper ---
import "swiper/scss";
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/grid';
import { Item } from "./internal/Item";

export const Carrousell = () => {


    const staticContent = [
        { text: 'hola' },
        { text: 'hola' },
        { text: 'hola' }
    ]

    SwiperCore.use([Autoplay]);
    return (
        <section className="carrousel--main">
            <Swiper
                speed={1000}
                direction={'horizontal'}
                slidesPerView={1}
                spaceBetween={10}
                slidesPerGroup={1}
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
                {staticContent.map((e, i) => <SwiperSlide className="swiper-slider" key={i}>
                    <Item />
                </SwiperSlide>)}
            </Swiper>
        </section>
    )
}

