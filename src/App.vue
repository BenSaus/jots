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
    },
    methods: {
        ...mapActions('notes', ['fetchNotes']),
    }
}
</script>
