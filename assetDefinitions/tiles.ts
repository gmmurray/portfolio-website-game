import { getTileMapSource, getTileSetSource } from '../helpers/getAssetSource';

import { PORTAL_ACTIVE_NAME } from '../constants/gameConstants';
import { TileMapDefinition } from '../types/assetDefinitions';

export const levelOneMapDefinition: TileMapDefinition = {
  key: 'level-one-map',
  source: getTileMapSource('level_one'),
  animatedLayer: ['animated'],
  tilesets: [
    {
      name: 'nature tileset',
      key: 'nature-tiles',
      source: getTileSetSource('nature_tileset'),
    },
    {
      name: 'serene_village_tileset',
      key: 'serene-village-tiles',
      source: getTileSetSource('serene_village_tileset'),
    },
    {
      name: 'portal_tileset',
      key: 'portal-tiles',
      source: getTileSetSource('portal_spritesheet'),
    },
    {
      name: 'interiors_tileset',
      key: 'interiors-tiles',
      source: getTileSetSource('interiors_tileset'),
    },
    {
      name: 'rooms_tileset',
      key: 'room-builder-tiles',
      source: getTileSetSource('room_builder_tileset'),
    },
    {
      name: 'coffee_tileset',
      key: 'coffee-tiles',
      source: getTileSetSource('coffee_spritesheet'),
    },
    {
      name: 'fishtank_spritesheet',
      key: 'fishtank-tiles',
      source: getTileSetSource('fishtank_spritesheet'),
    },
  ],
};

export const levelTwoMapDefinition: TileMapDefinition = {
  key: 'level-two-map',
  source: getTileMapSource('level_two'),
  animatedLayer: ['animated', PORTAL_ACTIVE_NAME, 'treasure2'],
  tilesets: [
    {
      name: 'simple_pixel_grass_tileset',
      key: 'simple-pixel-grass-tiles',
      source: getTileSetSource('simple_pixel_grass_tileset'),
    },
    {
      name: 'simple_pixel_plants_tileset',
      key: 'simple-pixel-plants-tiles',
      source: getTileSetSource('simple_pixel_plants_tileset'),
    },
    {
      name: 'simple_pixel_props_tileset',
      key: 'simple-pixel-props-tiles',
      source: getTileSetSource('simple_pixel_props_tileset'),
    },
    {
      name: 'simple_pixel_stone_tileset',
      key: 'simple-pixel-stone-tiles',
      source: getTileSetSource('simple_pixel_stone_tileset'),
    },
    {
      name: 'simple_pixel_structures_tileset',
      key: 'simple-pixel-structures-tiles',
      source: getTileSetSource('simple_pixel_structures_tileset'),
    },
    {
      name: 'simple_pixel_wall_tileset',
      key: 'simple-pixel-wall-tiles',
      source: getTileSetSource('simple_pixel_wall_tileset'),
    },
    {
      name: 'interiors_tileset',
      key: 'interiors-tiles',
      source: getTileSetSource('interiors_tileset'),
    },
    {
      name: 'portal_tileset',
      key: 'portal-tiles',
      source: getTileSetSource('portal_spritesheet'),
    },
    {
      name: 'treasure_spritesheet',
      key: 'treasure-tiles',
      source: getTileSetSource('treasure_spritesheet'),
    },
    {
      name: 'treasure_shine_tileset',
      key: 'treasure-shine-tiles',
      source: getTileSetSource('treasure_shine_tileset'),
    },
  ],
  characterLayer: {
    lower: 'ground',
    upper: 'platform',
    transitions: [
      {
        x: 33,
        y: 42,
        toUpper: true,
      },
      {
        x: 34,
        y: 42,
        toUpper: true,
      },
      {
        x: 33,
        y: 43,
        toUpper: false,
      },
      {
        x: 34,
        y: 43,
        toUpper: false,
      },
      {
        x: 9,
        y: 15,
        toUpper: true,
      },
      {
        x: 10,
        y: 15,
        toUpper: true,
      },
      {
        x: 9,
        y: 16,
        toUpper: false,
      },
      {
        x: 10,
        y: 16,
        toUpper: false,
      },
    ],
  },
};

