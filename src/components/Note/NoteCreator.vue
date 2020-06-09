<template>
        <q-card>
            <div class="">

                <form @submit.prevent="onSubmit">

                    <q-card-section class="">
                        <div class="row justify-between">
                            <p class="tw-text-xl tw-mt-3">New Note</p>
                            <q-btn icon="close" flat color="primary" v-close-popup @click="onCancel" />
                        </div>
                        <div>
                            <q-input 
                                ref="titleInput"
                                outlined 
                                v-model="title" 
                                label="Title" 
                                :rules="[val => !!val || 'Title is required']"
                            />
                            <q-input class="tw-mt-3" v-model="text" outlined label="Text" type="textarea"/>
                            <q-input class="tw-mt-3" outlined v-model="tags" label="Tags" />
                        </div>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn color="primary" label="Save" type="submit" />
                    </q-card-actions>
                    
                </form>

            </div>
        </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {

    data: function () {
        return {
            title: '',
            text: '',
            tags: '',
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

        onSubmit () {
            console.log('NoteCreator - Submit')

            this.$refs.titleInput.validate()
            if (this.$refs.titleInput.hasError) return null
            
            this.createNewNote()
        },

        createNewNote () {
            const newNote = {
                title: this.title,
                text: this.text,
                tags: [],
                created: Date.now(),
                state: 'active'
            }

            console.log(newNote)
            this.createNote(newNote)
            this.$emit('close')
        },

        onCancel () {
            console.log('NoteEditor - Cancel')
            this.$emit('close')
        },
    }
}
</script>

<style lang="css" scoped>

</style>


