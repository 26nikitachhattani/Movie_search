<template>
    <v-card class="cursor-pointer">
      <v-img :src="movie.Poster" height="300px" @click="goToMovie(movie.imdbID)" />
      <v-card-title>{{ movie.Title }}</v-card-title>
      <v-card-subtitle>{{ movie.Year }}</v-card-subtitle>
      <v-card-actions>
        <v-btn @click.stop="toggleFavorite">
          {{ isFav ? '💔 Remove Favorite' : '❤️ Add to Favorite' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  const props = defineProps({ movie: Object })
  const store = useStore()
  const router = useRouter()
  
  const isFav = computed(() => store.getters.isFavorite(props.movie.imdbID))
  
  function toggleFavorite() {
    if (isFav.value) {
      store.commit('REMOVE_FROM_FAVORITES', props.movie.imdbID)
    } else {
      store.commit('ADD_TO_FAVORITES', props.movie)
    }
  }
  
  function goToMovie(id) {
    router.push(`/movie/${id}`)
  }
  </script>
  
  <style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  </style>
  