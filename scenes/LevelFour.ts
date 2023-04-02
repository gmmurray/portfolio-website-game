import {
  ADD_BUFF_EVENT,
  ADD_DEBUFF_EVENT,
  HUD_INITIALIZED_EVENT,
  HUD_SHUTDOWN_EVENT,
  UPDATE_BOTTOM_CENTER_TEXT_EVENT,
  UPDATE_CENTER_TEXT_EVENT,
  UPDATE_HEALTH_EVENT,
  UPDATE_TOP_LEFT_TEXT_EVENT,
  UPDATE_UNLOCKED_FEATURES_EVENT,
} from '../ui/events';
import {
  CREDIT_SCENE_KEY,
  INVENTORY_PHASER_EVENT_KEY,
  LEVEL_FOUR_BATTLE_TEXT_DURATION,
  LEVEL_FOUR_DAMAGE_DELAY_MS,
  LEVEL_FOUR_ENEMY_WALK_VELOCITY,
  LEVEL_FOUR_JUMP_VELOCITY,
  LEVEL_FOUR_MESSAGE_DISPLAY_DURATION,
  LEVEL_FOUR_PLAYER_DEPTH,
  LEVEL_FOUR_SCENE_KEY,
  LEVEL_FOUR_STAR_MODE_DURATION,
  LEVEL_FOUR_WALK_VELOCITY,
  QUESTS_PHASER_EVENT_KEY,
  TALENTS_PHASER_EVENT_KEY,
  TILE_SIZE,
  WASD_KEY_STRING,
} from '../constants/gameConstants';
import {
  LevelFourEnemy,
  LevelFourFoodDefinition,
  LevelFourInvisibleInteractionDefinition,
  LevelFourObjectiveDefinition,
} from '../types/levelFour';
import { Scene, Tilemaps } from 'phaser';
import {
  getLevelFourAnimationMap,
  levelFourEnemies,
  levelFourExitPortal,
  levelFourFoods,
  levelFourInvisibleInteractions,
  levelFourLayers,
  levelFourObjectives,
} from '../cast/levelFour';
import { store, storeDispatch } from '../redux/store';

import AnimatedTilesPlugin from 'phaser-animated-tiles-phaser3.5';
import { CharacterSelector } from '../characterSelect/characterSelector';
import { Coordinates } from '../types/position';
import { OverlayContentKey } from '../types/overlayContent';
import { SceneConfig } from '../types/SceneConfig';
import { TileMapDefinition } from '../types/assetDefinitions';
import { UIEventEmitter } from '../ui/eventEmitter';
import { UnlockedFeatures } from '../types/savedData';
import { createAnimation } from '../helpers/createAnimation';
import { generateJavascriptFrameworks } from '../helpers/generateJavascriptFramework';
import { levelFourMapDefinition } from '../assetDefinitions/tiles';
import { loadUnlockedFeatures } from '../helpers/localStorage';
import { overlayActions } from '../redux/overlaySlice';
import { purplePortalSpriteDefinition } from '../assetDefinitions/sprites';
import { showAlert } from '../helpers/sweetAlerts';

const START_X = 0;
const START_Y = 34;

export class LevelFour extends Scene {
  public uiEventEmitter!: UIEventEmitter;
  public characterSelector!: CharacterSelector;
  public animatedTiles: typeof AnimatedTilesPlugin;
  public player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public enemies!: Record<string, LevelFourEnemy>;
  public food!: Record<
    string,
    {
      definition: LevelFourFoodDefinition;
      container: Phaser.GameObjects.Container;
    }
  >;
  public objectives!: Record<
    string,
    {
      definition: LevelFourObjectiveDefinition;
      container: Phaser.GameObjects.Container;
    }
  >;
  public invisibleInteractions!: {
    defintion: LevelFourInvisibleInteractionDefinition;
    rectangle: Phaser.GameObjects.Rectangle;
  }[];
  public exitPortal!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private _map: Tilemaps.Tilemap | null = null;
  private _mapDefinition: TileMapDefinition;
  private _cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private _wasd!: Record<string, any>;
  private _unlockedFeatures!: UnlockedFeatures;

