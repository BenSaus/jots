<template>
    <div>
        <div
            v-if="processedNotes.length > 0"
            class="tw-mx-auto tw-grid xl:tw-grid-cols-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1"
        >
            <Note v-for="note in processedNotes" :key="note.id" :note="note" @click="onNoteClick">
                <slot v-bind:note="note">
                </slot>
            </Note>
        </div>
        <div v-if="processedNotes.length === 0" class="row justify-center items-center">
            <h4>No notes found</h4>
        </div>

    </div>
</template>

<script>
import Note from 'components/Note/Note'

import { mapGetters } from 'vuex'
import _ from 'lodash'


export default {
    components: {
        Note,

    },
    data () {
        return {
            processedNotes: []
        }
    },
    created () {
        this.processNotes(this.tagFilters, this.stateFilter)
    },
    methods: {
        onNoteClick (note) {
            console.log('OnNoteClick')
            this.$emit('click', note)
        },

        processNotes (tagFilters, stateFilter) {
            console.log('Process Notes')
            console.log(tagFilters, stateFilter)

            let notesToInclude = this.allNotes

            // test tagFilters
            if (tagFilters.length > 0) {
                // const tagsToUse = this.resolveTags(tagFilters)
                notesToInclude = this.allNotes.filter(note => {
                    const tagIds = this.tagIdsForNote(note.id)
                    if (_.intersection(tagIds, tagFilters).length > 0) return true
                })
            }

            // Get only notes in the given state, deleted, archived, or active
            notesToInclude = notesToInclude.filter(note => note.state === stateFilter)

            // order by modification date
            // TODO: Currently the updated_at field is updated inside NoteGraphQL...not in vuex
            //      This means when vuex commits it does not include the updated updated_at timestamp
            //      and therefore it is not resorted to the top
            console.log('notesToinclude', notesToInclude)
            notesToInclude.sort((a, b) => {
                if (a.updated_at > b.updated_at) return -1
                else if (a.updated_at < b.updated_at) return 1
                else return 0
            })
            
            this.processedNotes = notesToInclude
        }
    },
    computed: {
        // NOTICE: We are getting all data straight from vuex. 
        //      Not this component's parent
        ...mapGetters('notes', ['allNotes']),
        ...mapGetters('filters', ['tagFilters', 'stateFilter']),
        ...mapGetters('noteTags', ['tagIdsForNote']),
    },
    watch: {
        allNotes: {
            immediate: true,
            // This is so we notice a change in note.state
            deep: true,
            handler (newValue, oldValue) {
                console.log('All notes Changed!!')
                this.processNotes(this.tagFilters, this.stateFilter)
            }
        },
        tagFilters: {
            immediate: true,
            handler (newValue, oldValue) {
                console.log('tagFilters changed', newValue)      
                this.processNotes(newValue, this.stateFilter)
            }
        },
        stateFilter: {
            immediate: true,
            handler (newValue, oldValue) {
                console.log('stateFilter changed', newValue)      
                this.processNotes(this.tagFilters, newValue)
            }
        },
    },
}
</script>

<style>
</style>