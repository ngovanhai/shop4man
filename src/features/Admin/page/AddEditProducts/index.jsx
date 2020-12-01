import React, { useEffect, useState } from "react";

import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Container, makeStyles, Button, Grid } from "@material-ui/core";

import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AddToProduct } from "features/Products/productSlice";
import productApi from "api/productsAPI";
import { Roller } from "react-awesome-spinners";
import './AddEditProducts.scss';
import userApi from "api/useAPI";
import axios from "axios";
import PreviewImage from "features/Admin/component/previewImage";
import { ErrorMessage } from '@hookform/error-message';
import SaveIcon from '@material-ui/icons/Save';



AddEditProducts.propTypes = {
};
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(4),
        minWidth: 800,
    },
}));
const SignupSchema = yup.object().shape({
    tittle: yup.string().required(),
  });

function AddEditProducts(props) {
    const classes = useStyles()
  
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false)
    const isAddmode = !productId;
    const { handleSubmit, register, control,reset, errors } = useForm({
        validationSchema: SignupSchema
    });
    const [urlImage, setUrlImage] = useState([])
    const [mota, setMota] = useState()

    const handleInput = (e) => {
        const { name,value } = e.target;
        console.log(name,value)
        // setMota(value,name)
    }

    const products = useSelector(state => state.products)

    const handlePreview = async (e) => {
        const images = e.target.files;
        const uploaders = Object.keys(images).map(file => {
            const formData = new FormData();
            formData.append("file", images[file]);
            formData.append("upload_preset", "uqcxqetw"); // Replace the 
            formData.append("api_key", "933731481334941"); // Replace API key with 
            formData.append("timestamp", (Date.now() / 1000) | 0);
            return axios.post("https://api.cloudinary.com/v1_1/haihunter/image/upload", formData, {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data =response.data
              const url = data.secure_url;
              const public_id = data.public_id;
              const image = {url,public_id}
              return image;
            })
          });
          axios.all(uploaders).then((response) => {
              console.log("data",response)
            setUrlImage(response);
          });
  }

    const handleMota =(e)=>{
        const {value} = e.target
        setMota(value)
    }
    const onSubmit = values => {
        if (urlImage.length === 0) {
            alert("xin mời chọn ảnh")
            return
        }
        let data = { ...values, image: JSON.stringify(urlImage) , mota: mota, "product_id": Math.trunc(Math.random() * 1000) };
        const addProduct = async () => {
            setLoadingAdd(true)
            await productApi.create(data);
            setLoadingAdd(false)
            alert("Thêm sản phẩm thành công")
        }
        console.log(data)
       addProduct();
       setUrlImage([]);

    }
    const onUpdate = values => {

        if (urlImage.length === 0) {
            alert("xin mời chọn ảnh")
            return
        }
        const data = { ...values, image: urlImage, mota: mota };
        const updateProduct = async () => {
            setLoadingAdd(true)
            await productApi.update(productId, data)
            setLoadingAdd(false)
            alert("sủa sản phẩm thành công")
        }
       updateProduct()
    console.log(data);
    }
    const handleRemove = async (id) => {
        console.log(id);
        await userApi.deleteImage({ public_id: id })
        const filterImage = urlImage.filter(image => image.public_id !== id)
        setUrlImage(filterImage)
    }
    useEffect(()=>{
        const fetchData = async() =>{
            if(productId){
                const item = await productApi.get(productId)
                setItem(item);
            }
        }
        fetchData()
    },[])
    return (
        <div className="AddEditProduct">
            <Container fixed>
                <div className="AddEditProduct__content">
                    <h1>{isAddmode ? "Thêm sản phẩm" : item.tittle}</h1>
                </div>
                <Grid container spacing={0}>
                    <Grid item xs={5} >
                        <div className="AddEditProduct__upload">
                            <input type="file" className="AddEditProduct__upload" multiple onChange={handlePreview}></input>
                            <Grid container xs={2} className="AddEditProduct__show">
                                {loading ? <Roller /> : (
                                    urlImage.map(image => (
                                        <PreviewImage
                                            loading={loading}
                                            url={image.url}
                                            id={image.public_id}
                                            onClickRemove={handleRemove}
                                        />)
                                    )
                                )}
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={5} >
                        <form className={classes.formControl} onSubmit={handleSubmit(isAddmode ? onSubmit : onUpdate)}>
                            <label htmlFor="" className="AddEditProduct__label">Tên sản phẩm</label>
                            <br/>
                               <input type="text" 
                                    name="tittle" 
                                    ref={register({
                                        required: "Bạn chưa nhập tên sản phẩm"
                                    })}
                                    defaultValue={isAddmode ? '' : item.tittle} 
                                    className="AddEditProduct__input"
                                />
                                <ErrorMessage errors={errors} name="tittle" as="p" className="AddEditProduct__errors" />
                                <br/>
                            <label htmlFor="" className="AddEditProduct__label">Mô tả sản phẩm</label>
                            <br/>
                            <textarea name="mota" cols="100" rows="5" 
                                name="mota"
                                defaultValue={isAddmode ?  "" : item.mota}  
                                onChange={handleMota} 
                                ref={register({
                                    required: "Bạn chưa nhập phần mô tả"
                                })}
                                className="AddEditProduct__textarea"
                            />
                              <ErrorMessage errors={errors} name="mota" as="p" className="AddEditProduct__errors" />
                            <br/>
                            <div>
                                <label htmlFor="" className="AddEditProduct__label">Phân loại sản phẩm</label>
                                <br/>
                            <select name="phanloai" id="" className="AddEditProduct__Select" ref={register} >
                                        <option value="quan-nam">Đồ nam</option>
                                        <option value="phu-kien">Phụ kiện</option>
                                        <option value="giay-dep">Giày dép</option>
                            </select>
                            <ErrorMessage errors={errors} name="phanloai" as="p" className="AddEditProduct__errors" />
                            </div>
                            <label htmlFor="" className="AddEditProduct__label">Số lượng</label>
                            <br/>
                            <input type="number" name="soluong" 
                                defaultValue={isAddmode ?  "" : item.soluong }  
                                onChange={handleInput}
                                ref={register({
                                    required: "Bạn chưa nhập số lương"
                                })}
                                className="AddEditProduct__input"
                            />
                                 <ErrorMessage errors={errors} name="soluong" as="p" className="AddEditProduct__errors" />
                                 <br/>
                            <label htmlFor="" className="AddEditProduct__label">Giá</label>
                            <br/>
                            <input type="number" name="gia" 
                                defaultValue={isAddmode ? "" : item.gia}  
                                onChange={handleInput}
                                ref={register({
                                    required: "Bạn chưa nhập giá sản phẩm"
                                })}
                                className="AddEditProduct__input"
                                />
                                <ErrorMessage errors={errors} name="gia" as="p" className="AddEditProduct__errors" />
                                <br/>
                            <label htmlFor="" className="AddEditProduct__label">khuyến mại</label>
                           <br/>
                            <input type="number" name="sale" 
                                defaultValue={item.sale}  
                                onChange={handleInput}
                                ref={register({
                                    required: "Bạn chưa nhập khuyến mãi sản phẩm"
                                })}
                                className="AddEditProduct__input"
                                />
                           <ErrorMessage errors={errors} name="sale" as="p" className="AddEditProduct__errors" />
                                <br/>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                >
                                   {isAddmode ? (loadingAdd ? <Roller /> : "Thêm sản phẩm") : (loadingAdd ? <Roller /> : 'Sửa sản phẩm')}
                                </Button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

export default AddEditProducts;