  // state
  private _playerHealth = 100;
  private _invulnerable = false;
  private _damageOverride = false;
  private _introMessageOverride = false;
  private _centerMessageVisible = false;
  private _completedObjectiveCount = 0;
  private _completedObjectiveOverride = false;

  constructor() {
    super(LEVEL_FOUR_SCENE_KEY);
    this._mapDefinition = levelFourMapDefinition;
  }

  public create = ({ uiEmitter, characterSelector }: SceneConfig) => {
    this.uiEventEmitter = uiEmitter;
    this.characterSelector = characterSelector;

    // set map and player character
    this._setMap()._setPlayer();

    this._setExitPortal();

    this._setEnemies();

    this._setFood();

    this._setObjectives();

    this._setInvisibleInteractions();

    // set map layers
    const tilesets = this._addMapTilesets();
    this._createMapLayers(tilesets);

    // set cursors
    this._setCursors();
    this._setWasd();
    this._setUIKeybinds();

    // set camera
    this._setCamera();

    // create animations
    this._createAnimations();

    this._initializeHUD();

    this._showIntroText();
  };

  public update = () => {
    this._handlePlayerMovement();
    Object.keys(this.enemies).forEach(key => this._moveEnemy(key));
  };

  private _initializeHUD = () => {
    this.time.delayedCall(
      100,
      () => {
        const unlockedFeatures = this._loadUnlockedFeatures();
        this.uiEventEmitter.emit(HUD_INITIALIZED_EVENT, true, true, true, true);
        this.uiEventEmitter.emit(UPDATE_HEALTH_EVENT, 100);
        this.uiEventEmitter.emit(
          UPDATE_TOP_LEFT_TEXT_EVENT,
          this._getObjectiveText(),
        );
        this.uiEventEmitter.emit(
          UPDATE_UNLOCKED_FEATURES_EVENT,
          unlockedFeatures,
          {
            inventory: () => this.createOverlay(OverlayContentKey.PROJECTS),
            quests: () => this.createOverlay(OverlayContentKey.EXPERIENCES),
            talents: () => this.createOverlay(OverlayContentKey.SKILLS),
          },
        );
      },
      [],
      this,
    );
  };

  private _setMap = () => {
    this._map = this.make.tilemap({
      key: this._mapDefinition.key,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });
    this.animatedTiles.init(this._map);

    return this;
  };

  private _setPlayer = () => {
    if (!this._map) return;

    const startPosition = this._map.tileToWorldXY(START_X, START_Y);

    this.player = this.physics.add
      .sprite(
        startPosition.x,
        startPosition.y,
        this.characterSelector.getPlayerDefinition().key,
      )
      .setCollideWorldBounds(true)
      .setDepth(LEVEL_FOUR_PLAYER_DEPTH);

    this.player.body.setSize(this.player.width * 0.8, this.player.height, true);

    return this;
  };

  private _setExitPortal = () => {
    if (!this._map) return;

    const position = this._map.tileToWorldXY(
      levelFourExitPortal.position.x,
      levelFourExitPortal.position.y,
    );

    this.exitPortal = this.physics.add
      .sprite(position.x, position.y, purplePortalSpriteDefinition.key)
      .setDepth(LEVEL_FOUR_PLAYER_DEPTH)
      .setImmovable(true);

    this.exitPortal.setFlipX(true).setSize(TILE_SIZE, this.exitPortal.height);

    createAnimation(
      this,
      {
        ...levelFourExitPortal.anim,
      },
      purplePortalSpriteDefinition.key,
    );

    this.exitPortal.setVisible(false);
  };

