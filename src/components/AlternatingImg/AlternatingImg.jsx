import React, { useLayoutEffect, useState } from 'react';

interface AlternatingImgProps {
  className?: string;
  time: number;
  alt: string;
  imgs: string[];
}

const AlternatingImg: React.FC<AlternatingImgProps> = ({
  className,
  time,
  alt,
  imgs,
}: AlternatingImgProps) => {
  const [visibleImg, setVisibleImg] = useState({ index: 0, img: imgs[0] });

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setVisibleImg((visible) => {
        let nextIndex = visible.index + 1;
        if (visible.index === imgs.length - 1) {
          nextIndex = 0;
        }

        return {
          index: nextIndex,
          img: imgs[nextIndex],
        };
      });
    }, time);
    return () => {
      clearInterval(interval);
    };
  }, [imgs, time]);

  return (
    <img
      className={className}
      alt={`${alt}-${visibleImg.index}`}
      src={visibleImg.img}
    />
  );
};

AlternatingImg.defaultProps = {
  className: '',
};

export default AlternatingImg;
