<template>
    <q-page class="">

        <!-- <q-expansion-item
            expand-separator
            label="View settings"
            style="background: white"
        >
            <div class="tw-flex tw-flex-row tw-justify-start tw-items-center tw-bg-white">
                <span class="tw-mr-3 tw-ml-5">View Notes With Tags:</span>
                <q-select
                    v-model="selectedTags"
                    multiple
                    :options="tags"
                    label="Tags"
                    style="width: 250px"
                />

                <span class="tw-ml-5 tw-mr-3">With Date Created: </span>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>
        </q-expansion-item> -->

        <div class=" tw-mx-auto tw-mt-5 tw-grid xl:tw-grid-cols-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1">
            <Note v-for="note in allNotes" :key="note.id" :note="note" @custom-click="onNoteClick" @delete="onDeleteNote"> </Note>
        </div>

        <NoteEditor ref="noteEditor" :note="noteToEdit" @cancel="onNoteEditorCancel" @save="onNoteEditorSave"> </NoteEditor>
        <NoteCreator :show="showNoteCreator" @cancel="onNoteCreatorCancel" @save="onNoteCreatorSave"> </NoteCreator>
        
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="onAddClick" fab icon="add" color="primary" />
        </q-page-sticky>
    </q-page>
</template>

<script>
import Note from '../components/Note'
import NoteEditor from '../components/NoteEditor'
import NoteCreator from '../components/NoteCreator'
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
            noteToEdit: null,
            showNoteCreator: false,
            showNoteEditor: false,
            tags: ['tag1', 'tag2', 'tag3'],
            selectedTags: []
        }
    },

    mixins: [

    ],

    created () {

    },

    async mounted () {
        await this.fetchNotes()
        this.noteToEdit = this.allNotes[0]
    },

    computed: mapGetters(['allNotes']),

    methods: {
        ...mapActions(['fetchNotes', 'createNote', 'updateNote', 'deleteNote']),

        onNoteClick (note) {
            this.noteToEdit = note
            this.$refs.noteEditor.show()
        },
        onNoteEditorSave (note) {
            this.$refs.noteEditor.hide()
            this.updateNote(note)
            // show updated note
            this.fetchNotes()
        },
        onNoteEditorCancel () {
            this.$refs.noteEditor.hide()
        },

        onAddClick () {
            this.noteToEdit = null
            this.showNoteCreator = true
        },
        onNoteCreatorSave (note) {
            console.log('OnnoteCreatorSave')

            this.showNoteCreator = false
            this.createNote(note)
        },
        onNoteCreatorCancel () {
            this.showNoteCreator = false
        },
        onDeleteNote (note) {
            console.log('delete note')
            this.deleteNote(note.id)
        },

    }

}




</script>


<style scoped>

</style>