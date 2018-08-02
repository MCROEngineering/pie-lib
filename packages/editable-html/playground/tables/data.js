module.exports = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'Where is the image?'
              }
            ]
          },
          {
            object: 'block',
            type: 'image',
            isVoid: true,
            data: {
              src:
                'https://img.washingtonpost.com/wp-apps/imrs.php?src=https://img.washingtonpost.com/news/speaking-of-science/wp-content/uploads/sites/36/2015/10/as12-49-7278-1024x1024.jpg&w=1484'
            }
          }
        ]
      }
      // {
      //   object: 'block',
      //   type: 'image',
      //   isVoid: true,
      //   data: {
      //     src:
      //       'https://img.washingtonpost.com/wp-apps/imrs.php?src=https://img.washingtonpost.com/news/speaking-of-science/wp-content/uploads/sites/36/2015/10/as12-49-7278-1024x1024.jpg&w=1484'
      //   }
      // },
      // {
      //   object: 'block',
      //   type: 'paragraph',
      //   nodes: [
      //     {
      //       object: 'text',
      //       leaves: [
      //         {
      //           text:
      //             'This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your keyboard and paste it anywhere in the editor!'
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  }
};
