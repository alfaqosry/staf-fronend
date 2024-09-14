<script setup>
import Header from '../../components/Header.vue';
import Sidebar from '../../components/Sidebar.vue';
import Footer from '../../components/Footer.vue';
import Swal from 'sweetalert2';


import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { departmentStore } from '../../stores/departmentstore';

const router = useRouter();
const form = ref({
    department_name: '',
   

});

const errmessage = ref();
const useDeparment = departmentStore();

const submitDepartment = async () => {


    try {
        const response = await useDeparment.store(form.value);
        console.log(response);
        if (response.status === 201) {
            Swal.fire({
            position: 'top-end',  
            icon: 'success',      
            title: 'Berhasil',
            showConfirmButton: false,  
            timer: 2000,          
            width: '300px',       
            heightAuto: false,   
            toast: true          
        });
            router.push({ name: 'Department' });
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

const cancel = () => {
    router.push({ name: 'Department' })
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
                                    <h4 class="card-title">Tambah Department</h4>
                                    <!-- <p class="card-description"> Basic form elements </p> -->
                                    <form class="forms-sample" @submit.prevent="submitDepartment">
                                        <div class="form-group">
                                            <label for="department_name">Nama Departement</label>
                                            <input type="text" class="form-control" id="department_name" placeholder="Nama department"
                                                v-model="form.department_name" autofocus>
                                            <small v-if="errmessage?.department_name" class="text-danger">{{ errmessage.department_name[0]
                                                }}</small>
                                        </div>
                                        <button type="submit" class="btn btn-primary me-2" disabled
                                            v-if="useDeparment.isLoading.tombol"><span
                                                class="spinner-border spinner-border-sm" role="status"
                                                aria-hidden="true"></span>
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