! function(e, t) {
    var i = e.document,
        a = i.documentElement,
        n = i.querySelector("meta[name='viewport']"),
        r = i.querySelector("meta[name='responsive']"),
        s = Math.floor(e.devicePixelRatio) || 1,
        o = [1, 2, 3],
        c = 0,
        l = 0,
        d = 0;
    if (t.isScalable = isScalable = function() {
            if (e.isPGC) return !1;
            var t = e.navigator.appVersion.match(/iphone/gi),
                i = e.navigator.appVersion.match(/android/gi),
                a = !!e.chrome,
                n = e.navigator.userAgent,
                r = n.match(/MicroMessenger\/([\d\.]+)/i);
            if (t) {
                var s = n.match(/(iPhone\sOS)\s([\d_]+)/);
                return parseFloat(s[2]) < 7 ? !1 : !0 
            }
            if (i) {
                var o = n.match(/AppleWebKit\/([\d\.]+)/i),
                    c = n.match(/UCBrowser\/([\d\.]+)/i),
                    l = (n.match(/MQQBrowser\/([\d\.]+)/i), n.match(/Chrome\/([\d\.]+)/i)),
                    d = n.match(/MiuiBrowser/i);
                return o && parseFloat(o[1]) >= 537.36 && d ? !0 : c && parseFloat(c[1]) >= 9.6 || r && parseFloat(r[1]) >= 6.1 ? !0 : l && parseFloat(l[1]) >= 30 && a ? !0 : !1 
            }
            return !1 
        }(), 
    r && isScalable && (content = r.getAttribute("content"))) {
        var h = content.match(/initial\-dpr=([\d\.]+)/);
        h && (c = Math.floor(h[1])) 
    }
    if (c || (c = isScalable ? o.indexOf(s) > -1 ? s : 3 : 1), t.dpr = c, t.scale = l = 1 / c, !n) {
        var m = 1 == l ? "width=device-width, " : "";
        if (n = i.createElement("meta"), n.setAttribute("name", "viewport"), n.setAttribute("content", m + "initial-scale=" + l + ", maximum-scale=" + l + ", minimum-scale=" + l + ", user-scalable=no"), a.firstElementChild) 
        	a.firstElementChild.appendChild(n);
        else {
            var p = i.createElement("div");
            p.appendChild(n), i.write(p.innerHTML) 
        } 
    }
    t.changeScale = function(t, i) {
        if ("initial" != t) {
            if (!this.isScalable) return void(this.dpr = 1);
            var t = Math.floor(t) || s;
            this.dpr = o.indexOf(t) > -1 ? t : 3, this.scale = (1 / this.dpr).toFixed(2), this.scaleLock = i || !1;
            var r = "1.00" == this.scale ? "device-width" : e.innerWidth;
            n.setAttribute("content", "width=" + r + ",initial-scale=" + this.scale + ", maximum-scale=" + this.scale + ", minimum-scale=" + this.scale + ", user-scalable=no") 
        }
        this.baseFontSize = a.getBoundingClientRect().width / 10, 
        this.baseFontSize = Math.max(this.baseFontSize, 32), 
        a.style.fontSize = this.baseFontSize + "px", 
        a.setAttribute("data-dpr", this.dpr) 
    },
	a.getBoundingClientRect().width > e.innerWidth ? t.changeScale() : t.changeScale("initial"), 
	i.addEventListener("DOMContentLoaded", function() { 
		i.body.style.fontSize = 12 * c + "px" }, 
	!1), 
	e.addEventListener("orientationchange", function() { 
		clearTimeout(d), t.scaleLock || window.isPGC || (d = setTimeout(t.changeScale, 300)) 
	}, !1), 
	e.addEventListener("pageshow", function(e) { 
		e.persisted && (clearTimeout(d), t.scaleLock || window.isPGC || (d = setTimeout(t.changeScale, 300))) 
	}, !1), 

	t.rem2px = function(e) {
        var t = parseFloat(e) * this.dpr * this.baseFontSize;
        return "string" == typeof e && e.match(/rem$/) && (t += "px"), t 
    }, 
    t.px2rem = function(e) {
        var t = parseFloat(e) * this.dpr / this.baseFontSize;
        return "string" == typeof e && e.match(/px$/) && (t += "rem"), t 
    }, 
    t.px2px = function(e) {
        var t = parseFloat(e) * this.dpr;
        return "string" == typeof e && e.match(/px$/) && (t += "px"), t 
    }
}(window, window.responsive || (window.responsive = {}));
