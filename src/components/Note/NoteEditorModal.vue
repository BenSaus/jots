<template>
        <q-card>
            <q-card-section>
                <form @submit.prevent="onSubmit">
                    <ModalHeader @close="onCancel">Edit Note</ModalHeader>
                    <div>
                        <!-- Here I pass down the title to a child component
                        Then this title is set to sync so that it can make changes to the value
                        and emit those changes back to this parent -->
                        <ModalNoteTitle ref="modalNoteTitle" :title.sync="internalNote.title" />
                        <ModalNoteText :text.sync="internalNote.text" />
                        <ModalNoteTags :tags="internalNote.tags" @change="onTagsChange" />
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
    props: ['noteid'],
    data: function () {
        return {
            internalNote: {},
        }
    },
    components: {
        ModalHeader,
        ModalNoteTitle,
        ModalNoteTags,
        ModalButtons,
        ModalNoteText
    },
    created () {
        console.log('NoteEditorModal - Created')
        console.log(this.noteid)
        // Here I am copying the note from the parent INSTEAD of calling vuex
        //          because the parent MAY have modified the note already
        // this.internalNote = Object.assign({}, this.note)

        // Gather all data here and hand it out to sub components
        // We can't modify vuex data so make a copy
        this.internalNote = Object.assign({}, this.getNoteById(this.noteid))

        console.log(this.internalNote)
    },
    methods: {
        ...mapActions('notes', ['updateNote']),
        onTagsChange (newTags) {
            this.internalNote.tags = newTags
        },
        onSubmit () {
            console.log('NoteCreator - Submit')

            // Validate data
            this.$refs.modalNoteTitle.$refs.titleInput.validate()
            if (this.$refs.modalNoteTitle.$refs.titleInput.hasError) return null

            this.updateNote(this.internalNote)
            this.$emit('close')
        },
        onCancel () {
            console.log('NoteEditor - Cancel')
            this.$emit('close')
        },
    },
    computed: {
        ...mapGetters('notes', ['getNoteById']),
    },
}
</script>


<style lang="css" scoped>
</style>


