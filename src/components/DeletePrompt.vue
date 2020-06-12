<template>
    <q-dialog :value="show" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="delete" color="negative" text-color="white" />
                <span class="q-ml-sm tw-text-lg">{{text}}</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup @click="onCancel" />
                <q-btn flat label="Delete" color="negative" v-close-popup @click="onConfirm" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true,
        },
        show: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        onConfirm () {
            this.$emit('confirm')
        },
        onCancel () {
            this.$emit('cancel')
        }
    }
}
</script>

<style>

</style>