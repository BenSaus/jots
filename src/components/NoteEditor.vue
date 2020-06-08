

<template>
    <q-dialog v-model="show">
        <q-card>
            <div class="tw-mx-2 tw-pt-5 tw-px-2">
                <q-input outlined v-model="title" label="Title" />
                <q-input class="tw-pt-4" v-model="text" outlined label="Text" type="textarea"/>
            </div>
            <q-card-actions align="right">
                <q-btn flat round color="primary" @click="onSave" icon="save" />
                <q-btn flat round color="primary" @click="onCancel" icon="cancel" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>

export default {
    props: ['note'],
    components: {

    },
    data () {
        return {
            title: this.note.title,
            text: this.note.text,
            showDialog: false
        }
    },
    methods: {
        onSave () {
            console.log('Save')
            const editedNote = {
                id: this.note.id,
                title: this.title,
                text: this.text
            }
            this.$emit('save', editedNote)
        },
        onCancel () {
            console.log('NoteEditor - Cancel')
            this.$emit('cancel')
        },

        show () {
            this.showDialog = true
        },
        hide () {
            this.showDialog = false
        }

    },
    created () {

    },
    beforeDestroy () {
        // this.editor.destroy()
    },

}
</script>

<style lang="css">

</style>


