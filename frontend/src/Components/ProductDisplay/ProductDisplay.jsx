import React, { useContext } from 'react';
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {

    const { product } = props;
    const { addToCart, url, addToFavorites } = useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={url+"/images/"+ product.image} alt="" />
        </div>
        <div className="productdisplay-img-list">
          <img src={url+"/images/"+ product.image} alt="" />
          <img src={url+"/images/"+ product.image} alt="" />
          <img src={url+"/images/"+ product.image} alt="" />
          <img src={url+"/images/"+ product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <span>(122 Đánh giá)</span>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">{product.old_price},000 VNĐ</div>
          <div className="productdisplay-right-price-new">${product.new_price},000 VNĐ</div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
          <div className="productdisplay-right-button">
            <div className="counter-container">
              <div className="counter-display">
                <span id="count">1</span>
              </div>
              <div className="counter-buttons">
                <button id="increment">+</button>
                <button id="decrement">-</button>
              </div>
            </div>
            <button className="add-to-cart" onClick={()=>{addToCart(product._id)}}>THÊM GIỎ HÀNG</button>
            <div onClick={()=>{addToFavorites(product._id)}} className="heart">
                <i className="fa-regular fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay
