// https://github.com/andbloch/geoopt/blob/f57fc2f6de1f5943a1e76aacb556d85b52c68b58/geoopt/manifolds/stereographic/math.py
// https://github.com/andbloch/geoopt/blob/f57fc2f6de1f5943a1e76aacb556d85b52c68b58/geoopt/manifolds/stereographic/__init__.py
// https://github.com/pytorch/pytorch/blob/main/torch/_tensor.py
// https://github.com/luangm/tensor4ts
// https://github.com/facebookresearch/shumai/tree/main/shumai/tensor
// https://github.com/Hoff97/tensorjs/tree/master/lib/tensor

import * as torch from 'torch'

// NUMERICAL PRECISION ##########################################################

const MIN_NORM = 1e-15
const BALL_EPS = {
  float32: 4e-3,
  float64: 1e-5,
}

// TRIGONOMETRIC FUNCTIONS ######################################################

function tanh(x: torch.Tensor) {
  return x.clamp(-15, 15).tanh()
}

class Artanh extends torch.autograd.Function {
  static forward(ctx: torch.autograd.Context, x: torch.Tensor) {
    x = x.clamp(-1 + 1e-15, 1 - 1e-15)
    ctx.save_for_backward(x)
    const dtype = x.dtype
    x = x.toType(torch.double)
    const res = torch.log1p(x).sub(torch.log1p(-x)).mul(0.5)
    return res.toType(dtype)
  }

  static backward(
    ctx: torch.autograd.Context,
    grad_output: torch.Tensor,
  ) {
    const [input] = ctx.saved_tensors
    return grad_output.div(1 - input.pow(2))
  }
}

class Arsinh extends torch.autograd.Function {
  static forward(ctx: torch.autograd.Context, x: torch.Tensor) {
    ctx.save_for_backward(x)
    const z = x.toType(torch.double)
    const res = z.add(torch.sqrt(torch.ones_like(z).add(z.pow(2))))
    return res.clampMin(MIN_NORM).log().toType(x.dtype)
  }

  static backward(
    ctx: torch.autograd.Context,
    grad_output: torch.Tensor,
  ) {
    const [input] = ctx.saved_tensors
    return grad_output.div(
      torch.ones_like(input).add(input.pow(2)).sqrt(),
    )
  }
}

function artanh(x: torch.Tensor) {
  return Artanh.apply(x)
}

function arsinh(x: torch.Tensor) {
  return Arsinh.apply(x)
}

// CURVATURE-PARAMETRIZED TRIGONOMETRIC FUNCTIONS ###############################

function tan_K(x: torch.Tensor, K: number) {
  if (K <= 0) {
    const sqrt_minus_K = torch.sqrt(-K)
    return tanh(sqrt_minus_K.mul(x)).div(sqrt_minus_K)
  } else {
    const sqrt_K = torch.sqrt(K)
    return torch.tan(sqrt_K.mul(x)).div(sqrt_K)
  }
}

function arctan_K(x: torch.Tensor, K: number) {
  if (K <= 0) {
    const sqrt_minus_K = torch.sqrt(-K)
    return artanh(sqrt_minus_K.mul(x)).div(sqrt_minus_K)
  } else {
    const sqrt_K = torch.sqrt(K)
    return torch.atan(sqrt_K.mul(x)).div(sqrt_K)
  }
}

function arcsin_K(x: torch.Tensor, K: number) {
  if (K <= 0) {
    const sqrt_minus_K = torch.sqrt(-K)
    return arsinh(sqrt_minus_K.mul(x)).div(sqrt_minus_K)
  } else {
    const sqrt_K = torch.sqrt(K)
    return torch.asin(sqrt_K.mul(x)).div(sqrt_K)
  }
}

// GYROVECTOR SPACE MATH ########################################################

function project(
  x: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
  eps: number | null = null,
) {
  return _project(x, K, dim, eps)
}

function _project(
  x: torch.Tensor,
  K: number,
  dim: number = -1,
  eps: number | null = null,
) {
  const K_smaller_zero = K < 0
  const num_smaller_zero = K_smaller_zero.sum()
  if (num_smaller_zero > 0) {
    const norm = x.norm({ dim, keepdim: true, p: 2 }).clampMin(MIN_NORM)
    if (eps === null) {
      eps = BALL_EPS[x.dtype]
    }
    const maxnorm = (1 - eps) / torch.abs(K).sqrt()
    const cond = norm.gt(maxnorm).logicalAnd(K_smaller_zero)
    const projected = x.div(norm).mul(maxnorm)
    return torch.where(cond, projected, x)
  } else {
    return x
  }
}

