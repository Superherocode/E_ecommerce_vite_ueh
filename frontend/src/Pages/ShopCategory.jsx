import React, { useContext, useState } from "react";
import style from './CSS/ShopCategoryStyles/ShopCategory.module.css';
import './CSS/ShopCategoryStyles/ShopCategory.css';
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import { assets } from "../Components/Assets/Assets_food/assets";
import { models } from "../Components/Assets/image/image_project";
import { Link, useNavigate } from "react-router-dom";

const ShopCategory = () => {
  const { all_product } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState(""); // State cho lựa chọn sắp xếp
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng nhập từ khóa
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Hàm xử lý sắp xếp
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Lọc và sắp xếp sản phẩm dựa trên từ khóa tìm kiếm, danh mục và lựa chọn sắp xếp
  const filteredProducts = all_product
    .filter((item) => {
      return (
        (selectedCategory ? item.category === selectedCategory : true) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOption === "name-asc") {
        return a.name.localeCompare(b.name); // Sắp xếp theo tên A-Z
      } else if (sortOption === "low-to-high") {
        return a.new_price - b.new_price; // Giá từ thấp đến cao
      } else if (sortOption === "high-to-low") {
        return b.new_price - a.new_price; // Giá từ cao đến thấp
      }
      return 0; // Không sắp xếp nếu không chọn
    });

  // Hàm xử lý khi người dùng chọn danh mục
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category) {
      navigate(`/${category}`);
    } else {
      navigate("/sanpham");
    }
  };

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

      <div className="category-menu">
        <div className="menu-choice" onClick={() => handleCategoryClick("")}>
          <img src={models.uehshop} alt="ueh shop" className="rounded"/>
          <h6>Tất cả</h6>
        </div>
        <div className="menu-choice" onClick={() => handleCategoryClick("thoitrang")}>
          <img src={models.thoitrang} alt="Thời trang" className="rounded"/>
          <h6>Thời trang</h6>
        </div>
        <div className="menu-choice" onClick={() => handleCategoryClick("uehfood")}>
          <img src={models.uehfood} alt="UEH Food" className="rounded"/>
          <h6>UEH Food</h6>
        </div>
        <div className="menu-choice" onClick={() => handleCategoryClick("dungcu")}>
          <img src={assets.dungcu} alt="Dụng cụ học tập" className="rounded"/>
          <h6>Học tập</h6>
        </div>
        <div className="menu-choice" onClick={() => handleCategoryClick("luuniem")}>
          <img src={models.qualuuniem} alt="Quà lưu niệm" className="rounded"/>
          <h6>Quà lưu niệm</h6>
        </div>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Tìm kiếm sản phẩm..." 
          value={searchTerm} 
          onChange={handleSearch} 
        />
      </div>

      {/* Bộ lọc sản phẩm */}
      <div className="filter">
        <div className="filter-item">
          <span className="orange-text">Hiển thị:</span>
        </div>
        <div className="filter-item">
          <span className="orange-text">Sắp xếp: </span>
          <select name="sort" id="sort" onChange={handleSortChange} value={sortOption}>
            <option value="">Mặc định</option>
            <option value="name-asc">Theo tên (A-Z)</option>
            <option value="low-to-high">Giá từ thấp đến cao</option>
            <option value="high-to-low">Giá từ cao đến thấp</option>
          </select>
        </div>
      </div>

      {/* Hiển thị danh sách sản phẩm sau khi lọc và sắp xếp */}
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item 
            key={i} 
            _id={item._id} 
            name={item.name} 
            image={item.image} 
            new_price={item.new_price} 
            old_price={item.old_price} 
          />
        ))}
      </div>
    </div>
  );
}

export default ShopCategory;



// import React, { useContext } from "react";
// import style from './CSS/ShopCategoryStyles/ShopCategory.module.css';
// import './CSS/ShopCategoryStyles/ShopCategory.css'
// import { ShopContext } from "../Context/ShopContext";
// import Item from "../Components/Item/Item";





// const ShopCategory = (props) => {
//     const {all_product} = useContext(ShopContext);


   
//   return (
//     <div className='shop-category'>

//       <div className={style.news_header}>
//         <h1 className={style.title}>Danh sách sản phẩm</h1>
//         <div className={style.breadcrumb}>
//           <h3 className={style.breadcrumb_1}>Trang chủ</h3>
//           <i className="fa-solid fa-chevron-right"></i>
//           <span className={style.breadcrumb_1}>Danh sách sản phẩm</span>
//         </div>
//       </div>
//       {/* filter */}
//       <div className="filter">
//         <div className="filter-item">
//           <span className="orange-text">Hiển thị:</span>
//         </div>
//         <div className="filter-item">
//           <span className="orange-text">Sắp xếp: </span>
//           <select name="sort" id="sort">
//             <option value="name-asc">Theo tên</option>
//             <option value="low-to-high">Giá từ thấp đến cao</option>
//             <option value="high-to-low">Giá từ cao đến thấp</option>
//           </select>
//         </div>
//       </div>
//       <div className="shopcategory-products">
//         {all_product.map((item, i) => {
//           if (item.category === props.category) {
//             return <Item key={i} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//           }
//           else {
//             return null;
//           }
//         })}
//       </div>
//     </div>
//   )
// }

// export default ShopCategory