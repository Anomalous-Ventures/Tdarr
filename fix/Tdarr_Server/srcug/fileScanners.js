/**
 * Tdarr File Scanner - Patched Version
 *
 * This file contains fixes for TypeError crashes that occur during library scanning.
 *
 * FIXES APPLIED:
 *
 * 1. Null check after getById() call (lines 85-91)
 *    - Original code did not verify library exists before accessing properties
 *    - Causes: "Cannot read properties of undefined (reading 'containerFilter')"
 *    - Fix: Return early if library not found in database
 *
 * 2. Property fallback for container filter (line 92)
 *    - Property name can be 'containerFilter' or 'allowedContainers' depending on version
 *    - Fix: Try multiple property names with fallback chain
 *
 * 3. Array type handling for foldersToIgnore (line 112)
 *    - This property can be stored as either a comma-separated string OR an array
 *    - Original code always called .split(',') which fails on arrays
 *    - Causes: "k.split is not a function"
 *    - Fix: Check Array.isArray() before calling .split()
 *
 * See: https://github.com/HaveAGitGat/Tdarr/pull/1311
 */
'use strict';
const a225N = a225b;
(function(a, b) {
    const L = a225b,
        c = a();
    while (!![]) {
        try {
            const d = parseInt(L(0x1b5)) / 0x1 + -parseInt(L(0x1aa)) / 0x2 * (parseInt(L(0x1f4)) / 0x3) + -parseInt(L(0x1a4)) / 0x4 + parseInt(L(0x1cd)) / 0x5 * (parseInt(L(0x1e2)) / 0x6) + -parseInt(L(0x1b9)) / 0x7 + parseInt(L(0x1fc)) / 0x8 * (parseInt(L(0x1b8)) / 0x9) + -parseInt(L(0x1ad)) / 0xa;
            if (d === b) break;
            else c['push'](c['shift']());
        } catch (e) {
            c['push'](c['shift']());
        }
    }
}(a225a, 0x4de08));
var __importDefault = this && this['__importDefault'] || function(a) {
    const M = a225b;
    return a && a[M(0x201)] ? a : {
        'default': a
    };
};
Object[a225N(0x1b1)](exports, a225N(0x201), {
    'value': !![]
}), exports['dbUpdatePush'] = exports[a225N(0x1d8)] = exports[a225N(0x1c6)] = exports[a225N(0x1dd)] = exports[a225N(0x1f9)] = exports[a225N(0x20c)] = void 0x0;

function a225b(a, b) {
    const c = a225a();
    return a225b = function(d, e) {
        d = d - 0x1a0;
        let f = c[d];
        return f;
    }, a225b(a, b);
}
const setImm_1 = require(a225N(0x1fb)),
    timer_1 = __importDefault(require(a225N(0x203))),
    paths_1 = __importDefault(require('./paths')),
    crudNewDBBE_1 = __importDefault(require(a225N(0x207))),
    stripFile_1 = __importDefault(require(a225N(0x1e9))),
    logger_1 = __importDefault(require(a225N(0x20f))),
    normJoinPath_1 = __importDefault(require('./commonModules/normJoinPath')),
    sqlDb_1 = require(a225N(0x1a3)),
    sqlUtils_1 = require(a225N(0x1e7)),
    shortid = require(a225N(0x1e3)),
    childProcess = require('child_process'),
    fileScanners = {},
    fileScannersStatus = {};