  private _setEnemies = () => {
    if (!this._map) return;

    if (!this.enemies) {
      this.enemies = {};
    }

    levelFourEnemies.forEach(lfe => {
      const startPosition = this._map!.tileToWorldXY(
        lfe.startPos.x,
        lfe.startPos.y,
      );

      const sprite = this.add.sprite(0, 0, lfe.textureKey);
      const text = this.add
        .text(0, -20, lfe.name, { fontSize: '1rem', fontFamily: 'Monospace' })
        .setScale(0.5)
        .setOrigin(0.5);

      const container = this.add
        .container(startPosition.x, startPosition.y, [sprite, text])
        .setDepth(LEVEL_FOUR_PLAYER_DEPTH);

      if (lfe.textureKey === 'slime') {
        container.setSize(sprite.width * 0.8, sprite.height * 0.6);
      } else {
        container.setSize(sprite.width * 0.8, sprite.height).setScale(0.8);
      }

      this.physics.world.enable(container);

      (container.body as Phaser.Physics.Arcade.Body)
        .setCollideWorldBounds(true)
        .setImmovable(true);

      this.enemies[lfe.id] = {
        container,
        sprite,
        definition: lfe,
        mapBounds: {
          left: this._map!.tileToWorldX(lfe.bounds.left),
          right: this._map!.tileToWorldX(lfe.bounds.right),
        },
      };

      this.physics.add.collider(
        this.enemies[lfe.id].container,
        this.player,
        () => this.dealDamage(lfe.damage),
      );
    });

    return this;
  };

  private _setFood = () => {
    if (!this._map) return;

    if (!this.food) {
      this.food = {};
    }

    levelFourFoods.forEach(lff => {
      const position = this._map!.tileToWorldXY(lff.position.x, lff.position.y);

      const image = this.add.image(0, 0, lff.textureKey);

      const text = this.add
        .text(0, -15, lff.name, {
          fontSize: '1.5rem',
          fontFamily: 'Monospace',
        })
        .setScale(0.5)
        .setOrigin(0.5);

      const container = this.add
        .container(position.x, position.y, [image, text])
        .setDepth(LEVEL_FOUR_PLAYER_DEPTH)
        .setScale(0.6)
        .setSize(image.width, image.height);

      this.physics.world.enable(container);

      (container.body as Phaser.Physics.Arcade.Body)
        .setCollideWorldBounds(true)
        .setImmovable(true);

      this.food[lff.id] = {
        container,
        definition: lff,
      };

      this.physics.add.collider(
        this.food[lff.id].container,
        this.player,
        () => {
          if (lff.value === 0) {
            this._handleStarModeFoodCollision(lff.id);
          } else {
            this._handleHealingFoodCollision(lff.id, lff.value);
          }
        },
      );
    });

    return this;
  };

  private _setObjectives = () => {
    if (!this._map) return;

    if (!this.objectives) {
      this.objectives = {};
    }

    const names = generateJavascriptFrameworks();

    levelFourObjectives.forEach((lfo, i) => {
      lfo.name = names[i];

      const position = this._map!.tileToWorldXY(lfo.position.x, lfo.position.y);

      const image = this.add.image(0, 0, lfo.textureKey).setScale(0.05);

      const text = this.add
        .text(0, -15, lfo.name, {
          fontSize: '1.5rem',
          fontFamily: 'Monospace',
        })
        .setScale(0.3)
        .setOrigin(0.5);

      const container = this.add
        .container(position.x, position.y, [image, text])
        .setDepth(LEVEL_FOUR_PLAYER_DEPTH)
        .setSize(image.width * 0.05, image.height * 0.05);

      this.physics.world.enable(container);

      (container.body as Phaser.Physics.Arcade.Body)
        .setCollideWorldBounds(true)
        .setImmovable(true);

      this.objectives[lfo.id] = {
        container,
        definition: lfo,
      };

      this.physics.add.collider(
        this.objectives[lfo.id].container,
        this.player,
        () => this._handleObjectiveCollision(lfo.id),
      );
    });

    return this;
  };

  private _setInvisibleInteractions = () => {
    if (!this._map) return;

    if (!this.invisibleInteractions) {
      this.invisibleInteractions = [];
    }

    levelFourInvisibleInteractions.forEach((lfii, index) => {
      const position = this._map!.tileToWorldXY(
        lfii.position.x,
        lfii.position.y,
      );

      const rectangle = this.add.rectangle(
        position.x,
        position.y,
        lfii.width,
        lfii.height,
      );

      this.physics.world.enable(rectangle);

      (rectangle.body as Phaser.Physics.Arcade.Body)
        .setCollideWorldBounds(true)
        .setImmovable(true);

      this.physics.add.collider(rectangle, this.player, () =>
        this._handleInvisibleInteraction(lfii),
      );

      this.invisibleInteractions.push({ defintion: lfii, rectangle });
    });
  };

