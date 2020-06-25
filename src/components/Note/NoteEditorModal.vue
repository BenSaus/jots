<template>
        <q-card>
            <q-card-section>
                <form @submit.prevent="onSubmit">
                    <ModalHeader @close="onCancel">Edit Note</ModalHeader>
                    <div>
                        <!-- Here I pass down the title to a child component
                        Then this title is set to sync so that it can make changes to the value
                        and emit those changes back to this parent -->
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
import { mapActions, mapGetters } from 'vuex'
import ModalHeader from 'components/Shared/ModalHeader'
import ModalNoteTitle from 'components/Shared/ModalNoteTitle'
import ModalNoteText from 'components/Shared/ModalNoteText'
import ModalButtons from 'components/Shared/ModalButtons'
import ModalNoteTags from 'components/Shared/ModalNoteTags'
import _ from 'lodash'

export default {
    props: ['noteid'],
    data: function () {
        return {
            note: {},
            tags: [],
            originalTags: []
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
        // Gather all data here and hand it out to sub components
        // We can't modify vuex data so make a copy
        this.note = Object.assign({}, this.getNoteById(this.noteid))

        const tagIds = this.tagIdsForNote(this.note.id)
        this.tags = this.resolveTags(tagIds)
        this.originalTags = this.tags.map(tag => tag.id) 

        console.log(this.note)
        console.log('Tags', this.tags)
    },
    methods: {
        ...mapActions('notes', ['updateNote']),
        ...mapActions('noteTags', ['linkNoteAndTag', 'unlinkNoteAndTag']),
        onTagsChange (newTags) {
            this.tags = newTags
            console.log('Tags changed', this.tags)
        },
        onSubmit () {
            console.log('NoteCreator - Submit')

            // Validate data
            this.$refs.modalNoteTitle.$refs.titleInput.validate()
            if (this.$refs.modalNoteTitle.$refs.titleInput.hasError) return null

            this.updateNote(this.note)
            this.updateTags()
            this.$emit('close')
        },
        updateTags () {
            console.log('Setup tags')
            const currentTags = this.tags.map(tag => tag.id)
            
            const addedTagIds = _.difference(currentTags, this.originalTags)
            const removedTagIds = _.difference(this.originalTags, currentTags)

            console.log('newTags', addedTagIds)
            console.log('Remove Tags', removedTagIds)

            for (const newTagId of addedTagIds) {
                this.linkNoteAndTag({ noteId: this.note.id, tagId: newTagId })
            } 

            for (const deleteTagId of removedTagIds) {
                this.unlinkNoteAndTag({ noteId: this.note.id, tagId: deleteTagId })
            }
        },
        onCancel () {
            console.log('NoteEditor - Cancel')
            this.$emit('close')
        },
    },
    computed: {
        ...mapGetters('notes', ['getNoteById']),
        ...mapGetters('noteTags', ['tagIdsForNote']),
        ...mapGetters('tags', ['resolveTags']),
    },
}
</script>


<style lang="css" scoped>
</style>


