<template>
    <div>
        <div
            v-if="processedNotes.length > 0"
            class="tw-mx-auto tw-grid xl:tw-grid-cols-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1"
        >
            <Note v-for="note in processedNotes" :key="note.id" :note="note" @click="onNoteClick"></Note>
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
        Note
    },
    data () {
        return {
            processedNotes: []
        }
    },
    created () {
        this.processNotes(this.tagFilters)
    },
    methods: {
        onNoteClick (note) {
            console.log('OnNoteClick')
            this.$emit('click', note)
        },

        processNotes (newTags) {
            console.log('Process Notes')

            console.log('newTags')
            console.log(newTags)
            console.log(newTags.length)
            
            let notesToInclude = []

            // test tags
            if (newTags.length > 0) {
                // const tagsToUse = this.resolveTags(newTags)

                notesToInclude = this.allNotes.filter(note => {
                    console.log('note.tags')
                    console.log(note.tags)

                    if (_.intersection(note.tags, newTags).length > 0) return true
                })

                console.log('notesToInclude')
                console.log(notesToInclude)
            }

            // test ....

            // get flagged notes
            // notesToInclude.map(id => )

            // order by

            if (newTags.length === 0) {
                this.processedNotes = this.allNotes
            }
            else {
                this.processedNotes = notesToInclude
                console.log('this.processedNotes')
                console.log(this.processedNotes.length)
            }
        }
    },
    computed: {
        // module, [getter]
        ...mapGetters('notes', ['allNotes']),
        // NOTICE: We are getting filters straights from vuex. 
        //      Not this component's parent
        ...mapGetters('filters', ['tagFilters'])

    },
    watch: {
        tagFilters: {
            immediate: true,
            handler (newValue, oldValue) {
                console.log('tagFilters changed', newValue)
                
                this.processNotes(newValue)
            }
        }
    },
}
</script>

<style>
</style>