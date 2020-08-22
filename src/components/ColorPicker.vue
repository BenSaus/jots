<template>
    <q-menu>
        <div class="colorGrid">
            <q-btn v-for="color in noteColors" :key="color" v-close-popup dense flat @click="onPickColor(color)"><q-avatar size="25px" :color="color" /></q-btn>
        </div>
    </q-menu>
</template>

<script>
export default {
    data () {
        return {
            noteColors: [
                'orange',
                'blue',
                'purple',
                'pink',
                'red',
                'green',
                'light-green',
                'lime',
                'teal',
                'cyan',
                'light-blue',
                'indigo',
                'amber'
            ],
        }
    },
    methods: {
        onPickColor (color) {
            this.$emit('pickColor', color)
        }
    }
}
</script>

<style lang="css" scoped>
    .colorGrid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
</style>