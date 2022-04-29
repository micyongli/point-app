/*
 * @Author: micyongli@163.com 
 * @Date: 2022-04-29 14:59:13 
 * @Last Modified by: micyongli@163.com
 * @Last Modified time: 2022-04-29 15:24:09
 */
(function () {

    var msg = Dialogs.MsgBox.bind(Dialogs);
    var glang = Context.getSelectedLanguage();
    var _at = getConstMap('AT_');
    var _st = getConstMap('ST_');
    merge(_at, _st);
    var _ot = getConstMap('OT_');
    merge(_at, _ot);
    var _ct = getConstMap('CT_');
    merge(_at, _ct);
    msg(JSON.stringify(_at));

    function merge(t, s) {
        Object.keys(s).forEach(function (x) {
            t[x] = s[x];
        });
    }

    function getConstMap(prefix) {
        var m = {};
        var f = Constants.getClass().getFields();
        for (var i = 0; i < f.length; i++) {
            var obj = f[i];
            var key = obj.getName();
            if (key.indexOf(prefix) === 0) {
                var value = obj.getInt(Constants);
                m[key] = value;
            }
        }
        return m;
    }


})();
