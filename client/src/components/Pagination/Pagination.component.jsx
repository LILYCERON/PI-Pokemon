import React from "react";
import "./Pagination.styles.css";

const Pagination = ({ pokemonsAll, pokemonsPerPage, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemonsAll / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => pagination(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;