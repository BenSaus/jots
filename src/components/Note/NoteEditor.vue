<template>

        <q-card>
            <div class="tw-mx-2 tw-px-2 column">

                <div>
                    <div class="row justify-between">
                        <p class="tw-text-xl tw-mt-3">Edit Note</p>
                        <q-btn icon="close" flat round color="primary" v-close-popup @click="onCancel" />
                    </div>
                    <div>
                        <q-input outlined v-model="note.title" label="Title" />
                        <q-input class="tw-pt-4" v-model="note.text" outlined label="Text" type="textarea"/>
                    </div>
                </div>

                <q-card-actions align="right">
                    <q-btn color="primary" label="Save" @click="onSave" />
                </q-card-actions>
            </div>

        </q-card>

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
            this.$emit('close')
        },

        onCancel () {
            console.log('NoteEditor - Cancel')
            this.$emit('close')
        },

    },
}
</script>

<style lang="css" scoped>

</style>


