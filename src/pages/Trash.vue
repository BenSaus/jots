<template>
    <q-page>
        <div class="column justify-center tw-mx-3 tw-mt-10">
            <div class="tw-text-xl text-center">Notes are deleted after 7 days</div>
            <q-btn flat color="negative" @click="onClickEmpty">Empty Trash</q-btn>
        </div>

        <NoteView v-if="!loading" @click="onNoteClick">
            <template v-slot:default="slotProps">
                <NoteTrashActions :note="slotProps.note" />
            </template>
        </NoteView>
    </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NoteView from 'components/Note/NoteView'
import NoteTrashActions from 'components/Note/NoteTrashActions'

export default {
    data () {
        return {
            loading: true
        }
    },
    components: {
        NoteView,
        NoteTrashActions
    },
    async created () {
        this.setTagFilters([])
        this.setStateFilter('deleted')

        await this.fetchNotes()
        await this.fetchTags()
        this.loading = false
    },

    methods: {
        ...mapActions('filters', ['setTagFilters', 'setStateFilter']),
        ...mapActions('notes', ['fetchNotes', 'deleteNote']),
        ...mapActions('tags', ['fetchTags']),
        onNoteClick () {

        },
        async onClickEmpty () {
            // iterate notes with state === 'deleted' 
            //      and remove them from the db
            const notesToDelete = this.allNotes.filter(note => note.state === 'deleted')

            // TODO: combine all these promises
            for (const note of notesToDelete) {
                console.log('Deleting ' + note.title)
                await this.deleteNote(note)
            }
        }
    },

    computed: {
        ...mapGetters('notes', ['allNotes'])
    }
}
</script>

<style>

</style>