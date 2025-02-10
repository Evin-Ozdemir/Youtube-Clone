import millify from "millify";
import { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ item, isRow }) => {
  // Mouse card'ın üzerinde mi state 'i
  const [isHover, setIsHover] = useState(false);

  // Eğer elemanın tipi video değilse ekrana bir şey basma
  if (item.type !== "video") return null;

  // Kapak Fotoğrafı
  const thumbnail = item.thumbnail[item.thumbnail.length - 1].url;

  // Gifli kapak fotoğrafı
  const gif = item.richThumbnail && item.richThumbnail[0].url;

  // Kanal fotoğrafı
  const channelPic = item.channelThumbnail && item.channelThumbnail[0].url;

  return (
    <Link
      to={`/watch?v=${item.videoId}`}
      className={isRow ? "row" : "col"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div>
        <img
          src={isHover && gif ? gif : thumbnail}
          className="rounded-lg w-full h-full"
        />
      </div>
      <div className="flex gap-4">
        <img src={channelPic} className="size-14 rounded-full pp" />

        <div>
          <h4 className="font-bold line-clamp-2">{item.title}</h4>
          <p>{item.channelTitle}</p>
          <div className="flex gap-3 items-center">
            <p>
              <span>{millify(item.viewCount)}</span>
              <span className="text-sm ms-1 views">Görüntülenme</span>
            </p>
            *
            {item.isLive ? (
              <p className="bg-red-500 py-0.5 px-2 rounded-lg">Canlı</p>
            ) : (
              <p>{item.publishedTimeText}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
