<template>
    <div>
        <div class="row">
            <q-btn flat color="primary" icon="unarchive" @click.stop="onClickUnarchive"> 
                <q-tooltip>
                    Unarchive Note
                </q-tooltip>
            </q-btn>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['note'],
    methods: {
        ...mapActions('notes', ['updateNote']),
        onClickUnarchive () {
            const newNote = { ...this.note }
            newNote.state = 'active'

            this.updateNote(newNote)

            // inside of a Vue file
            this.$q.notify({
                message: `'${this.note.title}' unarchived`,
                color: 'primary'
            })
        }
    }
}


</script>

<style>

</style>