<template>
        <q-card>

            <q-card-section class="">
                <form @submit.prevent="onSubmit">
                    <ModalHeader @close="onCancel">New Note</ModalHeader>
                    <div>
                        <ModalNoteTitle :title="note.title" @onChange="onTitleChange" ref="modalNoteTitle" />
                        <ModalNoteText :text="note.text" @onChange="onTextChange" />
                        <ModalNoteTags :tags="tags" @change="onTagsChange" />
                    </div>
                    <ModalButtons> </ModalButtons>
                </form>
            </q-card-section>

        </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import ModalHeader from './Shared/ModalHeader'
import ModalNoteTitle from './Shared/ModalNoteTitle'
import ModalNoteText from './Shared/ModalNoteText'
import ModalButtons from './Shared/ModalButtons'
import ModalNoteTags from './Shared/ModalNoteTags'

export default {
    data: function () {
        return {
            note: {
                title: '',
                text: '',
                state: 'active'
            },
            tags: []
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
        ...mapActions('noteTags', ['linkNoteAndTag']),
        
        onTitleChange (newTitle) {
            this.note.title = newTitle
        },
        onTagsChange (newTags) {
            this.tags = newTags
        },
        onTextChange (event) {
            this.note.text = event
        },
        async onSubmit () {
            console.log('NoteCreator - Submit', this.tags)

            this.$refs.modalNoteTitle.$refs.titleInput.validate()
            if (this.$refs.modalNoteTitle.$refs.titleInput.hasError) return null
            
            const resp = await this.createNote(this.note)
            console.log('CreateNote Response', resp)
            this.linkNoteTags(resp.id)

            this.$emit('close')
        },
        async linkNoteTags (noteId) {
            for (const tag of this.tags) {
                console.log('Tag', tag)
                await this.linkNoteAndTag({ noteId, tagId: tag.id })
            }
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


