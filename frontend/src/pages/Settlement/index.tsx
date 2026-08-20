import { useState, useEffect } from "react";
import {
  IconHome,
  IconHeart,
  IconUsers,
  IconTwig,
  IconPlant2,
  IconTree,
  IconTrees,
  IconChristmasTree,
  IconMountain,
  IconOctahedron,
  IconDiamond,
  IconPick,
  IconRipple,
  IconRectangularPrism,
  IconDroplet,
  IconPoint,
} from "@tabler/icons-react";
import { mokpClamp, mokpGridDistance, mokpIndex2Coords, mokpCoords2Index, mokpSeed, mokpStr2Seed } from "@/utils";
import { useTranslation } from "@/services/translation";
import { MokpAlert, MokpCard, MokpData, MokpGrid } from "@/components/ui";
import { test } from "./test";

export default function MokpSettlement() {
  const { t } = useTranslation();

  const NODEDATA = {
    HOME: {
      bg: "var(--mokp-c-accent-muted)",
      borderColor: "var(--mokp-c-accent)",
      icon: <IconHome size={17} color="var(--mokp-c-accent)" />,
      move_modifier: 0.5,
      fertility_modifier: 0,
    },
    UNKNOWN: {
      bg: "var(--mokp-card-bg-above)",
      borderColor: "var(--mokp-card-divider)",
      icon: null,
      move_modifier: 0.5,
      fertility_modifier: 0,
    },
    SOIL_POOR: {
      bg: "#2a2a20",
      borderColor: "#2a2a20",
      icon: null,
      move_modifier: 0.82,
      fertility_modifier: 0.7,
    },
    SOIL_GRASS: {
      bg: "#233025",
      borderColor: "#233025",
      icon: null,
      move_modifier: 0.81,
      fertility_modifier: 1,
    },
    SOIL_FERTILE: {
      bg: "#2e3b2e",
      borderColor: "#2e3b2e",
      icon: null,
      move_modifier: 0.8,
      fertility_modifier: 1.4,
    },
    SAND: {
      bg: "#454130",
      borderColor: "#454130",
      icon: null,
      move_modifier: 0.7,
      fertility_modifier: 0.1,
    },
    CLAY: {
      bg: "#453730",
      borderColor: "#453730",
      icon: <IconRectangularPrism size={17} color="#896c5e" />,
      move_modifier: 0.4,
      fertility_modifier: 0,
    },
    FOREST_MIXEDWOOD: {
      bg: "var(--mokp-c-success-muted)",
      borderColor: "var(--mokp-c-success-subtle)",
      icon: <IconTrees size={17} color="var(--mokp-c-success)" />,
      move_modifier: 0.7,
      fertility_modifier: 1,
    },
    FOREST_SOFTWOOD: {
      bg: "var(--mokp-c-success-muted)",
      borderColor: "var(--mokp-c-success-subtle)",
      icon: <IconChristmasTree size={17} color="var(--mokp-c-success)" />,
      move_modifier: 0.71,
      fertility_modifier: 1,
    },
    FOREST_HARDWOOD: {
      bg: "var(--mokp-c-success-muted)",
      borderColor: "var(--mokp-c-success-subtle)",
      icon: <IconTree size={17} color="var(--mokp-c-success)" />,
      move_modifier: 0.72,
      fertility_modifier: 1,
    },
    MOUNTAIN: {
      bg: "var(--mokp-c-warning-muted)",
      borderColor: "var(--mokp-c-warning-subtle)",
      icon: <IconMountain size={17} color="var(--mokp-c-warning)" />,
      move_modifier: 0.1,
      fertility_modifier: 0,
    },
    ORE_IRON: {
      bg: "#37332f",
      borderColor: "#796956",
      icon: <IconPick size={17} color="#ada090" />,
      move_modifier: 0.1,
      fertility_modifier: 0,
    },
    ORE_GOLD: {
      bg: "#3c3224",
      borderColor: "#8d6636",
      icon: <IconDiamond size={17} color="#f7b05a" />,
      move_modifier: 0.1,
      fertility_modifier: 0,
    },
    RIVER: {
      bg: "var(--mokp-c-info-muted)",
      borderColor: "var(--mokp-c-info-subtle)",
      icon: <IconRipple size={17} color="var(--mokp-c-info)" />,
      move_modifier: 0.2,
      fertility_modifier: 0,
    },
    MARSH: {
      bg: "#273b3a",
      borderColor: "#385553",
      icon: <IconPlant2 size={15} color="#56817e" />,
      move_modifier: 0.4,
      fertility_modifier: 0,
    },
  };

  const TILESTOTAL = 27 * 19; // 567; // 27 x 21
  const TILESHALF = Math.floor(TILESTOTAL / 2);

  const MAPWIDTH = 27;
  const MAPHEIGHT = 19;
  const DIRS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]; // 4-way

  const [tiles, setTiles] = useState([...Array.from({ length: TILESTOTAL }, () => ({ node: "UNKNOWN" }))]);
  const [tileFog, setTileFog] = useState(() => {
    const r = Array(TILESTOTAL).fill(true);

    const [col, row] = mokpIndex2Coords(TILESHALF, MAPWIDTH);

    r[TILESHALF] = false; // home

    if (row > 0) r[TILESHALF - MAPWIDTH] = false; // north
    if (row < MAPHEIGHT - 1) r[TILESHALF + MAPWIDTH] = false; // south
    if (col > 0) r[TILESHALF - 1] = false; // west
    if (col < MAPWIDTH - 1) r[TILESHALF + 1] = false; // east

    return [];//r;
  });
  const [tilesMask, setTilesMask] = useState([]);
  const [tileHovered, setTileHovered] = useState(null);
  const [tileSelected, setTileSelected] = useState(TILESHALF);
  const [tilePath, setTilePath] = useState([]);

  const handleChangeTile = (index, value) => {
    setTiles((prev) => prev.map((t, i) => (i === index ? value : t)));
  };

  const handleTileClick = (index, node) => {
    if (index === TILESHALF) return;
    //
  };

  function enterCost(index) {
    const node = tiles[index].node;
    const speed = NODEDATA[node].move_modifier;
    return 1 / speed;
  }

  function findPath(start, goal) {
    const dist = Array(MAPWIDTH * MAPHEIGHT).fill(Infinity);
    const prev = Array(MAPWIDTH * MAPHEIGHT).fill(null);
    dist[start] = 0;

    const open = [start];

    while (open.length) {
      let best = 0;
      for (let k = 1; k < open.length; k++) {
        if (dist[open[k]] < dist[open[best]]) best = k;
      }
      const i = open.splice(best, 1)[0];
      if (i === goal) break;

      const c = i % MAPWIDTH;
      const r = Math.floor(i / MAPWIDTH);
      for (const [dc, dr] of DIRS) {
        const nc = c + dc;
        const nr = r + dr;
        if (nc < 0 || nc >= MAPWIDTH || nr < 0 || nr >= MAPHEIGHT) continue;
        const j = nr * MAPWIDTH + nc;
        const intoFog = tileFog[j];
        // cannot walk through fog; can only step onto it if it is the destination
        if (intoFog && j !== goal) continue;
        const next = dist[i] + enterCost(j);
        if (next < dist[j]) {
          dist[j] = next;
          prev[j] = i;
          if (!open.includes(j)) open.push(j);
        }
      }
    }

    if (dist[goal] === Infinity) return null;

    const path = [];
    for (let i = goal; i !== null; i = prev[i]) path.push(i);
    path.reverse();
    return { path, time: dist[goal] };
  }

  /**
   * Generates a realistic tile map: a diagonal mountain range, a river
   * (with an optional lake) that tends to originate near the mountains,
   * scattered forest clusters, open "clear" ground, and a home base fixed
   * at the exact center of the grid.
   *
   * @param {number} width
   * @param {number} height
   * @param {string|number} seed
   * @returns {{grid: string[][], flat: {node:string}[], home:{row:number,col:number}}}
   */
  const generateMap = (width = MAPWIDTH, height = MAPHEIGHT, seed = "mokapi") => {
    seed = Math.floor(Math.random() * 1e9);
    const rng = mokpSeed(typeof seed === "string" ? mokpStr2Seed(seed) : seed >>> 0);
    const grid = Array.from({ length: height }, () => Array(width).fill("UNKNOWN"));
    const home = { row: Math.floor(height / 2), col: Math.floor(width / 2) };

    const setIfClear = (r, c, type) => {
      if (r < 0 || r >= height || c < 0 || c >= width) return; // outside map
      if (mokpGridDistance(r, c, home.row, home.col) < 2.2) return; // keep the hearth clear
      if (grid[r][c] === "UNKNOWN") grid[r][c] = type;
    };

    // ---- Mountain range: a smooth ridge, randomized in both orientation and
    //      drift direction so it can run top-to-bottom, left-to-right, or
    //      wander either way diagonally — never a fixed corner-to-corner line.
    {
      // vertical: one map row per step, ridge drifts across columns (tall range)
      // horizontal: one map column per step, ridge drifts across rows (wide range)
      const orientation = rng() < 0.5 ? "vertical" : "horizontal";
      const primaryLen = orientation === "vertical" ? height : width;
      const crossLen = orientation === "vertical" ? width : height;

      let cross = crossLen * (0.15 + rng() * 0.7); // start anywhere across the map, not just one side
      let drift = (rng() - 0.5) * 0.6;
      const biasSign = rng() < 0.5 ? 1 : -1; // which way the range leans
      const biasStrength = 0.15 + rng() * 0.4;

      for (let p = 0; p < primaryLen; p++) {
        drift += (rng() - 0.5) * 0.9 + biasSign * biasStrength * 0.12;
        drift = mokpClamp(drift, -1.6, 1.6);
        cross = mokpClamp(cross + drift * 0.55, 2, crossLen - 3);
        const w = 3 + Math.floor(rng() * 2.4); // range width 3-5
        const start = Math.round(cross - w / 2);
        for (let cc = start; cc < start + w; cc++) {
          if (orientation === "vertical") setIfClear(p, cc, "MOUNTAIN");
          else setIfClear(cc, p, "MOUNTAIN");
        }
      }
    }

    // ---- ORE: a handful of rare resource tiles, mountain tiles only ----
    {
      const mountainTiles = [];
      for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
          if (grid[r][c] === "MOUNTAIN" && mokpGridDistance(r, c, home.row, home.col) >= 2.2) {
            mountainTiles.push({ r, c });
          }
        }
      }
      const depositCount = Math.min(1 + Math.floor(rng() * 6), mountainTiles.length); // 1 to 6
      for (let i = mountainTiles.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [mountainTiles[i], mountainTiles[j]] = [mountainTiles[j], mountainTiles[i]];
      }
      for (let i = 0; i < depositCount; i++) {
        const { r, c } = mountainTiles[i];
        if (rng() < 0.22) grid[r][c] = "ORE_GOLD";
        else grid[r][c] = "ORE_IRON";
      }
    }

    // ---- RIVER: originates near the mountains, meanders to the far edge ----
    const riverPath = [];
    {
      // find a mountain tile closest to the top edge to start the river near it,
      // regardless of which way the range ended up running
      let riverStartCol = null,
        bestRow = Infinity;
      for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
          if (grid[r][c] === "MOUNTAIN" && r < bestRow) {
            bestRow = r;
            riverStartCol = c;
          }
        }
        if (riverStartCol !== null && bestRow === 0) break;
      }
      if (riverStartCol === null) riverStartCol = Math.floor(width * (0.2 + rng() * 0.6));
      let col = mokpClamp(riverStartCol + (rng() - 0.5) * 4, 1, width - 2);
      let drift = rng() - 0.5;
      for (let row = 0; row < height; row++) {
        drift += (rng() - 0.5) * 1.4;
        drift = mokpClamp(drift, -2, 2);
        col = mokpClamp(col + drift * 0.5, 1, width - 2);
        const c = Math.round(col);
        riverPath.push({ row, col: c });
        setIfClear(row, c, "RIVER");
        if (rng() < 0.22) setIfClear(row, c + (rng() < 0.5 ? -1 : 1), "RIVER");
        else if (rng() < 0.33) setIfClear(row, c + (rng() < 0.5 ? -1 : 1), "SAND");
        else if (rng() < 0.22) setIfClear(row, c + (rng() < 0.5 ? -1 : 1), "CLAY");
      }

      // ---- 2b. Lake: a round blob widening the river partway along its course ----
      if (rng() < 0.85) {
        const lp = riverPath[Math.floor(height * (0.35 + rng() * 0.35))];
        const radius = 1.6 + rng() * 1.2;
        for (let dr = -3; dr <= 3; dr++) {
          for (let dc = -3; dc <= 3; dc++) {
            if (Math.hypot(dr, dc) <= radius && rng() < 0.85) {
              setIfClear(lp.row + dr, lp.col + dc, "RIVER");
            }
          }
        }
      }
    }

    // ---- FOREST: cellular-automaton blobs seeded across open ground ----
    {
      const seedCount = Math.round((width * height) / 44);
      for (let i = 0; i < seedCount; i++) {
        let sr,
          sc,
          tries = 0;
        do {
          sr = Math.floor(rng() * height);
          sc = Math.floor(rng() * width);
          tries++;
        } while (grid[sr][sc] !== "UNKNOWN" && tries < 40);
        if (grid[sr][sc] !== "UNKNOWN") continue;

        const blobSize = 4 + Math.floor(rng() * 10);
        const frontier = [{ r: sr, c: sc }];
        let placed = 0;
        while (frontier.length && placed < blobSize) {
          const idx = Math.floor(rng() * frontier.length);
          const { r, c } = frontier.splice(idx, 1)[0];
          if (r < 0 || r >= height || c < 0 || c >= width) continue;
          if (grid[r][c] !== "UNKNOWN") continue;
          if (mokpGridDistance(r, c, home.row, home.col) < 2.2) continue;
          grid[r][c] = "FOREST_MIXEDWOOD";
          placed++;
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ].forEach(([dr, dc]) => {
            if (rng() < 0.75) frontier.push({ r: r + dr, c: c + dc });
          });
        }
      }
    }

    // ---- FOREST: cellular-automaton blobs seeded across open ground ----
    {
      const seedCount = Math.round((width * height) / 99);
      for (let i = 0; i < seedCount; i++) {
        let sr,
          sc,
          tries = 0;
        do {
          sr = Math.floor(rng() * height);
          sc = Math.floor(rng() * width);
          tries++;
        } while (grid[sr][sc] !== "UNKNOWN" && tries < 40);
        if (grid[sr][sc] !== "UNKNOWN") continue;
        if (sr > 4) continue;

        const blobSize = 4 + Math.floor(rng() * 10);
        const frontier = [{ r: sr, c: sc }];
        let placed = 0;
        while (frontier.length && placed < blobSize) {
          const idx = Math.floor(rng() * frontier.length);
          const { r, c } = frontier.splice(idx, 1)[0];
          if (r < 0 || r >= height || c < 0 || c >= width) continue;
          if (grid[r][c] !== "UNKNOWN") continue;
          if (mokpGridDistance(r, c, home.row, home.col) < 2.2) continue;
          if (r > 4) continue;
          grid[r][c] = "FOREST_SOFTWOOD";
          placed++;
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ].forEach(([dr, dc]) => {
            if (rng() < 0.55) frontier.push({ r: r + dr, c: c + dc });
          });
        }
      }
    }

    // ---- FOREST: cellular-automaton blobs seeded across open ground ----
    {
      const seedCount = Math.round((width * height) / 11);
      for (let i = 0; i < seedCount; i++) {
        let sr,
          sc,
          tries = 0;
        do {
          sr = Math.floor(rng() * height);
          sc = Math.floor(rng() * width);
          tries++;
        } while (grid[sr][sc] !== "UNKNOWN" && tries < 40);
        if (grid[sr][sc] !== "UNKNOWN") continue;
        if (sr < height - 4) continue;

        const blobSize = 4 + Math.floor(rng() * 10);
        const frontier = [{ r: sr, c: sc }];
        let placed = 0;
        while (frontier.length && placed < blobSize) {
          const idx = Math.floor(rng() * frontier.length);
          const { r, c } = frontier.splice(idx, 1)[0];
          if (r < 0 || r >= height || c < 0 || c >= width) continue;
          if (grid[r][c] !== "UNKNOWN") continue;
          if (mokpGridDistance(r, c, home.row, home.col) < 2.2) continue;
          if (r < height - 4) continue;
          grid[r][c] = "FOREST_HARDWOOD";
          placed++;
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ].forEach(([dr, dc]) => {
            if (rng() < 0.55) frontier.push({ r: r + dr, c: c + dc });
          });
        }
      }
    }

    // ---- SOIL: cellular-automaton blobs seeded across open ground ----
    {
      const seed2Count = Math.round((width * height) / 22);
      for (let i = 0; i < seed2Count; i++) {
        let sr,
          sc,
          tries = 0;
        do {
          sr = Math.floor(rng() * height);
          sc = Math.floor(rng() * width);
          tries++;
        } while (grid[sr][sc] !== "UNKNOWN" && tries < 40);
        if (grid[sr][sc] !== "UNKNOWN") continue;

        const blobSize = 4 + Math.floor(rng() * 10);
        const frontier = [{ r: sr, c: sc }];
        let placed = 0;
        while (frontier.length && placed < blobSize) {
          const idx = Math.floor(rng() * frontier.length);
          const { r, c } = frontier.splice(idx, 1)[0];
          if (r < 0 || r >= height || c < 0 || c >= width) continue;
          if (grid[r][c] !== "UNKNOWN") continue;
          // if (mokpGridDistance(r, c, home.row, home.col) < 2.2) continue;
          grid[r][c] = "SOIL_GRASS";
          placed++;
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ].forEach(([dr, dc]) => {
            if (rng() < 0.55) frontier.push({ r: r + dr, c: c + dc });
          });
        }
      }
    }

    // ---- MARSH: cellular-automaton blobs seeded across open ground ----
    {
      const seedCount = Math.round((width * height) / 99);
      for (let i = 0; i < seedCount; i++) {
        let sr,
          sc,
          tries = 0;
        do {
          sr = Math.floor(rng() * height);
          sc = Math.floor(rng() * width);
          tries++;
        } while (grid[sr][sc] !== "UNKNOWN" && tries < 40);
        if (grid[sr][sc] !== "UNKNOWN") continue;

        const blobSize = 4 + Math.floor(rng() * 10);
        const frontier = [{ r: sr, c: sc }];
        let placed = 0;
        while (frontier.length && placed < blobSize) {
          const idx = Math.floor(rng() * frontier.length);
          const { r, c } = frontier.splice(idx, 1)[0];
          if (r < 0 || r >= height || c < 0 || c >= width) continue;
          if (grid[r][c] !== "UNKNOWN") continue;
          if (mokpGridDistance(r, c, home.row, home.col) < 2.2) continue;
          if (rng() < 0.75) grid[r][c] = "MARSH";
          else grid[r][c] = "RIVER";
          placed++;
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ].forEach(([dr, dc]) => {
            if (rng() < 0.55) frontier.push({ r: r + dr, c: c + dc });
          });
        }
      }
    }

    // ---- FERTILE SOIL: cellular-automaton blobs seeded across open ground ----
    {
      const seedCount = Math.round((width * height) / 33);
      for (let i = 0; i < seedCount; i++) {
        let sr,
          sc,
          tries = 0;
        do {
          sr = Math.floor(rng() * height);
          sc = Math.floor(rng() * width);
          tries++;
        } while (grid[sr][sc] !== "UNKNOWN" && tries < 40);
        if (grid[sr][sc] !== "UNKNOWN") continue;

        const blobSize = 4 + Math.floor(rng() * 10);
        const frontier = [{ r: sr, c: sc }];
        let placed = 0;
        while (frontier.length && placed < blobSize) {
          const idx = Math.floor(rng() * frontier.length);
          const { r, c } = frontier.splice(idx, 1)[0];
          if (r < 0 || r >= height || c < 0 || c >= width) continue;
          if (grid[r][c] !== "UNKNOWN") continue;
          grid[r][c] = "SOIL_FERTILE";
          placed++;
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ].forEach(([dr, dc]) => {
            if (rng() < 0.55) frontier.push({ r: r + dr, c: c + dc });
          });
        }
      }
    }

    {
      for (let r = 0; r < height; r++)
        for (let c = 0; c < width; c++) {
          if (r < 0 || r >= height || c < 0 || c >= width) continue;
          if (grid[r][c] !== "UNKNOWN") continue;
          grid[r][c] = "SOIL_POOR";
        }
    }

    // ---- Home base, fixed dead-center, placed last so nothing overwrites it ----
    grid[home.row][home.col] = "HOME";

    const flat = [];
    const tileCounts = {};
    const tilePercents = [];
    for (let r = 0; r < height; r++)
      for (let c = 0; c < width; c++) {
        flat.push({ node: grid[r][c] });
        if (grid[r][c] === "HOME") continue;
        if (tileCounts[grid[r][c]]) tileCounts[grid[r][c]]++;
        else tileCounts[grid[r][c]] = 1;
      }

    for (const [key, value] of Object.entries(tileCounts)) {
      tilePercents.push({ node: key, percent: Math.floor((value * 100) / (width * height)) });
    }

    setTilesMask(tilePercents);
    setTiles(flat);
    return { grid, flat, home };
  };
  /* ===END=== */

  const resetTiles = () => {
    setTiles(() => Array.from({ length: TILESTOTAL }, () => ({ node: "UNKNOWN" })));
    handleChangeTile(TILESHALF, { node: "HOME" });
    setTiles(test);
  };

  useEffect(() => {
    generateMap();

    return () => {
      setTiles(() => Array.from({ length: TILESTOTAL }, () => ({ node: "UNKNOWN" })));
    };
  }, []);

  return (
    <MokpGrid>
      <h1 style={{ fontFamily: "Quicksand", fontSize: "2rem", fontWeight: 500 }}>Oykus-kotan</h1>
      <MokpGrid.Row wrap>
        <MokpGrid.Col col="66">
          <MokpCard>
            <div style={{ maxWidth: "100%", overflow: "visible" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", minWidth: 891 }}>
                {tiles.map((x, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setTileHovered(i)}
                    onMouseLeave={() => setTileHovered(null)}
                    onClick={() => {
                      if (tileSelected === i) {
                        setTileSelected(256);
                        setTilePath([]);
                      } else {
                        setTileSelected(i);
                        const path = findPath(256, i);
                        setTilePath(path?.path);
                      }
                    }}
                    style={{
                      backgroundColor: tileFog[i] ? NODEDATA["UNKNOWN"].bg : NODEDATA[x.node].bg,
                      borderColor: tileFog[i] ? NODEDATA["UNKNOWN"].borderColor : NODEDATA[x.node].borderColor,
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderRadius: 3,
                      boxShadow: "0 0 2px rgba(0, 0, 0, 0.5)",
                      outline: tileHovered === i || tileSelected === i ? "1px solid var(--mokp-c-accent)" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 29,
                      height: 29,
                      cursor: "pointer",
                      transform: tileHovered === i ? "scale(1.2)" : null,
                    }}
                  >
                    {tilePath?.includes(i) ? <IconPoint /> : tileFog[i] ? null : NODEDATA[x.node].icon}
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <section>
              <MokpAlert icon={<span>AA</span>}>
                {tileHovered !== null && !tileFog[tileHovered]
                  ? JSON.stringify({
                      id: tileHovered,
                      coord: `${(tileHovered % 27) + 1}, ${Math.floor(tileHovered / 27) + 1}`,
                      ...tiles[tileHovered],
                    })
                  : tileSelected !== null && !tileFog[tileSelected]
                    ? JSON.stringify({
                        id: tileSelected,
                        coord: `${(tileSelected % 27) + 1}, ${Math.floor(tileSelected / 27) + 1}`,
                        ...tiles[tileSelected],
                      })
                    : "Zone inexplorée"}
                {tileSelected !== null && tileFog[tileSelected] && tilePath?.includes(tileSelected) ? (
                  <button>Explorer</button>
                ) : null}
              </MokpAlert>
            </section>
            <section>
              <MokpAlert showIcon={false}>
                {`${Math.round((tileFog.filter((fog) => !fog).length / tileFog.length) * 100)}% exploré`}
              </MokpAlert>
            </section>
          </MokpCard>
        </MokpGrid.Col>
        <MokpGrid.Col col="33">
          <MokpCard style={{ marginBottom: 16 }}>
            <h2>Aperçu</h2>
            <div
              style={{
                borderRadius: 6,
                fontSize: 0,
                lineHeight: 0,
                overflow: "hidden",
                display: "flex",
                width: "120px",
                margin: "10px 0",
              }}
            >
              {tilesMask.map((m, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: NODEDATA[m.node].bg,
                    overflow: "hidden",
                    display: "block",
                    flex: `1 1 ${m.percent}%`,
                    width: `${m.percent}%`,
                    height: 8,
                  }}
                ></span>
              ))}
            </div>
            <hr />
            <section>
              <MokpData>
                <MokpData.Key icon={<IconUsers size={16} />}>Population</MokpData.Key>
                <MokpData.Value>100/150</MokpData.Value>
                <MokpData.Key icon={<IconHeart size={16} />}>Moral</MokpData.Key>
                <MokpData.Value>
                  <span style={{ color: "var(--mokp-c-success)" }}>75%</span>
                </MokpData.Value>
              </MokpData>
              <button onClick={() => generateMap()}>Generate</button>
            </section>
          </MokpCard>
          <MokpCard>
            <h2>Alertes</h2>
            <section>
              <MokpAlert
                ghost
                variant="error"
                title="Sasha is injured"
                message="Take care to prevent loss."
                icon={<IconDroplet />}
              />
            </section>
          </MokpCard>
        </MokpGrid.Col>
      </MokpGrid.Row>
    </MokpGrid>
  );
}
