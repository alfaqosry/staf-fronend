<!-- <template>
    

    <div class="container">
        <h1>Home</h1>

        <div v-if="useAuth.user">

            <h3>{{useAuth.user.name}}</h3>
            <h3>{{useAuth.user.email}}</h3>
        </div>
        <div v-else>

            <h3>No Data</h3>
        </div>
        

    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import { authStore} from '../stores/authstore';
const useAuth = authStore();
console.log(useAuth)



onMounted( async () => {
    useAuth.getUser();
})



</script> -->

<script setup>
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';</script>
<template>
    <div class="container-scroller">
      <Header />

      <div class="container-fluid page-body-wrapper">
      <!-- partial:partials/_sidebar.html -->
      <Sidebar />
      <!-- partial -->

      <!-- main-panel ends -->
      <h1>Home</h1>
      <v-app>
    <v-container>
      <v-date-picker
        v-model="selectedDate"
        :allowed-dates="allowedDates"
        label="Select a date"
      ></v-date-picker>
    </v-container>
  </v-app>
    </div>

     
    </div>
</template>