<template>
    <div>
        <h3>{{ admin_data }}</h3>
    </div>
</template>

<script>
import backend from 'axios'

export default {
    data() {
        return {
            admin_data: null
        }
    },
    created() {
        backend.get('http://localhost:3000/sensitive-data', {headers: {'x-auth': localStorage.getItem('token')}})
            .then((res) => {
                this.admin_data = res.data
            })
            .catch(this.admin_data = 'You are not authorized to view sensitive data')
    }
}
</script>

<style>

</style>
