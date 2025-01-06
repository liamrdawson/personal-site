import {defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  type: 'object',
  title: 'Gallery',
  fields: [
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'display',
      type: 'string',
      title: 'Display as',
      description: 'How should we display these images?',
      options: {
        list: [
          {title: 'Stacked on top of eachother', value: 'stacked'},
          {title: 'In-line', value: 'inline'},
          {title: 'Carousel', value: 'carousel'},
        ],
        layout: 'radio', // <-- defaults to 'dropdown'
      },
    },
    {
      name: 'zoom',
      type: 'boolean',
      title: 'Zoom enabled',
      description: 'Should we enable zooming of images?',
    },
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare(selection) {
      const {images} = selection

      const image = images[0]

      return {
        title: `Gallery block of ${Object.keys(images).length} images`,
        subtitle: `Alt text: ${image.alt}`,
        media: image,
      }
    },
  },
})
