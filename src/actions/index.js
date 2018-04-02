import axios from 'axios';
export const SEARCH_VIDEOS = 'SEARCH_VIDEOS';

const API_KEY = 'AIzaSyDK7Jus-yWofaJKGRwDD5gPpZX62t7j47s';
const YOUTUBE_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=`;

export const searchVideos = (text = '') => {
  if (!text) return {
    type: SEARCH_VIDEOS,
    text,
    videos: [],
  }
  return (dispatch, getState) => {
    axios.get(`${YOUTUBE_URL}${text}`)
      .then((response) => {
        console.log(response.data.items);
        dispatch({ type: SEARCH_VIDEOS, text, videos: response.data.items })
      })
  }
}
