<script setup>
import Sidebar from '../../components/Sidebar.vue';
import Header from '../../components/Header.vue';
import { ref, onMounted, computed } from 'vue';
import { leaveRequestStore } from '../../stores/leaverequeststore';
import Swal from 'sweetalert2';

const useLeaveRequest = leaveRequestStore();
const leaverequests = ref()
const selectedleaverequest = ref()

const statusClass = (status) => {
    switch (status) {
        case 'approved':
            return 'badge badge-success';
        case 'pending':
            return 'badge badge-warning';
        case 'rejected':
            return 'badge badge-danger';
        default:
            return 'badge badge-secondary';
    }
};



onMounted(async () => {
    try {
        await useLeaveRequest.getLeaveRequestAll();

        leaverequests.value = useLeaveRequest.dataLeaveRequest.data;


    } catch (error) {
        console.error('Error fetching data:', error);
    }
})



const pilihLeaveRequest = (leaverequest) => {
    selectedleaverequest.value = leaverequest


}

const terima = async (id) => {

    try {
        const response = useLeaveRequest.terima(id);
        // leaverequests.value = useLeaveRequest.dataLeaveRequest.data;
        console.log(leaverequests.value)
        const leaveRequest = leaverequests.value.find((request) => request.id === id);
        console.log(leaveRequest)
        if (leaveRequest) {
            leaveRequest.status = 'approved';
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Permintaan cuti berhasil disetujui.',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    } catch (error) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Gagal menyetujui permintaan cuti!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    }

}

const tolak = async (id) => {

    try {
        const response = useLeaveRequest.tolak(id);
        // leaverequests.value = useLeaveRequest.dataLeaveRequest.data;
        console.log(leaverequests.value)
        const leaveRequest = leaverequests.value.find((request) => request.id === id);
        console.log(leaveRequest)
        if (leaveRequest) {
            leaveRequest.status = 'rejected';
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Permintaan cuti berhasil ditolak',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    } catch (error) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Gagal menolak permintaan cuti!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    }
}

// const deleteDepartment = async () => {

//     try {
//         const response = await useDepartment.delete(selectedDepartment.value.id);
//         console.log(response)
//         departments.value = departments.value.filter(p => p.id !== selectedDepartment.value.id);
//         selectedDepartment.value = null;
//         Swal.fire({
//             position: 'top-end',  
//             icon: 'success',      
//             title: 'Berhasil menghapus data.',
//             showConfirmButton: false,  
//             timer: 1500,          
//             width: '300px',       
//             heightAuto: false,   
//             toast: true          
//         });

//     } catch (error) {
//         console.error('Error deleting pegawai:', error);
//         Swal.fire({
//             position: 'top-end', 
//             icon: 'error',      
//             title: 'Menghapus data gagal!, Ada data yang terkait',
//             showConfirmButton: false, 
//             timer: 1500,          
//             width: '300px',    
//             heightAuto: false,  
//             toast: true          
//         });
//     }



// }



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
                                    <div v-if="useLeaveRequest.isLoading.halaman">
                                        <paragraph-shimmer class="mt-3" :is-loading="true" :lines="4"
                                            :random-size="false" />

                                    </div>
                                    <div v-else>
                                        <div class="d-sm-flex justify-content-between align-items-start">
                                            <div>
                                                <h4 class="card-title card-title-dash">Izin Cuti</h4>
                                            </div>
                                            <div>
                                                <router-link class="btn btn-primary  text-white mb-0 me-0"
                                                    :to="{ name: 'Department.Create' }"><i
                                                        class="mdi mdi-account-plus"></i>
                                                    Ajukan Izin Cuti</router-link>
                                            </div>
                                        </div>



                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> No </th>
                                                        <th> Nama</th>
                                                        <th>Mulai</th>
                                                        <th>Berakhir</th>
                                                        <th>Tipe Izin</th>
                                              
                                                        <th>Aksi</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(leaverequest, index) in leaverequests">
                                                        <td> {{ index + 1 }} </td>

                                                        <td> <strong>{{ leaverequest.user?.name }}</strong>  </td>
                                                        <td> <div class="badge badge-success">{{ leaverequest.start_date }}</div>  </td>
                                                        <td> <div class="badge badge-danger">{{ leaverequest.end_date }}</div>  </td>
                                                        <td> {{ leaverequest.leave_type }} </td>
                                                        <!-- <td>
                                                            <div :class="statusClass(leaverequest.status)">
                                                                {{ leaverequest.status }}
                                                            </div>
                                                        </td> -->
                                                        <td>
                                                            <button class="btn btn-success btn-sm"
                                                                v-if="leaverequest.status !== 'approved' && leaverequest.status !== 'rejected'"
                                                                @click="terima(leaverequest.id)">
                                                                Terima
                                                            </button>

                                                            <button class="btn btn-danger btn-sm"
                                                                v-if="leaverequest.status !== 'approved' && leaverequest.status !== 'rejected'"
                                                                @click="tolak(leaverequest.id)">
                                                                Tolak
                                                            </button>

                                                            <span v-else-if="leaverequest.status === 'approved'"
                                                                class="badge badge-success">
                                                                Approved
                                                            </span>

                                                            <span v-else-if="leaverequest.status === 'rejected'"
                                                                class="badge badge-danger">
                                                                Rejected
                                                            </span>
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