exports[a225N(0x20c)] = {};
const runningScans = [];
exports[a225N(0x1f9)] = [];
const sendWorkerMessage = (a, b) => {
        const O = a225N;
        fileScanners[a] && fileScanners[a][O(0x205)] === !![] && fileScanners[a]['send'](b);
    },
    scanFiles = async a => {
        const P = a225N;
        logger_1[P(0x1da)][P(0x1ed)](P(0x1c8));
        const b = shortid['generate'](),
            c = a;
        c[P(0x20e)] = b;
        let d = '';
        c['mode'] === P(0x1ae) || c['mode'] === 'scanFresh' ? d = c[P(0x202)] : d = shortid[P(0x1a2)]();
        c['scannerID'] = d, timer_1[P(0x1da)][P(0x1fe)](d), logger_1[P(0x1da)][P(0x1ed)](d + P(0x1b4));
        if (runningScans[P(0x1dc)](c['dbID']) && (c['mode'] === P(0x1ae) || c[P(0x1a0)] === P(0x1d3))) logger_1[P(0x1da)][P(0x1b3)](P(0x1d9));
        else {
            try {
                (c['mode'] === P(0x1ae) || c[P(0x1a0)] === 'scanFresh') && runningScans[P(0x1a7)](c['dbID']);
                if (c[P(0x1a0)] === 'scanFindNew') {
                    logger_1[P(0x1da)][P(0x1ed)](P(0x1a9));
                    const s = await sqlDb_1[P(0x1d1)]['db'][P(0x1d2)]('\x0a\x20\x20\x20\x20\x20\x20\x20\x20SELECT\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + sqlUtils_1[P(0x1e6)]['id'] + P(0x1ff) + sqlUtils_1[P(0x1e6)]['json_data'] + P(0x1e5) + sqlUtils_1[P(0x1e6)]['db'] + P(0x1bd) + c[P(0x202)] + P(0x1b7), undefined);
                    c['storeID'] && (exports[P(0x20c)][c[P(0x20e)]] = s[P(0x1c7)]());
                } else {
                    if (c[P(0x1a0)] === P(0x1d3)) logger_1[P(0x1da)][P(0x1ed)](P(0x1c0)), await crudNewDBBE_1[P(0x1da)][P(0x206)](P(0x1e1), c[P(0x202)]);
                    else c[P(0x1a0)] === 'scanFolderWatcher' && (Array[P(0x1a1)](c['arrayOrPath']) && (c[P(0x20e)] && (exports[P(0x20c)][c[P(0x20e)]] = c[P(0x1a5)]['map'](t => ({
                        'file': t,
                        'file_size': 0x0
                    })))), c[P(0x1a5)] = []);
                }
                if (c[P(0x1a0)] === P(0x1ae) || c[P(0x1a0)] === P(0x1d3)) {
                    const t = {
                        '_id': c[P(0x202)],
                        'scanButtons': ![]
                    };
                    await crudNewDBBE_1['default'][P(0x1f7)](P(0x1c2), c[P(0x202)], t), fileScannersStatus[c['dbID']] = 'Files\x20found:' + 0x0;
                }
                const e = await crudNewDBBE_1[P(0x1da)]['getById'](P(0x1c2), c[P(0x202)]);
                // FIX: Library may not exist in DB (deleted, race condition, etc.)
                // Original code did not check, causing "Cannot read properties of undefined"
                if (!e) {
                    logger_1[P(0x1da)][P(0x20d)]('Library not found: ' + c[P(0x202)]);
                    const errRes = { '_id': c[P(0x202)], 'scanButtons': !![] };
                    await crudNewDBBE_1[P(0x1da)][P(0x1f7)](P(0x1c2), c[P(0x202)], errRes);
                    return;
                }
                // FIX: Property name varies by version - try multiple names with fallback
                let f = (e[P(0x1d7)] || e['containerFilter'] || e['allowedContainers'] || '');
                f = f[P(0x1fa)](',');
                const g = ['closedCaptionScan'],
                    h = {
                        'exifToolScan': ![],
                        'mediaInfoScan': ![],
                        'closedCaptionScan': ![]
                    };
                for (let u = 0x0; u < g['length']; u += 0x1) {
                    if ((0x0, setImm_1[P(0x210)])(u)) await (0x0, setImm_1['setImm'])();
                    const v = e[g[u]];
                    h[g[u]] = v === !![] || v === ![] ? v : ![];
                }
                const {
                    foldersToIgnoreCaseInsensitive: j
                } = e;
                let {
                    foldersToIgnore: k,
                    scannerThreadCount: l
                } = e;
                // FIX: foldersToIgnore can be array or string - check before calling .split()
                k = (Array.isArray(k) ? k : (k || '')[P(0x1fa)](','))[P(0x1f1)](w => w['trim']())[P(0x1ef)](w => w !== ''), l = parseInt(l, 0xa);
                (isNaN(l) || l < 0x1 || l > 0x3e8) && (l = 0x1);
                const m = await crudNewDBBE_1[P(0x1da)][P(0x1b6)](P(0x1ab), P(0x1e0)),
                    {
                        resBoundaries: n,
                        verboseLogs: o
                    } = m;
                c[P(0x1d4)] = f, c[P(0x1be)] = paths_1[P(0x1da)], c['scanTypes'] = h, c[P(0x211)] = k, c['foldersToIgnoreCaseInsensitive'] = j, c[P(0x1ca)] = n, c[P(0x1e4)] = o, c[P(0x1f0)] = l, c[P(0x1c5)] = e[P(0x1c5)], c[P(0x1cc)] = e[P(0x1d0)];
                const p = JSON['stringify'](c),
                    q = [p],
                    r = (0x0, normJoinPath_1['default'])(__dirname, P(0x1af));
                fileScanners[d] = childProcess[P(0x1a6)](r, q, {
                    'execArgv': [],
                    'env': {
                        ...process[P(0x1eb)]
                    }
                }), logger_1[P(0x1da)]['info']('[' + timer_1[P(0x1da)]['get'](d) + 'ms]\x20' + d + P(0x1cb)), logger_1[P(0x1da)][P(0x1ed)]('Scanner\x20' + d + P(0x1df));
            } catch (w) {
                logger_1[P(0x1da)][P(0x20d)](w);
                const x = {
                    '_id': c[P(0x202)],
                    'scanButtons': !![]
                };
                await crudNewDBBE_1['default'][P(0x1f7)]('LibrarySettingsJSONDB', c['dbID'], x);
            }
            fileScanners[d]['on'](P(0x1d5), (y, z) => {
                const Q = P;
                logger_1['default'][Q(0x1ed)](d + Q(0x209));
            }), fileScanners[d]['on']('error', console['error'][P(0x1f3)](console)), fileScanners[d]['on'](P(0x1bf), async y => {
                const R = P;
                if (y[0x1] === R(0x1c1)) {
                    let z = exports[R(0x20c)][y[0x0]];
                    if (Array[R(0x1a1)](z)) {
                        timer_1[R(0x1da)][R(0x1fe)]('dataPush'), logger_1[R(0x1da)][R(0x1ed)](z[R(0x1ac)] + '\x20files\x20sending');
                        for (let B = 0x0; B < z[R(0x1ac)]; B += 0x1) {
                            if ((0x0, setImm_1[R(0x210)])(B)) await (0x0, setImm_1[R(0x200)])();
                            const C = ['dataPush', z[B]];
                            sendWorkerMessage(d, C);
                        }
                        logger_1['default']['info']('[' + timer_1['default']['get'](R(0x1c4)) + 'ms]\x20' + z['length'] + R(0x1de));
                        const A = ['dataPushFinish'];
                        sendWorkerMessage(d, A);
                    } else {
                        const D = [R(0x1bc)];
                        sendWorkerMessage(d, D);
                    }
                    z = [], exports['fileScannersDataStore'][y[0x0]] = [];
                }
                y[0x1] === R(0x1ec) && await crudNewDBBE_1[R(0x1da)][R(0x1a8)](R(0x1e1), y[0x0]);
                if (y[0x1] === R(0x1ba)) {
                    const E = JSON['parse'](y[0x2]);
                    if (typeof E === R(0x204) && E !== null) {} else {}
                    exports[R(0x1f9)]['push'](E);
                }
                y[0x1] === 'updateScanFound' && (fileScannersStatus[y[0x2]] = y[0x3]);
                if (y[0x1] === R(0x1e8)) {
                    const F = [R(0x20a)];
                    sendWorkerMessage(d, F), logger_1['default'][R(0x1ed)](R(0x1ee) + y[0x0] + ':Finished');
                    try {
                        const G = runningScans[R(0x1db)](y[0x2]);
                        G !== -0x1 && runningScans['splice'](G, 0x1);
                    } catch (H) {
                        logger_1['default'][R(0x20d)](H);
                    }
                    if (y[0x3] === !![]) {
                        const I = {
                            '_id': y[0x2],
                            'scanButtons': !![]
                        };
                        await crudNewDBBE_1[R(0x1da)][R(0x1f7)]('LibrarySettingsJSONDB', y[0x2], I);
                    }
                }
                if (y[0x1] === R(0x1bb)) {
                    const J = y[0x2],
                        K = R(0x1ee) + y[0x0] + ':' + y[0x3];
                    logger_1[R(0x1da)][J](K);
                }
            });
        }
    };
exports[a225N(0x1dd)] = scanFiles;
const getFileScannerStatus = a => fileScannersStatus[a];
exports[a225N(0x1c6)] = getFileScannerStatus;
const killFileScanner = async a => {
    const S = a225N;
    try {
        logger_1['default'][S(0x1b3)](a + S(0x1c9));
        const d = ['exitThread'];
        sendWorkerMessage(a, d);
    } catch (e) {}
    const b = runningScans[S(0x1db)](a);
    b !== -0x1 && runningScans[S(0x1f8)](b, 0x1);
    const c = {
        '_id': a,
        'scanButtons': !![]
    };
    await crudNewDBBE_1[S(0x1da)][S(0x1f7)](S(0x1c2), a, c);
};

function a225a() {
    const U = ['dataRequest', 'LibrarySettingsJSONDB', 'TranscodeDecisionMaker', 'dataPush', 'isDirectoryLibrary', 'getFileScannerStatus', 'slice', 'Starting\x20file\x20scan', '\x20Cancelling\x20scan', 'resBoundaries', '\x20Prep\x20finished', 'sourceFolder', '3062135WOesot', 'stringify', 'verbose:Adding\x20file\x20to\x20DB:\x20\x22', 'folder', 'dbHandler', 'all', 'scanFresh', 'allowedContainers', 'exit', '_id', 'containerFilter', 'killFileScanner', 'Scan\x20is\x20already\x20running\x20on\x20library', 'default', 'indexOf', 'includes', 'scanFiles', '\x20files\x20sent', '\x20launched', 'globalsettings', 'FileJSONDB', '6qFkxxD', 'shortid', 'verboseLogs', ',\x20\x27$.file_size\x27)\x20AS\x20file_size\x0a\x20\x20\x20\x20\x20\x20\x20\x20FROM\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20filejsondb\x0a\x20\x20\x20\x20\x20\x20\x20\x20WHERE\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'fileColumns', './db/sql/sqlUtils', 'finishScan', './stripFile', 'Hold', 'env', 'removeFileFromDB', 'info', 'Scanner\x20', 'filter', 'scannerThreadCount', 'map', 'parse', 'bind', '433098cREMJE', 'insertMany', 'dbUpdatePush', 'update', 'splice', 'filesToAddToDB', 'split', './commonModules/setImm', '42040cbheVy', 'getTime', 'start', '\x20AS\x20file,\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20json_extract(', 'setImm', '__esModule', 'dbID', './commonModules/timer', 'object', 'connected', 'removeByDB', './db/crudNewDBBE', 'file_size', '\x20File\x20scanner\x20exited', 'exitApproved', 'verbose:This\x20exact\x20file\x20does\x20not\x20exist\x20in\x20DB.\x20Removing\x20old,\x20adding\x20new', 'fileScannersDataStore', 'error', 'storeID', './commonModules/logger', 'imInt', 'foldersToIgnore', 'mode', 'isArray', 'generate', './db/sql/sqlDb', '171544sLDlXl', 'arrayOrPath', 'fork', 'push', 'removeOne', 'Commencing\x20file\x20update\x20scan.\x20Deleting\x20non-existent\x20files\x20and\x20adding\x20new\x20files.', '8FARlwJ', 'SettingsGlobalJSONDB', 'length', '529440VzOrrS', 'scanFindNew', 'commonModules/fileScanner/fileScanner.js', 'verbose:This\x20exact\x20file\x20already\x20exists\x20in\x20DB.', 'defineProperty', 'holdUntil', 'warn', '\x20Prep\x20started', '583715uuFAvw', 'getById', '\x27\x0a\x20\x20\x20\x20\x20\x20\x20\x20', '378OrTfkI', '2972018CLwEGD', 'addFileToDB', 'consoleMessage', 'dataPushFinish', '\x20=\x20\x27', 'homePath', 'message', 'Commencing\x20fresh\x20file\x20scan.'];
    a225a = function() {
        return U;
    };
    return a225a();
}
exports[a225N(0x1d8)] = killFileScanner;
const dbUpdatePush = async () => {
    const T = a225N;
    try {
        timer_1['default']['start'](T(0x1f6));
        const a = [],
            b = await crudNewDBBE_1[T(0x1da)][T(0x1b6)](T(0x1ab), T(0x1e0));
        let c = ![];
        b && (c = b['verboseLogs']);
        try {
            for (let d = 0x0; d < exports[T(0x1f9)]['length']; d += 0x1) {
                if ((0x0, setImm_1[T(0x210)])(d)) await (0x0, setImm_1['setImm'])();
                try {
                    let e = exports[T(0x1f9)][d];
                    e = JSON[T(0x1f2)](JSON[T(0x1ce)](e));
                    const f = await (0x0, stripFile_1[T(0x1da)])(e),
                        {
                            holdNewFiles: g,
                            holdFor: h
                        } = await crudNewDBBE_1[T(0x1da)][T(0x1b6)]('LibrarySettingsJSONDB', exports[T(0x1f9)][d]['DB']);
                    if (g === !![]) {
                        let k = h;
                        (isNaN(k) || k < 0x0) && (k = 0x0), k = new Date()[T(0x1fd)]() + k * 0x3e8, f[T(0x1b2)] = k, f[T(0x1c3)] = T(0x1ea), f['HealthCheck'] = T(0x1ea);
                    }
                    const i = await crudNewDBBE_1['default'][T(0x1b6)](T(0x1e1), exports[T(0x1f9)][d][T(0x1d6)]);
                    if (i === undefined) c === !![] && logger_1['default'][T(0x1ed)]('verbose:This\x20exact\x20file\x20does\x20not\x20exist\x20in\x20DB.\x20Adding'), a[T(0x1a7)](f), c === !![] && logger_1[T(0x1da)][T(0x1ed)]('verbose:Adding\x20file\x20to\x20DB:\x20\x22' + exports[T(0x1f9)][d]['_id'] + '\x22');
                    else {
                        const l = f[T(0x208)],
                            m = i[T(0x208)];
                        l === m ? c === !![] && logger_1[T(0x1da)][T(0x1ed)](T(0x1b0)) : (c === !![] && logger_1['default'][T(0x1ed)](T(0x20b)), await crudNewDBBE_1['default'][T(0x1a8)]('FileJSONDB', exports[T(0x1f9)][d]['_id']), await crudNewDBBE_1[T(0x1da)]['insert']('FileJSONDB', exports[T(0x1f9)][d][T(0x1d6)], f), c === !![] && logger_1[T(0x1da)][T(0x1ed)](T(0x1cf) + exports[T(0x1f9)][d]['_id'] + '\x22'));
                    }
                } catch (n) {
                    logger_1[T(0x1da)][T(0x20d)](n);
                }
                exports[T(0x1f9)][T(0x1f8)](d, 0x1), d -= 0x1;
            }
        } catch (o) {
            logger_1[T(0x1da)]['error'](o);
        }
        a[T(0x1ac)] > 0x0 && await crudNewDBBE_1[T(0x1da)][T(0x1f5)](T(0x1e1), a);
        if (c === !![]) {}
    } catch (p) {
        logger_1['default'][T(0x20d)](p);
    }
};
exports[a225N(0x1f6)] = dbUpdatePush;