#!/usr/bin/env node
'use strict';
const http = require('http');
const stream = require('stream');
const events = require('events');
const util = require('util');
const tty = require('tty');
const assert = require('assert');
const path = require('path');
const fs = require('fs');
const _crypto = require('crypto');
const url = require('url');
const net = require('net');
const querystring = require('querystring');             
_goa.M = class {
};
_goa.N = class {
};
_goa.K = class {
};
_goa.Request = class {
};
_goa.P = class {
};
_goa.L = class {
};
_goa.Response = class {
};
var aa = tty;
const {format:m, inspect:p} = util;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function ba(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return ca(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.S ? (b = Math.abs(a), a = 864E5 <= b ? t(a, b, 864E5, "day") : 36E5 <= b ? t(a, b, 36E5, "hour") : 6E4 <= b ? t(a, b, 6E4, "minute") : 1000 <= b ? t(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function ca(a) {
  a = String(a);
  if (!(100 < a.length) && (a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a))) {
    var b = parseFloat(a[1]);
    switch((a[2] || "ms").toLowerCase()) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return 315576E5 * b;
      case "weeks":
      case "week":
      case "w":
        return 6048E5 * b;
      case "days":
      case "day":
      case "d":
        return 864E5 * b;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return 36E5 * b;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return 6E4 * b;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return 1000 * b;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return b;
    }
  }
}
function t(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;const u = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), v = {init:function(a) {
  a.inspectOpts = Object.assign({}, u);
}, log:function(...a) {
  return process.stderr.write(m(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const f = "\u001b[3" + (8 > d ? d : "8;5;" + d), g = `  ${f};1m${b} \u001B[0m`;
    a[0] = g + a[0].split("\n").join("\n" + g);
    a.push(f + "m+" + ba(e) + "\u001b[0m");
  } else {
    a[0] = (u.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in u ? !!u.colors : aa.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:u, formatters:{o:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return p(a, b).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return p(a, b);
}}};
function da(a) {
  function b(...g) {
    if (b.enabled) {
      var k = Number(new Date);
      b.diff = k - (f || k);
      b.prev = f;
      f = b.curr = k;
      g[0] = ea(g[0]);
      "string" != typeof g[0] && g.unshift("%O");
      var h = 0;
      g[0] = g[0].replace(/%([a-zA-Z%])/g, (l, n) => {
        if ("%%" == l) {
          return l;
        }
        h++;
        if (n = c[n]) {
          l = n.call(b, g[h]), g.splice(h, 1), h--;
        }
        return l;
      });
      d.call(b, g);
      (b.log || e).apply(b, g);
    }
  }
  const c = a.formatters, d = a.formatArgs, e = a.log;
  let f;
  return b;
}
function fa(a) {
  const b = da(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function ha(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function ia(a) {
  var b = v.load();
  a.save(b);
  a.b = [];
  a.h = [];
  let c;
  const d = ("string" == typeof b ? b : "").split(/[\s,]+/), e = d.length;
  for (c = 0; c < e; c++) {
    d[c] && (b = d[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.h.push(new RegExp("^" + b.substr(1) + "$")) : a.b.push(new RegExp("^" + b + "$")));
  }
  for (c = 0; c < a.a.length; c++) {
    b = a.a[c], b.enabled = a.enabled(b.namespace);
  }
}
class ja {
  constructor(a) {
    this.colors = a.colors;
    this.formatArgs = a.formatArgs;
    this.inspectOpts = a.inspectOpts;
    this.log = a.log;
    this.save = a.save;
    this.init = a.init;
    this.formatters = a.formatters || {};
    this.a = [];
    this.b = [];
    this.h = [];
  }
  destroy(a) {
    a = this.a.indexOf(a);
    return -1 !== a ? (this.a.splice(a, 1), !0) : !1;
  }
  enabled(a) {
    if ("*" == a[a.length - 1]) {
      return !0;
    }
    let b, c;
    b = 0;
    for (c = this.h.length; b < c; b++) {
      if (this.h[b].test(a)) {
        return !1;
      }
    }
    b = 0;
    for (c = this.b.length; b < c; b++) {
      if (this.b[b].test(a)) {
        return !0;
      }
    }
    return !1;
  }
}
function ea(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;const ka = Object.prototype.toString, la = Function.prototype.toString, ma = /^\s*(?:function)?\*/, w = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, x = Object.getPrototypeOf;
var y;
a: {
  if (w) {
    try {
      y = Function("return function*() {}")();
      break a;
    } catch (a) {
    }
    y = void 0;
  } else {
    y = !1;
  }
}
const z = y, na = z ? x(z) : {};
const {createServer:oa} = http;
var A = stream;
var pa = events;
var B = assert;
const {extname:qa} = path;
var C = {[100]:"Continue", [101]:"Switching Protocols", [102]:"Processing", [103]:"Early Hints", [200]:"OK", [201]:"Created", [202]:"Accepted", [203]:"Non-Authoritative Information", [204]:"No Content", [205]:"Reset Content", [206]:"Partial Content", [207]:"Multi-Status", [208]:"Already Reported", [226]:"IM Used", [300]:"Multiple Choices", [301]:"Moved Permanently", [302]:"Found", [303]:"See Other", [304]:"Not Modified", [305]:"Use Proxy", [306]:"(Unused)", [307]:"Temporary Redirect", [308]:"Permanent Redirect", 
[400]:"Bad Request", [401]:"Unauthorized", [402]:"Payment Required", [403]:"Forbidden", [404]:"Not Found", [405]:"Method Not Allowed", [406]:"Not Acceptable", [407]:"Proxy Authentication Required", [408]:"Request Timeout", [409]:"Conflict", [410]:"Gone", [411]:"Length Required", [412]:"Precondition Failed", [413]:"Payload Too Large", [414]:"URI Too Long", [415]:"Unsupported Media Type", [416]:"Range Not Satisfiable", [417]:"Expectation Failed", [418]:"I'm a teapot", [421]:"Misdirected Request", [422]:"Unprocessable Entity", 
[423]:"Locked", [424]:"Failed Dependency", [425]:"Unordered Collection", [426]:"Upgrade Required", [428]:"Precondition Required", [429]:"Too Many Requests", [431]:"Request Header Fields Too Large", [451]:"Unavailable For Legal Reasons", [500]:"Internal Server Error", [501]:"Not Implemented", [502]:"Bad Gateway", [503]:"Service Unavailable", [504]:"Gateway Timeout", [505]:"HTTP Version Not Supported", [506]:"Variant Also Negotiates", [507]:"Insufficient Storage", [508]:"Loop Detected", [509]:"Bandwidth Limit Exceeded", 
[510]:"Not Extended", [511]:"Network Authentication Required"};
/*
 statuses
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
*/
const sa = ra(), ta = {[300]:!0, [301]:!0, [302]:!0, [303]:!0, [305]:!0, [307]:!0, [308]:!0}, D = {[204]:!0, [205]:!0, [304]:!0};
function ra() {
  var a = F;
  const b = [];
  Object.keys(C).forEach(c => {
    const d = C[c];
    c = Number(c);
    a[c] = d;
    a[d] = c;
    a[d.toLowerCase()] = c;
    b.push(c);
  });
  return b;
}
function F(a) {
  if ("number" == typeof a) {
    if (!F[a]) {
      throw Error("invalid status code: " + a);
    }
    return a;
  }
  if ("string" != typeof a) {
    throw new TypeError("code must be a number or string");
  }
  var b = parseInt(a, 10);
  if (!isNaN(b)) {
    if (!F[b]) {
      throw Error("invalid status code: " + b);
    }
    return b;
  }
  b = F[a.toLowerCase()];
  if (!b) {
    throw Error('invalid status message: "' + a + '"');
  }
  return b;
}
;function G(a = {}, b = []) {
  "string" == typeof b && (b = b.split(/ +/));
  return b.reduce((c, d) => {
    if (null == a[d]) {
      return c;
    }
    c[d] = a[d];
    return c;
  }, {});
}
;/*
 ee-first
 Copyright(c) 2014 Jonathan Ong
 MIT Licensed
*/
function H(a, b) {
  function c() {
    d();
    b.apply(null, arguments);
  }
  function d() {
    for (var r, E = 0; E < f.length; E++) {
      r = f[E], r.H.removeListener(r.event, r.I);
    }
  }
  function e(r) {
    b = r;
  }
  if (!Array.isArray(a)) {
    throw new TypeError("arg must be an array of [ee, events...] arrays");
  }
  for (var f = [], g = 0; g < a.length; g++) {
    var k = a[g];
    if (!Array.isArray(k) || 2 > k.length) {
      throw new TypeError("each array member must be [ee, events...]");
    }
    for (var h = k[0], l = 1; l < k.length; l++) {
      var n = k[l], q = ua(n, c);
      h.on(n, q);
      f.push({H:h, event:n, I:q});
    }
  }
  e.cancel = d;
  return e;
}
function ua(a, b) {
  return function(c) {
    for (var d = Array(arguments.length), e = "error" == a ? c : null, f = 0; f < d.length; f++) {
      d[f] = arguments[f];
    }
    b(e, this, a, d);
  };
}
;/*
 on-finished
 Copyright(c) 2013 Jonathan Ong
 Copyright(c) 2014 Douglas Christopher Wilson
 MIT Licensed
*/
function I(a, b) {
  var c = a.socket;
  c = "boolean" == typeof a.finished ? !!(a.finished || c && !c.writable) : "boolean" == typeof a.complete ? !(!a.upgrade && c && c.readable && (!a.complete || a.readable)) : void 0;
  !1 !== c ? setImmediate(b, null, a) : (c = a.__onFinished, c && c.w || (c = a.__onFinished = va(a), wa(a, c)), c.w.push(b));
}
function wa(a, b) {
  function c(k) {
    g.cancel();
    e.cancel();
    f = !0;
    b(k);
  }
  function d(k) {
    a.removeListener("socket", d);
    f || g === e && (e = H([[k, "error", "close"]], c));
  }
  var e, f = !1;
  var g = e = H([[a, "end", "finish"]], c);
  if (a.socket) {
    d(a.socket);
  } else {
    a.on("socket", d);
  }
}
function va(a) {
  function b(c) {
    a.__onFinished === b && (a.__onFinished = null);
    if (b.w) {
      var d = b.w;
      b.w = null;
      for (var e = 0; e < d.length; e++) {
        d[e](c, a);
      }
    }
  }
  b.w = [];
  return b;
}
;const {ReadStream:xa} = fs;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 https://npmjs.org/destroy
*/
function ya(a) {
  if (a instanceof xa) {
    a.destroy();
    if ("function" == typeof a.close) {
      a.on("open", za);
    }
    return a;
  }
  if (!(a instanceof A)) {
    return a;
  }
  "function" == typeof a.destroy && a.destroy();
  return a;
}
function za() {
  "number" == typeof this.fd && this.close();
}
;/*
 vary
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
/*
 MIT Copyright (c) 2014 Jonathan Ong me@jongleberry.com
 https://npmjs.com/package/mime-db
*/
var J = {"application/1d-interleaved-parityfec":{source:"iana"}, "application/3gpdash-qoe-report+xml":{source:"iana", compressible:!0}, "application/3gpp-ims+xml":{source:"iana", compressible:!0}, "application/a2l":{source:"iana"}, "application/activemessage":{source:"iana"}, "application/activity+json":{source:"iana", compressible:!0}, "application/alto-costmap+json":{source:"iana", compressible:!0}, "application/alto-costmapfilter+json":{source:"iana", compressible:!0}, "application/alto-directory+json":{source:"iana", 
compressible:!0}, "application/alto-endpointcost+json":{source:"iana", compressible:!0}, "application/alto-endpointcostparams+json":{source:"iana", compressible:!0}, "application/alto-endpointprop+json":{source:"iana", compressible:!0}, "application/alto-endpointpropparams+json":{source:"iana", compressible:!0}, "application/alto-error+json":{source:"iana", compressible:!0}, "application/alto-networkmap+json":{source:"iana", compressible:!0}, "application/alto-networkmapfilter+json":{source:"iana", 
compressible:!0}, "application/aml":{source:"iana"}, "application/andrew-inset":{source:"iana", extensions:["ez"]}, "application/applefile":{source:"iana"}, "application/applixware":{source:"apache", extensions:["aw"]}, "application/atf":{source:"iana"}, "application/atfx":{source:"iana"}, "application/atom+xml":{source:"iana", compressible:!0, extensions:["atom"]}, "application/atomcat+xml":{source:"iana", compressible:!0, extensions:["atomcat"]}, "application/atomdeleted+xml":{source:"iana", compressible:!0}, 
"application/atomicmail":{source:"iana"}, "application/atomsvc+xml":{source:"iana", compressible:!0, extensions:["atomsvc"]}, "application/atsc-dwd+xml":{source:"iana", compressible:!0}, "application/atsc-held+xml":{source:"iana", compressible:!0}, "application/atsc-rsat+xml":{source:"iana", compressible:!0}, "application/atxml":{source:"iana"}, "application/auth-policy+xml":{source:"iana", compressible:!0}, "application/bacnet-xdd+zip":{source:"iana", compressible:!1}, "application/batch-smtp":{source:"iana"}, 
"application/bdoc":{compressible:!1, extensions:["bdoc"]}, "application/beep+xml":{source:"iana", compressible:!0}, "application/calendar+json":{source:"iana", compressible:!0}, "application/calendar+xml":{source:"iana", compressible:!0}, "application/call-completion":{source:"iana"}, "application/cals-1840":{source:"iana"}, "application/cbor":{source:"iana"}, "application/cccex":{source:"iana"}, "application/ccmp+xml":{source:"iana", compressible:!0}, "application/ccxml+xml":{source:"iana", compressible:!0, 
extensions:["ccxml"]}, "application/cdfx+xml":{source:"iana", compressible:!0}, "application/cdmi-capability":{source:"iana", extensions:["cdmia"]}, "application/cdmi-container":{source:"iana", extensions:["cdmic"]}, "application/cdmi-domain":{source:"iana", extensions:["cdmid"]}, "application/cdmi-object":{source:"iana", extensions:["cdmio"]}, "application/cdmi-queue":{source:"iana", extensions:["cdmiq"]}, "application/cdni":{source:"iana"}, "application/cea":{source:"iana"}, "application/cea-2018+xml":{source:"iana", 
compressible:!0}, "application/cellml+xml":{source:"iana", compressible:!0}, "application/cfw":{source:"iana"}, "application/clue_info+xml":{source:"iana", compressible:!0}, "application/cms":{source:"iana"}, "application/cnrp+xml":{source:"iana", compressible:!0}, "application/coap-group+json":{source:"iana", compressible:!0}, "application/coap-payload":{source:"iana"}, "application/commonground":{source:"iana"}, "application/conference-info+xml":{source:"iana", compressible:!0}, "application/cose":{source:"iana"}, 
"application/cose-key":{source:"iana"}, "application/cose-key-set":{source:"iana"}, "application/cpl+xml":{source:"iana", compressible:!0}, "application/csrattrs":{source:"iana"}, "application/csta+xml":{source:"iana", compressible:!0}, "application/cstadata+xml":{source:"iana", compressible:!0}, "application/csvm+json":{source:"iana", compressible:!0}, "application/cu-seeme":{source:"apache", extensions:["cu"]}, "application/cwt":{source:"iana"}, "application/cybercash":{source:"iana"}, "application/dart":{compressible:!0}, 
"application/dash+xml":{source:"iana", compressible:!0, extensions:["mpd"]}, "application/dashdelta":{source:"iana"}, "application/davmount+xml":{source:"iana", compressible:!0, extensions:["davmount"]}, "application/dca-rft":{source:"iana"}, "application/dcd":{source:"iana"}, "application/dec-dx":{source:"iana"}, "application/dialog-info+xml":{source:"iana", compressible:!0}, "application/dicom":{source:"iana"}, "application/dicom+json":{source:"iana", compressible:!0}, "application/dicom+xml":{source:"iana", 
compressible:!0}, "application/dii":{source:"iana"}, "application/dit":{source:"iana"}, "application/dns":{source:"iana"}, "application/dns+json":{source:"iana", compressible:!0}, "application/dns-message":{source:"iana"}, "application/docbook+xml":{source:"apache", compressible:!0, extensions:["dbk"]}, "application/dskpp+xml":{source:"iana", compressible:!0}, "application/dssc+der":{source:"iana", extensions:["dssc"]}, "application/dssc+xml":{source:"iana", compressible:!0, extensions:["xdssc"]}, 
"application/dvcs":{source:"iana"}, "application/ecmascript":{source:"iana", compressible:!0, extensions:["ecma", "es"]}, "application/edi-consent":{source:"iana"}, "application/edi-x12":{source:"iana", compressible:!1}, "application/edifact":{source:"iana", compressible:!1}, "application/efi":{source:"iana"}, "application/emergencycalldata.comment+xml":{source:"iana", compressible:!0}, "application/emergencycalldata.control+xml":{source:"iana", compressible:!0}, "application/emergencycalldata.deviceinfo+xml":{source:"iana", 
compressible:!0}, "application/emergencycalldata.ecall.msd":{source:"iana"}, "application/emergencycalldata.providerinfo+xml":{source:"iana", compressible:!0}, "application/emergencycalldata.serviceinfo+xml":{source:"iana", compressible:!0}, "application/emergencycalldata.subscriberinfo+xml":{source:"iana", compressible:!0}, "application/emergencycalldata.veds+xml":{source:"iana", compressible:!0}, "application/emma+xml":{source:"iana", compressible:!0, extensions:["emma"]}, "application/emotionml+xml":{source:"iana", 
compressible:!0}, "application/encaprtp":{source:"iana"}, "application/epp+xml":{source:"iana", compressible:!0}, "application/epub+zip":{source:"iana", compressible:!1, extensions:["epub"]}, "application/eshop":{source:"iana"}, "application/exi":{source:"iana", extensions:["exi"]}, "application/expect-ct-report+json":{source:"iana", compressible:!0}, "application/fastinfoset":{source:"iana"}, "application/fastsoap":{source:"iana"}, "application/fdt+xml":{source:"iana", compressible:!0}, "application/fhir+json":{source:"iana", 
compressible:!0}, "application/fhir+xml":{source:"iana", compressible:!0}, "application/fido.trusted-apps+json":{compressible:!0}, "application/fits":{source:"iana"}, "application/font-sfnt":{source:"iana"}, "application/font-tdpfr":{source:"iana", extensions:["pfr"]}, "application/font-woff":{source:"iana", compressible:!1}, "application/framework-attributes+xml":{source:"iana", compressible:!0}, "application/geo+json":{source:"iana", compressible:!0, extensions:["geojson"]}, "application/geo+json-seq":{source:"iana"}, 
"application/geopackage+sqlite3":{source:"iana"}, "application/geoxacml+xml":{source:"iana", compressible:!0}, "application/gltf-buffer":{source:"iana"}, "application/gml+xml":{source:"iana", compressible:!0, extensions:["gml"]}, "application/gpx+xml":{source:"apache", compressible:!0, extensions:["gpx"]}, "application/gxf":{source:"apache", extensions:["gxf"]}, "application/gzip":{source:"iana", compressible:!1, extensions:["gz"]}, "application/h224":{source:"iana"}, "application/held+xml":{source:"iana", 
compressible:!0}, "application/hjson":{extensions:["hjson"]}, "application/http":{source:"iana"}, "application/hyperstudio":{source:"iana", extensions:["stk"]}, "application/ibe-key-request+xml":{source:"iana", compressible:!0}, "application/ibe-pkg-reply+xml":{source:"iana", compressible:!0}, "application/ibe-pp-data":{source:"iana"}, "application/iges":{source:"iana"}, "application/im-iscomposing+xml":{source:"iana", compressible:!0}, "application/index":{source:"iana"}, "application/index.cmd":{source:"iana"}, 
"application/index.obj":{source:"iana"}, "application/index.response":{source:"iana"}, "application/index.vnd":{source:"iana"}, "application/inkml+xml":{source:"iana", compressible:!0, extensions:["ink", "inkml"]}, "application/iotp":{source:"iana"}, "application/ipfix":{source:"iana", extensions:["ipfix"]}, "application/ipp":{source:"iana"}, "application/isup":{source:"iana"}, "application/its+xml":{source:"iana", compressible:!0}, "application/java-archive":{source:"apache", compressible:!1, extensions:["jar", 
"war", "ear"]}, "application/java-serialized-object":{source:"apache", compressible:!1, extensions:["ser"]}, "application/java-vm":{source:"apache", compressible:!1, extensions:["class"]}, "application/javascript":{source:"iana", charset:"UTF-8", compressible:!0, extensions:["js", "mjs"]}, "application/jf2feed+json":{source:"iana", compressible:!0}, "application/jose":{source:"iana"}, "application/jose+json":{source:"iana", compressible:!0}, "application/jrd+json":{source:"iana", compressible:!0}, 
"application/json":{source:"iana", charset:"UTF-8", compressible:!0, extensions:["json", "map"]}, "application/json-patch+json":{source:"iana", compressible:!0}, "application/json-seq":{source:"iana"}, "application/json5":{extensions:["json5"]}, "application/jsonml+json":{source:"apache", compressible:!0, extensions:["jsonml"]}, "application/jwk+json":{source:"iana", compressible:!0}, "application/jwk-set+json":{source:"iana", compressible:!0}, "application/jwt":{source:"iana"}, "application/kpml-request+xml":{source:"iana", 
compressible:!0}, "application/kpml-response+xml":{source:"iana", compressible:!0}, "application/ld+json":{source:"iana", compressible:!0, extensions:["jsonld"]}, "application/lgr+xml":{source:"iana", compressible:!0}, "application/link-format":{source:"iana"}, "application/load-control+xml":{source:"iana", compressible:!0}, "application/lost+xml":{source:"iana", compressible:!0, extensions:["lostxml"]}, "application/lostsync+xml":{source:"iana", compressible:!0}, "application/lxf":{source:"iana"}, 
"application/mac-binhex40":{source:"iana", extensions:["hqx"]}, "application/mac-compactpro":{source:"apache", extensions:["cpt"]}, "application/macwriteii":{source:"iana"}, "application/mads+xml":{source:"iana", compressible:!0, extensions:["mads"]}, "application/manifest+json":{charset:"UTF-8", compressible:!0, extensions:["webmanifest"]}, "application/marc":{source:"iana", extensions:["mrc"]}, "application/marcxml+xml":{source:"iana", compressible:!0, extensions:["mrcx"]}, "application/mathematica":{source:"iana", 
extensions:["ma", "nb", "mb"]}, "application/mathml+xml":{source:"iana", compressible:!0, extensions:["mathml"]}, "application/mathml-content+xml":{source:"iana", compressible:!0}, "application/mathml-presentation+xml":{source:"iana", compressible:!0}, "application/mbms-associated-procedure-description+xml":{source:"iana", compressible:!0}, "application/mbms-deregister+xml":{source:"iana", compressible:!0}, "application/mbms-envelope+xml":{source:"iana", compressible:!0}, "application/mbms-msk+xml":{source:"iana", 
compressible:!0}, "application/mbms-msk-response+xml":{source:"iana", compressible:!0}, "application/mbms-protection-description+xml":{source:"iana", compressible:!0}, "application/mbms-reception-report+xml":{source:"iana", compressible:!0}, "application/mbms-register+xml":{source:"iana", compressible:!0}, "application/mbms-register-response+xml":{source:"iana", compressible:!0}, "application/mbms-schedule+xml":{source:"iana", compressible:!0}, "application/mbms-user-service-description+xml":{source:"iana", 
compressible:!0}, "application/mbox":{source:"iana", extensions:["mbox"]}, "application/media-policy-dataset+xml":{source:"iana", compressible:!0}, "application/media_control+xml":{source:"iana", compressible:!0}, "application/mediaservercontrol+xml":{source:"iana", compressible:!0, extensions:["mscml"]}, "application/merge-patch+json":{source:"iana", compressible:!0}, "application/metalink+xml":{source:"apache", compressible:!0, extensions:["metalink"]}, "application/metalink4+xml":{source:"iana", 
compressible:!0, extensions:["meta4"]}, "application/mets+xml":{source:"iana", compressible:!0, extensions:["mets"]}, "application/mf4":{source:"iana"}, "application/mikey":{source:"iana"}, "application/mmt-aei+xml":{source:"iana", compressible:!0}, "application/mmt-usd+xml":{source:"iana", compressible:!0}, "application/mods+xml":{source:"iana", compressible:!0, extensions:["mods"]}, "application/moss-keys":{source:"iana"}, "application/moss-signature":{source:"iana"}, "application/mosskey-data":{source:"iana"}, 
"application/mosskey-request":{source:"iana"}, "application/mp21":{source:"iana", extensions:["m21", "mp21"]}, "application/mp4":{source:"iana", extensions:["mp4s", "m4p"]}, "application/mpeg4-generic":{source:"iana"}, "application/mpeg4-iod":{source:"iana"}, "application/mpeg4-iod-xmt":{source:"iana"}, "application/mrb-consumer+xml":{source:"iana", compressible:!0}, "application/mrb-publish+xml":{source:"iana", compressible:!0}, "application/msc-ivr+xml":{source:"iana", compressible:!0}, "application/msc-mixer+xml":{source:"iana", 
compressible:!0}, "application/msword":{source:"iana", compressible:!1, extensions:["doc", "dot"]}, "application/mud+json":{source:"iana", compressible:!0}, "application/mxf":{source:"iana", extensions:["mxf"]}, "application/n-quads":{source:"iana", extensions:["nq"]}, "application/n-triples":{source:"iana", extensions:["nt"]}, "application/nasdata":{source:"iana"}, "application/news-checkgroups":{source:"iana"}, "application/news-groupinfo":{source:"iana"}, "application/news-transmission":{source:"iana"}, 
"application/nlsml+xml":{source:"iana", compressible:!0}, "application/node":{source:"iana"}, "application/nss":{source:"iana"}, "application/ocsp-request":{source:"iana"}, "application/ocsp-response":{source:"iana"}, "application/octet-stream":{source:"iana", compressible:!1, extensions:"bin dms lrf mar so dist distz pkg bpk dump elc deploy exe dll deb dmg iso img msi msp msm buffer".split(" ")}, "application/oda":{source:"iana", extensions:["oda"]}, "application/odm+xml":{source:"iana", compressible:!0}, 
"application/odx":{source:"iana"}, "application/oebps-package+xml":{source:"iana", compressible:!0, extensions:["opf"]}, "application/ogg":{source:"iana", compressible:!1, extensions:["ogx"]}, "application/omdoc+xml":{source:"apache", compressible:!0, extensions:["omdoc"]}, "application/onenote":{source:"apache", extensions:["onetoc", "onetoc2", "onetmp", "onepkg"]}, "application/oscore":{source:"iana"}, "application/oxps":{source:"iana", extensions:["oxps"]}, "application/p2p-overlay+xml":{source:"iana", 
compressible:!0}, "application/parityfec":{source:"iana"}, "application/passport":{source:"iana"}, "application/patch-ops-error+xml":{source:"iana", compressible:!0, extensions:["xer"]}, "application/pdf":{source:"iana", compressible:!1, extensions:["pdf"]}, "application/pdx":{source:"iana"}, "application/pem-certificate-chain":{source:"iana"}, "application/pgp-encrypted":{source:"iana", compressible:!1, extensions:["pgp"]}, "application/pgp-keys":{source:"iana"}, "application/pgp-signature":{source:"iana", 
extensions:["asc", "sig"]}, "application/pics-rules":{source:"apache", extensions:["prf"]}, "application/pidf+xml":{source:"iana", compressible:!0}, "application/pidf-diff+xml":{source:"iana", compressible:!0}, "application/pkcs10":{source:"iana", extensions:["p10"]}, "application/pkcs12":{source:"iana"}, "application/pkcs7-mime":{source:"iana", extensions:["p7m", "p7c"]}, "application/pkcs7-signature":{source:"iana", extensions:["p7s"]}, "application/pkcs8":{source:"iana", extensions:["p8"]}, "application/pkcs8-encrypted":{source:"iana"}, 
"application/pkix-attr-cert":{source:"iana", extensions:["ac"]}, "application/pkix-cert":{source:"iana", extensions:["cer"]}, "application/pkix-crl":{source:"iana", extensions:["crl"]}, "application/pkix-pkipath":{source:"iana", extensions:["pkipath"]}, "application/pkixcmp":{source:"iana", extensions:["pki"]}, "application/pls+xml":{source:"iana", compressible:!0, extensions:["pls"]}, "application/poc-settings+xml":{source:"iana", compressible:!0}, "application/postscript":{source:"iana", compressible:!0, 
extensions:["ai", "eps", "ps"]}, "application/ppsp-tracker+json":{source:"iana", compressible:!0}, "application/problem+json":{source:"iana", compressible:!0}, "application/problem+xml":{source:"iana", compressible:!0}, "application/provenance+xml":{source:"iana", compressible:!0}, "application/prs.alvestrand.titrax-sheet":{source:"iana"}, "application/prs.cww":{source:"iana", extensions:["cww"]}, "application/prs.hpub+zip":{source:"iana", compressible:!1}, "application/prs.nprend":{source:"iana"}, 
"application/prs.plucker":{source:"iana"}, "application/prs.rdf-xml-crypt":{source:"iana"}, "application/prs.xsf+xml":{source:"iana", compressible:!0}, "application/pskc+xml":{source:"iana", compressible:!0, extensions:["pskcxml"]}, "application/qsig":{source:"iana"}, "application/raml+yaml":{compressible:!0, extensions:["raml"]}, "application/raptorfec":{source:"iana"}, "application/rdap+json":{source:"iana", compressible:!0}, "application/rdf+xml":{source:"iana", compressible:!0, extensions:["rdf", 
"owl"]}, "application/reginfo+xml":{source:"iana", compressible:!0, extensions:["rif"]}, "application/relax-ng-compact-syntax":{source:"iana", extensions:["rnc"]}, "application/remote-printing":{source:"iana"}, "application/reputon+json":{source:"iana", compressible:!0}, "application/resource-lists+xml":{source:"iana", compressible:!0, extensions:["rl"]}, "application/resource-lists-diff+xml":{source:"iana", compressible:!0, extensions:["rld"]}, "application/rfc+xml":{source:"iana", compressible:!0}, 
"application/riscos":{source:"iana"}, "application/rlmi+xml":{source:"iana", compressible:!0}, "application/rls-services+xml":{source:"iana", compressible:!0, extensions:["rs"]}, "application/route-apd+xml":{source:"iana", compressible:!0}, "application/route-s-tsid+xml":{source:"iana", compressible:!0}, "application/route-usd+xml":{source:"iana", compressible:!0}, "application/rpki-ghostbusters":{source:"iana", extensions:["gbr"]}, "application/rpki-manifest":{source:"iana", extensions:["mft"]}, 
"application/rpki-publication":{source:"iana"}, "application/rpki-roa":{source:"iana", extensions:["roa"]}, "application/rpki-updown":{source:"iana"}, "application/rsd+xml":{source:"apache", compressible:!0, extensions:["rsd"]}, "application/rss+xml":{source:"apache", compressible:!0, extensions:["rss"]}, "application/rtf":{source:"iana", compressible:!0, extensions:["rtf"]}, "application/rtploopback":{source:"iana"}, "application/rtx":{source:"iana"}, "application/samlassertion+xml":{source:"iana", 
compressible:!0}, "application/samlmetadata+xml":{source:"iana", compressible:!0}, "application/sbml+xml":{source:"iana", compressible:!0, extensions:["sbml"]}, "application/scaip+xml":{source:"iana", compressible:!0}, "application/scim+json":{source:"iana", compressible:!0}, "application/scvp-cv-request":{source:"iana", extensions:["scq"]}, "application/scvp-cv-response":{source:"iana", extensions:["scs"]}, "application/scvp-vp-request":{source:"iana", extensions:["spq"]}, "application/scvp-vp-response":{source:"iana", 
extensions:["spp"]}, "application/sdp":{source:"iana", extensions:["sdp"]}, "application/secevent+jwt":{source:"iana"}, "application/senml+cbor":{source:"iana"}, "application/senml+json":{source:"iana", compressible:!0}, "application/senml+xml":{source:"iana", compressible:!0}, "application/senml-exi":{source:"iana"}, "application/sensml+cbor":{source:"iana"}, "application/sensml+json":{source:"iana", compressible:!0}, "application/sensml+xml":{source:"iana", compressible:!0}, "application/sensml-exi":{source:"iana"}, 
"application/sep+xml":{source:"iana", compressible:!0}, "application/sep-exi":{source:"iana"}, "application/session-info":{source:"iana"}, "application/set-payment":{source:"iana"}, "application/set-payment-initiation":{source:"iana", extensions:["setpay"]}, "application/set-registration":{source:"iana"}, "application/set-registration-initiation":{source:"iana", extensions:["setreg"]}, "application/sgml":{source:"iana"}, "application/sgml-open-catalog":{source:"iana"}, "application/shf+xml":{source:"iana", 
compressible:!0, extensions:["shf"]}, "application/sieve":{source:"iana", extensions:["siv", "sieve"]}, "application/simple-filter+xml":{source:"iana", compressible:!0}, "application/simple-message-summary":{source:"iana"}, "application/simplesymbolcontainer":{source:"iana"}, "application/slate":{source:"iana"}, "application/smil":{source:"iana"}, "application/smil+xml":{source:"iana", compressible:!0, extensions:["smi", "smil"]}, "application/smpte336m":{source:"iana"}, "application/soap+fastinfoset":{source:"iana"}, 
"application/soap+xml":{source:"iana", compressible:!0}, "application/sparql-query":{source:"iana", extensions:["rq"]}, "application/sparql-results+xml":{source:"iana", compressible:!0, extensions:["srx"]}, "application/spirits-event+xml":{source:"iana", compressible:!0}, "application/sql":{source:"iana"}, "application/srgs":{source:"iana", extensions:["gram"]}, "application/srgs+xml":{source:"iana", compressible:!0, extensions:["grxml"]}, "application/sru+xml":{source:"iana", compressible:!0, extensions:["sru"]}, 
"application/ssdl+xml":{source:"apache", compressible:!0, extensions:["ssdl"]}, "application/ssml+xml":{source:"iana", compressible:!0, extensions:["ssml"]}, "application/stix+json":{source:"iana", compressible:!0}, "application/tamp-apex-update":{source:"iana"}, "application/tamp-apex-update-confirm":{source:"iana"}, "application/tamp-community-update":{source:"iana"}, "application/tamp-community-update-confirm":{source:"iana"}, "application/tamp-error":{source:"iana"}, "application/tamp-sequence-adjust":{source:"iana"}, 
"application/tamp-sequence-adjust-confirm":{source:"iana"}, "application/tamp-status-query":{source:"iana"}, "application/tamp-status-response":{source:"iana"}, "application/tamp-update":{source:"iana"}, "application/tamp-update-confirm":{source:"iana"}, "application/tar":{compressible:!0}, "application/taxii+json":{source:"iana", compressible:!0}, "application/tei+xml":{source:"iana", compressible:!0, extensions:["tei", "teicorpus"]}, "application/tetra_isi":{source:"iana"}, "application/thraud+xml":{source:"iana", 
compressible:!0, extensions:["tfi"]}, "application/timestamp-query":{source:"iana"}, "application/timestamp-reply":{source:"iana"}, "application/timestamped-data":{source:"iana", extensions:["tsd"]}, "application/tlsrpt+gzip":{source:"iana"}, "application/tlsrpt+json":{source:"iana", compressible:!0}, "application/tnauthlist":{source:"iana"}, "application/trickle-ice-sdpfrag":{source:"iana"}, "application/trig":{source:"iana"}, "application/ttml+xml":{source:"iana", compressible:!0}, "application/tve-trigger":{source:"iana"}, 
"application/tzif":{source:"iana"}, "application/tzif-leap":{source:"iana"}, "application/ulpfec":{source:"iana"}, "application/urc-grpsheet+xml":{source:"iana", compressible:!0}, "application/urc-ressheet+xml":{source:"iana", compressible:!0}, "application/urc-targetdesc+xml":{source:"iana", compressible:!0}, "application/urc-uisocketdesc+xml":{source:"iana", compressible:!0}, "application/vcard+json":{source:"iana", compressible:!0}, "application/vcard+xml":{source:"iana", compressible:!0}, "application/vemmi":{source:"iana"}, 
"application/vividence.scriptfile":{source:"apache"}, "application/vnd.1000minds.decision-model+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp-prose+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp-prose-pc3ch+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp-v2x-local-service-information":{source:"iana"}, "application/vnd.3gpp.access-transfer-events+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.bsf+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.gmop+xml":{source:"iana", 
compressible:!0}, "application/vnd.3gpp.mc-signalling-ear":{source:"iana"}, "application/vnd.3gpp.mcdata-affiliation-command+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcdata-info+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcdata-payload":{source:"iana"}, "application/vnd.3gpp.mcdata-service-config+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcdata-signalling":{source:"iana"}, "application/vnd.3gpp.mcdata-ue-config+xml":{source:"iana", compressible:!0}, 
"application/vnd.3gpp.mcdata-user-profile+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcptt-affiliation-command+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcptt-floor-request+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcptt-info+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcptt-location-info+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcptt-mbms-usage-info+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcptt-service-config+xml":{source:"iana", 
compressible:!0}, "application/vnd.3gpp.mcptt-signed+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcptt-ue-config+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcptt-ue-init-config+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcptt-user-profile+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcvideo-affiliation-command+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcvideo-affiliation-info+xml":{source:"iana", compressible:!0}, 
"application/vnd.3gpp.mcvideo-location-info+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcvideo-service-config+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcvideo-transmission-request+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcvideo-ue-config+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.mcvideo-user-profile+xml":{source:"iana", compressible:!0}, 
"application/vnd.3gpp.mid-call+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.pic-bw-large":{source:"iana", extensions:["plb"]}, "application/vnd.3gpp.pic-bw-small":{source:"iana", extensions:["psb"]}, "application/vnd.3gpp.pic-bw-var":{source:"iana", extensions:["pvb"]}, "application/vnd.3gpp.sms":{source:"iana"}, "application/vnd.3gpp.sms+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.srvcc-ext+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.srvcc-info+xml":{source:"iana", 
compressible:!0}, "application/vnd.3gpp.state-and-event-info+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp.ussd+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp2.bcmcsinfo+xml":{source:"iana", compressible:!0}, "application/vnd.3gpp2.sms":{source:"iana"}, "application/vnd.3gpp2.tcap":{source:"iana", extensions:["tcap"]}, "application/vnd.3lightssoftware.imagescal":{source:"iana"}, "application/vnd.3m.post-it-notes":{source:"iana", extensions:["pwn"]}, "application/vnd.accpac.simply.aso":{source:"iana", 
extensions:["aso"]}, "application/vnd.accpac.simply.imp":{source:"iana", extensions:["imp"]}, "application/vnd.acucobol":{source:"iana", extensions:["acu"]}, "application/vnd.acucorp":{source:"iana", extensions:["atc", "acutc"]}, "application/vnd.adobe.air-application-installer-package+zip":{source:"apache", compressible:!1, extensions:["air"]}, "application/vnd.adobe.flash.movie":{source:"iana"}, "application/vnd.adobe.formscentral.fcdt":{source:"iana", extensions:["fcdt"]}, "application/vnd.adobe.fxp":{source:"iana", 
extensions:["fxp", "fxpl"]}, "application/vnd.adobe.partial-upload":{source:"iana"}, "application/vnd.adobe.xdp+xml":{source:"iana", compressible:!0, extensions:["xdp"]}, "application/vnd.adobe.xfdf":{source:"iana", extensions:["xfdf"]}, "application/vnd.aether.imp":{source:"iana"}, "application/vnd.afpc.afplinedata":{source:"iana"}, "application/vnd.afpc.modca":{source:"iana"}, "application/vnd.ah-barcode":{source:"iana"}, "application/vnd.ahead.space":{source:"iana", extensions:["ahead"]}, "application/vnd.airzip.filesecure.azf":{source:"iana", 
extensions:["azf"]}, "application/vnd.airzip.filesecure.azs":{source:"iana", extensions:["azs"]}, "application/vnd.amadeus+json":{source:"iana", compressible:!0}, "application/vnd.amazon.ebook":{source:"apache", extensions:["azw"]}, "application/vnd.amazon.mobi8-ebook":{source:"iana"}, "application/vnd.americandynamics.acc":{source:"iana", extensions:["acc"]}, "application/vnd.amiga.ami":{source:"iana", extensions:["ami"]}, "application/vnd.amundsen.maze+xml":{source:"iana", compressible:!0}, "application/vnd.android.package-archive":{source:"apache", 
compressible:!1, extensions:["apk"]}, "application/vnd.anki":{source:"iana"}, "application/vnd.anser-web-certificate-issue-initiation":{source:"iana", extensions:["cii"]}, "application/vnd.anser-web-funds-transfer-initiation":{source:"apache", extensions:["fti"]}, "application/vnd.antix.game-component":{source:"iana", extensions:["atx"]}, "application/vnd.apache.thrift.binary":{source:"iana"}, "application/vnd.apache.thrift.compact":{source:"iana"}, "application/vnd.apache.thrift.json":{source:"iana"}, 
"application/vnd.api+json":{source:"iana", compressible:!0}, "application/vnd.apothekende.reservation+json":{source:"iana", compressible:!0}, "application/vnd.apple.installer+xml":{source:"iana", compressible:!0, extensions:["mpkg"]}, "application/vnd.apple.keynote":{source:"iana", extensions:["keynote"]}, "application/vnd.apple.mpegurl":{source:"iana", extensions:["m3u8"]}, "application/vnd.apple.numbers":{source:"iana", extensions:["numbers"]}, "application/vnd.apple.pages":{source:"iana", extensions:["pages"]}, 
"application/vnd.apple.pkpass":{compressible:!1, extensions:["pkpass"]}, "application/vnd.arastra.swi":{source:"iana"}, "application/vnd.aristanetworks.swi":{source:"iana", extensions:["swi"]}, "application/vnd.artisan+json":{source:"iana", compressible:!0}, "application/vnd.artsquare":{source:"iana"}, "application/vnd.astraea-software.iota":{source:"iana", extensions:["iota"]}, "application/vnd.audiograph":{source:"iana", extensions:["aep"]}, "application/vnd.autopackage":{source:"iana"}, "application/vnd.avalon+json":{source:"iana", 
compressible:!0}, "application/vnd.avistar+xml":{source:"iana", compressible:!0}, "application/vnd.balsamiq.bmml+xml":{source:"iana", compressible:!0}, "application/vnd.balsamiq.bmpr":{source:"iana"}, "application/vnd.banana-accounting":{source:"iana"}, "application/vnd.bbf.usp.msg":{source:"iana"}, "application/vnd.bbf.usp.msg+json":{source:"iana", compressible:!0}, "application/vnd.bekitzur-stech+json":{source:"iana", compressible:!0}, "application/vnd.bint.med-content":{source:"iana"}, "application/vnd.biopax.rdf+xml":{source:"iana", 
compressible:!0}, "application/vnd.blink-idb-value-wrapper":{source:"iana"}, "application/vnd.blueice.multipass":{source:"iana", extensions:["mpm"]}, "application/vnd.bluetooth.ep.oob":{source:"iana"}, "application/vnd.bluetooth.le.oob":{source:"iana"}, "application/vnd.bmi":{source:"iana", extensions:["bmi"]}, "application/vnd.businessobjects":{source:"iana", extensions:["rep"]}, "application/vnd.byu.uapi+json":{source:"iana", compressible:!0}, "application/vnd.cab-jscript":{source:"iana"}, "application/vnd.canon-cpdl":{source:"iana"}, 
"application/vnd.canon-lips":{source:"iana"}, "application/vnd.capasystems-pg+json":{source:"iana", compressible:!0}, "application/vnd.cendio.thinlinc.clientconf":{source:"iana"}, "application/vnd.century-systems.tcp_stream":{source:"iana"}, "application/vnd.chemdraw+xml":{source:"iana", compressible:!0, extensions:["cdxml"]}, "application/vnd.chess-pgn":{source:"iana"}, "application/vnd.chipnuts.karaoke-mmd":{source:"iana", extensions:["mmd"]}, "application/vnd.cinderella":{source:"iana", extensions:["cdy"]}, 
"application/vnd.cirpack.isdn-ext":{source:"iana"}, "application/vnd.citationstyles.style+xml":{source:"iana", compressible:!0, extensions:["csl"]}, "application/vnd.claymore":{source:"iana", extensions:["cla"]}, "application/vnd.cloanto.rp9":{source:"iana", extensions:["rp9"]}, "application/vnd.clonk.c4group":{source:"iana", extensions:["c4g", "c4d", "c4f", "c4p", "c4u"]}, "application/vnd.cluetrust.cartomobile-config":{source:"iana", extensions:["c11amc"]}, "application/vnd.cluetrust.cartomobile-config-pkg":{source:"iana", 
extensions:["c11amz"]}, "application/vnd.coffeescript":{source:"iana"}, "application/vnd.collabio.xodocuments.document":{source:"iana"}, "application/vnd.collabio.xodocuments.document-template":{source:"iana"}, "application/vnd.collabio.xodocuments.presentation":{source:"iana"}, "application/vnd.collabio.xodocuments.presentation-template":{source:"iana"}, "application/vnd.collabio.xodocuments.spreadsheet":{source:"iana"}, "application/vnd.collabio.xodocuments.spreadsheet-template":{source:"iana"}, 
"application/vnd.collection+json":{source:"iana", compressible:!0}, "application/vnd.collection.doc+json":{source:"iana", compressible:!0}, "application/vnd.collection.next+json":{source:"iana", compressible:!0}, "application/vnd.comicbook+zip":{source:"iana", compressible:!1}, "application/vnd.comicbook-rar":{source:"iana"}, "application/vnd.commerce-battelle":{source:"iana"}, "application/vnd.commonspace":{source:"iana", extensions:["csp"]}, "application/vnd.contact.cmsg":{source:"iana", extensions:["cdbcmsg"]}, 
"application/vnd.coreos.ignition+json":{source:"iana", compressible:!0}, "application/vnd.cosmocaller":{source:"iana", extensions:["cmc"]}, "application/vnd.crick.clicker":{source:"iana", extensions:["clkx"]}, "application/vnd.crick.clicker.keyboard":{source:"iana", extensions:["clkk"]}, "application/vnd.crick.clicker.palette":{source:"iana", extensions:["clkp"]}, "application/vnd.crick.clicker.template":{source:"iana", extensions:["clkt"]}, "application/vnd.crick.clicker.wordbank":{source:"iana", 
extensions:["clkw"]}, "application/vnd.criticaltools.wbs+xml":{source:"iana", compressible:!0, extensions:["wbs"]}, "application/vnd.ctc-posml":{source:"iana", extensions:["pml"]}, "application/vnd.ctct.ws+xml":{source:"iana", compressible:!0}, "application/vnd.cups-pdf":{source:"iana"}, "application/vnd.cups-postscript":{source:"iana"}, "application/vnd.cups-ppd":{source:"iana", extensions:["ppd"]}, "application/vnd.cups-raster":{source:"iana"}, "application/vnd.cups-raw":{source:"iana"}, "application/vnd.curl":{source:"iana"}, 
"application/vnd.curl.car":{source:"apache", extensions:["car"]}, "application/vnd.curl.pcurl":{source:"apache", extensions:["pcurl"]}, "application/vnd.cyan.dean.root+xml":{source:"iana", compressible:!0}, "application/vnd.cybank":{source:"iana"}, "application/vnd.d2l.coursepackage1p0+zip":{source:"iana", compressible:!1}, "application/vnd.dart":{source:"iana", compressible:!0, extensions:["dart"]}, "application/vnd.data-vision.rdz":{source:"iana", extensions:["rdz"]}, "application/vnd.datapackage+json":{source:"iana", 
compressible:!0}, "application/vnd.dataresource+json":{source:"iana", compressible:!0}, "application/vnd.debian.binary-package":{source:"iana"}, "application/vnd.dece.data":{source:"iana", extensions:["uvf", "uvvf", "uvd", "uvvd"]}, "application/vnd.dece.ttml+xml":{source:"iana", compressible:!0, extensions:["uvt", "uvvt"]}, "application/vnd.dece.unspecified":{source:"iana", extensions:["uvx", "uvvx"]}, "application/vnd.dece.zip":{source:"iana", extensions:["uvz", "uvvz"]}, "application/vnd.denovo.fcselayout-link":{source:"iana", 
extensions:["fe_launch"]}, "application/vnd.desmume.movie":{source:"iana"}, "application/vnd.dir-bi.plate-dl-nosuffix":{source:"iana"}, "application/vnd.dm.delegation+xml":{source:"iana", compressible:!0}, "application/vnd.dna":{source:"iana", extensions:["dna"]}, "application/vnd.document+json":{source:"iana", compressible:!0}, "application/vnd.dolby.mlp":{source:"apache", extensions:["mlp"]}, "application/vnd.dolby.mobile.1":{source:"iana"}, "application/vnd.dolby.mobile.2":{source:"iana"}, "application/vnd.doremir.scorecloud-binary-document":{source:"iana"}, 
"application/vnd.dpgraph":{source:"iana", extensions:["dpg"]}, "application/vnd.dreamfactory":{source:"iana", extensions:["dfac"]}, "application/vnd.drive+json":{source:"iana", compressible:!0}, "application/vnd.ds-keypoint":{source:"apache", extensions:["kpxx"]}, "application/vnd.dtg.local":{source:"iana"}, "application/vnd.dtg.local.flash":{source:"iana"}, "application/vnd.dtg.local.html":{source:"iana"}, "application/vnd.dvb.ait":{source:"iana", extensions:["ait"]}, "application/vnd.dvb.dvbj":{source:"iana"}, 
"application/vnd.dvb.esgcontainer":{source:"iana"}, "application/vnd.dvb.ipdcdftnotifaccess":{source:"iana"}, "application/vnd.dvb.ipdcesgaccess":{source:"iana"}, "application/vnd.dvb.ipdcesgaccess2":{source:"iana"}, "application/vnd.dvb.ipdcesgpdd":{source:"iana"}, "application/vnd.dvb.ipdcroaming":{source:"iana"}, "application/vnd.dvb.iptv.alfec-base":{source:"iana"}, "application/vnd.dvb.iptv.alfec-enhancement":{source:"iana"}, "application/vnd.dvb.notif-aggregate-root+xml":{source:"iana", compressible:!0}, 
"application/vnd.dvb.notif-container+xml":{source:"iana", compressible:!0}, "application/vnd.dvb.notif-generic+xml":{source:"iana", compressible:!0}, "application/vnd.dvb.notif-ia-msglist+xml":{source:"iana", compressible:!0}, "application/vnd.dvb.notif-ia-registration-request+xml":{source:"iana", compressible:!0}, "application/vnd.dvb.notif-ia-registration-response+xml":{source:"iana", compressible:!0}, "application/vnd.dvb.notif-init+xml":{source:"iana", compressible:!0}, "application/vnd.dvb.pfr":{source:"iana"}, 
"application/vnd.dvb.service":{source:"iana", extensions:["svc"]}, "application/vnd.dxr":{source:"iana"}, "application/vnd.dynageo":{source:"iana", extensions:["geo"]}, "application/vnd.dzr":{source:"iana"}, "application/vnd.easykaraoke.cdgdownload":{source:"iana"}, "application/vnd.ecdis-update":{source:"iana"}, "application/vnd.ecip.rlp":{source:"iana"}, "application/vnd.ecowin.chart":{source:"iana", extensions:["mag"]}, "application/vnd.ecowin.filerequest":{source:"iana"}, "application/vnd.ecowin.fileupdate":{source:"iana"}, 
"application/vnd.ecowin.series":{source:"iana"}, "application/vnd.ecowin.seriesrequest":{source:"iana"}, "application/vnd.ecowin.seriesupdate":{source:"iana"}, "application/vnd.efi.img":{source:"iana"}, "application/vnd.efi.iso":{source:"iana"}, "application/vnd.emclient.accessrequest+xml":{source:"iana", compressible:!0}, "application/vnd.enliven":{source:"iana", extensions:["nml"]}, "application/vnd.enphase.envoy":{source:"iana"}, "application/vnd.eprints.data+xml":{source:"iana", compressible:!0}, 
"application/vnd.epson.esf":{source:"iana", extensions:["esf"]}, "application/vnd.epson.msf":{source:"iana", extensions:["msf"]}, "application/vnd.epson.quickanime":{source:"iana", extensions:["qam"]}, "application/vnd.epson.salt":{source:"iana", extensions:["slt"]}, "application/vnd.epson.ssf":{source:"iana", extensions:["ssf"]}, "application/vnd.ericsson.quickcall":{source:"iana"}, "application/vnd.espass-espass+zip":{source:"iana", compressible:!1}, "application/vnd.eszigno3+xml":{source:"iana", 
compressible:!0, extensions:["es3", "et3"]}, "application/vnd.etsi.aoc+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.asic-e+zip":{source:"iana", compressible:!1}, "application/vnd.etsi.asic-s+zip":{source:"iana", compressible:!1}, "application/vnd.etsi.cug+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.iptvcommand+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.iptvdiscovery+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.iptvprofile+xml":{source:"iana", 
compressible:!0}, "application/vnd.etsi.iptvsad-bc+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.iptvsad-cod+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.iptvsad-npvr+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.iptvservice+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.iptvsync+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.iptvueprofile+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.mcid+xml":{source:"iana", 
compressible:!0}, "application/vnd.etsi.mheg5":{source:"iana"}, "application/vnd.etsi.overload-control-policy-dataset+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.pstn+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.sci+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.simservs+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.timestamp-token":{source:"iana"}, "application/vnd.etsi.tsl+xml":{source:"iana", compressible:!0}, "application/vnd.etsi.tsl.der":{source:"iana"}, 
"application/vnd.eudora.data":{source:"iana"}, "application/vnd.evolv.ecig.profile":{source:"iana"}, "application/vnd.evolv.ecig.settings":{source:"iana"}, "application/vnd.evolv.ecig.theme":{source:"iana"}, "application/vnd.exstream-empower+zip":{source:"iana", compressible:!1}, "application/vnd.exstream-package":{source:"iana"}, "application/vnd.ezpix-album":{source:"iana", extensions:["ez2"]}, "application/vnd.ezpix-package":{source:"iana", extensions:["ez3"]}, "application/vnd.f-secure.mobile":{source:"iana"}, 
"application/vnd.fastcopy-disk-image":{source:"iana"}, "application/vnd.fdf":{source:"iana", extensions:["fdf"]}, "application/vnd.fdsn.mseed":{source:"iana", extensions:["mseed"]}, "application/vnd.fdsn.seed":{source:"iana", extensions:["seed", "dataless"]}, "application/vnd.ffsns":{source:"iana"}, "application/vnd.filmit.zfc":{source:"iana"}, "application/vnd.fints":{source:"iana"}, "application/vnd.firemonkeys.cloudcell":{source:"iana"}, "application/vnd.flographit":{source:"iana", extensions:["gph"]}, 
"application/vnd.fluxtime.clip":{source:"iana", extensions:["ftc"]}, "application/vnd.font-fontforge-sfd":{source:"iana"}, "application/vnd.framemaker":{source:"iana", extensions:["fm", "frame", "maker", "book"]}, "application/vnd.frogans.fnc":{source:"iana", extensions:["fnc"]}, "application/vnd.frogans.ltf":{source:"iana", extensions:["ltf"]}, "application/vnd.fsc.weblaunch":{source:"iana", extensions:["fsc"]}, "application/vnd.fujitsu.oasys":{source:"iana", extensions:["oas"]}, "application/vnd.fujitsu.oasys2":{source:"iana", 
extensions:["oa2"]}, "application/vnd.fujitsu.oasys3":{source:"iana", extensions:["oa3"]}, "application/vnd.fujitsu.oasysgp":{source:"iana", extensions:["fg5"]}, "application/vnd.fujitsu.oasysprs":{source:"iana", extensions:["bh2"]}, "application/vnd.fujixerox.art-ex":{source:"iana"}, "application/vnd.fujixerox.art4":{source:"iana"}, "application/vnd.fujixerox.ddd":{source:"iana", extensions:["ddd"]}, "application/vnd.fujixerox.docuworks":{source:"iana", extensions:["xdw"]}, "application/vnd.fujixerox.docuworks.binder":{source:"iana", 
extensions:["xbd"]}, "application/vnd.fujixerox.docuworks.container":{source:"iana"}, "application/vnd.fujixerox.hbpl":{source:"iana"}, "application/vnd.fut-misnet":{source:"iana"}, "application/vnd.futoin+cbor":{source:"iana"}, "application/vnd.futoin+json":{source:"iana", compressible:!0}, "application/vnd.fuzzysheet":{source:"iana", extensions:["fzs"]}, "application/vnd.genomatix.tuxedo":{source:"iana", extensions:["txd"]}, "application/vnd.geo+json":{source:"iana", compressible:!0}, "application/vnd.geocube+xml":{source:"iana", 
compressible:!0}, "application/vnd.geogebra.file":{source:"iana", extensions:["ggb"]}, "application/vnd.geogebra.tool":{source:"iana", extensions:["ggt"]}, "application/vnd.geometry-explorer":{source:"iana", extensions:["gex", "gre"]}, "application/vnd.geonext":{source:"iana", extensions:["gxt"]}, "application/vnd.geoplan":{source:"iana", extensions:["g2w"]}, "application/vnd.geospace":{source:"iana", extensions:["g3w"]}, "application/vnd.gerber":{source:"iana"}, "application/vnd.globalplatform.card-content-mgt":{source:"iana"}, 
"application/vnd.globalplatform.card-content-mgt-response":{source:"iana"}, "application/vnd.gmx":{source:"iana", extensions:["gmx"]}, "application/vnd.google-apps.document":{compressible:!1, extensions:["gdoc"]}, "application/vnd.google-apps.presentation":{compressible:!1, extensions:["gslides"]}, "application/vnd.google-apps.spreadsheet":{compressible:!1, extensions:["gsheet"]}, "application/vnd.google-earth.kml+xml":{source:"iana", compressible:!0, extensions:["kml"]}, "application/vnd.google-earth.kmz":{source:"iana", 
compressible:!1, extensions:["kmz"]}, "application/vnd.gov.sk.e-form+xml":{source:"iana", compressible:!0}, "application/vnd.gov.sk.e-form+zip":{source:"iana", compressible:!1}, "application/vnd.gov.sk.xmldatacontainer+xml":{source:"iana", compressible:!0}, "application/vnd.grafeq":{source:"iana", extensions:["gqf", "gqs"]}, "application/vnd.gridmp":{source:"iana"}, "application/vnd.groove-account":{source:"iana", extensions:["gac"]}, "application/vnd.groove-help":{source:"iana", extensions:["ghf"]}, 
"application/vnd.groove-identity-message":{source:"iana", extensions:["gim"]}, "application/vnd.groove-injector":{source:"iana", extensions:["grv"]}, "application/vnd.groove-tool-message":{source:"iana", extensions:["gtm"]}, "application/vnd.groove-tool-template":{source:"iana", extensions:["tpl"]}, "application/vnd.groove-vcard":{source:"iana", extensions:["vcg"]}, "application/vnd.hal+json":{source:"iana", compressible:!0}, "application/vnd.hal+xml":{source:"iana", compressible:!0, extensions:["hal"]}, 
"application/vnd.handheld-entertainment+xml":{source:"iana", compressible:!0, extensions:["zmm"]}, "application/vnd.hbci":{source:"iana", extensions:["hbci"]}, "application/vnd.hc+json":{source:"iana", compressible:!0}, "application/vnd.hcl-bireports":{source:"iana"}, "application/vnd.hdt":{source:"iana"}, "application/vnd.heroku+json":{source:"iana", compressible:!0}, "application/vnd.hhe.lesson-player":{source:"iana", extensions:["les"]}, "application/vnd.hp-hpgl":{source:"iana", extensions:["hpgl"]}, 
"application/vnd.hp-hpid":{source:"iana", extensions:["hpid"]}, "application/vnd.hp-hps":{source:"iana", extensions:["hps"]}, "application/vnd.hp-jlyt":{source:"iana", extensions:["jlt"]}, "application/vnd.hp-pcl":{source:"iana", extensions:["pcl"]}, "application/vnd.hp-pclxl":{source:"iana", extensions:["pclxl"]}, "application/vnd.httphone":{source:"iana"}, "application/vnd.hydrostatix.sof-data":{source:"iana", extensions:["sfd-hdstx"]}, "application/vnd.hyper+json":{source:"iana", compressible:!0}, 
"application/vnd.hyper-item+json":{source:"iana", compressible:!0}, "application/vnd.hyperdrive+json":{source:"iana", compressible:!0}, "application/vnd.hzn-3d-crossword":{source:"iana"}, "application/vnd.ibm.afplinedata":{source:"iana"}, "application/vnd.ibm.electronic-media":{source:"iana"}, "application/vnd.ibm.minipay":{source:"iana", extensions:["mpy"]}, "application/vnd.ibm.modcap":{source:"iana", extensions:["afp", "listafp", "list3820"]}, "application/vnd.ibm.rights-management":{source:"iana", 
extensions:["irm"]}, "application/vnd.ibm.secure-container":{source:"iana", extensions:["sc"]}, "application/vnd.iccprofile":{source:"iana", extensions:["icc", "icm"]}, "application/vnd.ieee.1905":{source:"iana"}, "application/vnd.igloader":{source:"iana", extensions:["igl"]}, "application/vnd.imagemeter.folder+zip":{source:"iana", compressible:!1}, "application/vnd.imagemeter.image+zip":{source:"iana", compressible:!1}, "application/vnd.immervision-ivp":{source:"iana", extensions:["ivp"]}, "application/vnd.immervision-ivu":{source:"iana", 
extensions:["ivu"]}, "application/vnd.ims.imsccv1p1":{source:"iana"}, "application/vnd.ims.imsccv1p2":{source:"iana"}, "application/vnd.ims.imsccv1p3":{source:"iana"}, "application/vnd.ims.lis.v2.result+json":{source:"iana", compressible:!0}, "application/vnd.ims.lti.v2.toolconsumerprofile+json":{source:"iana", compressible:!0}, "application/vnd.ims.lti.v2.toolproxy+json":{source:"iana", compressible:!0}, "application/vnd.ims.lti.v2.toolproxy.id+json":{source:"iana", compressible:!0}, "application/vnd.ims.lti.v2.toolsettings+json":{source:"iana", 
compressible:!0}, "application/vnd.ims.lti.v2.toolsettings.simple+json":{source:"iana", compressible:!0}, "application/vnd.informedcontrol.rms+xml":{source:"iana", compressible:!0}, "application/vnd.informix-visionary":{source:"iana"}, "application/vnd.infotech.project":{source:"iana"}, "application/vnd.infotech.project+xml":{source:"iana", compressible:!0}, "application/vnd.innopath.wamp.notification":{source:"iana"}, "application/vnd.insors.igm":{source:"iana", extensions:["igm"]}, "application/vnd.intercon.formnet":{source:"iana", 
extensions:["xpw", "xpx"]}, "application/vnd.intergeo":{source:"iana", extensions:["i2g"]}, "application/vnd.intertrust.digibox":{source:"iana"}, "application/vnd.intertrust.nncp":{source:"iana"}, "application/vnd.intu.qbo":{source:"iana", extensions:["qbo"]}, "application/vnd.intu.qfx":{source:"iana", extensions:["qfx"]}, "application/vnd.iptc.g2.catalogitem+xml":{source:"iana", compressible:!0}, "application/vnd.iptc.g2.conceptitem+xml":{source:"iana", compressible:!0}, "application/vnd.iptc.g2.knowledgeitem+xml":{source:"iana", 
compressible:!0}, "application/vnd.iptc.g2.newsitem+xml":{source:"iana", compressible:!0}, "application/vnd.iptc.g2.newsmessage+xml":{source:"iana", compressible:!0}, "application/vnd.iptc.g2.packageitem+xml":{source:"iana", compressible:!0}, "application/vnd.iptc.g2.planningitem+xml":{source:"iana", compressible:!0}, "application/vnd.ipunplugged.rcprofile":{source:"iana", extensions:["rcprofile"]}, "application/vnd.irepository.package+xml":{source:"iana", compressible:!0, extensions:["irp"]}, "application/vnd.is-xpr":{source:"iana", 
extensions:["xpr"]}, "application/vnd.isac.fcs":{source:"iana", extensions:["fcs"]}, "application/vnd.jam":{source:"iana", extensions:["jam"]}, "application/vnd.japannet-directory-service":{source:"iana"}, "application/vnd.japannet-jpnstore-wakeup":{source:"iana"}, "application/vnd.japannet-payment-wakeup":{source:"iana"}, "application/vnd.japannet-registration":{source:"iana"}, "application/vnd.japannet-registration-wakeup":{source:"iana"}, "application/vnd.japannet-setstore-wakeup":{source:"iana"}, 
"application/vnd.japannet-verification":{source:"iana"}, "application/vnd.japannet-verification-wakeup":{source:"iana"}, "application/vnd.jcp.javame.midlet-rms":{source:"iana", extensions:["rms"]}, "application/vnd.jisp":{source:"iana", extensions:["jisp"]}, "application/vnd.joost.joda-archive":{source:"iana", extensions:["joda"]}, "application/vnd.jsk.isdn-ngn":{source:"iana"}, "application/vnd.kahootz":{source:"iana", extensions:["ktz", "ktr"]}, "application/vnd.kde.karbon":{source:"iana", extensions:["karbon"]}, 
"application/vnd.kde.kchart":{source:"iana", extensions:["chrt"]}, "application/vnd.kde.kformula":{source:"iana", extensions:["kfo"]}, "application/vnd.kde.kivio":{source:"iana", extensions:["flw"]}, "application/vnd.kde.kontour":{source:"iana", extensions:["kon"]}, "application/vnd.kde.kpresenter":{source:"iana", extensions:["kpr", "kpt"]}, "application/vnd.kde.kspread":{source:"iana", extensions:["ksp"]}, "application/vnd.kde.kword":{source:"iana", extensions:["kwd", "kwt"]}, "application/vnd.kenameaapp":{source:"iana", 
extensions:["htke"]}, "application/vnd.kidspiration":{source:"iana", extensions:["kia"]}, "application/vnd.kinar":{source:"iana", extensions:["kne", "knp"]}, "application/vnd.koan":{source:"iana", extensions:["skp", "skd", "skt", "skm"]}, "application/vnd.kodak-descriptor":{source:"iana", extensions:["sse"]}, "application/vnd.las.las+json":{source:"iana", compressible:!0}, "application/vnd.las.las+xml":{source:"iana", compressible:!0, extensions:["lasxml"]}, "application/vnd.leap+json":{source:"iana", 
compressible:!0}, "application/vnd.liberty-request+xml":{source:"iana", compressible:!0}, "application/vnd.llamagraphics.life-balance.desktop":{source:"iana", extensions:["lbd"]}, "application/vnd.llamagraphics.life-balance.exchange+xml":{source:"iana", compressible:!0, extensions:["lbe"]}, "application/vnd.lotus-1-2-3":{source:"iana", extensions:["123"]}, "application/vnd.lotus-approach":{source:"iana", extensions:["apr"]}, "application/vnd.lotus-freelance":{source:"iana", extensions:["pre"]}, "application/vnd.lotus-notes":{source:"iana", 
extensions:["nsf"]}, "application/vnd.lotus-organizer":{source:"iana", extensions:["org"]}, "application/vnd.lotus-screencam":{source:"iana", extensions:["scm"]}, "application/vnd.lotus-wordpro":{source:"iana", extensions:["lwp"]}, "application/vnd.macports.portpkg":{source:"iana", extensions:["portpkg"]}, "application/vnd.mapbox-vector-tile":{source:"iana"}, "application/vnd.marlin.drm.actiontoken+xml":{source:"iana", compressible:!0}, "application/vnd.marlin.drm.conftoken+xml":{source:"iana", compressible:!0}, 
"application/vnd.marlin.drm.license+xml":{source:"iana", compressible:!0}, "application/vnd.marlin.drm.mdcf":{source:"iana"}, "application/vnd.mason+json":{source:"iana", compressible:!0}, "application/vnd.maxmind.maxmind-db":{source:"iana"}, "application/vnd.mcd":{source:"iana", extensions:["mcd"]}, "application/vnd.medcalcdata":{source:"iana", extensions:["mc1"]}, "application/vnd.mediastation.cdkey":{source:"iana", extensions:["cdkey"]}, "application/vnd.meridian-slingshot":{source:"iana"}, "application/vnd.mfer":{source:"iana", 
extensions:["mwf"]}, "application/vnd.mfmp":{source:"iana", extensions:["mfm"]}, "application/vnd.micro+json":{source:"iana", compressible:!0}, "application/vnd.micrografx.flo":{source:"iana", extensions:["flo"]}, "application/vnd.micrografx.igx":{source:"iana", extensions:["igx"]}, "application/vnd.microsoft.portable-executable":{source:"iana"}, "application/vnd.microsoft.windows.thumbnail-cache":{source:"iana"}, "application/vnd.miele+json":{source:"iana", compressible:!0}, "application/vnd.mif":{source:"iana", 
extensions:["mif"]}, "application/vnd.minisoft-hp3000-save":{source:"iana"}, "application/vnd.mitsubishi.misty-guard.trustweb":{source:"iana"}, "application/vnd.mobius.daf":{source:"iana", extensions:["daf"]}, "application/vnd.mobius.dis":{source:"iana", extensions:["dis"]}, "application/vnd.mobius.mbk":{source:"iana", extensions:["mbk"]}, "application/vnd.mobius.mqy":{source:"iana", extensions:["mqy"]}, "application/vnd.mobius.msl":{source:"iana", extensions:["msl"]}, "application/vnd.mobius.plc":{source:"iana", 
extensions:["plc"]}, "application/vnd.mobius.txf":{source:"iana", extensions:["txf"]}, "application/vnd.mophun.application":{source:"iana", extensions:["mpn"]}, "application/vnd.mophun.certificate":{source:"iana", extensions:["mpc"]}, "application/vnd.motorola.flexsuite":{source:"iana"}, "application/vnd.motorola.flexsuite.adsi":{source:"iana"}, "application/vnd.motorola.flexsuite.fis":{source:"iana"}, "application/vnd.motorola.flexsuite.gotap":{source:"iana"}, "application/vnd.motorola.flexsuite.kmr":{source:"iana"}, 
"application/vnd.motorola.flexsuite.ttc":{source:"iana"}, "application/vnd.motorola.flexsuite.wem":{source:"iana"}, "application/vnd.motorola.iprm":{source:"iana"}, "application/vnd.mozilla.xul+xml":{source:"iana", compressible:!0, extensions:["xul"]}, "application/vnd.ms-3mfdocument":{source:"iana"}, "application/vnd.ms-artgalry":{source:"iana", extensions:["cil"]}, "application/vnd.ms-asf":{source:"iana"}, "application/vnd.ms-cab-compressed":{source:"iana", extensions:["cab"]}, "application/vnd.ms-color.iccprofile":{source:"apache"}, 
"application/vnd.ms-excel":{source:"iana", compressible:!1, extensions:"xls xlm xla xlc xlt xlw".split(" ")}, "application/vnd.ms-excel.addin.macroenabled.12":{source:"iana", extensions:["xlam"]}, "application/vnd.ms-excel.sheet.binary.macroenabled.12":{source:"iana", extensions:["xlsb"]}, "application/vnd.ms-excel.sheet.macroenabled.12":{source:"iana", extensions:["xlsm"]}, "application/vnd.ms-excel.template.macroenabled.12":{source:"iana", extensions:["xltm"]}, "application/vnd.ms-fontobject":{source:"iana", 
compressible:!0, extensions:["eot"]}, "application/vnd.ms-htmlhelp":{source:"iana", extensions:["chm"]}, "application/vnd.ms-ims":{source:"iana", extensions:["ims"]}, "application/vnd.ms-lrm":{source:"iana", extensions:["lrm"]}, "application/vnd.ms-office.activex+xml":{source:"iana", compressible:!0}, "application/vnd.ms-officetheme":{source:"iana", extensions:["thmx"]}, "application/vnd.ms-opentype":{source:"apache", compressible:!0}, "application/vnd.ms-outlook":{compressible:!1, extensions:["msg"]}, 
"application/vnd.ms-package.obfuscated-opentype":{source:"apache"}, "application/vnd.ms-pki.seccat":{source:"apache", extensions:["cat"]}, "application/vnd.ms-pki.stl":{source:"apache", extensions:["stl"]}, "application/vnd.ms-playready.initiator+xml":{source:"iana", compressible:!0}, "application/vnd.ms-powerpoint":{source:"iana", compressible:!1, extensions:["ppt", "pps", "pot"]}, "application/vnd.ms-powerpoint.addin.macroenabled.12":{source:"iana", extensions:["ppam"]}, "application/vnd.ms-powerpoint.presentation.macroenabled.12":{source:"iana", 
extensions:["pptm"]}, "application/vnd.ms-powerpoint.slide.macroenabled.12":{source:"iana", extensions:["sldm"]}, "application/vnd.ms-powerpoint.slideshow.macroenabled.12":{source:"iana", extensions:["ppsm"]}, "application/vnd.ms-powerpoint.template.macroenabled.12":{source:"iana", extensions:["potm"]}, "application/vnd.ms-printdevicecapabilities+xml":{source:"iana", compressible:!0}, "application/vnd.ms-printing.printticket+xml":{source:"apache", compressible:!0}, "application/vnd.ms-printschematicket+xml":{source:"iana", 
compressible:!0}, "application/vnd.ms-project":{source:"iana", extensions:["mpp", "mpt"]}, "application/vnd.ms-tnef":{source:"iana"}, "application/vnd.ms-windows.devicepairing":{source:"iana"}, "application/vnd.ms-windows.nwprinting.oob":{source:"iana"}, "application/vnd.ms-windows.printerpairing":{source:"iana"}, "application/vnd.ms-windows.wsd.oob":{source:"iana"}, "application/vnd.ms-wmdrm.lic-chlg-req":{source:"iana"}, "application/vnd.ms-wmdrm.lic-resp":{source:"iana"}, "application/vnd.ms-wmdrm.meter-chlg-req":{source:"iana"}, 
"application/vnd.ms-wmdrm.meter-resp":{source:"iana"}, "application/vnd.ms-word.document.macroenabled.12":{source:"iana", extensions:["docm"]}, "application/vnd.ms-word.template.macroenabled.12":{source:"iana", extensions:["dotm"]}, "application/vnd.ms-works":{source:"iana", extensions:["wps", "wks", "wcm", "wdb"]}, "application/vnd.ms-wpl":{source:"iana", extensions:["wpl"]}, "application/vnd.ms-xpsdocument":{source:"iana", compressible:!1, extensions:["xps"]}, "application/vnd.msa-disk-image":{source:"iana"}, 
"application/vnd.mseq":{source:"iana", extensions:["mseq"]}, "application/vnd.msign":{source:"iana"}, "application/vnd.multiad.creator":{source:"iana"}, "application/vnd.multiad.creator.cif":{source:"iana"}, "application/vnd.music-niff":{source:"iana"}, "application/vnd.musician":{source:"iana", extensions:["mus"]}, "application/vnd.muvee.style":{source:"iana", extensions:["msty"]}, "application/vnd.mynfc":{source:"iana", extensions:["taglet"]}, "application/vnd.ncd.control":{source:"iana"}, "application/vnd.ncd.reference":{source:"iana"}, 
"application/vnd.nearst.inv+json":{source:"iana", compressible:!0}, "application/vnd.nervana":{source:"iana"}, "application/vnd.netfpx":{source:"iana"}, "application/vnd.neurolanguage.nlu":{source:"iana", extensions:["nlu"]}, "application/vnd.nimn":{source:"iana"}, "application/vnd.nintendo.nitro.rom":{source:"iana"}, "application/vnd.nintendo.snes.rom":{source:"iana"}, "application/vnd.nitf":{source:"iana", extensions:["ntf", "nitf"]}, "application/vnd.noblenet-directory":{source:"iana", extensions:["nnd"]}, 
"application/vnd.noblenet-sealer":{source:"iana", extensions:["nns"]}, "application/vnd.noblenet-web":{source:"iana", extensions:["nnw"]}, "application/vnd.nokia.catalogs":{source:"iana"}, "application/vnd.nokia.conml+wbxml":{source:"iana"}, "application/vnd.nokia.conml+xml":{source:"iana", compressible:!0}, "application/vnd.nokia.iptv.config+xml":{source:"iana", compressible:!0}, "application/vnd.nokia.isds-radio-presets":{source:"iana"}, "application/vnd.nokia.landmark+wbxml":{source:"iana"}, "application/vnd.nokia.landmark+xml":{source:"iana", 
compressible:!0}, "application/vnd.nokia.landmarkcollection+xml":{source:"iana", compressible:!0}, "application/vnd.nokia.n-gage.ac+xml":{source:"iana", compressible:!0}, "application/vnd.nokia.n-gage.data":{source:"iana", extensions:["ngdat"]}, "application/vnd.nokia.n-gage.symbian.install":{source:"iana", extensions:["n-gage"]}, "application/vnd.nokia.ncd":{source:"iana"}, "application/vnd.nokia.pcd+wbxml":{source:"iana"}, "application/vnd.nokia.pcd+xml":{source:"iana", compressible:!0}, "application/vnd.nokia.radio-preset":{source:"iana", 
extensions:["rpst"]}, "application/vnd.nokia.radio-presets":{source:"iana", extensions:["rpss"]}, "application/vnd.novadigm.edm":{source:"iana", extensions:["edm"]}, "application/vnd.novadigm.edx":{source:"iana", extensions:["edx"]}, "application/vnd.novadigm.ext":{source:"iana", extensions:["ext"]}, "application/vnd.ntt-local.content-share":{source:"iana"}, "application/vnd.ntt-local.file-transfer":{source:"iana"}, "application/vnd.ntt-local.ogw_remote-access":{source:"iana"}, "application/vnd.ntt-local.sip-ta_remote":{source:"iana"}, 
"application/vnd.ntt-local.sip-ta_tcp_stream":{source:"iana"}, "application/vnd.oasis.opendocument.chart":{source:"iana", extensions:["odc"]}, "application/vnd.oasis.opendocument.chart-template":{source:"iana", extensions:["otc"]}, "application/vnd.oasis.opendocument.database":{source:"iana", extensions:["odb"]}, "application/vnd.oasis.opendocument.formula":{source:"iana", extensions:["odf"]}, "application/vnd.oasis.opendocument.formula-template":{source:"iana", extensions:["odft"]}, "application/vnd.oasis.opendocument.graphics":{source:"iana", 
compressible:!1, extensions:["odg"]}, "application/vnd.oasis.opendocument.graphics-template":{source:"iana", extensions:["otg"]}, "application/vnd.oasis.opendocument.image":{source:"iana", extensions:["odi"]}, "application/vnd.oasis.opendocument.image-template":{source:"iana", extensions:["oti"]}, "application/vnd.oasis.opendocument.presentation":{source:"iana", compressible:!1, extensions:["odp"]}, "application/vnd.oasis.opendocument.presentation-template":{source:"iana", extensions:["otp"]}, "application/vnd.oasis.opendocument.spreadsheet":{source:"iana", 
compressible:!1, extensions:["ods"]}, "application/vnd.oasis.opendocument.spreadsheet-template":{source:"iana", extensions:["ots"]}, "application/vnd.oasis.opendocument.text":{source:"iana", compressible:!1, extensions:["odt"]}, "application/vnd.oasis.opendocument.text-master":{source:"iana", extensions:["odm"]}, "application/vnd.oasis.opendocument.text-template":{source:"iana", extensions:["ott"]}, "application/vnd.oasis.opendocument.text-web":{source:"iana", extensions:["oth"]}, "application/vnd.obn":{source:"iana"}, 
"application/vnd.ocf+cbor":{source:"iana"}, "application/vnd.oftn.l10n+json":{source:"iana", compressible:!0}, "application/vnd.oipf.contentaccessdownload+xml":{source:"iana", compressible:!0}, "application/vnd.oipf.contentaccessstreaming+xml":{source:"iana", compressible:!0}, "application/vnd.oipf.cspg-hexbinary":{source:"iana"}, "application/vnd.oipf.dae.svg+xml":{source:"iana", compressible:!0}, "application/vnd.oipf.dae.xhtml+xml":{source:"iana", compressible:!0}, "application/vnd.oipf.mippvcontrolmessage+xml":{source:"iana", 
compressible:!0}, "application/vnd.oipf.pae.gem":{source:"iana"}, "application/vnd.oipf.spdiscovery+xml":{source:"iana", compressible:!0}, "application/vnd.oipf.spdlist+xml":{source:"iana", compressible:!0}, "application/vnd.oipf.ueprofile+xml":{source:"iana", compressible:!0}, "application/vnd.oipf.userprofile+xml":{source:"iana", compressible:!0}, "application/vnd.olpc-sugar":{source:"iana", extensions:["xo"]}, "application/vnd.oma-scws-config":{source:"iana"}, "application/vnd.oma-scws-http-request":{source:"iana"}, 
"application/vnd.oma-scws-http-response":{source:"iana"}, "application/vnd.oma.bcast.associated-procedure-parameter+xml":{source:"iana", compressible:!0}, "application/vnd.oma.bcast.drm-trigger+xml":{source:"iana", compressible:!0}, "application/vnd.oma.bcast.imd+xml":{source:"iana", compressible:!0}, "application/vnd.oma.bcast.ltkm":{source:"iana"}, "application/vnd.oma.bcast.notification+xml":{source:"iana", compressible:!0}, "application/vnd.oma.bcast.provisioningtrigger":{source:"iana"}, "application/vnd.oma.bcast.sgboot":{source:"iana"}, 
"application/vnd.oma.bcast.sgdd+xml":{source:"iana", compressible:!0}, "application/vnd.oma.bcast.sgdu":{source:"iana"}, "application/vnd.oma.bcast.simple-symbol-container":{source:"iana"}, "application/vnd.oma.bcast.smartcard-trigger+xml":{source:"iana", compressible:!0}, "application/vnd.oma.bcast.sprov+xml":{source:"iana", compressible:!0}, "application/vnd.oma.bcast.stkm":{source:"iana"}, "application/vnd.oma.cab-address-book+xml":{source:"iana", compressible:!0}, "application/vnd.oma.cab-feature-handler+xml":{source:"iana", 
compressible:!0}, "application/vnd.oma.cab-pcc+xml":{source:"iana", compressible:!0}, "application/vnd.oma.cab-subs-invite+xml":{source:"iana", compressible:!0}, "application/vnd.oma.cab-user-prefs+xml":{source:"iana", compressible:!0}, "application/vnd.oma.dcd":{source:"iana"}, "application/vnd.oma.dcdc":{source:"iana"}, "application/vnd.oma.dd2+xml":{source:"iana", compressible:!0, extensions:["dd2"]}, "application/vnd.oma.drm.risd+xml":{source:"iana", compressible:!0}, "application/vnd.oma.group-usage-list+xml":{source:"iana", 
compressible:!0}, "application/vnd.oma.lwm2m+json":{source:"iana", compressible:!0}, "application/vnd.oma.lwm2m+tlv":{source:"iana"}, "application/vnd.oma.pal+xml":{source:"iana", compressible:!0}, "application/vnd.oma.poc.detailed-progress-report+xml":{source:"iana", compressible:!0}, "application/vnd.oma.poc.final-report+xml":{source:"iana", compressible:!0}, "application/vnd.oma.poc.groups+xml":{source:"iana", compressible:!0}, "application/vnd.oma.poc.invocation-descriptor+xml":{source:"iana", 
compressible:!0}, "application/vnd.oma.poc.optimized-progress-report+xml":{source:"iana", compressible:!0}, "application/vnd.oma.push":{source:"iana"}, "application/vnd.oma.scidm.messages+xml":{source:"iana", compressible:!0}, "application/vnd.oma.xcap-directory+xml":{source:"iana", compressible:!0}, "application/vnd.omads-email+xml":{source:"iana", compressible:!0}, "application/vnd.omads-file+xml":{source:"iana", compressible:!0}, "application/vnd.omads-folder+xml":{source:"iana", compressible:!0}, 
"application/vnd.omaloc-supl-init":{source:"iana"}, "application/vnd.onepager":{source:"iana"}, "application/vnd.onepagertamp":{source:"iana"}, "application/vnd.onepagertamx":{source:"iana"}, "application/vnd.onepagertat":{source:"iana"}, "application/vnd.onepagertatp":{source:"iana"}, "application/vnd.onepagertatx":{source:"iana"}, "application/vnd.openblox.game+xml":{source:"iana", compressible:!0}, "application/vnd.openblox.game-binary":{source:"iana"}, "application/vnd.openeye.oeb":{source:"iana"}, 
"application/vnd.openofficeorg.extension":{source:"apache", extensions:["oxt"]}, "application/vnd.openstreetmap.data+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.custom-properties+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.drawing+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{source:"iana", 
compressible:!0}, "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{source:"iana", 
compressible:!0}, "application/vnd.openxmlformats-officedocument.extended-properties+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{source:"iana", 
compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.presentation":{source:"iana", compressible:!1, extensions:["pptx"]}, "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.slide":{source:"iana", 
extensions:["sldx"]}, "application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.slideshow":{source:"iana", extensions:["ppsx"]}, "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{source:"iana", 
compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.template":{source:"iana", extensions:["potx"]}, "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{source:"iana", 
compressible:!0}, "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{source:"iana", 
compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{source:"iana", 
compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{source:"iana", 
compressible:!1, extensions:["xlsx"]}, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{source:"iana", 
compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.template":{source:"iana", extensions:["xltx"]}, "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{source:"iana", 
compressible:!0}, "application/vnd.openxmlformats-officedocument.theme+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.themeoverride+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.vmldrawing":{source:"iana"}, "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.document":{source:"iana", compressible:!1, 
extensions:["docx"]}, "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{source:"iana", 
compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.template":{source:"iana", 
extensions:["dotx"]}, "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-package.core-properties+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{source:"iana", compressible:!0}, "application/vnd.openxmlformats-package.relationships+xml":{source:"iana", 
compressible:!0}, "application/vnd.oracle.resource+json":{source:"iana", compressible:!0}, "application/vnd.orange.indata":{source:"iana"}, "application/vnd.osa.netdeploy":{source:"iana"}, "application/vnd.osgeo.mapguide.package":{source:"iana", extensions:["mgp"]}, "application/vnd.osgi.bundle":{source:"iana"}, "application/vnd.osgi.dp":{source:"iana", extensions:["dp"]}, "application/vnd.osgi.subsystem":{source:"iana", extensions:["esa"]}, "application/vnd.otps.ct-kip+xml":{source:"iana", compressible:!0}, 
"application/vnd.oxli.countgraph":{source:"iana"}, "application/vnd.pagerduty+json":{source:"iana", compressible:!0}, "application/vnd.palm":{source:"iana", extensions:["pdb", "pqa", "oprc"]}, "application/vnd.panoply":{source:"iana"}, "application/vnd.paos.xml":{source:"iana"}, "application/vnd.patentdive":{source:"iana"}, "application/vnd.patientecommsdoc":{source:"iana"}, "application/vnd.pawaafile":{source:"iana", extensions:["paw"]}, "application/vnd.pcos":{source:"iana"}, "application/vnd.pg.format":{source:"iana", 
extensions:["str"]}, "application/vnd.pg.osasli":{source:"iana", extensions:["ei6"]}, "application/vnd.piaccess.application-licence":{source:"iana"}, "application/vnd.picsel":{source:"iana", extensions:["efif"]}, "application/vnd.pmi.widget":{source:"iana", extensions:["wg"]}, "application/vnd.poc.group-advertisement+xml":{source:"iana", compressible:!0}, "application/vnd.pocketlearn":{source:"iana", extensions:["plf"]}, "application/vnd.powerbuilder6":{source:"iana", extensions:["pbd"]}, "application/vnd.powerbuilder6-s":{source:"iana"}, 
"application/vnd.powerbuilder7":{source:"iana"}, "application/vnd.powerbuilder7-s":{source:"iana"}, "application/vnd.powerbuilder75":{source:"iana"}, "application/vnd.powerbuilder75-s":{source:"iana"}, "application/vnd.preminet":{source:"iana"}, "application/vnd.previewsystems.box":{source:"iana", extensions:["box"]}, "application/vnd.proteus.magazine":{source:"iana", extensions:["mgz"]}, "application/vnd.psfs":{source:"iana"}, "application/vnd.publishare-delta-tree":{source:"iana", extensions:["qps"]}, 
"application/vnd.pvi.ptid1":{source:"iana", extensions:["ptid"]}, "application/vnd.pwg-multiplexed":{source:"iana"}, "application/vnd.pwg-xhtml-print+xml":{source:"iana", compressible:!0}, "application/vnd.qualcomm.brew-app-res":{source:"iana"}, "application/vnd.quarantainenet":{source:"iana"}, "application/vnd.quark.quarkxpress":{source:"iana", extensions:"qxd qxt qwd qwt qxl qxb".split(" ")}, "application/vnd.quobject-quoxdocument":{source:"iana"}, "application/vnd.radisys.moml+xml":{source:"iana", 
compressible:!0}, "application/vnd.radisys.msml+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-audit+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-audit-conf+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-audit-conn+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-audit-dialog+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-audit-stream+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-conf+xml":{source:"iana", 
compressible:!0}, "application/vnd.radisys.msml-dialog+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-dialog-base+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-dialog-fax-detect+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-dialog-group+xml":{source:"iana", compressible:!0}, "application/vnd.radisys.msml-dialog-speech+xml":{source:"iana", compressible:!0}, 
"application/vnd.radisys.msml-dialog-transform+xml":{source:"iana", compressible:!0}, "application/vnd.rainstor.data":{source:"iana"}, "application/vnd.rapid":{source:"iana"}, "application/vnd.rar":{source:"iana"}, "application/vnd.realvnc.bed":{source:"iana", extensions:["bed"]}, "application/vnd.recordare.musicxml":{source:"iana", extensions:["mxl"]}, "application/vnd.recordare.musicxml+xml":{source:"iana", compressible:!0, extensions:["musicxml"]}, "application/vnd.renlearn.rlprint":{source:"iana"}, 
"application/vnd.restful+json":{source:"iana", compressible:!0}, "application/vnd.rig.cryptonote":{source:"iana", extensions:["cryptonote"]}, "application/vnd.rim.cod":{source:"apache", extensions:["cod"]}, "application/vnd.rn-realmedia":{source:"apache", extensions:["rm"]}, "application/vnd.rn-realmedia-vbr":{source:"apache", extensions:["rmvb"]}, "application/vnd.route66.link66+xml":{source:"iana", compressible:!0, extensions:["link66"]}, "application/vnd.rs-274x":{source:"iana"}, "application/vnd.ruckus.download":{source:"iana"}, 
"application/vnd.s3sms":{source:"iana"}, "application/vnd.sailingtracker.track":{source:"iana", extensions:["st"]}, "application/vnd.sbm.cid":{source:"iana"}, "application/vnd.sbm.mid2":{source:"iana"}, "application/vnd.scribus":{source:"iana"}, "application/vnd.sealed.3df":{source:"iana"}, "application/vnd.sealed.csf":{source:"iana"}, "application/vnd.sealed.doc":{source:"iana"}, "application/vnd.sealed.eml":{source:"iana"}, "application/vnd.sealed.mht":{source:"iana"}, "application/vnd.sealed.net":{source:"iana"}, 
"application/vnd.sealed.ppt":{source:"iana"}, "application/vnd.sealed.tiff":{source:"iana"}, "application/vnd.sealed.xls":{source:"iana"}, "application/vnd.sealedmedia.softseal.html":{source:"iana"}, "application/vnd.sealedmedia.softseal.pdf":{source:"iana"}, "application/vnd.seemail":{source:"iana", extensions:["see"]}, "application/vnd.sema":{source:"iana", extensions:["sema"]}, "application/vnd.semd":{source:"iana", extensions:["semd"]}, "application/vnd.semf":{source:"iana", extensions:["semf"]}, 
"application/vnd.shana.informed.formdata":{source:"iana", extensions:["ifm"]}, "application/vnd.shana.informed.formtemplate":{source:"iana", extensions:["itp"]}, "application/vnd.shana.informed.interchange":{source:"iana", extensions:["iif"]}, "application/vnd.shana.informed.package":{source:"iana", extensions:["ipk"]}, "application/vnd.shootproof+json":{source:"iana", compressible:!0}, "application/vnd.sigrok.session":{source:"iana"}, "application/vnd.simtech-mindmapper":{source:"iana", extensions:["twd", 
"twds"]}, "application/vnd.siren+json":{source:"iana", compressible:!0}, "application/vnd.smaf":{source:"iana", extensions:["mmf"]}, "application/vnd.smart.notebook":{source:"iana"}, "application/vnd.smart.teacher":{source:"iana", extensions:["teacher"]}, "application/vnd.software602.filler.form+xml":{source:"iana", compressible:!0}, "application/vnd.software602.filler.form-xml-zip":{source:"iana"}, "application/vnd.solent.sdkm+xml":{source:"iana", compressible:!0, extensions:["sdkm", "sdkd"]}, "application/vnd.spotfire.dxp":{source:"iana", 
extensions:["dxp"]}, "application/vnd.spotfire.sfs":{source:"iana", extensions:["sfs"]}, "application/vnd.sqlite3":{source:"iana"}, "application/vnd.sss-cod":{source:"iana"}, "application/vnd.sss-dtf":{source:"iana"}, "application/vnd.sss-ntf":{source:"iana"}, "application/vnd.stardivision.calc":{source:"apache", extensions:["sdc"]}, "application/vnd.stardivision.draw":{source:"apache", extensions:["sda"]}, "application/vnd.stardivision.impress":{source:"apache", extensions:["sdd"]}, "application/vnd.stardivision.math":{source:"apache", 
extensions:["smf"]}, "application/vnd.stardivision.writer":{source:"apache", extensions:["sdw", "vor"]}, "application/vnd.stardivision.writer-global":{source:"apache", extensions:["sgl"]}, "application/vnd.stepmania.package":{source:"iana", extensions:["smzip"]}, "application/vnd.stepmania.stepchart":{source:"iana", extensions:["sm"]}, "application/vnd.street-stream":{source:"iana"}, "application/vnd.sun.wadl+xml":{source:"iana", compressible:!0, extensions:["wadl"]}, "application/vnd.sun.xml.calc":{source:"apache", 
extensions:["sxc"]}, "application/vnd.sun.xml.calc.template":{source:"apache", extensions:["stc"]}, "application/vnd.sun.xml.draw":{source:"apache", extensions:["sxd"]}, "application/vnd.sun.xml.draw.template":{source:"apache", extensions:["std"]}, "application/vnd.sun.xml.impress":{source:"apache", extensions:["sxi"]}, "application/vnd.sun.xml.impress.template":{source:"apache", extensions:["sti"]}, "application/vnd.sun.xml.math":{source:"apache", extensions:["sxm"]}, "application/vnd.sun.xml.writer":{source:"apache", 
extensions:["sxw"]}, "application/vnd.sun.xml.writer.global":{source:"apache", extensions:["sxg"]}, "application/vnd.sun.xml.writer.template":{source:"apache", extensions:["stw"]}, "application/vnd.sus-calendar":{source:"iana", extensions:["sus", "susp"]}, "application/vnd.svd":{source:"iana", extensions:["svd"]}, "application/vnd.swiftview-ics":{source:"iana"}, "application/vnd.symbian.install":{source:"apache", extensions:["sis", "sisx"]}, "application/vnd.syncml+xml":{source:"iana", compressible:!0, 
extensions:["xsm"]}, "application/vnd.syncml.dm+wbxml":{source:"iana", extensions:["bdm"]}, "application/vnd.syncml.dm+xml":{source:"iana", compressible:!0, extensions:["xdm"]}, "application/vnd.syncml.dm.notification":{source:"iana"}, "application/vnd.syncml.dmddf+wbxml":{source:"iana"}, "application/vnd.syncml.dmddf+xml":{source:"iana", compressible:!0}, "application/vnd.syncml.dmtnds+wbxml":{source:"iana"}, "application/vnd.syncml.dmtnds+xml":{source:"iana", compressible:!0}, "application/vnd.syncml.ds.notification":{source:"iana"}, 
"application/vnd.tableschema+json":{source:"iana", compressible:!0}, "application/vnd.tao.intent-module-archive":{source:"iana", extensions:["tao"]}, "application/vnd.tcpdump.pcap":{source:"iana", extensions:["pcap", "cap", "dmp"]}, "application/vnd.think-cell.ppttc+json":{source:"iana", compressible:!0}, "application/vnd.tmd.mediaflex.api+xml":{source:"iana", compressible:!0}, "application/vnd.tml":{source:"iana"}, "application/vnd.tmobile-livetv":{source:"iana", extensions:["tmo"]}, "application/vnd.tri.onesource":{source:"iana"}, 
"application/vnd.trid.tpt":{source:"iana", extensions:["tpt"]}, "application/vnd.triscape.mxs":{source:"iana", extensions:["mxs"]}, "application/vnd.trueapp":{source:"iana", extensions:["tra"]}, "application/vnd.truedoc":{source:"iana"}, "application/vnd.ubisoft.webplayer":{source:"iana"}, "application/vnd.ufdl":{source:"iana", extensions:["ufd", "ufdl"]}, "application/vnd.uiq.theme":{source:"iana", extensions:["utz"]}, "application/vnd.umajin":{source:"iana", extensions:["umj"]}, "application/vnd.unity":{source:"iana", 
extensions:["unityweb"]}, "application/vnd.uoml+xml":{source:"iana", compressible:!0, extensions:["uoml"]}, "application/vnd.uplanet.alert":{source:"iana"}, "application/vnd.uplanet.alert-wbxml":{source:"iana"}, "application/vnd.uplanet.bearer-choice":{source:"iana"}, "application/vnd.uplanet.bearer-choice-wbxml":{source:"iana"}, "application/vnd.uplanet.cacheop":{source:"iana"}, "application/vnd.uplanet.cacheop-wbxml":{source:"iana"}, "application/vnd.uplanet.channel":{source:"iana"}, "application/vnd.uplanet.channel-wbxml":{source:"iana"}, 
"application/vnd.uplanet.list":{source:"iana"}, "application/vnd.uplanet.list-wbxml":{source:"iana"}, "application/vnd.uplanet.listcmd":{source:"iana"}, "application/vnd.uplanet.listcmd-wbxml":{source:"iana"}, "application/vnd.uplanet.signal":{source:"iana"}, "application/vnd.uri-map":{source:"iana"}, "application/vnd.valve.source.material":{source:"iana"}, "application/vnd.vcx":{source:"iana", extensions:["vcx"]}, "application/vnd.vd-study":{source:"iana"}, "application/vnd.vectorworks":{source:"iana"}, 
"application/vnd.vel+json":{source:"iana", compressible:!0}, "application/vnd.verimatrix.vcas":{source:"iana"}, "application/vnd.veryant.thin":{source:"iana"}, "application/vnd.vidsoft.vidconference":{source:"iana"}, "application/vnd.visio":{source:"iana", extensions:["vsd", "vst", "vss", "vsw"]}, "application/vnd.visionary":{source:"iana", extensions:["vis"]}, "application/vnd.vividence.scriptfile":{source:"iana"}, "application/vnd.vsf":{source:"iana", extensions:["vsf"]}, "application/vnd.wap.sic":{source:"iana"}, 
"application/vnd.wap.slc":{source:"iana"}, "application/vnd.wap.wbxml":{source:"iana", extensions:["wbxml"]}, "application/vnd.wap.wmlc":{source:"iana", extensions:["wmlc"]}, "application/vnd.wap.wmlscriptc":{source:"iana", extensions:["wmlsc"]}, "application/vnd.webturbo":{source:"iana", extensions:["wtb"]}, "application/vnd.wfa.p2p":{source:"iana"}, "application/vnd.wfa.wsc":{source:"iana"}, "application/vnd.windows.devicepairing":{source:"iana"}, "application/vnd.wmc":{source:"iana"}, "application/vnd.wmf.bootstrap":{source:"iana"}, 
"application/vnd.wolfram.mathematica":{source:"iana"}, "application/vnd.wolfram.mathematica.package":{source:"iana"}, "application/vnd.wolfram.player":{source:"iana", extensions:["nbp"]}, "application/vnd.wordperfect":{source:"iana", extensions:["wpd"]}, "application/vnd.wqd":{source:"iana", extensions:["wqd"]}, "application/vnd.wrq-hp3000-labelled":{source:"iana"}, "application/vnd.wt.stf":{source:"iana", extensions:["stf"]}, "application/vnd.wv.csp+wbxml":{source:"iana"}, "application/vnd.wv.csp+xml":{source:"iana", 
compressible:!0}, "application/vnd.wv.ssp+xml":{source:"iana", compressible:!0}, "application/vnd.xacml+json":{source:"iana", compressible:!0}, "application/vnd.xara":{source:"iana", extensions:["xar"]}, "application/vnd.xfdl":{source:"iana", extensions:["xfdl"]}, "application/vnd.xfdl.webform":{source:"iana"}, "application/vnd.xmi+xml":{source:"iana", compressible:!0}, "application/vnd.xmpie.cpkg":{source:"iana"}, "application/vnd.xmpie.dpkg":{source:"iana"}, "application/vnd.xmpie.plan":{source:"iana"}, 
"application/vnd.xmpie.ppkg":{source:"iana"}, "application/vnd.xmpie.xlim":{source:"iana"}, "application/vnd.yamaha.hv-dic":{source:"iana", extensions:["hvd"]}, "application/vnd.yamaha.hv-script":{source:"iana", extensions:["hvs"]}, "application/vnd.yamaha.hv-voice":{source:"iana", extensions:["hvp"]}, "application/vnd.yamaha.openscoreformat":{source:"iana", extensions:["osf"]}, "application/vnd.yamaha.openscoreformat.osfpvg+xml":{source:"iana", compressible:!0, extensions:["osfpvg"]}, "application/vnd.yamaha.remote-setup":{source:"iana"}, 
"application/vnd.yamaha.smaf-audio":{source:"iana", extensions:["saf"]}, "application/vnd.yamaha.smaf-phrase":{source:"iana", extensions:["spf"]}, "application/vnd.yamaha.through-ngn":{source:"iana"}, "application/vnd.yamaha.tunnel-udpencap":{source:"iana"}, "application/vnd.yaoweme":{source:"iana"}, "application/vnd.yellowriver-custom-menu":{source:"iana", extensions:["cmp"]}, "application/vnd.youtube.yt":{source:"iana"}, "application/vnd.zul":{source:"iana", extensions:["zir", "zirz"]}, "application/vnd.zzazz.deck+xml":{source:"iana", 
compressible:!0, extensions:["zaz"]}, "application/voicexml+xml":{source:"iana", compressible:!0, extensions:["vxml"]}, "application/voucher-cms+json":{source:"iana", compressible:!0}, "application/vq-rtcpxr":{source:"iana"}, "application/wasm":{compressible:!0, extensions:["wasm"]}, "application/watcherinfo+xml":{source:"iana", compressible:!0}, "application/webpush-options+json":{source:"iana", compressible:!0}, "application/whoispp-query":{source:"iana"}, "application/whoispp-response":{source:"iana"}, 
"application/widget":{source:"iana", extensions:["wgt"]}, "application/winhlp":{source:"apache", extensions:["hlp"]}, "application/wita":{source:"iana"}, "application/wordperfect5.1":{source:"iana"}, "application/wsdl+xml":{source:"iana", compressible:!0, extensions:["wsdl"]}, "application/wspolicy+xml":{source:"iana", compressible:!0, extensions:["wspolicy"]}, "application/x-7z-compressed":{source:"apache", compressible:!1, extensions:["7z"]}, "application/x-abiword":{source:"apache", extensions:["abw"]}, 
"application/x-ace-compressed":{source:"apache", extensions:["ace"]}, "application/x-amf":{source:"apache"}, "application/x-apple-diskimage":{source:"apache", extensions:["dmg"]}, "application/x-arj":{compressible:!1, extensions:["arj"]}, "application/x-authorware-bin":{source:"apache", extensions:["aab", "x32", "u32", "vox"]}, "application/x-authorware-map":{source:"apache", extensions:["aam"]}, "application/x-authorware-seg":{source:"apache", extensions:["aas"]}, "application/x-bcpio":{source:"apache", 
extensions:["bcpio"]}, "application/x-bdoc":{compressible:!1, extensions:["bdoc"]}, "application/x-bittorrent":{source:"apache", extensions:["torrent"]}, "application/x-blorb":{source:"apache", extensions:["blb", "blorb"]}, "application/x-bzip":{source:"apache", compressible:!1, extensions:["bz"]}, "application/x-bzip2":{source:"apache", compressible:!1, extensions:["bz2", "boz"]}, "application/x-cbr":{source:"apache", extensions:["cbr", "cba", "cbt", "cbz", "cb7"]}, "application/x-cdlink":{source:"apache", 
extensions:["vcd"]}, "application/x-cfs-compressed":{source:"apache", extensions:["cfs"]}, "application/x-chat":{source:"apache", extensions:["chat"]}, "application/x-chess-pgn":{source:"apache", extensions:["pgn"]}, "application/x-chrome-extension":{extensions:["crx"]}, "application/x-cocoa":{source:"nginx", extensions:["cco"]}, "application/x-compress":{source:"apache"}, "application/x-conference":{source:"apache", extensions:["nsc"]}, "application/x-cpio":{source:"apache", extensions:["cpio"]}, 
"application/x-csh":{source:"apache", extensions:["csh"]}, "application/x-deb":{compressible:!1}, "application/x-debian-package":{source:"apache", extensions:["deb", "udeb"]}, "application/x-dgc-compressed":{source:"apache", extensions:["dgc"]}, "application/x-director":{source:"apache", extensions:"dir dcr dxr cst cct cxt w3d fgd swa".split(" ")}, "application/x-doom":{source:"apache", extensions:["wad"]}, "application/x-dtbncx+xml":{source:"apache", compressible:!0, extensions:["ncx"]}, "application/x-dtbook+xml":{source:"apache", 
compressible:!0, extensions:["dtb"]}, "application/x-dtbresource+xml":{source:"apache", compressible:!0, extensions:["res"]}, "application/x-dvi":{source:"apache", compressible:!1, extensions:["dvi"]}, "application/x-envoy":{source:"apache", extensions:["evy"]}, "application/x-eva":{source:"apache", extensions:["eva"]}, "application/x-font-bdf":{source:"apache", extensions:["bdf"]}, "application/x-font-dos":{source:"apache"}, "application/x-font-framemaker":{source:"apache"}, "application/x-font-ghostscript":{source:"apache", 
extensions:["gsf"]}, "application/x-font-libgrx":{source:"apache"}, "application/x-font-linux-psf":{source:"apache", extensions:["psf"]}, "application/x-font-pcf":{source:"apache", extensions:["pcf"]}, "application/x-font-snf":{source:"apache", extensions:["snf"]}, "application/x-font-speedo":{source:"apache"}, "application/x-font-sunos-news":{source:"apache"}, "application/x-font-type1":{source:"apache", extensions:["pfa", "pfb", "pfm", "afm"]}, "application/x-font-vfont":{source:"apache"}, "application/x-freearc":{source:"apache", 
extensions:["arc"]}, "application/x-futuresplash":{source:"apache", extensions:["spl"]}, "application/x-gca-compressed":{source:"apache", extensions:["gca"]}, "application/x-glulx":{source:"apache", extensions:["ulx"]}, "application/x-gnumeric":{source:"apache", extensions:["gnumeric"]}, "application/x-gramps-xml":{source:"apache", extensions:["gramps"]}, "application/x-gtar":{source:"apache", extensions:["gtar"]}, "application/x-gzip":{source:"apache"}, "application/x-hdf":{source:"apache", extensions:["hdf"]}, 
"application/x-httpd-php":{compressible:!0, extensions:["php"]}, "application/x-install-instructions":{source:"apache", extensions:["install"]}, "application/x-iso9660-image":{source:"apache", extensions:["iso"]}, "application/x-java-archive-diff":{source:"nginx", extensions:["jardiff"]}, "application/x-java-jnlp-file":{source:"apache", compressible:!1, extensions:["jnlp"]}, "application/x-javascript":{compressible:!0}, "application/x-latex":{source:"apache", compressible:!1, extensions:["latex"]}, 
"application/x-lua-bytecode":{extensions:["luac"]}, "application/x-lzh-compressed":{source:"apache", extensions:["lzh", "lha"]}, "application/x-makeself":{source:"nginx", extensions:["run"]}, "application/x-mie":{source:"apache", extensions:["mie"]}, "application/x-mobipocket-ebook":{source:"apache", extensions:["prc", "mobi"]}, "application/x-mpegurl":{compressible:!1}, "application/x-ms-application":{source:"apache", extensions:["application"]}, "application/x-ms-shortcut":{source:"apache", extensions:["lnk"]}, 
"application/x-ms-wmd":{source:"apache", extensions:["wmd"]}, "application/x-ms-wmz":{source:"apache", extensions:["wmz"]}, "application/x-ms-xbap":{source:"apache", extensions:["xbap"]}, "application/x-msaccess":{source:"apache", extensions:["mdb"]}, "application/x-msbinder":{source:"apache", extensions:["obd"]}, "application/x-mscardfile":{source:"apache", extensions:["crd"]}, "application/x-msclip":{source:"apache", extensions:["clp"]}, "application/x-msdos-program":{extensions:["exe"]}, "application/x-msdownload":{source:"apache", 
extensions:["exe", "dll", "com", "bat", "msi"]}, "application/x-msmediaview":{source:"apache", extensions:["mvb", "m13", "m14"]}, "application/x-msmetafile":{source:"apache", extensions:["wmf", "wmz", "emf", "emz"]}, "application/x-msmoney":{source:"apache", extensions:["mny"]}, "application/x-mspublisher":{source:"apache", extensions:["pub"]}, "application/x-msschedule":{source:"apache", extensions:["scd"]}, "application/x-msterminal":{source:"apache", extensions:["trm"]}, "application/x-mswrite":{source:"apache", 
extensions:["wri"]}, "application/x-netcdf":{source:"apache", extensions:["nc", "cdf"]}, "application/x-ns-proxy-autoconfig":{compressible:!0, extensions:["pac"]}, "application/x-nzb":{source:"apache", extensions:["nzb"]}, "application/x-perl":{source:"nginx", extensions:["pl", "pm"]}, "application/x-pilot":{source:"nginx", extensions:["prc", "pdb"]}, "application/x-pkcs12":{source:"apache", compressible:!1, extensions:["p12", "pfx"]}, "application/x-pkcs7-certificates":{source:"apache", extensions:["p7b", 
"spc"]}, "application/x-pkcs7-certreqresp":{source:"apache", extensions:["p7r"]}, "application/x-rar-compressed":{source:"apache", compressible:!1, extensions:["rar"]}, "application/x-redhat-package-manager":{source:"nginx", extensions:["rpm"]}, "application/x-research-info-systems":{source:"apache", extensions:["ris"]}, "application/x-sea":{source:"nginx", extensions:["sea"]}, "application/x-sh":{source:"apache", compressible:!0, extensions:["sh"]}, "application/x-shar":{source:"apache", extensions:["shar"]}, 
"application/x-shockwave-flash":{source:"apache", compressible:!1, extensions:["swf"]}, "application/x-silverlight-app":{source:"apache", extensions:["xap"]}, "application/x-sql":{source:"apache", extensions:["sql"]}, "application/x-stuffit":{source:"apache", compressible:!1, extensions:["sit"]}, "application/x-stuffitx":{source:"apache", extensions:["sitx"]}, "application/x-subrip":{source:"apache", extensions:["srt"]}, "application/x-sv4cpio":{source:"apache", extensions:["sv4cpio"]}, "application/x-sv4crc":{source:"apache", 
extensions:["sv4crc"]}, "application/x-t3vm-image":{source:"apache", extensions:["t3"]}, "application/x-tads":{source:"apache", extensions:["gam"]}, "application/x-tar":{source:"apache", compressible:!0, extensions:["tar"]}, "application/x-tcl":{source:"apache", extensions:["tcl", "tk"]}, "application/x-tex":{source:"apache", extensions:["tex"]}, "application/x-tex-tfm":{source:"apache", extensions:["tfm"]}, "application/x-texinfo":{source:"apache", extensions:["texinfo", "texi"]}, "application/x-tgif":{source:"apache", 
extensions:["obj"]}, "application/x-ustar":{source:"apache", extensions:["ustar"]}, "application/x-virtualbox-hdd":{compressible:!0, extensions:["hdd"]}, "application/x-virtualbox-ova":{compressible:!0, extensions:["ova"]}, "application/x-virtualbox-ovf":{compressible:!0, extensions:["ovf"]}, "application/x-virtualbox-vbox":{compressible:!0, extensions:["vbox"]}, "application/x-virtualbox-vbox-extpack":{compressible:!1, extensions:["vbox-extpack"]}, "application/x-virtualbox-vdi":{compressible:!0, 
extensions:["vdi"]}, "application/x-virtualbox-vhd":{compressible:!0, extensions:["vhd"]}, "application/x-virtualbox-vmdk":{compressible:!0, extensions:["vmdk"]}, "application/x-wais-source":{source:"apache", extensions:["src"]}, "application/x-web-app-manifest+json":{compressible:!0, extensions:["webapp"]}, "application/x-www-form-urlencoded":{source:"iana", compressible:!0}, "application/x-x509-ca-cert":{source:"apache", extensions:["der", "crt", "pem"]}, "application/x-xfig":{source:"apache", 
extensions:["fig"]}, "application/x-xliff+xml":{source:"apache", compressible:!0, extensions:["xlf"]}, "application/x-xpinstall":{source:"apache", compressible:!1, extensions:["xpi"]}, "application/x-xz":{source:"apache", extensions:["xz"]}, "application/x-zmachine":{source:"apache", extensions:"z1 z2 z3 z4 z5 z6 z7 z8".split(" ")}, "application/x400-bp":{source:"iana"}, "application/xacml+xml":{source:"iana", compressible:!0}, "application/xaml+xml":{source:"apache", compressible:!0, extensions:["xaml"]}, 
"application/xcap-att+xml":{source:"iana", compressible:!0}, "application/xcap-caps+xml":{source:"iana", compressible:!0}, "application/xcap-diff+xml":{source:"iana", compressible:!0, extensions:["xdf"]}, "application/xcap-el+xml":{source:"iana", compressible:!0}, "application/xcap-error+xml":{source:"iana", compressible:!0}, "application/xcap-ns+xml":{source:"iana", compressible:!0}, "application/xcon-conference-info+xml":{source:"iana", compressible:!0}, "application/xcon-conference-info-diff+xml":{source:"iana", 
compressible:!0}, "application/xenc+xml":{source:"iana", compressible:!0, extensions:["xenc"]}, "application/xhtml+xml":{source:"iana", compressible:!0, extensions:["xhtml", "xht"]}, "application/xhtml-voice+xml":{source:"apache", compressible:!0}, "application/xliff+xml":{source:"iana", compressible:!0}, "application/xml":{source:"iana", compressible:!0, extensions:["xml", "xsl", "xsd", "rng"]}, "application/xml-dtd":{source:"iana", compressible:!0, extensions:["dtd"]}, "application/xml-external-parsed-entity":{source:"iana"}, 
"application/xml-patch+xml":{source:"iana", compressible:!0}, "application/xmpp+xml":{source:"iana", compressible:!0}, "application/xop+xml":{source:"iana", compressible:!0, extensions:["xop"]}, "application/xproc+xml":{source:"apache", compressible:!0, extensions:["xpl"]}, "application/xslt+xml":{source:"iana", compressible:!0, extensions:["xslt"]}, "application/xspf+xml":{source:"apache", compressible:!0, extensions:["xspf"]}, "application/xv+xml":{source:"iana", compressible:!0, extensions:["mxml", 
"xhvml", "xvml", "xvm"]}, "application/yang":{source:"iana", extensions:["yang"]}, "application/yang-data+json":{source:"iana", compressible:!0}, "application/yang-data+xml":{source:"iana", compressible:!0}, "application/yang-patch+json":{source:"iana", compressible:!0}, "application/yang-patch+xml":{source:"iana", compressible:!0}, "application/yin+xml":{source:"iana", compressible:!0, extensions:["yin"]}, "application/zip":{source:"iana", compressible:!1, extensions:["zip"]}, "application/zlib":{source:"iana"}, 
"application/zstd":{source:"iana"}, "audio/1d-interleaved-parityfec":{source:"iana"}, "audio/32kadpcm":{source:"iana"}, "audio/3gpp":{source:"iana", compressible:!1, extensions:["3gpp"]}, "audio/3gpp2":{source:"iana"}, "audio/aac":{source:"iana"}, "audio/ac3":{source:"iana"}, "audio/adpcm":{source:"apache", extensions:["adp"]}, "audio/amr":{source:"iana"}, "audio/amr-wb":{source:"iana"}, "audio/amr-wb+":{source:"iana"}, "audio/aptx":{source:"iana"}, "audio/asc":{source:"iana"}, "audio/atrac-advanced-lossless":{source:"iana"}, 
"audio/atrac-x":{source:"iana"}, "audio/atrac3":{source:"iana"}, "audio/basic":{source:"iana", compressible:!1, extensions:["au", "snd"]}, "audio/bv16":{source:"iana"}, "audio/bv32":{source:"iana"}, "audio/clearmode":{source:"iana"}, "audio/cn":{source:"iana"}, "audio/dat12":{source:"iana"}, "audio/dls":{source:"iana"}, "audio/dsr-es201108":{source:"iana"}, "audio/dsr-es202050":{source:"iana"}, "audio/dsr-es202211":{source:"iana"}, "audio/dsr-es202212":{source:"iana"}, "audio/dv":{source:"iana"}, 
"audio/dvi4":{source:"iana"}, "audio/eac3":{source:"iana"}, "audio/encaprtp":{source:"iana"}, "audio/evrc":{source:"iana"}, "audio/evrc-qcp":{source:"iana"}, "audio/evrc0":{source:"iana"}, "audio/evrc1":{source:"iana"}, "audio/evrcb":{source:"iana"}, "audio/evrcb0":{source:"iana"}, "audio/evrcb1":{source:"iana"}, "audio/evrcnw":{source:"iana"}, "audio/evrcnw0":{source:"iana"}, "audio/evrcnw1":{source:"iana"}, "audio/evrcwb":{source:"iana"}, "audio/evrcwb0":{source:"iana"}, "audio/evrcwb1":{source:"iana"}, 
"audio/evs":{source:"iana"}, "audio/fwdred":{source:"iana"}, "audio/g711-0":{source:"iana"}, "audio/g719":{source:"iana"}, "audio/g722":{source:"iana"}, "audio/g7221":{source:"iana"}, "audio/g723":{source:"iana"}, "audio/g726-16":{source:"iana"}, "audio/g726-24":{source:"iana"}, "audio/g726-32":{source:"iana"}, "audio/g726-40":{source:"iana"}, "audio/g728":{source:"iana"}, "audio/g729":{source:"iana"}, "audio/g7291":{source:"iana"}, "audio/g729d":{source:"iana"}, "audio/g729e":{source:"iana"}, "audio/gsm":{source:"iana"}, 
"audio/gsm-efr":{source:"iana"}, "audio/gsm-hr-08":{source:"iana"}, "audio/ilbc":{source:"iana"}, "audio/ip-mr_v2.5":{source:"iana"}, "audio/isac":{source:"apache"}, "audio/l16":{source:"iana"}, "audio/l20":{source:"iana"}, "audio/l24":{source:"iana", compressible:!1}, "audio/l8":{source:"iana"}, "audio/lpc":{source:"iana"}, "audio/melp":{source:"iana"}, "audio/melp1200":{source:"iana"}, "audio/melp2400":{source:"iana"}, "audio/melp600":{source:"iana"}, "audio/midi":{source:"apache", extensions:["mid", 
"midi", "kar", "rmi"]}, "audio/mobile-xmf":{source:"iana"}, "audio/mp3":{compressible:!1, extensions:["mp3"]}, "audio/mp4":{source:"iana", compressible:!1, extensions:["m4a", "mp4a"]}, "audio/mp4a-latm":{source:"iana"}, "audio/mpa":{source:"iana"}, "audio/mpa-robust":{source:"iana"}, "audio/mpeg":{source:"iana", compressible:!1, extensions:"mpga mp2 mp2a mp3 m2a m3a".split(" ")}, "audio/mpeg4-generic":{source:"iana"}, "audio/musepack":{source:"apache"}, "audio/ogg":{source:"iana", compressible:!1, 
extensions:["oga", "ogg", "spx"]}, "audio/opus":{source:"iana"}, "audio/parityfec":{source:"iana"}, "audio/pcma":{source:"iana"}, "audio/pcma-wb":{source:"iana"}, "audio/pcmu":{source:"iana"}, "audio/pcmu-wb":{source:"iana"}, "audio/prs.sid":{source:"iana"}, "audio/qcelp":{source:"iana"}, "audio/raptorfec":{source:"iana"}, "audio/red":{source:"iana"}, "audio/rtp-enc-aescm128":{source:"iana"}, "audio/rtp-midi":{source:"iana"}, "audio/rtploopback":{source:"iana"}, "audio/rtx":{source:"iana"}, "audio/s3m":{source:"apache", 
extensions:["s3m"]}, "audio/silk":{source:"apache", extensions:["sil"]}, "audio/smv":{source:"iana"}, "audio/smv-qcp":{source:"iana"}, "audio/smv0":{source:"iana"}, "audio/sp-midi":{source:"iana"}, "audio/speex":{source:"iana"}, "audio/t140c":{source:"iana"}, "audio/t38":{source:"iana"}, "audio/telephone-event":{source:"iana"}, "audio/tetra_acelp":{source:"iana"}, "audio/tone":{source:"iana"}, "audio/uemclip":{source:"iana"}, "audio/ulpfec":{source:"iana"}, "audio/usac":{source:"iana"}, "audio/vdvi":{source:"iana"}, 
"audio/vmr-wb":{source:"iana"}, "audio/vnd.3gpp.iufp":{source:"iana"}, "audio/vnd.4sb":{source:"iana"}, "audio/vnd.audiokoz":{source:"iana"}, "audio/vnd.celp":{source:"iana"}, "audio/vnd.cisco.nse":{source:"iana"}, "audio/vnd.cmles.radio-events":{source:"iana"}, "audio/vnd.cns.anp1":{source:"iana"}, "audio/vnd.cns.inf1":{source:"iana"}, "audio/vnd.dece.audio":{source:"iana", extensions:["uva", "uvva"]}, "audio/vnd.digital-winds":{source:"iana", extensions:["eol"]}, "audio/vnd.dlna.adts":{source:"iana"}, 
"audio/vnd.dolby.heaac.1":{source:"iana"}, "audio/vnd.dolby.heaac.2":{source:"iana"}, "audio/vnd.dolby.mlp":{source:"iana"}, "audio/vnd.dolby.mps":{source:"iana"}, "audio/vnd.dolby.pl2":{source:"iana"}, "audio/vnd.dolby.pl2x":{source:"iana"}, "audio/vnd.dolby.pl2z":{source:"iana"}, "audio/vnd.dolby.pulse.1":{source:"iana"}, "audio/vnd.dra":{source:"iana", extensions:["dra"]}, "audio/vnd.dts":{source:"iana", extensions:["dts"]}, "audio/vnd.dts.hd":{source:"iana", extensions:["dtshd"]}, "audio/vnd.dts.uhd":{source:"iana"}, 
"audio/vnd.dvb.file":{source:"iana"}, "audio/vnd.everad.plj":{source:"iana"}, "audio/vnd.hns.audio":{source:"iana"}, "audio/vnd.lucent.voice":{source:"iana", extensions:["lvp"]}, "audio/vnd.ms-playready.media.pya":{source:"iana", extensions:["pya"]}, "audio/vnd.nokia.mobile-xmf":{source:"iana"}, "audio/vnd.nortel.vbk":{source:"iana"}, "audio/vnd.nuera.ecelp4800":{source:"iana", extensions:["ecelp4800"]}, "audio/vnd.nuera.ecelp7470":{source:"iana", extensions:["ecelp7470"]}, "audio/vnd.nuera.ecelp9600":{source:"iana", 
extensions:["ecelp9600"]}, "audio/vnd.octel.sbc":{source:"iana"}, "audio/vnd.presonus.multitrack":{source:"iana"}, "audio/vnd.qcelp":{source:"iana"}, "audio/vnd.rhetorex.32kadpcm":{source:"iana"}, "audio/vnd.rip":{source:"iana", extensions:["rip"]}, "audio/vnd.rn-realaudio":{compressible:!1}, "audio/vnd.sealedmedia.softseal.mpeg":{source:"iana"}, "audio/vnd.vmx.cvsd":{source:"iana"}, "audio/vnd.wave":{compressible:!1}, "audio/vorbis":{source:"iana", compressible:!1}, "audio/vorbis-config":{source:"iana"}, 
"audio/wav":{compressible:!1, extensions:["wav"]}, "audio/wave":{compressible:!1, extensions:["wav"]}, "audio/webm":{source:"apache", compressible:!1, extensions:["weba"]}, "audio/x-aac":{source:"apache", compressible:!1, extensions:["aac"]}, "audio/x-aiff":{source:"apache", extensions:["aif", "aiff", "aifc"]}, "audio/x-caf":{source:"apache", compressible:!1, extensions:["caf"]}, "audio/x-flac":{source:"apache", extensions:["flac"]}, "audio/x-m4a":{source:"nginx", extensions:["m4a"]}, "audio/x-matroska":{source:"apache", 
extensions:["mka"]}, "audio/x-mpegurl":{source:"apache", extensions:["m3u"]}, "audio/x-ms-wax":{source:"apache", extensions:["wax"]}, "audio/x-ms-wma":{source:"apache", extensions:["wma"]}, "audio/x-pn-realaudio":{source:"apache", extensions:["ram", "ra"]}, "audio/x-pn-realaudio-plugin":{source:"apache", extensions:["rmp"]}, "audio/x-realaudio":{source:"nginx", extensions:["ra"]}, "audio/x-tta":{source:"apache"}, "audio/x-wav":{source:"apache", extensions:["wav"]}, "audio/xm":{source:"apache", extensions:["xm"]}, 
"chemical/x-cdx":{source:"apache", extensions:["cdx"]}, "chemical/x-cif":{source:"apache", extensions:["cif"]}, "chemical/x-cmdf":{source:"apache", extensions:["cmdf"]}, "chemical/x-cml":{source:"apache", extensions:["cml"]}, "chemical/x-csml":{source:"apache", extensions:["csml"]}, "chemical/x-pdb":{source:"apache"}, "chemical/x-xyz":{source:"apache", extensions:["xyz"]}, "font/collection":{source:"iana", extensions:["ttc"]}, "font/otf":{source:"iana", compressible:!0, extensions:["otf"]}, "font/sfnt":{source:"iana"}, 
"font/ttf":{source:"iana", extensions:["ttf"]}, "font/woff":{source:"iana", extensions:["woff"]}, "font/woff2":{source:"iana", extensions:["woff2"]}, "image/aces":{source:"iana", extensions:["exr"]}, "image/apng":{compressible:!1, extensions:["apng"]}, "image/avci":{source:"iana"}, "image/avcs":{source:"iana"}, "image/bmp":{source:"iana", compressible:!0, extensions:["bmp"]}, "image/cgm":{source:"iana", extensions:["cgm"]}, "image/dicom-rle":{source:"iana", extensions:["drle"]}, "image/emf":{source:"iana", 
extensions:["emf"]}, "image/fits":{source:"iana", extensions:["fits"]}, "image/g3fax":{source:"iana", extensions:["g3"]}, "image/gif":{source:"iana", compressible:!1, extensions:["gif"]}, "image/heic":{source:"iana", extensions:["heic"]}, "image/heic-sequence":{source:"iana", extensions:["heics"]}, "image/heif":{source:"iana", extensions:["heif"]}, "image/heif-sequence":{source:"iana", extensions:["heifs"]}, "image/ief":{source:"iana", extensions:["ief"]}, "image/jls":{source:"iana", extensions:["jls"]}, 
"image/jp2":{source:"iana", compressible:!1, extensions:["jp2", "jpg2"]}, "image/jpeg":{source:"iana", compressible:!1, extensions:["jpeg", "jpg", "jpe"]}, "image/jpm":{source:"iana", compressible:!1, extensions:["jpm"]}, "image/jpx":{source:"iana", compressible:!1, extensions:["jpx", "jpf"]}, "image/jxr":{source:"iana", extensions:["jxr"]}, "image/ktx":{source:"iana", extensions:["ktx"]}, "image/naplps":{source:"iana"}, "image/pjpeg":{compressible:!1}, "image/png":{source:"iana", compressible:!1, 
extensions:["png"]}, "image/prs.btif":{source:"iana", extensions:["btif"]}, "image/prs.pti":{source:"iana", extensions:["pti"]}, "image/pwg-raster":{source:"iana"}, "image/sgi":{source:"apache", extensions:["sgi"]}, "image/svg+xml":{source:"iana", compressible:!0, extensions:["svg", "svgz"]}, "image/t38":{source:"iana", extensions:["t38"]}, "image/tiff":{source:"iana", compressible:!1, extensions:["tif", "tiff"]}, "image/tiff-fx":{source:"iana", extensions:["tfx"]}, "image/vnd.adobe.photoshop":{source:"iana", 
compressible:!0, extensions:["psd"]}, "image/vnd.airzip.accelerator.azv":{source:"iana", extensions:["azv"]}, "image/vnd.cns.inf2":{source:"iana"}, "image/vnd.dece.graphic":{source:"iana", extensions:["uvi", "uvvi", "uvg", "uvvg"]}, "image/vnd.djvu":{source:"iana", extensions:["djvu", "djv"]}, "image/vnd.dvb.subtitle":{source:"iana", extensions:["sub"]}, "image/vnd.dwg":{source:"iana", extensions:["dwg"]}, "image/vnd.dxf":{source:"iana", extensions:["dxf"]}, "image/vnd.fastbidsheet":{source:"iana", 
extensions:["fbs"]}, "image/vnd.fpx":{source:"iana", extensions:["fpx"]}, "image/vnd.fst":{source:"iana", extensions:["fst"]}, "image/vnd.fujixerox.edmics-mmr":{source:"iana", extensions:["mmr"]}, "image/vnd.fujixerox.edmics-rlc":{source:"iana", extensions:["rlc"]}, "image/vnd.globalgraphics.pgb":{source:"iana"}, "image/vnd.microsoft.icon":{source:"iana", extensions:["ico"]}, "image/vnd.mix":{source:"iana"}, "image/vnd.mozilla.apng":{source:"iana"}, "image/vnd.ms-modi":{source:"iana", extensions:["mdi"]}, 
"image/vnd.ms-photo":{source:"apache", extensions:["wdp"]}, "image/vnd.net-fpx":{source:"iana", extensions:["npx"]}, "image/vnd.radiance":{source:"iana"}, "image/vnd.sealed.png":{source:"iana"}, "image/vnd.sealedmedia.softseal.gif":{source:"iana"}, "image/vnd.sealedmedia.softseal.jpg":{source:"iana"}, "image/vnd.svf":{source:"iana"}, "image/vnd.tencent.tap":{source:"iana", extensions:["tap"]}, "image/vnd.valve.source.texture":{source:"iana", extensions:["vtf"]}, "image/vnd.wap.wbmp":{source:"iana", 
extensions:["wbmp"]}, "image/vnd.xiff":{source:"iana", extensions:["xif"]}, "image/vnd.zbrush.pcx":{source:"iana", extensions:["pcx"]}, "image/webp":{source:"apache", extensions:["webp"]}, "image/wmf":{source:"iana", extensions:["wmf"]}, "image/x-3ds":{source:"apache", extensions:["3ds"]}, "image/x-cmu-raster":{source:"apache", extensions:["ras"]}, "image/x-cmx":{source:"apache", extensions:["cmx"]}, "image/x-freehand":{source:"apache", extensions:["fh", "fhc", "fh4", "fh5", "fh7"]}, "image/x-icon":{source:"apache", 
compressible:!0, extensions:["ico"]}, "image/x-jng":{source:"nginx", extensions:["jng"]}, "image/x-mrsid-image":{source:"apache", extensions:["sid"]}, "image/x-ms-bmp":{source:"nginx", compressible:!0, extensions:["bmp"]}, "image/x-pcx":{source:"apache", extensions:["pcx"]}, "image/x-pict":{source:"apache", extensions:["pic", "pct"]}, "image/x-portable-anymap":{source:"apache", extensions:["pnm"]}, "image/x-portable-bitmap":{source:"apache", extensions:["pbm"]}, "image/x-portable-graymap":{source:"apache", 
extensions:["pgm"]}, "image/x-portable-pixmap":{source:"apache", extensions:["ppm"]}, "image/x-rgb":{source:"apache", extensions:["rgb"]}, "image/x-tga":{source:"apache", extensions:["tga"]}, "image/x-xbitmap":{source:"apache", extensions:["xbm"]}, "image/x-xcf":{compressible:!1}, "image/x-xpixmap":{source:"apache", extensions:["xpm"]}, "image/x-xwindowdump":{source:"apache", extensions:["xwd"]}, "message/cpim":{source:"iana"}, "message/delivery-status":{source:"iana"}, "message/disposition-notification":{source:"iana", 
extensions:["disposition-notification"]}, "message/external-body":{source:"iana"}, "message/feedback-report":{source:"iana"}, "message/global":{source:"iana", extensions:["u8msg"]}, "message/global-delivery-status":{source:"iana", extensions:["u8dsn"]}, "message/global-disposition-notification":{source:"iana", extensions:["u8mdn"]}, "message/global-headers":{source:"iana", extensions:["u8hdr"]}, "message/http":{source:"iana", compressible:!1}, "message/imdn+xml":{source:"iana", compressible:!0}, 
"message/news":{source:"iana"}, "message/partial":{source:"iana", compressible:!1}, "message/rfc822":{source:"iana", compressible:!0, extensions:["eml", "mime"]}, "message/s-http":{source:"iana"}, "message/sip":{source:"iana"}, "message/sipfrag":{source:"iana"}, "message/tracking-status":{source:"iana"}, "message/vnd.si.simp":{source:"iana"}, "message/vnd.wfa.wsc":{source:"iana", extensions:["wsc"]}, "model/3mf":{source:"iana"}, "model/gltf+json":{source:"iana", compressible:!0, extensions:["gltf"]}, 
"model/gltf-binary":{source:"iana", compressible:!0, extensions:["glb"]}, "model/iges":{source:"iana", compressible:!1, extensions:["igs", "iges"]}, "model/mesh":{source:"iana", compressible:!1, extensions:["msh", "mesh", "silo"]}, "model/stl":{source:"iana"}, "model/vnd.collada+xml":{source:"iana", compressible:!0, extensions:["dae"]}, "model/vnd.dwf":{source:"iana", extensions:["dwf"]}, "model/vnd.flatland.3dml":{source:"iana"}, "model/vnd.gdl":{source:"iana", extensions:["gdl"]}, "model/vnd.gs-gdl":{source:"apache"}, 
"model/vnd.gs.gdl":{source:"iana"}, "model/vnd.gtw":{source:"iana", extensions:["gtw"]}, "model/vnd.moml+xml":{source:"iana", compressible:!0}, "model/vnd.mts":{source:"iana", extensions:["mts"]}, "model/vnd.opengex":{source:"iana"}, "model/vnd.parasolid.transmit.binary":{source:"iana"}, "model/vnd.parasolid.transmit.text":{source:"iana"}, "model/vnd.rosette.annotated-data-model":{source:"iana"}, "model/vnd.usdz+zip":{source:"iana", compressible:!1}, "model/vnd.valve.source.compiled-map":{source:"iana"}, 
"model/vnd.vtu":{source:"iana", extensions:["vtu"]}, "model/vrml":{source:"iana", compressible:!1, extensions:["wrl", "vrml"]}, "model/x3d+binary":{source:"apache", compressible:!1, extensions:["x3db", "x3dbz"]}, "model/x3d+fastinfoset":{source:"iana"}, "model/x3d+vrml":{source:"apache", compressible:!1, extensions:["x3dv", "x3dvz"]}, "model/x3d+xml":{source:"iana", compressible:!0, extensions:["x3d", "x3dz"]}, "model/x3d-vrml":{source:"iana"}, "multipart/alternative":{source:"iana", compressible:!1}, 
"multipart/appledouble":{source:"iana"}, "multipart/byteranges":{source:"iana"}, "multipart/digest":{source:"iana"}, "multipart/encrypted":{source:"iana", compressible:!1}, "multipart/form-data":{source:"iana", compressible:!1}, "multipart/header-set":{source:"iana"}, "multipart/mixed":{source:"iana", compressible:!1}, "multipart/multilingual":{source:"iana"}, "multipart/parallel":{source:"iana"}, "multipart/related":{source:"iana", compressible:!1}, "multipart/report":{source:"iana"}, "multipart/signed":{source:"iana", 
compressible:!1}, "multipart/vnd.bint.med-plus":{source:"iana"}, "multipart/voice-message":{source:"iana"}, "multipart/x-mixed-replace":{source:"iana"}, "text/1d-interleaved-parityfec":{source:"iana"}, "text/cache-manifest":{source:"iana", compressible:!0, extensions:["appcache", "manifest"]}, "text/calendar":{source:"iana", extensions:["ics", "ifb"]}, "text/calender":{compressible:!0}, "text/cmd":{compressible:!0}, "text/coffeescript":{extensions:["coffee", "litcoffee"]}, "text/css":{source:"iana", 
charset:"UTF-8", compressible:!0, extensions:["css"]}, "text/csv":{source:"iana", compressible:!0, extensions:["csv"]}, "text/csv-schema":{source:"iana"}, "text/directory":{source:"iana"}, "text/dns":{source:"iana"}, "text/ecmascript":{source:"iana"}, "text/encaprtp":{source:"iana"}, "text/enriched":{source:"iana"}, "text/fwdred":{source:"iana"}, "text/grammar-ref-list":{source:"iana"}, "text/html":{source:"iana", compressible:!0, extensions:["html", "htm", "shtml"]}, "text/jade":{extensions:["jade"]}, 
"text/javascript":{source:"iana", compressible:!0}, "text/jcr-cnd":{source:"iana"}, "text/jsx":{compressible:!0, extensions:["jsx"]}, "text/less":{compressible:!0, extensions:["less"]}, "text/markdown":{source:"iana", compressible:!0, extensions:["markdown", "md"]}, "text/mathml":{source:"nginx", extensions:["mml"]}, "text/mizar":{source:"iana"}, "text/n3":{source:"iana", compressible:!0, extensions:["n3"]}, "text/parameters":{source:"iana"}, "text/parityfec":{source:"iana"}, "text/plain":{source:"iana", 
compressible:!0, extensions:"txt text conf def list log in ini".split(" ")}, "text/provenance-notation":{source:"iana"}, "text/prs.fallenstein.rst":{source:"iana"}, "text/prs.lines.tag":{source:"iana", extensions:["dsc"]}, "text/prs.prop.logic":{source:"iana"}, "text/raptorfec":{source:"iana"}, "text/red":{source:"iana"}, "text/rfc822-headers":{source:"iana"}, "text/richtext":{source:"iana", compressible:!0, extensions:["rtx"]}, "text/rtf":{source:"iana", compressible:!0, extensions:["rtf"]}, "text/rtp-enc-aescm128":{source:"iana"}, 
"text/rtploopback":{source:"iana"}, "text/rtx":{source:"iana"}, "text/sgml":{source:"iana", extensions:["sgml", "sgm"]}, "text/shex":{extensions:["shex"]}, "text/slim":{extensions:["slim", "slm"]}, "text/strings":{source:"iana"}, "text/stylus":{extensions:["stylus", "styl"]}, "text/t140":{source:"iana"}, "text/tab-separated-values":{source:"iana", compressible:!0, extensions:["tsv"]}, "text/troff":{source:"iana", extensions:"t tr roff man me ms".split(" ")}, "text/turtle":{source:"iana", charset:"UTF-8", 
extensions:["ttl"]}, "text/ulpfec":{source:"iana"}, "text/uri-list":{source:"iana", compressible:!0, extensions:["uri", "uris", "urls"]}, "text/vcard":{source:"iana", compressible:!0, extensions:["vcard"]}, "text/vnd.a":{source:"iana"}, "text/vnd.abc":{source:"iana"}, "text/vnd.ascii-art":{source:"iana"}, "text/vnd.curl":{source:"iana", extensions:["curl"]}, "text/vnd.curl.dcurl":{source:"apache", extensions:["dcurl"]}, "text/vnd.curl.mcurl":{source:"apache", extensions:["mcurl"]}, "text/vnd.curl.scurl":{source:"apache", 
extensions:["scurl"]}, "text/vnd.debian.copyright":{source:"iana"}, "text/vnd.dmclientscript":{source:"iana"}, "text/vnd.dvb.subtitle":{source:"iana", extensions:["sub"]}, "text/vnd.esmertec.theme-descriptor":{source:"iana"}, "text/vnd.fly":{source:"iana", extensions:["fly"]}, "text/vnd.fmi.flexstor":{source:"iana", extensions:["flx"]}, "text/vnd.gml":{source:"iana"}, "text/vnd.graphviz":{source:"iana", extensions:["gv"]}, "text/vnd.hgl":{source:"iana"}, "text/vnd.in3d.3dml":{source:"iana", extensions:["3dml"]}, 
"text/vnd.in3d.spot":{source:"iana", extensions:["spot"]}, "text/vnd.iptc.newsml":{source:"iana"}, "text/vnd.iptc.nitf":{source:"iana"}, "text/vnd.latex-z":{source:"iana"}, "text/vnd.motorola.reflex":{source:"iana"}, "text/vnd.ms-mediapackage":{source:"iana"}, "text/vnd.net2phone.commcenter.command":{source:"iana"}, "text/vnd.radisys.msml-basic-layout":{source:"iana"}, "text/vnd.senx.warpscript":{source:"iana"}, "text/vnd.si.uricatalogue":{source:"iana"}, "text/vnd.sun.j2me.app-descriptor":{source:"iana", 
extensions:["jad"]}, "text/vnd.trolltech.linguist":{source:"iana"}, "text/vnd.wap.si":{source:"iana"}, "text/vnd.wap.sl":{source:"iana"}, "text/vnd.wap.wml":{source:"iana", extensions:["wml"]}, "text/vnd.wap.wmlscript":{source:"iana", extensions:["wmls"]}, "text/vtt":{charset:"UTF-8", compressible:!0, extensions:["vtt"]}, "text/x-asm":{source:"apache", extensions:["s", "asm"]}, "text/x-c":{source:"apache", extensions:"c cc cxx cpp h hh dic".split(" ")}, "text/x-component":{source:"nginx", extensions:["htc"]}, 
"text/x-fortran":{source:"apache", extensions:["f", "for", "f77", "f90"]}, "text/x-gwt-rpc":{compressible:!0}, "text/x-handlebars-template":{extensions:["hbs"]}, "text/x-java-source":{source:"apache", extensions:["java"]}, "text/x-jquery-tmpl":{compressible:!0}, "text/x-lua":{extensions:["lua"]}, "text/x-markdown":{compressible:!0, extensions:["mkd"]}, "text/x-nfo":{source:"apache", extensions:["nfo"]}, "text/x-opml":{source:"apache", extensions:["opml"]}, "text/x-org":{compressible:!0, extensions:["org"]}, 
"text/x-pascal":{source:"apache", extensions:["p", "pas"]}, "text/x-processing":{compressible:!0, extensions:["pde"]}, "text/x-sass":{extensions:["sass"]}, "text/x-scss":{extensions:["scss"]}, "text/x-setext":{source:"apache", extensions:["etx"]}, "text/x-sfv":{source:"apache", extensions:["sfv"]}, "text/x-suse-ymp":{compressible:!0, extensions:["ymp"]}, "text/x-uuencode":{source:"apache", extensions:["uu"]}, "text/x-vcalendar":{source:"apache", extensions:["vcs"]}, "text/x-vcard":{source:"apache", 
extensions:["vcf"]}, "text/xml":{source:"iana", compressible:!0, extensions:["xml"]}, "text/xml-external-parsed-entity":{source:"iana"}, "text/yaml":{extensions:["yaml", "yml"]}, "video/1d-interleaved-parityfec":{source:"iana"}, "video/3gpp":{source:"iana", extensions:["3gp", "3gpp"]}, "video/3gpp-tt":{source:"iana"}, "video/3gpp2":{source:"iana", extensions:["3g2"]}, "video/bmpeg":{source:"iana"}, "video/bt656":{source:"iana"}, "video/celb":{source:"iana"}, "video/dv":{source:"iana"}, "video/encaprtp":{source:"iana"}, 
"video/h261":{source:"iana", extensions:["h261"]}, "video/h263":{source:"iana", extensions:["h263"]}, "video/h263-1998":{source:"iana"}, "video/h263-2000":{source:"iana"}, "video/h264":{source:"iana", extensions:["h264"]}, "video/h264-rcdo":{source:"iana"}, "video/h264-svc":{source:"iana"}, "video/h265":{source:"iana"}, "video/iso.segment":{source:"iana"}, "video/jpeg":{source:"iana", extensions:["jpgv"]}, "video/jpeg2000":{source:"iana"}, "video/jpm":{source:"apache", extensions:["jpm", "jpgm"]}, 
"video/mj2":{source:"iana", extensions:["mj2", "mjp2"]}, "video/mp1s":{source:"iana"}, "video/mp2p":{source:"iana"}, "video/mp2t":{source:"iana", extensions:["ts"]}, "video/mp4":{source:"iana", compressible:!1, extensions:["mp4", "mp4v", "mpg4"]}, "video/mp4v-es":{source:"iana"}, "video/mpeg":{source:"iana", compressible:!1, extensions:["mpeg", "mpg", "mpe", "m1v", "m2v"]}, "video/mpeg4-generic":{source:"iana"}, "video/mpv":{source:"iana"}, "video/nv":{source:"iana"}, "video/ogg":{source:"iana", 
compressible:!1, extensions:["ogv"]}, "video/parityfec":{source:"iana"}, "video/pointer":{source:"iana"}, "video/quicktime":{source:"iana", compressible:!1, extensions:["qt", "mov"]}, "video/raptorfec":{source:"iana"}, "video/raw":{source:"iana"}, "video/rtp-enc-aescm128":{source:"iana"}, "video/rtploopback":{source:"iana"}, "video/rtx":{source:"iana"}, "video/smpte291":{source:"iana"}, "video/smpte292m":{source:"iana"}, "video/ulpfec":{source:"iana"}, "video/vc1":{source:"iana"}, "video/vc2":{source:"iana"}, 
"video/vnd.cctv":{source:"iana"}, "video/vnd.dece.hd":{source:"iana", extensions:["uvh", "uvvh"]}, "video/vnd.dece.mobile":{source:"iana", extensions:["uvm", "uvvm"]}, "video/vnd.dece.mp4":{source:"iana"}, "video/vnd.dece.pd":{source:"iana", extensions:["uvp", "uvvp"]}, "video/vnd.dece.sd":{source:"iana", extensions:["uvs", "uvvs"]}, "video/vnd.dece.video":{source:"iana", extensions:["uvv", "uvvv"]}, "video/vnd.directv.mpeg":{source:"iana"}, "video/vnd.directv.mpeg-tts":{source:"iana"}, "video/vnd.dlna.mpeg-tts":{source:"iana"}, 
"video/vnd.dvb.file":{source:"iana", extensions:["dvb"]}, "video/vnd.fvt":{source:"iana", extensions:["fvt"]}, "video/vnd.hns.video":{source:"iana"}, "video/vnd.iptvforum.1dparityfec-1010":{source:"iana"}, "video/vnd.iptvforum.1dparityfec-2005":{source:"iana"}, "video/vnd.iptvforum.2dparityfec-1010":{source:"iana"}, "video/vnd.iptvforum.2dparityfec-2005":{source:"iana"}, "video/vnd.iptvforum.ttsavc":{source:"iana"}, "video/vnd.iptvforum.ttsmpeg2":{source:"iana"}, "video/vnd.motorola.video":{source:"iana"}, 
"video/vnd.motorola.videop":{source:"iana"}, "video/vnd.mpegurl":{source:"iana", extensions:["mxu", "m4u"]}, "video/vnd.ms-playready.media.pyv":{source:"iana", extensions:["pyv"]}, "video/vnd.nokia.interleaved-multimedia":{source:"iana"}, "video/vnd.nokia.mp4vr":{source:"iana"}, "video/vnd.nokia.videovoip":{source:"iana"}, "video/vnd.objectvideo":{source:"iana"}, "video/vnd.radgamettools.bink":{source:"iana"}, "video/vnd.radgamettools.smacker":{source:"iana"}, "video/vnd.sealed.mpeg1":{source:"iana"}, 
"video/vnd.sealed.mpeg4":{source:"iana"}, "video/vnd.sealed.swf":{source:"iana"}, "video/vnd.sealedmedia.softseal.mov":{source:"iana"}, "video/vnd.uvvu.mp4":{source:"iana", extensions:["uvu", "uvvu"]}, "video/vnd.vivo":{source:"iana", extensions:["viv"]}, "video/vp8":{source:"iana"}, "video/webm":{source:"apache", compressible:!1, extensions:["webm"]}, "video/x-f4v":{source:"apache", extensions:["f4v"]}, "video/x-fli":{source:"apache", extensions:["fli"]}, "video/x-flv":{source:"apache", compressible:!1, 
extensions:["flv"]}, "video/x-m4v":{source:"apache", extensions:["m4v"]}, "video/x-matroska":{source:"apache", compressible:!1, extensions:["mkv", "mk3d", "mks"]}, "video/x-mng":{source:"apache", extensions:["mng"]}, "video/x-ms-asf":{source:"apache", extensions:["asf", "asx"]}, "video/x-ms-vob":{source:"apache", extensions:["vob"]}, "video/x-ms-wm":{source:"apache", extensions:["wm"]}, "video/x-ms-wmv":{source:"apache", compressible:!1, extensions:["wmv"]}, "video/x-ms-wmx":{source:"apache", extensions:["wmx"]}, 
"video/x-ms-wvx":{source:"apache", extensions:["wvx"]}, "video/x-msvideo":{source:"apache", extensions:["avi"]}, "video/x-sgi-movie":{source:"apache", extensions:["movie"]}, "video/x-smv":{source:"apache", extensions:["smv"]}, "x-conference/x-cooltalk":{source:"apache", extensions:["ice"]}, "x-shader/x-fragment":{compressible:!0}, "x-shader/x-vertex":{compressible:!0}};
/*
 MIT
 Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 https://npmjs.com/package/mime-types
*/
const Aa = /^\s*([^;\s]*)(?:;|\s|$)/, Ba = /^text\//i, Ca = Object.create(null), K = Object.create(null);
Da();
function L(a) {
  return a && "string" == typeof a ? (a = qa("x." + a).toLowerCase().substr(1)) ? K[a] || !1 : !1 : !1;
}
function Da() {
  const a = ["nginx", "apache", void 0, "iana"];
  Object.keys(J).forEach(b => {
    const c = J[b], d = c.extensions;
    if (d && d.length) {
      Ca[b] = d;
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (K[f]) {
          const g = a.indexOf(J[K[f]].source), k = a.indexOf(c.source);
          if ("application/octet-stream" != K[f] && (g > k || g == k && "application/" == K[f].substr(0, 12))) {
            continue;
          }
        }
        K[f] = b;
      }
    }
  });
}
;/*
 content-type
 Copyright(c) 2015 Douglas Christopher Wilson
 MIT Licensed
*/
const M = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, Ea = /\\([\u000b\u0020-\u00ff])/g, Fa = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function N(a) {
  if (!a) {
    throw new TypeError("argument string is required");
  }
  if ("object" == typeof a) {
    if ("function" == typeof a.getHeader) {
      var b = a.getHeader("content-type");
    } else {
      "object" == typeof a.headers && (b = (a = a.headers) && a["content-type"]);
    }
    if ("string" != typeof b) {
      throw new TypeError("content-type header is missing from object");
    }
    a = b;
  }
  if ("string" != typeof a) {
    throw new TypeError("argument string is required to be a string");
  }
  b = a.indexOf(";");
  var c = -1 != b ? a.substr(0, b).trim() : a.trim();
  if (!Fa.test(c)) {
    throw new TypeError("invalid media type");
  }
  c = new Ga(c.toLowerCase());
  if (-1 != b) {
    let e;
    var d;
    for (M.lastIndex = b; d = M.exec(a);) {
      if (d.index !== b) {
        throw new TypeError("invalid parameter format");
      }
      b += d[0].length;
      e = d[1].toLowerCase();
      d = d[2];
      '"' == d[0] && (d = d.substr(1, d.length - 2).replace(Ea, "$1"));
      c.parameters[e] = d;
    }
    if (b != a.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return c;
}
class Ga {
  constructor(a) {
    this.parameters = Object.create(null);
    this.type = a;
  }
}
;/*
 media-typer
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
const Ha = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2015 Douglas Christopher Wilson
 https://npmjs.org/type-is
*/
function O(a, b) {
  var c = [];
  if ("string" != typeof a) {
    var d = null;
  } else {
    try {
      var e = N(a).type;
      if (!e) {
        throw new TypeError("argument string is required");
      }
      if ("string" != typeof e) {
        throw new TypeError("argument string is required to be a string");
      }
      d = Ha.test(e.toLowerCase()) ? e : null;
    } catch (g) {
      d = null;
    }
  }
  a = d;
  if (!a) {
    return !1;
  }
  b && !Array.isArray(b) && (b = [b, ...c]);
  if (!b || !b.length) {
    return a;
  }
  for (c = 0; c < b.length; c++) {
    var f = Ia(d = b[c]);
    !1 === f ? e = !1 : (e = a.split("/"), f = f.split("/"), e = 2 != e.length || 2 != f.length || "*" != f[0] && f[0] != e[0] ? !1 : "*+" == f[1].substr(0, 2) ? f[1].length <= e[1].length + 1 && f[1].substr(1) == e[1].substr(1 - f[1].length) : "*" != f[1] && f[1] != e[1] ? !1 : !0);
    if (e) {
      return "+" == d[0] || -1 !== d.indexOf("*") ? a : d;
    }
  }
  return !1;
}
function P(a, b, ...c) {
  var d = a.headers;
  d = void 0 !== d["transfer-encoding"] || !isNaN(d["content-length"]);
  if (!d) {
    return null;
  }
  2 < arguments.length && (b = [b, ...c]);
  return O(a.headers["content-type"], b);
}
function Ia(a) {
  if ("string" != typeof a) {
    return !1;
  }
  switch(a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return "+" == a[0] ? "*/*" + a : -1 == a.indexOf("/") ? L(a) : a;
}
;/*
 content-disposition
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
/*
 MIT
 Author dead_horse <dead_horse@qq.com>
 https://github.com/node-modules/error-inject
*/
function Ja(a, b) {
  if (a instanceof A && !a.listeners("error").includes(b)) {
    a.on("error", b);
  }
}
;/*
 MIT
 [cache-content-type] Author dead_horse <dead_horse@qq.com>
 https://github.com/node-modules/cache-content-type
 [ylru] Author fengmk2
 https://github.com/node-modules/ylru
*/
function Q(a, b, c) {
  a.cache.set(b, c);
  a.a++;
  a.a >= a.max && (a.a = 0, a.b = a.cache, a.cache = new Map);
}
class Ka {
  constructor(a) {
    this.max = a;
    this.a = 0;
    this.cache = new Map;
    this.b = new Map;
  }
  get(a, b = {}) {
    function c() {
      return e = e || Date.now();
    }
    let d = this.cache.get(a);
    ({maxAge:b} = b);
    let e;
    if (d) {
      return d.j && c() > d.j ? (d.j = 0, d.value = void 0) : void 0 !== b && (a = b ? c() + b : 0, d.j = a), d.value;
    }
    if (d = this.b.get(a)) {
      return d.j && c() > d.j ? (d.j = 0, d.value = void 0) : (Q(this, a, d), void 0 !== b && (a = b ? c() + b : 0, d.j = a)), d.value;
    }
  }
  set(a, b, c = {}) {
    ({maxAge:c} = c);
    c = c ? Date.now() + c : 0;
    let d = this.cache.get(a);
    d ? (d.j = c, d.value = b) : (d = {value:b, j:c}, Q(this, a, d));
  }
  keys() {
    function a(d) {
      const e = d[0], f = d[1];
      (d[1].value && !d[1].j || f.j >= c) && b.add(e);
    }
    const b = new Set, c = Date.now();
    for (const d of this.cache.entries()) {
      a(d);
    }
    for (const d of this.b.entries()) {
      a(d);
    }
    return Array.from(b.keys());
  }
}
const R = new Ka(100);
/*
 MIT
 Jonathan Ong
 https://npmjs.org/koa-is-json
*/
function S(a) {
  return !a || "string" == typeof a || "function" == typeof a.pipe || Buffer.isBuffer(a) ? !1 : !0;
}
;/*
 escape-html
 Copyright(c) 2012-2013 TJ Holowaychuk
 Copyright(c) 2015 Andreas Lubbe
 Copyright(c) 2015 Tiancheng "Timothy" Gu
 MIT Licensed
*/
var La = /["'&<>]/;
/*
 keygrip
 Copyright(c) 2011-2014 Jed Schmidt
 MIT Licensed
*/
/*
 cookies
 Copyright(c) 2014 Jed Schmidt, http://jed.is/
 Copyright(c) 2015-2016 Douglas Christopher Wilson
 MIT Licensed
*/
const Ma = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Na(a) {
  return a.split(",").map((b, c) => {
    var d = Ma.exec(b.trim());
    if (d) {
      b = d[1];
      var e = 1;
      if (d[2]) {
        d = d[2].split(";");
        for (let f = 0; f < d.length; f++) {
          const g = d[f].trim().split("=");
          if ("q" == g[0]) {
            e = parseFloat(g[1]);
            break;
          }
        }
      }
      c = {charset:b, q:e, g:c};
    } else {
      c = null;
    }
    if (c) {
      return c;
    }
  }).filter(Boolean);
}
function Oa(a, b) {
  const c = Na(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(T).sort(U).map(Pa);
  }
  const d = b.map((e, f) => {
    {
      let k = {c:-1, q:0, f:0};
      for (let h = 0; h < c.length; h++) {
        a: {
          var g = c[h];
          let l = 0;
          if (g.charset.toLowerCase() === e.toLowerCase()) {
            l |= 1;
          } else {
            if ("*" != g.charset) {
              g = null;
              break a;
            }
          }
          g = {g:f, f:l, c:g.g, q:g.q};
        }
        g && 0 > (k.f - g.f || k.q - g.q || k.c - g.c) && (k = g);
      }
      e = k;
    }
    return e;
  });
  return d.filter(T).sort(U).map(e => b[d.indexOf(e)]);
}
function U(a, b) {
  return b.q - a.q || b.f - a.f || a.c - b.c || a.g - b.g || 0;
}
function Pa(a) {
  return a.charset;
}
function T(a) {
  return 0 < a.q;
}
;const Qa = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Ra(a) {
  a = a.split(",");
  for (var b = !1, c = 1, d = 0, e = 0; d < a.length; d++) {
    var f = d;
    var g = Qa.exec(a[d].trim());
    if (g) {
      var k = g[1], h = 1;
      if (g[2]) {
        g = g[2].split(";");
        for (var l = 0; l < g.length; l++) {
          var n = g[l].trim().split("=");
          if ("q" == n[0]) {
            h = parseFloat(n[1]);
            break;
          }
        }
      }
      f = {encoding:k, q:h, g:f};
    } else {
      f = null;
    }
    f && (a[e++] = f, b = b || Sa("identity", f, void 0), c = Math.min(c, f.q || 1));
  }
  b || (a[e++] = {encoding:"identity", q:c, g:d});
  a.length = e;
  return a;
}
function Sa(a, b, c) {
  var d = 0;
  if (b.encoding.toLowerCase() === a.toLowerCase()) {
    d |= 1;
  } else {
    if ("*" !== b.encoding) {
      return null;
    }
  }
  return {g:c, c:b.g, q:b.q, f:d};
}
function Ta(a, b) {
  var c = Ra(a || "");
  if (!b) {
    return c.filter(Ua).sort(Va).map(Wa);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, f:0}, k = 0; k < c.length; k++) {
      var h = Sa(e, c[k], f);
      h && 0 > (g.f - h.f || g.q - h.q || g.c - h.c) && (g = h);
    }
    return g;
  });
  return d.filter(Ua).sort(Va).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Va(a, b) {
  return b.q - a.q || b.f - a.f || a.c - b.c || a.g - b.g || 0;
}
function Wa(a) {
  return a.encoding;
}
function Ua(a) {
  return 0 < a.q;
}
;const Xa = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function Ya(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var d = Za(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function Za(a, b) {
  var c = Xa.exec(a);
  if (!c) {
    return null;
  }
  a = c[1];
  var d = c[2], e = a;
  d && (e += "-" + d);
  var f = 1;
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 0; g < c.length; g++) {
      var k = c[g].split("=");
      "q" == k[0] && (f = parseFloat(k[1]));
    }
  }
  return {prefix:a, T:d, q:f, g:b, u:e};
}
function $a(a, b) {
  var c = Ya(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(ab).sort(bb).map(cb);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, f:0}, k = 0; k < c.length; k++) {
      a: {
        var h = c[k];
        var l = f, n = Za(e, void 0);
        if (n) {
          var q = 0;
          if (h.u.toLowerCase() === n.u.toLowerCase()) {
            q |= 4;
          } else {
            if (h.prefix.toLowerCase() === n.u.toLowerCase()) {
              q |= 2;
            } else {
              if (h.u.toLowerCase() === n.prefix.toLowerCase()) {
                q |= 1;
              } else {
                if ("*" !== h.u) {
                  h = null;
                  break a;
                }
              }
            }
          }
          h = {g:l, c:h.g, q:h.q, f:q};
        } else {
          h = null;
        }
      }
      h && 0 > (g.f - h.f || g.q - h.q || g.c - h.c) && (g = h);
    }
    return g;
  });
  return d.filter(ab).sort(bb).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function bb(a, b) {
  return b.q - a.q || b.f - a.f || a.c - b.c || a.g - b.g || 0;
}
function cb(a) {
  return a.u;
}
function ab(a) {
  return 0 < a.q;
}
;const db = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function eb(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == fb(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var d = gb(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function gb(a, b) {
  var c = db.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var d = 1, e = c[2], f = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 1, k = 0; g < c.length; g++) {
      0 == fb(c[k]) % 2 ? c[++k] = c[g] : c[k] += ";" + c[g];
    }
    c.length = k + 1;
    for (g = 0; g < c.length; g++) {
      c[g] = c[g].trim();
    }
    c = c.map(hb);
    for (g = 0; g < c.length; g++) {
      var h = c[g];
      k = h[0].toLowerCase();
      h = (h = h[1]) && '"' === h[0] && '"' === h[h.length - 1] ? h.substr(1, h.length - 2) : h;
      if ("q" === k) {
        d = parseFloat(h);
        break;
      }
      a[k] = h;
    }
  }
  return {type:f, B:e, A:a, q:d, g:b};
}
function ib(a, b, c) {
  var d = gb(a, void 0);
  a = 0;
  if (!d) {
    return null;
  }
  if (b.type.toLowerCase() == d.type.toLowerCase()) {
    a |= 4;
  } else {
    if ("*" != b.type) {
      return null;
    }
  }
  if (b.B.toLowerCase() == d.B.toLowerCase()) {
    a |= 2;
  } else {
    if ("*" != b.B) {
      return null;
    }
  }
  var e = Object.keys(b.A);
  if (0 < e.length) {
    if (e.every(function(f) {
      return "*" == b.A[f] || (b.A[f] || "").toLowerCase() == (d.A[f] || "").toLowerCase();
    })) {
      a |= 1;
    } else {
      return null;
    }
  }
  return {g:c, c:b.g, q:b.q, f:a};
}
function jb(a, b) {
  var c = eb(void 0 === a ? "*/*" : a || "");
  if (!b) {
    return c.filter(kb).sort(lb).map(mb);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, f:0}, k = 0; k < c.length; k++) {
      var h = ib(e, c[k], f);
      h && 0 > (g.f - h.f || g.q - h.q || g.c - h.c) && (g = h);
    }
    return g;
  });
  return d.filter(kb).sort(lb).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function lb(a, b) {
  return b.q - a.q || b.f - a.f || a.c - b.c || a.g - b.g || 0;
}
function mb(a) {
  return a.type + "/" + a.B;
}
function kb(a) {
  return 0 < a.q;
}
function fb(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function hb(a) {
  var b = a.indexOf("=");
  if (-1 === b) {
    var c = a;
  } else {
    c = a.substr(0, b);
    var d = a.substr(b + 1);
  }
  return [c, d];
}
;/*
 MIT
 Copyright(c) 2012 Federico Romero
 Copyright(c) 2012-2014 Isaac Z. Schlueter
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/negotiator
*/
class nb {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return Oa(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return Ta(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return $a(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return jb(this.headers.accept, a);
  }
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/accepts
*/
class ob {
  constructor(a) {
    this.headers = a.headers;
    this.a = new nb(a);
  }
  types(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    if (!a || 0 == a.length) {
      return this.a.mediaTypes();
    }
    if (!this.headers.accept) {
      return a[0];
    }
    b = a.map(pb);
    var c = this.a.mediaTypes(b.filter(qb));
    [c] = c;
    return c ? a[b.indexOf(c)] : !1;
  }
  get type() {
    return this.types;
  }
  encodings(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    return a && 0 != a.length ? this.a.encodings(a)[0] || !1 : this.a.encodings();
  }
  get encoding() {
    return this.encodings;
  }
  charsets(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    return a && 0 != a.length ? this.a.charsets(a)[0] || !1 : this.a.charsets();
  }
  get charset() {
    return this.charsets;
  }
  languages(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    return a && 0 != a.length ? this.a.languages(a)[0] || !1 : this.a.languages();
  }
  get lang() {
    return this.languages;
  }
  get langs() {
    return this.languages;
  }
  get language() {
    return this.languages;
  }
}
function pb(a) {
  return -1 == a.indexOf("/") ? L(a) : a;
}
function qb(a) {
  return "string" == typeof a;
}
;/*
 http-errors
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
 toidentifier
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
*/
sa.forEach(a => {
  rb(F[a]).match(/Error$/);
}, {});
function rb(a) {
  return a.split(" ").map(function(b) {
    return b.charAt(0).toUpperCase() + b.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
;/*
 MIT Copyright (c) 2015 TJ Holowaychuk <tj@vision-media.ca>
 https://npmjs.org/delegates
*/
function V(a, b) {
  const c = a.a, d = a.target;
  a.h.push(b);
  c.__defineGetter__(b, function() {
    return this[d][b];
  });
  return a;
}
function sb(a, b) {
  var c = a.a, d = a.target;
  a.i.push(b);
  c.__defineSetter__(b, function(e) {
    return this[d][b] = e;
  });
  return a;
}
class tb {
  constructor(a, b) {
    this.a = a;
    this.target = b;
    this.b = [];
    this.h = [];
    this.i = [];
  }
  method(a) {
    const b = this.a, c = this.target;
    this.b.push(a);
    b[a] = function() {
      return this[c][a].apply(this[c], arguments);
    };
    return this;
  }
  access(a) {
    return sb(V(this, a), a);
  }
}
;/*
 MIT jshttp/http-assert
*/
const {URL:ub, Url:W, format:vb, parse:wb} = url;
const {parse:xb, stringify:yb} = querystring;
/*
 parseurl
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
function X(a) {
  var b = a.url;
  if (void 0 !== b) {
    var c = a._parsedUrl;
    if ("object" === typeof c && null !== c && (void 0 === W || c instanceof W) && c._raw === b) {
      return c;
    }
    a: {
      if ("string" !== typeof b || 47 !== b.charCodeAt(0)) {
        c = wb(b);
      } else {
        c = b;
        for (var d = null, e = null, f = 1; f < b.length; f++) {
          switch(b.charCodeAt(f)) {
            case 63:
              null === e && (c = b.substring(0, f), d = b.substring(f + 1), e = b.substring(f));
              break;
            case 9:
            case 10:
            case 12:
            case 13:
            case 32:
            case 35:
            case 160:
            case 65279:
              c = wb(b);
              break a;
          }
        }
        f = void 0 !== W ? new W : {};
        f.path = b;
        f.href = b;
        f.pathname = c;
        null !== e && (f.query = d, f.search = e);
        c = f;
      }
    }
    c._raw = b;
    return a._parsedUrl = c;
  }
}
;/*
 fresh
 Copyright(c) 2012 TJ Holowaychuk
 Copyright(c) 2016-2017 Douglas Christopher Wilson
 MIT Licensed
*/
Symbol("context#ip");
class zb {
  constructor() {
    this.C = this.a = this.J = this.v = this.l = null;
    this.h = "";
    this.G = {};
    this.m = this.i = null;
  }
  get headers() {
    return this.a.headers;
  }
  set headers(a) {
    this.a.headers = a;
  }
  get url() {
    return this.a.url;
  }
  set url(a) {
    this.a.url = a;
  }
  get origin() {
    return `${this.protocol}://${this.host}`;
  }
  get href() {
    return /^https?:\/\//i.test(this.h) ? this.h : this.origin + this.h;
  }
  get method() {
    return this.a.method;
  }
  set method(a) {
    this.a.method = a;
  }
  get path() {
    return X(this.a).pathname;
  }
  set path(a) {
    const b = X(this.a);
    b.pathname !== a && (b.pathname = a, b.path = null, this.url = vb(b));
  }
  get query() {
    const a = this.b, b = this.G;
    return b[a] || (b[a] = xb(a));
  }
  set query(a) {
    this.b = yb(a);
  }
  get b() {
    return this.a ? X(this.a).query || "" : "";
  }
  set b(a) {
    const b = X(this.a);
    b.search !== `?${a}` && (b.search = a, b.path = null, this.url = vb(b));
  }
  get search() {
    return this.b ? `?${this.b}` : "";
  }
  set search(a) {
    this.b = a;
  }
  get host() {
    var {proxy:a} = this.l;
    a = a && this.get("X-Forwarded-Host");
    a || (2 <= this.a.httpVersionMajor && (a = this.get(":authority")), a || (a = this.get("Host")));
    return a ? a.split(/\s*,\s*/, 1)[0] : "";
  }
  get hostname() {
    const a = this.host;
    return a ? "[" == a[0] ? this.URL.hostname || "" : a.split(":", 1)[0] : "";
  }
  get URL() {
    if (!this.i) {
      const a = this.protocol, b = this.host, c = this.h || "";
      try {
        this.i = new ub(`${a}://${b}${c}`);
      } catch (d) {
        this.i = Object.create(null);
      }
    }
    return this.i;
  }
  get D() {
    return this.a.socket;
  }
  get charset() {
    try {
      const {parameters:a} = N(this.a);
      return a.charset || "";
    } catch (a) {
      return "";
    }
  }
  get length() {
    const a = this.get("Content-Length");
    return "" == a ? null : ~~a;
  }
  get protocol() {
    if (this.D.encrypted) {
      return "https";
    }
    if (!this.l.proxy) {
      return "http";
    }
    const a = this.get("X-Forwarded-Proto");
    return a ? a.split(/\s*,\s*/, 1)[0] : "http";
  }
  get s() {
    return this.m || (this.m = new ob(this.a));
  }
  set s(a) {
    this.m = a;
  }
  F(a, ...b) {
    return this.s.types(a, ...b);
  }
  is(a, ...b) {
    if (!a) {
      return P(this.a);
    }
    Array.isArray(a) || (a = [a, ...b]);
    return P(this.a, a);
  }
  get type() {
    const a = this.get("Content-Type");
    return a ? a.split(";")[0] : "";
  }
  get(a) {
    const b = this.a;
    switch(a = a.toLowerCase()) {
      case "referer":
      case "referrer":
        return b.headers.referrer || b.headers.referer || "";
      default:
        return b.headers[a] || "";
    }
  }
}
;const Ab = Symbol("context#cookies");
function Y(a, b) {
  if (null != b) {
    b instanceof Error || (b = Error(m("non-error thrown: %j", b)));
    var c = !1;
    if (a.h || !a.writable) {
      c = b.headerSent = !0;
    }
    a.i.emit("error", b, a);
    if (!c) {
      var {a:d} = a;
      "function" == typeof d.getHeaderNames ? d.getHeaderNames().forEach(e => d.removeHeader(e)) : d._headers = {};
      a.set(b.headers);
      a.type = "text";
      "ENOENT" == b.code && (b.status = 404);
      "number" == typeof b.status && F[b.status] || (b.status = 500);
      c = F[b.status];
      c = b.expose ? b.message : c;
      a.status = b.status;
      a.length = Buffer.byteLength(c);
      d.end(c);
    }
  }
}
class Z {
  constructor() {
    this.C = this.l = this.a = this.m = this.v = this.request = this.i = null;
    this[Ab] = null;
    this.url = this.path = this.query = this.method = this.search = this.D = this.b = this.is = this.get = this.F = void 0;
    this.s = null;
    this.type = this.length = this.body = this.message = this.status = this.set = this.remove = this.redirect = this.headers = this.URL = this.hostname = this.host = this.protocol = this.href = this.origin = void 0;
    this.writable = this.h = !1;
  }
  inspect() {
    return this.toJSON();
  }
  toJSON() {
    return {request:this.request.toJSON(), response:this.v.toJSON(), app:this.i.toJSON(), originalUrl:this.l, req:"<original node req>", res:"<original node res>", socket:"<original node socket>"};
  }
}
V(V((new tb(Z.prototype, "response")).method("attachment").method("redirect").method("remove").method("vary").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag"), "headerSent"), "writable");
V(V(V(V(V(V(V(V(V(V(V(V(V(V((new tb(Z.prototype, "request")).method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept"), "origin"), "href"), "subdomains"), "protocol"), "host"), "hostname"), "URL"), "header"), "headers"), "secure"), "stale"), "fresh"), "ips"), "ip");
class Bb {
  constructor() {
    this.m = this.a = this.l = this.request = this.b = this.v = null;
    this.s = void 0;
  }
  get i() {
    return this.a.getHeaders();
  }
  get headers() {
    return this.i;
  }
  get status() {
    return this.a.statusCode;
  }
  set status(a) {
    this.h || (B(Number.isInteger(a), "status code must be a number"), B(100 <= a && 999 >= a, `invalid status code: ${a}`), this.m = !0, this.a.statusCode = a, 2 > this.l.httpVersionMajor && (this.a.statusMessage = F[a]), this.body && D[a] && (this.body = null));
  }
  get message() {
    return this.a.statusMessage || F[this.status];
  }
  set message(a) {
    this.a.statusMessage = a;
  }
  get body() {
    return this.s;
  }
  set body(a) {
    const b = this.s;
    this.s = a;
    if (null == a) {
      D[this.status] || (this.status = 204), this.remove("Content-Type"), this.remove("Content-Length"), this.remove("Transfer-Encoding");
    } else {
      this.m || (this.status = 200);
      var c = !this.i["content-type"];
      "string" == typeof a ? (c && (this.type = /^\s*</.test(a) ? "html" : "text"), this.length = Buffer.byteLength(a)) : Buffer.isBuffer(a) ? (c && (this.type = "bin"), this.length = a.length) : "function" == typeof a.pipe ? (I(this.a, ya.bind(null, a)), Ja(a, d => Y(this.b, d)), null != b && b != a && this.remove("Content-Length"), c && (this.type = "bin")) : (this.remove("Content-Length"), this.type = "json");
    }
  }
  set length(a) {
    this.set("Content-Length", a);
  }
  get length() {
    const a = this.i["content-length"], b = this.body;
    return null == a ? b ? "string" == typeof b ? Buffer.byteLength(b) : Buffer.isBuffer(b) ? b.length : S(b) ? Buffer.byteLength(JSON.stringify(b)) : null : null : Math.trunc(parseInt(a, 10)) || 0;
  }
  get h() {
    return this.a.headersSent;
  }
  redirect(a, b) {
    "back" == a && (a = this.b.get("Referrer") || b || "/");
    this.set("Location", a);
    ta[this.status] || (this.status = 302);
    if (this.b.F("html")) {
      var c = La.exec(a);
      if (c) {
        b = "";
        var d, e = 0;
        for (d = c.index; d < a.length; d++) {
          switch(a.charCodeAt(d)) {
            case 34:
              c = "&quot;";
              break;
            case 38:
              c = "&amp;";
              break;
            case 39:
              c = "&#39;";
              break;
            case 60:
              c = "&lt;";
              break;
            case 62:
              c = "&gt;";
              break;
            default:
              continue;
          }
          e !== d && (b += a.substring(e, d));
          e = d + 1;
          b += c;
        }
        a = e !== d ? b + a.substring(e, d) : b;
      }
      this.type = "text/html; charset=utf-8";
      this.body = `Redirecting to <a href="${a}">${a}</a>.`;
    } else {
      this.type = "text/plain; charset=utf-8", this.body = `Redirecting to ${a}.`;
    }
  }
  set type(a) {
    var b = R.get(a);
    if (!b) {
      if (a && "string" == typeof a) {
        if (b = -1 == a.indexOf("/") ? L(a) : a) {
          if (!b.includes("charset")) {
            var c;
            if (b && "string" == typeof b) {
              var d = (c = Aa.exec(b)) && J[c[1].toLowerCase()];
              c = d && d.charset ? d.charset : c && Ba.test(c[1]) ? "UTF-8" : !1;
            } else {
              c = !1;
            }
            c && (b += "; charset=" + c.toLowerCase());
          }
        } else {
          b = !1;
        }
      } else {
        b = !1;
      }
      R.set(a, b);
    }
    (a = b) ? this.set("Content-Type", a) : this.remove("Content-Type");
  }
  get type() {
    const a = this.get("Content-Type");
    return a ? a.split(";", 1)[0] : "";
  }
  is(a, ...b) {
    const c = this.type;
    if (!a) {
      return c || !1;
    }
    Array.isArray(a) || (a = [a, ...b]);
    return O(c, a);
  }
  get(a) {
    return this.i[a.toLowerCase()] || "";
  }
  set(a, b) {
    if (!this.h) {
      if (2 == arguments.length) {
        Array.isArray(b) ? b = b.map(c => "string" == typeof c ? c : String(c)) : "string" != typeof b && (b = String(b)), this.a.setHeader(a, b);
      } else {
        for (const c in a) {
          this.set(c, a[c]);
        }
      }
    }
  }
  remove(a) {
    this.h || this.a.removeHeader(a);
  }
  get writable() {
    if (this.a.finished) {
      return !1;
    }
    const a = this.a.socket;
    return a ? a.writable : !0;
  }
  inspect() {
    if (this.a) {
      var a = this.toJSON();
      a.body = this.body;
      return a;
    }
  }
  toJSON() {
    return G(this, ["status", "message", "header"]);
  }
}
;/*
 MIT
 (c) dead-horse
 https://npmjs.org/koa-compose
*/
function Cb(a) {
  if (!Array.isArray(a)) {
    throw new TypeError("Middleware stack must be an array!");
  }
  for (const b of a) {
    if ("function" != typeof b) {
      throw new TypeError("Middleware must be composed of functions!");
    }
  }
  return async function(b, c) {
    async function d(f) {
      if (f <= e) {
        throw Error("next() called multiple times");
      }
      e = f;
      let g = a[f];
      f === a.length && (g = c);
      g && await g(b, d.bind(null, f + 1));
    }
    let e = -1;
    return await d(0);
  };
}
;const Db = function() {
  const a = new ja(v);
  return function(b) {
    const c = fa(a);
    c.namespace = b;
    c.useColors = v.useColors();
    c.enabled = a.enabled(b);
    c.color = ha(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    ia(a);
    return c;
  };
}()("@goa/koa:application");
async function Eb(a, b) {
  const c = a.a;
  c.statusCode = 404;
  I(c, d => Y(a, d));
  try {
    return await b(a), await Fb(a);
  } catch (d) {
    Y(a, d);
  }
}
class Gb extends pa {
  constructor() {
    super();
    this.silent = this.proxy = !1;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || "development";
    this.context = Z.prototype;
    this.request = zb.prototype;
    this.response = Bb.prototype;
    this.keys = void 0;
  }
  listen(...a) {
    Db("listen");
    return oa(this.callback()).listen(...a);
  }
  toJSON() {
    return G(this, ["subdomainOffset", "proxy", "env"]);
  }
  inspect() {
    return this.toJSON();
  }
  use(a) {
    if ("function" != typeof a) {
      throw new TypeError("middleware must be a function!");
    }
    if ("function" != typeof a ? 0 : ma.test(la.call(a)) || (w ? x(a) == na : "[object GeneratorFunction]" == ka.call(a))) {
      throw Error("Generator functions are not supported by @goa/koa. Use koa-convert on them first.");
    }
    Db("use %s", a.R || a.name || "-");
    this.middleware.push(a);
    return this;
  }
  callback() {
    const a = Cb(this.middleware);
    if (!this.listenerCount("error")) {
      this.on("error", this.a);
    }
    return (b, c) => {
      {
        const d = Object.create(this.context), e = d.request = Object.create(this.request), f = d.v = Object.create(this.response);
        d.i = e.l = f.v = this;
        d.m = e.a = f.l = b;
        d.a = e.C = f.a = c;
        e.v = f.b = d;
        e.J = f;
        f.request = e;
        d.l = e.h = b.url;
        d.C = {};
        b = d;
      }
      return Eb(b, a);
    };
  }
  a(a) {
    if (!(a instanceof Error)) {
      throw new TypeError(m("non-error thrown: %j", a));
    }
    404 == a.status || a.expose || this.silent || (a = a.stack || a.toString(), console.error(), console.error(a.replace(/^/gm, "  ")), console.error());
  }
}
function Fb(a) {
  if (a.writable) {
    var b = a.a, c = a.body, d = a.status;
    if (D[d]) {
      return a.body = null, b.end();
    }
    if ("HEAD" == a.method) {
      return !b.headersSent && S(c) && (a.length = Buffer.byteLength(JSON.stringify(c))), b.end();
    }
    if (null == c) {
      return 2 <= a.m.httpVersionMajor ? c = String(d) : c = a.message || String(d), b.headersSent || (a.type = "text", a.length = Buffer.byteLength(c)), b.end(c);
    }
    if (Buffer.isBuffer(c)) {
      return b.end(c);
    }
    if ("string" == typeof c) {
      return b.end(c);
    }
    if (c instanceof A) {
      return c.pipe(b);
    }
    c = JSON.stringify(c);
    b.headersSent || (a.length = Buffer.byteLength(c));
    b.end(c);
  }
}
;const Hb = new Gb;
Hb.use(a => {
  a.body = "hello world";
});
Hb.listen(3000, () => {
  console.log("http://localhost:3000");
});


//# sourceMappingURL=index.js.map