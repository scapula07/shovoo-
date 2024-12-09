import React, { useState } from "react";


const FullWidthCarousel = ({ items }:any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < items.length ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : items.length - 1
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#8249;
      </button>
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 20}%)`,
          }}
        >
          {items.map((item:any, index:number) => (
            <div key={index} className="carousel-slide">
              <img src={item.image} alt={item.title} className="carousel-image" />
              <div className="carousel-caption">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={nextSlide}>
        &#8250;
      </button>
    </div>
  );
};

export default FullWidthCarousel;
