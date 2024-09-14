<script setup>
import Sidebar from '../../components/Sidebar.vue';
import Header from '../../components/Header.vue';
import { ref, onMounted } from 'vue';
import { pinjamStore } from '../../stores/pinjamstore';
import { useRouter } from 'vue-router';

const router = useRouter();



const usePinjam = pinjamStore();
const mobils = ref();
const form = ref({
    plat_nomor: '',

})


const submitPlat = async () => {

    try {

        const response = await usePinjam.kembalikanMobil(form.value);
        console.log(usePinjam.mobil)

        mobils.value = usePinjam.mobil
        console.log(mobils.value)

    } catch (error) {
        console.log(error)

    }
}

const kembalikan = async (id) => {
    try {
        const response = await usePinjam.postPengembalian(id);
        console.log(response)
        await submitPlat();
    } catch (error) {

    }
}




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
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Kembalikan Mobil</h4>
                                    <!-- <p class="card-description"> Basic form elements </p> -->
                                    <form class="forms-sample" @submit.prevent="submitPlat()">
                                        <div class="row">
                                            <div class="col-lg-9">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="plat_nomor"
                                                        placeholder="Masukan Plat Nomor" v-model="form.plat_nomor">
                                                    <small v-if="errmessage?.plat_nomor" class="text-danger">{{
                                                        errmessage.plat_nomor[0]
                                                    }}</small>
                                                </div>
                                            </div>


                                            <div class="col-lg-3">

                                                <div class="form-group">
                                                    <button type="submit" class="btn btn-primary me-2" disabled
                                                        v-if="usePinjam.isLoading"><span
                                                            class="spinner-border spinner-border-sm" role="status"
                                                            aria-hidden="true"></span>
                                                        <span class="sr-only">Loading...</span></button>
                                                    <button type="submit" v-else class="btn btn-primary">Cari</button>
                                                </div>
                                            </div>

                                        </div>


                                    </form>


                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
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
                                                    <th>Penyewa</th>
                                                    <th> Merek </th>
                                                    <th> Model </th>
                                                    <th> Plat Nomor </th>
                                                    <th> Tarif </th>
                                                    <th> Status </th>
                                                    <th>Durasi</th>
                                                    <th> Aksi </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="mobils && mobils.length > 0" v-for="mobil in mobils">
                                                    <td>{{ mobil.user.name }}</td>

                                                    <td> {{ mobil.mobil.merek }} </td>
                                                    <td> {{ mobil.mobil.model }} </td>
                                                    <td> {{ mobil.mobil.plat_nomor }} </td>
                                                    <td> Rp. {{ mobil.mobil.tarif_sewa }} </td>
                                                    <td>{{ mobil.status }}</td>

                                                    <td>{{ mobil.tgl_mulai }} - {{ mobil.tgl_akhir }}</td>
                                                    <td> <button class="btn btn-primary"
                                                            @click="kembalikan(mobil.id)">Kembalikan
                                                        </button> </td>

                                                </tr>
                                                <tr v-else>
                                                    <td colspan="8" align="center">Mobil tidak tersedia di tanggal yang
                                                        anda pilih</td>
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
