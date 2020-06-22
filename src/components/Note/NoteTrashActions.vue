<template>
    <div>
        <div class="row">
            <q-btn flat color="primary" icon="restore_from_trash" @click.stop="onClickRestore"> 
                <q-tooltip>
                    Restore Note
                </q-tooltip>
            </q-btn>
            <q-btn flat color="negative" icon="delete_forever" @click.stop="onClickPermaDelete"> 
                <q-tooltip>
                    Permanently Delete Note
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
        ...mapActions('notes', ['updateNote', 'deleteNote']),
        
        async onClickRestore () {
            const deletedNote = { ...this.note }
            deletedNote.state = 'active'

            try {
                await this.updateNote(deletedNote)
                this.$q.notify({
                    message: `'${this.note.title}' restored`,
                    color: 'primary'
                })
            }
            catch (err) {
                this.$q.notify({
                    message: `An error occured attempting to restore '${this.note.title}'`,
                    color: 'negative'
                })

                console.error(err)
            }
        },

        async onClickPermaDelete () {
            try {
                await this.deleteNote(this.note)
            }
            catch (err) {
                this.$q.notify({
                    message: `An error occured attempting to delete '${this.note.title}'`,
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