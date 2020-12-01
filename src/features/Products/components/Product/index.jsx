import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Product.scss';

import { Button } from '@material-ui/core';

import FormDiaog from '../Dialog';

ProductCard.propTypes = {
    product: PropTypes.array,
    onCLickProductCLick: PropTypes.func,
    onCLickProductView: PropTypes.func,
};

function ProductCard(props) {
    const { product, onAddToCartClick, onProductView, onPayment } = props;
    const handleCLickView = () => {
        if (onProductView)
            onProductView(product)
    }
    const image = JSON.parse(product.image)
    return (
        <div className="product">
            <img src={image[0].url} alt="" />
            <Button className="product__title" onClick={handleCLickView}>{product.tittle}</Button>
            <p className="product__price">{product.gia.toLocaleString()} Vnđ</p>
            <div className="product__overlay">
                <FormDiaog className="product__dialog"
                    product={product}
                    onProductView={onProductView}
                    onAddToCartClick={onAddToCartClick}
                    onPayment={onPayment}
                />
            </div>
        </div>

    );
}

export default ProductCard;