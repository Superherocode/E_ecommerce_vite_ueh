import React from 'react'
import './RelatedProducts.css'
import date_product from '../Assets/data' 
import Item from '../Item/Item'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'

const RelatedProducts = () => {

  const {all_product} = useContext(ShopContext);
  return (
    <div className='relatedproducts'>
      <h1>Sản phẩm khác</h1>
      <hr />
      <div className="relatedproducts-item">
        {all_product.map((item,i)=> {
          if(true) {
            return <Item key={i} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
        })}
      </div>
    </div>
  )
}

export default RelatedProducts