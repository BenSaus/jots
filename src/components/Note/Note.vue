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
                
                <slot></slot>

            </div>
        </q-card-actions>


    </q-card>
</template>

<script>
import { mapGetters } from 'vuex'

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

    },
    created () {
        this.resolvedTags = this.resolveTags(this.note.tags)
        this.setNoteColor(this.note.color)
    },
    methods: {
         onClick () {
             // emit to parent
            this.$emit('click', this.note)
        },
        setNoteColor (color) {
            const classString = `bg-${color}-1`
            this.cardClass = {}
            this.cardClass[classString] = true
        },

        // SEPERATE THIS
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
                this.setNoteColor(this.note.color)
            }
        }
    }
}
</script>




