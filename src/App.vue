<template>
<div>
    <Tooltip content="Este es un tooltip" delay="600">
        <button>Hover sobre mí</button>
    </Tooltip>

</div>
</template>

<script>
import Tooltip from './components/TheTooltip.vue';

export default {
    components: {
        Tooltip
    },
}
</script>
