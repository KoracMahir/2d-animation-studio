# Family kitchen

> The open-plan kitchen and dining room of the Safadi family's red-brick [house](../house/README.md). At one end: sage cabinets, a butcher-block counter, a big range with a glass oven door, the sink under the autumn garden window, a fridge covered in drawings, and a kitchen island under two pendant lamps. At the other: a long table for twelve under a chandelier. It can be morning, day or evening, dressed for Thanksgiving, with oven glow and smoke and a mess dial. The folder also holds the `TKY` turkey prop kit.

## Description

One long room, the same home as the [living room](../living_room/README.md): cream walls over a sage-green wainscot, white trim, a honey-oak plank floor. The archway leads to the hall and the living room, and you can see the blue sofa through it.
- **Cooking wall (Z 1300):** sage base cabinets with a butcher-block top run along the whole wall. Behind them is a white subway-tile backsplash with sage upper cabinets above (glass doors with dishes). In the middle stands the big cream **range**, with four burners, a digital clock or temperature display on the backguard, four knobs, a big red-needle **dial**, and a **glass oven door** you can see into (two racks and an element that glows when it's on). The door can swing down open. Above it is a stainless **range hood** with its chimney. The **sink** sits under a gingham-valanced **window** onto the autumn garden (orange, red and gold trees, a white picket fence, falling leaves), with a plant and a jar on the sill. A **wall clock** with a ticking second hand hangs over the window. On the backsplash are a **spice rack** with two rows of jars and a rail of **hanging copper pots**, a ladle, a whisk and a spatula. On the counter: a red **stand mixer**, a crock of spoons and a whisk, a dish rack, dish soap, a cutting board, a **toaster**, a **fruit bowl**, a **knife block** and two canisters. Over the right upper cabinets hangs a **KISS THE COOK** sign. At the right end is the cream **fridge** ("Frost"), covered in kids' crayon drawings (a sun, a rainbow, a house, a hand-turkey, a family, a star, a fish), magnets and ABC letters.
- **Kitchen island:** sage panelled doors, a butcher-block top and a tea towel hanging on the front. A bowl and a rolling pin sit at its left end and a utensil crock at its right. The **middle stays clear for scene props**. Two sage dome **pendant lamps** hang over it, and a mustard **bar stool** stands at its right end.
- **Kitchen side walls:** on the left are a **chalkboard** (menu scribbles), a **pantry door** and the archway. On the right are the **back door** to the garden (glass upper panes onto the trees, a mat), a **calendar** with a pumpkin, and the dining window.
- **Dining wall (Z 0):** a long wooden **sideboard** (four drawers, four doors, a table lamp, a bowl or pumpkins on top), a **plate rail** with six plates, the gold-framed **family picture** ("THE SAFADIS", six smiling faces), and two **sconces**.
- **Dining table:** a long wooden table for **twelve**, with ten spindle-back chairs along the far side and two tall carver chairs at the head and the foot, so every guest faces the camera in the dining view. Near-side chairs are optional (`nearChairs`). There's a rust-and-cream **rug** underneath and a wrought-iron candle **chandelier** above. On an ordinary day the table has placemats, a fruit bowl and a vase.
- **Dining side walls:** a wide three-pane **window** onto the garden with mustard tie-back curtains and a fiddle-leaf fig beside it (right wall, screen-left in the dining view), and the **archway** (left wall, screen-right in the dining view).

**Mood:** warm, cosy and a little cluttered. It's a family kitchen, and the cook is about to have a very bad day.

## Two views

| View | Camera | Sees |
|---|---|---|
| **Kitchen view** | `dir: 1` (the default), looking toward +Z | the cooking wall (range, hood, sink window, fridge), the island and pendants, the chalkboard and pantry door (left), the back door and calendar (right) |
| **Dining view** | `dir: -1`, looking back toward −Z | the table for twelve, the chandelier, the sideboard, the family picture and plate rail, the dining window (screen-left), the archway (screen-right) |

Character rigs always face the camera. In the dining view +X is on screen-left.

## Options

Pass the **same** `o` to `back()` and `front()`. All options are pure functions of `o` and `t`.

| Option | Values (default) | What it does |
|---|---|---|
| `splitZ`, `toZ` | numbers | as in the living room: `back` draws pieces farther than `splitZ`, `front` the nearer ones (down to `toZ`) |
| `time` | `'morning'` · `'day'` (default) · `'evening'` | the sky in every window (gold dawn / blue / violet-to-orange dusk with stars), a sun patch and beam from the dining window (morning, day), a warm tint over the whole set (morning gold, evening plum), the clock hands (8:00 / 13:00 / 18:00 plus `t`), and the default `lamps` |
| `lamps` | 0..1 (morning .2, day 0, evening 1) | glow of the pendants, chandelier, sconces, sideboard lamp and hood light |
| `oven` | `{ on, glow, door, smoke, dial }` (all off) | `on`: element glows, backguard shows 350°, red pilot light, dial turned. `glow` 0..1 (default .75 when on): orange light inside and spilling onto the floor. `door` 0..1: the door swings down on its bottom hinge (1 = flat open). `smoke` 0..1: a plume pours out over the range and rolls along the ceiling, plus a soot mark over the hood (when > .3). `dial` 0..1: the big dial's angle (default .6 when on, else 0) |
| `smoke` | 0..1 (defaults to `oven.smoke`) | the **ceiling haze**: a layer of grey smoke under the whole ceiling that gets lower and thicker as it rises. Set it on its own to leave smoke hanging after the oven is off |
| `mess` | 0..1 (0) | food splats (flour, pumpkin, gravy, egg) with drips on the base and upper cabinets, the backsplash and the island front; flour drifts on the counter, the island top and the floor; things on the floor that appear one by one as `mess` rises (a copper pot at .1, a spilt flour bag at .2, a frying pan at .25, a lid at .35, a spoon at .45, broken eggs at .55, a steel pot at .65, an upturned bowl at .75); a scorch mark over the hood. Above .5 there are also splats on the dining wainscot |
| `thanksgiving` | bool (false) | pennant bunting (GIVE THANKS over the cabinets, HAPPY THANKSGIVING over the dining wall), an autumn leaf-and-pumpkin garland over the sideboard, pumpkins by the archway, a THANKSGIVING menu on the chalkboard; on the table a cream cloth, a burnt-orange runner, **twelve place settings** (gold charger, plate, napkin, knife, wine glass), a cornucopia centrepiece, pumpkins and gourds, six candles (lit), three side dishes, a bread basket and a gravy boat, plus orange or red seat cushions. **The table centre (X ±40) stays free for the turkey** |
| `cloth` | `false` · `'short'` · `'long'` (default `'long'` with `thanksgiving`, else false) | the tablecloth: a short hanging edge, or to the floor (soft folds and an orange hem with little red leaves) |
| `tableItems` | bool (true) | false leaves the table **bare** (and the sideboard top too): no settings, centrepiece, candles or placemats. The cloth still follows `cloth` |
| `islandItems` | bool (true) | false clears the island ends (bowl, rolling pin, crock) |
| `counterItems` | bool (true) | false clears the counter props (mixer, crock, toaster, fruit bowl, knife block, canisters, cutting board) |
| `nearChairs` | bool (false) | adds ten chairs on the near side of the table (backs to the camera in the dining view) |
| `steam` | 0..1 (0) | fogs the kitchen window (and the dining window at 70%) |

**Hooks** (functions called during the depth-sorted pass, right after their piece is drawn, so the props sit on the surface at the right depth even with characters around):

| Hook | Called | Use it for |
|---|---|---|
| `inOven(P, t)` | inside the oven cavity, clipped to the cavity opening, **before** the glass tint and the door | the turkey roasting in its pan: `TKY.pan` at world `(OVEN.inside.x, OVEN.rack, OVEN.inside.z)` |
| `onIsland(P, t)` | after the island (and its flour) | props on the island top (Y 92) |
| `onCounter(P, t)` | after the counter props | props on the counter top (Y 92) |
| `onTable(P, t)` | after the table and its settings | props on the table top (Y 76, or 77 on the cloth) |
| `onSideboard(P, t)` | after the sideboard | props on the sideboard (Y 88) |

To place a screen-space prop at a world point: `const [sx, sy, k] = P.p(X, Y, Z); TKY.turkey(sx, sy, k * TKY.WORLD, {...})`.

The studio's **Version** chips are Day, Morning, Evening, Thanksgiving (`time: 'evening', thanksgiving: true`), Oven on (`oven: { on: true, glow: .9 }`), and Kitchen disaster (`thanksgiving: true, mess: 1, steam: .6, oven: { on: true, glow: 1, door: .7, smoke: 1 }`).

## Layout (world units; a person is about 170 tall)

X is right when facing the cooking wall, Y is up (the floor is Y = 0), and Z runs from the dining wall (0) to the cooking wall (1300). Every value below is exported on the location object (`const K = LOCATIONS.family_kitchen` or the global `family_kitchen`).

| Constant | Value | Notes |
|---|---|---|
| `HW`, `BACK`, `FRONT`, `CEIL`, `RAIL` | 600, 0, 1300, 300, 92 | side walls X = ±600; dining wall Z 0; cooking wall Z 1300; ceiling Y 300; chair rail Y 92 |
| `COUNTER` | `{ x0: -600, x1: 400, y: 92, z0: 1235, z1: 1300 }` | top surface Y 92 (front lip at Z 1230). The range interrupts it at X ±60. Clear spans for props: X −95…−65, 62…98, 215…285 (or pass `counterItems: false`). Put props at Z ≈ 1255–1285 |
| `OVEN` | `{ x: 0, x0: -60, x1: 60, z: 1230, back: 1292, y0: 12, y1: 70, w: 104, h: 58, top: 92, door: { x0: -52, x1: 52, y0: 12, y1: 70 }, glass: { x0: -40, x1: 40, y0: 24, y1: 60 }, inside: { x: 0, y: 22, z: 1262 }, rack: 22 }` | the range spans X ±60, Z 1230–1298. Door rectangle on the front plane Z 1230; glass window inside it; cavity Z 1230–1292, Y 14…68; rack at Y 22. **Interior point** `inside` = where a pan sits (on the rack, mid-depth). Cooktop at Y 92 with burners at (±30, 1250) and (±30, 1280) |
| `HOOD` | `{ x0: -66, x1: 66, y0: 168, y1: 216, z: 1248 }` | the hood's lower lip is at Y 162…168; the chimney runs to the ceiling |
| `SINK` | `{ x: -260, x0: -302, x1: -218, y: 92, z0: 1246, z1: 1290, z: 1268 }` | the basin in the counter top; faucet at (−260, 92, 1294) |
| `KWIN` | `{ x0: -360, x1: -160, y0: 118, y1: 242 }` | the window over the sink (on the cooking-wall plane) |
| `FRIDGE` | `{ x: 478, x0: 410, x1: 545, y: 212, z0: 1215, z1: 1300 }` | the door face is at Z 1215; freezer above Y 140 |
| `ISLAND` | `{ x0: -170, x1: 170, y: 92, z0: 850, z1: 950 }` | top Y 92. The ends are dressed; **X −110…110 is clear**. Characters stand **behind it at Z 1020** (`BEHIND_ISLAND`), so the kitchen cameras see them from the waist up over the top |
| `BEHIND_ISLAND` | `{ x: 0, z: 1020 }` | also `MARK` |
| `LAMPS` | `[{ x: -90, z: 900, y: 214 }, { x: 90, z: 900, y: 214 }]` | pendant shades (bottom at Y ≈ 214) |
| `TABLE` | `{ x0: -440, x1: 440, y: 76, z0: 200, z1: 310 }` | top Y 76 (cloth top Y 76.6; settings sit at Y 77). Far edge Z 200 (guests' side), near edge Z 310. Place settings for the far seats are at Z 224, for the end seats at X ±412, Z 255. Runner and centrepiece along Z 255; **centre X ±40 free** |
| `CHAND` | `{ x: 0, z: 255, y: 214 }` | the chandelier ring (radius 46) |
| `SIDEBOARD` | `{ x0: -240, x1: 240, y: 88, z0: 0, z1: 50 }` | top Y 88 |
| `DWIN` | right wall X 600, `{ z0: 90, z1: 420, y0: 96, y1: 248 }` | the dining window |
| `ARCH` | left wall X −600, `{ z0: 480, z1: 760, h: 236 }` | the archway to the hall and the living room |
| `BACKDOOR` | right wall, `{ z0: 700, z1: 830, h: 212 }` | |
| `CHALK`, `PANTRY` | left wall, `{ z0: 800, z1: 940, y0: 120, y1: 210 }`, `{ z0: 1010, z1: 1130, h: 212 }` | |
| Rug | X ±540, Z 70–450 | under the table |

### Seats (`K.SEATS`, `K.seatY`, `K.seated`)

`K.SEATS` is an array of twelve `{ i, x, z, y, side }` objects, ordered **screen-left to screen-right in the dining view** (which is +X to −X):

| Seat | i | x | z | side | Notes |
|---|---|---|---|---|---|
| Head | 0 | 412 | 214 | `'head'` | tall carver chair; the roomiest seat. **Best for a big character** (Neptune, Pearl, Dragon) |
| Far side | 1…10 | 315, 245, 175, 105, 35, −35, −105, −175, −245, −315 | 165 | `'far'` | 70 apart. Seats 5 and 6 (x ±35) are behind the centrepiece and turkey; put talkers elsewhere or move the props |
| Foot | 11 | −412 | 214 | `'foot'` | tall carver chair; **best for a big character** |

To seat a guest, draw a **standing** rig sunk into the chair so the table hides its legs:
```js
const K = LOCATIONS.family_kitchen, s = K.SEATS[3], [sx, sy, k] = P.p(s.x, K.seatY(177), s.z);
K.back(P, t, { ...o, splitZ: 150 });                       // everything behind the guests (chairs, wall)
K.seated(P, s, () => safadi(sx, sy, SAFADI_UNIT * k, pose));   // clipped above the table's far edge
K.front(P, t, { ...o, splitZ: 150 });                      // the table (and its settings, hook props) over them
```
- `K.seatY(h)` = `round(110 − 0.7·h)`: the Y offset for a rig `h` world units tall. It gives −14 for 177 (Safadi, Sami), −9 for 170 (Fester, Dragon, Dr. G), −8 for 168 (Housam), −23 for 190 (Neptune sitting), −16 for 180 (Pearl sitting), +16 for 135 (Jenna), +25 for 122 (Danny) and +26 for 120 (Alma). Kids get a positive offset, as if they're on a booster seat. Each seat's own `y` is the adult value (−14).
- `K.seated(P, seat, fn)` clips `fn()` to the area above the table's far edge (Y 76, Z 200), so no sunk leg or foot ever shows under the table, even with no cloth. It returns `fn()`'s result (the rig's anchors).
- Draw the guests **after** `back(splitZ: 150)` and **before** `front(splitZ: 150)`, sorted far to near by `P.depth(s.z)` (the end seats are nearer). `splitZ: 150` puts the chairs behind the guests and the table in front of them.
- **Checked** with all twelve rigs (seats 0…11: Neptune, Safadi, Roudaynah, Alma, Housam, Fester, Dragon, Jenna, Danny, Sami, Dr. G, Pearl): everyone reads as seated with head and shoulders over the table, at a sensible scale, with chair backs showing between them. Neptune's sitting pose is wide and leans screen-left, and his flipper overlaps the seat-1 guest a little: put a slim or small character in seat 1 (or 10 when he's at the foot). Dragon (wings) fits a middle seat but covers parts of both neighbours, so an end seat is best for him too.

## Spots (where characters go)

| Spot | (X, Y, Z) | Used for |
|---|---|---|
| Behind the island (`MARK`) | (0, 0, 1020) | cooking, waist-up over the island (kitchen view) |
| Behind the island · left / right | (−95 / 95, 0, 1020) | two cooks |
| In front of the island | (0, 0, 770) | |
| At the oven | (0, 0, 1160) | |
| At the sink | (−260, 0, 1170) | |
| At the fridge | (478, 0, 1130) | |
| By the back door | (520, 0, 765) | |
| Middle of the room | (0, 0, 580) | |
| In the archway | (−560, 0, 620) | arriving from the living room |
| In front of the table | (0, 0, 420) | serving (dining view) |
| Head / foot of the table (seats 0 / 11) | (±412, −14, 214) | seated (see Seats) |
| Table · seat 3 / seat 6 | (105 / −105, −14, 165) | seated |

## Camera presets

In the studio's location browser (click one, then **Copy camera**), or `node render.mjs --location=family_kitchen [--variant=Thanksgiving]`:
- **Kitchen · wide** `{ x: 0, y: 165, z: 420, f: 620, hy: 530, dir: 1 }`: establishing; the whole cooking end and the island
- **Kitchen · island medium** `{ x: 0, y: 140, z: 560, f: 1000, hy: 590, dir: 1 }`: cooks behind the island, waist up, with the range between them
- **Kitchen · island close** `{ x: 0, y: 140, z: 700, f: 1000, hy: 560, dir: 1 }`: the island top fills the bottom third; props on it read well
- **Kitchen · oven close-up** `{ x: 0, y: 72, z: 1080, f: 1000, hy: 590, dir: 1 }`: the oven door fills the frame (the turkey through the glass)
- **Kitchen · sink and window** `{ x: -220, y: 150, z: 850, f: 900, hy: 560, dir: 1 }`
- **Kitchen · fridge** `{ x: 380, y: 140, z: 860, f: 900, hy: 560, dir: 1 }`
- **Dining · table wide** `{ x: 0, y: 175, z: 820, f: 620, hy: 540, dir: -1 }`: the whole table, the window and the archway
- **Dining · table medium** `{ x: 0, y: 140, z: 820, f: 950, hy: 560, dir: -1 }`: all twelve guests, edge to edge
- **Dining · table close** `{ x: 0, y: 125, z: 620, f: 1000, hy: 580, dir: -1 }`: the middle eight seats and the centrepiece
- **Dining · head of table** `{ x: 330, y: 125, z: 560, f: 1000, hy: 600, dir: -1 }`: seats 0…5 (the head on the left)
- **Dining · foot of table** `{ x: -330, y: 125, z: 560, f: 1000, hy: 600, dir: -1 }`: seats 6…11 (the foot on the right)
- **Dining · archway** `{ x: -250, y: 150, z: 820, f: 700, hy: 560, dir: -1 }`: the archway on the right, for entrances

Keep dining cameras at Z ≤ 840 (the island and pendants start at Z 850) and kitchen cameras at Z ≥ 320 (the table ends at Z 310).

## API (`family_kitchen.js`)

```js
family_kitchen.back(P, t, o)    // walls, floor, ceiling and every piece farther than o.splitZ (default: everything)
family_kitchen.front(P, t, o)   // pieces nearer than o.splitZ (and farther than o.toZ, if given)
family_kitchen.seated(P, seat, fn) · .seatY(h) · .SEATS
family_kitchen.MARK, .BEHIND_ISLAND, .HW, .BACK, .FRONT, .CEIL, .RAIL, .COUNTER, .OVEN, .HOOD, .SINK, .KWIN, .FRIDGE, .ISLAND, .LAMPS,
               .TABLE, .CHAND, .SIDEBOARD, .DWIN, .ARCH, .BACKDOOR, .CHALK, .PANTRY, .props, .palette(o)
```
(`LOCATIONS.family_kitchen` is the same object, plus `variants`, `spots` and `cameras`.)

- **Depth order:** every piece (and every smoke puff and floor-mess item) is sorted by `P.depth`, so the same spots work in both views. For several characters at different depths, interleave `back` / `front` with `toZ`, as in the living room.
- **Props:** `family_kitchen.props` exports the small set props, drawn in sprite space (world units, y down, origin under the prop) with an outline width in px: `fruitBowl, toaster, knifeBlock, mixer(lw, col), jar(lw, col, h), utensils, pot(lw, r, col), plant(lw, t), cuttingBoard, bowl(lw, col), rollingPin, flourBag(lw, spilt), candle(lw, lit, t, i), glass, pumpkin(lw, r, col), cornucopia, gravyBoat, dish(lw, col), breadBasket, pan, lid, spoon, eggs`.
- `palette(o)` returns the colours for `o.time` (the evening tint is mixed in), if you want props to match the set's light.

## Turkey kit (`turkey.js`, global `TKY`)

One Thanksgiving turkey whose state carries the four-scene story, plus its serving pieces. Everything draws in **screen space** and is a pure function of its arguments (animated bits use `o.t`). The style matches the characters: flat saturated fills and plum ink outlines (`PAL.ink`, about 0.32 px per local unit, from 0.9 to 4 px).

**Conventions** for every function `fn(x, y, s, o)`:
- `(x, y)` is the screen point where the prop **rests**: its bottom centre on the surface.
- `s` is px per local unit. Local y points down, so negative is up.
- **World scale:** `TKY.WORLD = 1.25` world units per local unit, so `s = P.k(Z) * TKY.WORLD`. The golden bird is then about 50 × 33 world units, a big 20 lb turkey beside a 170-unit person.
- **Common options:** `alpha` (0..1), `rot` (radians, about the rest point), `squash` (+ taller/thinner, − flatter/wider; area-preserving), `t` (seconds, for animation).
- **Return value:** an object of screen-px anchors `[x, y]` (with rot and squash applied).

`TKY.SIZE = { turkey: [40, 26], platter: [60, 9], cloche: [50, 34], pan: [54, 14], stuffingBowl: [26, 14], pie: [30, 9], plate: [28, 5] }` (local width × height).

### `TKY.turkey(x, y, s, o)`

The bird is 40 × 26 local units at full size (body 39 wide; the drumstick bone tips reach x ±21.5, y −21; the top of the breast is at y −23.5). `o.state`:

| State | Size | Look | Extra options |
|---|---|---|---|
| `'frozen'` | 1.0 | **The festival prize.** A rock-hard, frosty ice-blue bird with frost bloom and twinkling crystals, sealed in shrink-wrap (glints and wrinkles) inside a white **net bag** gathered at a red clip and loop on top. An orange **"FROZEN TURKEY · 20 LB"** label sits on the breast and a red-and-gold **GRAND PRIZE** rosette with ribbon tails on the upper right. Cold mist rolls off the base | `wrap: false` (unwrapped but still frozen solid: pale blue-pink, frost patches, icicles off the wings, thighs and bone tips) · `frost` 0..1 (default 1: crystals and mist) |
| `'raw'` | 1.0 | thawed: pale pink, plump, goosebumps, a breastbone crease, pink bone knobs. It wobbles like jelly (a vertical squash at 9 rad/s) | `wobble` 0..1 (default .5; 0 = still) · `frost` 0..1 (default 0: a few lingering crystals) · `steam` |
| `'burnt'` | **0.6** | shrunken, lumpy, jet-black charcoal with grey cracks (two glowing ember cracks), ash flecks, a dull sheen, nine flickering **ember specks**, and curling black-grey smoke | `smoke` 0..1 (default .7) |
| `'fixed'` | **0.66** | **the cover-up**: the burnt bird under a too-shiny orange-brown **painted glaze** with visible brush strokes and bristle marks, harsh white highlights and sparkles. The right drumstick is re-attached with a **band-aid** and three **toothpicks**. Both drumsticks have paper frills. Heaps of **parsley, cranberries and orange slices** hide the base and the top | `wear` 0..1: the glaze flakes off in black patches, cracks show, the garnish slides down, and embers glow through above .6 · `drumstickOff: true`: the bandaged drumstick lies fallen on its side to the right (band-aid still on) and a black stump with a broken toothpick shows · `smoke`, `steam` (default 0) |
| `'carved'` | **0.8** | cut open: the black charcoal shell with glaze flakes, and a big cut face showing a **thick charcoal crust**, a thin grey ring and an **icy blue still-frozen centre** with frost streaks, crystals and an **ice cube** that sparkles. The left drumstick is carved away to a frozen stump. A spill of bright green **"healthy stuffing"** (curly kale, broccoli florets, quinoa) runs onto the platter, with a gold **wristwatch** (ticking hands) half-buried in it at the front right | `frost` 0..1 (default .3: mist) · `steam`, `smoke` (default 0) |
| `'golden'` | 1.0 | **the perfect turkey of the finale**: glossy golden-brown with a gradient, crispy skin marks, juicy white highlights, glistening drops and white paper frills | `steam` 0..1 (default .6: four rising curls) · `sparkle` 0..1 (default 0: seven twinkling gold-and-white stars around it) |

**Returns:**
```js
{ top, centre, center, cavity, drumstickL, drumstickR, base,   // screen [x, y]
  width, height,                                                // screen px of the full-size box × the state's size
  scale,                                                        // the state's size factor (1, .6, .66, .8)
  // 'frozen' with wrap:   label, rosette, knot (the clip on top of the net bag)
  // 'carved':             watch, iceCore, stuffing
  // 'fixed' + drumstickOff: drumstickR is the fallen drumstick's tip
}
```
Local anchor positions before scaling: `top` (0, −23.5) · `centre` (0, −11) · `cavity` (0, −12), or (0, −9) when carved · `drumstickL/R` (∓21.5, −21) · `label` (−2, −12) · `rosette` (11, −16) · `knot` (0, −27) · `watch` (9, 1.5) · `iceCore` (0, −10) · `stuffing` (−4, 1). Each is multiplied by the state's size, so the shrunken birds still rest on `(x, y)`.

To put the turkey on a platter or in a pan, pass the container's `top` anchor as the bird's rest point: `const A = TKY.platter(x, y, s); TKY.turkey(A.top[0], A.top[1], s, { state: 'golden', t })`.

### Serving pieces and food

| Function | Local size | Options | Returns |
|---|---|---|---|
| `TKY.platter(x, y, s, o)` | 60 × 9 | `garnish: true`: a ring of parsley, cranberries and orange slices along the front and sides of the rim | `top` (the serving surface, local (0, −5)), `rimL`, `rimR`, `base` |
| `TKY.cloche(x, y, s, o)` | 50 × 34 (dome 48 wide, rim at y 0, knob top y −34.6) | `lift` 0..1: the dome rises 34 units and tips back (−0.35 rad); draw it **after** the food | `knob`, `rim`, `top`, `base`, `lift` |
| `TKY.pan(x, y, s, o)` | 54 × 14 (handles out to ±30.5) | blue speckled-enamel roasting pan | `top` (where the bird rests inside, local (0, −8)), `rimL`, `rimR`, `base` |
| `TKY.stuffingBowl(x, y, s, o)` | 26 × 14 | `fill` 0..1 (default 1: the heap of kale, broccoli and quinoa; 0 = empty bowl) · `steam` 0..1 (0) | `top` (the top of the heap), `base` |
| `TKY.pie(x, y, s, o)` | 30 × 9 | `slices` 0..8 (default 8): slices left, with the cut face showing; whipped-cream swirls on each slice · `steam` | `top`, `base`, `slices` |
| `TKY.plate(x, y, s, o)` | 28 × 5 | `slice: true`: a grim wedge of the carved turkey (black crust, grey ring, blue frozen middle with frost) and a spoonful of green stuffing · `eaten` 0..1: the slice and stuffing shrink and crumbs appear | `top`, `base` |
| `TKY.stuffingHeap(x, y, s, o)` | `o.w` × `o.h` (20 × 5) | a loose heap of the green stuffing (for spills and spoonfuls); `seed` | `top` |

`TKY.C` exposes the kit's colours (`ink`, `gold`, `ice`, `char`, `glaze`, `kale`, …).

## Files

| File | What |
|---|---|
| `asset.js` | manifest: title, logline, files, docs (no reference art yet) |
| `family_kitchen.js` | the 3D set (both views), its props, seats, spots, camera presets and the six versions |
| `turkey.js` | the `TKY` turkey prop kit (loaded after the set) |
