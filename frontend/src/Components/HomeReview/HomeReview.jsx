import React from 'react';
import './HomeReview.css';

const testimonialsData = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    designation: "Sinh viên UEH",
    imageUrl: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-daniel.jpg",
    backgroundClass: "div1",
    heading: "UEH Shop mang đến trải nghiệm mua sắm tuyệt vời, đầy tiện ích!",
    review: "Tôi là sinh viên năm ba tại UEH và từ khi biết đến UEH Shop, tôi rất ấn tượng với sự tiện lợi mà trang web này mang lại. Các sản phẩm đa dạng, giá cả hợp lý, và dịch vụ khách hàng rất tuyệt vời. Đặt hàng nhanh chóng, giao hàng đúng thời gian và sản phẩm nhận được đều rất chất lượng."
  },
  {
    id: 2,
    name: "Trần Thị Mai",
    designation: "Sinh viên UEH",
    imageUrl: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-jonathan.jpg",
    backgroundClass: "div2",
    heading: "Dịch vụ khách hàng rất tốt và hỗ trợ tận tình",
    review: "Là một sinh viên năm cuối, tôi đã tìm thấy nhiều tài liệu học tập và sản phẩm cần thiết trên UEH Shop. Đội ngũ hỗ trợ rất nhanh chóng và nhiệt tình giải đáp các thắc mắc của tôi. Đây là một trong những đầu tư tốt nhất cho thời sinh viên của tôi."
  },
  {
    id: 3,
    name: "Lê Minh Tâm",
    designation: "Sinh viên UEH",
    imageUrl: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-kira.jpg",
    backgroundClass: "div3 dark",
    heading: "Trải nghiệm tuyệt vời, rất hài lòng với UEH Shop",
    review: "Tôi chưa từng có kinh nghiệm mua sắm trực tuyến trước đây, nhưng UEH Shop thật sự dễ sử dụng. Các sản phẩm được chia thành từng mục rõ ràng, quy trình thanh toán nhanh chóng và bảo mật. Nhờ UEH Shop, tôi đã có thể mua sắm dễ dàng hơn rất nhiều."
  },
  {
    id: 4,
    name: "Phạm Thanh Vân",
    designation: "Sinh viên UEH",
    imageUrl: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-jeanette.jpg",
    backgroundClass: "div4 dark",
    heading: "Một trải nghiệm mua sắm tuyệt vời và đáng nhớ",
    review: "Cảm ơn UEH Shop vì những trải nghiệm mua sắm tuyệt vời! Tôi đã có thể tìm được những sản phẩm mình cần một cách dễ dàng và nhanh chóng. Hiện tại, tôi có thể tự tin mua hàng trực tuyến và rất hài lòng với chất lượng sản phẩm."
  },
  {
    id: 5,
    name: "Hoàng Minh Phát",
    designation: "Sinh viên UEH",
    imageUrl: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-patrick.jpg",
    backgroundClass: "div5",
    heading: "Hỗ trợ tận tình và chất lượng sản phẩm tuyệt vời",
    review: "UEH Shop thật sự là một trang mua sắm đáng tin cậy. Nhân viên hỗ trợ rất quan tâm đến khách hàng và luôn sẵn sàng hỗ trợ khi tôi gặp khó khăn. Các sản phẩm ở đây rất chất lượng và giá cả hợp lý. Tôi rất vui khi biết đến UEH Shop!"
  }
];
const TestimonialsGrid = () => {
  return (
    <div className="outerdiv">
      <div className="innerdiv">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className={`eachdiv ${testimonial.backgroundClass}`}>
            <div className="userdetails">
              <div className="imgbox">
                <img src={testimonial.imageUrl} alt={testimonial.name} />
              </div>
              <div className="detbox">
                <p className={`name ${testimonial.backgroundClass.includes("dark") ? "dark" : ""}`}>{testimonial.name}</p>
                <p className={`designation ${testimonial.backgroundClass.includes("dark") ? "dark" : ""}`}>{testimonial.designation}</p>
              </div>
            </div>
            <div className={`review ${testimonial.backgroundClass.includes("dark") ? "dark" : ""}`}>
              <h4>{testimonial.heading}</h4>
              <p>{testimonial.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsGrid;
