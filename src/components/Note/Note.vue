<template>
    <q-card class="tw-m-4 tw-px-4">
        <div @click="onClick">
            <p class="tw-text-xl tw-mt-3" @click="onClick">{{note.title}}</p>
            <span v-html="note.text"></span>
        </div>
        <q-card-actions align="right">
            <q-btn flat color="primary" icon="palette" />
            <q-btn flat color="primary" icon="archive" />
            <q-btn flat color="primary" icon="more_horiz">
                <q-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>Duplicate</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="onDelete">
                            <q-item-section>Delete</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
export default {
    props: ['note'],
    methods: {
        onDelete () {
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


