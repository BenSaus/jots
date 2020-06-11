<template>

    <!-- Notice I'm using :value here instead of v-model
    Next I emit all input events back up to the parent 
    https://youtu.be/5u8eyTFAY80?t=441 -->
    <q-input 
        ref="titleInput"
        outlined 
        :value="title"
        @input="$emit('update:title', $event)"
        label="Title" 
        :rules="[val => !!val || 'Title is required']"
        autofocus
    >
        <!-- <template v-slot:append>
            <q-icon
                v-if="title"
                @click="$emit('update:title', '')"
                name="close"
                class="cursor-pointer"
            />
        </template> -->
    </q-input>
</template>

<script>
export default {
    props: ['title'],
}
</script>

<style>

</style>