import React, { useContext } from 'react'
import './HomePopular.css'
import new_collections from '../Assets/new_collections'
import Item from '../Item/Item'
import bannerSale from '../Assets/HomeComponents/bannerSale.png'
import { ShopContext } from '../../Context/ShopContext'

const HomePopular = () => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='homepopular'>
      <div className="san-pham-section">
        <h2 className="san-pham-title">Sản phẩm ưu đãi nổi bật</h2>
        <p className="san-pham-subtitle">Học hết sức, sắm hết mình – giảm giá từ sách đến snack!</p>

        <div className="san-pham-grid">
          {all_product.map((item, i) => {
            return <Item key={i} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })}
        </div>
      </div>
      <section className="banner container">
        <img src={bannerSale} alt="" />
      </section>
    </div>
  )
}

export default HomePopular