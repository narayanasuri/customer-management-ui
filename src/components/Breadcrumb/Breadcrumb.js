import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => {
          if (index !== items.length - 1) {
            return (
              <li className="breadcrumb-item">
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          } else {
            return (
              <li className="breadcrumb-item active" aria-current="page">
                {item.title}
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
