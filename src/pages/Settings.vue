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

                        <q-btn color="primary" class="tw-mt-5" @click="onClickExport">Export Notes</q-btn>


                        <div class=" tw-mt-10 tw-text-xl tw-font-semibold tw-text-red-600">Danger Zone</div>
                        <div class=" dangerZone">

                            <form id="jsonFile" name="jsonFile" enctype="multipart/form-data" method="post">
                                <div class="column">
                                    <p>Here you can import notes.</p>
                                    <input type='file' ref="fileInput" id='fileinput'>
                                    <q-btn color="primary" class="tw-mt-3" @click="onClickImport">Import Notes</q-btn>
                                </div>
                                <!-- <input type='button' id='btnLoad' value='Load' onclick='loadFile();'> -->
                            </form>

                            <div class="tw-mt-10 column">
                                <p>Clear all notes and tags. This cannot be undone.</p>
                                <q-btn color="primary" class="" @click="onClickClear">Clear Everything</q-btn>
                            </div>

                        </div>

                    
                    </div>
                </q-card-section>
            </q-card>

        </div>
    </q-page>
</template>

<script>
import download from 'downloadjs'
import db from '../db'
// import { exportDB } from 'dexie-export-import'

export default {
    data () {
        return {

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
    methods: {
        async onClickExport () {
            const data = await db.noteRoutine.exportJSON()
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
                await db.noteRoutine.importText(e.target.result)
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

        async onClickClear () {
            try {
                await db.noteRoutine.clearDb()
            }
            catch (err) {
                console.error(err)
                this.$q.notify({
                    message: 'An error occured attempting to clear the database',
                    color: 'negative'
                })
            }
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