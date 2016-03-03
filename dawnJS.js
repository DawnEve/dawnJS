/*
* dawnJS v0.0.0.6
* 怎么自动化文档：注释转化为文档注释？
* 怎么自动化测试？
* 
*/


//立即执行函数
;(function(global){

	//========================================声明全局变量
	var _d={};//全局变量
	var fn={};//全局函数，管理内置函数，组后挂载到_d.fn上
	//var _fn={};//私有函数，内部使用的函数，最后不暴露除去。尽量不用
	

	
	//========================================短函数，内部测试使用
	function n(s){
		global.console.log(s);
	}
	
	
	
	
	
	
	
	
	
	
	//========================================基本功能
	//--------------------类型判别
	var objToString=Object.prototype.toString; //用作类别判断
	
	
	//判断一个变量的类型
	_d.type=function(obj){
		return objToString.call(obj).slice(8,-1);//
	}
	
	
	_d.is={ //常用数据类型判断
		//'':function(){},
		'string':function(obj){
				return _d.type(obj)=="String"; 
			},
		'bool':function(obj){
				return _d.type(obj)=="Boolean"; 
			},
		'number':function(obj){
				return _d.type(obj)=="Number"; 
			},
		'null':function(obj){
				return _d.type(obj)=="Null"; 
			},
		'undefined':function(obj){
				return _d.type(obj)=="Undefined"; 
			},
	
		'array':function(obj){
				//return _d.type(obj)=="Array"; 
				return obj instanceof Array; //原生对象更快
			},
		'object':function(obj){
				return _d.type(obj)=="Object"; 
				//return obj instanceof Object; //不能区别[]
			},
		'function':function(obj){
				//return _d.type(obj)=="Function"; 
				return obj instanceof Function;
			}
	};
	
	
	//--------------------调试方法：单元测试
	_d.debug=function(s){
		//本身是一个函数，其次还是一个对象
		if(global.console && global.console.log){
			global.console.log(s);
		}else{
			global.alert(s);
		}
	}
	
	//js断言函数
	_d.debug.assert=function(){
		//基础断言函数
		fn.assert=function(exp, errMsg){
			console.assert(exp, errMsg);
		}
		
		//对传入的参数进行判断
		
		/*
		1.可以传入2个参数 c.score.length==3, "Assertion of score length failed"
		2.也可以传入数组 
			var test=[
				[[].length==3, "Assertion of score length failed"],
				[typeof fn=='function', 'fn is not a function']
			]
		*/
		var args=arguments[0];
		if(_d.type(args[0])=='Array'){
			
			for(var i=0,l=args.length; i<l; i++){
					n(arg)
				var arg=args[i];
				fn.assert(arg[0],arg[1]);
			}
		}else{
			fn.assert(args[0],args[1]);
		}
		//输出运行环境	
		console.log('env: ' +global.navigator.userAgent);
	}
	
	
	
	
	
	//--------------------浏览器信息
	_d.browser=function(){
		var explorer =navigator.userAgent,browse;
		if (explorer.indexOf("MSIE") >= 0){
			//ie 
			browse = "ie";
		}else if (explorer.indexOf("Firefox") >= 0) {
			// firefox 火狐
			browse = "Firefox";
		}else if(explorer.indexOf("Chrome") >= 0){
			//Chrome 谷歌
			browse = "Chrome";
		}else if(explorer.indexOf("Opera") >= 0){
			//Opera 欧朋
			browse = "Opera";
		}else if(explorer.indexOf("Safari") >= 0){
			//Safari 苹果浏览器
			browse = "Safari";
		}else if(explorer.indexOf("Netscape")>= 0) { 
			//Netscape
			browse = "Netscape"; 
		}
		return browse;
	};
	
	//todo，浏览器对象很乱，没有理顺
	var _browser = {
		versions:function(){
				var u = navigator.userAgent, app = navigator.appVersion; 
				return app;
			}(),
		language:(navigator.browserLanguage || navigator.language).toLowerCase()
	}
	_d.browser.language=function(){
		return _browser.language;
	};
	
	//todo
	_d.browser.isMobile=function(){
		return _browser.versions.mobile; //??
	};


	
	//--------------------css
	var css={
		/**
		 * 判断是否具有每个class的方法
		 */
		hasClass :function(obj,className){
			var re = new RegExp("(^|\\s)"+className+"(\\s|$)");
			return re.test(obj.className);
		},
		
		/**
		 * 新增class方法
		 */
		addClass : function(obj,className){
			if(obj.classList){
				obj.classList.add(className)
			}else{
				if(this.hasClass(obj,className)){
					return;
				}else{
					element.className += ' '+className;
				}
			}
		},
		
		/**
		 * 移除class方法
		 */
		removeClass : function(obj,className){
			if(obj.classList){
				obj.classList.remove(className)
			}else{
				if(this.hasClass(obj,className)){
					var re = new RegExp("(^|\\s)"+className+"(\\s|$)");
					obj.className = obj.className.replace(re, '');
				}
			}
		},
		
		/**
		 * 切换class方法
		 */
		toggleClass :  function(obj,className){
			if(this.hasClass(obj,className)){
				removeClass(obj,className)
			}else{
				addClass(obj,className)
			}
		},
		
		/**
		 * 通过className获取元素的方法
		 */
		getElementsByClassName : function(obj,className){
			var allEle = obj.getElementsByTagName('*');
			var arr = [];
			for(var i = 0, len = allEle.length; i < len; i++){
				if(this.hasClass(allEle[i],className)){
					arr.push(allEle[i]);
				}
			}
			return arr;
		},
		
		/**
		 * 获取元素的样式方法
		 */
		getStyle : function(obj, attr) { 
		  return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle( obj )[attr]; 
		}
	}
	_d.css=css;

			






	//--------------------dom选择
	//id选择器
	function $(obj, scope){
		if(typeof obj=='object') return obj;
		var scope=scope || document;
		return scope.getElementById(obj);
	}
	
	_d.$=function(str,scope){
		//把jQ选择器搞过来？
		
		var scope=scope||document;//默认值
		
		//只能实现简单的选择
		var flag=str.substr(0,1);//第一个字符
		var keyword=str.substr(1);//其余字符
		if('#'==flag){
			return $(keyword, scope);//按id选择
		}else if('.'==flag){ 
			return css.getElementsByClassName(scope,keyword);//按class选择
		}else{
			return scope.getElementsByTagName(str);//按标签选择
		}
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//========================================封装常用效果
	
	//--------------------
	
	
	
	
	//挂载dawnJS全局函数
	_d.fn=fn;
	//暴露到windows对象上
	global._d=_d;
}(window))

