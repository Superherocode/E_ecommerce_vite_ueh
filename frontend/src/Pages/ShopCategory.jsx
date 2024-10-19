import React, { useContext } from "react";
import style from './CSS/ShopCategoryStyles/ShopCategory.module.css';
import './CSS/ShopCategoryStyles/ShopCategory.css'
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";





const ShopCategory = (props) => {
    const {all_product} = useContext(ShopContext);


   
  return (
    <div className='shop-category'>

      <div className={style.news_header}>
        <h1 className={style.title}>Danh sách sản phẩm</h1>
        <div className={style.breadcrumb}>
          <h3 className={style.breadcrumb_1}>Trang chủ</h3>
          <i className="fa-solid fa-chevron-right"></i>
          <span className={style.breadcrumb_1}>Danh sách sản phẩm</span>
        </div>
      </div>
      {/* filter */}
      <div className="filter">
        <div className="filter-item">
          <span className="orange-text">Hiển thị:</span>
        </div>
        <div className="filter-item">
          <span className="orange-text">Sắp xếp: </span>
          <select name="sort" id="sort">
            <option value="name-asc">Theo tên</option>
            <option value="low-to-high">Giá từ thấp đến cao</option>
            <option value="high-to-low">Giá từ cao đến thấp</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (item.category === props.category) {
            return <Item key={i} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else {
            return null;
          }
        })}
      </div>
    </div>
  )
}

export default ShopCategory
