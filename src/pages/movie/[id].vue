<template>
  <v-container v-if="movie">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="movie.Poster" height="500px" />
      </v-col>

      <v-col cols="12" md="8">
        <h1>{{ movie.Title }} ({{ movie.Year }})</h1>
        <p><strong>IMDB Rating:</strong> {{ movie.imdbRating }}</p>
        <p><strong>Runtime:</strong> {{ movie.Runtime }}</p>
        <p><strong>Genre:</strong> {{ movie.Genre }}</p>
        <p><strong>Director:</strong> {{ movie.Director }}</p>
        <p><strong>Release date:</strong> {{ movie.Released }}</p>
        <p><strong>Plot:</strong> {{ movie.Plot }}</p>
        <p><strong>Actors:</strong> {{ movie.Actors }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const movie = ref(null)

const fetchMovieDetails = async () => {
  const id = route.params.id
  const res = await fetch(`https://www.omdbapi.com/?apikey=62c884a&i=${id}&plot=full`)
  const data = await res.json()
  movie.value = data
}

onMounted(() => {
  fetchMovieDetails()
})
</script>