  private _addMapTilesets = () => {
    const tilesets: string[] = [];

    this._mapDefinition.tilesets.forEach(ts => {
      this._map?.addTilesetImage(ts.name, ts.key);
      tilesets.push(ts.name);
    });

    return tilesets;
  };

  private _createMapLayers = (tilesets: string[]) => {
    if (!this._map || !this.player) return;

    this._map.layers.forEach((l, i) => {
      const layer = this._map?.createLayer(i, tilesets, 0, 0).setDepth(10);
      const definedLayer = levelFourLayers[l.name];
      if (definedLayer && layer) {
        const { depth, configure } = definedLayer;
        if (depth) {
          layer.setDepth(depth);
        }

        if (configure) {
          configure(layer, this);
        }
      }
    });

    return this;
  };

  private _setCursors = () => {
    this._cursors = this.input.keyboard.createCursorKeys();
    return this;
  };

  private _setWasd = () => {
    this._wasd = this.input.keyboard.addKeys(WASD_KEY_STRING);
    return this;
  };

  private _setUIKeybinds = () => {
    const callback = (event: any) => {
      const { inventory, questLog, talentTree } = this._unlockedFeatures ?? {};
      if (event.key === INVENTORY_PHASER_EVENT_KEY && inventory) {
        this.createOverlay(OverlayContentKey.PROJECTS);
      }

      if (event.key === QUESTS_PHASER_EVENT_KEY && questLog) {
        this.createOverlay(OverlayContentKey.EXPERIENCES);
      }

      if (event.key === TALENTS_PHASER_EVENT_KEY && talentTree) {
        this.createOverlay(OverlayContentKey.SKILLS);
      }
    };

    this.input.keyboard.on('keydown', callback, this);
    return this;
  };

  private _setCamera = () => {
    if (!this._map || !this.player) return;

    this.cameras.main
      .setBounds(0, 0, this._map.widthInPixels, this._map.heightInPixels)
      .startFollow(this.player)
      .setZoom(2.5);

    return this;
  };

  private _createAnimations = () => {
    const { key: playerDefinitionKey } =
      this.characterSelector.getPlayerDefinition();
    const animationMap = getLevelFourAnimationMap(playerDefinitionKey);

    Object.keys(animationMap).forEach(spriteKey => {
      Object.keys(animationMap[spriteKey]).forEach(animationKey => {
        createAnimation(this, animationMap[spriteKey][animationKey], spriteKey);
      });
    });

    return this;
  };

  private _handlePlayerMovement = () => {
    if (!this.player) return;

    const { key: playerDefinitionKey } =
      this.characterSelector.getPlayerDefinition();
    const animationMap = getLevelFourAnimationMap(playerDefinitionKey);

    if (this._cursors.left.isDown || this._wasd['A'].isDown) {
      this.player.body.setVelocityX(-LEVEL_FOUR_WALK_VELOCITY);
      this.player.anims.play(
        animationMap[playerDefinitionKey]['walk'].key,
        true,
      );
      this.player.flipX = true;
    } else if (this._cursors.right.isDown || this._wasd['D'].isDown) {
      this.player.body.setVelocityX(LEVEL_FOUR_WALK_VELOCITY);
      this.player.anims.play(
        animationMap[playerDefinitionKey]['walk'].key,
        true,
      );
      this.player.flipX = false;
    } else {
      this.player.body.setVelocityX(0);
      this.player.anims.play(animationMap[playerDefinitionKey]['idle'].key);
    }
    if (
      (this._cursors.up.isDown || this._wasd['W'].isDown) &&
      this.player.body.onFloor()
    ) {
      this.player.body.setVelocityY(-LEVEL_FOUR_JUMP_VELOCITY);
    }

    if (!this.player.body.onFloor()) {
      this.player.anims.pause();
    }
  };

