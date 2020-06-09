<template>
    <q-page>
        <div v-if="notes.length > 0" class="tw-mx-auto tw-grid xl:tw-grid-cols-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1">
            <Note v-for="note in notes" :key="note.id" :note="note" @custom-click="onNoteClick"> </Note>
        </div>
        <div v-if="!notes.length > 0" class="row justify-center items-center">
            <h4 class="text-white">No notes found</h4>
        </div>


        <q-dialog full-width full-height v-model="showEditNoteDialog">
            <NoteEditor :note="noteToEdit" @close="showEditNoteDialog = false" > </NoteEditor>
        </q-dialog>

        <q-dialog full-width full-height v-model="showCreateNoteDialog">
            <NoteCreator @close="showCreateNoteDialog = false"> </NoteCreator>
        </q-dialog>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="onAddClick" fab icon="add" color="primary" />
        </q-page-sticky>

    </q-page>
</template>

<script>
import Note from '../components/Note/Note'
import NoteEditor from '../components/Note/NoteEditorModal'
import NoteCreator from '../components/Note/NoteCreatorModal'
import { mapGetters } from 'vuex'

export default {
    name: 'index',
    components: {
        Note,
        NoteEditor,
        NoteCreator,
    },
    data () {
        return {
            showCreateNoteDialog: false,
            showEditNoteDialog: false,
            noteToEdit: null,
        }
    },
    computed: {
        // module, [getter]
        ...mapGetters('notes', ['notes'])
    },
    methods: {
        onNoteClick (note) {
            console.log('OnNoteClick')
            
            this.noteToEdit = note
            this.showEditNoteDialog = true
        },
        onAddClick () {
            this.showCreateNoteDialog = true
        },
    },
}
</script>


<style scoped>

</style>