<script setup>
import Header from '../../components/Header.vue';
import Sidebar from '../../components/Sidebar.vue';
import Footer from '../../components/Footer.vue';

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { pegawaiStore } from '../../stores/pegawaistore';
import { departmentStore } from '../../stores/departmentstore';

const router = useRouter();
const form = ref({
    name: '',
    email: '',
    phone_number: '',
    position: '',
    department_id: '',
    address: '',
    hire_date: '',
    salary: '',
    password: ''

});

const errmessage = ref();
const departments = ref();
const usePegawai = pegawaiStore();
const useDeparment = departmentStore();

const loadPegawai = async () => {

    try {
        const response = await usePegawai.getPegawaiById(router.currentRoute.value.params.id)
        console.log(response);
        
        if (usePegawai.dataPegawai) {

            form.value = {
                name: usePegawai.dataPegawai.data.name,
                email: usePegawai.dataPegawai.data.email,
                phone_number: usePegawai.dataPegawai.data.phone_number,
                position: usePegawai.dataPegawai.data.position,
                department_id: usePegawai.dataPegawai.data.department_id ,
                address: usePegawai.dataPegawai.data.address,
                hire_date: usePegawai.dataPegawai.data.hire_date,
                salary: usePegawai.dataPegawai.data.salary,
                
            }

        }

    } catch (error) {

    }

}

const submitPegawai = async () => {


    try {
        const response = await usePegawai.update(router.currentRoute.value.params.id,form.value);
        console.log(response.status)

        if (response.status === 200) {
            router.push({ name: 'Pegawai' });
        } else {
            console.log(response.data);
            errmessage.value = response.data.errors; 
        }



    } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 422) {
            errmessage.value = error.response.data;
        } else {
            console.error("An unexpected error occurred:", error);
            errmessage.value = { general: 'An unexpected error occurred.' };
        }
     
    }



}

onMounted(async () => {
    try {
        await loadPegawai()

        const response = await useDeparment.getDepartmentAll()
        departments.value = useDeparment.dataDepartment.data
        console.log(departments.value);


    } catch (error) {
        console.error
    }
})


const cancel = () => {
    router.push({ name: 'Pegawai' })
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
                                    <h4 class="card-title">Edit Pegawai</h4>
                                    <!-- <p class="card-description"> Basic form elements </p> -->

                                    <div v-if="usePegawai.isLoading.halaman">
                                        <paragraph-shimmer class="mt-3" :is-loading="true" :lines="4" :random-size="false" />
                                    </div>
                                    
                                    <form class="forms-sample" @submit.prevent="submitPegawai" v-else>
                                        <div class="form-group">
                                            <label for="name">Nama</label>
                                            <input type="text" class="form-control" id="name" placeholder="Nama Pegawai"
                                                v-model="form.name">
                                            <small v-if="errmessage?.name" class="text-danger">{{ errmessage.name[0]
                                                }}</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <input type="email" class="form-control" id="email"
                                                placeholder="Masukan Email" v-model="form.email">
                                            <small v-if="errmessage?.email" class="text-danger">{{ errmessage.email[0]
                                                }}</small>
                                        </div>

                                        <div class="form-group">
                                            <label for="phone_number">No Telepon</label>
                                            <input type="text" class="form-control" id="phone_number"
                                                placeholder="Nomor Telepon" v-model="form.phone_number">
                                            <small v-if="errmessage?.phone_number" class="text-danger">{{
                                                errmessage.phone_number[0] }}</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="address">Alamat</label>
                                            <input type="text" class="form-control" id="address"
                                                placeholder="Masukan alamat" v-model="form.address">
                                            <small v-if="errmessage?.address" class="text-danger">{{
                                                errmessage.address[0] }}</small>
                                        </div>

                                        <div class="form-group">
                                            <label for="position">Posisi</label>
                                            <input type="text" class="form-control" id="position" placeholder="Posisi"
                                                v-model="form.position">
                                            <small v-if="errmessage?.position" class="text-danger">{{
                                                errmessage.position[0] }}</small>
                                        </div>

                                        <div class="form-group">
                                            <label for="department_id">Departement</label>
                                            <select class="form-select select2" aria-label="department select"
                                                v-model="form.department_id">
                                                <option selected>Pilih</option>


                                                <option v-for="department in departments" :key="department.id"
                                                    :value="department.id">
                                                    {{ department.department_name }}
                                                </option>

                                            </select>
                                            <small v-if="errmessage?.department_id" class="text-danger">{{
                                                errmessage.department_id[0] }}</small>
                                        </div>

                                        <div class="form-group">
                                            <label for="hire_date">Hire Date</label>
                                            <input type="date" class="form-control" id="hire_date"
                                                placeholder="Hire Date" v-model="form.hire_date">
                                            <small v-if="errmessage?.hire_date" class="text-danger">{{
                                                errmessage.hire_date[0] }}</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="salary">Gaji</label>
                                            <input type="number" class="form-control" id="salary"
                                                placeholder="Masukan Gaji" v-model="form.salary">
                                            <small v-if="errmessage?.salary" class="text-danger">{{
                                                errmessage.salary[0] }}</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="password">Password</label>
                                            <input type="password" class="form-control" id="password"
                                                placeholder="Masukan Password" v-model="form.password">
                                            <small v-if="errmessage?.password" class="text-danger">{{
                                                errmessage.password[0] }}</small>
                                        </div>
                                        <button type="submit" class="btn btn-primary me-2" disabled
                                            v-if="usePegawai.isLoading.tombol"><span class="spinner-border spinner-border-sm"
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