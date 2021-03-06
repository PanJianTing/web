var da = {};
da.djJsNeedInterface = true;
da.djJsReady = false;
da.djJsDebug = false;
da.readyFun;
da.errorFun;
da.functionMap = {};
da.version;
da.djInjs = false;
da.dajia_eval = function (data) {
    try {
        return eval('(' + data + ')');
    } catch (e) {

    }
    return undefined;
};
da.check = function (data) {
    this.djInjs = true;
    if (data == "ok") {
        this.djJsReady = true;
        if (this.readyFun)
            this.readyFun();
        return;
    }
    if (data == "error") {
        this.djJsReady = false;
        if (this.errorFun)
            this.errorFun();
        return;
    }
    if (typeof (data) != "object") {
        data = this.dajia_eval('(' + data + ')');
    }
    if (data.msg == "ok") {
        this.djJsReady = true;
        this.functionMap = data.fun || {};
        if (this.readyFun)
            this.readyFun();
    } else {
        this.djJsReady = false;
        if (this.errorFun)
            this.errorFun();
    }
};

da.canTrans = function () {
    return this.djJsReady && typeof(djInternal) != 'undefined';
};


//对前台页面提供的接口
da.config = function (v) {
    this.djJsDebug = v.debug;
    this.djJsNeedInterface = true;
};
da.ready = function (v) {
    this.readyFun = v;
    if (this.djInjs && da.djJsReady) {
        this.readyFun();
    }
};
da.error = function (v) {
    this.errorFun = v;
    if (this.djInjs && da.djJsReady == false) {
        this.errorFun();
    }
};
da.checkFun = function (v) {
    if (this.functionMap && this.dajia_eval('this.functionMap.' + v.funName)) {
        v.success();
    } else if (this.canTrans()) {
        djInternal.callHandler('checkFun', {'funName': v.funName},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success();
                        break;
                    case 'fail':
                        v.fail && v.fail();
                        break;
                    default:
                        v.fail && v.fail();
                        break;
                }
            });
    } else {
        v.fail && v.fail();
    }
};
da.scanDevice = function (v) {
    if (this.canTrans())
        djInternal.callHandler('scanDevice', {'reScan': v.reScan, 'sid': v.sid}, function (callback) {
            switch (callback.code) {
                case 'success':
                    v.success(callback.res);
                    break;
                case 'fail':
                    v.fail && v.fail(callback.res);
                    break;
                default:
                    v.fail && v.fail(callback.res);
                    break;
            }
        });
};
da.connectPeripheralAndRead = function (v) {
    if (this.canTrans())
        djInternal.callHandler('connectPeripheralAndRead', {'pid': v.pid, 'sid': v.sid, 'rcid': v.rcid, 'wcid': v.wcid},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.connectPeripheralAndWrite = function (v) {
    if (this.canTrans())
        djInternal.callHandler('connectPeripheralAndWrite', {
                'pid': v.pid,
                'sid': v.sid,
                'rcid': v.rcid,
                'wcid': v.wcid,
                'content': v.content
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.showReadList = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showReadList', {'feedID': v.feedID, 'communityID': v.communityID});
};
da.showPraiseList = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showPraiseList', {'feedID': v.feedID, 'communityID': v.communityID});
};
da.showCommentList = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showCommentList', {'feedID': v.feedID, 'communityID': v.communityID});
};
da.showPerson = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showPerson', {'personID': v.personID, 'personName': v.personName});
};
da.showGroup = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showGroup', {'groupID': v.groupID, 'groupName': v.groupName},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.joinCommunity = function (v) {
    if (this.canTrans())
        djInternal.callHandler('joinCommunity', {'communityID': v.communityID});
};
da.enterCommunity = function (v) {
    if (this.canTrans())
        djInternal.callHandler('enterCommunity', {'communityID': v.communityID, 'communityName': v.communityName});
};
da.enterExperience = function (v) {
    if (this.canTrans())
        djInternal.callHandler('enterExperience', {
            'communityID': v.communityID,
            'username': v.username,
            'password': v.password
        });
};
da.joinGroup = function (v) {
    if (this.canTrans())
        djInternal.callHandler('joinGroup', {'communityID': v.communityID, 'groupID': v.groupID});
};
da.showPicList = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showPicList', {'current': v.current, 'ids': v.ids, 'isUrl': v.isUrl});
};
da.showFile = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showFile', {'fileID': v.fileID, 'fileName': v.fileName, 'fileSize': v.fileSize,'filePath':v.filePath});
};
da.showLocation = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showLocation', {'lat': v.lat, 'lon': v.lon, 'name': v.name, 'addr': v.addr});
};
da.getLocation = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getLocation', {
                'current': v.current,
                'lat': v.lat,
                'lon': v.lon,
                'name': v.name,
                'addr': v.addr
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.showScan = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showScan', {'needResult': v.needResult},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.showQRCode = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showQRCode', {'url': v.url, 'type':v.type},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * networkType none:无网络 2g:2g网络 3g:3g网络 4g:4g网络 wifi:wifi
 * @param v
 */
