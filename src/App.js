import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocLi from "./components/DocLi";
import DocPg from "./components/DocPg";
// const Navbar = React.lazy(() => import("./components/common/Navbar"));

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}></Suspense> */}
        <Routes>
          <Route path="/" element={<DocLi />} />
          <Route path="/doc" element={<DocPg />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