export const levelThreeMapDefinition: TileMapDefinition = {
  key: 'level-three-map',
  source: getTileMapSource('level_three'),
  animatedLayer: ['orbs', 'animated', 'potions'],
  tilesets: [
    {
      name: 'catacomb_base_tileset',
      key: 'catacomb-base-tiles',
      source: getTileSetSource('catacomb_base_tileset'),
    },
    {
      name: 'catacomb_decorations_tileset',
      key: 'catacomb-decorations-tiles',
      source: getTileSetSource('catacomb_decorations_tileset'),
    },
    {
      name: 'torch_tileset',
      key: 'torch-tileset',
      source: getTileSetSource('torch_tileset'),
    },
    {
      name: 'green_orb_tileset',
      key: 'green-orb-tileset',
      source: getTileSetSource('green_orb_tileset'),
    },
    {
      name: 'orange_orb_tileset',
      key: 'orange-orb-tileset',
      source: getTileSetSource('orange_orb_tileset'),
    },
    {
      name: 'magical_items_tileset',
      key: 'magical-items-tileset',
      source: getTileSetSource('magical_items_tileset'),
    },
    {
      name: 'portal_tileset',
      key: 'portal-tiles',
      source: getTileSetSource('portal_spritesheet'),
    },
    {
      name: 'treasure_spritesheet',
      key: 'treasure-tiles',
      source: getTileSetSource('treasure_spritesheet'),
    },
    {
      name: 'treasure_shine_tileset',
      key: 'treasure-shine-tiles',
      source: getTileSetSource('treasure_shine_tileset'),
    },
    {
      name: 'half_potion_tileset',
      key: 'half-potion-tiles',
      source: getTileSetSource('half_potion_tileset'),
    },
    {
      name: 'full_potion_tileset',
      key: 'full-potion-tiles',
      source: getTileSetSource('full_potion_tileset'),
    },
    {
      name: 'speed_potion_tileset',
      key: 'speed-potion-tiles',
      source: getTileSetSource('speed_potion_tileset'),
    },
  ],
  characterLayer: {
    lower: 'ground',
    upper: 'overhead',
    transitions: [],
  },
};

export const levelFourMapDefinition: TileMapDefinition = {
  key: 'level-four-map',
  source: getTileMapSource('level_four'),
  animatedLayer: ['lava'],
  tilesets: [
    {
      name: 'simple_tileset',
      key: 'simple-tiles',
      source: getTileSetSource('simple_tileset'),
    },
    {
      name: 'lava_tileset',
      key: 'lava-tiles',
      source: getTileSetSource('lava_tileset'),
    },
    {
      name: 'brick_bg_tileset',
      key: 'brick-bg-tiles',
      source: getTileSetSource('brick_bg_tileset'),
    },
    {
      name: 'hill_one_bg_tileset',
      key: 'hill-one-bg-tiles',
      source: getTileSetSource('hill_one_bg_tileset'),
    },
    {
      name: 'hill_two_bg_tileset',
      key: 'hill-two-bg-tiles',
      source: getTileSetSource('hill_two_bg_tileset'),
    },
    {
      name: 'sky_bg_tileset',
      key: 'sky-bg-tiles',
      source: getTileSetSource('sky_bg_tileset'),
    },
    {
      name: 'space_bg_tileset',
      key: 'space-bg-tiles',
      source: getTileSetSource('space_bg_tileset'),
    },
    {
      name: 'cloud_bg_tileset',
      key: 'cloud-bg-tiles',
      source: getTileSetSource('cloud_bg_tileset'),
    },
    {
      name: 'trees_tileset',
      key: 'trees-tiles',
      source: getTileSetSource('trees_tileset'),
    },
    {
      name: 'water_tileset',
      key: 'water-tiles',
      source: getTileSetSource('water_tileset'),
    },
    {
      name: 'ladder_tileset',
      key: 'ladder-tiles',
      source: getTileSetSource('ladder_tileset'),
    },
  ],
};
