<template>
    <q-card class="tw-m-4 tw-px-4 column justify-between" @click="onClick">
        <div>
            <p class="tw-text-xl tw-mt-3">{{note.title}}</p>
            <span v-html="note.text"></span>
        </div>
        <q-card-actions align="right">

            <q-btn flat color="primary" icon="palette" @click.stop/>
            <q-btn flat color="primary" icon="archive" @click.stop/>
            <q-btn flat color="primary" icon="more_horiz" @click.stop>
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
            
        </q-card-actions>

        <q-dialog v-model="showDeleteNotePrompt" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="negative" text-color="white" />
                    <span class="q-ml-sm">Delete note titled: "{{note.title}}"?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Delete" color="negative" v-close-popup @click="onClickDelete" />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['note'],

    data () {
        return {
            showDeleteNotePrompt: false
        }
    },

    methods: {
        ...mapActions('notes', ['deleteNote']),

        promptToDelete () {
            this.showDeleteNotePrompt = true
        },

        onClickDelete () {
            this.showDeleteNotePrompt = false
            this.deleteNote({ id: this.note.id })
            this.$emit('delete', this.note)
        },

        onClick () {
             // emit to parent
            this.$emit('custom-click', this.note)
        }
    }
}
</script>

<style lang="css" scoped>

</style>


