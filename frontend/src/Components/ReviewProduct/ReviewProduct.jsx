import React, { useState } from 'react'; // Nhập useState
import './ReviewProduct.css';

export const ReviewProduct = () => {
  const [comment, setComment] = useState(''); // Khởi tạo state cho bình luận
  const [commentsList, setCommentsList] = useState([]); // Khởi tạo state cho danh sách bình luận
  const [rating, setRating] = useState(0); // Khởi tạo state cho số sao
  const [review, setReview] = useState(''); // Khởi tạo state cho nhận xét
  const [showRatingForm, setShowRatingForm] = useState(false); // Khởi tạo state cho việc hiển thị form đánh giá
  const [reviewsList, setReviewsList] = useState([]); // Khởi tạo state cho danh sách nhận xét

  const handleCommentChange = (e) => {
    setComment(e.target.value); // Cập nhật state khi người dùng nhập bình luận
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value); // Cập nhật state khi người dùng nhập nhận xét
  };

  const handleRatingClick = (star) => {
    setRating(star); // Cập nhật số sao khi người dùng nhấp vào
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) { // Kiểm tra xem bình luận có rỗng không
      setCommentsList([...commentsList, comment]); // Thêm bình luận vào danh sách
      setComment(''); // Xóa bình luận sau khi gửi
    }
  };

  const handleReviewSubmit = () => {
    if (review.trim() && rating > 0) { // Kiểm tra xem nhận xét có rỗng và đã chọn số sao chưa
      setReviewsList([...reviewsList, { comment: review, rating }]); // Thêm nhận xét vào danh sách
      setReview(''); // Xóa nhận xét sau khi gửi
      setRating(0); // Đặt lại số sao về 0
      setShowRatingForm(false); // Ẩn form đánh giá sau khi gửi
    }
  };

  // Tính toán chi tiết đánh giá
  const ratingCounts = [0, 0, 0, 0, 0];
  reviewsList.forEach(cmt => {
    ratingCounts[cmt.rating - 1] += 1;
  });

  return (
    <div>
      <div className="rating-section">
        <h3>Khách hàng đánh giá</h3>
        <div className="rating-summary">
          <div className="rating-number">
            <span className="rating-score">{reviewsList.length > 0 ? (reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / reviewsList.length).toFixed(1) : 'Chưa đánh giá'}</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{ color: star <= (reviewsList.length > 0 ? (reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / reviewsList.length) : 0) ? '#f4b400' : '#ccc' }} // Đổi màu sao đã chọn
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Thanh rating-details */}
        <div className="rating-details">
          <h4>Chi tiết đánh giá:</h4>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="rating-row">
              <span className="star-level">{star}★</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(ratingCounts[star - 1] / reviewsList.length) * 100 || 0}%` }}></div>
              </div>
              <span className="percent">{ratingCounts[star - 1]} đánh giá</span>
            </div>
          ))}
        </div>

        <div className="rating-action">
          <p>Chia sẻ nhận xét về sản phẩm</p>
          <button className="review-button" onClick={() => setShowRatingForm(true)}>ĐÁNH GIÁ VÀ NHẬN XÉT</button>
        </div>
      </div>

      {/* Form đánh giá */}
      {showRatingForm && (
        <div className="review-section">
          <h3>Đánh giá sản phẩm</h3>
          <div className="rating-stars">
            <p>Chọn số sao:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingClick(star)} // Xử lý khi người dùng nhấp vào sao
                style={{ cursor: 'pointer', color: star <= rating ? '#f4b400' : '#ccc' }} // Đổi màu sao đã chọn
              >
                ★
              </span>
            ))}
          </div>
          <div className="comment-box">
            <textarea 
              value={review} // Liên kết với state
              onChange={handleReviewChange} // Xử lý thay đổi trong textarea
              placeholder="Viết nhận xét của bạn..."
            />
          </div>
          <div className="comment-tools">
            <button className="submit-button" onClick={handleReviewSubmit}>GỬI NHẬN XÉT</button>
          </div>
        </div>
      )}

      {/* Hiển thị danh sách nhận xét */}
      <div className="reviews-list">
        <h3>Nhận xét của khách hàng:</h3>
        {reviewsList.map((cmt, index) => (
          <div key={index} className="user-review">
            <div className="user-info">
              <div className="user-avatar">LĐ</div>
              <div className="user-details">
                <p className="user-name">Khách hàng {index + 1}</p>
                <p className="review-time">Vừa xong</p>
              </div>
            </div>
            <div className="user-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} style={{ color: star <= cmt.rating ? '#f4b400' : '#ccc' }}>
                    ★
                  </span>
                ))}
              </div>
              <p>{cmt.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Form bình luận */}
      <div className="comment-section">
        <h3>Bình luận</h3>
        <div className="comment-box">
          <textarea 
            value={comment} // Liên kết với state
            onChange={handleCommentChange} // Xử lý thay đổi trong textarea
            placeholder="Viết bình luận của bạn..."
          />
        </div>
        <div className="comment-tools">
          <button className="submit-button" onClick={handleCommentSubmit}>GỬI BÌNH LUẬN</button>
        </div>
      </div>

      {/* Hiển thị danh sách bình luận */}
      <div className="comments-list">
        <h3>Bình luận của khách hàng:</h3>
        {commentsList.map((cmt, index) => (
          <div key={index} className="user-comment">
            <div className="user-info">
              <div className="user-avatar">LĐ</div>
              <div className="user-details">
                <p className="user-name">Khách hàng {index + 1}</p>
                <p className="review-time">Vừa xong</p>
              </div>
            </div>
            <p>{cmt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewProduct;
