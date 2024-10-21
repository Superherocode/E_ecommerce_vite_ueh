import React from 'react'
import './RelatedProducts.css'
import date_product from '../Assets/data' 
import Item from '../Item/Item'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Sản phẩm khác</h1>
      <hr />
      <div className="relatedproducts-item">
        {date_product.map((item,i)=> {
          return <Item key={i} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts