import '../App.css';
import { MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { cardOpen, logOut } from '../redux/features';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();
  const reduxCart = useSelector((state) => state.cart);
  const name = useSelector((state) => state.userName);

  return (
    <header style={{ position: 'sticky', top: '0' }}>
      <div className="products_head">
        <motion.h1
          onClick={() => navigate('/')}
          whileInView={{ x: [0, 200, 200, 0] }}
          transition={{ delay: 0.3 }}
          style={{ textShadow: '0 1px 3px aqua', cursor: 'pointer' }}
        >
          Products
        </motion.h1>
        {console.log(window.innerWidth)}

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {window.innerWidth >= 520 && (
            <select
              onChange={() => reduxDispatch(logOut({}))}
              className="Logout"
            >
              <option>{name}</option>
              <option>logout</option>
            </select>
          )}

          <MdShoppingCart
            onClick={() => reduxDispatch(cardOpen())}
            className="cart_icons"
            title="Cart"
            size={20}
          />
          <motion.p
            whileFocus={{ rotate: [0, 300, 300, 0] }}
            className="cart_length"
          >
            {reduxCart?.length}
          </motion.p>
        </div>
      </div>
    </header>
  );
};

export default Header;