  private _moveEnemy = (id: string) => {
    if (!this._map || !this.enemies[id]) return;
    const { key: playerDefinitionKey } =
      this.characterSelector.getPlayerDefinition();
    const animationMap = getLevelFourAnimationMap(playerDefinitionKey);

    // if enemy is at left bound, move right
    if (this.enemies[id].container.x <= this.enemies[id].mapBounds.left) {
      (
        this.enemies[id].container.body as Phaser.Physics.Arcade.Body
      ).setVelocityX(LEVEL_FOUR_ENEMY_WALK_VELOCITY);
      if (animationMap[this.enemies[id].definition.textureKey]) {
        this.enemies[id].sprite.anims.play(
          animationMap[this.enemies[id].definition.textureKey]['walk'].key,
          true,
        );
        this.enemies[id].sprite.flipX = true;
      }
    } else if (
      this.enemies[id].container.x >= this.enemies[id].mapBounds.right
    ) {
      // if enemy is at right bound, move left
      (
        this.enemies[id].container.body as Phaser.Physics.Arcade.Body
      ).setVelocityX(-LEVEL_FOUR_ENEMY_WALK_VELOCITY);
      if (animationMap[this.enemies[id].definition.textureKey]) {
        this.enemies[id].sprite.anims.play(
          animationMap[this.enemies[id].definition.textureKey]['walk'].key,
          true,
        );
        this.enemies[id].sprite.flipX = false;
      }
    }
  };

  public handleLavaCollision = () => {
    this.player.body.setVelocityY(-LEVEL_FOUR_JUMP_VELOCITY);
    this.dealDamage(10);
  };

  private _loadUnlockedFeatures = () => {
    const unlockedFeatures = loadUnlockedFeatures();
    if (unlockedFeatures) {
      this._unlockedFeatures = {
        ...(unlockedFeatures as UnlockedFeatures),
      };
      storeDispatch(overlayActions.updateUnlockedFeatures(unlockedFeatures));
    }

    return this._unlockedFeatures;
  };

  public createOverlay = (contentKey: OverlayContentKey) => {
    this.scene.pause();
    store.dispatch(
      overlayActions.overlayOpened({
        contentKey,
        pausedScene: this.scene.key,
      }),
    );

    return this;
  };

  public dealDamage = (value: number) => {
    if (this._invulnerable || this._damageOverride) return;
    this.uiEventEmitter.emit(
      ADD_DEBUFF_EVENT,
      `-${value} hp`,
      LEVEL_FOUR_BATTLE_TEXT_DURATION,
    );
    this._changeHealth(-value);
    this._invulnerable = true;
    this.time.delayedCall(
      LEVEL_FOUR_DAMAGE_DELAY_MS,
      () => {
        this._invulnerable = false;
      },
      [],
      this,
    );
  };

  public restoreHealth = (value: number) => {
    if (this._playerHealth === 100) return;

    this.uiEventEmitter.emit(
      ADD_BUFF_EVENT,
      `+${value} hp`,
      LEVEL_FOUR_BATTLE_TEXT_DURATION,
    );

    this._changeHealth(value);
  };

  private _changeHealth = (value: number) => {
    let newHealth = this._playerHealth + value;
    if (newHealth < 0) {
      newHealth = 0;
    }

    if (newHealth > 100) {
      newHealth = 100;
    }

    this._playerHealth = newHealth;
    this.uiEventEmitter.emit(UPDATE_HEALTH_EVENT, this._playerHealth);

    if (this._playerHealth <= 0) {
      this._handleDeath();
    }
  };

  private _handleDeath = () => {
    this.cameras.main.setAlpha(0.5);
    this.scene.pause();
    this.uiEventEmitter.emit(UPDATE_CENTER_TEXT_EVENT, 'You failed!');
    setTimeout(() => {
      this.scene.restart();
      this._playerHealth = 100;
      this._invulnerable = false;
      this._completedObjectiveCount = 0;
      this.uiEventEmitter.emit(HUD_SHUTDOWN_EVENT);
      this._initializeHUD();
    }, 2500);
  };

  private _toggleStarMode = () => {
    this.player.setImmovable(true);
    this._invulnerable = true;
    this.uiEventEmitter.emit(
      ADD_BUFF_EVENT,
      'flow state achieved',
      LEVEL_FOUR_BATTLE_TEXT_DURATION,
    );
    this.time.delayedCall(
      LEVEL_FOUR_STAR_MODE_DURATION,
      () => {
        this._invulnerable = false;
        this.player.setImmovable(false);
        this.uiEventEmitter.emit(
          ADD_DEBUFF_EVENT,
          'context switching',
          LEVEL_FOUR_BATTLE_TEXT_DURATION,
        );
      },
      [],
      this,
    );
  };

