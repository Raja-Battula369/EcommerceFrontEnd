import CarouselCard from './CarouselCard';
import '../Products/Products.css';
import Product from '../Product';
import reducer from '../../reducer/reducer';
import Cart from '../Cart';
import { useSelector } from 'react-redux';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
  const [state, dispatch] = useReducer(reducer, { products: [], cart: [] });
  const isCartOpen = useSelector((state) => state.isCartOpen);
  const fetchProductsData = async () => {
    const { data: resOfProductsData } = await axios.get(
      'https://dummyjson.com/products'
    );
    dispatch({
      type: 'display_products',
      playload: resOfProductsData.products,
    });
  };
  useEffect(() => {
    fetchProductsData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="Home"
    >
      <CarouselCard />
      <section className="Products">
        <Product state={state} dispatch={dispatch} />
        {isCartOpen && <Cart />}
      </section>
    </motion.div>
  );
};

export default Home;
