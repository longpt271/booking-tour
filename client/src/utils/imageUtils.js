// hàm bắt error từ img, nếu link ảnh đã có lỗi
export const handleImgError = event => {
  event.preventDefault(); // Ngăn chặn hành vi mặc định khi xảy ra lỗi
  const defaultUrl = '/images/defaultImage.png';
  event.target.src = defaultUrl;
};
