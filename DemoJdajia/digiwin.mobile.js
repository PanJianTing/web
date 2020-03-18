/*!
 * MCloud - v1.3 (2016-08-15T15:25:32+0800)
 * Copyright 2016 digiwin.biz
 */

// digiwin
 (function () {
    function execute(url)
    {//若url得到return為no則網頁會停止運行，故使用iframe來request
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("src", url);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }
    //判斷是否為iOS
    var str = navigator.platform;
    if(str.match(/iphone/i) || str.match(/ipad/i) || str.match(/ipod/i) ){
        execute('jscall://');
    }
 }());
 
var digiwin = digiwin || {};

digiwin.namespace = function (namespaceString) {
    
    // NamespaceArray
    var namespaceArray = namespaceString.split('.');
    if (namespaceArray[0] === "digiwin") {
        namespaceArray = namespaceArray.slice(1);
    }

    // Create
    var currentNode = digiwin;
    for (var i = 0; i < namespaceArray.length; i += 1) {
        if (typeof currentNode[namespaceArray[i]] === "undefined") {
            currentNode[namespaceArray[i]] = {};
        }
        currentNode = currentNode[namespaceArray[i]];
    }

    // Return
    return currentNode;
};

digiwin.unhandledException = function(message, url, line, col, exception) {

   // Notify
   alert("Message:" + message + "\n\n" + 
         "Url:" + url     + "\n\n" + 
         "Line:" + line    + "\n\n" +
         "Exception:" + exception);

   // Return
   return true;
};
if (typeof window.__digiwin_mobile !== "undefined") window.onerror = digiwin.unhandledException;

