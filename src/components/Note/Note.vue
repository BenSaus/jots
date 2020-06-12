<template>
    <q-card class="tw-m-4 tw-px-4 column justify-between cursor-pointer" :class="cardClass" @click="onClick">
        <div>
            <p class="tw-text-xl tw-mt-3">{{note.title}}</p>

            <!-- Use this to interpret note text as html...be careful -->
            <!-- <span v-html="note.text"></span> -->

            <!-- Use this to just display plain text -->
            <p style="max-width: 100%">{{textPreview}}</p>
        </div>
        <q-card-actions align="right">
            <div class="column items-end">

            <div class="row justify-end">
                <q-chip
                    v-for="tag in resolvedTags"
                    :key="tag.id"
                    :color="tag.color"
                    class="q-mr-1"
                    dense
                    outline
                >
                    {{ tag.name }}
                </q-chip>
            </div>
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

            </div>
        </q-card-actions>

        <!-- <q-dialog v-model="showDeleteNotePrompt" persistent>
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
        </q-dialog> -->

        <DeletePrompt :show="showDeleteNotePrompt" :text="deleteNotePromptText" @confirm="onConfirmDelete" @cancel="showDeleteNotePrompt = false" />
        

    </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ColorPicker from 'components/ColorPicker'
import DeletePrompt from 'components/DeletePrompt'

export default {
    props: ['note'],
    data () {
        return {
            showDeleteNotePrompt: false,
            deleteNotePromptText: '',
            resolvedTags: [],

            cardClass: {}
        }
    },
    components: {
        ColorPicker,
        DeletePrompt
    },
    created () {
        this.resolvedTags = this.resolveTags(this.note.tags)
        this.setNoteColor(this.note.color)
    },
    methods: {
        ...mapActions('notes', ['deleteNote', 'updateNote']),

        promptToDelete () {
            this.deleteNotePromptText = `Delete '${this.note.title}'?`
            this.showDeleteNotePrompt = true
        },
        onConfirmDelete () {
            this.showDeleteNotePrompt = false

            const deletedNote = { ...this.note }
            deletedNote.state = 'deleted'
            this.updateNote(deletedNote)

            this.$q.notify({
                message: `'${this.note.title}' deleted`,
                color: 'primary'
            })
        },
        onClick () {
             // emit to parent
            this.$emit('click', this.note)
        },
        onChangeNoteColor (color) {
            console.log('onChangeNoteColor')
            console.log(color)

            const newNote = { ...this.note }
            newNote.color = color

            // Here I update the component but I'm not emitting a message to the
            //      parent component, which might...might be better

            // Update the database
            this.updateNote(newNote)
            this.setNoteColor(color)
        },
        onClickArchive () {
            const newNote = { ...this.note }
            newNote.state = 'archived'

            this.updateNote(newNote)

            // inside of a Vue file
            this.$q.notify({
                message: `'${this.note.title}' archived`,
                color: 'primary'
            })
        },
        setNoteColor (color) {
            const classString = `bg-${color}-1`
            this.cardClass = {}
            this.cardClass[classString] = true
        },

        // SEPERATE
        resolveTags (tagIdArray) {
            return this.allTags.filter(tag => {
                if (this.note.tags.includes(tag.id)) return true
                else return false
            })
        }
    },
    computed: {
        ...mapGetters('tags', ['allTags']),

        textPreview: function () {
            return this.note.text.length > 100 ? this.note.text.substring(0, 100) + '...' : this.note.text 
        }
    },
    watch: {
        note: {
            immediate: true,
            // Notice: Deep true is required since we are trying to 
            //      detect changes in the tag array inside the note
            deep: true,
            handler (newValue, oldValue) {
                console.log('Note Changed')
                this.resolvedTags = this.resolveTags(newValue)
            }
        }
    }
}
</script>




