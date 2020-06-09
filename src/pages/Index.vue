<template>
    <q-page class="">

        <div class="tw-mx-auto tw-grid xl:tw-grid-cols-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1">
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
            selectedTags: []
        }
    },

    computed: {
        // module, [getter]
        ...mapGetters('notes', ['notes'])
    },

    methods: {

        onNoteClick (note) {
            this.$refs.noteEditor.show(note.id)
        },
        onNoteEditorSave () {
            this.$refs.noteEditor.hide()
        },
        onNoteEditorCancel () {
            this.$refs.noteEditor.hide()
        },

        onAddClick () {
            this.$refs.noteCreator.show()
        },
        onNoteCreatorSave () {
            this.$refs.noteCreator.hide()
        },
        onNoteCreatorCancel () {
            this.$refs.noteCreator.hide()
        },

        onDeleteNote (note) {

        },
    },
}
</script>


<style scoped>

</style>