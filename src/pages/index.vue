<template>
  <v-container>
    <div class="d-flex">
      <v-text-field
        v-model="search"
        label="Search for movies"
        @keyup.enter="fetchMovies"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        class="mx-2"
      ></v-text-field>

      <!-- <v-text-field
        v-model="year"
        label="Year (optional)"
        type="number"
        variant="outlined"
        class="mx-2"
      ></v-text-field> -->
      <v-select
        v-model="selectedGenre"
        :items="genres"
        label="Select Genre"
        item-title="name"
        item-value="id"
        variant="outlined"
        class="mx-2"
      ></v-select>
    </div>

    <v-row class="mt-4">
      <v-col
        v-for="movie in movies"
        :key="movie.imdbID"
        cols="12" sm="6" md="4"
      >
        <Moviecard :movie="movie" />
      </v-col>
    </v-row>

    <v-alert
      v-if="movies.length === 0 && search"
      type="info"
      class="mt-6"
    >
      No movies found.
    </v-alert>

    <v-pagination
      v-if="totalPages > 1"
      v-model="page"
      :length="totalPages"
      @input="fetchMovies"
      class="mt-6 d-flex justify-center"
    />
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'

const search = ref('')
const year = ref('')
const page = ref(1)
const movies = ref([])
const totalPages = ref(1)

const genres = [
  { id: '28', name: 'Action' },
  { id: '35', name: 'Comedy' },
  { id: '18', name: 'Drama' },
  { id: '27', name: 'Horror' },
]
const selectedGenre = ref(null)

const getGenreName = (id) => {
  const genre = genres.find(g => g.id === id)
  return genre?.name || ''
}

const fetchMovies = async () => {
  if (!search.value) return

  const query = new URLSearchParams({
    apikey: '62c884a',
    s: search.value,
    page: page.value,
  })

  if (year.value) query.append('y', year.value)

  const res = await fetch(`https://www.omdbapi.com/?${query.toString()}`)
  const data = await res.json()

  if (data.Response === 'False') {
    movies.value = []
    totalPages.value = 1
    return
  }

  let results = data.Search || []

  // Optional manual filtering for genre
  if (selectedGenre.value) {
    const filtered = []
    for (const movie of results) {
      const movieRes = await fetch(`https://www.omdbapi.com/?apikey=62c884a&i=${movie.imdbID}`)
      const movieData = await movieRes.json()
      if (
        movieData.Genre &&
        movieData.Genre.toLowerCase().includes(getGenreName(selectedGenre.value).toLowerCase())
      ) {
        filtered.push(movie)
      }
    }
    results = filtered
  }

  movies.value = results
  totalPages.value = Math.ceil(data.totalResults / 10) || 1
}

watch([search, year, selectedGenre], () => {
  page.value = 1
  fetchMovies()
})

watch(page, () => {
  if (search.value) fetchMovies()
})
</script>
