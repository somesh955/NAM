(function(){
	
	angular.module('myApp.utilService',[])
	.factory('UtilsServ',['$filter','AppConstant',function($filter, AppConstant){

		var responseType = {
				"EXECUTED" : 'S',
				"FAILED" : 'F',
				"NOTFOUND" : 404,
				"WARNING" : 302};
		var getDateFormat = function(date){
			if(date !== null && date !== undefined){
				return date.replace("Z",'');
			}else{
				return true;
			}};
		var setDateFormat = function(date){
				if(null !== date && undefined !== date){
					var newDate = dateFormat(new Date(date), AppConstant.SERVER_DATEFORMAT);
					return (newDate.substring(0,newDate.length-2) +":"+ newDate.substring(newDate.length-2,newDate.length));
				}else{
					var newDate = dateFormat(new Date(), AppConstant.SERVER_DATEFORMAT);
					return (newDate.substring(0,newDate.length-2) +":"+ newDate.substring(newDate.length-2,newDate.length));
				}				};
		var isSessionExpire = function(expireTime){
				var result = false;
				if(expireTime !== null && expireTime !== undefined){
					result = (new Date(getDateFormat(expireTime)) > new Date())	
				}				
				return result;};
		var dateFormat = function(date, format){
			return (date !== undefined && date !== null && date !== "") ? $filter('date')(new Date(date), format) : null;
		};
		var isUndefinedOrNull = function(value){
			return (value === undefined || value === null || value === "");
		};
		var getKeySign = function(userId,deviceType,timestamp){
		    var mandatoryStrLen = 20;
			var result = "";
		    var zerosNeeded = mandatoryStrLen - userId.length;
		    if(zerosNeeded > 0){
		       result = getZeroes(zerosNeeded) + userId;
		    }else if(zerosNeeded < 0){
		    	result = userId.substr(0,20);
		    }else{
		    	result = userId;
		    }
		    return result+deviceType+timestamp;
		};
		var getZeroes = function(length){
			   var result = "";
			   for(i=0;i<length;i++){
			   		result = result + '0';
			   }
			   return result;
		};

   		var encrypt = function (text, masterkey){
		    var hash = CryptoJS.AES.encrypt(text, masterkey);
		    var u8 = new Uint8Array(hash);
		     return btoa(String.fromCharCode.apply(null, u8));
		};
		var decrypt = function (text, masterkey){
		    var bytes = CryptoJS.AES.decrypt(text, masterkey);
		     return bytes.toString(CryptoJS.enc.Utf8);
		};


		return {
			"responseType": responseType,
			"isUndefinedOrNull" : isUndefinedOrNull,
			"dateFormat" : dateFormat,
			"getDateFormat" : getDateFormat,
			"setDateFormat" : setDateFormat,
			"isSessionExpire" : isSessionExpire,
			"getKeySign" : getKeySign,
			"getEncryptedKS" : encrypt,
			"getDecryptedKS" : decrypt
		};
	}]);
})();