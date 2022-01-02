import PageTypes from '../pageTypes.js';

const filters = [
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

let photoCategories = [
  'Vectors',
  'Backgrounds',
  'Print Templates',
  'Logo Templates',
  'Web Elements',
  'Email Templates',
  'Presentation Templates',
  'Icons',
  'Fonts',
  'YouTube',
  'Facebook',
  'Instagram',
  'LinkedIn',
  'TikTok',
  'Twitter',
  'Vimeo',
  'Twitch',
  'Bundle'
];

export default function Graphics() {
  return <PageTypes categories={photoCategories} type="graphic" filters={filters}/>
}
