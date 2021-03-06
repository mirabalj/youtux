import { combineReducers } from 'redux';
import {
  SEARCH_VIDEOS,
  SAVE_VIDEO,
  SHOW_MY_VIDEOS,
  CHANGE_TEXT,
  CHANGE_CHANNEL,
} from '../actions'

const initialMyVideos = () => {
  return JSON.parse(localStorage.getItem('myVideos'));
}

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
    case CHANGE_TEXT:
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
    case SHOW_MY_VIDEOS:
      const myVideos = localStorage.getItem('myVideos');
      return JSON.parse(myVideos);
    default:
      return state
  }
}

const myVideos = (state = initialMyVideos(), action) => {
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

const channels = (state = [], action) => {
  switch (action.type) {
    case SEARCH_VIDEOS:
      const channels = action.videos.map(video => video.snippet.channelTitle)
      return [...new Set(channels)]
    default:
      return state
  }
}

const filterChannel = (state = '', action) => {
  switch (action.type) {
    case CHANGE_CHANNEL:
      return action.text
    default:
      return state
  } 
}

const rootReducer = combineReducers({
  textToSearch,
  videos,
  myVideos,
  channels,
  filterChannel,
});

export default rootReducer;
