import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ArticleDetails from "./pages/ArticleDetails";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/:id" element={<ArticleDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
