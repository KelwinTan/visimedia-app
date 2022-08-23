import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { arrayOf, node } from "prop-types";

export default function Carousel({ items }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {items?.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </Slider>
  );
}

Carousel.propTypes = {
  items: arrayOf(node).isRequired,
};
