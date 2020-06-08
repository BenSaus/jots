
<template>
    <q-dialog full-width full-height v-model="show">
        <q-card>
            <div class="tw-mx-2 tw-px-2">

                <div class="column">
                    <div class="tw-flex tw-justify-between">
                        <p class="tw-text-xl tw-mt-3">New Note</p>
                        <q-btn icon="close" flat round color="primary" v-close-popup @click="onCancel" />
                    </div>
                    <div>
                        <q-input outlined v-model="title" label="Title" />
                        <q-input class="tw-pt-3" v-model="text" outlined label="Text" type="textarea"/>
                        <q-input class="tw-mt-3" outlined v-model="tags" label="Tags" />
                    </div>
                </div>

            </div>

            <q-card-actions align="right">
                <q-btn flat round color="primary" @click="onSave" icon="save" />
                <!-- <q-btn flat round color="primary" @click="onCancel" icon="cancel" /> -->
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>

export default {
    props: ['show'],
    data: function () {
        return {
            title: '',
            text: '',
            tags: '',
        }
    },


    methods: {
        onSave () {
            console.log('Save')
            const newNote = {
                // id: Math.round(Math.random() * 10000),
                title: this.title,
                text: this.text,
                tags: [],
                created: Date.now(),
                state: 'active'
            }
            this.$emit('save', newNote)
        },
        onCancel () {
            console.log('NoteEditor - Cancel')
            this.$emit('cancel')
        }
    }
}
</script>

<style lang="css" scoped>
    .noteDetails__text {
        min-height: 600px;
        margin-top: auto;
    }
</style>


