import { Link } from 'react-router-dom';

const DetailTabDesc = ({ desc }) => {
  return (
    <>
      {desc && (
        <div className="map-route">
          <section className="section-07">
            <div className="row">
              <div className="col-md-4 col-12 left">
                <div className="go-tour">
                  <div className="day day-01">
                    <div className="wrapper">
                      <span className="date-left"> Ngày </span>
                      <span className="date-center active">1</span>
                      <span className="date-right">
                        <span className="date">03/06/2023</span>
                        <span className="location">
                          TPHCM - SB NỘI BÀI (HÀ NỘI) - SAPA 02 bữa ăn: (Trưa,
                          Chiều)
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="day day-02">
                    <div className="wrapper">
                      <span className="date-left"> Ngày </span>
                      <span className="date-center active">2</span>
                      <span className="date-right">
                        <span className="date">04/06/2023</span>
                        <span className="location">
                          SAPA - FANSIPAN LEGEND - ĐÈO Ô QUY HỒ 03 bữa ăn:
                          (Sáng, Trưa, Chiều)
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="day day-03">
                    <div className="wrapper">
                      <span className="date-left"> Ngày </span>
                      <span className="date-center active">3</span>
                      <span className="date-right">
                        <span className="date">05/06/2023</span>
                        <span className="location">
                          SAPA - LÀO CAI - HÀ NỘI 03 bữa ăn: (Sáng, Trưa, Chiều)
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="day day-04">
                    <div className="wrapper">
                      <span className="date-left"> Ngày </span>
                      <span className="date-center active">4</span>
                      <span className="date-right">
                        <span className="date">06/06/2023</span>
                        <span className="location">
                          HÀ NỘI - HẠ LONG 03 Bữa ăn: (Sáng, Trưa, Chiều)
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="day day-05">
                    <div className="wrapper">
                      <span className="date-left"> Ngày </span>
                      <span className="date-center active">5</span>
                      <span className="date-right">
                        <span className="date">07/06/2023</span>
                        <span className="location">
                          HẠ LONG - NINH BÌNH 03 Bữa ăn: (Sáng, Trưa, Chiều)
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="day day-06">
                    <div className="wrapper">
                      <span className="date-left"> Ngày </span>
                      <span className="date-center active">6</span>
                      <span className="date-right">
                        <span className="date">08/06/2023</span>
                        <span className="location">
                          NINH BÌNH - SB NỘI BÀI 02 Bữa ăn: (Sáng, Trưa)
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="live-video hardCode d-none">
                  <Link to="#" className="video">
                    <i className="fad fa-play-circle"></i>
                    <label>Thuyết minh chương trình tour</label>
                  </Link>
                </div>
              </div>
              <div className="col-md-8 col-12 right timeline-section">
                <div>
                  <h3 id="day-01">
                    Ngày 1 - TPHCM - SB NỘI BÀI (HÀ NỘI) - SAPA 02 bữa ăn:
                    (Trưa, Chiều)
                  </h3>
                  <div className="excerpt">
                    <span className="line"></span>

                    <title></title>

                    <p style={{ textAlign: 'justify' }}>
                      Quý khách tập trung tại sân bay Tân Sơn Nhất (Ga nội địa),
                      hướng dẫn viên hỗ trợ khách làm thủ tục đáp chuyến bay đi
                      Hà Nội. Đến sân bay Nội Bài, xe và HDV{' '}
                      <Link to="#">Vietravel</Link> đón Quý khách đi khởi hành
                      theo cao tốc Hà Nội - Lào Cai đưa Quý khách đến phố núi{' '}
                      <Link to="#">Sapa</Link>. Trên đường, Quý khách dùng cơm
                      trưa tại nhà hàng địa phương. Đến nơi, Quý khách tham
                      quan:&nbsp;
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                      <strong>- Bản Cát Cát </strong>- đẹp như một bức tranh
                      giữa vùng phố cổ Sapa, nơi đây thu hút du khách bởi cầu
                      treo, thác nước, guồng nước và những mảng màu hoa mê hoặc
                      du khách khi lạc bước đến đây. Thăm những nếp nhà của
                      người Mông, Dao, Giáy trong bản, du khách sẽ không khỏi
                      ngỡ ngàng trước vẻ đẹp mộng mị của một trong những ngôi
                      làng cổ đẹp nhất Sapa.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                      Quý khách dùng cơm tối và nhận phòng nghỉ ngơi hoặc tự do
                      dạo phố ngắm<strong> nhà thờ Đá Sapa</strong>, tự do
                      thưởng thức đặc sản vùng cao như:{' '}
                      <strong>
                        thịt lợn cắp nách nướng, trứng nướng, rượu táo mèo, giao
                        lưu với người dân tộc vùng cao.
                      </strong>
                    </p>
                    <p style={{ textAlign: 'right' }}>
                      <strong>Nghỉ đêm tại Sapa</strong>
                    </p>
                    <p style={{ textAlign: 'right' }}>&nbsp;</p>
                  </div>
                  <div className="group-services hashCode d-none">
                    <div className="item">
                      <i className="icon icon--calendar"></i>
                      <label>Khách sạn</label>
                      <p>VinOasis Phú Quốc</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--fire"></i>
                      <label>Bữa ăn</label>
                      <p>1 bửa trưa, 1 bửa tối.</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--map"></i>
                      <label>Điểm tham quan</label>
                      <p>1 địa điểm</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 id="day-02">
                    Ngày 2 - SAPA - FANSIPAN LEGEND - ĐÈO Ô QUY HỒ 03 bữa ăn:
                    (Sáng, Trưa, Chiều)
                  </h3>
                  <div className="excerpt">
                    <span className="line"></span>

                    <title></title>

                    <p style={{ textAlign: 'justify' }}>
                      Quý khách dùng điểm tâm sáng tại khách sạn. xe đưa đoàn ra
                      ga <Link to="#">Sapa</Link>, Quý khách trải nghiệm đến khu{' '}
                      <Link to="#">du lịch</Link>{' '}
                      <strong>Fansipan Legend</strong> bằng{' '}
                      <strong>Tàu hỏa leo núi Mường Hoa</strong> hiện đại nhất
                      Việt Nam với tổng chiều dài gần 2000m, thưởng ngoạn bức
                      tranh phong cảnh đầy màu sắc của cánh rừng nguyên sinh,
                      thung lũng Mường Hoa.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                      - Chinh phục đỉnh núi Fansipan với độ cao 3.143m hùng vĩ
                      bằng cáp treo <em>(chi phí tự túc).</em>
                      &nbsp;
                      <br />- Lễ Phật tại <strong>chùa Trình</strong> hay cầu
                      phúc lộc, bình an cho gia đình tại
                      <strong> Bích Vân Thiền Tự</strong> trong hệ thống cảnh
                      quan tâm linh trên đỉnh Fansipan.&nbsp;
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                      Tiếp tục hành trình, Quý khách dùng cơm trưa và tham
                      quan:&nbsp;
                      <br />- Chinh phục đèo <strong>Ô Quy Hồ</strong> - con đèo
                      đẹp, hùng vĩ và dài nhất trong Tứ Đại Đỉnh Đèo miền Bắc.
                      <br />- Khu du lịch <strong>Cổng Trời Ô Quy Hồ</strong> -
                      một trong những điểm săn mây, ngắm hoàng hôn cực đẹp tại
                      Sapa.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                      Quý khách dùng cơm tối tại Sapa và tự do nghỉ ngơi.
                    </p>
                    <p style={{ textAlign: 'right' }}>
                      <strong>Nghỉ đêm tại Sapa.</strong>
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                      <br />
                      <strong>
                        <em>
                          <span style={{ color: '#e74c3c' }}>
                            Lưu ý: Trong trường hợp, Fansipan không hoạt động
                            chương trình sẽ được thay thế bằng điểm tham quan
                            Cầu Kính Rồng Mây (không bao gồm vé tham
                            quan).&nbsp;
                          </span>
                        </em>
                      </strong>
                      <br />
                      &nbsp;
                    </p>
                  </div>
                  <div className="group-services hashCode d-none">
                    <div className="item">
                      <i className="icon icon--calendar"></i>
                      <label>Khách sạn</label>
                      <p>VinOasis Phú Quốc</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--fire"></i>
                      <label>Bữa ăn</label>
                      <p>1 bửa trưa, 1 bửa tối.</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--map"></i>
                      <label>Điểm tham quan</label>
                      <p>1 địa điểm</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 id="day-03">
                    Ngày 3 - SAPA - LÀO CAI - HÀ NỘI 03 bữa ăn: (Sáng, Trưa,
                    Chiều)
                  </h3>
                  <div className="excerpt">
                    <span className="line"></span>

                    <title></title>

                    <p style={{ textAlign: 'justify' }}>
                      Quý khách ăn sáng và trả phòng khách sạn. Xe khởi hành đưa
                      Quý khách về Hà Nội, trên đường dừng tham quan mua sắm tại
                      Siêu thị Du lịch nông nghiệp Ocop Phú Thọ - chợ Tp Việt
                      Trì.và dùng cơm trưa tại nhà hàng địa phương. Đến Hà Nội
                      nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan{' '}
                      <strong>Hồ Hoàn Kiếm </strong>ngắm bên ngoài{' '}
                      <strong>Tháp Rùa, Đền Ngọc Sơn, Cầu Thê Húc.</strong>
                    </p>
                    <p style={{ textAlign: 'right' }}>
                      <br />
                      <strong>Nghỉ đêm tại Hà Nội.</strong>
                    </p>
                  </div>
                  <div className="group-services hashCode d-none">
                    <div className="item">
                      <i className="icon icon--calendar"></i>
                      <label>Khách sạn</label>
                      <p>VinOasis Phú Quốc</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--fire"></i>
                      <label>Bữa ăn</label>
                      <p>1 bửa trưa, 1 bửa tối.</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--map"></i>
                      <label>Điểm tham quan</label>
                      <p>1 địa điểm</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 id="day-04">
                    Ngày 4 - HÀ NỘI - HẠ LONG 03 Bữa ăn: (Sáng, Trưa, Chiều)
                  </h3>
                  <div className="excerpt">
                    <span className="line"></span>

                    <title></title>

                    <p style={{ textAlign: 'justify' }}>
                      Quý khách ăn sáng và trả phòng. &nbsp;Xe khởi hành đưa Quý
                      khách đi tham quan:
                      <br />
                      <strong>- Lăng Hồ Chủ Tịch </strong>(không viếng vào thứ
                      2, thứ 6 hàng tuần và giai đoạn bảo trì định kì hàng năm
                      15/6 - 15/8) tham quan và tìm hiểu cuộc đời và sự nghiệp
                      của vị cha già dân tộc tại Nhà Sàn Bác Hồ, Bảo Tàng Hồ Chí
                      Minh, Chùa Một Cột.
                      <br />
                      <br />
                      Tiếp tục hành trình, xe đưa Quý Khách đi Hạ Long, trên
                      đường tham quan <strong>Danh thắng Yên Tử:</strong>
                      <br />- Quý khách{' '}
                      <strong>
                        lên cáp treo du ngoạn thắng cảnh thiên nhiên Đông Yên Tử{' '}
                      </strong>
                      (chi phí cáp treo tự túc), nơi còn lưu giữ nhiều di tích
                      lịch sử mệnh danh “Đất tổ Phật giáo Việt Nam”, chiêm bái
                      <strong> chùa Một Mái, chùa Hoa Yên</strong> - nơi tu hành
                      của phật hoàng Trần Nhân Tông khai sinh ra dòng mới Thiền
                      Phái Trúc Lâm, nằm trên lưng chừng núi ở độ cao 516m. Vào
                      tháng 2-3 hàng năm, Núi Yên Tử sẽ khoác lên mình chiếc áo
                      cà sa vàng rực rỡ của <strong>“Đại lão mai vàng”</strong>,
                      thu hút hàng ngàn du khách đến thưởng ngoạn phong cảnh
                      hùng vĩ của dãy Yên Tử.&nbsp;
                    </p>
                    <p style={{ textAlign: 'right' }}>
                      <br />
                      <strong>Nghỉ đêm tại Hạ Long.</strong>
                    </p>
                  </div>
                  <div className="group-services hashCode d-none">
                    <div className="item">
                      <i className="icon icon--calendar"></i>
                      <label>Khách sạn</label>
                      <p>VinOasis Phú Quốc</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--fire"></i>
                      <label>Bữa ăn</label>
                      <p>1 bửa trưa, 1 bửa tối.</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--map"></i>
                      <label>Điểm tham quan</label>
                      <p>1 địa điểm</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 id="day-05">
                    Ngày 5 - HẠ LONG - NINH BÌNH 03 Bữa ăn: (Sáng, Trưa, Chiều)
                  </h3>
                  <div className="excerpt">
                    <span className="line"></span>

                    <title></title>

                    <p style={{ textAlign: 'justify' }}>
                      Quý khách ăn sáng và trả phòng khách sạn. Xe đưa quý khách
                      ra bến tàu, xuống thuyền du ngoạn{' '}
                      <strong>Vịnh Hạ Long </strong>- Thắng cảnh thiên nhiên
                      tuyệt đẹp và vô cùng sống động, được UNESCO công nhận là
                      di sản thiên nhiên Thế giới năm 1994.&nbsp;
                      <br />
                      <strong>- Động Thiên Cung l</strong>à một trong những động
                      đẹp nhất ở Hạ Long. Vẻ đẹp nguy nga và lộng lẫy bởi những
                      lớp thạch nhũ và những luồng ánh sáng lung linh.
                      <br />- Từ trên tàu ngắm nhìn các hòn đảo lớn nhỏ trong
                      Vịnh Hạ Long: <strong>Hòn Gà Chọi, Hòn Lư Hương.</strong>
                      <br />
                      <br />
                      Sau đó khởi hành đi Ninh Bình, đến nơi tham quan:
                      <br />
                      <strong>- Tuyệt Tịnh Cốc</strong>: nằm giữa mảnh đất cố đô
                      Hoa Lư (Ninh Bình), nơi đây có động Am Tiên ẩn mình giữa
                      lưng chừng núi và còn được mệnh danh là “thiên đường nơi
                      hạ giới”.
                      <br />
                      Quý khách dùng cơm tối và nhận phòng khách sạn nghỉ ngơi.
                    </p>
                    <p style={{ textAlign: 'right' }}>
                      <br />
                      <strong>Nghỉ đêm tại Ninh Bình.</strong>
                      <br />
                      &nbsp;
                    </p>
                  </div>
                  <div className="group-services hashCode d-none">
                    <div className="item">
                      <i className="icon icon--calendar"></i>
                      <label>Khách sạn</label>
                      <p>VinOasis Phú Quốc</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--fire"></i>
                      <label>Bữa ăn</label>
                      <p>1 bửa trưa, 1 bửa tối.</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--map"></i>
                      <label>Điểm tham quan</label>
                      <p>1 địa điểm</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 id="day-06">
                    Ngày 6 - NINH BÌNH - SB NỘI BÀI 02 Bữa ăn: (Sáng, Trưa)
                  </h3>
                  <div className="excerpt">
                    <span className="line"></span>

                    <title></title>

                    <p style={{ textAlign: 'justify' }}>
                      Quý khách ăn sáng và trả phòng khách sạn. Xe đưa quý khách
                      tham quan
                      <br />
                      <strong>
                        - Khu Du Lịch <Link to="#">Tràng An</Link>:
                      </strong>{' '}
                      Quý khách lên thuyền truyền thống đi tham quan thắng cảnh
                      hệ thống núi đá vôi hùng vĩ và các thung lũng ngập nước,
                      thông với nhau bởi các dòng suối tạo nên các hang động
                      ngập nước quanh năm. Điểm xuyến trong không gian hoang sơ,
                      tĩnh lặng là hình ảnh rêu phong, cổ kính của các mái đình,
                      đền, phủ nằm nép mình dưới chân các dãy núi cao.
                      <br />
                      <br />
                      <strong>
                        - <Link to="#">Chùa Bái Đính</Link>,{' '}
                      </strong>
                      một quần thể chùa với nhiều kỷ lục Việt Nam như pho tượng
                      phật Di Lặc bằng đồng nặng 80 tấn, hành lang với 500 tượng
                      vị La Hán, tòa Bảo Tháp cao 99m…&nbsp;
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                      Tiếp tục hành trình, xe khởi hành đưa Quý khách ra sân bay
                      Nội Bài làm thủ tục đón chuyến bay về Tp.HCM. Chia tay Quý
                      khách và kết thúc chương trình <Link to="#">du lịch</Link>{' '}
                      tại sân bay Tân Sơn Nhất.
                    </p>
                    <p style={{ textAlign: 'center' }}>
                      <br />
                      <strong>
                        KẾT THÚC CHƯƠNG TRÌNH, TẠM BIỆT QUÝ KHÁCH!
                      </strong>
                    </p>
                    <p style={{ textAlign: 'center' }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify' }}>
                      <strong>*Lưu ý:</strong>
                      <br />
                      - Hành trình có thể thay đổi thứ tự điểm đến tùy vào điều
                      kiện thực tế.&nbsp;
                      <br />
                      - Lịch trình tham quan (tắm biển, ngắm hoa, trải
                      nghiệm,...) rất dễ bị ảnh hưởng bởi thời tiết. Đây là
                      trường hợp bất khả kháng mong Quý khách hiểu và thông cảm.
                      <br />
                      - Khách Sạn có thể ở xa trung tâm thành phố vào các mùa
                      Cao Điểm.
                      <br />- Vì những yêu tố khách quan trong giai đoạn này,
                      điểm tham quan có thể đóng cửa và được thay bằng điểm khác
                      phù hợp với chương trình.
                    </p>
                  </div>
                  <div className="group-services hashCode d-none">
                    <div className="item">
                      <i className="icon icon--calendar"></i>
                      <label>Khách sạn</label>
                      <p>VinOasis Phú Quốc</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--fire"></i>
                      <label>Bữa ăn</label>
                      <p>1 bửa trưa, 1 bửa tối.</p>
                    </div>
                    <div className="item">
                      <i className="icon icon--map"></i>
                      <label>Điểm tham quan</label>
                      <p>1 địa điểm</p>
                    </div>
                  </div>
                </div>
                <div>
                  <title></title>

                  <h2 style={{ textAlign: 'justify' }}>
                    <span style={{ color: '#e74c3c' }}>
                      <strong>Lưu ý:</strong>
                    </span>
                  </h2>
                  <ul>
                    <li style={{ textAlign: 'justify' }}>
                      Việc điều chỉnh yêu cầu xét nghiệm covid và mũi tiêm có
                      thể sẽ thay đổi theo quy định hiện hành của Cơ quan Quản
                      lý Nhà nước có thẩm quyền. Vui lòng liên hệ nhân viên tư
                      vấn để biết thêm chi tiết.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {!desc && <p className="text-secondary">- Chưa có thông tin chi tiết.</p>}
    </>
  );
};

export default DetailTabDesc;
