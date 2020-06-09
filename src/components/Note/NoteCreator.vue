<template>
    <!-- <q-dialog v-model="showDialog"> -->
        <q-card>
            <div class="tw-mx-2 tw-px-2">

                <div class="column">
                    <div class="row justify-between">
                        <p class="tw-text-xl tw-mt-3">New Note</p>
                        <q-btn icon="close" flat color="primary" v-close-popup @click="onCancel" />
                    </div>
                    <div>
                        <q-input outlined v-model="title" label="Title" />
                        <q-input class="tw-pt-3" v-model="text" outlined label="Text" type="textarea"/>
                        <q-input class="tw-mt-3" outlined v-model="tags" label="Tags" />
                    </div>
                </div>

                <q-card-actions align="right">
                    <q-btn flat color="primary" label="Save" @click="onSave" />
                </q-card-actions>
            </div>

        </q-card>
    <!-- </q-dialog> -->
</template>

<script>
import { mapActions } from 'vuex'

export default {

    data: function () {
        return {
            title: '',
            text: '',
            tags: '',
            // showDialog: false,
        }
    },
    created () {
        console.log('created')
    },
    mounted () {
        console.log('mounted')
    },

    methods: {
        ...mapActions('notes', ['createNote']),

        onSave () {
            console.log('NoteCreator - Save')
            
            const newNote = {
                title: this.title,
                text: this.text,
                tags: [],
                created: Date.now(),
                state: 'active'
            }

            console.log(newNote)
            this.createNote(newNote)

            this.$emit('save')
        },
        onCancel () {
            console.log('NoteEditor - Cancel')
            this.$emit('cancel')
        },

        // show () {
        //     this._reset()
        //     this.showDialog = true
        // },

        // _reset () {
        //     this.title = ''
        //     this.text = ''
        //     this.tags = []
        // },

        // hide () {
        //     this.showDialog = false
        // },
    }
}
</script>

<style lang="css" scoped>
    .noteDetails__text {
        min-height: 600px;
        margin-top: auto;
    }
</style>


