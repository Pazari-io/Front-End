
const bookFilters = [
  {
    id: 'properties',
    name: 'Properties',
    options: [
      { value: 'verfied', label: 'Verfied publisher', checked: true },
      { value: 'exclusive', label: 'Exclusive release', checked: true },
      { value: 'hasaudio', label: 'With audio', checked: false },
      { value: 'waterfree', label: 'No watermarks', checked: false },
      { value: 'permissions', label: 'Full permissions', checked: false }
    ]
  },
  {
    id: 'age',
    name: 'Age',
    options: [
      { value: 'every', label: 'Every age', checked: false },
      { value: 'kids', label: 'Kids', checked: false },
      { value: 'young', label: 'Young adults', checked: true },
      { value: 'adults', label: '+18', checked: false }
    ]
  },
  {
    id: 'length',
    name: 'Length',
    options: [
      { value: 'lessthan100', label: 'Less than 100 pages', checked: false },
      { value: 'morethan100', label: 'More than 100 pages', checked: false },
      { value: 'morethan300', label: 'More than 300 pages', checked: false }
    ]
  }
];

const gameFilters = [
  {
    id: 'properties',
    name: 'Properties',
    options: [
      { value: 'verfied', label: 'Verfied publisher', checked: false },
      { value: 'exlusive', label: 'Exclusive publication', checked: false },
      { value: 'commercial', label: 'Commercial license', checked: false },
      { value: 'editorial', label: 'Editorial license', checked: false }
    ]
  },

  {
    id: 'type',
    name: 'Type',
    options: [
      { value: '3d', label: '3D', checked: false },
      { value: '2d', label: '2D', checked: false },
      { value: 'template', label: 'Templates', checked: false },
      { value: 'addone', label: 'Add-Ones', checked: false }
    ]
  },
  {
    id: 'software',
    name: 'Software',
    options: [
      { value: '3ds', label: '3D Max', checked: false },
      { value: 'maya', label: 'Maya', checked: false },
      { value: 'photoshop', label: 'Adobe Photoshop', checked: false },
      { value: 'zbrush', label: 'ZBrush', checked: false },
      { value: 'blender', label: 'Blender', checked: false }
    ]
  }
];

const graphicFilters = [
  {
    id: 'properties',
    name: 'Properties',
    options: [
      { value: 'verfied', label: 'Verfied publisher', checked: false },
      { value: 'exlusive', label: 'Exclusive publication', checked: false },
      { value: 'commercial', label: 'Commercial license', checked: false },
      { value: 'editorial', label: 'Editorial license', checked: false }
    ]
  },
  {
    id: 'software',
    name: 'Software',
    options: [
      { value: 'canva', label: 'Canva', checked: false },
      { value: 'illustrator', label: 'Adobe Illustrator', checked: false },
      { value: 'photoshop', label: 'Adobe Photoshop', checked: false },
      { value: 'xd', label: 'Adobe XD', checked: false },
      { value: 'sketch', label: 'Sketch', checked: false },
      { value: 'pages', label: 'Apple Pages', checked: false },
      { value: 'slides', label: 'Google Slides', checked: false },
      { value: 'powerpoint', label: 'MS PowerPoint', checked: false }
    ]
  }
];

const photoFilters = [
  {
    id: 'properties',
    name: 'Properties',
    options: [
      { value: 'verfied', label: 'Verfied publisher', checked: false },
      { value: 'exlusive', label: 'Exclusive publication', checked: false },
      { value: 'commercial', label: 'Commercial license', checked: false },
      { value: 'editorial', label: 'Editorial license', checked: false }
    ]
  }
];

const videoFilters = [
  {
    id: 'properties',
    name: 'Properties',
    options: [
      { value: 'verfied', label: 'Verfied publisher', checked: false },
      { value: 'exlusive', label: 'Exclusive publication', checked: false },
      { value: 'commercial', label: 'Commercial license', checked: false },
      { value: 'editorial', label: 'Editorial license', checked: false }
    ]
  },
  {
    id: 'type',
    name: 'Type',
    options: [
      { value: 'stock', label: 'Stock Videos', checked: false },
      { value: 'template', label: 'Templates', checked: false }
    ]
  },
  {
    id: 'resolution',
    name: 'Resolutions',
    options: [
      { value: '2k', label: '2K', checked: false },
      { value: '4k', label: '4K', checked: false },
      { value: '5k', label: '5K+', checked: false }
    ]
  },
  {
    id: 'software',
    name: 'Software',
    options: [
      { value: 'aftereffects', label: 'Adone After Effect', checked: false },
      { value: 'premiere', label: 'Adobe Premiere Pro', checked: false },
      { value: 'davinci', label: 'Davinci Resolve', checked: false },
      { value: 'finalcut', label: 'Final Cut Pro', checked: false },
      { value: 'motiongraphic', label: 'Motion Graphics', checked: false }
    ]
  }
];

const audioFilters = [
  {
    id: 'properties',
    name: 'Properties',
    options: [
      { value: 'verfied', label: 'Verfied publisher', checked: false },
      { value: 'exlusive', label: 'Exclusive publication', checked: false },
      { value: 'erpo', label: 'Exclude R.P.O', checked: false },
      { value: 'rpoo', label: 'R.P.O only', checked: false }
    ]
  },
  {
    id: 'type',
    name: 'Type',
    options: [
      { value: 'sfx', label: 'SFX', checked: false },
      { value: 'music', label: 'Music', checked: false }
    ]
  },
  {
    id: 'length',
    name: 'Length',
    options: [
      { value: 'lessthan1', label: 'Less than 1 minutes', checked: false },
      { value: 'morethan1', label: 'More than 1 miutes', checked: false },
      { value: 'morethan3', label: 'More than 3 minutes', checked: false }
    ]
  }
];

module.exports = {
    bookFilters: bookFilters,
    gameFilters: gameFilters,
    graphicFilters: graphicFilters,
    photoFilters: photoFilters,
    videoFilters: videoFilters,
    audioFilters: audioFilters
};