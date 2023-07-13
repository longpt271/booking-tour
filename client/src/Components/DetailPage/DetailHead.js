import { handleImgError } from 'utils/imageUtils';

const DetailHead = ({ tourData, calcDisPrice }) => {
  return (
    <div className="entry-head">
      <section className="section-01">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-6 col-12 left">
              <h1 className="title">{tourData.name}</h1>
            </div>
            <div className="col-md-6 col-12 right">
              <div className="group-price">
                <div className="sale-price">
                  <p>
                    {tourData.count === 0 && (
                      <span className="fw-bold text-danger border border-danger rounded px-2 py-1 me-2">
                        SOLD OUT
                      </span>
                    )}
                    {tourData.discountId && tourData.count !== 0 && (
                      <span className="fw-bold text-danger border border-danger rounded px-2 py-1 me-2">
                        Giảm {tourData.discountId.percentOff}%
                      </span>
                    )}
                    <span className="price">
                      {calcDisPrice(tourData.discountId, tourData.adultPrice)}
                    </span>
                    / khách
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-02 pb-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12 left">
              <div className="image">
                <img
                  src={tourData.img1}
                  className="img-fluid"
                  alt="img 1"
                  onError={handleImgError}
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 right">
              <div className="row gy-4">
                <div className="col-md-12 col-sm-12 small">
                  <div className="row">
                    <div className="col-6">
                      <div className="image">
                        <img
                          src={tourData.img2}
                          className="img-fluid"
                          alt="img 2"
                          onError={handleImgError}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="image">
                        <img
                          src={tourData.img3}
                          className="img-fluid"
                          alt="img 3"
                          onError={handleImgError}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 big">
                  <div className="image">
                    <img
                      src={tourData.img4}
                      className="img-fluid"
                      alt="img 4"
                      onError={handleImgError}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailHead;
