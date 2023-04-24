import React from "react";
import "./SkeletonLoading.scss";
import { HiOutlineStar, HiStar } from "react-icons/hi";
const SkeletonLoading = (props: { anotherSection?: boolean }) => {
  const { anotherSection } = props;
  return (
    <div
      className={`${
        anotherSection
          ? "skeleton-loading-horizontal"
          : "skeleton-loading-vertical"
      }`}>
      <div className="skeleton-image"></div>{" "}
      <div className="skeleton-detail-container">
        <div className="skeleton-details"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-title-last"></div>
        <div className="skeleton-ratings">
          <div className="ratings">
            <HiStar className="skeleton-ratings-star" size={25} />
            <HiStar className="skeleton-ratings-star" size={25} />
            <HiStar className="skeleton-ratings-star" size={25} />
            <HiStar className="skeleton-ratings-star" size={25} />
            <HiStar className="skeleton-ratings-star" size={25} />
          </div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
