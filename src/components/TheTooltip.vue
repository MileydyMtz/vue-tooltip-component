<template>
<div class="tooltip-container" @mouseover="delayShowTooltip" @mouseout="hideTooltip" ref="target" >
    <slot></slot>
    <div v-show="show" class="tooltip-content" ref="tooltip">
        {{ content }}
    </div>
</div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { createPopper } from '@popperjs/core'

export default {
    name: 'TooltipComponent',

    props: {
        content: {
            type: String,
            required: true,
        },
        delay: {
            type: Number,
            default: 500,
        },
    },
    setup(props) {
        const show = ref(false)
        const target = ref(null)
        const tooltip = ref(null)
        let popperInstance = null
        let timeoutId = null

        const delayShowTooltip = () => {
            timeoutId = setTimeout(() => {
                show.value = true
                popperInstance.update()
            }, props.delay)
        }

        const hideTooltip = () => {
            clearTimeout(timeoutId)
            show.value = false
        }

        onMounted(() => {
            popperInstance = createPopper(target.value, tooltip.value, {
                placement: 'auto',
                modifiers: [{
                    name: 'offset',
                    options: {
                        offset: [0, 10],
                    },
                }, ],
            })
        })

        onBeforeUnmount(() => {
            if (popperInstance) {
                popperInstance.destroy()
                popperInstance = null
            }
        })

        return {
            show,
            target,
            tooltip,
            delayShowTooltip,
            hideTooltip
        }
    },
}
</script>

<style lang="scss" scoped>
$tooltip-content-background: #222;
$tooltip-text-color: #fff;

.tooltip-container {
    display: inline-block;
}

.tooltip-content {
    background-color: $tooltip-content-background;
    border-radius: 4px;
    color: $tooltip-text-color;
    opacity: 0;
    padding: 5px 0;
    position: absolute;
    text-align: center;
    transition: opacity 0.3s;
    visibility: hidden;
    width: 120px;
    z-index: 1;
}

.tooltip-container:hover 
.tooltip-content {
    opacity: 1;
    visibility: visible;
}
</style>
