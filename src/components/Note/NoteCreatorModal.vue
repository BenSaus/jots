<template>
        <q-card>

            <q-card-section class="">
                <form @submit.prevent="onSubmit">
                    <ModalHeader @close="onCancel">New Note</ModalHeader>
                    <div>
                        <!-- Here I pass down the title to a child component
                        Then this title is set to sync so that it can make changes to the value
                        and emit those changes back to this parent -->


                        <!-- WARNING: TODO: sync is no longer a thing and should not be used!! -->
                        <ModalNoteTitle ref="modalNoteTitle" :title.sync="note.title" />
                        <ModalNoteText :text.sync="note.text" />
                        <ModalNoteTags :tags="tags" @change="onTagsChange" />
                        
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

        onTagsChange (newTags) {
            this.tags = newTags
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
                await this.linkNoteAndTag({ noteId, tagId: tag })
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


