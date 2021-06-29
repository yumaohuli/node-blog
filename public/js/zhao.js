

    // 数据操作（单选、全选、删除）
    $(function () {

        var check_all = $(".data .nav .check_all"); //顶部-全选
        var Invert_Selection = $(".data .nav .Invert_Selection"); //顶部-反选
        var deselect = $(".data .nav .deselect"); //顶部-取消选择
        var o_delete = $(".data .nav .o_delete"); //顶部-删除
        var Lock = $(".data .nav .Lock"); //顶部-锁定
        var unlock = $(".data .nav .unlock"); //顶部-解锁
        var data_all = $(".data table tr"); //内容-整行数据大盒子
        var check_box = $(".data table .fx i"); //内容-复选框
        var a_delete = $(".data table .a_delete"); //内容-删除
        var state = $(".data table .state"); //内容-用户状态
        var Warning_001 = $(".data .Warning"); //警告弹框1号
        var confirm = $(".data .Warning .confirm"); //警告弹框确认按钮
        var cancel = $(".data .Warning .cancel"); //警告弹框取消按钮
        var Warning_002 = $(".data .Warning2"); //警告弹框2号

        Checkbox_call(check_all, Invert_Selection, deselect, o_delete, Lock, unlock, data_all, check_box, a_delete, state, Warning_001, confirm, cancel, Warning_002);

    })

    function Checkbox_call(check_all, Invert_Selection, deselect, o_delete, Lock, unlock, data_all, check_box, a_delete, state, Warning_001, confirm, cancel, Warning_002) {

        var a_tr, timer, count;
        var Lock_onoff = false;

        //刷新页面时清除"input"打勾状态
        $(check_box).next('input[type="checkbox"]').removeAttr("checked");

        //警告窗口2
        function Warning2() {
            if (!$(Warning_002).hasClass("active")) {
                $(Warning_002).addClass("active");
                timer = setTimeout(function () {
                    $(Warning_002).removeClass("active");
                }, 2000);
            }
        }

        //锁定、解锁功能
        function Lock_unlock() {
            event.stopPropagation();
            //判断选择框有没有被选中
            if ($(check_box).hasClass("active")) {

                //遍历所有选择框
                $(check_box).each(function () {

                    //判断当前选择框是否被选中
                    if ($(this).hasClass("active")) {

                        //判断开关状态
                        if (Lock_onoff == false) {
                            $(this).parents("tr").find(state).addClass("active");
                            $(this).click();  //模拟点击选择框 
                        } else {
                            $(this).parents("tr").find(state).removeClass("active");
                            $(this).click();  //模拟点击选择框 
                        }
                    }
                })
            } else {
                Warning2()
            }
        }

        //判断自己是否有选中状态，有则删除，没有则添加
        function judge_class(this_) {
            if ($(this_).hasClass("active")) {
                $(this_).removeClass("active");
                $(this_).next('input[type="checkbox"]').removeAttr("checked");
            } else {
                $(this_).addClass("active");
                $(this_).next('input[type="checkbox"]').prop("checked", "checked");
            }
        }

        //点击选择框操作
        $(check_box).click(function () {

            count = 0;

            //判断自己是否有选中状态，有则删除，没有则添加
            judge_class(this);

            //遍历选中状态“active”的个数
            $(check_box).each(function () {
                if ($(this).hasClass("active")) {
                    count++;
                }
            })

            //判断是否全部选中，如果全部选中则给"全选按钮"添加选中状态，反之清除选中状态
            if (count >= $(check_box).length) {
                $(check_all).addClass("active");
                count = true
            } else {
                $(check_all).removeClass("active");
                count = false
            }
        })

        //全选(取消全选)二合一按钮
        $(check_all).click(function () {

            //判断是否全部选中
            if (count === true) {
                $(check_all).removeClass("active");  //清除"全选按钮"选中状态
                $(check_box).removeClass("active"); //清除"选择框"选中状态
                $(check_box).next('input[type="checkbox"]').removeAttr("checked"); //清除"input"打勾状态
                count = false;
            } else {
                $(check_all).addClass("active"); //添加"全选按钮"选中状态
                $(check_box).addClass("active"); //添加"选择框"选中状态
                $(check_box).next('input[type="checkbox"]').prop("checked", "checked");  //添加"input"打勾状态
                count = true;
            }

        })

        //反选
        $(Invert_Selection).click(function (e) {

            e.stopPropagation();

            //判断"选择框"是否有选中状态
            if ($(check_box).hasClass("active")) {

                $(check_all).removeClass("active"); //清除"全选按钮"选中状态

                //遍历所有"选择框"
                $(check_box).each(function () {

                    //判断自己是否有选中状态，有则删除，没有则添加
                    judge_class(this);

                })
                count = false;
            } else {
                Warning2();
            }

        })

        //取消选择
        $(deselect).click(function (e) {

            e.stopPropagation();

            //判断"选择框"是否有选中状态，有则清除，没有则弹出警告框
            if ($(check_box).hasClass("active")) {
                $(check_box).removeClass("active");
                $(check_box).next('input[type="checkbox"]').removeAttr("checked");
                $(check_all).removeClass("active");  //清除"全选按钮"选中状态
                count = false;
            } else {
                Warning2();
            }

        })

        //点击对应的删除按钮 - 弹出警告框并找到其父级
        $(a_delete).click(function () {
            $(Warning_001).addClass("active");
            a_tr = $(this).parents("tr");
        })

        //警告框-确认按钮
        $(confirm).click(function () {

            $(a_tr).remove(); //移除对应 tr 整行数据

            //判断当前元素是否被选中，如果选中删除其父级 tr 整行数据
            $(check_box).each(function () {
                if ($(this).hasClass("active")) {
                    $(this).parents("tr").remove();
                }
            })
            $(Warning_001).removeClass("active");  //关闭警告窗口
        })

        //警告框-取消按钮-关闭警告框
        $(cancel).click(function () {
            $(Warning_001).removeClass("active");
        })

        //顶部删除按钮-打开警告窗口
        $(o_delete).click(function (e) {

            e.stopPropagation();

            //判断是否有选中状态，如果有则弹出操作警告框
            if ($(check_box).hasClass("active")) {
                $(Warning_001).addClass("active");
            } else {
                Warning2();
            }
        })

        //锁定按钮
        $(Lock).click(function (event) {
            Lock_onoff = false
            Lock_unlock(event, Lock_onoff);
        })

        //解锁按钮
        $(unlock).click(function (event) {
            Lock_onoff = true;
            Lock_unlock(event, Lock_onoff);
        })

        //点击页面 关闭警告窗口
        $(document).click(function () {
            $(Warning_002).removeClass("active");
            clearTimeout(timer);
        })
    }


    //点击上传图片
    function upload(a,b,c){
        var count = a;  // 限制的图片数量，false 为不限制数量
        var num = b ;  // 限制文件大小，单位为 MB， false 为不限制大小
        var arr = c;  // 限制文件格式，false 为不限制格式
        var str,text,file,name,size,format,format2,size2,count2;

        // 限制文件格式，false 为不限制格式
        if(arr === false){
            str = "";  // 为空
        }else{
            str = arr.join(",");  //返回“ .jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF ”
        }

        

        // 判断图片数量
        function len(){
            if(!count===false){
                if($(".picture-upload .imgbox li i").length>=count){
                    $(".picture-upload .imgbox li .but").css("display","none");
                }else{
                    $(".picture-upload .imgbox li .but").css("display","block"); 
                }
            }
        }

        // 删除旧的（增加新的）上传文件的标签
        function inp(){
            $(".picture-upload .file-box input").remove();
            $(".picture-upload .file-box").append('<input type="file" class="inputFile" multiple accept="'+str+'" style="display:none;">');
        }
        inp();

        // 显示弹窗
        function show(text){
            $(".picture-upload .popup span").text(text);
            $(".picture-upload .popup").addClass("active");
        }
        
        $("body").delegate(".picture-upload .but", "click", function (e) {

            inp();

            $(".picture-upload .inputFile").click();
           
            $(".picture-upload .inputFile").on("change", function (event) {

                file = event.target.files || event.dataTransfer.files;  // 获取目标文件
                name = event.currentTarget.files[0].name;  // 文件名
                size = event.currentTarget.files[0].size;   // 文件大小

                // 匹配文件数量
                if(!count===false){  
                    var count2 = $(".picture-upload .imgbox li i").length + file.length > count
                }

                if(count2){  // 匹配文件数量
                    show(text = "只能上传"+count+"张");
                    inp();
                }else{
                    $(file).each(function(index,value){
                        if(num === false){
                            size2 = true;
                        }else{
                            size2 = (value.size/1024).toFixed(2) < num * 1024;
                        }
                        if(arr === false){
                            format = true;
                            format2 = true;
                        }else{
                            format = arr.some( str => str === value.name.slice(-4) );
                            format2 = arr.some( str => str === value.name.slice(-5) );
                        }
                        if(format||format2){  // 匹配文件格式
                           if(size2){  // 匹配文件大小
                                if (value) {   // 如果目标文件存在
                                    var reader = new FileReader();   // 定义一个文件阅读器
                                    reader.onload = function () {   // 文件装载后将其显示在图片预览里
                                        $(".picture-upload .imgbox li:nth-child(1)").before('<li><div><i class="del"></i><img src="'+this.result+'" alt=""></li></div>')
                                        inp();
                                        len();
                                    };
                                    reader.readAsDataURL(value);  // 装载文件
                                    
                                }
                           }else{
                                show(text="请上传小于"+num+"MB的图片");
                                inp();
                           }
                        }else{
                            show(text="文件格式不正确");
                            inp();
                        }
                    })
                }
            });
        })
        
        // 点击删除标签和图片
        $(".picture-upload .imgbox").on("click", "li .del", function () {
            $(this).parents("li").remove();
            len();
        })

        // 关闭提示框
        $(".picture-upload .popup").on("click", "i", function () {
            $(".picture-upload .popup").removeClass("active");
            inp();
        })
    }
    
    // upload ( 限制图片数量（张），限制文件大小（MB），[arr,限制文件格式] ) -- 传入false不限制
    upload(1,10,[".jpg",".JPG",".jpeg",".JPEG",".png",".PNG",".gif",".GIF"]);