function gamma_x(
  x: torch.Tensor,
  K: number = 1.0,
  keepdim: boolean = false,
  dim: number = -1,
) {
  return _gamma_x(x, K, keepdim, dim)
}

function _gamma_x(
  x: torch.Tensor,
  K: number,
  keepdim: boolean = false,
  dim: number = -1,
) {
  const x_norm = x.pow(2).sum({ dim, keepdim })
  return torch.reciprocal(
    torch
      .sqrt(torch.ones_like(x_norm).add(K.mul(x_norm)))
      .clampMin(MIN_NORM),
  )
}

function lambda_x(
  x: torch.Tensor,
  K: number = 1.0,
  keepdim: boolean = false,
  dim: number = -1,
) {
  return _lambda_x(x, K, keepdim, dim)
}

function _lambda_x(
  x: torch.Tensor,
  K: number,
  keepdim: boolean = false,
  dim: number = -1,
) {
  return torch
    .reciprocal(
      torch
        .ones_like(x)
        .add(K.mul(x.pow(2).sum({ dim, keepdim })))
        .clampMin(MIN_NORM),
    )
    .mul(2)
}

function inner(
  x: torch.Tensor,
  u: torch.Tensor,
  v: torch.Tensor,
  K: number = 1.0,
  keepdim: boolean = false,
  dim: number = -1,
) {
  return _inner(x, u, v, K, keepdim, dim)
}

function _inner(
  x: torch.Tensor,
  u: torch.Tensor,
  v: torch.Tensor,
  K: number,
  keepdim: boolean,
  dim: number,
) {
  return _lambda_x(x, K, true, dim)
    .pow(2)
    .mul(u.mul(v).sum({ dim, keepdim }))
}

function norm(
  x: torch.Tensor,
  u: torch.Tensor,
  K: number = 1.0,
  keepdim: boolean = false,
  dim: number = -1,
) {
  return _norm(x, u, K, keepdim, dim)
}

function _norm(
  x: torch.Tensor,
  u: torch.Tensor,
  K: number,
  keepdim: boolean,
  dim: number,
) {
  const lam = _lambda_x(x, K, keepdim, dim)
  const u_norm = u.norm({ dim, keepdim, p: 2 })
  return lam.mul(u_norm)
}

function mobius_add(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _mobius_add(x, y, K, dim)
}

function _mobius_add(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number,
  dim: number,
) {
  const x2 = x.pow(2).sum({ dim, keepdim: true })
  const y2 = y.pow(2).sum({ dim, keepdim: true })
  const xy = x.mul(y).sum({ dim, keepdim: true })
  const num = x
    .mul(torch.ones_like(y).sub(K.mul(y2)))
    .add(y.mul(torch.ones_like(x).add(K.mul(x2))))
  const denom = torch
    .ones_like(xy)
    .sub(K.mul(xy.mul(2)))
    .add(K.pow(2).mul(x2).mul(y2))
  return num.div(denom.clampMin(MIN_NORM))
}

function mobius_sub(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _mobius_sub(x, y, K, dim)
}

function _mobius_sub(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number,
  dim: number,
) {
  return _mobius_add(x, y.neg(), K, dim)
}

function mobius_coadd(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _mobius_coadd(x, y, K, dim)
}

function _mobius_coadd(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number,
  dim: number,
) {
  return _mobius_add(x, _gyration(x, y.neg(), y, K, dim), K, dim)
}

function mobius_cosub(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _mobius_cosub(x, y, K, dim)
}

function _mobius_cosub(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number,
  dim: number,
) {
  return _mobius_coadd(x, y.neg(), K, dim)
}

function mobius_scalar_mul(
  r: torch.Tensor,
  x: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _mobius_scalar_mul(r, x, K, dim)
}

function _mobius_scalar_mul(
  r: torch.Tensor,
  x: torch.Tensor,
  K: number,
  dim: number,
) {
  const x_norm = x.norm({ dim, keepdim: true, p: 2 }).clampMin(MIN_NORM)
  const res_c = tan_K(r.mul(arctan_K(x_norm, K)), K).mul(x.div(x_norm))
  return res_c
}

function dist(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number = 1.0,
  keepdim: boolean = false,
  dim: number = -1,
) {
  return _dist(x, y, K, keepdim, dim)
}

function _dist(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number,
  keepdim: boolean,
  dim: number,
) {
  return arctan_K(
    _mobius_add(x.neg(), y, K, dim).norm({ dim, p: 2, keepdim }),
    K,
  ).mul(2.0)
}

