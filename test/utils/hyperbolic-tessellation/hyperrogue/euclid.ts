/* eslint-disable @typescript-eslint/no-namespace */
namespace hr {
  export namespace euc {
    export type coord = [number, number, number]

    export const euzero: coord = [0, 0, 0]
    export const eutester: coord = [3, 7, 0]
    export const euzeroall: [coord, coord, coord] = [
      euzero,
      euzero,
      euzero,
    ]

    const main_axes: [coord, coord, coord] = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]

    export function get_shifttable(): Array<coord> {
      let shifttable: Array<coord>

      /* for portal spaces... */
      let g = geometry
      if (S7 === 6 && WDIM === 3) {
        g = gCubeTiling
      }

      switch (g) {
        case gCubeTiling:
        case gMengerSponge:
          shifttable = [
            [+1, 0, 0],
            [0, +1, 0],
            [0, 0, +1],
          ]
          break

        case gRhombic3:
        case gSierpinskiTet:
          shifttable = [
            [1, 1, 0],
            [1, 0, 1],
            [0, 1, 1],
            [0, 1, -1],
            [1, 0, -1],
            [1, -1, 0],
          ]
          break

        case gBitrunc3:
          shifttable = [
            [2, 0, 0],
            [0, 2, 0],
            [0, 0, 2],
            [1, 1, 1],
            [1, 1, -1],
            [1, -1, -1],
            [1, -1, 1],
          ]
          break

        case gEuclid:
        case gSierpinski3:
        case gSixFlake:
          shifttable = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 1, -1],
            [-1, 0, 0],
            [0, -1, 0],
            [1, -1, 0],
          ]
          break

        case gEuclidSquare:
        case gSierpinski4:
          shifttable = [
            [1, 0, 0],
            [0, 1, 0],
            [-1, 0, 0],
            [0, -1, 0],
          ]
          break

