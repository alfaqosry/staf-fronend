<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item" :class="{ 'active': isActive('/') }">
        <router-link class="nav-link" :to="{ name: 'Home' }">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Dashboard</span>
        </router-link>
      </li>

      <li class="nav-item " :class="{ 'active': isActive('/pegawai') }">
        <router-link class="nav-link" :to="{ name: 'Pegawai' }">
          <i class="mdi mdi-account menu-icon"></i>
          <span class="menu-title">Pegawai</span>
        </router-link>
      </li>
      <li class="nav-item " :class="{ 'active': isActive('/deparment') }">
        <router-link class="nav-link" :to="{ name: 'Department' }">
          <i class="fa fa-bank menu-icon"></i>
          <span class="menu-title">Department</span>
        </router-link> 
      </li>
      <li class="nav-item " :class="{ 'active': isActive('/absensi') }">
        <router-link class="nav-link" :to="{ name: 'Absensi' }">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Absensi</span>
        </router-link>
      </li>
      <li class="nav-item " :class="{ 'active': isActive('/daftar-izin-cuti') }">
        <router-link class="nav-link" :to="{ name: 'Cuti' }">
          <i class="mdi mdi-checkbox-multiple-marked-outline menu-icon"></i>
          <span class="menu-title">Pengajuan Cuti</span>
        </router-link>
      </li>
      <!-- <li class="nav-item " :class="{ 'active': isActive('/penugasan') }">
        <router-link class="nav-link" :to="{ name: 'Penugasan' }">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Penugasan</span>
        </router-link>
      </li> -->

    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const isActive = (path) => {
      return route.path !== '/' && route.path.startsWith(path);
    };

    return {
      isActive,
    };
  },
};
</script>