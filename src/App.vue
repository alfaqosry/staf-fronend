<script setup>
import Nav from './components/Nav.vue';
import Login from './pages/Login.vue';
import Sidebar from './components/Sidebar.vue';
import Footer from './components/Footer.vue'
import Header from './components/Header.vue';

import { useRoute } from 'vue-router';


const route = useRoute();

const isLoginPage = route.name === 'Login';

console.log(route.name)
</script>
<!-- 
<template>
  <div class="d-flex">

  <Nav v-if="!isLoginPage" />
  <Sidebar/>
  <router-view></router-view>

</div>

</template> -->


<template>
    <router-view></router-view>
</template>