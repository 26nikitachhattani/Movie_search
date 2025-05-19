// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    favorites: []
  },
  mutations: {
    ADD_TO_FAVORITES(state, movie) {
      const exists = state.favorites.find(m => m.imdbID === movie.imdbID)
      if (!exists) state.favorites.push(movie)
    },
    REMOVE_FROM_FAVORITES(state, movieId) {
      state.favorites = state.favorites.filter(m => m.imdbID !== movieId)
    }
  },
  getters: {
    isFavorite: (state) => (id) => state.favorites.some(m => m.imdbID === id),
    allFavorites: (state) => state.favorites
  }
})
