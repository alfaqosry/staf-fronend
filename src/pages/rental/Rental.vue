<script setup>
import Header from '../../components/Header.vue';
import Sidebar from '../../components/Sidebar.vue';
import Footer from '../../components/Footer.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { pinjamStore } from '../../stores/pinjamstore';
import { authStore } from '../../stores/authstore';
import { mobilStore } from '../../stores/mobilstore';


const useAuth = authStore();
const errmessage = ref();
const usePinjam = pinjamStore();
const useMobil = mobilStore();
const router = useRouter();
const allDates = ref([]);


function getDateRangeArray(start, end) {
    let dateArray = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
        dateArray.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}




const disableDates = (date) => {
    const today = new Date();
    const dateString = date.toISOString().split('T')[0];

    return (
        date < today ||
        allDates.value.includes(dateString)
    );
};

const dateFormat = 'yyyy/MM/dd';

const form = ref({
    user_id: '',
    mobil_id: router.currentRoute.value.params.id,
    tgl_pinjam_mulai: usePinjam.tglsewa.tgl_mulai,
    tgl_pinjam_akhir: usePinjam.tglsewa.tgl_akhir

});

const biayaSewa = ref({
    hari : 0,
    sewa : 0,
    total : 0
}); 

const hitungBiayaSewa = () => {
    if (!form.value.tgl_pinjam_mulai || !form.value.tgl_pinjam_akhir) {
        console.error('Tanggal mulai atau tanggal akhir tidak valid.');
        return 0;
    }

    const startDate = new Date(form.value.tgl_pinjam_mulai);
    const endDate = new Date(form.value.tgl_pinjam_akhir);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('Format tanggal tidak valid.');
        return 0;
    }

    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return Math.round(daysDifference) ;
};


watch(
    () => [form.value.tgl_pinjam_mulai, form.value.tgl_pinjam_akhir],
    ([tglMulai, tglAkhir]) => {
        if (tglMulai && tglAkhir) {
            biayaSewa.value.hari = hitungBiayaSewa();
            biayaSewa.value.total = biayaSewa.value.hari * biayaSewa.value.sewa;
        } else {
            biayaSewa.value.hari = 0;
        }
    }
);


const submitPinjam = async () => {

    try {
        await useAuth.getUser();

        form.value.user_id = useAuth.user.id
        const response = await usePinjam.pinjamMobil(router.currentRoute.value.params.id, form.value);
        console.log(response);
        if (response.status == 201) {
            router.push({ name: 'Mobil.Rental' })
        } else {
            console.log(response.response.data);
            errmessage.value = response.response.data;
        }

    } catch (error) {
        console.log(error);
        errmessage.value = error;
    }

}

onMounted(async () => {
    try {
        await usePinjam.getPinjamById(router.currentRoute.value.params.id);
        await useMobil.getMobilById(router.currentRoute.value.params.id)
        
        biayaSewa.value.sewa = useMobil.mobil.data.tarif_sewa;
        console.log(useMobil.mobil.data.tarif_sewa);
        usePinjam.pinjam.forEach(entry => {
            allDates.value = allDates.value.concat(getDateRangeArray(entry.tgl_mulai, entry.tgl_akhir));
        });
        biayaSewa.value.hari = hitungBiayaSewa();
        biayaSewa.value.total = biayaSewa.value.hari * biayaSewa.value.sewa;
    } catch (error) {
        console.error(error);
    }
});

const cancel = () => {
    router.push({ name: 'Mobil.Rental' })
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
                                    <h4 class="card-title">Pinjam Mobil {{ useMobil.mobil.data?.merek }}</h4>
                                    <!-- <p class="card-description"> Basic form elements </p> -->
                                    <form class="forms-sample" @submit.prevent="submitPinjam">
                                        <div class="form-group">
                                            <label for="tgl_mulai">Tanggal Mulai</label>
                                            <VueDatePicker placeholder="yyyy-mm-dd" v-model="form.tgl_pinjam_mulai"
                                                :disabled-dates="disableDates" :type="'date'" :format="dateFormat" />
                                            <small v-if="errmessage?.tgl_pinjam_mulai" class="text-danger">{{
                                                errmessage.tgl_pinjam_mulai[0]
                                                }}</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="tgl_akhir">Tanggal Akhir</label>
                                            <VueDatePicker placeholder="yyyy-mm-dd" v-model="form.tgl_pinjam_akhir"
                                                :disabled-dates="disableDates" :type="'date'" :format="dateFormat" />
                                            <small v-if="errmessage?.tgl_pinjam_akhir" class="text-danger">{{
                                                errmessage.tgl_pinjam_akhir[0]
                                                }}</small>
                                        </div>

                                        <button type="submit" class="btn btn-primary me-2" disabled
                                            v-if="usePinjam.isLoading"><span class="spinner-border spinner-border-sm"
                                                role="status" aria-hidden="true"></span>
                                            <span class="sr-only">Loading...</span></button>
                                        <button type="submit" class="btn btn-primary me-2" v-else>Simpan</button>
                                        <button class="btn btn-light" @click="cancel()">Cancel</button>
                                    </form>


                                </div>
                            </div>
                        </div>

                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">

                                    <h5>Jumlah Hari :{{ biayaSewa.hari
                                        }}</h5>
                                         <h5>Harga Sewa :{{ biayaSewa.sewa
                                        }}/Hari</h5>
                                         <h3 class="text-danger">Total :{{ biayaSewa.total
                                        }}</h3>

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