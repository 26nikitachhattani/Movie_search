<template>
   <div>
    <v-toolbar app color="primary" class="px-4" dark>
      <v-toolbar-title>Movie Finder</v-toolbar-title>
  
      <v-spacer />
  
      <NuxtLink to="/" class="nav-link">
        <v-btn text icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <span class="d-none d-sm-inline">Search</span>
      </NuxtLink>
  
      <NuxtLink to="/favorites" class="nav-link">
        <v-btn text icon to="/favorites">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <span class="d-none d-sm-inline">Favorites</span>
      </NuxtLink>
    </v-toolbar>
   </div>
  </template>
  
  <style scoped>
  .nav-link {
    display: flex;
    align-items: center;
    margin-left: 12px;
    text-decoration: none;
    color: white;
  }
  .nav-link:hover {
    color: #ffcccc;
  }
  </style>
  