function dist0(
  x: torch.Tensor,
  K: number = 1.0,
  keepdim: boolean = false,
  dim: number = -1,
) {
  return _dist0(x, K, keepdim, dim)
}

function _dist0(
  x: torch.Tensor,
  K: number,
  keepdim: boolean,
  dim: number,
) {
  return arctan_K(x.norm({ dim, p: 2, keepdim }), K).mul(2.0)
}

function geodesic(
  t: torch.Tensor,
  x: torch.Tensor,
  y: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _geodesic(t, x, y, K, dim)
}

function _geodesic(
  t: torch.Tensor,
  x: torch.Tensor,
  y: torch.Tensor,
  K: number,
  dim: number,
) {
  const v = _mobius_add(x.neg(), y, K, dim)
  const tv = _mobius_scalar_mul(t, v, K, dim)
  const gamma_t = _mobius_add(x, tv, K, dim)
  return gamma_t
}

function expmap(
  x: torch.Tensor,
  u: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _expmap(x, u, K, dim)
}

function _expmap(
  x: torch.Tensor,
  u: torch.Tensor,
  K: number,
  dim: number,
) {
  const u_norm = u.norm({ dim, p: 2, keepdim: true }).clampMin(MIN_NORM)
  const lam = _lambda_x(x, K, dim, true)
  const second_term = tan_K(lam.div(2).mul(u_norm), K).mul(
    u.div(u_norm),
  )
  const y = _mobius_add(x, second_term, K, dim)
  return y
}

function expmap0(u: torch.Tensor, K: number = 1.0, dim: number = -1) {
  return _expmap0(u, K, dim)
}

function _expmap0(u: torch.Tensor, K: number, dim: number) {
  const u_norm = u.norm({ dim, p: 2, keepdim: true }).clampMin(MIN_NORM)
  const gamma_1 = tan_K(u_norm, K).mul(u.div(u_norm))
  return gamma_1
}

function geodesic_unit(
  t: torch.Tensor,
  x: torch.Tensor,
  u: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _geodesic_unit(t, x, u, K, dim)
}

function _geodesic_unit(
  t: torch.Tensor,
  x: torch.Tensor,
  u: torch.Tensor,
  K: number,
  dim: number,
) {
  const u_norm = u.norm({ dim, p: 2, keepdim: true }).clampMin(MIN_NORM)
  const second_term = tan_K(t.div(2), K).mul(u.div(u_norm))
  const gamma_1 = _mobius_add(x, second_term, K, dim)
  return gamma_1
}

function logmap(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _logmap(x, y, K, dim)
}

function _logmap(
  x: torch.Tensor,
  y: torch.Tensor,
  K: number,
  dim: number,
) {
  const sub = _mobius_add(x.neg(), y, K, dim)
  const sub_norm = sub
    .norm({ dim, p: 2, keepdim: true })
    .clampMin(MIN_NORM)
  const lam = _lambda_x(x, K, true, dim)
  return arctan_K(sub_norm, K)
    .mul(2)
    .mul(sub.div(lam.mul(sub_norm)))
}

function logmap0(y: torch.Tensor, K: number = 1.0, dim: number = -1) {
  return _logmap0(y, K, dim)
}

function _logmap0(y: torch.Tensor, K: number, dim: number) {
  const y_norm = y.norm({ dim, p: 2, keepdim: true }).clampMin(MIN_NORM)
  return y.div(y_norm).mul(arctan_K(y_norm, K))
}

function mobius_matvec(
  m: torch.Tensor,
  x: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _mobius_matvec(m, x, K, dim)
}

function _mobius_matvec(
  m: torch.Tensor,
  x: torch.Tensor,
  K: number,
  dim: number,
) {
  if (m.dim() > 2 && dim !== -1) {
    throw new Error(
      'broadcasted Möbius matvec is supported for the last dim only',
    )
  }
  const x_norm = x.norm({ dim, keepdim: true, p: 2 }).clampMin(MIN_NORM)
  let mx: torch.Tensor
  if (dim !== -1 || m.dim() === 2) {
    mx = torch.tensordot(x, m, [[dim], [1]])
  } else {
    mx = torch.matmul(m, x.unsqueeze(-1)).squeeze(-1)
  }
  const mx_norm = mx
    .norm({ dim, keepdim: true, p: 2 })
    .clampMin(MIN_NORM)
  const res_c = tan_K(
    mx_norm.div(x_norm).mul(arctan_K(x_norm, K)),
    K,
  ).mul(mx.div(mx_norm))
  const cond = mx.eq(0).prod({ dim, keepdim: true, dtype: torch.uint8 })
  const res_0 = torch.zeros(1, {
    dtype: res_c.dtype,
    device: res_c.device,
  })
  return torch.where(cond, res_0, res_c)
}

