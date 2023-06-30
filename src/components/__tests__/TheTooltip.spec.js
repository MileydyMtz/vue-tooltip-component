import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from '../TheTooltip.vue'

describe('Tooltip', () => {
    it('renders tooltip content properly', () => {
        const content = 'Test Tooltip Content'
        const wrapper = mount(Tooltip, { props: { content: content } })
        expect(wrapper.text()).toContain(content)
    })

    it('delays the tooltip visibility', async () => {
        const wrapper = mount(Tooltip, { props: { content: 'Test', delay: 500 } })
        await wrapper.trigger('mouseover')
        expect(wrapper.vm.show).toBe(false)
        await new Promise(resolve => setTimeout(resolve, 500))
        expect(wrapper.vm.show).toBe(true)
    })

    it('hides the tooltip on mouse out', async () => {
        const wrapper = mount(Tooltip, { props: { content: 'Test', delay: 500 } })
        await wrapper.trigger('mouseover')
        await new Promise(resolve => setTimeout(resolve, 500))
        expect(wrapper.vm.show).toBe(true)
        await wrapper.trigger('mouseout')
        expect(wrapper.vm.show).toBe(false)
    })
    it('does not show tooltip when content is empty', () => {
        const wrapper = mount(Tooltip, { props: { content: '', delay: 500 } })
        expect(wrapper.vm.show).toBe(false)
    })

    it('does not show tooltip without mouseover', async () => {
        const wrapper = mount(Tooltip, { props: { content: 'Test', delay: 500 } })
        expect(wrapper.vm.show).toBe(false)
        await new Promise(resolve => setTimeout(resolve, 500))
        expect(wrapper.vm.show).toBe(false)
    })
})
