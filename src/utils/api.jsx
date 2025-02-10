import axios from "axios";

// Axios'un temel ayarları yapılmış olan bir kopyasını oluştur
const api = axios.create({
  baseURL: "https://yt-api.p.rapidapi.com",

  Headers: {
    "x-rapidapi-key": "ce27947c22msh8299683b5d89d9bp16b3c6jsned78870fc69f",
    "x-rapidapi-host": "yt-api.p.rapidapi.com",
  },
});

export default api;