function mobius_pointwise_mul(
  w: torch.Tensor,
  x: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _mobius_pointwise_mul(w, x, K, dim)
}

function _mobius_pointwise_mul(
  w: torch.Tensor,
  x: torch.Tensor,
  K: number,
  dim: number,
) {
  const x_norm = x.norm({ dim, keepdim: true, p: 2 }).clampMin(MIN_NORM)
  const wx = w.mul(x)
  const wx_norm = wx
    .norm({ dim, keepdim: true, p: 2 })
    .clampMin(MIN_NORM)
  const res_c = tan_K(
    wx_norm.div(x_norm).mul(arctan_K(x_norm, K)),
    K,
  ).mul(wx.div(wx_norm))
  const cond = wx.eq(0).prod({ dim, keepdim: true, dtype: torch.uint8 })
  const res_0 = torch.zeros(1, {
    dtype: res_c.dtype,
    device: res_c.device,
  })
  return torch.where(cond, res_0, res_c)
}

function mobius_fn_apply_chain(
  x: torch.Tensor,
  fns: Array<Function>,
  K: number = 1.0,
  dim: number = -1,
) {
  if (!fns.length) {
    return x
  } else {
    let ex = _logmap0(x, K, dim)
    for (const fn of fns) {
      ex = fn(ex)
    }
    return _expmap0(ex, K, dim)
  }
}

function mobius_fn_apply(
  fn: Function,
  x: torch.Tensor,
  args: Array<any>,
  K: number = 1.0,
  dim: number = -1,
  kwargs: object,
) {
  let ex = _logmap0(x, K, dim)
  ex = fn.apply(null, [ex, ...args, kwargs])
  return _expmap0(ex, K, dim)
}

function mobiusify(fn: Function) {
  return function (x: torch.Tensor, ...args: Array<any>) {
    const K = args.find(arg => typeof arg === 'number') || 1.0
    const dim =
      args.find(arg => typeof arg === 'number' && arg !== K) || -1
    let ex = _logmap0(x, K, dim)
    ex = fn.apply(null, [ex, ...args])
    return _expmap0(ex, K, dim)
  }
}

function dist2plane(
  x: torch.Tensor,
  p: torch.Tensor,
  a: torch.Tensor,
  K: number = 1.0,
  keepdim: boolean = false,
  signed: boolean = false,
  dim: number = -1,
) {
  return _dist2plane(x, a, p, K, keepdim, signed, dim)
}

function _dist2plane(
  x: torch.Tensor,
  a: torch.Tensor,
  p: torch.Tensor,
  K: number,
  keepdim: boolean,
  signed: boolean,
  dim: number,
) {
  const diff = _mobius_add(p.neg(), x, K, dim)
  const diff_norm2 = diff
    .pow(2)
    .sum({ dim, keepdim })
    .clampMin(MIN_NORM)
  const sc_diff_a = diff.mul(a).sum({ dim, keepdim })
  const sc_diff_a_abs = signed ? sc_diff_a : sc_diff_a.abs()
  const a_norm = a.norm({ dim, keepdim, p: 2 }).clampMin(MIN_NORM)
  const num = sc_diff_a_abs.mul(2.0)
  const denom = a_norm.mul(1.0 + K * diff_norm2).clampMin(MIN_NORM)
  return arcsin_K(num.div(denom), K)
}

function sproj(x: torch.Tensor, K: number) {
  const factor = torch.reciprocal(
    torch
      .ones_like(K)
      .add(torch.sqrt(torch.abs(K)).mul(x.select(-1, -1))),
  )
  return factor.unsqueeze(-1).mul(x.slice(0, -1))
}

function inv_sproj(x: torch.Tensor, K: number) {
  const lam_x = _lambda_x(x, K, true, -1)
  const A = lam_x.unsqueeze(-1).mul(x)
  const B = lam_x.sub(1.0).div(torch.sqrt(torch.abs(K)).unsqueeze(-1))
  return torch.cat([A, B], -1)
}

function antipode(x: torch.Tensor, K: number, dim: number = -1) {
  const v = x.div(x.norm({ p: 2, dim }))
  const R = torch.reciprocal(torch.sqrt(torch.abs(K)))
  const π = Math.PI
  return _geodesic_unit(π * R, x, v, K, dim)
}

