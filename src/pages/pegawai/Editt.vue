<script setup>
import Header from '../../components/Header.vue';
import Sidebar from '../../components/Sidebar.vue';
import Footer from '../../components/Footer.vue';

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { mobilStore } from '../../stores/mobilstore';

const router = useRouter();
const form = ref({
    merek: '',
    model: '',
    plat_nomor: '',
    tarif_sewa: ''
});

const errmessage = ref();
const useMobil = mobilStore();

const loadMobil = async () => {
    try {
        const response = await useMobil.getMobilById(router.currentRoute.value.params.id);
        if (useMobil.dataMobil) {
            form.value = {
                merek: useMobil.dataMobil.data.merek,
                model: useMobil.dataMobil.data.model,
                plat_nomor: useMobil.dataMobil.data.plat_nomor,
                tarif_sewa: useMobil.dataMobil.data.tarif_sewa
            };

            console.log(response)
        }
    } catch (error) {
        errmessage.value.gagal = "Gagal memuat data mobil.";
    }
}

const submitMobil = async () => {
    try {
        const response = await useMobil.updateMobil(router.currentRoute.value.params.id, form.value);
        if (response.status == 200 || response.status == 201) {
            router.push({ name: 'Mobil' });
        } else {
            console.log(response.response.data);
            errmessage.value = response.response.data;
        }
    } catch (error) {
        console.log(error.response);
        errmessage.value = error.response.data;
    }
};

onMounted(() => {
    loadMobil();
});

const cancel = () => {
   router.push({name: 'Mobil'})
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
                                    <h4 class="card-title">Tambah Mobil</h4>

                                    <div v-if="useMobil.isLoading"
                                        class="d-flex justify-content-center align-items-center">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <!-- <p class="card-description"> Basic form elements </p> -->
                                    <form class="forms-sample" @submit.prevent="submitMobil" v-else>
                                        <div class="form-group">
                                            <label for="merek">Merek</label>
                                            <input type="text" class="form-control" id="merek" placeholder="Merek"
                                                v-model="form.merek">
                                            <small v-if="errmessage?.merek" class="text-danger">{{ errmessage.merek[0]
                                                }}</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="model">Model</label>
                                            <input type="text" class="form-control" id="model" placeholder="Model"
                                                v-model="form.model">
                                            <small v-if="errmessage?.model" class="text-danger">{{ errmessage.model[0]
                                                }}</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="plat_nomor">Plat Nomor</label>
                                            <input type="text" class="form-control" id="plat_nomor"
                                                placeholder="Plat Nomor" v-model="form.plat_nomor">
                                            <small v-if="errmessage?.plat_nomor" class="text-danger">{{
                                                errmessage.plat_nomor[0] }}</small>
                                        </div>

                                        <div class="form-group">
                                            <label for="tarif">Tarif</label>
                                            <input type="text" class="form-control" id="tarif" placeholder="Tarif"
                                                v-model="form.tarif_sewa">
                                            <small v-if="errmessage?.tarif_sewa" class="text-danger">{{
                                                errmessage.tarif_sewa[0] }}</small>
                                        </div>
                                        <button type="submit" class="btn btn-primary me-2" disabled
                                            v-if="useMobil.isLoading"><span class="spinner-border spinner-border-sm"
                                                role="status" aria-hidden="true"></span>
                                            <span class="sr-only">Loading...</span></button>
                                        <button type="submit" class="btn btn-primary me-2" v-else>Simpan</button>
                                        <button class="btn btn-light" @click="cancel()">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- footer -->

                <Footer />
            </div>
        </div>


    </div>



</template>