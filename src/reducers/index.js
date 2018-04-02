import { combineReducers } from 'redux';
import {
  SEARCH_VIDEOS, SAVE_VIDEO
} from '../actions'

const foundId = (videos, id) => {
  const found = videos.find((video) => {
    return video.id === id
  })
  return (found !== undefined);
}

const textToSearch = (state = '', action) => {
  switch (action.type) {
    case SEARCH_VIDEOS:
      return action.text
    default:
      return state
  }
}

const videos = (state = [], action) => {
  switch (action.type) {
    case SEARCH_VIDEOS:
    return action.videos.map(video => ({
      id: video.id.videoId,
      title: video.snippet.title,
      user: video.snippet.channelTitle,
      thumbnail: video.snippet.thumbnails.high.url,
      year: video.snippet.publishedAt.substr(0,4),
    }))
    default:
      return state
  }
}

const myVideos = (state = [], action) => {
  switch (action.type) {
    case SAVE_VIDEO:
      if (foundId(state, action.video.id)) return state;
      const serializedVideos = JSON.stringify([...state, action.video])
      localStorage.setItem('myVideos', serializedVideos);
      return [
        ...state,
        action.video,
      ]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  textToSearch,
  videos,
  myVideos,
});

export default rootReducer;
