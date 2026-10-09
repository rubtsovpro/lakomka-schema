(function () {
    var KIND = {
        check: "проверка",
        route: "маршрут",
        task: "задание",
        screen: "экран",
        onec: "1С",
        result: "факт",
        open: "не ясно",
        entry: "вход"
    };

    function N(id, title, kind, children, extra) {
        var o = { id: id, title: title, kind: kind || "check", children: children || [] };
        if (extra) {
            if (extra.note) o.note = extra.note;
            ["screen_task", "screen_id", "review_status", "ui_review_status", "approved_scope", "approval_sources", "route_target_id", "continuation_after_route"].forEach(function (key) {
                if (extra[key] !== undefined) o[key] = extra[key];
            });
            if (extra.steps) o.steps = extra.steps;
            if (extra.side) o.side = extra.side;
            if (extra.links) o.links = extra.links;
            if (extra.edge) o.edge = extra.edge;
        }
        return o;
    }

    function fromExport(n) {
        var extra = {};
        if (n.edge) extra.edge = n.edge;
        if (n.links && n.links.length) extra.links = n.links.slice();
        if (n.notes) extra.note = n.notes;
        ["screen_task", "screen_id", "review_status", "ui_review_status", "approved_scope", "approval_sources", "route_target_id", "continuation_after_route"].forEach(function (key) {
            if (n[key] !== undefined) extra[key] = n[key];
        });
        return N(n.id, n.title, n.kind, (n.children || []).map(fromExport), extra);
    }
    var SCHEMA = window.LAKOM_SCHEMA_EXPORT;
    if (!SCHEMA || !SCHEMA.rootTopic) {
        throw new Error("lakom-schema-data.js не загружен");
    }
    var ROOT = fromExport(SCHEMA.rootTopic);
    if (SCHEMA.entryId) {
        ROOT.title = "Заказ покупателя";
        (function liftDuplicateOrderCards(n) {
            var next = [];
            (n.children || []).forEach(function (c) {
                liftDuplicateOrderCards(c);
                var t = String(c.title || "").replace(/\s+/g, " ").trim();
                if (c.id !== "root" && /^заказ покупателя$/i.test(t)) {
                    (c.children || []).forEach(function (g) { next.push(g); });
                    return;
                }
                next.push(c);
            });
            n.children = next;
        })(ROOT);
    }
    (ROOT.children || []).forEach(function (c, i) {
        c.side = i < 5 ? "right" : "left";
    });

    var pageEl = document.getElementById("smPage");
    var LS = (pageEl && pageEl.getAttribute("data-map-ls")) || "lakom-xmind-v7";
    var defaultOpen = { root: true };
    (ROOT.children || []).forEach(function (c) { defaultOpen[c.id] = true; });
    var state = { open: defaultOpen, selected: "root", scale: 0.58, x: 80, y: 40, highlightOpen: false, showApi: false, checked: {} };
    var sharedBoard = !!(pageEl
        && pageEl.getAttribute("data-presence-url")
        && pageEl.getAttribute("data-checks-url")
        && pageEl.getAttribute("data-me-login"));
    try {
        var saved = JSON.parse(localStorage.getItem(LS) || "null");
        if (saved) {
            if (!sharedBoard && saved.open) state.open = saved.open;
            if (!sharedBoard && saved.checked && typeof saved.checked === "object") state.checked = saved.checked;
            if (typeof saved.scale === "number") state.scale = saved.scale;
            if (typeof saved.x === "number") state.x = saved.x;
            if (typeof saved.y === "number") state.y = saved.y;
            if (saved.selected) state.selected = saved.selected;
            if (saved.highlightOpen) state.highlightOpen = !!saved.highlightOpen;
            if (saved.showApi) state.showApi = !!saved.showApi;
        }
        if (!state.checked || typeof state.checked !== "object") state.checked = {};
    } catch (e) {}

    function save() {
        try { localStorage.setItem(LS, JSON.stringify({ open: state.open, selected: state.selected, scale: state.scale, highlightOpen: state.highlightOpen, showApi: state.showApi, checked: state.checked })); } catch (e2) {}
    }

    var ignoreOpenUntil = 0;
    var lastOpenRev = "";
    var ignoreChecksUntil = 0;
    var lastChecksRev = "";
    var pushTree = null;
    function openKey(o) {
        return Object.keys(o || {}).filter(function (k) { return o[k]; }).sort().join(",");
    }
    function fetchBoardGet(url) {
        var u = url + (url.indexOf("?") >= 0 ? "&" : "?") + "_=" + Date.now();
        return fetch(u, {
            cache: "no-store",
            headers: {
                Accept: "application/json",
                "Cache-Control": "no-cache",
                Pragma: "no-cache"
            },
            credentials: "same-origin"
        }).then(function (r) { return r.json(); });
    }
    function shareOpen() {
        ignoreOpenUntil = Date.now() + 400;
        var cfg = pageCfg();
        if (cfg.checks && cfg.csrf) {
            fetch(cfg.checks, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": cfg.csrf,
                    "X-Requested-With": "XMLHttpRequest"
                },
                credentials: "same-origin",
                body: JSON.stringify({ open: state.open })
            }).then(function (r) { return r.json(); }).then(function (j) {
                if (j && j.ok && j.openRev) lastOpenRev = j.openRev;
            }).catch(function () {});
        }
        if (typeof pushTree === "function") pushTree();
    }
    function normalizeOpen(open) {
        var next = { root: true };
        if (!open || typeof open !== "object") return next;
        if (Array.isArray(open)) {
            open.forEach(function (k) {
                if (k) next[String(k)] = true;
            });
            return next;
        }
        Object.keys(open).forEach(function (k) {
            if (open[k] === true || open[k] === 1 || open[k] === "1") next[k] = true;
        });
        return next;
    }
    function applySharedOpen(open, rev) {
        if (open == null || typeof open !== "object") return;
        if (Date.now() < ignoreOpenUntil) return;
        var next = normalizeOpen(open);
        if (openKey(next) === openKey(state.open)) {
            if (rev) lastOpenRev = rev;
            return;
        }
        if (rev) lastOpenRev = rev;
        state.open = next;
        save();
        draw();
    }
    function applySharedChecks(nodes, rev) {
        if (nodes == null || typeof nodes !== "object") return;
        if (Date.now() < ignoreChecksUntil) return;
        var next = {};
        Object.keys(nodes).forEach(function (id) {
            if (nodes[id]) next[id] = true;
        });
        if (openKey(next) === openKey(state.checked)) {
            if (rev) lastChecksRev = rev;
            return;
        }
        if (rev) lastChecksRev = rev;
        state.checked = next;
        save();
        draw();
    }

    var ALL = {};
    function reindex() {
        ALL = {};
        (function index(n, p) {
            ALL[n.id] = { node: n, parent: p || null };
            (n.children || []).forEach(function (c) { index(c, n); });
        })(ROOT, null);
    }
    reindex();
    (SCHEMA.relationships || []).forEach(function (r) {
        var a = ALL[r.end1Id] && ALL[r.end1Id].node;
        var b = ALL[r.end2Id] && ALL[r.end2Id].node;
        if (!a || !b) return;
        var isChild = (a.children || []).some(function (c) { return c.id === b.id; });
        if (isChild) {
            if (r.label && !b.edge) b.edge = r.label;
            return;
        }
        if (!a.links) a.links = [];
        if (a.links.indexOf(b.id) === -1) a.links.push(b.id);
        if (!a.linkLabels) a.linkLabels = {};
        if (r.label) a.linkLabels[b.id] = r.label;
    });

    function depthOf(id) {
        var d = 0;
        var cur = ALL[id];
        while (cur && cur.parent) {
            d += 1;
            cur = ALL[cur.parent.id];
        }
        return d;
    }
    function sectionId(id) {
        var cur = ALL[id];
        while (cur && cur.parent && cur.parent.id !== "root") cur = ALL[cur.parent.id];
        return cur && cur.parent && cur.parent.id === "root" ? cur.node.id : null;
    }
    function isAncestor(maybeAnc, node) {
        var cur = ALL[node.id];
        while (cur && cur.parent) {
            if (cur.parent.id === maybeAnc.id) return true;
            cur = ALL[cur.parent.id];
        }
        return false;
    }
    function detachNode(node) {
        var rec = ALL[node.id];
        if (!rec || !rec.parent || !rec.parent.children) return;
        rec.parent.children = rec.parent.children.filter(function (c) { return c.id !== node.id; });
    }
    if (!SCHEMA.preserveTopology && (SCHEMA.relationships || []).length) {
    (function rehomeForks() {
        var bySrc = {};
        (SCHEMA.relationships || []).forEach(function (r) {
            if (!bySrc[r.end1Id]) bySrc[r.end1Id] = [];
            bySrc[r.end1Id].push(r);
        });
        var srcIds = Object.keys(bySrc).sort(function (a, b) { return depthOf(a) - depthOf(b); });
        srcIds.forEach(function (sid) {
            var src = ALL[sid] && ALL[sid].node;
            if (!src) return;
            var rels = bySrc[sid];
            var fork = src.kind === "check" || rels.length >= 2;
            if (!fork) return;
            var sec = sectionId(sid);
            rels.forEach(function (r) {
                var tgt = ALL[r.end2Id] && ALL[r.end2Id].node;
                if (!tgt || tgt.id === src.id) return;
                if (isAncestor(tgt, src)) return;
                var same = sectionId(tgt.id) === sec && sec;
                if (!same) {
                    var jumpId = (src.id + "_to_" + tgt.id).slice(0, 64);
                    if (src.children.some(function (c) { return c.id === tgt.id || c.id === jumpId; })) {
                        if (r.label) {
                            src.children.forEach(function (c) {
                                if (c.id === jumpId && !c.edge) c.edge = r.label;
                            });
                        }
                        return;
                    }
                    var secTitle = (ALL[sectionId(tgt.id)] && ALL[sectionId(tgt.id)].node.title) || tgt.title;
                    src.children.push(N(jumpId, "→ " + secTitle, "route", [], {
                        edge: r.label || "далее",
                        links: [tgt.id]
                    }));
                    return;
                }
                if (!(src.children || []).some(function (c) { return c.id === tgt.id; })) {
                    detachNode(tgt);
                    src.children.push(tgt);
                }
                if (r.label) tgt.edge = r.label;
            });
        });
        reindex();
        Object.keys(ALL).forEach(function (id) {
            if (ALL[id].node.kind === "check") state.open[id] = true;
        });
    })();
    }

    function cloneTree(n) {
        var o = {
            id: n.id,
            title: n.title,
            kind: n.kind,
            children: (n.children || []).map(cloneTree)
        };
        if (n.note) o.note = n.note;
        ["screen_task", "screen_id", "review_status", "ui_review_status", "approved_scope", "approval_sources", "route_target_id", "continuation_after_route"].forEach(function (key) {
            if (n[key] !== undefined) o[key] = n[key];
        });
        if (n.steps) o.steps = n.steps.slice();
        if (n.side) o.side = n.side;
        if (n.edge) o.edge = n.edge;
        if (n.links) o.links = n.links.slice();
        if (n.linkLabels) o.linkLabels = Object.assign({}, n.linkLabels);
        if (n.loose) o.loose = true;
        if (n.user) o.user = true;
        return o;
    }
    var ORIGIN = cloneTree(ROOT);
    var graphEdits = { titles: {}, extra: [], parents: {}, links: null, removed: [], loose: [] };
    var lastEditsRev = "";
    var ignoreEditsUntil = 0;
    var editsKey = "";

    function editsFingerprint(e) {
        try { return JSON.stringify(e || {}); } catch (err) { return ""; }
    }
    function findInTree(n, id) {
        if (!n) return null;
        if (n.id === id) return n;
        var ch = n.children || [];
        for (var i = 0; i < ch.length; i++) {
            var f = findInTree(ch[i], id);
            if (f) return f;
        }
        return null;
    }
    function collectLinksSnapshot() {
        var out = [];
        Object.keys(ALL).forEach(function (id) {
            var n = ALL[id].node;
            (n.links || []).forEach(function (tid) {
                if ((n.children || []).some(function (c) { return c.id === tid; })) return;
                var lab = (n.linkLabels && n.linkLabels[tid]) || "";
                out.push({ from: id, to: tid, label: lab });
            });
        });
        return out;
    }
    function seedLinks() {
        if (!graphEdits.links) graphEdits.links = collectLinksSnapshot();
    }
    function setLooseFlag(id, on) {
        graphEdits.loose = (graphEdits.loose || []).filter(function (x) { return x !== id; });
        if (on) graphEdits.loose.push(id);
    }
    function insertChild(parent, node, opts) {
        parent.children = parent.children || [];
        opts = opts || {};
        var idx = -1;
        var i;
        if (opts.after) {
            for (i = 0; i < parent.children.length; i++) {
                if (parent.children[i].id === opts.after) {
                    idx = i + 1;
                    break;
                }
            }
        } else if (opts.before) {
            for (i = 0; i < parent.children.length; i++) {
                if (parent.children[i].id === opts.before) {
                    idx = i;
                    break;
                }
            }
        }
        if (idx < 0 || idx > parent.children.length) parent.children.push(node);
        else parent.children.splice(idx, 0, node);
    }
    function rebuildFromEdits() {
        ROOT = cloneTree(ORIGIN);
        (graphEdits.extra || []).forEach(function (ex) {
            if ((graphEdits.removed || []).indexOf(ex.id) >= 0) return;
            if (findInTree(ROOT, ex.id)) return;
            var node = N(ex.id, ex.title || "Новый блок", ex.kind || "task", []);
            node.user = true;
            if (ex.loose) node.loose = true;
            var parent = findInTree(ROOT, ex.parent) || ROOT;
            insertChild(parent, node, { after: ex.after, before: ex.before });
        });
        reindex();
        (graphEdits.removed || []).forEach(function (id) {
            if (id === "root") return;
            var rec = ALL[id];
            if (rec && rec.node) detachNode(rec.node);
        });
        reindex();
        Object.keys(graphEdits.titles || {}).forEach(function (id) {
            if (ALL[id]) ALL[id].node.title = graphEdits.titles[id];
        });
        Object.keys(graphEdits.parents || {}).forEach(function (cid) {
            var rec = ALL[cid];
            var p = ALL[graphEdits.parents[cid]] && ALL[graphEdits.parents[cid]].node;
            if (!rec || !rec.node || rec.node.id === "root" || !p) return;
            if (isAncestor(rec.node, p) || rec.node.id === p.id) return;
            detachNode(rec.node);
            insertChild(p, rec.node, {});
        });
        reindex();
        (graphEdits.loose || []).forEach(function (id) {
            if (ALL[id]) ALL[id].node.loose = true;
        });
        (graphEdits.extra || []).forEach(function (ex) {
            if (ALL[ex.id]) ALL[ex.id].node.user = true;
        });
        if (graphEdits.links) {
            Object.keys(ALL).forEach(function (id) {
                ALL[id].node.links = [];
                ALL[id].node.linkLabels = {};
            });
            graphEdits.links.forEach(function (e) {
                var a = ALL[e.from] && ALL[e.from].node;
                var b = ALL[e.to] && ALL[e.to].node;
                if (!a || !b || e.from === e.to) return;
                if ((a.children || []).some(function (c) { return c.id === e.to; })) return;
                a.links.push(e.to);
                if (e.label) a.linkLabels[e.to] = e.label;
            });
        }
        reindex();
    }
    function incomingLinkCount(id) {
        var n = 0;
        Object.keys(ALL).forEach(function (sid) {
            var src = ALL[sid].node;
            if ((src.links || []).indexOf(id) >= 0) n += 1;
        });
        return n;
    }
    function canDeleteNode(n) {
        if (!n || n.id === "root") return false;
        if ((n.children || []).length) return false;
        if ((n.links || []).length) return false;
        if (incomingLinkCount(n.id)) return false;
        return true;
    }
    function schemaToast(text) {
        var el = document.getElementById("smToast");
        if (!el) {
            el = document.createElement("div");
            el.id = "smToast";
            el.className = "sm-toast";
            document.body.appendChild(el);
        }
        el.textContent = text || "";
        el.classList.add("is-on");
        clearTimeout(schemaToast._t);
        schemaToast._t = setTimeout(function () { el.classList.remove("is-on"); }, 2400);
    }
    function postEdits() {
        ignoreEditsUntil = Date.now() + 1500;
        editsKey = editsFingerprint(graphEdits);
        var cfg = pageCfg();
        if (!cfg.checks || !cfg.csrf) return;
        fetch(cfg.checks, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": cfg.csrf,
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: "same-origin",
            body: JSON.stringify({ edits: graphEdits })
        }).then(function (r) { return r.json(); }).then(function (j) {
            if (j && j.ok && j.editsRev) lastEditsRev = j.editsRev;
            if (j && j.ok && j.versions) applyVersions(j.versions);
        }).catch(function () {});
    }
    var HIST_MAX = 50;
    var hist = [];
    var histPtr = -1;
    function cloneEdits(e) {
        return JSON.parse(JSON.stringify(e || { titles: {}, extra: [], parents: {}, links: null, removed: [], loose: [] }));
    }
    function fmtHistTime(t) {
        try {
            var d = new Date(t);
            return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        } catch (err) {
            return "";
        }
    }
    function renderHistUi() {
        var undo = document.getElementById("btnUndo");
        var redo = document.getElementById("btnRedo");
        var sel = document.getElementById("smHistSelect");
        if (undo) undo.disabled = histPtr <= 0;
        if (redo) redo.disabled = histPtr < 0 || histPtr >= hist.length - 1;
        if (!sel) return;
        if (document.activeElement === sel) return;
        var html = "";
        hist.forEach(function (step, i) {
            var n = i + 1;
            var mark = i === histPtr ? " · сейчас" : "";
            html += '<option value="' + i + '"' + (i === histPtr ? " selected" : "") + ">"
                + n + "/" + hist.length + " — " + (step.label || "Шаг") + " · " + fmtHistTime(step.t) + mark
                + "</option>";
        });
        sel.innerHTML = html;
        sel.value = String(Math.max(0, histPtr));
        sel.disabled = hist.length < 2;
    }
    function pushHistory(label) {
        var fp = editsFingerprint(graphEdits);
        if (histPtr >= 0 && hist[histPtr] && editsFingerprint(hist[histPtr].edits) === fp) {
            renderHistUi();
            return;
        }
        hist = hist.slice(0, histPtr + 1);
        hist.push({ edits: cloneEdits(graphEdits), label: label || "Правка", t: Date.now() });
        while (hist.length > HIST_MAX) hist.shift();
        histPtr = hist.length - 1;
        renderHistUi();
    }
    function jumpHistory(i) {
        i = Number(i);
        if (!hist.length || i < 0 || i >= hist.length || i === histPtr) return;
        histPtr = i;
        graphEdits = cloneEdits(hist[i].edits);
        rebuildFromEdits();
        save();
        draw();
        postEdits();
        renderHistUi();
        schemaToast(hist[i].label || ("Шаг " + (i + 1)));
    }
    function undoHistory() {
        if (histPtr <= 0) return;
        jumpHistory(histPtr - 1);
    }
    function redoHistory() {
        if (histPtr >= hist.length - 1) return;
        jumpHistory(histPtr + 1);
    }
    function commitGraph(label) {
        rebuildFromEdits();
        save();
        draw();
        postEdits();
        pushHistory(label || "Правка");
    }
    function applySharedEdits(data, rev) {
        if (Date.now() < ignoreEditsUntil) return;
        if (!data || typeof data !== "object") return;
        if (rev && rev === lastEditsRev) return;
        var next = {
            titles: data.titles || {},
            extra: data.extra || [],
            parents: data.parents || {},
            links: data.links === undefined ? null : data.links,
            removed: data.removed || [],
            loose: data.loose || []
        };
        var fp = editsFingerprint(next);
        if (fp === editsKey) {
            if (rev) lastEditsRev = rev;
            return;
        }
        graphEdits = next;
        editsKey = fp;
        if (rev) lastEditsRev = rev;
        rebuildFromEdits();
        draw();
        pushHistory("С доски");
        applyVersions(null);
    }
    var schemaVersions = [];
    var versionsKey = "";
    function versionsFingerprint(list) {
        return (list || []).map(function (v) { return (v && v.id ? v.id : "") + "\t" + (v && v.name ? v.name : ""); }).join("\n");
    }
    function fillVersionSelect(force) {
        var sel = document.getElementById("smVerSelect");
        if (!sel) return;
        if (!force && document.activeElement === sel) return;
        var key = versionsFingerprint(schemaVersions);
        if (!force && key === versionsKey && sel.options.length) return;
        versionsKey = key;
        var keepFocus = document.activeElement === sel;
        sel.innerHTML = "";
        var o0 = document.createElement("option");
        o0.value = "";
        o0.textContent = schemaVersions.length ? ("Версии (" + schemaVersions.length + ")") : "Версий пока нет";
        sel.appendChild(o0);
        schemaVersions.forEach(function (v) {
            if (!v || !v.id) return;
            var opt = document.createElement("option");
            opt.value = v.id;
            var when = "";
            try {
                when = new Date(v.ts).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
            } catch (err) {}
            opt.textContent = (v.name || "Версия") + (when ? (" · " + when) : "") + (v.user ? (" · " + v.user) : "");
            sel.appendChild(opt);
        });
        sel.value = "";
        if (keepFocus) sel.blur();
    }
    function applyVersions(list) {
        if (list && Array.isArray(list)) schemaVersions = list;
        fillVersionSelect(false);
    }
    function setVerBox(on) {
        var box = document.getElementById("smVerBox");
        if (!box) return;
        box.hidden = !on;
        box.classList.toggle("sm-hidden", !on);
        if (on) {
            var inp = document.getElementById("smVerName");
            if (inp) {
                inp.value = "";
                setTimeout(function () { inp.focus(); }, 30);
            }
        }
    }
    function postSchema(body) {
        var cfg = pageCfg();
        if (!cfg.checks || !cfg.csrf) return Promise.reject(new Error("нет API"));
        return fetch(cfg.checks, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": cfg.csrf,
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: "same-origin",
            body: JSON.stringify(body)
        }).then(function (r) { return r.json(); });
    }
    function saveNamedVersion() {
        var inp = document.getElementById("smVerName");
        var name = inp ? String(inp.value || "").replace(/\s+/g, " ").trim() : "";
        if (!name) {
            schemaToast("Введите название версии");
            if (inp) inp.focus();
            return;
        }
        ignoreEditsUntil = Date.now() + 1500;
        postSchema({
            schema_action: "save_version",
            version_name: name.slice(0, 80),
            edits: graphEdits
        }).then(function (j) {
            if (!j || !j.ok) {
                schemaToast((j && j.error) || "Не удалось сохранить");
                return;
            }
            if (j.editsRev) lastEditsRev = j.editsRev;
            applyVersions(j.versions || []);
            setVerBox(false);
            schemaToast("Версия «" + name + "» сохранена");
        }).catch(function () { schemaToast("Не удалось сохранить"); });
    }
    function restoreNamedVersion(id) {
        if (!id) return;
        var meta = null;
        schemaVersions.forEach(function (v) { if (v.id === id) meta = v; });
        var title = meta && meta.name ? meta.name : "эту версию";
        ignoreEditsUntil = Date.now() + 1500;
        postSchema({ schema_action: "restore_version", version_id: id }).then(function (j) {
            if (!j || !j.ok) {
                schemaToast((j && j.error) || "Не удалось открыть");
                applyVersions(schemaVersions);
                return;
            }
            var next = j.edits || { titles: {}, extra: [], parents: {}, links: null, removed: [], loose: [] };
            graphEdits = cloneEdits(next);
            editsKey = editsFingerprint(graphEdits);
            if (j.editsRev) lastEditsRev = j.editsRev;
            rebuildFromEdits();
            save();
            draw();
            pushHistory("Версия: " + title);
            applyVersions(j.versions || schemaVersions);
            fillVersionSelect(true);
            schemaToast("Открыта «" + title + "»");
        }).catch(function () {
            schemaToast("Не удалось открыть");
            applyVersions(schemaVersions);
        });
    }
    function addLink(from, to, label) {
        if (!from || !to || from === to) return false;
        seedLinks();
        var dup = graphEdits.links.some(function (e) { return e.from === from && e.to === to; });
        if (dup) return false;
        if (ALL[from] && (ALL[from].node.children || []).some(function (c) { return c.id === to; })) return false;
        graphEdits.links.push({ from: from, to: to, label: label || "" });
        return true;
    }
    function removeLink(from, to) {
        seedLinks();
        graphEdits.links = graphEdits.links.filter(function (e) { return !(e.from === from && e.to === to); });
    }
    function retargetLink(from, to, end, otherId) {
        seedLinks();
        if (end === "to") {
            if (otherId === from) return false;
            return graphEdits.links.some(function (e) {
                if (e.from !== from || e.to !== to) return false;
                e.to = otherId;
                return true;
            });
        }
        if (otherId === to) return false;
        return graphEdits.links.some(function (e) {
            if (e.from !== from || e.to !== to) return false;
            e.from = otherId;
            return true;
        });
    }
    function detachTreeChild(childId) {
        var rec = ALL[childId];
        if (!rec || !rec.parent || rec.node.id === "root") return;
        graphEdits.parents[childId] = "root";
        setLooseFlag(childId, true);
        rec.node.loose = true;
    }
    function rewireEdge(meta, end, dropId) {
        if (!meta || !dropId || dropId === "root" && meta.type === "new") {
            /* allow new link to any including root? skip root as target for new */
        }
        if (!dropId || !ALL[dropId]) {
            schemaToast("Отпустите на блоке");
            return;
        }
        if (meta.type === "new") {
            if (dropId === meta.from) return;
            if (addLink(meta.from, dropId, "далее")) {
                setLooseFlag(dropId, false);
                commitGraph();
            } else {
                schemaToast("Такая связь уже есть");
            }
            return;
        }
        if (meta.type === "link") {
            var nf = end === "from" ? dropId : meta.from;
            var nt = end === "to" ? dropId : meta.to;
            if (nf === nt) {
                schemaToast("Нельзя замкнуть блок на себя");
                return;
            }
            seedLinks();
            if (graphEdits.links.some(function (e) { return e.from === nf && e.to === nt && !(e.from === meta.from && e.to === meta.to); })) {
                schemaToast("Такая связь уже есть");
                return;
            }
            retargetLink(meta.from, meta.to, end, dropId);
            commitGraph();
            return;
        }
        if (meta.type === "tree") {
            var childId = meta.to;
            var parentId = meta.from;
            if (end === "to") {
                if (dropId === childId) return;
                seedLinks();
                detachTreeChild(childId);
                if (dropId !== parentId) addLink(parentId, dropId, meta.label || "");
                commitGraph();
                return;
            }
            if (end === "from") {
                if (dropId === parentId) return;
                if (dropId === childId) {
                    schemaToast("Нельзя замкнуть блок на себя");
                    return;
                }
                if (isAncestor(ALL[childId].node, ALL[dropId].node)) {
                    schemaToast("Так получится петля");
                    return;
                }
                detachTreeChild(childId);
                addLink(dropId, childId, meta.label || "");
                commitGraph();
            }
        }
    }
    function newBlockId() {
        return ("u" + Math.random().toString(16).slice(2) + Date.now().toString(16)).slice(0, 20);
    }
    function typingInField(e) {
        return !!(e && e.target && e.target.closest && e.target.closest("input, textarea, select, [contenteditable=true]"));
    }
    function kindForNew(parentNode, siblingId) {
        if (siblingId && ALL[siblingId] && ALL[siblingId].node) return ALL[siblingId].node.kind || "task";
        var ch = (parentNode && parentNode.children) || [];
        if (ch.length) return ch[ch.length - 1].kind || "task";
        return "task";
    }
    function createBlock(mode) {
        mode = mode || "child";
        var rec = state.selected && ALL[state.selected] ? ALL[state.selected] : ALL.root;
        if (!rec || !rec.node) rec = ALL.root;
        var sel = rec.node;
        var pid = sel.id;
        var after = "";
        var before = "";
        var kind = "task";
        if (mode === "sibling" || mode === "siblingBefore") {
            if (sel.id === "root" || !rec.parent) {
                mode = "child";
            } else {
                pid = rec.parent.id;
                kind = kindForNew(rec.parent, sel.id);
                if (mode === "siblingBefore") before = sel.id;
                else after = sel.id;
            }
        }
        if (mode === "parent") {
            if (sel.id === "root" || !rec.parent) {
                mode = "child";
            } else {
                var gpid = rec.parent.id;
                var idP = newBlockId();
                graphEdits.extra.push({
                    id: idP,
                    title: "Новый блок",
                    kind: sel.kind || "task",
                    parent: gpid,
                    before: sel.id
                });
                graphEdits.parents[sel.id] = idP;
                state.selected = idP;
                state.open[gpid] = true;
                state.open[idP] = true;
                commitGraph("Тема над");
                setTimeout(function () { startRename(idP); }, 40);
                return;
            }
        }
        if (mode === "child") {
            pid = sel.id;
            kind = kindForNew(sel, null);
            after = "";
            before = "";
        }
        var id = newBlockId();
        var row = {
            id: id,
            title: "Новый блок",
            kind: kind,
            parent: pid,
            loose: pid === "root"
        };
        if (after) row.after = after;
        if (before) row.before = before;
        graphEdits.extra.push(row);
        if (pid === "root") setLooseFlag(id, true);
        state.selected = id;
        state.open[pid] = true;
        commitGraph(mode === "sibling" || mode === "siblingBefore" ? "Тема рядом" : "Подтема");
        setTimeout(function () { startRename(id); }, 40);
    }
    function deleteSelected() {
        var rec = ALL[state.selected];
        if (!rec) return;
        var n = rec.node;
        if (!canDeleteNode(n)) {
            schemaToast("Сначала снимите все связи с блока");
            return;
        }
        graphEdits.removed = (graphEdits.removed || []).filter(function (x) { return x !== n.id; }).concat([n.id]);
        graphEdits.extra = (graphEdits.extra || []).filter(function (x) { return x.id !== n.id; });
        delete graphEdits.parents[n.id];
        delete graphEdits.titles[n.id];
        setLooseFlag(n.id, false);
        seedLinks();
        graphEdits.links = graphEdits.links.filter(function (e) { return e.from !== n.id && e.to !== n.id; });
        state.selected = rec.parent ? rec.parent.id : "root";
        commitGraph();
    }

    var commentCounts = {};
    var commentNode = null;
    var commentReply = null;

    function pageCfg() {
        var el = document.getElementById("smPage");
        return {
            url: el ? (el.getAttribute("data-comments-url") || "") : "",
            can: el && el.getAttribute("data-can-comment") === "1",
            csrf: el ? (el.getAttribute("data-csrf") || "") : "",
            presence: el ? (el.getAttribute("data-presence-url") || "") : "",
            checks: el ? (el.getAttribute("data-checks-url") || "") : "",
            me: el ? (el.getAttribute("data-me-login") || "") : ""
        };
    }

    function setCommentsOpen(on) {
        var box = document.getElementById("smComments");
        if (!box) return;
        box.hidden = !on;
        box.classList.toggle("sm-hidden", !on);
    }

    function fmtTs(ts) {
        try {
            var d = new Date(ts);
            if (isNaN(d.getTime())) return ts || "";
            return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
        } catch (e3) {
            return "";
        }
    }

    function renderComments(items) {
        var list = document.getElementById("smCommentsList");
        list.innerHTML = "";
        if (!items || !items.length) {
            list.textContent = "Пока нет комментариев.";
            return;
        }
        var byParent = { "": [] };
        items.forEach(function (it) {
            var p = it.parent || "";
            if (!byParent[p]) byParent[p] = [];
            byParent[p].push(it);
        });
        function addRow(it, reply) {
            var div = document.createElement("div");
            div.className = "sm-cmt" + (reply ? " is-reply" : "");
            var meta = document.createElement("div");
            meta.className = "sm-cmt-meta";
            meta.textContent = (it.user || it.login || "") + " · " + fmtTs(it.ts);
            var tx = document.createElement("div");
            tx.textContent = it.text || "";
            div.appendChild(meta);
            div.appendChild(tx);
            if (pageCfg().can && !reply) {
                var b = document.createElement("button");
                b.type = "button";
                b.className = "sm-cmt-reply";
                b.textContent = "Ответить";
                b.addEventListener("click", function () {
                    commentReply = it.id;
                    var bar = document.getElementById("smCommentsReply");
                    bar.hidden = false;
                    bar.classList.remove("sm-hidden");
                    bar.textContent = "Ответ для " + (it.user || "комментария");
                });
                div.appendChild(b);
            }
            list.appendChild(div);
            (byParent[it.id] || []).forEach(function (ch) { addRow(ch, true); });
        }
        (byParent[""] || []).forEach(function (it) { addRow(it, false); });
    }

    function openComments(n) {
        commentNode = n;
        commentReply = null;
        document.getElementById("smCommentsTitle").textContent = "Комментарии: " + ru(n.title);
        setCommentsOpen(true);
        var form = document.querySelector(".sm-comments-form");
        if (form) form.style.display = pageCfg().can ? "" : "none";
        var bar = document.getElementById("smCommentsReply");
        if (bar) {
            bar.hidden = true;
            bar.classList.add("sm-hidden");
        }
        var cfg = pageCfg();
        var list = document.getElementById("smCommentsList");
        if (!cfg.url) {
            list.textContent = "Комментарии доступны после входа в панель.";
            return;
        }
        list.textContent = "Загрузка…";
        fetch(cfg.url + "?node=" + encodeURIComponent(n.id), {
            headers: { Accept: "application/json" },
            credentials: "same-origin"
        }).then(function (r) { return r.json(); }).then(function (j) {
            renderComments((j && j.items) || []);
        }).catch(function () {
            list.textContent = "Не удалось загрузить.";
        });
    }

    function sendComment() {
        var cfg = pageCfg();
        var ta = document.getElementById("smCommentsText");
        if (!cfg.url || !cfg.can || !commentNode || !ta) return;
        var text = (ta.value || "").trim();
        if (!text) return;
        fetch(cfg.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": cfg.csrf,
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: "same-origin",
            body: JSON.stringify({ node: commentNode.id, text: text, parent: commentReply || "" })
        }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); }).then(function (pack) {
            var j = pack.j;
            if (!j || !j.ok) {
                var list = document.getElementById("smCommentsList");
                if (list) list.textContent = (j && j.error) ? j.error : "Не удалось отправить комментарий.";
                return;
            }
            ta.value = "";
            commentReply = null;
            var bar = document.getElementById("smCommentsReply");
            if (bar) {
                bar.hidden = true;
                bar.classList.add("sm-hidden");
            }
            commentCounts[commentNode.id] = (commentCounts[commentNode.id] || 0) + 1;
            updateAllBadge();
            openComments(commentNode);
            draw();
        }).catch(function () {
            var list = document.getElementById("smCommentsList");
            if (list) list.textContent = "Не удалось отправить комментарий.";
        });
    }

    function loadCounts(then) {
        var cfg = pageCfg();
        if (!cfg.url) {
            if (then) then();
            return;
        }
        fetch(cfg.url, { headers: { Accept: "application/json" }, credentials: "same-origin" })
            .then(function (r) { return r.json(); })
            .then(function (j) {
                commentCounts = (j && j.counts) || {};
                updateAllBadge();
                if (then) then();
            })
            .catch(function () { if (then) then(); });
    }

    function toggleChecked(id) {
        if (state.checked[id]) {
            delete state.checked[id];
        } else {
            state.checked[id] = true;
        }
        ignoreChecksUntil = Date.now() + 400;
        save();
        draw();
        var cfg = pageCfg();
        if (!cfg.checks || !cfg.csrf) return;
        fetch(cfg.checks, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": cfg.csrf,
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: "same-origin",
            body: JSON.stringify({ node: id, checked: !!state.checked[id] })
        }).catch(function () {});
    }

    function loadChecks(then) {
        var cfg = pageCfg();
        if (!cfg.checks) {
            if (then) then();
            return;
        }
        fetchBoardGet(cfg.checks)
            .then(function (j) {
                if (!j || !j.ok) {
                    if (then) then();
                    return;
                }
                applySharedChecks(j.checked || j.nodes, j.checksRev || j.rev);
                applySharedOpen(j.open, j.openRev);
                applySharedEdits(j.edits, j.editsRev);
                applyVersions(j.versions);
                if (then) then();
            })
            .catch(function () { if (then) then(); });
    }

    function updateAllBadge() {
        var el = document.getElementById("btnAllCommentsN");
        if (!el) return;
        var n = 0;
        Object.keys(commentCounts).forEach(function (id) { n += Number(commentCounts[id]) || 0; });
        if (n) {
            el.hidden = false;
            el.textContent = String(n);
        } else {
            el.hidden = true;
            el.textContent = "";
        }
    }

    function nodeTitle(id) {
        var rec = ALL[id];
        return rec ? ru(rec.node.title) : id;
    }

    function revealNode(id) {
        var rec = ALL[id];
        if (!rec) return;
        var cur = rec.parent;
        while (cur) {
            state.open[cur.id] = true;
            cur = ALL[cur.id] && ALL[cur.id].parent;
        }
        state.selected = id;
        state.open[id] = true;
        save();
        draw();
        shareOpen();
        var n = rec.node;
        var wrap = document.getElementById("smWrap");
        if (!wrap || wrap.clientWidth < 40) return;
        state.x = wrap.clientWidth / 2 - (n._x + n._w / 2) * state.scale;
        state.y = wrap.clientHeight / 2 - (n._y + n._h / 2) * state.scale;
        applyTransform();
    }

    function renderAllFeed(feed) {
        var list = document.getElementById("smCommentsList");
        list.innerHTML = "";
        if (!feed || !feed.length) {
            list.textContent = "Пока нет комментариев.";
            return;
        }
        feed.forEach(function (it) {
            var nid = it.node || "";
            var div = document.createElement("div");
            div.className = "sm-cmt is-goto";
            var nodeEl = document.createElement("div");
            nodeEl.className = "sm-cmt-node";
            nodeEl.textContent = nodeTitle(nid);
            var meta = document.createElement("div");
            meta.className = "sm-cmt-meta";
            meta.textContent = (it.user || it.login || "") + " · " + fmtTs(it.ts);
            var tx = document.createElement("div");
            tx.textContent = it.text || "";
            div.appendChild(nodeEl);
            div.appendChild(meta);
            div.appendChild(tx);
            div.title = "Перейти к блоку";
            div.addEventListener("click", function () { revealNode(nid); });
            list.appendChild(div);
        });
    }

    function openAllComments() {
        commentNode = null;
        commentReply = null;
        document.getElementById("smCommentsTitle").textContent = "Все комментарии";
        setCommentsOpen(true);
        var form = document.querySelector(".sm-comments-form");
        if (form) form.style.display = "none";
        var bar = document.getElementById("smCommentsReply");
        if (bar) {
            bar.hidden = true;
            bar.classList.add("sm-hidden");
        }
        var cfg = pageCfg();
        var list = document.getElementById("smCommentsList");
        if (!cfg.url) {
            list.textContent = "Комментарии доступны после входа в панель.";
            return;
        }
        list.textContent = "Загрузка…";
        fetch(cfg.url, {
            headers: { Accept: "application/json" },
            credentials: "same-origin"
        }).then(function (r) { return r.json(); }).then(function (j) {
            commentCounts = (j && j.counts) || {};
            updateAllBadge();
            renderAllFeed((j && j.feed) || []);
            draw();
        }).catch(function () {
            list.textContent = "Не удалось загрузить.";
        });
    }

    function kids(n) {
        if (!n.children || !n.children.length) return [];
        if (state.open[n.id] !== true) return [];
        return n.children;
    }

    function isUnclear(n) {
        if (!n || n.id === "l-open") return false;
        if (n.kind === "open") return true;
        if (n.note && /открыт/i.test(n.note)) return true;
        if (n.steps && n.steps.some(function (s) { return /открыт/i.test(s); })) return true;
        return false;
    }

    function unclearSet() {
        var s = {};
        Object.keys(ALL).forEach(function (id) {
            if (!isUnclear(ALL[id].node)) return;
            s[id] = true;
            var cur = ALL[id].parent;
            while (cur) {
                s[cur.id] = "path";
                cur = ALL[cur.id] && ALL[cur.id].parent;
            }
        });
        return s;
    }

    function ru(s) {
        if (!s) return s;
        var pairs = [
            ["min ост.", "min ост. (минимальный остаток)"],
            ["min остатка", "min остатка (минимального остатка)"],
            ["min / max", "min/max (минимум / максимум)"],
            ["ГП", "ГП (готовая продукция)"],
            ["ПФ", "ПФ (полуфабрикат)"],
            ["КМ", "КМ (колеровочная машина)"],
            ["ОТК", "ОТК (отдел технического контроля)"],
            ["УПД", "УПД (универсальный передаточный документ)"],
            ["1С", "1С (учёт)"]
        ];
        var out = String(s);
        pairs.forEach(function (p) {
            var esc = p[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            out = out.replace(new RegExp(esc + "(?!\\s*\\()", "g"), p[1]);
        });
        return out;
    }

    function apiOf(n) {
        if (!state.showApi || !n) return [];
        var keys = NODE_API[n.id];
        if (!keys) return [];
        return keys.map(function (k) { return METHODS[k]; }).filter(Boolean);
    }

    var METHODS = {
        stock: {
            method: "GET /lakom/v1/stock",
            name: "Остатки и резервы",
            d: "Свободный остаток ГП/ПФ и действующие резервы Лакомки. Повторный расчёт не создаёт второй резерв.",
            keys: ["nomenclature_key", "warehouse_key", "batch", "qty_free", "qty_reserved", "unit"]
        },
        spec: {
            method: "GET /lakom/v1/specifications",
            name: "Спецификация",
            d: "Состав, плотность, фасовка, число вёдер, сырьевая норма на массу. Для колеровки — рецепт базы, не готовый цвет.",
            keys: ["nomenclature_key", "qty", "unit", "components[]", "pack_size", "density"]
        },
        transfer: {
            method: "POST /lakom/v1/stock-transfers",
            name: "Перемещение",
            d: "Фактическое перемещение между складами (ГП Лакма → Склад ГП, сырьё/ПФ → производство). Если склад не меняется — метод не вызывать.",
            keys: ["from_warehouse_key", "to_warehouse_key", "nomenclature_key", "batch", "qty", "unit", "order_ref"]
        },
        prod: {
            method: "POST /lakom/v1/production",
            name: "Производство",
            d: "Факт выпуска: сырьё и доведения → ПФ. Один документ после допуска ОТК, не после каждой пробы. Сохранить ссылку и партию.",
            keys: ["operation", "materials[]", "outputs[]", "warehouse_key", "batch", "order_ref", "qty"]
        },
        assemble: {
            method: "POST /lakom/v1/production",
            name: "Производство / Сборка",
            d: "Операция «Сборка»: расход уже выпущенного ПФ, тары, пигментов и комплектующих → ГП на склад ГП. Сырьё исходного ПФ повторно не списывать. Приход ГП этим же документом, второй /warehouse-receipts не нужен.",
            keys: ["operation=Сборка", "materials[]", "outputs[]", "warehouse_key", "batch", "order_ref", "qty"]
        },
        recipe: {
            method: "GET /lakom/v1/print-recipe",
            name: "Печать рецептуры",
            d: "Печатная форма для оператора на массу замеса. Не проводит выпуск и не списывает материалы.",
            keys: ["nomenclature_key", "qty", "batch", "rework_qty", "task_id"]
        },
        waybill: {
            method: "POST /lakom/v1/waybills",
            name: "Накладная отгрузки",
            d: "Документ отгрузки по заказу на выбранные позиции и количество. Повтор с тем же ключом не создаёт дубль; сохранить ссылку.",
            keys: ["order_ref", "invoice_ref", "lines[].nomenclature_key", "lines[].qty", "lines[].batch", "doc_ref"]
        },
        shipment: {
            method: "POST /lakom/v1/shipments",
            name: "Факт отгрузки",
            d: "После подтверждения кладовщика: фактически погруженные позиции. Обновляет отгруженное и остаток по счёту.",
            keys: ["waybill_ref", "order_ref", "lines[].nomenclature_key", "lines[].qty", "lines[].batch"]
        },
        receipt: {
            method: "POST /lakom/v1/warehouse-receipts",
            name: "Приход закупки",
            d: "Приход купленного товара на склад ГП. Производственный выпуск по этой позиции не создавать.",
            keys: ["nomenclature_key", "warehouse_key", "qty", "batch", "unit", "order_ref"]
        }
    };

    var NODE_API = {};
    function tag(ids, keys) {
        ids.forEach(function (id) { NODE_API[id] = keys; });
    }
    tag(["gp", "gp-yes", "gp-no", "gp-form", "gp-full", "gp-full-r", "resale-gp", "resale-gp-yes", "km-gp-b", "km-gp-yes", "km-res-b", "km-pf", "km-pf-yes", "km-pf-res", "plain-pf", "plain-res", "grout-b", "grout-a-pf", "syr-yes", "syr-kit", "ckm-in"], ["stock"]);
    tag(["kg", "buckets", "km-limit", "pl-need", "pl-qty", "grout-a50"], ["spec"]);
    tag(["pl-1c", "pl-in"], ["spec", "stock"]);
    tag(["resale-mv", "gp-full-mv", "gp-pack-prod", "gp-pack-back", "plain-mv", "ckm-pass", "ckm-wh", "cp-mv", "cm-mv", "cm-raw"], ["transfer"]);
    tag(["gp-pack-do", "plain-1c", "km-pf-fill", "cp-1c", "kit-1c"], ["assemble"]);
    tag(["ckm-1c", "cm-1c", "cs-1c"], ["prod"]);
    tag(["sc-1c"], ["prod", "transfer"]);
    tag(["cm-print"], ["recipe"]);
    tag(["buy-1c", "buy-rcv"], ["receipt"]);
    tag(["ship-1c"], ["waybill"]);
    tag(["ship-wh"], ["shipment"]);
    tag(["ship", "ship-rest", "resale-ship", "buy-ship", "gp-full-rdy", "plain-rdy"], ["waybill", "shipment"]);
    tag(["cp-end", "cm-end", "kit-end"], ["transfer", "waybill", "shipment"]);

    var heightCache = {};
    function nodeH(n) {
        // Measure the same card typography used by draw(), including wrapped task text.
        var key = JSON.stringify([n.id === "root", n.kind, ru(n.title), ru(n.screen_task || ""), n.review_status ? approvalText(n) : ""]);
        if (heightCache[key]) return heightCache[key];
        var probe = document.createElement("div");
        probe.className = "sm-topic sm-kind-" + n.kind + (n.id === "root" ? " is-root" : "");
        probe.style.cssText = "visibility:hidden;pointer-events:none;left:-10000px;top:0;width:" + nodeW(n) + "px;height:auto;";
        if (n.id !== "root") {
            var kind = document.createElement("span");
            kind.className = "sm-k";
            kind.textContent = KIND[n.kind] || "";
            probe.appendChild(kind);
        }
        [["sm-title", ru(n.title)], ["sm-screen-task", n.screen_task ? "Задание: " + ru(n.screen_task) : ""], ["sm-approval", n.review_status ? approvalText(n) : ""]].forEach(function (part) {
            if (!part[1]) return;
            var span = document.createElement("span");
            span.className = part[0];
            span.textContent = part[1];
            probe.appendChild(span);
        });
        document.body.appendChild(probe);
        var height = Math.max(52, Math.ceil(probe.getBoundingClientRect().height) + 2);
        probe.remove();
        heightCache[key] = height;
        return height;
    }
    function nodeW(n) {
        if (n.id === "root") return 220;
        return 260;
    }

    var V_GAP = 28, H_GAP = 96;

    function stackH(list) {
        if (!list.length) return 0;
        var s = 0;
        list.forEach(function (c, i) {
            s += subH(c);
            if (i) s += V_GAP;
        });
        return s;
    }

    function subH(n) {
        var kh = kids(n);
        if (!kh.length) return nodeH(n);
        if (n.id === "root") {
            var left = kh.filter(function (c) { return c.side === "left"; });
            var right = kh.filter(function (c) { return c.side !== "left"; });
            return Math.max(nodeH(n), stackH(left), stackH(right));
        }
        return Math.max(nodeH(n), stackH(kh));
    }

    function layoutBranch(list, side, nx, cy) {
        if (!list.length) return;
        var heights = list.map(subH);
        var sum = stackH(list);
        var y = cy - sum / 2;
        list.forEach(function (c, i) {
            layout(c, side, nx, y + heights[i] / 2);
            y += heights[i] + V_GAP;
        });
    }

    function layout(n, side, x, cy) {
        var w = nodeW(n), h = nodeH(n);
        n._w = w; n._h = h;
        n._x = side === "left" ? x - w : x;
        n._y = cy - h / 2;
        n._side = side;
        var kh = kids(n);
        if (!kh.length) return;
        if (n.id === "root") {
            var left = kh.filter(function (c) { return c.side === "left"; });
            var right = kh.filter(function (c) { return c.side !== "left"; });
            layoutBranch(left, "left", n._x - H_GAP, cy);
            layoutBranch(right, "right", n._x + w + H_GAP, cy);
            return;
        }
        layoutBranch(kh, side, side === "left" ? n._x - H_GAP : n._x + w + H_GAP, cy);
    }

    function collect(n, acc) {
        acc.push(n);
        kids(n).forEach(function (c) { collect(c, acc); });
        return acc;
    }

    function edgeLabel(c) {
        if (c.edge) return c.edge;
        if (/^Да\b/.test(c.title)) return "Да";
        if (/^Нет\b/.test(c.title)) return "Нет";
        return "";
    }

    function cubicPt(t, x0, y0, x1, y1, x2, y2, x3, y3) {
        var u = 1 - t, uu = u * u, tt = t * t;
        return [
            uu * u * x0 + 3 * uu * t * x1 + 3 * u * tt * x2 + tt * t * x3,
            uu * u * y0 + 3 * uu * t * y1 + 3 * u * tt * y2 + tt * t * y3
        ];
    }

    function addEdge(svg, x0, y0, x3, y3, color, width, dash, label, onOpen) {
        var dir = x3 >= x0 ? 1 : -1;
        var dx = Math.max(52, Math.abs(x3 - x0) * 0.58);
        var c1x = x0 + dir * dx, c1y = y0, c2x = x3 - dir * dx, c2y = y3;
        var tip = cubicPt(1, x0, y0, c1x, c1y, c2x, c2y, x3, y3);
        var near = cubicPt(0.78, x0, y0, c1x, c1y, c2x, c2y, x3, y3);
        var vx = tip[0] - near[0], vy = tip[1] - near[1];
        var len = Math.hypot(vx, vy) || 1;
        vx /= len;
        vy /= len;
        var ah = 14, aw = 6.5;
        var bx = tip[0] - vx * ah;
        var by = tip[1] - vy * ah;
        var d = "M " + x0 + " " + y0 + " C " + c1x + " " + c1y + ", " + c2x + " " + c2y + ", " + bx + " " + by;
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "sm-edge");
        var hit = document.createElementNS("http://www.w3.org/2000/svg", "path");
        hit.setAttribute("class", "sm-edge-hit");
        hit.setAttribute("d", d);
        hit.setAttribute("fill", "none");
        hit.setAttribute("stroke", "transparent");
        hit.setAttribute("stroke-width", "16");
        hit.setAttribute("stroke-linecap", "round");
        var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("class", "sm-edge-line");
        p.setAttribute("d", d);
        p.setAttribute("fill", "none");
        p.setAttribute("stroke", color);
        p.setAttribute("stroke-width", String(width));
        p.setAttribute("stroke-linecap", "butt");
        p.setAttribute("stroke-linejoin", "round");
        if (dash) p.setAttribute("stroke-dasharray", dash);
        var head = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        head.setAttribute("class", "sm-edge-head");
        var px = -vy * aw, py = vx * aw;
        head.setAttribute("points",
            tip[0] + "," + tip[1] + " " +
            (bx + px) + "," + (by + py) + " " +
            (bx - px) + "," + (by - py)
        );
        head.setAttribute("fill", color);
        g.appendChild(hit);
        g.appendChild(p);
        g.appendChild(head);
        if (label) {
            var lab = document.createElementNS("http://www.w3.org/2000/svg", "text");
            lab.setAttribute("class", "sm-edge-lab");
            lab.setAttribute("x", String((x0 + x3) / 2));
            lab.setAttribute("y", String((y0 + y3) / 2 - 8));
            lab.setAttribute("text-anchor", "middle");
            lab.setAttribute("fill", label === "Нет" ? "#dc2626" : (label === "Да" ? "#16a34a" : "#c2410c"));
            lab.setAttribute("font-size", "12");
            lab.setAttribute("font-weight", "800");
            lab.textContent = label;
            g.appendChild(lab);
        }
        g.addEventListener("pointerenter", function () {
            if (svg.classList.contains("is-pinned")) return;
            svg.classList.add("is-dim-edges");
            g.classList.add("is-hot");
        });
        g.addEventListener("pointerleave", function () {
            if (svg.classList.contains("is-pinned")) return;
            svg.classList.remove("is-dim-edges");
            g.classList.remove("is-hot");
        });
        g.addEventListener("pointerdown", function (e) {
            e.stopPropagation();
        });
        g.addEventListener("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (typeof onOpen === "function") {
                onOpen();
                return;
            }
            svg.querySelectorAll(".sm-edge.is-hot").forEach(function (el) {
                if (el !== g) el.classList.remove("is-hot");
            });
            svg.classList.add("is-dim-edges", "is-pinned");
            g.classList.add("is-hot");
        });
        svg.appendChild(g);
        return { g: g, x0: x0, y0: y0, x3: x3, y3: y3 };
    }

    function addEdgePorts() {}

    var rewire = null;
    function beginRewire(e, meta, end) {
        var wrap = document.getElementById("smWrap");
        var board = document.getElementById("smBoard");
        if (!wrap || !board) return;
        var rubber = document.getElementById("smRubber");
        if (rubber && rubber.parentNode) rubber.parentNode.removeChild(rubber);
        rubber = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        rubber.id = "smRubber";
        rubber.setAttribute("class", "sm-rubber");
        rubber.setAttribute("width", board.style.width || "0");
        rubber.setAttribute("height", board.style.height || "0");
        board.appendChild(rubber);
        var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("fill", "none");
        line.setAttribute("stroke", "#c2410c");
        line.setAttribute("stroke-width", "3");
        line.setAttribute("stroke-dasharray", "6 4");
        rubber.appendChild(line);
        var start = boardPoint(e.clientX, e.clientY);
        rewire = { meta: meta, end: end, line: line, rubber: rubber, sx: start.bx, sy: start.by };
        wrap.classList.add("is-rewire");
    }
    function nodeAtBoard(bx, by) {
        var hit = null;
        Object.keys(ALL).forEach(function (id) {
            var n = ALL[id].node;
            if (n._x == null) return;
            if (bx >= n._x && bx <= n._x + n._w && by >= n._y && by <= n._y + n._h) hit = n;
        });
        return hit;
    }
    function endRewire(e) {
        var wrap = document.getElementById("smWrap");
        if (!rewire) return;
        var p = boardPoint(e.clientX, e.clientY);
        var n = nodeAtBoard(p.bx, p.by);
        var meta = rewire.meta;
        var end = rewire.end;
        if (rewire.rubber) rewire.rubber.innerHTML = "";
        wrap.classList.remove("is-rewire");
        wrap.querySelectorAll(".sm-topic.is-drop").forEach(function (el) { el.classList.remove("is-drop"); });
        rewire = null;
        if (n) rewireEdge(meta, end, n.id);
    }

    function colorFor(n) {
        if (n.id === "root") return "#0f766e";
        var map = { check: "#ca8a04", route: "#ea580c", task: "#3b82f6", screen: "#0f766e", onec: "#64748b", result: "#16a34a", open: "#dc2626", entry: "#0f766e" };
        return map[n.kind] || "#999";
    }

    function draw() {
        layout(ROOT, "right", 0, 0);
        var nodes = collect(ROOT, []);
        var minX = 0, minY = 0, maxX = 0, maxY = 0;
        nodes.forEach(function (n) {
            minX = Math.min(minX, n._x);
            minY = Math.min(minY, n._y);
            maxX = Math.max(maxX, n._x + n._w);
            maxY = Math.max(maxY, n._y + n._h);
        });
        var pad = 80;
        var ox = -minX + pad, oy = -minY + pad;
        nodes.forEach(function (n) { n._x += ox; n._y += oy; });

        var board = document.getElementById("smBoard");
        var W = maxX - minX + pad * 2, H = maxY - minY + pad * 2;
        board.style.width = W + "px";
        board.style.height = H + "px";
        board.innerHTML = "";

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "sm-svg");
        svg.setAttribute("width", String(W));
        svg.setAttribute("height", String(H));
        board.appendChild(svg);
        var hl = state.highlightOpen ? unclearSet() : null;
        var vis = {};
        nodes.forEach(function (n) { vis[n.id] = true; });
        nodes.forEach(function (n) {
            kids(n).forEach(function (c) {
                var x1 = n.id === "root" ? (c.side === "left" ? n._x : n._x + n._w) : (n._side === "left" ? n._x : n._x + n._w);
                var y1 = n._y + n._h / 2;
                var x2 = c._side === "left" ? c._x + c._w + 8 : c._x - 8;
                var y2 = c._y + c._h / 2;
                var hot = hl && (hl[c.id] === true || hl[c.id] === "path");
                var col = hot ? "#dc2626" : (hl ? "#94a3b8" : colorFor(n.id === "root" ? c : n));
                var geom = addEdge(svg, x1, y1, x2, y2, col, hot ? 5 : 2.7, null, edgeLabel(c));
                addEdgePorts(board, geom, { type: "tree", from: n.id, to: c.id, label: edgeLabel(c) });
            });
        });
        nodes.forEach(function (n) {
            var linkIds = (n.links || []).filter(function (tid) {
                var t = ALL[tid] && ALL[tid].node;
                if (!t) return false;
                if ((n.children || []).some(function (c) { return c.id === tid; })) return false;
                return true;
            });
            linkIds.forEach(function (tid, i) {
                var t = ALL[tid].node;
                var x1 = n._side === "left" ? n._x : n._x + n._w;
                var y1 = n._y + n._h / 2 + (i - (linkIds.length - 1) / 2) * 18;
                var x2, y2;
                if (vis[tid] === true) {
                    x2 = t._side === "left" ? t._x + t._w + 8 : t._x - 8;
                    y2 = t._y + t._h / 2;
                } else {
                    var dir = n._side === "left" ? -1 : 1;
                    x2 = x1 + dir * 44;
                    y2 = y1;
                }
                var lab = (n.linkLabels && n.linkLabels[tid]) || "далее";
                var geom = addEdge(svg, x1, y1, x2, y2, "#c2410c", 2.5, "7 5", lab, vis[tid] ? null : function () { revealNode(tid); });
                addEdgePorts(board, geom, { type: "link", from: n.id, to: tid, label: lab });
            });
        });
        nodes.forEach(function (n) {
            var el = document.createElement("div");
            el.className = "sm-topic sm-kind-" + n.kind
                + (n.id === "root" ? " is-root" : "")
                + (state.selected === n.id ? " is-selected" : "")
                + (isUnclear(n) ? " has-q" : "")
                + (hl && isUnclear(n) ? " is-open-hl" : "")
                + (hl && !hl[n.id] && n.id !== "root" ? " is-dim" : "")
                + (state.checked[n.id] ? " is-reviewed" : "")
                + (n.loose ? " is-loose" : "");
            el.style.left = n._x + "px";
            el.style.top = n._y + "px";
            el.style.width = n._w + "px";
            el.style.minHeight = n._h + "px";
            el.style.height = n._h + "px";
            el.setAttribute("data-id", n.id);
            if (n.id !== "root") {
                var k = document.createElement("span");
                k.className = "sm-k";
                k.textContent = KIND[n.kind] || "";
                el.appendChild(k);
            }
            var titleEl = document.createElement("span");
            titleEl.className = "sm-title";
            titleEl.textContent = ru(n.title);
            titleEl.title = ru(n.title);
            titleEl.addEventListener("click", function (e) {
                e.stopPropagation();
                select(n.id);
            });
            el.appendChild(titleEl);
            if (n.screen_task) {
                var taskEl = document.createElement("span");
                taskEl.className = "sm-screen-task";
                taskEl.textContent = "Задание: " + ru(n.screen_task);
                el.appendChild(taskEl);
            }
            if (n.review_status) {
                var approvalEl = document.createElement("span");
                approvalEl.className = "sm-approval";
                approvalEl.textContent = approvalText(n);
                el.appendChild(approvalEl);
            }
            if (n.note || (n.steps && n.steps.length)) {
                var mark = document.createElement("button");
                mark.type = "button";
                mark.className = "sm-has-note";
                mark.title = "Пояснение к блоку";
                mark.setAttribute("aria-label", "Открыть пояснение");
                mark.addEventListener("click", function (e) {
                    e.stopPropagation();
                    showNote(n);
                });
                el.appendChild(mark);
            }
            var tick = document.createElement("button");
            tick.type = "button";
            tick.className = "sm-check";
            tick.title = state.checked[n.id] ? "Снять отметку «проверили»" : "Отметить: проверили";
            tick.setAttribute("aria-pressed", state.checked[n.id] ? "true" : "false");
            tick.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M5 12.5l5 5 9-11"/></svg>';
            tick.addEventListener("click", function (e) {
                e.stopPropagation();
                toggleChecked(n.id);
            });
            el.appendChild(tick);
            el.addEventListener("click", function (e) {
                if (e.target.closest(".sm-check, .sm-has-note")) return;
                e.stopPropagation();
                select(n.id);
            });
            board.appendChild(el);
            var leaf = document.createElement("button");
            leaf.type = "button";
            leaf.className = "sm-leaf" + (commentCounts[n.id] ? " has-items" : "");
            leaf.style.left = (n._x + n._w - 10) + "px";
            leaf.style.top = (n._y - 8) + "px";
            leaf.title = "Комментарии к блоку";
            leaf.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 20c7.2-.8 13-7.4 13-15.2C12.6 4.8 6.4 10.2 5 18c3.2-.6 5.8 1 7.6 2.8C10.8 19.6 8.6 18.6 7 20z"/><path fill="none" stroke="currentColor" stroke-width="1.4" d="M8.2 16.6c2.4-2.2 5.4-6.2 6.6-10"/></svg>';
            if (commentCounts[n.id]) {
                var badge = document.createElement("span");
                badge.className = "sm-leaf-n";
                badge.textContent = String(commentCounts[n.id]);
                leaf.appendChild(badge);
            }
            leaf.addEventListener("click", function (e) {
                e.stopPropagation();
                var box = document.getElementById("smComments");
                if (commentNode && commentNode.id === n.id && box && !box.hidden) {
                    setCommentsOpen(false);
                    return;
                }
                openComments(n);
            });
            board.appendChild(leaf);
            if (state.showApi && apiOf(n).length) {
                var apiBtn = document.createElement("button");
                apiBtn.type = "button";
                apiBtn.className = "sm-api-btn";
                apiBtn.style.left = (n._x - 6) + "px";
                apiBtn.style.top = (n._y - 8) + "px";
                apiBtn.title = "Методы 1С";
                apiBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
                apiBtn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    showApi(n);
                });
                board.appendChild(apiBtn);
            }
            if (n.children && n.children.length) {
                var open = state.open[n.id] === true;
                function plusAt(leftPx) {
                    var btn = document.createElement("button");
                    btn.type = "button";
                    btn.className = "sm-plus";
                    btn.textContent = open ? "−" : "+";
                    btn.style.top = (n._y + n._h / 2 - 9) + "px";
                    btn.style.left = leftPx + "px";
                    btn.title = open ? "Скрыть ветку" : "Показать ветку";
                    btn.addEventListener("click", function (e) {
                        e.stopPropagation();
                        state.open[n.id] = !open;
                        save();
                        draw();
                        shareOpen();
                    });
                    board.appendChild(btn);
                }
                if (n.id === "root") {
                    plusAt(n._x - 24);
                    plusAt(n._x + n._w + 6);
                } else {
                    plusAt(n._side === "left" ? n._x - 24 : n._x + n._w + 6);
                }
            }
            var linkIds = (n.links || []).filter(function (tid) {
                var t = ALL[tid] && ALL[tid].node;
                if (!t) return false;
                if ((n.children || []).some(function (c) { return c.id === tid; })) return false;
                return true;
            });
            linkIds.forEach(function (tid, i) {
                var t = ALL[tid].node;
                var x1 = n._side === "left" ? n._x : n._x + n._w;
                var y1 = n._y + n._h / 2 + (i - (linkIds.length - 1) / 2) * 18;
                var px, py;
                if (vis[tid] === true) {
                    var x2 = t._side === "left" ? t._x + t._w + 8 : t._x - 8;
                    var y2 = t._y + t._h / 2;
                    px = (x1 + x2) / 2;
                    py = (y1 + y2) / 2;
                } else {
                    var dir = n._side === "left" ? -1 : 1;
                    px = x1 + dir * 44;
                    py = y1;
                }
                var lbtn = document.createElement("button");
                lbtn.type = "button";
                lbtn.className = "sm-plus is-link";
                lbtn.textContent = vis[tid] ? "→" : "+";
                lbtn.style.left = (px - 9) + "px";
                lbtn.style.top = (py - 22) + "px";
                lbtn.title = vis[tid]
                    ? ("Связь: " + ru(t.title) + ". Клик — перейти")
                    : ("Открыть связанный блок: " + ru(t.title));
                lbtn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    revealNode(tid);
                });
                board.appendChild(lbtn);
            });
        });
        applyTransform();
        if (!didCenter) {
            centerOnRoot();
            didCenter = true;
            applyTransform();
        }
    }

    var didCenter = false;
    function centerOnRoot() {
        var wrap = document.getElementById("smWrap");
        if (!wrap || wrap.clientWidth < 40) return;
        state.x = wrap.clientWidth / 2 - (ROOT._x + ROOT._w / 2) * state.scale;
        state.y = wrap.clientHeight / 2 - (ROOT._y + ROOT._h / 2) * state.scale;
    }

    function select(id) {
        state.selected = id;
        var rec = ALL[id];
        if (rec && rec.node.children && rec.node.children.length) state.open[id] = true;
        save();
        draw();
        if (rec && rec.node) showNote(rec.node);
    }

    function fillTitleField() {
        var inp = document.getElementById("smTitleEdit");
        if (!inp) return;
        if (document.activeElement === inp) return;
        var rec = ALL[state.selected];
        inp.disabled = !rec;
        inp.value = rec ? ru(rec.node.title) : "";
    }
    function saveTitleField() {
        var inp = document.getElementById("smTitleEdit");
        var id = state.selected;
        if (!inp || !id || !ALL[id]) return;
        var t = String(inp.value || "").replace(/\s+/g, " ").trim();
        var prev = ru(ALL[id].node.title);
        if (!t || t === prev) {
            inp.value = prev;
            return;
        }
        graphEdits.titles[id] = t.slice(0, 200);
        commitGraph("Текст");
    }
    function startRename(id) {
        if (!ALL[id]) return;
        var rec0 = ALL[id];
        var same = state.selected === id;
        state.selected = id;
        if (rec0.node.children && rec0.node.children.length) state.open[id] = true;
        if (!same) {
            save();
            draw();
        } else {
            fillTitleField();
        }
        var inp = document.getElementById("smTitleEdit");
        if (!inp) return;
        inp.disabled = false;
        inp.value = ru(rec0.node.title);
        setTimeout(function () {
            inp.focus();
            inp.select();
        }, 0);
    }

    function approvalText(n) {
        var labels = { approved: "Процесс утверждён", partial: "Процесс частично утверждён", pending: "Требует утверждения" };
        var text = labels[n.review_status] || "Требует утверждения";
        if (n.ui_review_status === "pending" && n.review_status !== "pending") text += " · экран на согласовании";
        return text;
    }

    function showNote(n) {
        if (!n || (!n.note && !(n.steps && n.steps.length))) return;
        var title = document.getElementById("smNoteTitle");
        var body = document.getElementById("smNoteBody");
        var box = document.getElementById("smNoteBox");
        if (!title || !body || !box) return;
        title.textContent = ru(n.title);
        body.innerHTML = "";
        if (n.note) {
            var p = document.createElement("p");
            p.className = "sm-note-text";
            p.textContent = ru(n.note);
            body.appendChild(p);
        }
        if (n.review_status) {
            var approval = document.createElement("p");
            approval.textContent = approvalText(n) + (n.approved_scope ? "\nУтверждено: " + n.approved_scope : "");
            approval.className = "sm-note-text";
            body.appendChild(approval);
        }
        if (n.steps && n.steps.length) {
            var ul = document.createElement("ul");
            n.steps.forEach(function (s) {
                var li = document.createElement("li");
                li.textContent = ru(s);
                ul.appendChild(li);
            });
            body.appendChild(ul);
        }
        box.hidden = false;
        box.classList.remove("sm-hidden");
    }

    function setNoteBox(on) {
        var box = document.getElementById("smNoteBox");
        if (!box) return;
        box.hidden = !on;
        box.classList.toggle("sm-hidden", !on);
    }

    function showApi(n) {
        var items = apiOf(n);
        var title = document.getElementById("smApiTitle");
        var body = document.getElementById("smApiBody");
        var box = document.getElementById("smApiBox");
        if (!title || !body || !box || !items.length) return;
        title.textContent = "1С · " + ru(n.title);
        body.innerHTML = "";
        items.forEach(function (a) {
            var card = document.createElement("div");
            card.className = "sm-api-card";
            var m = document.createElement("code");
            m.textContent = a.method;
            var h = document.createElement("h3");
            h.textContent = a.name;
            var p = document.createElement("p");
            p.textContent = a.d;
            var ul = document.createElement("ul");
            (a.keys || []).forEach(function (k) {
                var li = document.createElement("li");
                li.textContent = k;
                ul.appendChild(li);
            });
            card.appendChild(m);
            card.appendChild(h);
            card.appendChild(p);
            card.appendChild(ul);
            body.appendChild(card);
        });
        box.hidden = false;
        box.classList.remove("sm-hidden");
    }

    function setApiBox(on) {
        var box = document.getElementById("smApiBox");
        if (!box) return;
        box.hidden = !on;
        box.classList.toggle("sm-hidden", !on);
    }

    function applyTransform() {
        var t = "translate(" + state.x + "px," + state.y + "px) scale(" + state.scale + ")";
        document.getElementById("smBoard").style.transform = t;
        var cursors = document.getElementById("smCursors");
        if (cursors) cursors.style.transform = t;
    }

    function expandAll(on) {
        Object.keys(ALL).forEach(function (id) {
            if (ALL[id].node.children && ALL[id].node.children.length) state.open[id] = on;
        });
        save();
        draw();
        centerOnRoot();
        applyTransform();
        shareOpen();
    }

    function showUnclear(on) {
        state.highlightOpen = !!on;
        if (on) {
            Object.keys(ALL).forEach(function (id) {
                if (!isUnclear(ALL[id].node)) return;
                var cur = ALL[id].parent;
                while (cur) {
                    state.open[cur.id] = true;
                    cur = ALL[cur.id] && ALL[cur.id].parent;
                }
            });
            shareOpen();
        }
        document.getElementById("btnTabMap").className = "btn btn-sm " + (on ? "btn-outline-secondary" : "btn-primary");
        var btnQ = document.getElementById("btnTabQ");
        if (btnQ) btnQ.className = "btn btn-sm " + (on ? "btn-danger" : "btn-outline-secondary");
        save();
        draw();
        centerOnRoot();
        applyTransform();
    }

    function zoomToward(nextScale, clientX, clientY) {
        var wrap = document.getElementById("smWrap");
        var prev = state.scale;
        nextScale = Math.min(1.5, Math.max(0.25, nextScale));
        if (nextScale === prev) return;
        var rect = wrap.getBoundingClientRect();
        var cx = clientX - rect.left;
        var cy = clientY - rect.top;
        var bx = (cx - state.x) / prev;
        var by = (cy - state.y) / prev;
        state.scale = nextScale;
        state.x = cx - bx * nextScale;
        state.y = cy - by * nextScale;
        save();
        applyTransform();
    }

    function bindPan() {
        var wrap = document.getElementById("smWrap");
        var drag = null;
        var skipClick = false;
        var last = { x: wrap.clientWidth / 2, y: wrap.clientHeight / 2, abs: false };
        function remember(e) {
            last.x = e.clientX;
            last.y = e.clientY;
            last.abs = true;
        }
        wrap.addEventListener("pointermove", remember);
        wrap.addEventListener("pointerdown", function (e) {
            remember(e);
            if (e.button !== 0 && e.button !== 1) return;
            if (e.target.closest(".sm-plus") || e.target.closest(".sm-port") || e.target.closest(".sm-leaf") || e.target.closest(".sm-edge") || e.target.closest(".sm-topic") || e.target.closest("#smComments") || e.target.closest("button") || e.target.closest("a") || e.target.closest("textarea") || e.target.closest("input") || e.target.closest("[contenteditable=true]")) return;
            skipClick = false;
            drag = {
                x: e.clientX - state.x,
                y: e.clientY - state.y,
                sx: e.clientX,
                sy: e.clientY,
                onUi: !!(e.target.closest(".sm-topic") || e.target.closest(".sm-note")),
                moved: false
            };
            try { wrap.setPointerCapture(e.pointerId); } catch (err) {}
        });
        wrap.addEventListener("pointermove", function (e) {
            if (!drag) return;
            var dx = e.clientX - drag.sx;
            var dy = e.clientY - drag.sy;
            if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 6 && drag.onUi) return;
            drag.moved = true;
            skipClick = true;
            wrap.classList.add("is-panning");
            state.x = e.clientX - drag.x;
            state.y = e.clientY - drag.y;
            applyTransform();
        });
        wrap.addEventListener("pointerup", function () {
            drag = null;
            wrap.classList.remove("is-panning");
        });
        wrap.addEventListener("click", function (e) {
            if (skipClick) {
                skipClick = false;
                return;
            }
            if (e.target.closest(".sm-edge")) return;
            var svg = wrap.querySelector(".sm-svg");
            if (!svg) return;
            svg.classList.remove("is-dim-edges", "is-pinned");
            svg.querySelectorAll(".sm-edge.is-hot").forEach(function (el) { el.classList.remove("is-hot"); });
        }, true);
        wrap.addEventListener("dblclick", function (e) {
            if (e.target.closest(".sm-plus") || e.target.closest(".sm-topic") || e.target.closest(".sm-port")) return;
            e.preventDefault();
            zoomToward(state.scale + 0.18, e.clientX, e.clientY);
        });
        wrap.addEventListener("wheel", function (e) {
            e.preventDefault();
            zoomToward(state.scale + (e.deltaY > 0 ? -0.08 : 0.08), e.clientX, e.clientY);
        }, { passive: false });
        wrap._zoomPoint = function () {
            if (last.abs) return last;
            var r = wrap.getBoundingClientRect();
            return { x: r.left + wrap.clientWidth / 2, y: r.top + wrap.clientHeight / 2 };
        };
        window.addEventListener("pointermove", function (e) {
            if (!rewire || !rewire.line) return;
            var p = boardPoint(e.clientX, e.clientY);
            rewire.line.setAttribute("d", "M " + rewire.sx + " " + rewire.sy + " L " + p.bx + " " + p.by);
            wrap.querySelectorAll(".sm-topic.is-drop").forEach(function (el) { el.classList.remove("is-drop"); });
            var n = nodeAtBoard(p.bx, p.by);
            if (n) {
                var el = wrap.querySelector('.sm-topic[data-id="' + n.id + '"]');
                if (el) el.classList.add("is-drop");
            }
        });
        window.addEventListener("pointerup", function (e) {
            if (rewire) endRewire(e);
        });
    }

    function boardPoint(clientX, clientY) {
        var wrap = document.getElementById("smWrap");
        var r = wrap.getBoundingClientRect();
        return {
            bx: (clientX - r.left - state.x) / state.scale,
            by: (clientY - r.top - state.y) / state.scale
        };
    }

    function schemaCid() {
        if (window.__smCid && /^[a-zA-Z0-9_-]{8,64}$/.test(window.__smCid)) return window.__smCid;
        window.__smCid = "s" + Math.random().toString(36).slice(2) + Date.now().toString(36);
        return window.__smCid;
    }

    var remoteCursors = {};
    var remoteRaf = 0;
    var myNick = null;

    function ensureCursorEl(u) {
        var box = document.getElementById("smCursors");
        if (!box) return null;
        var rec = remoteCursors[u.cid];
        if (rec && rec.el) {
            rec.lab.textContent = (u.emoji ? u.emoji + " " : "") + (u.nick || "");
            rec.lab.style.background = u.color;
            rec.path.setAttribute("fill", u.color);
            return rec;
        }
        var el = document.createElement("div");
        el.className = "sm-cursor";
        el.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 3 L20 12 L12 13 L9 21 Z" fill="' + (u.color || "#64748b") + '" stroke="#fff" stroke-width="1.2"/></svg>';
        var lab = document.createElement("span");
        lab.style.background = u.color || "#64748b";
        lab.textContent = (u.emoji ? u.emoji + " " : "") + (u.nick || "");
        el.appendChild(lab);
        box.appendChild(el);
        rec = {
            el: el,
            lab: lab,
            path: el.querySelector("path"),
            x: u.bx,
            y: u.by,
            tx: u.bx,
            ty: u.by
        };
        remoteCursors[u.cid] = rec;
        el.style.left = rec.x + "px";
        el.style.top = rec.y + "px";
        return rec;
    }

    function tickRemoteCursors() {
        remoteRaf = 0;
        var need = false;
        Object.keys(remoteCursors).forEach(function (id) {
            var rec = remoteCursors[id];
            if (!rec || rec.gone) return;
            var dx = rec.tx - rec.x;
            var dy = rec.ty - rec.y;
            if (Math.abs(dx) + Math.abs(dy) < 0.4) {
                rec.x = rec.tx;
                rec.y = rec.ty;
            } else if (Math.abs(dx) + Math.abs(dy) > 900) {
                rec.x = rec.tx;
                rec.y = rec.ty;
            } else {
                rec.x += dx * 0.38;
                rec.y += dy * 0.38;
                need = true;
            }
            rec.el.style.left = rec.x + "px";
            rec.el.style.top = rec.y + "px";
        });
        if (need) remoteRaf = requestAnimationFrame(tickRemoteCursors);
    }

    function panToBoard(bx, by) {
        var wrap = document.getElementById("smWrap");
        if (!wrap) return;
        var tx = wrap.clientWidth / 2 - bx * state.scale;
        var ty = wrap.clientHeight / 2 - by * state.scale;
        var sx = state.x;
        var sy = state.y;
        var t0 = performance.now();
        function step(now) {
            var k = Math.min(1, (now - t0) / 420);
            k = 1 - Math.pow(1 - k, 3);
            state.x = sx + (tx - sx) * k;
            state.y = sy + (ty - sy) * k;
            applyTransform();
            if (k < 1) requestAnimationFrame(step);
            else save();
        }
        requestAnimationFrame(step);
    }

    function applyPresence(j) {
        applySharedOpen(j && j.open, j && j.openRev);
        applySharedChecks(j && j.checked, j && j.checksRev);
        applySharedEdits(j && j.edits, j && j.editsRev);
        applyVersions(j && j.versions);
        var users = (j && j.users) || [];
        var seen = {};
        users.forEach(function (u) {
            if (!u || !u.cid) return;
            seen[u.cid] = true;
            var rec = ensureCursorEl(u);
            if (!rec) return;
            rec.tx = Number(u.bx) || 0;
            rec.ty = Number(u.by) || 0;
            rec.meta = u;
            rec.gone = false;
            if (!remoteRaf) remoteRaf = requestAnimationFrame(tickRemoteCursors);
        });
        Object.keys(remoteCursors).forEach(function (id) {
            if (seen[id]) return;
            var rec = remoteCursors[id];
            if (rec && rec.el && rec.el.parentNode) rec.el.parentNode.removeChild(rec.el);
            delete remoteCursors[id];
        });
        if (j && j.me) myNick = j.me;
        renderAvatars(users, j && j.me);
    }

    function renderAvatars(users, me) {
        var box = document.getElementById("smAvatars");
        var who = document.getElementById("smWho");
        if (box) {
            box.innerHTML = "";
            function addBtn(u, isMe) {
                var b = document.createElement("button");
                b.type = "button";
                b.className = "sm-avatar" + (isMe ? " is-me" : "");
                b.style.background = u.color || "#64748b";
                b.textContent = u.emoji || "🐾";
                b.title = isMe ? ("Вы: " + (u.nick || "")) : ("Перейти к курсору: " + (u.nick || ""));
                if (!isMe) {
                    b.addEventListener("click", function () {
                        var rec = remoteCursors[u.cid];
                        var bx = rec ? rec.tx : u.bx;
                        var by = rec ? rec.ty : u.by;
                        panToBoard(bx, by);
                        if (rec && rec.el) {
                            rec.el.classList.add("is-pulse");
                            setTimeout(function () { rec.el.classList.remove("is-pulse"); }, 900);
                        }
                    });
                }
                box.appendChild(b);
            }
            if (me) addBtn(me, true);
            (users || []).forEach(function (u) { addBtn(u, false); });
        }
        if (who) {
            var parts = [];
            if (me && me.nick) parts.push("Вы — " + me.nick);
            if (users && users.length) {
                parts.push("ещё: " + users.map(function (u) { return u.nick; }).join(", "));
            }
            who.textContent = parts.join(". ");
        }
    }

    function bindPresence() {
        var cfg = pageCfg();
        if (!cfg.presence || !cfg.me) return;
        var cid = schemaCid();
        var wrapEl = document.getElementById("smWrap");
        var mid = wrapEl.getBoundingClientRect();
        var start = boardPoint(mid.left + wrapEl.clientWidth / 2, mid.top + wrapEl.clientHeight / 2);
        var last = { bx: start.bx, by: start.by };
        var inflight = false;
        var dirty = false;
        var dirtyOpen = false;
        function headers() {
            return {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": cfg.csrf,
                "X-Requested-With": "XMLHttpRequest"
            };
        }
        function post(leave, sendOpen) {
            if (inflight && !leave) {
                dirty = true;
                if (sendOpen) dirtyOpen = true;
                return;
            }
            inflight = true;
            var body = leave
                ? { leave: true, cid: cid }
                : { cid: cid, bx: last.bx, by: last.by };
            if (!leave && (sendOpen || dirtyOpen)) {
                body.open = state.open;
                dirtyOpen = false;
            }
            fetch(cfg.presence, {
                method: "POST",
                headers: headers(),
                credentials: "same-origin",
                keepalive: !!leave,
                body: JSON.stringify(body)
            }).then(function (r) { return r.json(); }).then(function (j) {
                if (j && j.ok && !leave) applyPresence(j);
            }).catch(function () {}).finally(function () {
                inflight = false;
                if (dirty && !leave) {
                    dirty = false;
                    var o = dirtyOpen;
                    dirtyOpen = false;
                    post(false, o);
                }
            });
        }
        pushTree = function () { post(false, true); };
        function poll() {
            fetchBoardGet(cfg.presence + (cfg.presence.indexOf("?") >= 0 ? "&" : "?") + "cid=" + encodeURIComponent(cid))
                .then(function (j) {
                    if (j && j.ok) applyPresence(j);
                }).catch(function () {});
        }
        var sendSoon = 0;
        document.getElementById("smWrap").addEventListener("pointermove", function (e) {
            var p = boardPoint(e.clientX, e.clientY);
            last.bx = p.bx;
            last.by = p.by;
            if (document.hidden) return;
            if (sendSoon) return;
            sendSoon = setTimeout(function () {
                sendSoon = 0;
                post(false);
            }, 70);
        });
        setInterval(function () { if (!document.hidden) post(false); }, 1200);
        setInterval(function () { if (!document.hidden) poll(); }, 900);
        window.addEventListener("pagehide", function () { post(true); });
        post(false);
    }

    var QUESTIONS = (SCHEMA.issues || []).map(function (s, i) {
        return { t: "Карта " + (i + 1), d: s };
    });

    function fillQ() {}

    function setTab(name) {
        showUnclear(name === "q");
    }

    document.getElementById("btnExpand").addEventListener("click", function () { expandAll(true); });
    document.getElementById("btnCollapse").addEventListener("click", function () { expandAll(false); });
    var btnUndo = document.getElementById("btnUndo");
    if (btnUndo) btnUndo.addEventListener("click", function () { undoHistory(); });
    var btnRedo = document.getElementById("btnRedo");
    if (btnRedo) btnRedo.addEventListener("click", function () { redoHistory(); });
    var smHistSelect = document.getElementById("smHistSelect");
    if (smHistSelect) smHistSelect.addEventListener("change", function () { jumpHistory(smHistSelect.value); });
    var btnSaveVer = document.getElementById("btnSaveVer");
    if (btnSaveVer) btnSaveVer.addEventListener("click", function () { setVerBox(true); });
    var smVerSelect = document.getElementById("smVerSelect");
    if (smVerSelect) smVerSelect.addEventListener("change", function () {
        var id = smVerSelect.value;
        smVerSelect.value = "";
        smVerSelect.blur();
        if (id) restoreNamedVersion(id);
    });
    var smTitleEdit = document.getElementById("smTitleEdit");
    if (smTitleEdit) smTitleEdit.setAttribute("disabled", "disabled");
    var smVerSaveGo = document.getElementById("smVerSaveGo");
    if (smVerSaveGo) smVerSaveGo.addEventListener("click", saveNamedVersion);
    var smVerName = document.getElementById("smVerName");
    if (smVerName) smVerName.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            saveNamedVersion();
        }
    });
    ["smVerClose", "smVerCancel", "smVerBack"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener("click", function () { setVerBox(false); });
    });
    var btnAddBlock = document.getElementById("btnAddBlock");
    if (btnAddBlock) btnAddBlock.hidden = true;
    var btnAddSibling = document.getElementById("btnAddSibling");
    if (btnAddSibling) btnAddSibling.hidden = true;
    var btnDelBlock = document.getElementById("btnDelBlock");
    if (btnDelBlock) btnDelBlock.hidden = true;
    (function bindChrome() {
        var KEY = "lakom-schema-chrome-min";
        var page = document.getElementById("smPage");
        var tab = document.getElementById("btnSmChromeTab");
        var hide = document.getElementById("btnSmChromeHide");
        function apply(on) {
            if (page) page.classList.toggle("is-chrome-min", on);
            document.documentElement.classList.toggle("sm-chrome-min", on);
            if (tab) tab.hidden = !on;
            try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (err) {}
        }
        var start = false;
        try { start = localStorage.getItem(KEY) === "1"; } catch (err) {}
        apply(start);
        if (hide) hide.addEventListener("click", function () { apply(true); });
        if (tab) tab.addEventListener("click", function () { apply(false); });
    })();
    document.getElementById("btnZoomIn").addEventListener("click", function () {
        var p = document.getElementById("smWrap")._zoomPoint();
        zoomToward(state.scale + 0.1, p.x, p.y);
    });
    document.getElementById("btnZoomOut").addEventListener("click", function () {
        var p = document.getElementById("smWrap")._zoomPoint();
        zoomToward(state.scale - 0.1, p.x, p.y);
    });
    var btnTabQ = document.getElementById("btnTabQ");
    if (btnTabQ) btnTabQ.addEventListener("click", function () { setTab(state.highlightOpen ? "map" : "q"); });
    var btnAllComments = document.getElementById("btnAllComments");
    if (btnAllComments) btnAllComments.addEventListener("click", function () { openAllComments(); });
    var chkApi = document.getElementById("chkApi");
    if (chkApi) {
        chkApi.checked = !!state.showApi;
        chkApi.addEventListener("change", function () {
            state.showApi = chkApi.checked;
            save();
            draw();
        });
    }

    function setLegend(on) {
        var box = document.getElementById("smLegendBox");
        box.hidden = !on;
        box.classList.toggle("sm-hidden", !on);
    }
    document.getElementById("btnLegend").addEventListener("click", function () { setLegend(true); });
    document.getElementById("smLegendClose").addEventListener("click", function () { setLegend(false); });
    document.getElementById("smLegendBack").addEventListener("click", function () { setLegend(false); });
    var smNoteClose = document.getElementById("smNoteClose");
    var smNoteBack = document.getElementById("smNoteBack");
    if (smNoteClose) smNoteClose.addEventListener("click", function () { setNoteBox(false); });
    if (smNoteBack) smNoteBack.addEventListener("click", function () { setNoteBox(false); });
    var smApiClose = document.getElementById("smApiClose");
    var smApiBack = document.getElementById("smApiBack");
    if (smApiClose) smApiClose.addEventListener("click", function () { setApiBox(false); });
    if (smApiBack) smApiBack.addEventListener("click", function () { setApiBox(false); });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            setLegend(false);
            setCommentsOpen(false);
            setNoteBox(false);
            setApiBox(false);
            setVerBox(false);
        }
        if ((e.key === "z" || e.key === "Z") && (e.ctrlKey || e.metaKey) && !e.target.closest("input, textarea, [contenteditable=true]")) {
            e.preventDefault();
            if (e.shiftKey) redoHistory();
            else undoHistory();
        }
        if ((e.key === "y" || e.key === "Y") && (e.ctrlKey || e.metaKey) && !e.target.closest("input, textarea, [contenteditable=true]")) {
            e.preventDefault();
            redoHistory();
        }
        if ((e.key === "Delete" || e.key === "Backspace") && !e.target.closest("input, textarea, [contenteditable=true]")) {
            return;
        }
        if (e.key === "F2" && document.getElementById("smPage")) {
            e.preventDefault();
        }
        if (typingInField(e) || !document.getElementById("smPage")) return;
        if (e.key === "Tab" || e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
            return;
        }
    });
    function closeCommentsPanel(e) {
        if (e) e.stopPropagation();
        setCommentsOpen(false);
    }
    var smCommentsClose = document.getElementById("smCommentsClose");
    if (smCommentsClose) smCommentsClose.addEventListener("click", closeCommentsPanel);
    var smCommentsClose2 = document.getElementById("smCommentsClose2");
    if (smCommentsClose2) smCommentsClose2.addEventListener("click", closeCommentsPanel);
    var smCommentsSend = document.getElementById("smCommentsSend");
    if (smCommentsSend) smCommentsSend.addEventListener("click", sendComment);
    var smCommentsNew = document.getElementById("smCommentsNew");
    if (smCommentsNew) smCommentsNew.addEventListener("click", function () {
        commentReply = null;
        var bar = document.getElementById("smCommentsReply");
        if (bar) {
            bar.hidden = true;
            bar.classList.add("sm-hidden");
        }
        var ta = document.getElementById("smCommentsText");
        if (ta) ta.focus();
    });

    bindPan();
    bindPresence();
    pushHistory("Старт");
    renderHistUi();
    applyVersions([]);
    draw();
    loadCounts(function () {
        loadChecks(function () { draw(); });
    });
    if (pageCfg().checks) {
        setInterval(function () {
            if (!document.hidden) loadChecks();
        }, 400);
        document.addEventListener("visibilitychange", function () {
            if (!document.hidden) loadChecks();
        });
    }
})();
