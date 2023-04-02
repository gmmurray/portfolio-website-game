export const SCALE = 3;
export const TILE_SIZE = 16;
export const SCALED_TILE_SIZE = SCALE * TILE_SIZE;
export const ENTER_EVENT_KEY = 'Enter';
export const SPACE_EVENT_KEY = ' ';
export const RANDOM_MOVEMENT_DELAY = 2000; // 2 seconds
export const BASE_PLAYER_SPEED = 4;
export const PLAYER_MOVED_EVENT = 'player_moved_event';
export const INVENTORY_KEY = 'B';
export const INVENTORY_PHASER_EVENT_KEY = INVENTORY_KEY.toLocaleLowerCase();
export const INVENTORY_REACT_EVENT_KEY = `Key${INVENTORY_KEY}`;
export const QUESTS_KEY = 'L';
export const QUESTS_PHASER_EVENT_KEY = QUESTS_KEY.toLocaleLowerCase();
export const QUESTS_REACT_EVENT_KEY = `Key${QUESTS_KEY}`;
export const TALENTS_KEY = 'N';
export const TALENTS_PHASER_EVENT_KEY = TALENTS_KEY.toLocaleLowerCase();
export const TALENTS_REACT_EVENT_KEY = `Key${TALENTS_KEY}`;
export const WASD_KEY_STRING = 'W,A,S,D';
export const UI_DEPTH = 30;

export const ASSETS_BASE_URL = 'assets/game/';

// scene keys
export const LOADING_SCENE_KEY = 'loading-scene';
export const LEVEL_ONE_SCENE_KEY = 'level-one';
export const LEVEL_TWO_SCENE_KEY = 'level-two';
export const LEVEL_THREE_SCENE_KEY = 'level-three';
export const LEVEL_FOUR_SCENE_KEY = 'level-four';
export const UI_SCENE_KEY = 'ui-scene';
export const CREDIT_SCENE_KEY = 'credits';
export const CHARACTER_SELECT_SCENE_KEY = 'character-select';

// plugin keys
export const GRID_ENGINE_PLUGIN_KEY = 'gridEngine';
export const DIALOG_PLUGIN_KEY = 'dialog';
export const ANIMATED_TILES_PLUGIN_KEY = 'animatedTiles';
export const MC_DIALOG_PLUGIN_KEY = 'mcDialog';
export const PHASER_TOOLTIP_PLUGIN_KEY = 'phaserTooltip';

export const PLUGIN_KEYS = [
  GRID_ENGINE_PLUGIN_KEY,
  DIALOG_PLUGIN_KEY,
  ANIMATED_TILES_PLUGIN_KEY,
  MC_DIALOG_PLUGIN_KEY,
  PHASER_TOOLTIP_PLUGIN_KEY,
];

// level two
export const DEFAULT_FIRE_ANIMATION_FPS = 10;
export const PILLAR_ONE_ACTIVE_NAME = 'active1';
export const PILLAR_TWO_ACTIVE_NAME = 'active2';
export const PILLAR_THREE_ACTIVE_NAME = 'active3';
export const PORTAL_ACTIVE_NAME = 'active-portal';

// level three
export const POTION_LAYER_NAME = 'potions';
export const ORB_LAYER_NAME = 'orbs';
export const LEVEL_THREE_BACKGROUND_COLOR = '#070707';
export const LEVEL_THREE_FIRE_ANIMATION_REPEAT_DELAY = 2000;
export const LEVEL_THREE_FIRE_INVULNERABILITY_PERIOD = 1000;
export const LEVEL_THREE_FIRE_BASE_DAMAGE = 10;
export const LEVEL_THREE_BUFF_DEBUFF_DELAY = 1000;
export const LEVEL_THREE_BUFF_DEBUFF_DURATION = 3000;
export const LEVEL_THREE_ENEMY_FOLLOW_RANGE = 3;

// level four
export const LEVEL_FOUR_PLAYER_DEPTH = 15;
export const LEVEL_FOUR_WALK_VELOCITY = 100;
export const LEVEL_FOUR_ENEMY_WALK_VELOCITY = 25;
export const LEVEL_FOUR_JUMP_VELOCITY = 300;
export const LEVEL_FOUR_BATTLE_TEXT_DURATION = 2000;
export const LEVEL_FOUR_DAMAGE_DELAY_MS = 500;
export const LEVEL_FOUR_STAR_MODE_DURATION = 10000;
export const LEVEL_FOUR_MESSAGE_DISPLAY_DURATION = 3000;

// misc
export const TILEMAPLAYER_TYPE = 'TilemapLayer';
export const DEFAULT_PORTAL_TEXT =
  'The portal hums with magical energy as you approach...';

// colors
export const THEME_DARK_BLUE = '#050a2b';
export const THEME_DARK_BLUE_NUMBER = 0x050a2b;
export const THEME_SECONDARY_BLUE_NUMBER = 0x131d68;

export const THEME_YELLOW = '#ebaa02';
export const THEME_YELLOW_NUMBER = 0xebaa02;

export const THEME_DARK_YELLOW = '#976f08';
export const THEME_DARK_YELLOW_NUMBER = 0x976f08;

export const THEME_WHITE = '#fff';
export const THEME_LIGHT_GREY = '#b0b0b0';

export const THEME_NEGATIVE_EFFECT = '#C41E3A';
export const THEME_NEGATIVE_EFFECT_NUMBER = 0xc41e3a;
export const THEME_DANGER_EFFECT = '#FFAC1C';
export const THEME_DANGER_EFFECT_NUMBER = 0xffac1c;
export const THEME_POSITIVE_EFFECT = '#228B22';
export const THEME_POSTIVE_EFFECT_NUMBER = 0x228b22;

export const LOCAL_STORAGE_KEY = 'gmurray-game';
