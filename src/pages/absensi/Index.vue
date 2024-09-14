<script setup>
import Sidebar from '../../components/Sidebar.vue';
import Header from '../../components/Header.vue';
import { ref, onMounted, computed } from 'vue';

import { absensiStore } from '../../stores/absensistore';


const useAbsensi = absensiStore();

const absensis = ref();

onMounted(async () => {

    try {
        const response = await useAbsensi.getAbsensiAll()
        absensis.value = useAbsensi.dataAbsen.data
        console.log(useAbsensi.dataAbsen)
    } catch (error) {

    }

})
</script>


<template>

    <div class="container-scroller">
        <Header />

        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_sidebar.html -->
            <Sidebar />
            <!-- partial -->

            <!-- main-panel ends -->
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-6">
                            <form>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Cari..." aria-label="Search"
                                        aria-describedby="search-icon" v-model="searchQuery">
                                    <span class="input-group-text" id="search-icon">
                                        <i class="icon-search"></i>
                                    </span>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div class="row">

                        <div class="col-lg-12 grid-margin stretch-card">

                            <div class="card">
                                <div class="card-body">
                                    <div class="d-sm-flex justify-content-between align-items-start">
                                        <div>
                                            <h4 class="card-title card-title-dash">Kelolah Absensi</h4>
                                        </div>
                                        <!-- <div>
                                            <router-link class="btn btn-primary  text-white mb-0 me-0"
                                                :to="{ name: 'Pegawai.Create' }"><i class="mdi mdi-account-plus"></i>
                                                Tambah Pegawai</router-link>
                                        </div> -->
                                    </div>
                                    <div v-if="useAbsensi.isLoading.halaman">
                                        <paragraph-shimmer class="mt-3" :is-loading="true" :lines="4"
                                            :random-size="false" />
                                    </div>

                                    <div class="table-responsive" v-else>
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th> No </th>
                                                    <th> Nama </th>
                                                    <th>Masuk</th>
                                                    <th>Keluar</th>
                                                    <th>Status</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(absensi, index) in absensis">
                                                    <td> {{ index + 1 }} </td>

                                                    <td> {{ absensi.user?.name }} </td>
                                                    <td>
                                                        <div class="badge badge-success">{{ absensi.check_in }}</div>
                                                    </td>
                                                    <td>
                                                        <div class="badge badge-danger">{{ absensi.check_out }}</div>
                                                    </td>
                                                    <td>
                                                        <div class="badge badge-warning">{{ absensi.status }}</div>
                                                    </td>



                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    </div>



</template>
