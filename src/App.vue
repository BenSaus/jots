<template>
    <div id="q-app">
        <router-view />
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Notes',
    async mounted () {
        await this.fetchNotes()
        await this.fetchTags()
    },
    methods: {
        ...mapActions('notes', ['fetchNotes']),
        ...mapActions('tags', ['fetchTags']),
    }
}
</script>
