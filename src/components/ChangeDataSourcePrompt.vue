<template>
    <q-dialog :value="show" persistent>
        <q-card class="tw-pa-20">
            <q-card-section class="row items-center">
                <span class="q-ml-sm tw-text-lg">Choose a source for the note data</span>
                <div class="tw-mt-3 tw-w-full">
                    <div class="row">
                        <q-option-group
                            :options="dataSourceOptions"
                            label="Notifications"
                            type="radio"
                            v-model="dataSource"
                            inline
                        />
                    </div>
                    <div class="tw-w-full">
                        <q-input 
                            outlined 
                            dense 
                            clearable 
                            class="tw-ml-3" 
                            label="Server Endpoint" 
                            v-model="graphqlEndpoint" 
                            v-show="dataSource === 'graphql'" 
                        >
                        </q-input>
                    </div>

                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup @click="onCancel" />
                <q-btn flat label="Save" color="primary" v-close-popup @click="onConfirm" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        },
    },
    data () {
        return {
            dataSourceOptions: [
                { label: 'Local Browser Storage', value: 'local' },
                { label: 'GraphQL Server', value: 'graphql', color: 'green' },
            ],
            dataSource: '',
            graphqlEndpoint: ''
        }
    },
    methods: {
        setDataSourceSettings (data) {
            this.dataSource = data.dataSource
            this.graphqlEndpoint = data.graphqlEndpoint

            console.log('SetCurrent')
            console.log(this.dataSource)
            console.log(this.graphqlEndpoint)
        },
        onCancel () {
            this.$emit('cancel')
        },
        onConfirm () {
            this.$emit('confirm', { dataSource: this.dataSource, graphqlEndpoint: this.graphqlEndpoint })
        }
    }
}
</script>

<style>

</style>