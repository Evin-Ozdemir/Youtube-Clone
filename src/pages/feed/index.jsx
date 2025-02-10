import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../utils/api";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/card";
import Error from "../../components/error";
import Loader from "../../components/loader";

const Feed = () => {
  //Tutulan state'ler
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);

  //Url deki kategori arama parametresine eriştik
  const [params] = useSearchParams();
  const selected = params.get("category");

  // Kategori her değiştiğinde ilgili api endpointine istek at
  useEffect(() => {
    // Loading devreye girmesi için state'i temizle
    setVideos(null);

    //Kategoriye bağlı istek atılarak url'i belirle
    const url = !selected
      ? "/home"
      : selected === "trending"
      ? "/trending"
      : `/search?query=${selected}`;

    // Api isteği at
    api
      .get(url, {
        params: { geo: "TR", lang: "tr" },
      })
      .then((res) => setVideos(res.data.data))
      .catch((err) => setError(err.message));
  }, [selected]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="videos">
        {error ? (
          <Error msg={error} />
        ) : !videos ? (
          <Loader />
        ) : (
          videos.map((i, key) => <Card key={key} item={i} />)
        )}
      </div>
    </div>
  );
};

export default Feed;
