<template>
    <q-page>
        <NoteView v-if="!loading" @click="onNoteClick" />

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
import { mapActions } from 'vuex'
import NoteEditor from 'components/Note/NoteEditorModal'
import NoteCreator from 'components/Note/NoteCreatorModal'
import NoteView from 'components/Note/NoteView'


export default {
    name: 'index',
    components: {
        NoteEditor,
        NoteCreator,
        NoteView,
    },
    data () {
        return {
            loading: true,
            showCreateNoteDialog: false,
            showEditNoteDialog: false,
            noteToEdit: null,
        }
    },
    async created () {
        await this.fetchNotes()
        await this.fetchTags()
        this.loading = false
    },
    methods: {
        ...mapActions('notes', ['fetchNotes']),
        ...mapActions('tags', ['fetchTags']),
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