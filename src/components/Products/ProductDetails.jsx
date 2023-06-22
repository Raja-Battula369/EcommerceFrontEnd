import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './Products.css';
import '../../App.css';
import { addToCart, removeFromCart } from '../../redux/features';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Cart from '../Cart';
const ProductDetails = () => {
  const [productDetailsData, setProductDetailsData] = useState({});
  const [productsData, setProductsData] = useState([]);

  const { productid } = useParams();

  const reduxDispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.isCartOpen);
  const reduxCart = useSelector((state) => state.cart);

  const FetchProductDetails = async () => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/${productid}`
    );
    setProductDetailsData(data);
  };
  const FetchProducts = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products`);
    setProductsData(data.products);
  };
  useEffect(() => {
    FetchProductDetails();
    FetchProducts();
  }, [productid]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className="productDetailsMain"
    >
      <h2 style={{ color: 'white', padding: '0 3rem' }}>
        brand: <span>{productDetailsData.brand}</span>
      </h2>

      <div className="mainProduct">
        <div className="product_img">
          <img
            className="productDetails_img"
            src={productDetailsData.thumbnail}
            alt="product"
          />
        </div>
        <div className="product_Details">
          <h3>
            Title: <span>{productDetailsData.title}</span>
          </h3>
          <p>
            description: Rs <span>{productDetailsData.description} /-</span>
          </p>
          <h3>
            Price: Rs <span>{productDetailsData.price} /-</span>
          </h3>

          {reduxCart?.some((prod) => prod.id === productDetailsData.id) ? (
            <motion.button
              variants={{
                hidden: { opacity: 0, scale: 1.2 },
                visible: { opacity: 1, scale: 1 },
              }}
              animate="visible"
              initial="hidden"
              transition={{ type: 'spring', duration: 1.5 }}
              onClick={() => {
                reduxDispatch(removeFromCart({ id: productDetailsData.id }));
              }}
              className="remove_button remove_btn"
            >
              remove from card
            </motion.button>
          ) : (
            <button
              onClick={() => {
                reduxDispatch(
                  addToCart({
                    title: productDetailsData.title,
                    thumbnail: productDetailsData.thumbnail,
                    price: productDetailsData.price,
                    id: productDetailsData.id,
                    qty: 1,
                  })
                );
              }}
              className="add_button add_btn"
            >
              add to cart
            </button>
          )}

          <b>
            Rating:<span>{productDetailsData.rating}</span>
          </b>
          <p>
            Category: <span>{productDetailsData.category}</span>
          </p>
        </div>
      </div>
      {isCartOpen && <Cart />}
      <div>
        <h1 style={{ color: 'white', padding: '0 3rem' }}>Related products</h1>
        <div className="relatedProducts">
          {productsData.map(
            (product, i) =>
              product.category === productDetailsData.category && (
                <Link key={i + product.category} to={`/product/${product.id}`}>
                  <section className="products_card">
                    <img
                      className="products_img"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                    <section className="products_details">
                      <p>{product.title}</p>
                      <h1>{product.price}</h1>
                      {/* {console.log(reduxCart)} */}
                    </section>
                  </section>
                </Link>
              )
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
