import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About us" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">   Tencowry</span>{" "}
        stands as a beacon of excellence in the world of online shopping, committed to providing an unparalleled shopping experience. We have meticulously crafted a platform that not only offers a wide variety of products but also ensures that every customer’s journey is smooth, enjoyable, and satisfying. Here’s why Tencowry should be your go-to shopping destination:
        </h1>
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">   At Tencowry,</span>{" "}
         we pride ourselves on our extensive and diverse product range. Whether you’re searching for the latest fashion trends, cutting-edge electronics, home essentials, or unique gifts, we have it all. Our carefully curated collections are designed to cater to all your needs, ensuring that you find exactly what you’re looking for, every time.
        </h1>
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">  Quality</span>{" "}
         is at the heart of everything we do at Tencowry. We understand that our customers deserve nothing but the best, which is why we source our products from reputable suppliers and brands known for their excellence. Our rigorous quality control processes ensure that every item you purchase meets the highest standards, providing you with peace of mind and exceptional value.
        </h1>
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">   At Tencowry,</span>{" "}
           we believe that quality should not come at an exorbitant price. Our pricing strategy is designed to offer you the best deals without compromising on quality. We regularly compare our prices with those of other retailers to ensure that we are providing you with the most competitive rates. Additionally, our frequent sales, discounts, and special offers mean that you can enjoy significant savings on your favorite products.
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
