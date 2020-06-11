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
                    text-color="white"
                    class="q-mr-1"
                    dense
                >
                    {{ tag.name }}
                </q-chip>
            </div>
            <div class="row">
                <q-btn flat color="primary" icon="palette" @click.stop>
                    <ColorPicker @pickColor="onChangeNoteColor" />
                </q-btn>
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
            </div>

            </div>
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
import { mapActions, mapGetters } from 'vuex'
import ColorPicker from '../ColorPicker'

export default {
    props: ['note'],
    data () {
        return {
            showDeleteNotePrompt: false,
            resolvedTags: [],

            cardClass: {}
        }
    },
    components: {
        ColorPicker
    },
    created () {
        this.resolvedTags = this.resolveTags(this.note.tags)
        this.setNoteColor(this.note.color)
    },
    methods: {
        ...mapActions('notes', ['deleteNote', 'updateNote']),

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
    }
}
</script>




