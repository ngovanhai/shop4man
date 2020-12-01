import React from 'react';
import PropTypes from 'prop-types';

ItemProducts.propTypes = {

};

function ItemProducts(props) {
    const { products } = props
    const product = JSON.parse(products.oder)
    return (
        <div>
            {product.map(x => (
                <View 
                x={x}
                />
              
            ))}
        </div>
    );
}
const View = (x) =>{

     const img = JSON.parse(x.x.image)
    return(
        <div>
        <img src={img[0].url} alt="" style={{ maxWidth: 100 }} />
        <p>{x.tittle}</p>
        <p>size : {x.x.size} số lượng : {x.x.slmua}</p>
    </div>
    )
}

export default ItemProducts;