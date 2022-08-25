import React, { Fragment, useEffect,useState } from 'react'
import "./products.css"
import {useSelector, useDispatch} from "react-redux"
import { clearErrors, getProduct} from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import {useParams} from "react-router-dom"
import {useAlert} from "react-alert";
import Pagination from "react-js-pagination";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MetaData from '../layout/MetaData';


const categories = [
    "Laptop",
    "Footswear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphones",
    "Toys",
    
];


const Products = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const {products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount
    } = useSelector(state=>state.products)

    const [currentPage, setcurrentPage] = useState(1);
    const [price, setPrice] = useState([0,25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0)

    const setCurrentPageNo = (e)=>{
        setcurrentPage(e)
    };
    const priceHandler =(event, newPrice)=>{
        setPrice(newPrice)
    };

    const keyword = params.keyword;
    

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage,price, category,ratings));
      }
    , [dispatch,keyword, currentPage,price,category,ratings,alert,error])

    let count = filteredProductsCount;

  return (
    <Fragment>
        {loading?<Loader/>:(
            <Fragment>
            <MetaData title="PRODUCTS -- ECOMMERCE"/>
                <h2 className='productsHeading'>Products</h2>
                <div className="productPageContent">

                <div className="filterBox">
                <div className="filter-1">
                    <Typography>Price</Typography>
                    <div className='filter-1-empty'></div>
                    <Slider
                        value={price}
                        onChangeCommitted={priceHandler}
                        valueLabelDisplay = {window.innerWidth < 600 ? "on": "auto"}
                        aria-labelledby='range-slider'
                        min={0}
                        max={25000} 
                        size="small"
                    />
                    </div>
                    <div className='filter-2'>
                    <fieldset>
                        <Typography component="legend">Rating Above</Typography>
                        <Slider
                        value={ratings}
                        onChange={(e,newRating)=>{
                            setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        size="small"
                        min={0}
                        max={5}
                        marks
                        step={1}
                        >
                        </Slider>
                    </fieldset>
                    </div>
                    <div className="filter-3">
                    <Typography>Categories</Typography>
                    <ul className='categoryBox'>
                       <li className='category-link' onClick={()=>setCategory("")}>All</li>
                       { categories.map((category)=><li className='category-link' key={category} onClick={()=>setCategory(category)}>{category}</li>)}
                    </ul>
                    </div>

                </div>

                <div className="products">
                    {products && products.map((product,i)=> <ProductCard key={product._id} product={product}/>)}
                    
                </div>
                </div>
                

                
                {resultPerPage < count && (      
                    <div className="paginationBox">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage = {resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText = "1st"
                        lastPageText = "Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>)}
                
            
            </Fragment>
        )}
    </Fragment>
  )
}

export default Products;