// digiwin.mobile: Android, iOS
(function()
{
    // Require
    if (typeof window.__digiwin_mobile === "undefined") return;
    if (typeof digiwin.mobile !== "undefined") return;

    // Namespace
    digiwin.namespace("digiwin.mobile");
    
    // Common
	digiwin.mobile.onMethodCalled = function(command) {
	
	    // Execute
	    var returnValue = command(); 
	    if(returnValue.search("RESULT:") == 0) {
	
	        // ResultString
	        var resultString = returnValue.substring(7, returnValue.length);
	
	        // Return
	        return resultString;
	    }
	
	    // Exception        
	    var exceptionString = returnValue;
	    if(exceptionString.search("EXCEPTION:") == 0) {
	        exceptionString = exceptionString.substring(10, exceptionString.length);
	        
	        throw new Error(exceptionString);
	    }
	    return returnValue;
	};
	
	digiwin.mobile.methodSucceeded = function(command) {
	
	    // Execute
	    try {
	        command();
	    }
	    catch (ex) {
	        alert(ex.message); 
	    }     
	};
	
	digiwin.mobile.methodCancelled = function(command) {
	
	    // Execute
	    try {
	        command();
	    }
	    catch (ex) {
	        alert(ex.message); 
	    }        
	};

    // SQLiteService
    digiwin.mobile.sqliteService = {};
    digiwin.mobile.sqliteService.ExecuteSql = function (commandText) { 
    	
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_sqliteScriptService.onExecuteSqlCalled(commandText);
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    
    digiwin.mobile.sqliteService.SelectSql = function (commandText) { 
    	
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_sqliteScriptService.onSelectSqlCalled(commandText);
    	});
    	
    	// Convert
        var result = JSON.parse(resultString);
        
        // Return
        return result;
    };

    // TransactService
    digiwin.mobile.transactService = {};
    digiwin.mobile.transactService.getControlSetting = undefined;
    
    window.__digiwin_mobile_transactService_getControlSettingAsync = function () {
        try {
            if (typeof digiwin.mobile.transactService.getControlSetting !== "undefined") {
                var result = JSON.stringify(digiwin.mobile.transactService.getControlSetting());
                console.log("JS_getControlSetting:"+result);
                window.__digiwin_mobile_transactScriptService.getControlSettingSucceeded(result); 
                return;
            }
            console.log("JS_getControlSetting undefined");
            window.__digiwin_mobile_transactScriptService.getControlSettingSucceeded(null); 
            return;
        }
        catch (ex) {
            window.__digiwin_mobile_transactScriptService.getControlSettingCancelled(ex.message); 
            return;
        }        
    };

    digiwin.mobile.transactService.setControlSetting = undefined;
    window.__digiwin_mobile_transactService_setControlSettingAsync = function (controlSetting) {
        try {
            if (typeof digiwin.mobile.transactService.setControlSetting !== "undefined") {
                digiwin.mobile.transactService.setControlSetting(JSON.parse(controlSetting));
                window.__digiwin_mobile_transactScriptService.setControlSettingSucceeded(); 
                return;
            }
            window.__digiwin_mobile_transactScriptService.setControlSettingSucceeded(); 
            return;
        }
        catch (ex) {
        	console.log('setControlSettingCancelled:'+ex.message);
            window.__digiwin_mobile_transactScriptService.setControlSettingCancelled(ex.message); 
            return;
        }  
    };
    
    digiwin.mobile.transactService.transact = function (serviceName) {
    	
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_transactScriptService.onTransactCalled(serviceName);
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    
    // PhoneService
    digiwin.mobile.phoneService = {};
    digiwin.mobile.phoneService.call = function (number) { 
    
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_phoneScriptService.onCallCalled(number);
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    digiwin.mobile.phoneService.dial = function (number) { 
    	
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_phoneScriptService.onDialCalled(number);
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    
    // FileService
    digiwin.mobile.fileService = {};
    digiwin.mobile.fileService.getImgFileBase64String = function (path) {
    
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_fileScriptService.onGetImgFileBase64StringCalled(path);
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    
    //UserService
    digiwin.mobile.userService = {};
    digiwin.mobile.userService.getAppType = function () {
        
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_userScriptService.onGetAppTypeCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result; 
    };
    
    digiwin.mobile.userService.getAppVersion = function () { 
    
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_userScriptService.onGetAppVersionCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result; 
    };
    
    digiwin.mobile.userService.getAppPushToken = function () { 
        
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_userScriptService.onGetAppPushTokenCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result; 
    };
    
    digiwin.mobile.userService.getLanguageType = function () { 
    
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_userScriptService.onGetLanguageTypeCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result; 
    };
    
    digiwin.mobile.userService.getLoginId = function () { 

        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_userScriptService.onGetLoginIdCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;  
    };
    
    digiwin.mobile.userService.getCompany = function () { 
        
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_userScriptService.onGetCompanyCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;   
    };
    
    digiwin.mobile.userService.getProduct = function () { 
        
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_userScriptService.onGetProductCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;    
    };
    
    digiwin.mobile.userService.getProgramId = function () { 
     
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_userScriptService.onGetProgramIdCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;    
    };
    
    digiwin.mobile.userService.getUserMapping = function () {
    
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_userScriptService.onGetUserMappingCalled();
    	});
    	
    	// Convert
        var result = JSON.parse(resultString);
        
        // Return
        return result;
    };
    
    //DeviceService
    digiwin.mobile.deviceService = {};
    digiwin.mobile.deviceService.getDeviceID = function () { 
        
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_deviceScriptService.onGetDeviceIDCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    
    digiwin.mobile.deviceService.getDeviceOS = function () {  
        
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_deviceScriptService.onGetDeviceOSCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    
    digiwin.mobile.deviceService.getDeviceModel = function () { 
        
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_deviceScriptService.onGetDeviceModelCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    
    digiwin.mobile.deviceService.getDeviceGPS = function () {
    
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_deviceScriptService.onGetDeviceGPSCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result; 
    };
    
    digiwin.mobile.deviceService.getConnectStatus = function () { 
        
        // Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_deviceScriptService.onGetConnectStatusCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result; 
    };
    
 // CameraService
    digiwin.mobile.cameraService = {};
    
    digiwin.mobile.cameraService.takePictureAsync = function () {
        return window.__digiwin_mobile_cameraScriptService.onTakePictureAsyncCalled();
    };

    digiwin.mobile.cameraService.takePictureSucceeded = undefined;
    window.__digiwin_mobile_cameraService_takePictureSucceeded = function (picturePath) {
    	digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.cameraService.takePictureSucceeded !== "undefined") {
                digiwin.mobile.cameraService.takePictureSucceeded(picturePath);
            }
        });
    };

    digiwin.mobile.cameraService.takePictureCancelled = undefined;
    window.__digiwin_mobile_cameraService_takePictureCancelled = function (exception) {
    	digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.cameraService.takePictureCancelled !== "undefined") {
                digiwin.mobile.cameraService.takePictureCancelled(exception);
            }
        });
    };
    
    // ScanService
    digiwin.mobile.scanService = {};
    
    digiwin.mobile.scanService.scanCodeAsync = function () { 
        return window.__digiwin_mobile_scanScriptService.onScanCodeAsyncCalled(); 
    };

    digiwin.mobile.scanService.scanCodeSucceeded = undefined;
    window.__digiwin_mobile_scanService_scanCodeSucceeded = function (barcode) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.scanService.scanCodeSucceeded !== "undefined") {
                digiwin.mobile.scanService.scanCodeSucceeded(barcode);
            }
        });
    };

    digiwin.mobile.scanService.scanCodeCancelled = undefined;
    window.__digiwin_mobile_scanService_scanCodeCancelled = function (exception) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.scanService.scanCodeCancelled !== "undefined") {
                digiwin.mobile.scanService.scanCodeCancelled(exception);
            }
        });
    };
    
    //AppService
    digiwin.mobile.appService = {};
    digiwin.mobile.appService.appClosedAsync = undefined;
    window.__digiwin_mobile_appService_appClosedAsync = function () {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.appService.appClosedAsync !== "undefined") {
                digiwin.mobile.appService.appClosedAsync();
            }
        });
    };
    
    //NavigationService
    digiwin.mobile.navigationService = {};
    digiwin.mobile.navigationService.goMenu = function () {
    
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_navigationScriptService.onGoMenuCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result; 
    };
    
    digiwin.mobile.navigationService.goBack = function () {
    
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_navigationScriptService.onGoBackCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result; 
    };
    
    digiwin.mobile.navigationService.goSetting = function () {
    	
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_navigationScriptService.onGoSettingCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result; 
    };
    
    digiwin.mobile.navigationService.goProgram = function (programId) {
    	
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_navigationScriptService.onGoProgramCalled(programId);
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
	
	digiwin.mobile.navigationService.setKeepHybrid = function (isKeepHybrid) {
    	
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_navigationScriptService.onSetKeepHybridCalled(isKeepHybrid);
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    
    digiwin.mobile.navigationService.goExit = function () {
    	
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_navigationScriptService.onGoExitCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    
    digiwin.mobile.navigationService.goLogout = function () {
    	
    	// Execute
    	var resultString = digiwin.mobile.onMethodCalled(function(){
    		return window.__digiwin_mobile_navigationScriptService.onGoLogoutCalled();
    	});
    	
    	// Convert
        var result = resultString;
        
        // Return
        return result;
    };
    
    digiwin.mobile.navigationService.deviceBack = undefined;

    window.__digiwin_mobile_navigationService_deviceBackAsync = function () {	    
	    
	    try {
            if (typeof digiwin.mobile.navigationService.deviceBack !== "undefined") {
                var result = digiwin.mobile.navigationService.deviceBack();
                window.__digiwin_mobile_navigationScriptService.deviceBackSucceeded(result); 
                return;
            }
            window.__digiwin_mobile_navigationScriptService.deviceBackSucceeded(false); 
            return;
        }
        catch (ex) {
            window.__digiwin_mobile_navigationScriptService.deviceBackCancelled(ex.message); 
            return;
        }        
    };
    
    //MediaService
    digiwin.mobile.mediaService = {};
    digiwin.mobile.mediaService.recordVideoAsync = function () { 
        return window.__digiwin_mobile_mediaScriptService.onRecordVideoAsyncCalled(); 
    };

    digiwin.mobile.mediaService.recordVideoSucceeded = undefined;
    window.__digiwin_mobile_mediaService_recordVideoSucceeded = function (url) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.mediaService.recordVideoSucceeded !== "undefined") {
                digiwin.mobile.mediaService.recordVideoSucceeded(url);
                return;
            }
        });
    };

    digiwin.mobile.mediaService.recordVideoCancelled = undefined;
    window.__digiwin_mobile_mediaService_recordVideoCancelled = function (exception) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.mediaService.recordVideoCancelled !== "undefined") {
                digiwin.mobile.mediaService.recordVideoCancelled(exception);
            }
        });
    };
    
    digiwin.mobile.mediaService.recordAudioAsync = function () { 
        return window.__digiwin_mobile_mediaScriptService.onRecordAudioAsyncCalled(); 
    };

    digiwin.mobile.mediaService.recordAudioSucceeded = undefined;
    window.__digiwin_mobile_mediaService_recordAudioSucceeded = function (url) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.mediaService.recordAudioSucceeded !== "undefined") {
                digiwin.mobile.mediaService.recordAudioSucceeded(url);
                return;
            }
        });
    };

    digiwin.mobile.mediaService.recordAudioCancelled = undefined;
    window.__digiwin_mobile_mediaService_recordAudioCancelled = function (exception) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.mediaService.recordAudioCancelled !== "undefined") {
                digiwin.mobile.mediaService.recordAudioCancelled(exception);
                return;
            }
        });
    };
    
    //SignatureService
    digiwin.mobile.signatureService = {};
    digiwin.mobile.signatureService.takeSignatureAsync = function () { 
        return window.__digiwin_mobile_signatureScriptService.onTakeSignatureAsyncCalled(); 
    };

    digiwin.mobile.signatureService.takeSignatureSucceeded = undefined;
    window.__digiwin_mobile_signatureService_takeSignatureSucceeded = function (url) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.signatureService.takeSignatureSucceeded !== "undefined") {
                digiwin.mobile.signatureService.takeSignatureSucceeded(url);
                return;
            }
        }); 
    };
    
    digiwin.mobile.signatureService.takeSignatureCancelled = undefined;
    window.__digiwin_mobile_signatureService_takeSignatureCancelled = function (url) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.signatureService.takeSignatureCancelled !== "undefined") {
                digiwin.mobile.signatureService.takeSignatureCancelled(url);
                return;
            }
        }); 
    };
    
    //MenuService
    digiwin.mobile.menuService = {};
    
    digiwin.mobile.menuService.goProgram = function (product,programId) {
    	// Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_menuScriptService.onGoProgramCalled(product,programId);
        });

        // Convert
        var result = resultString;

        // Return
        return result;
    };
    
    digiwin.mobile.menuService.getAllProgram = function () { 
    	// Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_menuScriptService.onGetAllProgramCalled();
        });

        // Convert
        var result = JSON.parse(resultString);

        // Return
        return result;
    };
    
    digiwin.mobile.menuService.setBadge = undefined;
    window.__digiwin_mobile_menuService_setBadgeAsync = function (badges) {
        try {
            if (typeof digiwin.mobile.menuService.setBadge !== "undefined") {
                digiwin.mobile.menuService.setBadge(JSON.parse(badges));
                window.__digiwin_mobile_menuScriptService.setBadgeSucceeded(); 
                return;
            }
            window.__digiwin_mobile_menuScriptService.setBadgeSucceeded(); 
            return;
        }
        catch (ex) {
        	console.log('setAllBadgeCancelled:'+ex.message);
            window.__digiwin_mobile_menuScriptService.setBadgeCancelled(ex.message); 
            return;
        }  
    };
    
    digiwin.mobile.menuService.goSetting = function () { 
        return window.__digiwin_mobile_menuScriptService.onGoSettingCalled(); 
    };
    
    digiwin.mobile.menuService.logout = function () { 
        return window.__digiwin_mobile_menuScriptService.onLogoutCalled(); 
    };
    
    //LoginService
    digiwin.mobile.loginService = {};
    digiwin.mobile.loginService.loginAsync = function (userId,password,language,server) { 
    	//console.log('Login:'+userId+","+password+","+language+","+server);
        return window.__digiwin_mobile_loginScriptService.onLoginAsyncCalled(userId,password,language,server); 
    };
    
    digiwin.mobile.loginService.getLastAppServer = function () {
    	// Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_loginScriptService.onGetLastAppServerCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result;
    };
    
    digiwin.mobile.loginService.getLastLanguage = function () {
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_loginScriptService.onGetLastLanguageCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result;
    };
    
    digiwin.mobile.loginService.getLastUsername = function () {
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_loginScriptService.onGetLastUsernameCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result;
    };

    digiwin.mobile.loginService.loginSucceeded = undefined;
    window.__digiwin_mobile_loginScriptService_loginSucceeded = function () {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.loginService.loginSucceeded !== "undefined") {
                digiwin.mobile.loginService.loginSucceeded();
                return;
            }
        }); 
    };
    
    digiwin.mobile.loginService.loginCancelled = undefined;
    window.__digiwin_mobile_loginService_loginCancelled = function (message) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.loginService.loginCancelled !== "undefined") {
                digiwin.mobile.loginService.loginCancelled(message);
                return;
            }
        }); 
    };
    
    digiwin.mobile.loginService.getDeviceID = function () { 
    	// Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_loginScriptService.onGetDeviceIDCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result;
    };

	//SiteService
    digiwin.mobile.siteService = {};
    digiwin.mobile.siteService.getVersion = function () { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_siteScriptService.onGetVersionCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
	
	//PrintingService
    digiwin.mobile.printingService = {};
	digiwin.mobile.printingService.getPrinters = function () { 
    	// Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_printingScriptService.onGetPrintersCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result;
    };
	
	digiwin.mobile.printingService.addPrinterAsync = function (printMac) { 
		return window.__digiwin_mobile_printingScriptService.onAddPrinterAsyncCalled(printMac);
	};
	
	digiwin.mobile.printingService.addPrinterSucceeded = undefined;
    window.__digiwin_mobile_printingScriptService_addPrinterSucceeded = function (printerId) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.printingService.addPrinterSucceeded !== "undefined") {
                digiwin.mobile.printingService.addPrinterSucceeded(printerId);
                return;
            }
        }); 
    };
    digiwin.mobile.printingService.addPrinterCancelled = undefined;
    window.__digiwin_mobile_printingService_addPrinterCancelled = function (message) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.printingService.addPrinterCancelled !== "undefined") {
                digiwin.mobile.printingService.addPrinterCancelled(message);
                return;
            }
        }); 
    };
	
	digiwin.mobile.printingService.removePrinterAsync = function (printerId) { 
        return window.__digiwin_mobile_printingScriptService.onRemovePrinterAsyncCalled(printerId); 
    };
	digiwin.mobile.printingService.removePrinterSucceeded = undefined;
    window.__digiwin_mobile_printingScriptService_removePrinterSucceeded = function (result) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.printingService.removePrinterSucceeded !== "undefined") {
                digiwin.mobile.printingService.removePrinterSucceeded(result);
                return;
            }
        }); 
    };
    digiwin.mobile.printingService.removePrinterCancelled = undefined;
    window.__digiwin_mobile_printingService_removePrinterCancelled = function (message) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.printingService.removePrinterCancelled !== "undefined") {
                digiwin.mobile.printingService.removePrinterCancelled(message);
                return;
            }
        }); 
    };
	
	digiwin.mobile.printingService.printingAsync = function (printerId, printContent) { 
        return window.__digiwin_mobile_printingScriptService.onPrintingAsyncCalled(printerId, printContent); 
    };
	digiwin.mobile.printingService.printingSucceeded = undefined;
    window.__digiwin_mobile_printingScriptService_printingSucceeded = function (state) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.printingService.printingSucceeded !== "undefined") {
                digiwin.mobile.printingService.printingSucceeded(state);
                return;
            }
        }); 
    };
    digiwin.mobile.printingService.printingCancelled = undefined;
    window.__digiwin_mobile_printingService_printingCancelled = function (message) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.printingService.printingCancelled !== "undefined") {
                digiwin.mobile.printingService.printingCancelled(message);
                return;
            }
        }); 
    };
	
	digiwin.mobile.printingService.printingAllAsync = function (printContent) { 
        return window.__digiwin_mobile_printingScriptService.onPrintingAllAsyncCalled(printContent); 
    };
	digiwin.mobile.printingService.printingAllSucceeded = undefined;
    window.__digiwin_mobile_printingScriptService_printingAllSucceeded = function (state) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.printingService.printingAllSucceeded !== "undefined") {
                digiwin.mobile.printingService.printingAllSucceeded(state);
                return;
            }
        }); 
    };
    digiwin.mobile.printingService.printingAllCancelled = undefined;
    window.__digiwin_mobile_printingService_printingAllCancelled = function (message) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.printingService.printingAllCancelled !== "undefined") {
                digiwin.mobile.printingService.printingAllCancelled(message);
                return;
            }
        }); 
    };
	
	digiwin.mobile.printingService.printingStateChanged = undefined;
    window.__digiwin_mobile_printingScriptService_printingStateChanged = function (state) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.printingService.printingStateChanged !== "undefined") {
                digiwin.mobile.printingService.printingStateChanged(state);
                return;
            }
        }); 
    };
	
	
    //AppService
    /*
    digiwin.mobile.appService = {};
    digiwin.mobile.appService.appClosedAsync = function (userId,password,language,server) { 
        return window.__digiwin_mobile_appScriptService.onAppClosedAsyncCalled(); 
    };
    digiwin.mobile.appService.appClosedCompleted = undefined;
    window.__digiwin_mobile_appService_appClosedCompleted = function (message) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.appService.appClosedCompleted !== "undefined") {
                digiwin.mobile.appService.appClosedCompleted(message);
                return;
            }
        }); 
    };*/
   
    //ProductService
    digiwin.mobile.productService = {};
    digiwin.mobile.productService.getCompany = function () { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_productScriptService.onGetCompanyCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
    
    digiwin.mobile.productService.getProduct = function () { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_productScriptService.onGetProductCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
    
    digiwin.mobile.productService.getProductUserID = function () { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_productScriptService.onGetProductUserIDCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
    
    digiwin.mobile.productService.getProductVersion = function () { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_productScriptService.onGetProductVersionCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
    
    digiwin.mobile.productService.getQueryCount = function () { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_productScriptService.onGetQueryCountCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
    
    //ProgramService
    digiwin.mobile.programService = {};
    digiwin.mobile.programService.getProgramID = function () { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_programScriptService.onGetProgramIDCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
    
    digiwin.mobile.programService.getAllConfig = function () { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_programScriptService.onGetAllConfigCalled();
        });

        // Convert
        var result = JSON.parse(resultString);

        // Return
        return result; 
    };
    
    digiwin.mobile.programService.goProgram = function (product,programId) { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_programScriptService.onGoProgramCalled(product,programId);
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
    
    //PDFService
    digiwin.mobile.pdfService = {};
    digiwin.mobile.pdfService.open = function (fileName,filePath) { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_pdfScriptService.onOpenCalled(fileName,filePath);
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };

    //BrowserService
    digiwin.mobile.browserService = {};
    digiwin.mobile.browserService.load = function (url) { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_browserScriptService.onLoadCalled(url);
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
    
    //HttpService
    digiwin.mobile.httpService = {};
    digiwin.mobile.httpService.getAsync = function (url,params) { 
        return window.__digiwin_mobile_httpScriptService.onGetAsyncCalled(url,JSON.stringify(params)); 
    };

    digiwin.mobile.httpService.getSucceeded = undefined;
    window.__digiwin_mobile_httpService_getSucceeded = function (data) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.httpService.getSucceeded !== "undefined") {
                digiwin.mobile.httpService.getSucceeded(data);
                return;
            }
        }); 
    };
    
    digiwin.mobile.httpService.getCancelled = undefined;
    window.__digiwin_mobile_httpService_getCancelled = function (data) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.httpService.getCancelled !== "undefined") {
                digiwin.mobile.httpService.getCancelled(data);
                return;
            }
        }); 
    };
    
    digiwin.mobile.httpService.postAsync = function (url,params) { 
        return window.__digiwin_mobile_httpScriptService.onPostAsyncCalled(url,JSON.stringify(params)); 
    };

    digiwin.mobile.httpService.postSucceeded = undefined;
    window.__digiwin_mobile_httpService_postSucceeded = function (data) {
        digiwin.mobile.methodSucceeded(function() {
            if (typeof digiwin.mobile.httpService.postSucceeded !== "undefined") {
                digiwin.mobile.httpService.postSucceeded(data);
                return;
            }
        }); 
    };
    
    digiwin.mobile.httpService.postCancelled = undefined;
    window.__digiwin_mobile_httpService_postCancelled = function (data) {
        digiwin.mobile.methodCancelled(function() {
            if (typeof digiwin.mobile.httpService.postCancelled !== "undefined") {
                digiwin.mobile.httpService.postCancelled(data);
                return;
            }
        }); 
    };
    
    //LocalRepositoryService
    digiwin.mobile.localRepositoryService = {};
    digiwin.mobile.localRepositoryService.downloadByProduct =  function () { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_localRepositoryScriptService.onDownloadByProductCalled();
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
    
    digiwin.mobile.localRepositoryService.getAbsolutePathByProduct =  function (path) { 
        // Execute
        var resultString = digiwin.mobile.onMethodCalled(function() {
            return window.__digiwin_mobile_localRepositoryScriptService.onGetAbsolutePathByProductCalled(path);
        });

        // Convert
        var result = resultString;

        // Return
        return result; 
    };
    
}());




