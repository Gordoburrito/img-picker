export type Dimension = {
  name: string;
  width: number;
  height: number;
  imageCount?: number | 'Any';
};

type DimensionsMap = {
  [key: string]: Dimension[];
};

export const PREDEFINED_DIMENSIONS: DimensionsMap = {
  'stinson': [
    { name: 'Hero Large', width: 1920, height: 1080, imageCount: 1 },
    { name: 'Hero Small', width: 1919, height: 749, imageCount: 1 },
    { name: 'Block Image Text', width: 754, height: 728, imageCount: 1 },
    { name: 'Block Masonry Grid Long', width: 300, height: 428, imageCount: 4 },
    { name: 'Block Masonry Grid Short', width: 350, height: 350, imageCount: 4 },
    { name: 'Block Banner', width: 1921, height: 987, imageCount: 1 },
    { name: 'Block Grid', width: 482, height: 462, imageCount: 'Any' },
    { name: 'Block Single Image Slider', width: 1001, height: 562, imageCount: 'Any' },
    { name: 'Before and After', width: 720, height: 480, imageCount: 'Any' },
    { name: 'Block Repeater Post', width: 1203, height: 677, imageCount: 'Any' }
  ],
  'calistoga': [
    { name: 'Hero', width: 1000, height: 667, imageCount: 1 },
    { name: 'Block Image Text', width: 1000, height: 667, imageCount: 1 },
    { name: 'Block Cards', width: 1000, height: 667, imageCount: 3 },
    { name: 'Block Before and After Gallery', width: 1000, height: 517, imageCount: 'Any' },
    { name: 'Block Tabs', width: 1000, height: 667, imageCount: 'Any' },
    { name: 'Block Team Members', width: 1000, height: 1060, imageCount: 'Any' },
    { name: 'Block Gallery', width: 1200, height: 800, imageCount: 'Any' }
  ],
  'haight-ashbury': [
    { name: 'Hero Large', width: 1920, height: 1080, imageCount: 1 },
    { name: 'Hero Mobile', width: 720, height: 900, imageCount: 1 },
    { name: 'Block Image Text Regular', width: 1300, height: 867, imageCount: 1 },
    { name: 'Block Image Text Background', width: 1300, height: 1300, imageCount: 1 },
    { name: 'Block Columns', width: 800, height: 578, imageCount: 3 },
    { name: 'Block CTA Boxes', width: 800, height: 533, imageCount: 'Any' },
    { name: 'Custom Contact Banner', width: 1920, height: 732, imageCount: 1 },
    { name: 'Block Tabs', width: 736, height: 558, imageCount: 'Any' },
    { name: 'Block Team Members', width: 600, height: 600, imageCount: 'Any' },
    { name: 'Block Gallery', width: 1200, height: 797, imageCount: 'Any' },
    { name: 'Custom Repeater Post', width: 1300, height: 813, imageCount: 'Any' },
    { name: 'Custom Post', width: 1300, height: 813, imageCount: 'Any' }
  ],
  'pismo': [
    { name: 'Hero', width: 1920, height: 1280, imageCount: 1 },
    { name: 'Block Image Text', width: 1280, height: 795, imageCount: 1 },
    { name: 'Block Accordion', width: 750, height: 563, imageCount: 1 },
    { name: 'Block Team Members', width: 750, height: 500, imageCount: 'Any' },
    { name: 'Block Gallery', width: 750, height: 500, imageCount: 'Any' },
    { name: 'Block Blogs', width: 750, height: 500, imageCount: 'Any' }
  ],
  'eureka': [
    { name: 'Hero Large', width: 1920, height: 1080, imageCount: 1 },
    { name: 'Hero Mobile', width: 1080, height: 1080, imageCount: 1 },
    { name: 'Block Image Text', width: 1004, height: 700, imageCount: 1 },
    { name: 'Custom Column', width: 1000, height: 667, imageCount: 1 },
    { name: 'Block Carousel', width: 1000, height: 662, imageCount: 'Any' },
    { name: 'Custom Contact Banner', width: 1920, height: 743, imageCount: 1 }
  ],
  'shasta': [
    { name: 'Hero Large', width: 1920, height: 1080, imageCount: 1 },
    { name: 'Hero Mobile', width: 720, height: 900, imageCount: 1 },
    { name: 'Block Image Text', width: 1200, height: 798, imageCount: 1 },
    { name: 'Block Gallery', width: 1200, height: 801, imageCount: 'Any' },
    { name: 'Custom About Block', width: 1300, height: 813, imageCount: 1 },
    { name: 'Custom Team Block', width: 1300, height: 867, imageCount: 1 },
    { name: 'Block Tabs', width: 1400, height: 933, imageCount: 'Any' },
    { name: 'Custom Repeater Post', width: 1600, height: 1024, imageCount: 'Any' }
  ],
  'sonoma': [
    { name: 'Hero', width: 608, height: 483, imageCount: 1 },
    { name: 'Block Image Text', width: 738, height: 492, imageCount: 1 },
    { name: 'Block Image Title CTA', width: 928, height: 660, imageCount: 'Any' },
    { name: 'Block Tabs', width: 572, height: 488, imageCount: 1 },
    { name: 'Custom Team Members', width: 353, height: 294, imageCount: 'Any' },
    { name: 'Block Gallery', width: 928, height: 660, imageCount: 'Any' },
    { name: 'Custom Location Map', width: 352, height: 264, imageCount: 'Any' }
  ],
  'gibbs': [
    { name: 'Hero', width: 1920, height: 1280, imageCount: 1 },
    { name: 'Block Partial Image', width: 1920, height: 1280, imageCount: 1 },
    { name: 'Custom Team Members', width: 1300, height: 1300, imageCount: 'Any' },
    { name: 'Slider Main Section', width: 1920, height: 1280, imageCount: 'Any' },
    { name: 'Block Full Text Image', width: 640, height: 428, imageCount: 'Any' },
    { name: 'Custom About Doctors', width: 1300, height: 868, imageCount: 1 },
    { name: 'Block Slider', width: 1400, height: 935, imageCount: 'Any' },
    { name: 'Block Alt Text', width: 1300, height: 868, imageCount: 1 }
  ]
}; 