        default:
          throw new Error(
            'euc::get_shifttable() called in geometry that is not euclid3',
          )
      }

      // reverse everything
      const s = shifttable.length
      for (let i = 0; i < s; i++) {
        shifttable.push([
          -shifttable[i][0],
          -shifttable[i][1],
          -shifttable[i][2],
        ])
      }
      return shifttable
    }

    export function basic_canonicalize(x: coord): coord {
      const dummy: coord = euzero
      let mirr = false
      eu.canonicalize(x, dummy, Id, mirr)
      return x
    }

    export class torus_config {
      constructor(
        public user_axes: [coord, coord, coord],
        public twisted: number,
      ) {}
    }

    export class torus_config_full extends torus_config {
      optimal_axes: [coord, coord, coord]

      regular_axes: [coord, coord, coord]

      twisted_vec: gp.loc

      ortho_vec: gp.loc

      det: number

      infinite_dims: number

      inverse_axes: [coord, coord, coord]

      hash: Map<coord, number> = new Map()

      seq: Array<coord> = []

      index = 0

      reset() {
        this.index = 0
        this.hash.clear()
        this.seq = []
      }

      add(val: coord) {
        const cat = this.compute_cat(val)
        if (this.hash.has(cat)) {
          return
        }
        this.hash.set(cat, this.seq.length)
        this.seq.push(val)
      }

      get(x: coord): coord {
        const cat = this.compute_cat(x)
        const st = cubemap().shifttable
        while (!this.hash.has(cat)) {
          if (this.index === this.seq.length) {
            throw new Error()
          }
          const v = this.seq[this.index++]
          for (const s of st) {
            this.add([v[0] + s[0], v[1] + s[1], v[2] + s[2]])
          }
        }
        return this.seq[this.hash.get(cat)!]
      }

      compute_cat(coo: coord): coord {
        const cat: coord = euzero
        const T2 = this.inverse_axes
        for (let i = 0; i < 3; i++) {
          let val =
            T2[0][i] * coo[0] + T2[1][i] * coo[1] + T2[2][i] * coo[2]
          if (i < WDIM - this.infinite_dims) {
            val = gmod(val, this.det)
          }
          cat[i] += val * main_axes[i][i]
        }
        return cat
      }

      canonicalize(x: coord, d: coord, M: transmatrix, mirr: boolean) {
        // implementation omitted for brevity
      }
    }

    export let eu_input: torus_config
    export let eu_edit: torus_config
    export let eu: torus_config_full

    // rest of the code omitted for brevity
    export class hrmap_euclidean extends hrmap_standard {
      shifttable: Array<coord>

      tmatrix: Array<transmatrix>

      spacemap: Map<coord, heptagon> = new Map()

      ispacemap: Map<heptagon, coord> = new Map()

      camelot_center: cell | null = null

      eucdata: Map<gp.loc, cdata> = new Map()

      compute_tmatrix() {
        cgi.require_basics()
        this.shifttable = get_shifttable()
        this.tmatrix = new Array(S7)
        for (let i = 0; i < S7; i++) {
          this.tmatrix[i] = eumove(this.shifttable[i])
        }
      }

      on_dim_change() {
        this.compute_tmatrix()
      }

      toruscells: Array<cell> = []

      allcells() {
        if (closed_manifold && !disksize) {
          if (this.toruscells.length === 0) {
            const cl = new celllister(
              this.getOrigin().c7,
              1000,
              1000000,
              null,
            )
            this.toruscells = cl.lst
          }
          return this.toruscells
        }
        return super.allcells()
      }

      constructor() {
        super()
        this.compute_tmatrix()
        this.build_torus3(geometry)
        if (!valid_irr_torus()) {
          addMessage(XLAT('Error: period mismatch'))
          eu_input = irr.base_config
          this.build_torus3(geometry)
        }
      }

      getOrigin() {
        return this.get_at(euzero)
      }

      get_at(at: coord) {
        if (this.spacemap.has(at)) {
          return this.spacemap.get(at)!
        } else {
          const h = init_heptagon(S7)
          if (!IRREGULAR) {
            h.c7 = newCell(S7, h)
          } else {
            const m0 = this.shifttable[0]
            const dummy = Id
            let mirr: boolean
            const ati = at.slice() as coord
            irr.base_config.canonicalize(ati, m0, dummy, mirr)
            for (let spin = 0; spin < S7; spin++) {
              if (
                this.shifttable[spin][0] === m0[0] &&
                this.shifttable[spin][1] === m0[1] &&
                this.shifttable[spin][2] === m0[2]
              ) {
                irr.link_to_base(
                  h,
                  heptspin(
                    (irr.base as unknown as hrmap_euclidean).get_at(
                      ati,
                    ),
                    spin,
                    mirr,
                  ),
                )
                break
              }
            }
          }
          if (S7 !== 14) {
            h.zebraval = gmod(at[0] + at[1] * 2 + at[2] * 4, 5)
          } else {
            h.zebraval = at[0] & 1
          }
          this.spacemap.set(at, h)
          this.ispacemap.set(h, at)
          return h
        }
      }

      // rest of the code omitted for brevity
    }

    export function cubemap(): hrmap_euclidean {
      if (fake.in()) {
        return FPIU(cubemap())
      }
      return currentmap as hrmap_euclidean
    }

    export function eucmap(): hrmap_euclidean {
      return cubemap()
    }

    export function get_current_shifttable(): Array<coord> {
      return cubemap().shifttable
    }

    export function get_spacemap(): Map<coord, heptagon> {
      return cubemap().spacemap
    }

    export function get_ispacemap(): Map<heptagon, coord> {
      return cubemap().ispacemap
    }

    export function get_camelot_center(): cell | null {
      return cubemap().camelot_center
    }

    export function get_at(co: coord): heptagon {
      return cubemap().get_at(co)
    }

    export function new_map(): hrmap {
      return new hrmap_euclidean()
    }

    export function move_matrix(h: heptagon, i: number): transmatrix {
      return cubemap().adj(h, i)
    }

    export function pseudohept(c: cell): boolean {
      if (cgflags & qPORTALSPACE) {
        return false
      }
      const co = cubemap().ispacemap.get(c.master)!
      if (S7 === 12) {
        for (let i = 0; i < 3; i++) {
          if (co[i] & 1) {
            return false
          }
        }
      } else {
        for (let i = 0; i < 3; i++) {
          if (!(co[i] & 1)) {
            return false
          }
        }
      }
      return true
    }
    export function dist_alt(c: cell): number {
      if (WDIM === 2) {
        const v = full_coords2(c)
        return euclidAlt(v.first, v.second)
      }
      if (specialland === laCamelot) {
        return dist_relative(c) + roundTableRadius(c)
      }
      const v = cubemap().ispacemap.get(c.master)!
      if (S7 === 6) {
        return v[2]
      } else if (S7 === 12) {
        return (v[0] + v[1] + v[2]) / 2
      } else {
        return v[2] / 2
      }
    }

    export function get_emerald(c: cell): boolean {
      const v = cubemap().ispacemap.get(c.master)!
      let s0 = 0,
        s1 = 0
      for (let i = 0; i < 3; i++) {
        v[i] = gmod(v[i], 6)
        const d = Math.min(v[i], 6 - v[i])
        s0 += Math.min(v[i], 6 - v[i])
        s1 += 3 - d
      }
      if (s0 === s1) {
        console.log('equality')
      }
      return s0 > s1
    }

    function cellvalid(v: coord): boolean {
      if (S7 === 6) {
        return true
      }
      if (S7 === 12) {
        return (v[0] + v[1] + v[2]) % 2 === 0
      }
      if (S7 === 14) {
        return v[0] % 2 === v[1] % 2 && v[0] % 2 === v[2] % 2
      }
      return false
    }

    export function celldistance(v: coord): number {
      if (S7 === 6) {
        return Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[2])
      } else {
        for (let i = 0; i < 3; i++) {
          v[i] = Math.abs(v[i])
        }
        v.sort((a, b) => a - b)
        let dist = 0
        if (S7 === 12) {
          let d = v[1] - v[0]
          v[1] -= d
          v[2] -= d
          dist += d
          let m = Math.min(v[2] - v[0], v[0])
          dist += 2 * m
          v[0] -= m
          v[1] -= m
          v[2] -= m * 2
          if (v[0]) {
            dist += (v[0] + v[1] + v[2]) / 2
          } else {
            dist += v[2]
          }
        } else {
          dist = v[0] + (v[1] - v[0]) / 2 + (v[2] - v[0]) / 2
        }
        return dist
      }
    }

    export function celldistance(c1: cell, c2: cell): number {
      const cm = cubemap()
      if (GDIM === 2) {
        return dist(full_coords2(c1), full_coords2(c2))
      }
      return celldistance(
        basic_canonicalize([
          cm.ispacemap.get(c1.master)![0] -
            cm.ispacemap.get(c2.master)![0],
          cm.ispacemap.get(c1.master)![1] -
            cm.ispacemap.get(c2.master)![1],
          cm.ispacemap.get(c1.master)![2] -
            cm.ispacemap.get(c2.master)![2],
        ]),
      )
    }

    export function set_land(c: cell) {
      if (cgflags & qPORTALSPACE) {
        return
      }
      setland(c, specialland)
      const m = cubemap()
      const co = m.ispacemap.get(c.master)!

      let dv = 1
      if (geometry !== gCubeTiling) {
        dv = 2
      }

      let hash = 0
      for (let a = 0; a < 3; a++) {
        hash = 1317 * hash + co[a] / 4
      }

      set_euland3(
        c,
        co[0] * 120,
        co[1] * 120,
        (co[1] + co[2]) / dv,
        hash,
      )
    }

    export function dist_relative(c: cell): number {
      const m = cubemap()
      const cc = m.camelot_center
      const r = roundTableRadius(null)
      const start = m.gamestart()
      if (!cc) {
        m.camelot_center = start
        while (euc.celldistance(m.camelot_center, start) < r + 5) {
          m.camelot_center = m.camelot_center.cmove(
            hrand(m.camelot_center.type),
          )
        }
      }

      return euc.celldistance(m.camelot_center, c) - r
    }

    // quotient spaces

    function determinant(T: [coord, coord, coord]): number {
      let det = 0
      for (let i = 0; i < 3; i++) {
        det += T[0][i] * T[1][(i + 1) % 3] * T[2][(i + 2) % 3]
      }
      for (let i = 0; i < 3; i++) {
        det -= T[0][i] * T[1][(i + 2) % 3] * T[2][(i + 1) % 3]
      }
      return det
    }

    function scaled_inverse(
      T: [coord, coord, coord],
    ): [coord, coord, coord] {
      const T2: [coord, coord, coord] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          T2[j][i] =
            T[(i + 1) % 3][(j + 1) % 3] * T[(i + 2) % 3][(j + 2) % 3] -
            T[(i + 1) % 3][(j + 2) % 3] * T[(i + 2) % 3][(j + 1) % 3]
        }
      }
      return T2
    }

    export function torus3(
      x: number,
      y: number,
      z: number,
    ): torus_config {
      const T0: [coord, coord, coord] = [
        [x, 0, 0],
        [0, y, 0],
        [0, 0, z],
      ]
      return new torus_config(T0, 0)
    }

    export function clear_torus3(): torus_config {
      return new torus_config(euzeroall, 0)
    }

    export function valid_third_turn(
      m: [coord, coord, coord],
    ): boolean {
      if (m[0][2] !== -m[0][0] - m[0][1]) {
        return false
      }
      if (m[1][0] !== m[0][1]) {
        return false
      }
      if (m[1][1] !== m[0][2]) {
        return false
      }
      if (m[1][2] !== m[0][0]) {
        return false
      }
      if (m[2][0] !== m[2][1]) {
        return false
      }
      if (m[2][0] !== m[2][2]) {
        return false
      }
      return true
    }

    export function make_hantzsche_wendt(v: number): torus_config {
      const im: [coord, coord, coord] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]

      for (let i = 0; i < 3; i++) {
        im[i][i] = v
        im[i][(i + 1) % 3] = v
      }

      return new torus_config(im, 32)
    }

    export function valid_hantzsche_wendt(
      m: [coord, coord, coord],
    ): boolean {
      return (
        m[0][0] > 0 && m === make_hantzsche_wendt(m[0][0]).user_axes
      )
    }

    export function make_third_turn(
      a: number,
      b: number,
      c: number,
    ): torus_config {
      const T0: [coord, coord, coord] = [
        [a, b, -a - b],
        [b, -a - b, a],
        [c, c, c],
      ]
      return new torus_config(T0, 8)
    }

    export function make_quarter_turn(
      a: number,
      b: number,
      c: number,
    ): torus_config {
      const T0: [coord, coord, coord] = [
        [a, b, 0],
        [0, 0, 0],
        [c, 0, 0],
      ]
      return new torus_config(T0, 5)
    }

    export function prepare_torus3() {
      eu_edit = eu_input
    }

    export function show_fundamental() {
      initquickqueue()
      const M = ggmatrix(cwt.at)
      const h0 = M.mul(C0)
      const T_edit = eu_edit.user_axes
      const ha = M.T.mul(eumove(T_edit[0]).mul(C0).sub(C0)).div(2)
      const hb = M.T.mul(eumove(T_edit[1]).mul(C0).sub(C0)).div(2)
      if (WDIM === 3) {
        const hc = M.T.mul(eumove(T_edit[2]).mul(C0).sub(C0)).div(2)
        for (const d of [-1, 1]) {
          for (const e of [-1, 1]) {
            queueline(
              h0.add(ha.mul(d)).add(hb.mul(e)).sub(hc),
              h0.add(ha.mul(d)).add(hb.mul(e)).add(hc),
              0xffffffff,
            )
            queueline(
              h0.add(hb.mul(d)).add(hc.mul(e)).sub(ha),
              h0.add(hb.mul(d)).add(hc.mul(e)).add(ha),
              0xffffffff,
            )
            queueline(
              h0.add(hc.mul(d)).add(ha.mul(e)).sub(hb),
              h0.add(hc.mul(d)).add(ha.mul(e)).add(hb),
              0xffffffff,
            )
          }
        }
      } else {
        queueline(h0.add(ha).add(hb), h0.add(ha).sub(hb), 0xffffffff)
        queueline(h0.sub(ha).add(hb), h0.sub(ha).sub(hb), 0xffffffff)
        queueline(h0.add(ha).add(hb), h0.sub(ha).add(hb), 0xffffffff)
        queueline(h0.add(ha).sub(hb), h0.sub(ha).sub(hb), 0xffffffff)
      }

      quickqueue()
    }

    function on_periods(a: gp.loc, b: gp.loc): [coord, coord, coord] {
      const res: [coord, coord, coord] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]
      res[0][0] = a.first
      res[0][1] = a.second
      res[1][0] = b.first
      res[1][1] = b.second
      res[2][2] = 1
      return res
    }

    function single_row_torus(qty: number, dy: number): torus_config {
      return new torus_config(
        on_periods(
          { first: dy, second: -1 },
          { first: qty, second: 0 },
        ),
        0,
      )
    }

    function regular_torus(p: gp.loc): torus_config {
      return new torus_config(
        on_periods(p, { first: 0, second: 1 }.mul(p)),
        0,
      )
    }

    export function rectangular_torus(
      x: number,
      y: number,
      klein: boolean,
    ): torus_config {
      if (S3 === 3) {
        y /= 2
      }
      return new torus_config(
        on_periods(ort1().mul({ first: y, second: 0 }), {
          first: x,
          second: 0,
        }),
        klein ? 8 : 0,
      )
    }

    function torus_config_option(
      name: string,
      key: string,
      tc: torus_config,
    ) {
      dialog.addBoolItem(
        name,
        eu_edit.user_axes === tc.user_axes &&
          eu_edit.twisted === tc.twisted &&
          PURE,
        key,
      )
      dialog.add_action(() => {
        stop_game()
        eu_input = eu_edit = tc
        set_variation(eVariation.pure)
        start_game()
      })
    }

    export let quotient_size = 2

    export function show_torus3() {
      const dim = WDIM
      const T_edit = eu_edit.user_axes
      const twisted_edit = eu_edit.twisted
      cmode = sm.SIDE | sm.MAYDARK | sm.TORUSCONFIG
      gamescreen()
      dialog.init(XLAT('Euclidean quotient spaces'))

      for (let y = 0; y < dim + 1; y++) {
        dialog.addBreak(100)
      }

      dialog.addInfo(XLAT('columns specify periods'))
      dialog.addInfo(
        XLAT('(vectors you need to take to get back to start)'),
      )

      dialog.addBreak(50)

      show_fundamental()

      // rest of the code omitted for brevity
    }

    export function in_(): boolean {
      if (fake.in_()) {
        return FPIU(in_())
      }
      if (geometry === gCubeTiling && (reg3.cubes_reg3 || !PURE)) {
        return false
      }
      if (cgflags & qEXPERIMENTAL) {
        return false
      }
      return meuclid && standard_tiling()
    }

    export function in_dim(dim: number): boolean {
      return in_() && WDIM === dim
    }

    export function in_dim_s7(dim: number, s7: number): boolean {
      return in_dim(dim) && S7 === s7
    }
    export function euc2_coordinates(c: cell): gp.loc {
      if (euc.in()) {
        return euc.full_coords2(c)
      }
      const h = calc_relative_matrix(c, currentmap.gamestart(), C0).mul(
        C0,
      )
      return { first: Math.floor(h[0]), second: Math.floor(h[1]) }
    }

    export function get_cdata(): Map<gp.loc, cdata> {
      return eucmap().eucdata
    }

    export function eumove(co: coord): transmatrix {
      const q3 = Math.sqrt(3)
      if (WDIM === 3) {
        return eupush3(co[0], co[1], co[2])
      }
      let Mat = Id
      if (a4) {
        Mat[0][2] += co[0] * cgi.tessf
        Mat[1][2] += co[1] * cgi.tessf
      } else {
        Mat[0][2] += (co[0] + co[1] * 0.5) * cgi.tessf
        Mat[1][2] += ((co[1] * q3) / 2) * cgi.tessf
      }
      if (embedded_plane) {
        Mat = cgi.emb.base_to_actual(Mat)
      }
      return Mat
    }

    export function eumove_loc(co: gp.loc): transmatrix {
      return eumove([co.first, co.second, 0])
    }

    export function chiral(g: gp.loc): boolean {
      const x = g.first
      const y = g.second
      if (x === 0) {
        return false
      }
      if (y === 0) {
        return false
      }
      if (x + y === 0) {
        return false
      }
      if (x === y) {
        return false
      }
      if (S3 === 3 && y === -2 * x) {
        return false
      }
      if (S3 === 3 && x === -2 * y) {
        return false
      }
      return true
    }

    export function twist_once(coo: gp.loc) {
      coo = coo.sub(eu.twisted_vec.mul(gp.univ_param()))
      if (eu.twisted & 8) {
        const ort = ort1().mul(eu.twisted_vec).mul(gp.univ_param())
        const s = ort.mul(dscalar(coo, ort)).mul(2)
        const v = dscalar(ort, ort)
        s.first /= v
        s.second /= v
        coo = coo.sub(s)
      }
    }

    export function dist(
      sx: number,
      sy: number,
      reduce = true,
    ): number {
      const z0 = Math.abs(sx)
      const z1 = Math.abs(sy)
      if (a4 && BITRUNCATED) {
        return z0 === z1 && z0 > 0 && !reduce
          ? z0 + 1
          : Math.max(z0, z1)
      }
      if (a4) {
        return z0 + z1
      }
      const z2 = Math.abs(sx + sy)
      return Math.max(z0, z1, z2)
    }

    export function dist_loc(a: gp.loc, b: gp.loc): number {
      return dist(
        a.first - b.first,
        a.second - b.second,
        (a.first ^ a.second) & 1,
      )
    }

    export function cyldist(a: gp.loc, b: gp.loc): number {
      a = to_loc(basic_canonicalize([a.first, a.second, 0]))
      b = to_loc(basic_canonicalize([b.first, b.second, 0]))

      if (!quotient) {
        return dist_loc(a, b)
      }

      let best = 0
      for (let sa = 0; sa < 16; sa++) {
        let _a = a,
          _b = b
        if (sa & 1) {
          twist_once(_a)
        }
        if (sa & 2) {
          twist_once(_b)
        }
        if (sa & 4) {
          _a = _a.add(eu.ortho_vec.mul(gp.univ_param()))
        }
        if (sa & 8) {
          _b = _b.add(eu.ortho_vec.mul(gp.univ_param()))
        }
        const val = dist_loc(_a, _b)
        if (sa === 0 || val < best) {
          best = val
        }
      }

      return best
    }

    export function generate() {
      if (fake.in_()) {
        fake.generate()
        return
      }

      const v = euc.get_shifttable()

      const hsh = get_hsh()

      const cs = hsh.faces

      cgi.loop = 4
      cgi.schmid = 3

      cs.length = 0
      cs.length = S7

      if (S7 === 6) {
        cgi.adjcheck = 1
        cgi.face = 4
        for (let w = 0; w < 6; w++) {
          for (let a = 0; a < 4; a++) {
            const t = [0, 0, 0]
            t[0] = w >= 3 ? -1 : 1
            t[1] = [0, 3].includes(a) ? -1 : 1
            t[2] = [2, 3].includes(a) ? -1 : 1
            const x = w % 3
            const y = (x + 2) % 3
            const z = (y + 2) % 3
            cs[w].push(hpxy3(t[x] / 2, t[y] / 2, t[z] / 2))
          }
        }
      }

      if (S7 === 12) {
        cgi.adjcheck = Math.sqrt(2)
        cgi.face = 4
        for (let w = 0; w < 12; w++) {
          const co = v[w]
          const valid = []
          for (let c = 0; c < 3; c++) {
            if (co[c]) {
              valid.push(c)
            }
          }
          const third = 3 - valid[1] - valid[0]
          const v0 = cpush0(valid[0], co[valid[0]] > 0 ? 1 : -1)
          const v1 = cpush0(valid[1], co[valid[1]] > 0 ? 1 : -1)
          cs[w].push(v0)
          cs[w].push(
            v0.div(2).add(v1.div(2)).add(cpush0(third, 0.5)).sub(C0),
          )
          cs[w].push(v1)
          cs[w].push(
            v0.div(2).add(v1.div(2)).add(cpush0(third, -0.5)).sub(C0),
          )
        }
      }

      if (S7 === 14) {
        cgi.adjcheck = 2
        cgi.face = 4
        for (let w = 0; w < 14; w++) {
          if (w % 7 < 3) {
            const z = w >= 7 ? -1 : 1
            cs[w].push(
              cpush0(w % 7, z)
                .add(cpush0(((w % 7) + 1) % 3, 0.5))
                .sub(C0),
            )
            cs[w].push(
              cpush0(w % 7, z)
                .add(cpush0(((w % 7) + 2) % 3, 0.5))
                .sub(C0),
            )
            cs[w].push(
              cpush0(w % 7, z)
                .add(cpush0(((w % 7) + 1) % 3, -0.5))
                .sub(C0),
            )
            cs[w].push(
              cpush0(w % 7, z)
                .add(cpush0(((w % 7) + 2) % 3, -0.5))
                .sub(C0),
            )
          } else {
            const t = v[w]
            const x = t[0],
              y = t[1],
              z = t[2]
            for (const h of [
              hpxy3(x, y / 2, 0),
              hpxy3(x / 2, y, 0),
              hpxy3(0, y, z / 2),
              hpxy3(0, y / 2, z),
              hpxy3(x / 2, 0, z),
              hpxy3(x, 0, z / 2),
            ]) {
              cs[w].push(h)
            }
          }
        }
      }

      hsh.compute_hept()
    }

    export function in_(): boolean {
      if (fake.in_()) {
        return FPIU(in_())
      }
      if (geometry === gCubeTiling && (reg3.cubes_reg3 || !PURE)) {
        return false
      }
      if (cgflags & qEXPERIMENTAL) {
        return false
      }
      return meuclid && standard_tiling()
    }

    export function in_dim(dim: number): boolean {
      return in_() && WDIM === dim
    }

    export function in_dim_s7(dim: number, s7: number): boolean {
      return in_dim(dim) && S7 === s7
    }

    export function dscalar(e1: gp.loc, e2: gp.loc): number {
      return (
        2 * (e1.first * e2.first + e1.second * e2.second) +
        (S3 === 3 ? e1.first * e2.second + e2.first * e1.second : 0)
      )
    }

    export function dsquare(e: gp.loc): number {
      return dscalar(e, e) / 2
    }

    export function dcross(e1: gp.loc, e2: gp.loc): number {
      return e1.first * e2.second - e1.second * e2.first
    }

    export function full_coords2(c: cell): gp.loc {
      if (INVERSE) {
        const c1 = gp.get_mapped(c)
        return UIU(full_coords2(c1))
      }
      let ans = eucmap().ispacemap.get(c.master)!
      if (S7 === 4 && BITRUNCATED) {
        if (c === c.master.c7) {
          return to_loc(ans).mul({ first: 1, second: 1 })
        } else {
          let res = full_coords2(c.cmove(0)).add(
            full_coords2(c.cmove(4)),
          )
          res.first /= 2
          res.second /= 2
          return res
        }
      }
      if (BITRUNCATED) {
        return to_loc(ans)
          .mul({ first: 1, second: 1 })
          .add(
            c === c.master.c7
              ? { first: 0, second: 0 }
              : gp.eudir((c.c.spin(0) + 4) % 6),
          )
      }
      if (GOLDBERG) {
        const li = gp.get_local_info(c)
        let shift: gp.loc = { first: 0, second: 0 }
        if (li.first_dir >= 0) {
          shift = gp.eudir(li.last_dir).mul(li.relative)
        }
        return to_loc(ans).mul(gp.param).add(shift)
      }
      return to_loc(ans)
    }

    export function at(p: gp.loc): cell | null {
      const cw = new cellwalker(currentmap.gamestart())
      while (p.first--) {
        cw.add(revstep)
      }
      cw.add(1)
      while (p.second--) {
        cw.add(revstep)
      }
      return cw.at
    }

    export function to_coord(p: gp.loc): coord {
      return [p.first, p.second, 0]
    }

    export function sdxy(): gp.loc {
      return to_loc(eu.user_axes[1]).mul(gp.univ_param())
    }

    export function coord_display(
      V: shiftmatrix,
      c: cell,
    ): { first: boolean; second: string } {
      if (c !== c.master.c7) {
        return { first: false, second: '' }
      }
      const hx = eumove(main_axes[0]).mul(C0)
      const hy = eumove(main_axes[1]).mul(C0)
      const hz = WDIM === 2 ? C0 : eumove(main_axes[2]).mul(C0)
      const h = kz(
        inverse(build_matrix(hx, hy, hz, C03))
          .mul(inverse_shift(ggmatrix(cwt.at.master.c7), V))
          .mul(C0),
      )

      if (WDIM === 3) {
        return {
          first: true,
          second: fts(h[0]) + ',' + fts(h[1]) + ',' + fts(h[2]),
        }
      } else {
        return { first: true, second: fts(h[0]) + ',' + fts(h[1]) }
      }
    }

    export function to_loc(v: coord): gp.loc {
      return { first: v[0], second: v[1] }
    }
  }
}
