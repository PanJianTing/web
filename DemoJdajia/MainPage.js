var filePath = "";
//alert("Java Script Alive");

$(document).ready(function() {

	//alert("JQuery Alive");
	
	// PrintingService
	$("#addPrinterButton").click(function() {
		// 新增藍芽列印機，參數:藍芽列印機mac
		digiwin.mobile.printingService.addPrinterAsync(document.getElementById("printerMac").value);
	});
	
	// 新增藍芽列印機成功後，可以取得printerId，需紀錄。
	// 作為以後操作該列印機須提供的參數
	digiwin.mobile.printingService.addPrinterSucceeded = function(result) {
		alert(result);
		
		document.getElementById("printerId").value= result;
	};
	
	// 新增藍芽列印機失敗，回傳錯誤訊息
	digiwin.mobile.printingService.addPrinterCancelled = function(exception) {
		alert("addPrinterCancelled:exception=" + exception);
	};
	
	// 移除藍芽列印機，參數:成功時取得的printerId
	$("#removePrinterButton").click(function() {
		digiwin.mobile.printingService.removePrinterAsync(document.getElementById("printerId").value);
		$('#printerId').val("");
	});
	
	// 移除藍芽列印機成功時，觸發的方法
	digiwin.mobile.printingService.removePrinterSucceeded = function(result) {
		alert(result);
	};
	
	// 移除藍芽列印機失敗時，觸發的方法
	digiwin.mobile.printingService.removePrinterCancelled = function(exception) {
		alert("removePrinterCancelled:exception=" + exception);
	};
	
	// 列印，參數:printerId、列印設定(參考DirectPrinter說明.xlsx文件)
	$("#printButton").click(function() {
		digiwin.mobile.printingService.printingAsync(document.getElementById("printerId").value, document.getElementById("printContent").value);
	});
	
	// 列印成功，觸發的方法
	digiwin.mobile.printingService.printingSucceeded = function(result) {
		displayMessage(result);
	};
	
	// 列印失敗，觸發的方法
	digiwin.mobile.printingService.printingCancelled = function(exception) {
		alert("printAsync:exception=" + exception);	
	};
	
	// 多台列印機同時列印時使用，參數:列印設定(參考DirectPrinter說明.xlsx文件)
	$("#printAllButton").click(
		function() {
			digiwin.mobile.printingService.printingAllAsync(document.getElementById("printContent").value);
		}
	);
	
	// 多台列印成功，觸發的方法
	digiwin.mobile.printingService.printingAllSucceeded = function(result) {
		displayMessage(result);
	};
	
	// 多台列印失敗，觸發的方法
	digiwin.mobile.printingService.printingAllCancelled = function(exception) {
		alert("printingAllAsync:exception=" + exception);
	};
	
	// 取得列印機列表
	$("#getPrintersButton").click(function() {
		var result = digiwin.mobile.printingService.getPrinters();
		var printerObj = JSON.parse(result);
		alert(printerObj.Printers.length);
	});
	
	// 監聽藍芽列印機執行步驟方法
	digiwin.mobile.printingService.printingStateChanged = function(state) {
		$('#message').html(state);
		/*document.getElementById("message").style.display = "block";
		document.getElementsByClassName("message-title")[0].innerHTML = state;*/
	}
	
	function displayMessage(message) 
	{
		//alert("type = "+ typeof(message));
		//alert(message);
		if(typeof(message)=="string"){ //ios type = string
			var messageObj = JSON.parse(message);
			alert(messageObj.status+'\n'+messageObj.message);		
		}else{ // android type = obj
			var msg = JSON.stringify(message);
			var msgObj = JSON.parse(msg);
			alert(msgObj.result.status+'\n'+msgObj.result.message);
		}
		
	}
	
});
