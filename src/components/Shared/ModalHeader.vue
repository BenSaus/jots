<template>
    <div class="row justify-between">
        <p class="tw-text-xl tw-mt-3"><slot></slot></p>
        <q-btn icon="close" flat color="primary" v-close-popup @click="onClose" />
    </div>
</template>

<script>
export default {
    methods: {
        onClose () {
            this.$emit('close')
        }
    }
}
</script>

<style>

</style>