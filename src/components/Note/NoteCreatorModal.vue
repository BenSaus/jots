<template>
        <q-card>

            <q-card-section class="">
                <form @submit.prevent="onSubmit">
                    <ModalHeader @close="onCancel">New Note</ModalHeader>
                    <div>
                        <!-- Here I pass down the title to a child component
                        Then this title is set to sync so that it can make changes to the value
                        and emit those changes back to this parent -->
                        <ModalNoteTitle ref="modalNoteTitle" :title.sync="note.title" />
                        <ModalNoteText :text.sync="note.text" />
                        <ModalNoteTags :tags.sync="note.tags" />
                    </div>
                    <ModalButtons> </ModalButtons>
                </form>
            </q-card-section>

        </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import ModalHeader from 'components/Shared/ModalHeader'
import ModalNoteTitle from 'components/Shared/ModalNoteTitle'
import ModalNoteText from 'components/Shared/ModalNoteText'
import ModalButtons from 'components/Shared/ModalButtons'
import ModalNoteTags from 'components/Shared/ModalNoteTags'

export default {

    data: function () {
        return {
            note: {
                title: this.title,
                text: this.text,
                tags: [],
                created: null,
                state: 'active'
            }
        }
    },
    components: {
        ModalHeader,
        ModalNoteTitle,
        ModalNoteTags,
        ModalButtons,
        ModalNoteText
    },

    methods: {
        ...mapActions('notes', ['createNote']),

        onSubmit () {
            console.log('NoteCreator - Submit')

            this.$refs.modalNoteTitle.$refs.titleInput.validate()
            if (this.$refs.modalNoteTitle.$refs.titleInput.hasError) return null
            
            this.createNewNote()
        },

        createNewNote () {
            this.note.created = Date.now()

            console.log(this.note)
            this.createNote(this.note)
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


