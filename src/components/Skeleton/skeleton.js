import React from 'react';
import './skeleton.css';


/** Skeleton post*/
export const Skeleton = () => {
  return (
    <div className="skeleton-item">
       <div className="skeleton-content">
           <div className="skeleton-header">
               <div className="skeleton-img" />
               <div className="skeleton_more">
                   <p className="skeleton-name" />
                   <p className="skeleton-time" />
               </div>
           </div>

          <p className="skeleton-media"/>
           <div className="skeleton-action">
                <p className="skeleton-button"/>
                <p className="skeleton-button1"/>
                <p className="skeleton-button2"/>
                <p className="skeleton-email" />
           </div>
       </div>
    </div>
  );
};


/** Skeleton search*/
export const SearchSkeleton = () => {
  return (
  <div className="search">
    <div className="search-item">
               <div className="search-img" />
               <div className="search_more">
                   <p className="search-name" />
                   <p className="search-name" />
                   <p className="search-time" />
               </div>
    </div>
  </div>
  );
};


