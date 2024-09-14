<script setup>
import Sidebar from '../../components/Sidebar.vue';
import Header from '../../components/Header.vue';
import { ref, onMounted } from 'vue';
import { pinjamStore } from '../../stores/pinjamstore';
import { authStore } from '../../stores/authstore';



const usePinjam = pinjamStore();
const useAuth = authStore();
const pinjams = ref();
onMounted(async () => {
    try {
        await useAuth.getUser();
        const user = await usePinjam.getPinjamByUser(useAuth.user?.id);

        pinjams.value = usePinjam.pinjam;

        console.log(pinjams.value);
        console.log(user);
    } catch (error) {
        console.error('Error fetching data:', error);
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

                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-sm-flex justify-content-between align-items-start">
                                        <div>
                                            <h4 class="card-title card-title-dash">Mobil</h4>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <div v-if="usePinjam.isLoading"
                                        class="d-flex justify-content-center align-items-center">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>

                                    <div class="table-responsive" v-else>
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>

                                                    <th> Durasi</th>
                                                    <th> Merek </th>
                                                    <th> Model </th>
                                                    <th> Plat Nomor </th>
                                                    <th> Tarif </th>
                                                    <th> Status </th>
                                                    <th> Aksi </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="pinjam in pinjams">


                                                    <td> {{ pinjam.tgl_mulai }} - {{ pinjam.tgl_akhir }} </td>
                                                    <td> {{ pinjam.mobil.merek }} </td>
                                                    <td> {{ pinjam.mobil.model }} </td>
                                                    <td> {{ pinjam.mobil.plat_nomor }} </td>
                                                    <td> Rp. {{ pinjam.mobil.tarif_sewa }} </td>
                                                    <td></td>
                                                    <td></td>



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
