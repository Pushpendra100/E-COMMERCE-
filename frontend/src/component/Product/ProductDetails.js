import React, { Fragment,useEffect } from 'react';
import {useParams} from "react-router-dom"
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useSelector, useDispatch} from "react-redux";
import { clearErrors, getProductDetails } from '../../actions/productAction';
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js"
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";
import MetaData from '../layout/MetaData';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {product, loading, error} = useSelector(state => state.productDetails)
    const params = useParams();

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(params.id))
    }, [dispatch,params.id],error,alert);

    const options = {
        edit: false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value:product.ratings,
        isHalf:true,
        size: window.innerWidth < 800 ? 10: 17,
    }
    

  return (
    <Fragment>
        {loading?<Loader/>:(    
            <Fragment>
            <MetaData title={`${product.name} -- ECOMMERCE`}/>
    <div className='productDetails'>
        <div>
            <Carousel className='carousel'>
                {product.images && product.images.map((item,i)=>{
                   return(
                     <img
                    className='CarouselImage' 
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`} />
                   )
                })}
            </Carousel>
        </div>

        <div>
            <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
                <ReactStars {...options}/>
                <span>({product.numOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
                <h1>{`???${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                    </div>
                    <button>Add to Cart</button>
                </div>
                <p>Status:{" "}
                    <b className={product.stock < 1? "redColor":"greenColor"}>
                    {product.stock < 1? "OutOfStock":"InStock"}
                    </b>
                </p>
            </div>
            <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
            </div>
            <button className='submitReview'>Submit Review</button>
        </div>
    </div>

    <h3 className='reviewsHeading'>REVIEWS</h3>
    {product.reviews && product.reviews[0] ? (
        <div className="reviews">
            {product.reviews && product.reviews.map((review,i)=> <ReviewCard review={review} key={i}/>)}
        </div>
    ):(
        <p className='noReviews'>No reviews yet</p>
    )}
    </Fragment>)}
    </Fragment>
  )
}

export default ProductDetails;