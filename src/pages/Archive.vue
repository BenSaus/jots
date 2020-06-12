<template>
    <q-page>
        <NoteView v-if="!loading" @click="onNoteClick" />
    </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NoteView from 'components/Note/NoteView'

export default {
    data () {
        return {
            loading: true
        }
    },
    components: {
        NoteView
    },
    async created () {
        this.setTagFilters([])
        this.setStateFilter('archived')

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

    },

    computed: {
        ...mapGetters('notes', ['allNotes'])
    }
}
</script>

<style>

</style>