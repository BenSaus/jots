<template>
        <q-card>
            <q-card-section class="">
                <form @submit.prevent="onSubmit">
                    <ModalHeader @close="onCancel">Edit Note</ModalHeader>
                    <div>
                        <!-- Here I pass down the title to a child component
                        Then this title is set to sync so that it can make changes to the value
                        and emit those changes back to this parent -->
                        <ModalNoteTitle ref="modalNoteTitle" :title.sync="internalNote.title" />
                        <ModalNoteText :text.sync="internalNote.text" />
                        <ModalNoteTags :tags.sync="internalNote.tags" />
                    </div>
                    <ModalButtons> </ModalButtons>
                </form>
            </q-card-section>
        </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ModalHeader from 'components/Shared/ModalHeader'
import ModalNoteTitle from 'components/Shared/ModalNoteTitle'
import ModalNoteText from 'components/Shared/ModalNoteText'
import ModalButtons from 'components/Shared/ModalButtons'
import ModalNoteTags from 'components/Shared/ModalNoteTags'

export default {
    props: ['note'],
    data: function () {
        return {
            internalNote: {}
        }
    },
    components: {
        ModalHeader,
        ModalNoteTitle,
        ModalNoteTags,
        ModalButtons,
        ModalNoteText
    },
    computed: {
        ...mapGetters('notes', ['getNoteById'])
    },
    created () {
        console.log('NoteEditorModal - Created')
        console.log(this.note)
        
        // Here I am copying the note from the parent INSTEAD of calling vuex
        //          because the parent MAY have modified the note already
        this.internalNote = Object.assign({}, this.note)

        // Get the note directly from vuex instead of the parent
        // this.internalNote = { ...this.getNoteById(this.noteId) }

        console.log(this.internalNote)
    },
    methods: {
        ...mapActions('notes', ['updateNote']),
        onSubmit () {
            console.log('NoteCreator - Submit')

            this.$refs.modalNoteTitle.$refs.titleInput.validate()
            if (this.$refs.modalNoteTitle.$refs.titleInput.hasError) return null
            
            this.updateNote(this.internalNote)
            this.$emit('close')
        },
        onCancel () {
            console.log('NoteEditor - Cancel')
            this.$emit('close')
        },
    }
}
</script>

<style lang="css" scoped>

</style>


