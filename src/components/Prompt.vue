<template>
    <q-dialog :value="show" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="delete" color="negative" text-color="white" />
                <span class="q-ml-sm tw-text-lg">{{text}}</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat :label="labels[1]" color="primary" v-close-popup @click="onCancel" />
                <q-btn flat :label="labels[0]" color="primary" v-close-popup @click="onConfirm" />
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
        },
        labels: {
            type: Array,
            required: true,
        }
    },

    methods: {
        onCancel () {
            this.$emit('cancel')
        },
        onConfirm () {
            this.$emit('confirm')
        }
    }
}
</script>

<style>

</style>