import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { useSearchParams } from "react-router-dom";

const DocPg = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [annoType, setAnnoType] = useState(null);
  const [start, setStart] = useState({ xa: 0, ya: 0 });
  const [end, setEnd] = useState({ xa: 0, ya: 0 });
  const [numPages, setNumPages] = useState(null);
  const [anno, setAnno] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const fetchPdf = () => {
    const pdf = [];
    for (let index = 1; index < numPages; index++) {
      // const element = array[index];
      pdf.push(
        <Page
          key={index}
          pageNumber={index}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          onMouseDown={(e) => startHighlight(e)}
          onMouseUp={(e) => stopHighlight(e)}
          loading={index !== 1 && ""}
        />
      );
    }
    return pdf;
  };

  const startHighlight = (e) => {
    const init = e.target.getBoundingClientRect();
    setStart({ xa: e.clientX - init.left, ya: e.pageY });
  };
  const stopHighlight = (e) => {
    const init = e.target.getBoundingClientRect();
    setEnd({ xa: e.clientX - init.left, ya: e.pageY });
    if (annoType) {
      const div = document.createElement("div");
      div.style.backgroundColor =
        annoType === "title" ? "#ff7f5063" : "#0d919170";
      div.style.zIndex = 100;
      div.style.position = "absolute";
      div.style.left = start.xa + "px";
      div.style.top = start.ya + "px";
      div.setAttribute("key", anno.length);
      const width = e.clientX - init.left - start.xa;
      const height = e.pageY - start.ya;
      div.style.width = width + "px";
      div.style.height = height + "px";
      // document.getElementsByClassName("pdf")[0].appendChild(div);
      setAnno([
        ...anno,
        {
          pdfId: searchParams.get("q"),
          xa: start.xa,
          ya: start.ya,
          height,
          width,
          annoType,
        },
      ]);
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...anno,
          {
            pdfId: searchParams.get("q"),
            xa: start.xa,
            ya: start.ya,
            height,
            width,
            annoType,
          },
        ])
      );
    }
  };
  useEffect(() => {
    // fetchPdf();
    setAnno(JSON.parse(localStorage.getItem("data")));
  }, []);

  return (
    <div className="DocPg">
      <div className="sidebar">
        <div className="lebles">
          <h1>Lebles</h1>
          <hr />
          <div className="lebles_div">
            <div className="title" onClick={() => setAnnoType("title")}>
              Title
            </div>
            <div className="author" onClick={() => setAnnoType("author")}>
              Author
            </div>
          </div>
        </div>
        <div className="boxes">
          <h1>Boxes</h1>
          <hr />
          {annoType &&
            anno
              .filter((it) => it.pdfId == `${searchParams.get("q")}`)
              .map((item, idx) => (
                <div key={idx} className="boxes_div">
                  <div>
                    x: {item.xa}, y: {item.ya}, height: {item.height}, width:
                    {item.width}
                  </div>
                  {item.annoType == "author" ? (
                    <div className="author">Author</div>
                  ) : (
                    <div className="title">Title</div>
                  )}
                </div>
              ))}
        </div>
      </div>
      <div className="pdf">
        {annoType &&
          anno
            .filter((it) => it.pdfId == `${searchParams.get("q")}`)
            .map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor:
                    item.annoType === "title" ? "#ff7f5063" : "#0d919170",
                  zIndex: 100,
                  position: "absolute",
                  left: `${item.xa}px`,
                  top: `${item.ya}px`,
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                }}
              ></div>
            ))}
        <Document
          file={`https://arxiv.org/pdf/2212.${searchParams.get("q")}.pdf`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {fetchPdf()}
        </Document>
      </div>
    </div>
  );
};

export default DocPg;
