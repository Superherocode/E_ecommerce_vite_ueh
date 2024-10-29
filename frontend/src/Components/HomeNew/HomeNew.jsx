import React, { useContext } from 'react'
import './HomeNew.css'
import new_collections from '../Assets/new_collections'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

const HomeNew = () => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='homenew'>
      <div className="product-section">
        <h2 className="product-title">Sản phẩm</h2>
        <div className="product-tabs">
          <span className="tab active">SẢN PHẨM MỚI</span>
          <span className="tab">NỔI BẬT</span>
          <span className="tab">GIẢM GIÁ</span>
        </div>
        <div className="product-grid">
          {all_product.map((item, i) => {
            if(true) {

              return <Item key={i} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeNew