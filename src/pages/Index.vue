<template>
    <q-page class="">

        <div class="tw-mx-auto tw-grid xl:tw-grid-cols-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1">
            <Note v-for="note in notes" :key="note.id" :note="note" @custom-click="onNoteClick"> </Note>
        </div>

        <q-dialog full-width full-height v-model="showEditNoteDialog">
            <NoteEditor ref="noteEditor" :noteId="noteIdToEdit" @cancel="onNoteEditorCancel" @save="onNoteEditorSave"> </NoteEditor>
        </q-dialog>

        <q-dialog v-model="showCreateNoteDialog">
            <NoteCreator ref="noteCreator" @cancel="onNoteCreatorCancel" @save="onNoteCreatorSave"> </NoteCreator>
        </q-dialog>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="onAddClick" fab icon="add" color="primary" />
        </q-page-sticky>

    </q-page>
</template>

<script>
import Note from '../components/Note/Note'
import NoteEditor from '../components/Note/NoteEditor'
import NoteCreator from '../components/Note/NoteCreator'
import { mapGetters } from 'vuex'

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
            selectedTags: [],
            showCreateNoteDialog: false,

            noteIdToEdit: null,
            showEditNoteDialog: false,
        }
    },

    computed: {
        // module, [getter]
        ...mapGetters('notes', ['notes'])
    },

    methods: {

        onNoteClick (note) {
            // this.$refs.noteEditor.show(note.id)
            this.noteIdToEdit = note.id
            this.showEditNoteDialog = true
        },
        onNoteEditorSave () {
            // this.$refs.noteEditor.hide()
            this.showEditNoteDialog = false
        },
        onNoteEditorCancel () {
            // this.$refs.noteEditor.hide()
            this.showEditNoteDialog = false
        },

        onAddClick () {
            // this.$refs.noteCreator.show()
            this.showCreateNoteDialog = true
        },
        onNoteCreatorSave () {
            // this.$refs.noteCreator.hide()
            this.showCreateNoteDialog = false
        },
        onNoteCreatorCancel () {
            // this.$refs.noteCreator.hide()
            this.showCreateNoteDialog = false
        },

    },
}
</script>


<style scoped>

</style>