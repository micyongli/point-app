/*
 * @Author: micyongli@163.com
 * @Date: 2022-04-29 10:47:34
 * @Last Modified by: micyongli@163com
 * @Last Modified time: 2022-05-01 19:13:11
 */
(function () {


    function Json2String(obj) {
        return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(obj);
    }

    function http() {
    }

    http.prototype.__executor = function (method) {
        if (this.__executor) {
            this.__executor =
                org.apache.http.impl.client.HttpClientBuilder.create().build();
        }
        try {
            var result = this.__executor.execute(method);
            var retStr = org.apache.http.util.EntityUtils.toString(result.getEntity());
            return JSON.parse(retStr);
        } catch (e) {
            return JSON.parse(this.__obj2Str(e));
        }
    };
    http.prototype.__methods = function (method, url, body, header) {
        var httpMethod = null;
        if ("GET" === method) {
            httpMethod = new org.apache.http.client.methods.HttpGet(url);
        } else if ("POST" === method) {
            httpMethod = new org.apache.http.client.methods.HttpPost(url);
        } else if ("DELETE" === method) {
            httpMethod = new org.apache.http.client.methods.HttpDelete(url);
        } else if ("PUT" === method) {
            httpMethod = new org.apache.http.client.methods.HttpPut(url);
        } else {
            throw new Error("无效的方法");
        }
        if (this.isObject(header)) {
            this.__setHeader(httpMethod, header);
        }
        if (this.isObject(body)) {
            httpMethod.setEntity(this.__obj2Entity(body));
        }
        return httpMethod;
    };

    http.prototype.get = function (url, body, header) {
        var m = this.__methods("GET", url, body, header);
        return this.__executor(m);
    };
    http.prototype.post = function (url, body, header) {
        var m = this.__methods("POST", url, body, header);
        return this.__executor(m);
    };
    http.prototype.delete = function (url, body, header) {
        var m = this.__methods("DELETE", url, body, header);
        return this.__executor(m);
    };
    http.prototype.put = function (url, body, header) {
        var m = this.__methods("PUT", url, body, header);
        return this.__executor(m);
    };
    http.prototype.__setHeader = function (method, header) {
        if (
            (method instanceof org.apache.http.client.methods.HttpGet ||
                method instanceof org.apache.http.client.methods.HttpPost ||
                method instanceof org.apache.http.client.methods.HttpPut ||
                method instanceof org.apache.http.client.methods.HttpDelete) &&
            this.isObject(header)
        ) {
            var ks = Object.keys(header);
            for (var i = 0; i < ks.length; i++) {
                method.setHeader(ks[i], header[ks[i]]);
            }
        }
    };

    http.prototype.__jacksonMapper = function () {
        return new com.fasterxml.jackson.databind.ObjectMapper();
    };

    http.prototype.__obj2Str = function (obj) {
        if (!this.__jack_mapper) {
            this.__jack_mapper = this.__jacksonMapper();
        }
        return this.__jack_mapper.writeValueAsString(obj);
    };

    http.prototype.__obj2Entity = function (obj) {
        var objString = this.__obj2Str(obj);
        var stringEntity = new org.apache.http.entity.StringEntity(
            objString,
            java.nio.charset.Charset.forName("utf-8")
        );
        stringEntity.setContentType("application/json");
        return stringEntity;
    };

    http.prototype.typeName = function (obj) {
        return Object.prototype.toString.apply(obj);
    };
    http.prototype.isObject = function (obj) {
        return this.typeName(obj) === "[object Object]";
    };

    http.prototype.isJavaObject = function (obj) {
        return this.typeName(obj) === "[object JavaObject]";
    };
    http.prototype.isString = function (obj) {
        return this.typeName(obj) === "[object String]";
    };
    http.prototype.isNum = function (obj) {
        return this.typeName(obj) === "[object Number]";
    };

    var msg = Dialogs.MsgBox.bind(Dialogs);
    var glang = Context.getSelectedLanguage();
    var httpClient = new http();
    var activeDb = ArisData.getActiveDatabase();
    var currentDatabaseName = activeDb.Name(glang);
    var versioning = Context.getComponent("Versioning");
    var archiveList = versioning.getChangelistInfos(activeDb);
    archiveList.sort(function (a, b) {
        return a.getID() - b.getID();
    });

    var lastestArchive = archiveList[archiveList.length - 1];
    var asn = lastestArchive.getID();
    var archiveDb = ArisData.openDatabaseVersion(currentDatabaseName, asn, true);
    var rootGroup = archiveDb.RootGroup();

    var children = rootGroup.Childs(true);
    children.unshift(rootGroup);
    var modelRevision = [];
    var rootChildren = children.map(function (g) {
        var defList = [];
        g.ObjDefList().forEach(function (def) {
            defList.push({type: 'Def', id: def.GUID()});
        });
        g.ModelList().forEach(function (m) {
            defList.push({type: 'Model', id: m.GUID()});
            var modelRevisionList = versioning.getModelRevisions(m);
            modelRevisionList.sort(function (a, b) {
                return a.getRevisionNumber() - b.getRevisionNumber();
            });
            var lastest = modelRevisionList[modelRevisionList.length - 1];
            modelRevision.push({
                modelId: m.GUID(),
                revision: lastest.getRevisionNumber(),
                description: lastest.getChangeListInfo().getDescription(),
                createBy: lastest.getChangeListInfo().getUser(),
                createTime: lastest.getChangeListInfo().getSubmitTimeGMT0(),
                asn: lastest.getChangeListInfo().getID(),
            });
        });

        return {
            groupId: g.GUID(),
            name: g.Name(glang),
            parent: g.Parent().GUID(),
            children: defList
        }
    });

    var dbEntity = {
        dbId: String(activeDb.ObjectID()),
        dbName: currentDatabaseName,
        asn: asn,
        submitDesc: lastestArchive.getDescription(),
        createBy: lastestArchive.getUser(),
        createTime: lastestArchive.getSubmitTimeGMT0(),
        rootGroup: rootGroup.GUID(),
        rootChildren: rootChildren,
        modelRevision: modelRevision,
    };
    archiveDb && archiveDb.close();
    var result = httpClient.post('http://127.0.0.1:3000/sync', dbEntity);
    msg(Json2String(result));
})();

