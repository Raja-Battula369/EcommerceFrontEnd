import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import { motion } from 'framer-motion';

const CarouselCard = () => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 200 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ type: 'spring', duration: 2 }}
    >
      <Carousel
        className="carousel_img"
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        <div>
          <img
            style={{ w: '100%', height: '600px', objectFit: 'cover' }}
            src={
              'https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?format=webp&v=1614559651&width=1024'
            }
            alt=""
          />
          <motion.div
            whileInView={{ scale: [0, 1.1] }}
            transition={{ duration: 1 }}
            className="carousel_img_details"
          >
            <h1>Demo Products</h1>
            <p>with React.js</p>
          </motion.div>
        </div>
        <div>
          <img
            style={{ w: '100%', height: '600px', objectFit: 'cover' }}
            src={
              'https://images.pexels.com/photos/5865340/pexels-photo-5865340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            alt=""
          />
          <motion.div
            whileInView={{ scale: [0, 1.1] }}
            transition={{ duration: 1 }}
            className="carousel_img_details"
          >
            <h1>Demo Products</h1>
            <p>with React.js</p>
          </motion.div>
        </div>
        <div>
          <img
            style={{ w: '100%', height: '600px', objectFit: 'cover' }}
            src={
              'https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            alt=""
          />
          <motion.div
            whileInView={{ scale: [0, 1.1] }}
            transition={{ duration: 1 }}
            className="carousel_img_details"
          >
            <h1>Demo Products</h1>
            <p>with React.js</p>
          </motion.div>
        </div>
        <div>
          <img
            style={{ w: '100%', height: '600px', objectFit: 'cover' }}
            src={
              'https://images.pexels.com/photos/10077064/pexels-photo-10077064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            alt=""
          />
          <motion.div
            whileInView={{ scale: [0, 1.1] }}
            transition={{ duration: 1 }}
            className="carousel_img_details"
          >
            <h1>Demo Products</h1>
            <p>with React.js</p>
          </motion.div>
        </div>
      </Carousel>
    </motion.div>
  );
};

export default CarouselCard;
