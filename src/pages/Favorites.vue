<!-- pages/Favorites.vue -->
<template>
  <div>
    <h1>My Favorite Movies</h1>
    <div v-if="favorites.length" class="movie-grid">
      <MovieCard
        v-for="movie in favorites"
        :key="movie.imdbID"
        :movie="movie"
      />
    </div>
    <p v-else>No favorites added yet.</p>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import MovieCard from "@/components/MovieCard.vue";

const store = useStore();
const favorites = computed(() => store.getters.allFavorites);
</script>
<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(520px, 1fr));
  gap: 2rem;
  padding: 2rem;
  justify-items: center;
}
</style>
