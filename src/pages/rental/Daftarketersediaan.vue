<script setup>
import Sidebar from '../../components/Sidebar.vue';
import Header from '../../components/Header.vue';
import { ref, onMounted } from 'vue';
import { pinjamStore } from '../../stores/pinjamstore';
import { authStore } from '../../stores/authstore';
import { useRouter } from 'vue-router';

const router = useRouter();



const usePinjam = pinjamStore();
const mobils = ref();
const form = ref({
    tgl_mulai: '',
    tgl_akhir: ''
})

const dateFormat = 'yyyy/MM/dd';
const submitKetersediaan = async () => {

    try {
        const response = await usePinjam.cekKetersediaan(form.value)

        mobils.value = usePinjam.mobil.data
        console.log(usePinjam.mobil.data)

    } catch (error) {
        console.log(error)
    }
}

const sewa = (id) => {

    usePinjam.pilihTanggal(form.value);
    router.push({ name: 'Mobil.Rental', params: { id: id } })

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
                                    <h4 class="card-title">Cek ketersediaan Mobil</h4>
                                    <!-- <p class="card-description"> Basic form elements </p> -->
                                    <form class="forms-sample" @submit.prevent="submitKetersediaan">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="tgl_mulai">Tanggal Mulai</label>
                                                    <VueDatePicker placeholder="yyyy-mm-dd" v-model="form.tgl_mulai"
                                                        :type="'date'" :format="dateFormat" />
                                                    <small v-if="errmessage?.tgl_pinjam_mulai" class="text-danger">{{
                                                        errmessage.tgl_mulai[0]
                                                    }}</small>
                                                </div>
                                            </div>

                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="tgl_akhir">Tanggal Akhir</label>
                                                    <VueDatePicker placeholder="yyyy-mm-dd" v-model="form.tgl_akhir"
                                                        :type="'date'" :format="dateFormat" />
                                                    <small v-if="errmessage?.tgl_akhir" class="text-danger">{{
                                                        errmessage.tgl_pinjam_akhir[0]
                                                    }}</small>
                                                </div>
                                            </div>

                                        </div>

                                        <button type="submit" class="btn btn-primary me-2" disabled
                                            v-if="usePinjam.isLoading"><span class="spinner-border spinner-border-sm"
                                                role="status" aria-hidden="true"></span>
                                            <span class="sr-only">Loading...</span></button>
                                        <button type="submit" class="btn btn-primary me-2" v-else>Cek</button>
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
                                                    <th> Merek </th>
                                                    <th> Model </th>
                                                    <th> Plat Nomor </th>
                                                    <th> Tarif </th>
                                                    <th> Status </th>
                                                    <th> Aksi </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="mobils && mobils.length > 0" v-for="mobil in mobils">

                                                    <td> {{ mobil.merek }} </td>
                                                    <td> {{ mobil.model }} </td>
                                                    <td> {{ mobil.plat_nomor }} </td>
                                                    <td> Rp. {{ mobil.tarif_sewa }} </td>
                                                    <td> <button class="btn btn-primary" @click="sewa(mobil.id)">Sewa
                                                        </button> </td>

                                                </tr>
                                                <tr v-else>
                                                    <td colspan="6" align="center">Mobil tidak tersedia di tanggal yang
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
