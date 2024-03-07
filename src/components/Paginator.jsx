import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate"; // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";

export default function Paginator({ page, setPage, numOfPages }) {

  return (
    // <div className="paginator-div">
    //   {isNaN(page) && numOfPages > 1 && numOfPages < 3 ? (
    //     <ul>
    //       <li>
    //         <a href={`/1`} onClick={() => setPage(1)} className="page-active">
    //           1
    //         </a>
    //       </li>
    //       <li>
    //         <a href={`/2`} onClick={() => setPage(2)}>
    //           2
    //         </a>
    //       </li>
    //     </ul>
    //   ) : numOfPages === 1 ? (
    //     <ul>
    //       <li>
    //         <a href={`/1`} onClick={() => setPage(1)} className="page-active">
    //           1
    //         </a>
    //       </li>
    //     </ul>
    //   ) : isNaN(page) && numOfPages > 1 ? (
    //     <ul>
    //       <li>
    //         <a href={`/1`} onClick={() => setPage(1)} className="page-active">
    //           1
    //         </a>
    //       </li>
    //       <li>
    //         <a href={`/2`} onClick={() => setPage(2)}>
    //           2
    //         </a>
    //       </li>
    //       <li>
    //         <a href={`/3`} onClick={() => setPage(3)}>
    //           3
    //         </a>
    //       </li>
    //     </ul>
    //   ) : numOfPages === 2 ? (
    //     <ul>
    //       <li>
    //         <a
    //           href={`/1`}
    //           onClick={() => setPage(1)}
    //           className={`${page === 1 ? "page-active" : ""}`}
    //         >
    //           1
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href={`/2`}
    //           onClick={() => setPage(2)}
    //           className={`${page === 2 ? "page-active" : ""}`}
    //         >
    //           2
    //         </a>
    //       </li>
    //     </ul>
    //   ) : numOfPages > 2 && page !== 1 ? (
    //     <ul>
    //       <li>
    //         <a
    //           href={`/${page - 1}`}
    //           onClick={() => setPage(page)}
    //           className={`${page === page - 1 ? "page-active" : ""}`}
    //         >
    //           {page - 1}
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href={`/${page}`}
    //           onClick={() => setPage(page)}
    //           className={`${page ? "page-active" : ""}`}
    //         >
    //           {page}
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href={`/${page + 1}`}
    //           onClick={() => setPage(page)}
    //           className={`${page === page + 1 ? "page-active" : ""}`}
    //         >
    //           {page + 1}
    //         </a>
    //       </li>
    //     </ul>
    //   ) : page === 1 ? (
    //     <ul>
    //       <li>
    //         <a
    //           href={`/${page}`}
    //           onClick={() => setPage(page)}
    //           className={`${page === page ? "page-active" : ""}`}
    //         >
    //           {page}
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href={`/${page + 1}`}
    //           onClick={() => setPage(page + 1)}
    //           className={`${page === page + 1 ? "page-active" : ""}`}
    //         >
    //           {page + 1}
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href={`/${page + 2}`}
    //           onClick={() => setPage(page + 2)}
    //           className={`${page === page + 2 ? "page-active" : ""}`}
    //         >
    //           {page + 2}
    //         </a>
    //       </li>
    //     </ul>
    //   ) : (
    //     ""
    //   )}
    // </div>
    <div className="paginator-div">
      <ReactPaginate
        initialPage={0}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"page-active"}
        onPageChange={(event) => setPage(event.selected)}
        pageCount={numOfPages}
        breakLabel="..."
        previousLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }
      />
    </div>
  );
}
