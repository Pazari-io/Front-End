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

let photoCategories = [
  'Characters',
  'Animations',
  'Animals',
  'Creatures',
  'Foley',
  'Transportation',
  'Weapons',
  'Environments',
  'Vehicles',
  'GUI',
  'Bundles',
  'Furniture',
  'Bundle'
];

export default function Games() {
  return <PageTypes categories={photoCategories} type="game" filters={filters}/>
}
