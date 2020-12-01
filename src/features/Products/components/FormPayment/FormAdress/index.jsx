import React, { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { Input, Form, Row, Col } from 'antd';
import './FormAdress.scss';
import ItemCartPayment from '../../ItemCartPayment';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProductToCart, deleteAllCart } from 'features/Cart/cartSlice';
import oderApi from 'api/oderApi';
import axiosClient from 'api/axiosClient';
import axios from 'axios';
import { Roller } from 'react-awesome-spinners';
import { ErrorMessage } from '@hookform/error-message';
import productApi from 'api/productsAPI';



function FormAdress(props) {


    const {  register, handleSubmit, errors } = useForm(
    );

    const products = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false)
    const oder = JSON.stringify(products)
   
    const onSubmit = (values) => {
        if(oder === "{}"){
            alert("k co san pham nao trong ro hang")
            return;
        }
        const oders = {
            oder, ...values, "idOder": Math.trunc(Math.random() * 1000), "check": false, "total": num()
        }
        console.log(oders);
        const createOder = async () => {
            setLoading(true);
            await oderApi.createOder(oders)
           setLoading(false);
           alert("Bạn đã đặt hàng thành công");
        }
       createOder();
       const actionDeleteCart = deleteAllCart(0);
       dispatch(actionDeleteCart);
      
    }
 
    const num = () => {
        let gia;
        if (products.length) {
            gia = products.map(x => +(x.gia * parseInt(x.slmua))).reduce((a, b) => a + b).toLocaleString()
        }
        else {
            gia = 0;
        }
        return gia;
    }
    const handleDelete = (product) => {
        const deleteItemCartId = product.idCart;
        const action = DeleteProductToCart(deleteItemCartId);
        dispatch(action);
    }
    return (
        <Row className="FormPayment">
            <p>{process.env.TEST}</p>
            <Col span={12} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
                <div className="FormPayment__FormAdress">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="FormPayment__FormAdress__title">Thông tin giao hàng liên hệ</div>
                        <div className="FormPayment__FormAdress__line"></div>
                        <Row>
                            <Col span={10} className="FormPayment__FormAdress__label">Họ và tên *</Col>
                            <Col span={14} offset={0}>
                                <input
                                    name="name"
                                    ref={register({ required: "Bạn chưa nhập tên" })}
                                />
                             <ErrorMessage errors={errors} name="name" as="p" className="FormPayment__FormAdress__errors" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10} className="FormPayment__FormAdress__label">Email*</Col>
                            <Col span={14} offset={0}>
                            <input
                                name="email"
                                ref={register({ required: "Bạn chưa nhập email" })}
                            />
                             <ErrorMessage errors={errors} name="email" as="p" className="FormPayment__FormAdress__errors" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10} className="FormPayment__FormAdress__label">Số điện thoại *</Col>
                            <Col span={14} offset={0}>
                                <input
                                    name="phone"
                                    ref={register({ required: "Bạn chưa nhập số điện thoại" })}
                                />
                                <ErrorMessage errors={errors} name="phone" as="p"className="FormPayment__FormAdress__errors" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10} className="FormPayment__FormAdress_label"> <p>Địa chỉ giao hàng*</p> </Col>
                            <Col span={14} offset={0}>
                            <input
                                    name="address"
                                    ref={register({ required: "bạn chưa nhập địa chỉ" })}
                                />
                                <ErrorMessage errors={errors} name="address" as="p" className="FormPayment__FormAdress__errors" />
                            </Col>
                        </Row>
                    </form>
                </div >
            </Col>
            <Col span={12} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
                <div className="__FormPayment__FormCart">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="FormPayment__FormAdress__title">Thông tin giao hàng liên hệ</div>
                        <div className="FormPayment__FormAdress__line"></div>
                        <Row>
                            <Col span={4}><strong> Hình ảnh</strong></Col>
                            <Col span={6}><strong>Tên sản phẩm</strong></Col>
                            <Col span={4}><strong> Số lượng </strong></Col>
                            <Col span={4}><strong> Giá</strong></Col>
                            <Col span={4}><strong> Tổng </strong></Col>
                            <Col span={2}><strong>Xóa</strong></Col>
                        </Row>
                        {products.map((product) => (
                            <ItemCartPayment
                                product={product}
                                onCLickDelete={handleDelete}
                            />
                        ))}
                        < div className="FormPayment__FormAdress__title">Tổng</div>
                        <div className="FormPayment__FormAdress__line"></div>
                        <div className="FormPayment__FormAdress__price">
                            <p>Số tiền mua hàng : {num()} VND</p>
                        </div>
                        <Button type="submit" className="FormPayment__FormAdress__oder" >{loading ? <Roller /> : "Gửi Đơn Hàng"}</Button>
                    </form>
                </div>

            </Col>
        </Row >

    );
}

export default FormAdress;