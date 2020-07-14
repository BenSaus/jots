<template>
        <q-card>
            <q-card-section>
                <form @submit.prevent="onSubmit">

                    <ModalHeader @close="onCancel">
                        <ModalNoteTitle :title="note.title" @onChange="onTitleChange" ref="modalNoteTitle" />
                    </ModalHeader>

                    <div class="tw-mt-3 tw-mb-20">
                        <ModalNoteText :text="note.text" @onChange="onTextChange" :showMarkdown="showMarkdown" />
                        <ModalNoteTags :tags="tags" @change="onTagsChange" />
                    </div>
                    <!-- <ModalButtons @showMarkdown="showMarkdown = !showMarkdown"> </ModalButtons> -->

                    <q-page-sticky position="bottom-right" :offset="[18, 18]">
                        <q-btn fab icon="more_horiz" color="primary" >
                            <q-menu>
                                <q-list style="min-width: 100px">
                                    <q-item clickable v-close-popup @click="showMarkdown = !showMarkdown">
                                        <q-item-section v-if="showMarkdown">Hide Markdown</q-item-section>
                                        <q-item-section v-else>Show Markdown</q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup @click="saveChanges">
                                        <q-item-section>Save</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                    </q-page-sticky>

                </form>
            </q-card-section>
        </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ModalHeader from './Shared/ModalHeader'
import ModalNoteTitle from './Shared/ModalNoteTitle'
import ModalNoteText from './Shared/ModalNoteText'
// import ModalButtons from './Shared/ModalButtons'
import ModalNoteTags from './Shared/ModalNoteTags'
import _ from 'lodash'

export default {
    props: ['noteid'],
    data: function () {
        return {
            note: {},
            tags: [],
            originalTags: [],

            showMarkdown: true
        }
    },
    components: {
        ModalHeader,
        ModalNoteTitle,
        ModalNoteTags,
        // ModalButtons,
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

        onTitleChange (newTitle) {
            this.note.title = newTitle
            this.autoTimedSave()
        },
        onTagsChange (newTags) {
            this.tags = newTags
            this.autoTimedSave()
        },
        onTextChange (event) {
            this.note.text = event
            this.autoTimedSave()
        },
        autoTimedSave () {
            // reset timer here
            // if it expires. Save to db
            // Add save timer here
            // setTimeout(this.saveChanges, 5 * 1000)
        },
        saveChanges () {
            // Validate data
            this.$refs.modalNoteTitle.$refs.titleInput.validate()
            if (this.$refs.modalNoteTitle.$refs.titleInput.hasError) return null

            this.updateNote(this.note)
            this.updateTags()
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
        onSubmit () {
            console.log('NoteCreator - Submit')
            this.saveChanges()
        },
        onCancel () {
            console.log('NoteEditor - Cancel')
            this.saveChanges()
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


