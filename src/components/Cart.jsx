import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardOpen, cartQtyChange } from '../redux/features';
import { motion, useAnimation } from 'framer-motion';

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const controlMethod = useAnimation();
  // const { cart } = state;
  const reduxDispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setTotalPrice(
      cart.reduce((pre, curr) => pre + Number(curr.price) * curr.qty, 0)
    );
    controlMethod.start({
      opacity: [0, 1],
      transition: { type: 'spring', duration: 0.9 },
    });
  }, [cart]);
  return (
    <>
      <div
        className="cart_main"
        onClick={() => reduxDispatch(cardOpen())}
      ></div>
      <motion.div
        variants={{
          hidden: { x: 400 },
          visible: { x: 0 },
        }}
        animate="visible"
        initial="hidden"
        transition={{ type: 'spring', duration: 0.5 }}
        className="carts"
        style={{ height: cart.length > 4 ? '100' : '200vh' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 2rem',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              fontSize: '30px',
              textShadow: '0 1px 3px black',
            }}
          >
            Cart
          </h1>
          <button
            onClick={() => reduxDispatch(cardOpen())}
            className="cart_button_exit"
          >
            X
          </button>
        </div>

        <h1
          style={{
            textAlign: 'center',
            fontSize: '30px',
            textShadow: '0 0.5px 2px black',
          }}
        >
          Total Price: Rs{' '}
          <motion.span animate={controlMethod}>{totalPrice}</motion.span> /-
        </h1>
        <motion.section
          variants={{
            hidden: { opacity: 0, y: 200 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ type: 'spring', duration: 0.5 }}
          animate="visible"
          initial="hidden"
          className="cart_products"
        >
          {cart?.map((product, index) => (
            <motion.section
              key={index}
              whileInView={{ scale: 1.1 }}
              className="cart_card"
            >
              <img
                className="carts_img"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="cart_subCard">
                <p>{product.title}</p>
                <div className="cart_details">
                  <div className="cart_buttonGroup">
                    <button
                      onClick={() => {
                        reduxDispatch(
                          cartQtyChange({
                            qty: product.qty - 1,
                            id: product.id,
                          })
                        );
                      }}
                      className="cart_button"
                    >
                      -
                    </button>
                    <motion.button className="cart_button1">
                      {product.qty}
                    </motion.button>
                    <button
                      onClick={() => {
                        reduxDispatch(
                          cartQtyChange({
                            qty: product.qty + 1,
                            id: product.id,
                          })
                        );
                      }}
                      className="cart_button"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button className="cart_button2">
                      RS {product.price * product.qty}
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </motion.section>
      </motion.div>
    </>
  );
};
Cart.propTypes = {
  state: () => '',
  dispatch: () => '',
};
export default Cart;
