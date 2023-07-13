import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import { EffectCoverflow, Pagination } from 'swiper'; // import required modules
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './Discover.css';
import useHttp from 'hooks/use-http';

const Discover = () => {
  const navigate = useNavigate();
  // State lưu kết quả fetch
  const [locations, setLocations] = useState([]);

  // Lấy ra url cần Fetch từ state redux
  const urlFetch = useSelector(state => state.api.getAllLocations);

  //--- dùng custom hooks: useHttp()
  const { isLoading, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      // set data trả về với 6 phần tử đầu tiên
      setLocations(data.locations.slice(0, 8));
    };
    fetchData({ url: urlFetch }, transformData);
  }, [fetchData, urlFetch]);

  return (
    <section className="home-discover py-5">
      <div className="container">
        <header className="text-center">
          <p className="small text-muted small text-uppercase mb-1">
            Discover The Most
          </p>
          <h4
            className="h5 fw-bold text-uppercase mb-4"
            style={{ letterSpacing: '0.1em' }}
          >
            Attractive Places
            <div className="hr mb-0"></div>
          </h4>
        </header>

        {!isLoading && locations?.length !== 0 && (
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            loop={true}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {/* nên có 8 <SwiperSlide> để hiển thị đầy đủ ảnh */}
            {locations.map(loc => {
              return (
                <SwiperSlide key={loc._id}>
                  <div
                    className="image-wrapper"
                    onClick={() => {
                      navigate(`/shop?page=1&locationId=${loc._id}`, {
                        state: { locName: loc.name },
                      });
                    }}
                  >
                    <img src={loc.img} alt={loc._id} />
                    <div className="image-overlay">{loc.name}</div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Discover;