  private _removeFood = (id: string) => {
    this.food[id].container.destroy();
    delete this.food[id];
  };

  private _removeObjective = (id: string) => {
    this.objectives[id].container.destroy();
    delete this.objectives[id];
  };

  private _handleHealingFoodCollision = (id: string, value: number) => {
    if (this._playerHealth < 100) {
      this.restoreHealth(value);
      this._removeFood(id);
      return;
    }

    if (this._centerMessageVisible) {
      return;
    }

    this._centerMessageVisible = true;

    this.uiEventEmitter.emit(
      UPDATE_BOTTOM_CENTER_TEXT_EVENT,
      'You already have full health!',
    );

    this.time.delayedCall(
      LEVEL_FOUR_MESSAGE_DISPLAY_DURATION,
      () => {
        this.uiEventEmitter.emit(UPDATE_BOTTOM_CENTER_TEXT_EVENT, '');
        this._centerMessageVisible = false;
      },
      [],
      this,
    );
  };

  private _handleStarModeFoodCollision = (id: string) => {
    this._toggleStarMode();
    this._removeFood(id);
  };

  private _handleObjectiveCollision = (id: string) => {
    this._completedObjectiveCount++;
    this.uiEventEmitter.emit(
      UPDATE_TOP_LEFT_TEXT_EVENT,
      this._getObjectiveText(),
    );

    let messageText: string;

    if (
      this._completedObjectiveCount === levelFourObjectives.length ||
      this._completedObjectiveOverride
    ) {
      messageText = `You've learned enough to escape this place.`;
      this._enableExitPortal();
    } else {
      messageText = `You mastered ${
        this.objectives[id].definition.name
      } in ${Math.floor(Math.random() * 7)} day(s)!`;
    }

    this.uiEventEmitter.emit(UPDATE_CENTER_TEXT_EVENT, messageText);

    this.time.delayedCall(
      LEVEL_FOUR_MESSAGE_DISPLAY_DURATION,
      () => this.uiEventEmitter.emit(UPDATE_CENTER_TEXT_EVENT, ''),
      [],
      this,
    );

    this._removeObjective(id);
  };

  private _getObjectiveText = () =>
    `Javascript Frameworks Mastered: ${this._completedObjectiveCount}/${levelFourObjectives.length}`;

  private _handleInvisibleInteraction = (
    definition: LevelFourInvisibleInteractionDefinition,
  ) => {
    if (definition.handlerKey === 'ladder') {
      this._handleLadderCollision(definition.payload.position);
    }

    return this;
  };

  private _handleLadderCollision = (position: Coordinates) => {
    if (!this._map) return;

    const newPos = this._map!.tileToWorldXY(position.x, position.y);

    this._movePlayer(newPos);
  };

  private _movePlayer = (position: Coordinates) => {
    if (!this.player) return;

    this.player.setX(position.x).setY(position.y);
  };

  private _showIntroText = () => {
    if (this._introMessageOverride) return;
    this.scene.pause();
    showAlert(
      'Welcome',
      `You must prove your worth as a high quality developer by mastering the latest flavor of the month JavaScript frameworks as soon as possible. You will encounter the same challenges that all developers face but if you are resourceful you may find ways to endure.`,
      () => {
        this.scene.resume();
      },
    );
  };

  private _enableExitPortal = () => {
    this.exitPortal.setVisible(true);
    this.exitPortal.anims.play(levelFourExitPortal.anim.key, true);
    this.physics.add.collider(
      this.exitPortal,
      this.player,
      this._handleLevelComplete,
    );
  };

  private _handleLevelComplete = () => {
    this.time.delayedCall(
      1000,
      () => {
        this.cameras.main.fade(2500, 0, 0, 0);
      },
      [],
      this,
    );
    setTimeout(() => {
      this.scene.start(CREDIT_SCENE_KEY);
      this.uiEventEmitter.emit(HUD_SHUTDOWN_EVENT);
    }, 3500);
  };
}
