<template>

    <!-- Notice I'm using :value here instead of v-model
    Next I emit all input events back up to the parent 
    https://youtu.be/5u8eyTFAY80?t=441 -->
    <!-- <q-input 
        ref="titleInput"
        outlined 
        :value="title"
        @input="$emit('onChange', $event)"
        label="Title" 
        :rules="[val => !!val || 'Title is required']"
        autofocus
    >
    </q-input> -->

    <q-input 
        ref="titleInput"
        :value="title"
        class="tw-text-2xl" 
        type="text" 
        bg-color="white"
        dense
        borderless
        filled
        hide-bottom-space
        :rules="[val => !!val || 'Title is required']"
        @input="$emit('onChange', $event)"
    ></q-input>


</template>

<script>
export default {
    props: ['title'],
}
</script>

<style>

</style>