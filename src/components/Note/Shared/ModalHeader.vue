<template>
    <div class="row justify-between items-stretch">
        <div class="tw-flex-grow">
            <slot></slot>
        </div>
        <div >
            <q-btn icon="close" flat color="primary" v-close-popup @click="onClose" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['text'],
    methods: {
        onClose () {
            this.$emit('close')
        }
    }
}
</script>

<style>

</style>