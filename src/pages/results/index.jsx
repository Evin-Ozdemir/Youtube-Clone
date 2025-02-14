import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import Error from "../../components/error";
import BasicLoader from "../../components/basic-loader";
import Card from "../../components/card";

const Results = () => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Url deki arama parametresine eriş
  const [params] = useSearchParams();
  const query = params.get("search_query");

  // Api den aratılan kelimeye uygun videoları al
  useEffect(() => {
    // Api isteği atılmadan hemen önce yükleniyor state'ini true çek
    setIsLoading(true);

    // Gönderilecek parametreleri ayarla
    const params = { query, token: page > 1 ? token : undefined };

    // Api isteği at
    api
      .get("/search", { params })
      .then((res) => {
        setData((prev) => [...prev, ...res.data.data]);
        setToken(res.data.continuation);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  // Her yeni bir şey aratıldığınca önceki sonuçları temizle
  useEffect(() => {
    setData([]);
    setToken(null);
    setPage(1);
  }, [query]);

  return (
    <div className="p-4 sm:p-6 md:p-10 h-[93vh] overflow-auto">
      <h2 className="text-xl mb-5">
        <span className="font-bold me-2">{query}</span>
        <span>için sonuçlar</span>
      </h2>
      {error && <Error msg={error} />}

      <div className="wrapper flex flex-col gap-5 justify-center">
        {data.map((item, key) => {
          return <Card key={key} item={item} isRow />;
        })}
      </div>
      {isLoading && <BasicLoader />}

      <div className="flex justify-center my-10">
        {!isLoading && (
          <button
            className="bg-secondary py-2 px-5 rounded-md hover:bg-zinc-800 transition"
            onClick={() => setPage(page + 1)}
          >
            Daha Fazla
          </button>
        )}
      </div>
    </div>
  );
};

export default Results;
