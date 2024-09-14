<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <RouterLink :to="{name:'Home'}" class="nav-link " aria-current="page" href="#">Home</RouterLink>
        <RouterLink class="nav-link" v-if="!useAuth.user" :to="{name:'Login'}" >Login</RouterLink>
        <!-- <RouterLink  v-if="useAuth.user" @click="$event => useAuth.logOut" class="nav-link" >
          Logout
        </RouterLink>  -->
        <button v-if="useAuth.user"  @click="useAuth.logOut" class="nav-link">
  Logout
</button> 
        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
      </div>
    </div>
  </div>
</nav>
</template>

<script setup>

import { authStore} from '../stores/authstore';
const useAuth = authStore();

</script>