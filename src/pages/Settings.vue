<template>
    <q-page>
        <div class="lg:tw-w-4/6 tw-mx-auto">
            <div class="tw-text-4xl tw-mx-3 tw-mt-10">Settings</div >
            <q-card class="tw-mt-5 tw-mx-auto tw-mt-5">
                <q-card-section>
                    <div class="column">
                        
                        <div v-for="option in options" :key="option.name" class="row justify-between items-center">
                            <div>{{option.name}}</div>
                            <q-toggle v-if="option.type === 'toggle'" v-model="option.model" color="primary" />
                        </div>
                        <p class="tw-mt-3">Default Note Color: </p>

                        <q-expansion-item
                            expand-separator
                            icon="settings"
                            label="Advanced settings"

                        >
                        
                        <div class="tw-mt-5 tw-text-xl tw-font-semibold tw-text-red-600">Danger Zone</div>
                        <div class="dangerZone">
                            <div class="tw-mt-3 column">
                                <!-- <div>
                                    Data Source:
                                    <q-option-group
                                        :options="dataSourceOptions"
                                        label="Notifications"
                                        type="radio"
                                        v-model="dataSource"
                                        inline
                                        @input="promptToChangeDataSource"
                                    />
                                    <q-input 
                                        outlined 
                                        dense 
                                        clearable 
                                        class="tw-ml-3" 
                                        label="Server Endpoint" 
                                        v-model="graphqlEndpoint" 
                                        v-show="dataSource === 'server'" 
                                        @blur="onEndpointBlur"
                                    >
                                    </q-input>
                                </div> -->

                                <q-btn color="primary" @click="onClickChangeDataSource">Change Data Source</q-btn>
      
                            </div>

                            <div class="column">
                                <q-btn color="primary" class="tw-mt-5" @click="onClickExport">Export Notes</q-btn>
                            </div>
                            <form id="jsonFile" name="jsonFile" enctype="multipart/form-data" method="post">
                                <div class="column">
                                    <!-- <input type='file' ref="fileInput" id='fileinput'> -->
                                    <!-- Add the file input back in using a dialog instead -->
                                    <q-btn color="primary" class="tw-mt-3" @click="onClickImport">Import Notes</q-btn>
                                </div>
                            </form>
                            <div class="tw-mt-5 column">
                                <q-btn color="red" class="" @click="promptToClear">Clear Everything</q-btn>
                            </div>
                        </div>

                        </q-expansion-item>

                    </div>
                </q-card-section>
            </q-card>

            <DeletePrompt :show="showDeleteNotePrompt" :text="deleteNotePromptText" @confirm="onConfirmClear" @cancel="showDeleteNotePrompt = false" />
            <ChangeDataSourcePrompt 
                :show="showChangeDataSourcePrompt" 
                @confirm="onSaveNewDataSource" 
                @cancel="showChangeDataSourcePrompt = false" 
                ref="changeDataSourcePrompt"
            />

        </div>
    </q-page>
</template>

<script>
import DeletePrompt from 'components/DeletePrompt'
import ChangeDataSourcePrompt from 'components/ChangeDataSourcePrompt'
import download from 'downloadjs'
import db from '../db/Database'


export default {
    data () {
        return {
            showDeleteNotePrompt: false,
            deleteNotePromptText: '',

            showChangeDataSourcePrompt: false,
            databaseSettings: {},

            options: [
                {
                    name: 'Show Tags',
                    type: 'toggle',
                    model: true
                },
                {
                    name: 'Show Date Created',
                    type: 'toggle',
                    model: true
                },
                {
                    name: 'Show Date Modified',
                    type: 'toggle',
                    model: false
                },
 
            ]
        }
    },
    components: {
        DeletePrompt,
        ChangeDataSourcePrompt
    },
    mounted () {
        this.databaseSettings.dataSource = typeof (localStorage.dataSource) === 'undefined' ? 'local' : localStorage.dataSource
        this.databaseSettings.graphqlEndpoint = typeof (localStorage.endPoint) === 'undefined' ? 'https://' : localStorage.endPoint

        console.log('Settings Mounted')
        console.log(this.databaseSettings.dataSource)
        console.log(this.databaseSettings.graphqlEndpoint)

        this.$refs.changeDataSourcePrompt.setDataSourceSettings(this.databaseSettings)
    },
    methods: {
        
        async onClickExport () {
            const data = await db.routines.exportJSON()
            download(data, 'notes.json', 'application/json')
        },
        onClickImport () {
            // https://stackoverflow.com/questions/7346563/loading-local-json-file
            const file = this.$refs.fileInput.files[0]
            const fr = new FileReader()
            fr.onload = this.receivedImportedData
            fr.readAsText(file)
        },
        async receivedImportedData (e) {
            try {
                await db.routines.importText(e.target.result)
                const noteNum = await db.notes.count()
                this.$q.notify({
                    message: `Imported ${noteNum} notes`,
                    color: 'primary'
                })
            }
            catch (err) {
                this.$q.notify({
                    message: 'An error occured importing notes',
                    color: 'negative'
                })
                console.error(err)
            }
        },

        promptToClear () {
            this.deleteNotePromptText = 'Are you sure you want to clear All Notes?'
            this.showDeleteNotePrompt = true
        },
        async onConfirmClear () {
            this.showDeleteNotePrompt = false

            try {
                await db.routines.clearDb()
            }
            catch (err) {
                console.error(err)
                this.$q.notify({
                    message: 'An error occured attempting to clear the database',
                    color: 'negative'
                })
            }
        },


        onClickChangeDataSource () {
            this.showChangeDataSourcePrompt = true
        },
        onSaveNewDataSource (data) {
            console.log('SaveNewDataSource', data)
            this.showChangeDataSourcePrompt = false

            localStorage.dataSource = data.dataSource
            localStorage.endPoint = data.graphqlEndpoint

            this.databaseSettings.dataSource = data.dataSource
            this.databaseSettings.graphqlEndpoint = data.graphqlEndpoint

            window.location.reload()
        },
    }
}
</script>

<style>
    .dangerZone {
        border: 2px solid red;
        padding: 10px;
    }
</style>