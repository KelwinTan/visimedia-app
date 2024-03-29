import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { arrayOf, node } from "prop-types";
import { cx } from "@emotion/css";
import { styArrow, styArrowLeft, styArrowRight } from "./style";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={cx(className, styArrow, styArrowRight)}
      style={style}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={cx(className, styArrow, styArrowLeft)}
      style={style}
      onClick={onClick}
    />
  );
}

export default function Carousel({ items }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
