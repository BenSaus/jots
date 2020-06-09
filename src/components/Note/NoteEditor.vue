<template>
    <!-- <q-dialog full-width full-height v-model="showDialog"> -->
        <q-card>
            <div class="tw-mx-2 tw-px-2">

                <div class="column">
                    <div class="tw-flex tw-justify-between">
                        <p class="tw-text-xl tw-mt-3">Edit Note</p>
                        <q-btn icon="close" flat round color="primary" v-close-popup @click="onCancel" />
                    </div>
                    <div>
                        <q-input outlined v-model="note.title" label="Title" />
                        <q-input class="tw-pt-4" v-model="note.text" outlined label="Text" type="textarea"/>
                    </div>
                </div>

                <q-card-actions align="right">
                    <q-btn color="primary" icon="save" label="Save" @click="onSave" />
                </q-card-actions>
            </div>

        </q-card>
    <!-- </q-dialog> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

    props: ['noteId'],

    data () {
        return {
            showDialog: false,

            // Local copy used to store data BEFORE save is clicked
            note: {
                title: 'Title',
                text: 'Text',
            },
        }
    },

    created () {
        // Get the note from vuex
        console.log('NoteEditor - Show')
        this.note = { ...this.getNoteById(this.noteId) }
        console.log(this.note)
    },

    computed: {
        ...mapGetters('notes', ['getNoteById'])
    },

    methods: {
        ...mapActions('notes', ['updateNote']),

        onSave () {
            console.log('NoteEditor - Save')
            console.log(this.note)

            this.updateNote(this.note)
            this.$emit('save')
        },

        onCancel () {
            console.log('NoteEditor - Cancel')
            this.$emit('cancel')
        },

        // show (id) {
        //     // Get the note from vuex
        //     console.log('NoteEditor - Show')
        //     console.log(id)

        //     console.log(this.getNoteById(id))
            
            
        //     this.note = { ...this.getNoteById(id) }
        //     console.log(this.note)

        //     this.showDialog = true
        // },

        // hide () {
        //     console.log('NoteEditor - Hide')
        //     this.showDialog = false
        // }
    },
}
</script>

<style lang="css">

</style>