// digiwin.mobile:windows
(function()
{   
    // Require
    if (typeof window.__digiwin_mobile !== "undefined") return;
    if (typeof digiwin.mobile !== "undefined") return;

    // Namespace
    digiwin.namespace("digiwin.mobile");

    
    // MenuService
    digiwin.mobile.menuService = {};
    
    digiwin.mobile.menuService.goProgram = function (product, programId) {

        // Notify
        alert("Execute goProgram="             + "\n" +
                        "product:" + product   + "\n" +
                      "programId:" + programId + "\n" 
             );
    };
    
    digiwin.mobile.menuService.getAllProgram = function () { 
        
        // ProgramList
        var programList = [
                            {"product":"Hybrid","programId":"Test001","programName":"Test001","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test002","programName":"Test002","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test003","programName":"Test003","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test004","programName":"Test004","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test005","programName":"Test005","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test006","programName":"Test006","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test007","programName":"Test007","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test008","programName":"Test008","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test009","programName":"Test009","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test010","programName":"Test010","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test011","programName":"Test011","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test012","programName":"Test012","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test013","programName":"Test013","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test014","programName":"Test014","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test015","programName":"Test015","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test016","programName":"Test016","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test017","programName":"Test017","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test018","programName":"Test018","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test019","programName":"Test019","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test020","programName":"Test020","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test021","programName":"Test021","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test022","programName":"Test022","imagePath":"1.png"},
                            {"product":"Hybrid","programId":"Test023","programName":"Test023","imagePath":"1.png"}
                          ];

        // Return
        return programList;
    };
    
    digiwin.mobile.menuService.setBadge = undefined;
    digiwin.mobile.menuService.setBadgeCount = 0;
    digiwin.mobile.menuService.setBadgeTrigger = function() {

        // Require
        if (typeof digiwin.mobile.menuService.setBadge === "undefined") return;

        // Count
        digiwin.mobile.menuService.setBadgeCount++;
        if(digiwin.mobile.menuService.setBadgeCount>10) {
            digiwin.mobile.menuService.setBadgeCount = 0;
        }

        // BadgeList
        var badgeList = [                            
                            {"product":"Hybrid","programId":"Test001","badgeNumber":digiwin.mobile.menuService.setBadgeCount},    
                            {"product":"Hybrid","programId":"Test003","badgeNumber":digiwin.mobile.menuService.setBadgeCount},   
                            {"product":"Hybrid","programId":"Test005","badgeNumber":digiwin.mobile.menuService.setBadgeCount},
                            {"product":"Hybrid","programId":"Test007","badgeNumber":digiwin.mobile.menuService.setBadgeCount},
                            {"product":"Hybrid","programId":"Test009","badgeNumber":digiwin.mobile.menuService.setBadgeCount}
                        ];

        // Execute
        digiwin.mobile.menuService.setBadge(badgeList);
    };


    // IntervalService
    digiwin.mobile.intervalService = {};

    digiwin.mobile.intervalService.actionTrigger = function () { 

        // MenuService
        digiwin.mobile.menuService.setBadgeTrigger();

    };
    setInterval(digiwin.mobile.intervalService.actionTrigger, 1000);

}());