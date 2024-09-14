<script setup>
import Sidebar from '../../components/Sidebar.vue';
import Header from '../../components/Header.vue';
import { ref, onMounted, computed } from 'vue';
import { departmentStore } from '../../stores/departmentstore';
import Swal from 'sweetalert2';

const useDepartment = departmentStore();
const departments = ref();
const searchQuery = ref();
const selectedDepartment = ref();
onMounted(async () => {
    try {
        await useDepartment.getDepartmentAll();

        departments.value = useDepartment.dataDepartment.data;


    } catch (error) {
        console.error('Error fetching data:', error);
    }
})



const pilihDepartment = (department) => {
    selectedDepartment.value = department


}

const deleteDepartment = async () => {

    try {
        const response = await useDepartment.delete(selectedDepartment.value.id);
        console.log(response)
        departments.value = departments.value.filter(p => p.id !== selectedDepartment.value.id);
        selectedDepartment.value = null;
        Swal.fire({
            position: 'top-end',  
            icon: 'success',      
            title: 'Berhasil menghapus data.',
            showConfirmButton: false,  
            timer: 1500,          
            width: '300px',       
            heightAuto: false,   
            toast: true          
        });

    } catch (error) {
        console.error('Error deleting pegawai:', error);
        Swal.fire({
            position: 'top-end', 
            icon: 'error',      
            title: 'Menghapus data gagal!, Ada data yang terkait',
            showConfirmButton: false, 
            timer: 1500,          
            width: '300px',    
            heightAuto: false,  
            toast: true          
        });
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
                                            <h4 class="card-title card-title-dash">Daftar Department</h4>
                                        </div>
                                        <div>
                                            <router-link class="btn btn-primary  text-white mb-0 me-0"
                                                :to="{ name: 'Department.Create' }"><i class="mdi mdi-account-plus"></i>
                                                Tambah Department</router-link>
                                        </div>
                                    </div>
                                    <div v-if="useDepartment.isLoading.halaman"
                                        class="d-flex justify-content-center align-items-center">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>

                                    <div class="table-responsive" v-else>
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th> No </th>
                                                    <th> Department</th>
                                                    <th>Aksi</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(department, index) in departments">
                                                    <td> {{ index + 1 }} </td>

                                                    <td> {{ department.department_name }} </td>
                                                    <td>
                                                        <router-link class="btn btn-primary btn-sm"
                                                            :to="{ name: 'Department.Edit', params: { id: department.id } }">Edit</router-link>
                                                        <button class="btn btn-danger btn-sm"
                                                            @click="pilihDepartment(department)" data-bs-toggle="modal"
                                                            data-bs-target="#deleteModal">
                                                            Delete
                                                        </button>
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
    <!-- Modal Konfirmasi Hapus -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Konfirmasi Hapus</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Apakah Anda yakin ingin menghapus department <strong>{{ selectedDepartment?.department_name
                        }}</strong>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="button" class="btn btn-danger" @click="deleteDepartment"
                        data-bs-dismiss="modal">Hapus</button>
                </div>
            </div>
        </div>
    </div>


</template>
