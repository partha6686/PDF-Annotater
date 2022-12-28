import React, { useEffect, useState } from "react";
import { Document, Outline, Page } from "react-pdf/dist/esm/entry.webpack5";
import { useSearchParams } from "react-router-dom";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const DocPg = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("q"));
  // const [pdf, setPdf] = useState();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const showNextPage = () => {
    console.log("clickedNext");
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };
  const showPrevPage = () => {
    console.log("clickedPrev");
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="DocPg">
      <div className="sidebar">
        <div className="lebles">
          <h1>Lebles</h1>
          <hr />
          <div className="lebles_div">
            <div className="title">Title</div>
            <div className="author">Author</div>
          </div>
        </div>
        <div className="boxes">
          <h1>Boxes</h1>
          <hr />
          <div></div>
        </div>
      </div>
      <div className="pdf">
        <Document
          file={`https://arxiv.org/pdf/2212.${searchParams.get("q")}.pdf`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={true}
            renderTextLayer={false}
          />
        </Document>
        <div className="pagination">
          <span onClick={showPrevPage}>
            <AiOutlineArrowLeft />
          </span>
          <span style={{ margin: "5px" }}>
            {pageNumber} of {numPages}
          </span>
          <span onClick={showNextPage}>
            <AiOutlineArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocPg;
