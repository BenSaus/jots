
<template>
    <q-dialog full-width full-height v-model="showDialog">
        <q-card>
            <div class="tw-mx-2 tw-px-2">

                <div class="column">
                    <div class="tw-flex tw-justify-between">
                        <p class="tw-text-xl tw-mt-3">Edit Note</p>
                        <q-btn icon="close" flat round color="primary" v-close-popup @click="onCancel" />
                    </div>
                    <div>
                        <q-input outlined v-model="note.title" label="Title" />
                        <q-input class="tw-pt-4" v-model="note.text" outlined label="Text" type="textarea"/>
                    </div>
                </div>

                <q-card-actions align="right">
                    <q-btn flat round color="primary" @click="onSave" icon="save" />
                    <!-- <q-btn flat round color="primary" @click="onCancel" icon="cancel" /> -->
                </q-card-actions>
            </div>

        </q-card>
    </q-dialog>
</template>

<script>

export default {
    components: {

    },

    data () {
        return {
            showDialog: false,
            note: {
                title: 'Title',
                text: 'Text',

            }
        }
    },

    methods: {
        onSave () {
            console.log('NoteEditor - Save')
            console.log(this.note)
            this.$emit('save', this.note)
        },

        onCancel () {
            console.log('NoteEditor - Cancel')
            this.$emit('cancel')
        },

        show (note) {
            // copy note into component memory
            this.note = Object.assign({}, note)
            this.showDialog = true
        },

        hide () {
            this.showDialog = false
        }
    },

    beforeDestroy () {
        // this.editor.destroy()
    },

}
</script>

<style lang="css">

</style>


