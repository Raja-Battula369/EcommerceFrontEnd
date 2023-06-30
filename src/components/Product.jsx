import '../App.css';

import { motion } from 'framer-motion';
import Pagination from './Products/Pagination';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const Product = ({ state }) => {
  const { products } = state;
  const [page, setPage] = useState(1);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 200 },
        visible: { opacity: 1, y: 0 },
      }}
      animate="visible"
      initial="hidden"
      transition={{ type: 'tween', duration: 2 }}
      className="products"
    >
      <h1
        style={{
          textAlign: 'left',
          color: 'aqua',
          textDecoration: 'underline',
          textShadow: '0 1px 4px aqua',
        }}
      >
        Products
      </h1>

      <div className="products_group">
        {products?.slice(page * 8 - 8, page * 8).map((product, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="products_card"
          >
            <Link to={`product/${product.id}`}>
              <img
                className="products_img"
                src={product.thumbnail}
                alt={product.title}
              />
            </Link>
            <section className="products_details">
              <p>{product.title}</p>

              <ReactStars
                value={product.rating}
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
              <h1>₹ {product.price}</h1>
              {/* {console.log(reduxCart)} */}
            </section>
          </motion.section>
        ))}
        <div className="pagination">
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </motion.div>
  );
};

Product.propTypes = {
  state: () => '',
};

export default Product;
