<template>
    <q-page>
        <NoteView @click="onNoteClick" />

        <q-dialog full-width full-height persistent v-model="showEditNoteDialog">
            <NoteEditor :note="noteToEdit" @close="showEditNoteDialog = false" > </NoteEditor>
        </q-dialog>

        <q-dialog full-width full-height persistent v-model="showCreateNoteDialog">
            <NoteCreator @close="showCreateNoteDialog = false"> </NoteCreator>
        </q-dialog>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="onAddClick" fab icon="add" color="primary" />
        </q-page-sticky>

    </q-page>
</template>

<script>

import NoteEditor from '../components/Note/NoteEditorModal'
import NoteCreator from '../components/Note/NoteCreatorModal'
import NoteView from '../components/NoteView'


export default {
    name: 'index',
    components: {
        NoteEditor,
        NoteCreator,
        NoteView,
    },
    data () {
        return {
            showCreateNoteDialog: true,
            showEditNoteDialog: false,
            noteToEdit: null,
        }
    },
    methods: {
        onNoteClick (note) {
            this.noteToEdit = note
            this.showEditNoteDialog = true
        },
        onAddClick () {
            this.showCreateNoteDialog = true
        },
    },
    computed: {

    }
}
</script>


<style scoped>

</style>