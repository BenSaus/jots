<template>
    <q-page class="">

        <div class=" tw-mx-auto tw-mt-5 tw-grid xl:tw-grid-cols-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1">
            <Note v-for="note in notes" :key="note.id" :note="note" @custom-click="onNoteClick" @delete="onDeleteNote"> </Note>
        </div>

        <NoteEditor ref="noteEditor" @cancel="onNoteEditorCancel" @save="onNoteEditorSave"> </NoteEditor>
        <NoteCreator ref="noteCreator" @cancel="onNoteCreatorCancel" @save="onNoteCreatorSave"> </NoteCreator>
        
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="onAddClick" fab icon="add" color="primary" />
        </q-page-sticky>
        
    </q-page>
</template>

<script>
import Note from '../components/Note/Note'
import NoteEditor from '../components/Note/NoteEditor'
import NoteCreator from '../components/Note/NoteCreator'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'index',

    components: {
        Note: Note,
        NoteEditor: NoteEditor,
        NoteCreator: NoteCreator,
    },

    data: () => {
        return {
            tags: ['tag1', 'tag2', 'tag3'],
            selectedTags: []
        }
    },

    async mounted () {
        // load up notes from db
        await this.fetchNotes()
    },

    computed: {
        // module, [getter]
        ...mapGetters('notes', ['notes'])
    },

    methods: {
        ...mapActions('notes', ['fetchNotes']),

        onNoteClick (note) {
            // Send the selected note into the editor
            this.$refs.noteEditor.show(note)
        },
        onNoteEditorSave (note) {
            //  The note has come back modified
            this.$refs.noteEditor.hide()
            // save the updated note
            this.updateNote(note)
            // update our copy of the note
            this.fetchNotes()
        },
        onNoteEditorCancel () {
            this.$refs.noteEditor.hide()
        },


        onAddClick () {
            this.$refs.noteCreator.show()
        },
        onNoteCreatorSave (note) {
            console.log('OnnoteCreatorSave')

            this.$refs.noteCreator.hide()
            this.createNote(note)
        },
        onNoteCreatorCancel () {
            this.$refs.noteCreator.hide()
        },
        onDeleteNote (note) {
            console.log('delete note')
            this.deleteNote(note.id)
        },


    },

   


}




</script>


<style scoped>

</style>