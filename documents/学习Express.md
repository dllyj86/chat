# 学习Express

## 设置server
1. app.set()是设置应用程序的变量. 有一些变量名,是系统内置的,有特殊含义.比如:  
   app.set('views', '目录'), 表示设置视图文件的根目录.视图文件是渲染HTML文件的模板.通常使用模板引擎来动态生成HTML内容(当然也可以直接使用HTML文件,只不过返回给前端时有所不同,而且不需要设置views了).  
   app.set('view engine', '引擎名'), 设置视图的渲染引擎.  

   如果使用渲染引擎,生成html,那么在返回时要写成res.**render**('模板名', some_data_obj).
   如果不使用模板引擎而直接使用html文件,那么要写成普通的返回文件: res.sendFile('html文件带后缀的名字', {root: 模板文件目录路径})
