import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {


  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    old_price: "",
    new_price: "",
    category: "uehfood"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("old_price", Number(data.old_price))
    formData.append("new_price", Number(data.new_price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/product/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        old_price: "",
        new_price: "",
        category: "uehfood"
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            {/* hiển thị một hình ảnh xem trước (preview) khi người dùng tải ảnh lên. */}
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          {/*  Điều này giúp lưu tệp đó vào state trong React, để sử dụng sau (ví dụ, để hiển thị xem trước hình ảnh hoặc để tải tệp lên máy chủ). */}
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" value={data.category} onChange={onChangeHandler}>
              <option value="uehfood">UEH Food</option>
              <option value="thoitrang">Thời Trang</option>
              <option value="dungcu">Dụng cụ học tập</option>
              <option value="luuniem">Quà lưu niệm</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product old price</p>
            <input onChange={onChangeHandler} value={data.old_price} type="number" name="old_price" placeholder="$20" />
            <p>Product new price</p>
            <input onChange={onChangeHandler} value={data.new_price} type="number" name="new_price" placeholder="$20" />
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  )
}

export default Add