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

        async onClickUnarchive () {
            const newNote = { ...this.note }
            newNote.state = 'active'

            try {
                await this.updateNote(newNote)
                // inside of a Vue file
                this.$q.notify({
                    message: `'${this.note.title}' unarchived`,
                    color: 'primary'
                })
            }
            catch (err) {
                this.$q.notify({
                    message: `An error occured attempting to unarchive '${this.note.title}'`,
                    color: 'negative'
                })
                console.error(err)
            }
        }
    }
}


</script>

<style>

</style>