da.getNetWorkType = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getNetWorkType', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 * 选择图片
 * @param v.type == 1 只拍照,其他值均为调取系统相册
 */
da.chooseImage = function (v) {
    if (this.canTrans())
        djInternal.callHandler('chooseImage', {
                type: v.type,
                current: v.current,
                max: v.max,
                returnType: v.returnType,
                isReturnOrgUrls: v.isReturnOrgUrls,
                thumbnailWidth: v.thumbnailWidth
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.previewImage = function (v) {
    if (this.canTrans())
        djInternal.callHandler('previewImage', {'current': v.current, 'urls': v.urls});
};
da.uploadFile = function (v) {
    if (this.canTrans())
        djInternal.callHandler('uploadFile', {'files': v.files, 'isShowProgress': v.isShowProgress},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.downloadImage = function (v) {
    if (this.canTrans())
        djInternal.callHandler('downloadImage', {'picId': v.picId, 'isShowProgressTips': v.isShowProgressTips},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};


da.closeWindow = function () {
    if (this.canTrans())
        djInternal.callHandler('closeWindow');
};
da.closeWindowWithMessage = function (v) {
    if (this.canTrans())
        djInternal.callHandler('closeWindowWithMessage', {'msg': v.msg});
};
da.createWindow = function (v) {
    if (this.canTrans())
        djInternal.callHandler('createWindow', {'type': v.type, 'url': v.url});
};
da.showMessage = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showMessage', {'msg': v.msg, 'type': v.type});
};

da.showPrompt = function (param) {
    if (this.canTrans())
        djInternal.callHandler('showPrompt', {
            type: param.type,	//标记提示	0:失败返回;  1:	提示我的服务单;  2:成功返回 ;  98:取消页面动作操作   99：恢复页面动作操作
            style: param.style,	//显示提示的样式 0：普通(默认)  1:警告 2:错误   9:顶部红条
            msg: param.msg		//提示语， 或者动作类型flush
        });
};
da.statusWindow = function (v) {
    if (this.canTrans())
        djInternal.callHandler('statusWindow', {'type': v.type, 'msg': v.msg});
};
da.historyBack = function () {
    if (this.canTrans())
        djInternal.callHandler('historyBack');
};
da.appLogin = function () {
    if (this.canTrans())
        djInternal.callHandler('appLogin', {'name': v.name, 'pwd': v.pwd, 'action': v.action},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.forward = function (v) {
    if (this.canTrans())
        djInternal.callHandler('forward', {'code': v.code},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.saveFormFeed = function (v) {
    if (this.canTrans())
        djInternal.callHandler('saveFormFeed', {'formID': v.formID, 'formRecordID': v.formRecordID, 'title': v.title},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.setWebParam = function (v) {
    if (this.canTrans())
        djInternal.callHandler('setWebParam', {
                'title': v.title,
                'description': v.description,
                'address': v.address,
                'picID': v.picID,
                'logoID': v.logoID,
                'pageType': v.pageType,
                'pageID': v.pageID,
                'isPreview': v.isPreview
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.requestPortalTopic = function (v) {
    if (this.canTrans())
        djInternal.callHandler('requestPortalTopic', {'version': v.version, 'isCache': v.isCache},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.touchPortalTopic = function (v) {
    if (this.canTrans())
        djInternal.callHandler('touchPortalTopic', {'tagID': v.tagID});
};

da.requestPortalGroup = function (v) {
    if (this.canTrans())
        djInternal.callHandler('requestPortalGroup', {
                'page': v.page,
                'count': v.count,
                'view': v.view,
                'style': v.style,
                'isCache': v.isCache
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * page为0时表示请求首页,page大于0时表示tab签请求
 * @param v
 */
da.requestAllGroup = function (v) {
    if (this.canTrans())
        djInternal.callHandler('requestAllGroup', {
                'page': v.page,
                'count': v.count,
                'view': v.view,
                'style': v.style,
                'isCache': v.isCache
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.requestJoinGroup = function (v) {
    if (this.canTrans())
        djInternal.callHandler('requestJoinGroup', {'groupID': v.groupID, 'groupType': v.groupType},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.showAllGroup = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showAllGroup', {'type': v.type},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.showGroupList = function () {
    if (this.canTrans())
        djInternal.callHandler('showGroupList');
};

da.showGroupSearch = function () {
    if (this.canTrans())
        djInternal.callHandler('showGroupSearch');
};

da.requestPortalFeed = function (v) {
    if (this.canTrans())
        djInternal.callHandler('requestPortalFeed', {
                'tagID': v.tagID,
                'tagName': v.tagName,
                'count': v.count,
                'style': v.style,
                'isCache': v.isCache
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.requestPortalShop = function (v) {
    if (this.canTrans())
        djInternal.callHandler('requestPortalShop', {
                'tagID': v.tagID,
                'page': v.page,
                'count': v.count,
                'isCache': v.isCache,
                'rowType': v.rowType
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.showProduct = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showProduct', {'productID': v.productID});
};
da.showFeedDetail = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showFeedDetail', {'feedID': v.feedID});
};

da.createFeed = function (v) {
    if (this.canTrans())
        djInternal.callHandler('createFeed', {'topicID': v.topicID, 'tagID': v.tagID});
};

da.getPic = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getPic', {'picID': v.picID, 'size': v.size, 'type': v.type, 'cdnAddr': v.cdnAddr},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.thirdPartyOrderAppPay = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler('payCheck', {
                'orderID': v.orderID,
                'merchantId': v.merchantId,
                'companyID': v.companyID,
                'orderAmount': v.orderAmount,
                'paymentType': v.paymentType,
                "subject": v.subject,
                "desc": v.desc,
                "checkOrder" : "0"
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};
da.payCheck = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler('payCheck', {
                'orderID': v.orderID,
                'merchantId': v.merchantId,
                'companyID': v.companyID,
                'orderAmount': v.orderAmount,
                'paymentType': v.paymentType,
                "subject": v.subject,
                "desc": v.desc,
                "checkOrder" : "1"
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};
da.pingpay = function (v) {
    if (this.canTrans())
        djInternal.callHandler('pingpay', {'content': v.content},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });

};
da.needLogin = function (v) {
    if (this.canTrans())
        djInternal.callHandler('needLogin', {'currentUrl': v.currentUrl},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 * 调用App的显示分先菜单的操作
 * @param v
 *  v.optList ['menuItem:share:appMessage'     分享到微信好友
 *            |'menuItem:share:timeline'     分享到微信朋友圈
 *            |'menuItem:share:weiboApp'     分享到新浪微博
 *            |'menuItem:share:QZone'        分享到QQ空间
 *            |'menuItem:share:qq'           分享到QQ
 *            |'menuItem:share:message'      分享到短信
 *            |'menuItem:share:email'        分享到Email
 *            |'menuItem:openWithBrowser'    用浏览器打开操作
 *            |'menuItem:forward'               转发
 *            |'menuItem:refresh'               刷新操作
 *            |'menuItem:tipoff'    ]          举报
 *  v.shareInfo.url
 *  v.shareInfo.imageThumbUrl
 *  v.shareInfo.shareDescription
 *  v.shareInfo.shareTitle
 */
da.showOptMenu = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showOptMenu', {'optList': v.optList, 'shareInfo': v.shareInfo},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 调用App的显示分先菜单的操作
 * @param v
 *  v.optList ['menuItem:share:appMessage'     分享到微信好友
 *            |'menuItem:share:timeline'     分享到微信朋友圈
 *            |'menuItem:share:weiboApp'     分享到新浪微博
 *            |'menuItem:share:QZone'        分享到QQ空间
 *            |'menuItem:share:qq'           分享到QQ
 *            |'menuItem:share:message'      分享到短信
 *            |'menuItem:share:email'        分享到Email
 *            |'menuItem:openWithBrowser'    用浏览器打开操作
 *            |'menuItem:forward'               转发
 *            |'menuItem:refresh'            刷新操作
 *            |'menuItem:tipoff']               举报
 *  v.shareInfo.url
 *  v.shareInfo.imageThumbUrl
 *  v.shareInfo.shareDescription
 *  v.shareInfo.touchShow                      是否手动出发
 *  v.shareInfo.shareTitle
 */
da.initShareOptMenu = function (v) {
    if (this.canTrans())
        djInternal.callHandler('initShareOptMenu', {'optList': v.optList, 'shareInfo': v.shareInfo},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 * type 1 赞  2 收藏
 * action 1 添加操作 2 取消操作
 * @param v
 */
da.feedAction = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler('feedAction', {
            'type': v.type,
            'action': v.action,
            'objID': v.objID
        }, function (callback) {
            switch (callback.code) {
                case 'success':
                    v.success(callback.res);
                    break;
                case 'fail':
                    v.fail && v.fail(callback.res);
                    break;
                default:
                    v.fail && v.fail(callback.res);
                    break;
            }
        });
    }
};
/**
 * 添加评论
 * feedID feed的ID
 * commentID
 * @param v
 */
da.addComment = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("addComment", {'feedID': v.feedID, 'commentID': v.commentID}, function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};
/**
 * fileID 文件ID
 * @param v
 * @param type 2 声音
 * return filePath
 */
da.getFile = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("getFile", {'fileID': v.fileID, 'type': v.type}, function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};
da.requestFeed = function (v) {
    if (this.canTrans())
        djInternal.callHandler('requestFeed', {
                'tagID': v.tagID,
                'page': v.page,
                'count': v.count,
                'maxTime': v.maxTime,
                'style': v.style,
                'isCache': v.isCache
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.showBlog = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showBlog', {'feedID': v.feedID, 'blogID': v.blogID});
};
da.getThemeColor = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getThemeColor', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 发起IM聊天
 * @param v
 * v.conversationType  回话类型 目前只支持"PRIVATE" 私聊 "CUSTOM"发起客服聊天
 * v.targetID 回话的目标ID,目前只支持personID
 * v.targetName 回话的名字,目前只支持personName
 * v.companyID 当前社区ID
 * 需要在发起聊天同时自动发一条消息,请完善下述参数
 * v.messageTitle
 * v.messageDigest
 * v.messageImageURL
 * v.messageUrl
 * v.messageExtra
 * v.textMessageContent
 * 规则1:messageTitle messageUrl 填写的话,会发送一条富文本消息
 *      并且可以填写messageDigest messageImageURL messageExtra
 *      messageExtra参数暂时没有使用,将来可能用于扩展
 * 规则2:textMessageContent 填写的话 会发送一条纯文本消息
 * 规则3:messageTitle messageUrl textMessageContent都不填写时将不会发送任何消息
 * 规则4:调用客服时暂时不要使用messageTitle messageUrl 客服现在不支持;
 */
da.startIMConversation = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("startIMConversation", {
                'conversationType': v.conversationType,
                'targetID': v.targetID,
                'targetName': v.targetName,
                'companyID': v.companyID,
                'messageTitle': v.messageTitle,
                'messageDigest': v.messageDigest,
                'messageImageURL': v.messageImageURL,
                'messageUrl': v.messageUrl,
                'messageExtra': v.messageExtra,
                'textMessageContent': v.textMessageContent
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};


/**
 * 主题是否支持发送
 * @param v
 * {
	 * 	tagID : '',
	 * 	isSupport : '' 是否支持发送
	 * }
 */
da.getTopic = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("getTopic", {'tagID': v.tagID},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};

da.getValueByThird = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("getValueByThird", {'key': v.key},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};

da.showPortalError = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("showPortalError", {'file': v.file, 'code': v.code, 'error': v.error},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};

/**
 * 通用portal页主题列表通用接口
 * @param v
 */
da.requestPortalList = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("requestPortalList", {
                'tagID': v.tagID,
                'page': v.page,
                'count': v.count,
                'isCache': v.isCache,
                'object': v.object
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail(callback.res);
                        break;
                    default:
                        v.fail(callback.res);
                        break;
                }
            }
        );
    }
};

/**
 * 打开portal单个详情页面通用接口
 * @param v
 */
da.showPortalDetail = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("showPortalDetail", {'tagID': v.tagID, 'object': v.object},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail(callback.res);
                        break;
                    default:
                        v.fail(callback.res);
                        break;
                }
            }
        );
    }
};

/**
 *
 * @param v.files 图片路径
 */
da.uploadFileByApp = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler('uploadFileByApp', {'files': v.files, 'isShowProgress': v.isShowProgress},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
    }
};
// ----------------鼎杰项目新增js方法-----------------//
/**
 * 我发的消息
 */
da.getMySelfSendFeed = function () {
    if (this.canTrans())
        djInternal.callHandler('getMySelfSendFeed');
};

/**
 * 我的收藏
 */
da.getMySelfCollections = function () {
    if (this.canTrans())
        djInternal.callHandler('getMySelfCollections');
};
/**
 * 发送队列
 */
da.findSendFeedQuque = function () {
    if (this.canTrans())
        djInternal.callHandler('findSendFeedQuque');
};
/**
 * 邀请
 */
da.sendInvitation = function () {
    if (this.canTrans())
        djInternal.callHandler('sendInvitation');
};
/**
 * 系统设置
 */
da.systemSetting = function () {
    if (this.canTrans())
        djInternal.callHandler('systemSetting');
};
/**
 * 通知
 */
da.systemNtive = function () {
    if (this.canTrans())
        djInternal.callHandler('systemNtive');
};
/**
 * 是否在大陆
 * @param v
 */
da.inChina = function (v) {
    if (this.canTrans())
        djInternal.callHandler('inChina', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 * 当前语言
 * @param v
 */
da.currentLanguage = function (v) {
    if (this.canTrans())
        djInternal.callHandler('currentLanguage', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 * 录音接口
 * @param v
 */
da.record = function (v) {
    if (this.canTrans())
        djInternal.callHandler('record', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 获取预置内容接口中数据
 * @param v
 */
da.getTopicPresetInfo = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getTopicPresetInfo', {
                'url': v.url,
                'topicPresetID': v.topicPresetID,
                'portalRowID': v.portalRowID
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 上传名片图片到名片王服务器，获取名片的json数据
 * @param v
 */
da.getCardInfo = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getCardInfo', {'type': v.type},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};


/**
 * 跳转集成列表详情页
 * @param v
 */
da.showListMessageDetail = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showListMessageDetail', {'url': v.url},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 获取系统最新一条消息
 * @param v
 */
da.getLatestCommunityNotification = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getLatestCommunityNotification', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/***   下面所有未读消息都取自手机端的SQLITE数据库，这个消息是定时从手机端取自服务端取后就会把服务端库的置为已读，但是手机数据库仍是未读                            *****/
/**
 * 获取未读消息数
 * 注意：subSourceType为""的时候，查询的条件是sourceType和subSourceType,如果调用接口不传递subSourceType，查询的条件只有sourceType
 * @param v
 */
da.getNotificationCountBySourceType = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getNotificationCountBySourceType', {'sourceType': v.sourceType,
                'subSourceType':v.subSourceType},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 * 取最新消息
 * 注意：subSourceType为""的时候，查询的条件是sourceType和subSourceType,如果调用接口不传递subSourceType，查询的条件只有sourceType
 * @param v
 */
da.getLatestNotificationBySourceType = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getLatestNotificationBySourceType', {'sourceType': v.sourceType,
                'subSourceType':v.subSourceType},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 * 获取所有消息
 * 注意：subSourceType为""的时候，查询的条件是sourceType和subSourceType,如果调用接口不传递subSourceType，查询的条件只有sourceType
 * @param v
 */
da.getAllNotificationBySourceType = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getAllNotificationBySourceType', {'sourceType': v.sourceType,
                'subSourceType':v.subSourceType},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 * 所有分类消息设置成已读
 * @param v
 */
da.setNotificationReadBySourceType = function (v) {
    if (this.canTrans())
        djInternal.callHandler('setNotificationReadBySourceType', {'sourceType': v.sourceType,
                'subSourceType':v.subSourceType, 'notificationID':v.notificationID},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 * 删除某一条已查看的消息
 * @param v
 */
da.deleteNotification = function (v) {
    if (this.canTrans())
        djInternal.callHandler('deleteNotification', {'sourceType': v.sourceType, 'notificationID': v.notificationID},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
da.getDeviceUniqueID = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getDeviceUniqueID', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 选择人员
 * @param v
 */
da.choosePersons = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("choosePersons", {
            'person_ids': v.person_ids,
            'isMultiple': v.isMultiple,
            'includeSelf': v.includeSelf
        }, function (callback) {
            switch (callback.code) {
                case 'success':
                    v.success(callback.res);
                    break;
                case 'fail':
                    v.fail && v.fail(callback.res);
                    break;
                default:
                    v.fail && v.fail(callback.res);
                    break;
            }
        });
    }
};

/**
 * 回首页
 * @param v
 */
da.goBackToMain = function (v) {
    if (this.canTrans())
        djInternal.callHandler('goBackToMain');
};
/**
 * 分享文档
 * @param v
 */
da.shareDocument = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("shareDocument", {
            'fileID': v.fileID,
            'sendNotice': v.sendNotice,
            'includeSelf': v.includeSelf //true指包含自己（可选择分享给自己）,false不包含自己，默认为false
        }, function (callback) {
            switch (callback.code) {
                case 'success':
                    v.success(callback.res);
                    break;
                case 'fail':
                    v.fail && v.fail(callback.res);
                    break;
                default:
                    v.fail && v.fail(callback.res);
                    break;
            }
        });
    }
};
/**
 * 隐藏或显示左上角回退按钮
 * @param v
 */
da.hideOrShowBackButton = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler("hideOrShowBackButton", {
            'show': v.show  //true or false
        }, function (callback) {
            switch (callback.code) {
                case 'success':
                    v.success(callback.res);
                    break;
                case 'fail':
                    v.fail && v.fail(callback.res);
                    break;
                default:
                    v.fail && v.fail(callback.res);
                    break;
            }
        });
    }
};


/**
 * 保存状态变量
 * @param v
 *  pageIndex为在第几个页面可以取值(字符类型)
 */
da.saveCustomizedData = function (v) {
    if (this.canTrans())
        djInternal.callHandler('saveCustomizedData', {
                'customizedKey': v.customizedKey,
                'customizedValue': v.customizedValue,
                'saveToPage':v.saveToPage
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 获取保存的状态变量
 * @param v
 */
da.getCustomizedData = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getCustomizedData', {
                'customizedKey': v.customizedKey,
                'getDataFromPage': v.getDataFromPage
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 * 跳转到特定页面(da.createwindow打开方式）
 * @param v pageIndex:为0到count-1的数字，超过或者其他将返回错误，成功就会跳转
 *          refreshPage:这个参数代表是否刷新，默认不刷新，设置为true时则进入界面时会刷新
 *          singleRefresh:表示刷新的时候是否返回，true不返回，false返回，默认false
 *          replaceParameter:是否替换url后的参数值,true替换，false不替换
 *          parameter:要替换的值,例：parameter:[
 {
     key:"related_id",
     value:"123456"
 }
 ]
 */
da.goBackToSpecifiedPage = function (v) {
    if (this.canTrans())
        djInternal.callHandler('goBackToSpecifiedPage', {
                'pageIndex': v.pageIndex,
                'refreshPage': v.refreshPage,
                'singleRefresh':v.singleRefresh,
                'replaceParameter': v.replaceParameter,
                'parameter': v.parameter
            });
};
/**
 * 获取当前控制器的栈的数量，默认为0，代表当前为根控制器(da.createwindow打开方式）
 */
da.getSpecifiedPageCount = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getSpecifiedPageCount', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 *
 *打开全部消息接口//无参数
 *无返回
 */
da.openAllFeedPage = function(v) {
    if (this.canTrans())
        djInternal.callHandler('openAllFeedPage');
};

/**
 *
 *切换社区接口//无参数
 *无返回
 */
da.switchCommunity = function(v) {
    if (this.canTrans())
        djInternal.callHandler('switchCommunity');
};


/**
 *切换横竖屏接口// 有参数
 *参数说明: 传入switchScreen为key的 value是 0或者1 (数字必须是字符串形式)字段 1代表竖屏 0 代表横屏
 * 无返回
 */
da.switchScreen =  function(v){
    if (this.canTrans()){
        djInternal.callHandler('switchScreen' , {
                'switchScreen': v.switchScreen
            } ,
            function(callback){
                switch (callback.code){
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            })
    }
};


/**
 *跳转搜索页面// 有参数
 *参数说明: isInput为跳转时是否弹出键盘的参数，为布尔类型的true或false
 * 无返回
 */
da.goToGlobalSearch =  function(v){
    if (this.canTrans()){
        djInternal.callHandler('goToGlobalSearch' , {
                'isInput': v.isInput
            } ,
            function(callback){
                switch (callback.code){
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            })
    }
};

/**
 * ios 获取手机本地日历信息
 */
da.getCalendarList = function(v){
    if (this.canTrans()){
        djInternal.callHandler('getCalendarList', {
                'startDate':v.startDate,
                'endDate':v.endDate
            },
            function(callback){
                switch (callback.code){
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            })
    }
}

/**
 * 参数type（必须，目前支持type=1时，为日历,type=2定位弹框，type=3位提醒事项弹框（暂时未使用，预留））
 正确提示：code：success

 错误提示：code：fail  res：包括domain和code
 code=1000。type未传或者传的值不包括上面的类型
 Code 1001 已开启，不需要弹框
 Code 1002 用户选择了取消按钮
 * @param v
 */
da.systemPermissionsAlert = function (v) {
    if (this.canTrans()){
        djInternal.callHandler('systemPermissionsAlert',{
                'type':v.type
            },
            function (callback) {
                switch (callback.code){
                    case  'success':
                        v.success(callback.res);
                        break;
                    case  'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            })
    }
}

/**
 * 调到手机高德/谷歌/苹果地图导航
 * targetName：目的地名称
 * targetLatitude：目的地纬度
 * targetLongitute：目的地经度
 * directionsmode：导航方式； 目前支持driving：驾车；walking，步行。  默认是驾车。
 */
da.openThreeMapNav = function(v){
    if (this.canTrans()){
        djInternal.callHandler('openThreeMapNav',{
                'targetName':v.targetName,
                'targetLatitude':v.targetLatitude,
                'targetLongitute':v.targetLongitute,
                'directionsmode':v.directionsmode,
            },
            function(callback){
                switch (callback.code){
                    case 'success':
                        v.success(callback.res);
                        break;

                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            })
    }
}

/**
 * 微信發票調用端上的接口
 */
da.wxInvoice = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler('wxInvoice', {
                'card_sign' : '6947469af5002a59d28c38a384803b354159bc82',
                'nonce_str' : 'IRdLP5JB6K1C6QRS',
                'sign_type' : 'SHA1',
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            })
    }
}

da.downloadFile = function (v) {
    if (this.canTrans())
        djInternal.callHandler('downloadFile', {
				type:v.type,
				headers: v.headers,
			    fileUrl: v.fileUrl,
                fileId: v.fileId,
				filePath: v.filePath,
                fileName: v.fileName,
				fileSize: v.fileSize,
				isShowView: v.isShowView,
                isEOF: v.isEOF
			},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.openFile = function (v) {
    if (this.canTrans())
        djInternal.callHandler('openFile', {
			    fileUrl: v.fileUrl,
                fileId: v.fileId,
				filePath: v.filePath,
                fileName: v.fileName,
				fileSize: v.fileSize,
			},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.deleteDownloadFile = function (v) {
    if (this.canTrans())
        djInternal.callHandler('deleteDownloadFile', {
			    type: v.type,
				fileId: v.fileId,
                filePath: v.filePath,
                fileName: v.fileName,
			},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 離線DB調用端上的接口
 * DBName：資料庫的名稱
 * 注意：此JSSDK僅執行在手機上創建資料庫的接口，並未執行SQL。
 * 如有創建成功，則回success。
 * 創建失敗或以創建過，回fail。
 */
da.createDB = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler('createDB', {
                'DBName':v.DBName,
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};


/**
 * 離線DB調用端上的接口
 * DBName：要執行的哪個庫
 * sql：執行下達的SQL
 * 注意：此JSSDK僅回傳Success跟Fail的SQL(EX:CREATE、UPDATE、DELETE)
 */
da.sqlExcute = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler('sqlExcute', {
                'DBName':v.DBName,
                'sql':v.sql,
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};

/**
 * 離線DB調用端上的接口
 * DBName：要開啟連線的資料庫名稱
 * sql：執行下達的SQL指令
 * 注意：此JSSDK僅使用SELECT語法的SQL
 */
da.selectSqlExcute = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler('selectSqlExcute', {
                'DBName':v.DBName,
                'sql':v.sql,
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }
};




da.showGoogleMapView = function (v) {
    if (this.canTrans())
        djInternal.callHandler('showGoogleMapView', {
			    'viewHeight': v.viewHeight,
				'centerLat':v.centerLat,
				'centerLong':v.centerLong,
				'zoom':v.zoom,
				'marks':v.marks,
			},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.removeGoogleMapView = function (v) {
    if (this.canTrans())
        djInternal.callHandler('removeGoogleMapView', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};


/**
 * 开车啦 开始行程接口(iOS经纬度的精度是8位)
 * @param isStart:为字符类型的"0"或"1",0代表开始行程，1代表恢复行程
 * @param distinceInterval:每隔多长距离去保存一次数据，单位是米。字符类型。
 * @param isAddress: isAddress来控制是否记录地址，默认不记录。布尔类型：true/false
 */
da.startDrive = function (v) {
    if (this.canTrans())
        djInternal.callHandler('startDrive', {
                'distanceInterval': v.distanceInterval,
                'isAddress': v.isAddress,
				'driveID':v.driveID,
				'timeInterval':v.timeInterval,
				'isStart':v.isStart,
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 开车啦  结束行程
 *
 */
da.endDrive = function (v) {
    if (this.canTrans())
        djInternal.callHandler('endDrive', {
				'driveID':v.driveID,
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};


/**
 * 开车啦  获取行程信息
 *
 */
da.getRouteData = function (v) {
    if (this.canTrans())
        djInternal.callHandler('getRouteData', {
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 开车啦  清除行程信息
 *
 */
da.cleanDriveData = function (v) {
    if (this.canTrans()) {
        djInternal.callHandler('cleanDriveData', {
				'driveID':v.driveID,
            },
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;

                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            }
        );
    }

};

/**
 * 應用Ｕ數卡控功能
 *
 */
da.getPersonInIAM = function (v) {
    //if (this.canTrans())
        djInternal.callHandler('getPersonInIAM', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};


/**
 * 新增 Zebra 藍芽列印 
 *
 */
da.addZebraPrinter = function (v) {
    if (this.canTrans())
        djInternal.callHandler('addZebraPrinter', {
			'printMac': v.printMac,			
		},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

/**
 * 刪除 Zebra 藍芽列印 
 *
 */
da.removeZebraPrinter = function (v) {
    if (this.canTrans())
        djInternal.callHandler('removeZebraPrinter', {
			'printId': v.printId,			
		},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};
/**
 *  Zebra 藍芽列印 
 *
 */
da.printingZebraPrinter = function (v) {
    if (this.canTrans())
        djInternal.callHandler('printingZebraPrinter', {
			'printId': v.printId,
			'printContent': v.printContent,			
		},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.finishJdajia = function (v) {
		djInternal.callHandler('finishJdajia', {},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
};

da.updateTabbarBadge = function (v) {
		djInternal.callHandler('updateTabbarBadge', {
			'htmlID': v.htmlID,
			'status': v.status,	
		},
            function (callback) {
                switch (callback.code) {
                    case 'success':
                        v.success(callback.res);
                        break;
                    case 'fail':
                        v.fail && v.fail(callback.res);
                        break;
                    default:
                        v.fail && v.fail(callback.res);
                        break;
                }
            });
}

/**
 *  取得螢幕截圖，回傳base64
 *
 */
da.getScreenShot = function (v) {

    djInternal.callHandler('getScreenShot', {},
    function (callback) {
        switch (callback.code) {
            case 'success':
                v.success(callback.res);
                break;
            case 'fail':
                v.fail && v.fail(callback.res);
                break;
            default:
                v.fail && v.fail(callback.res);
                break;
        }
    });
};

/**
 *  取得App相關資訊。
 *
 */
da.getAppInfo = function (v) {

    djInternal.callHandler('getAppInfo', {},
    function (callback) {
        switch (callback.code) {
            case 'success':
                v.success(callback.res);
                break;
            case 'fail':
                v.fail && v.fail(callback.res);
                break;
            default:
                v.fail && v.fail(callback.res);
                break;
        }
    });
};

/**
 *  意見反饋提交接口
 *
 */
da.submitFeedBack = function (v) {

    djInternal.callHandler('submitFeedBack', {
    	'submitPerson': v.submitPerson,
		'submitFeedbackType': v.submitFeedbackType,
		'submitFeedbackContent': v.submitFeedbackContent,
		'submitPictures': v.submitPictures,	
    },
    function (callback) {
        switch (callback.code) {
            case 'success':
                v.success(callback.res);
                break;
            case 'fail':
                v.fail && v.fail(callback.res);
                break;
            default:
                v.fail && v.fail(callback.res);
                break;
        }
    });
};