function weighted_midpoint(
  x: torch.Tensor,
  a: torch.Tensor,
  K: number = 1.0,
  keepdim: boolean = false,
  dim: number = -1,
) {
  return _weighted_midpoint(x, a, K, keepdim, dim)
}

function _weighted_midpoint(
  x: torch.Tensor,
  w: torch.Tensor,
  K: number,
  keepdim: boolean,
  dim: number,
) {
  const lam_x = _lambda_x(x, K, false, dim)
  const w_times_lam_x = w.mul(lam_x)
  let denominator = w_times_lam_x.sub(w).sum()
  const s = torch.sign(torch.sign(denominator).add(0.1))
  if (denominator.abs().lt(MIN_NORM)) {
    denominator = s.mul(MIN_NORM)
  }
  const linear_weights = w_times_lam_x.div(denominator)

  x = x.t()
  const rhs = torch.matmul(x, linear_weights).t()
  x = x.t()

  if (!keepdim) {
    rhs.squeeze()
  }

  const midpoint = _mobius_scalar_mul(0.5, rhs, K, dim)

  if (K > 0) {
    const m_a = _antipode(midpoint, K, dim)
    const d = _dist(x, midpoint, K, keepdim, dim).sum({
      dim,
      keepdim: false,
    })
    const d_a = _dist(x, m_a, K, keepdim, dim).sum({
      dim,
      keepdim: false,
    })
    return d.lt(d_a) ? midpoint : m_a
  } else {
    return midpoint
  }
}

function gyration(
  a: torch.Tensor,
  b: torch.Tensor,
  u: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _gyration(a, b, u, K, dim)
}

function _gyration(
  u: torch.Tensor,
  v: torch.Tensor,
  w: torch.Tensor,
  K: number,
  dim: number,
) {
  const u2 = u.pow(2).sum({ dim, keepdim: true })
  const v2 = v.pow(2).sum({ dim, keepdim: true })
  const uv = u.mul(v).sum({ dim, keepdim: true })
  const uw = u.mul(w).sum({ dim, keepdim: true })
  const vw = v.mul(w).sum({ dim, keepdim: true })
  const K2 = K ** 2
  const a = u
    .neg()
    .mul(uw.mul(v2).mul(K2).sub(vw.mul(K)))
    .add(uv.mul(vw).mul(K2).mul(2))
  const b = v.neg().mul(vw.mul(u2).mul(K2).sub(uw.mul(K)))
  const d = torch
    .ones_like(uv)
    .sub(uv.mul(K).mul(2))
    .add(u2.mul(v2).mul(K2))
  return w.add(a.add(b).mul(2).div(d.clampMin(MIN_NORM)))
}

function parallel_transport(
  x: torch.Tensor,
  y: torch.Tensor,
  v: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _parallel_transport(x, y, v, K, dim)
}

function _parallel_transport(
  x: torch.Tensor,
  y: torch.Tensor,
  u: torch.Tensor,
  K: number,
  dim: number,
) {
  return _gyration(y, x.neg(), u, K, dim)
    .mul(_lambda_x(x, K, true, dim))
    .div(_lambda_x(y, K, true, dim))
}

function parallel_transport0(
  y: torch.Tensor,
  v: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _parallel_transport0(y, v, K, dim)
}

function _parallel_transport0(
  y: torch.Tensor,
  v: torch.Tensor,
  K: number,
  dim: number,
) {
  return v.mul(
    torch
      .ones_like(v)
      .add(
        K.mul(y.pow(2).sum({ dim, keepdim: true })).clampMin(MIN_NORM),
      ),
  )
}

function parallel_transport0back(
  x: torch.Tensor,
  v: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _parallel_transport0back(x, v, K, dim)
}

function _parallel_transport0back(
  x: torch.Tensor,
  v: torch.Tensor,
  K: number,
  dim: number,
) {
  return v.div(
    torch
      .ones_like(v)
      .add(
        K.mul(x.pow(2).sum({ dim, keepdim: true })).clampMin(MIN_NORM),
      ),
  )
}

function egrad2rgrad(
  x: torch.Tensor,
  grad: torch.Tensor,
  K: number = 1.0,
  dim: number = -1,
) {
  return _egrad2rgrad(x, grad, K, dim)
}

function _egrad2rgrad(
  x: torch.Tensor,
  grad: torch.Tensor,
  K: number,
  dim: number,
) {
  return grad.div(_lambda_x(x, K, true, dim).pow(2))
}
