import { BrowserRouter, Routes, Route } from "react-router-dom";
import Results from "./pages/results";
import Feed from "./pages/feed";
import Detail from "./pages/detail";
import Header from "./components/header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/watch" element={<Detail />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
