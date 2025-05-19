import { mount, flushPromises } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

global.fetch = vi.fn()

describe('Index.vue', () => {
  beforeEach(() => {
    fetch.mockReset()
  })

  it('renders search input and genre select', () => {
    const wrapper = mount(IndexPage)

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)

    const select = wrapper.find('[role="combobox"]')
    expect(select.exists()).toBe(true)
  })

  it('fetches and renders movie cards on search', async () => {
    // Mock OMDB search response
    fetch.mockResolvedValueOnce({
      json: async () => ({
        Response: 'True',
        Search: [
          { Title: 'Batman Begins', imdbID: 'tt0372784', Year: '2005' },
          { Title: 'The Dark Knight', imdbID: 'tt0468569', Year: '2008' },
        ],
        totalResults: '2'
      }),
    })

    const wrapper = mount(IndexPage)

    const input = wrapper.find('input')
    await input.setValue('Batman')
    await input.trigger('keyup.enter')
    await flushPromises()

    // Wait for DOM updates
    const cards = wrapper.findAllComponents({ name: 'Moviecard' })
    expect(cards.length).toBe(2)
  })

  it('shows "No movies found" if API returns false', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        Response: 'False',
        Error: 'Movie not found!'
      }),
    })

    const wrapper = mount(IndexPage)
    const input = wrapper.find('input')
    await input.setValue('asdasdsadsadas')
    await input.trigger('keyup.enter')
    await flushPromises()

    expect(wrapper.text()).toContain('No movies found')
  })
})
