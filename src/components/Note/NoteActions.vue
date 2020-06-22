<template>
    <div>

        <div class="row">

            <q-btn flat color="primary" icon="palette" @click.stop>
                <q-tooltip>
                    Note Color
                </q-tooltip>
                <ColorPicker @pickColor="onChangeNoteColor" />
            </q-btn>

            <q-btn flat color="primary" icon="archive" @click.stop="onClickArchive"> 
                <q-tooltip>
                    Archive Note
                </q-tooltip>
            </q-btn>

            <q-btn flat color="primary" icon="more_horiz" @click.stop>
                <q-tooltip>
                    More
                </q-tooltip>
                <q-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>Duplicate</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click.stop="promptToDelete">
                            <q-item-section>Delete</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>

        </div>

        <DeletePrompt :show="showDeleteNotePrompt" :text="deleteNotePromptText" @confirm="onConfirmDelete" @cancel="showDeleteNotePrompt = false" />
            
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import ColorPicker from 'components/ColorPicker'
import DeletePrompt from 'components/DeletePrompt'

export default {
    props: ['note', 'actions'],
    data () {
        return {
            showDeleteNotePrompt: false,
            deleteNotePromptText: '',
        }
    },
    components: {
        ColorPicker,
        DeletePrompt
    },

    methods: {
        ...mapActions('notes', ['deleteNote', 'updateNote']),

        promptToDelete () {
            this.deleteNotePromptText = `Delete '${this.note.title}'?`
            this.showDeleteNotePrompt = true
        },
        async onConfirmDelete () {
            this.showDeleteNotePrompt = false

            const deletedNote = { ...this.note }
            deletedNote.state = 'deleted'

            try {
                await this.updateNote(deletedNote)
                this.$q.notify({
                    message: `'${this.note.title}' deleted`,
                    color: 'primary'
                })
            }
            catch (err) {
                this.$q.notify({
                    message: `An error occured attempting to delete '${this.note.title}'`,
                    color: 'negative'
                })
                console.error(err)
            }
        },
        async onChangeNoteColor (color) {
            console.log('onChangeNoteColor')
            console.log(color)

            const newNote = { ...this.note }
            newNote.color = color

            // Here I update the component but I'm not emitting a message to the
            //      parent component, which might...might be better

            try {
                // Update the database
                await this.updateNote(newNote)
            }
            catch (err) {
                this.$q.notify({
                    message: `An error occured attempting to change the color of '${this.note.title}'`,
                    color: 'negative'
                })
                console.error(err)
            }
        },
        async onClickArchive () {
            const newNote = { ...this.note }
            newNote.state = 'archived'

            try {
                await this.updateNote(newNote)
                
                this.$q.notify({
                    message: `'${this.note.title}' archived`,
                    color: 'primary'
                })
            }
            catch (err) {
                this.$q.notify({
                    message: `An error occured attempting to archive '${this.note.title}'`,
                    color: 'negative'
                })
                console.error(err)
            }
        },
    },
}
</script>

<style>

</style>