/**
 * Created by luozhong on 16/3/9.
 * desc:弹出框
 * {
 *  text: "删除成功",
    leftBtn: {
        text:"取消",
        func:function(){
            PGAlert.hide();
        }
    },
    rightBtn: {
        text:"确定",
        func:""
    }
 * }
 *
 */
(function () {
    var PGAlert = function (options) {
        //if (!(options instanceof Object)) {
        //    initTip(options);
        //    return;
        //}
        //if (!options || !(options instanceof Object) || !options.text || !options.leftBtn) {
        //    console.warn('参数不合法');
        //    return;
        //}

    };
    var A = PGAlert.prototype;

    var initBg = function (p) {
        var alertBg = {};
        var alertEle = document.getElementById('PGAlert');
        if (alertEle) {
            alertEle.innerHTML = "";
            alertBg = alertEle;
        }else{
            alertBg = document.createElement("div");
        }
        alertBg.setAttribute("id", "PGAlert");
        var bgCss = [
            "background: rgba(0, 0, 0, 0.4)",
            "position:fixed",
            "left:0",
            "right:0",
            "top:0",
            "z-index:2222222",
            "bottom:0"
        ];
        alertBg.style.cssText = bgCss.join(";");
        alertBg.appendChild(p);
        A.alertBg = alertBg;
        return alertBg;
    };

    var initTipBox = function () {
        var tipBox = document.createElement("div");
        var tipSpan = document.createElement("span");
        var tipCss = [
            "width: 60%",
            "position: absolute",
            "top: 45%",
            "text-align: center",
            "margin-left: -30%",
            "left: 50%",
            "font-size: 16px"
        ];
        var tipSpanCss = [
            "display:inline-block",
            "background-color:rgba(0,0,0,0.8)",
            "padding: 7px 10px",
            "color:#ffffff",
            "line-height: 21px",
            "border-radius:2px"
        ];
        tipBox.style.cssText = tipCss.join(";");
        tipSpan.style.cssText = tipSpanCss.join(";");
        tipSpan.innerText = A.text;
        tipBox.appendChild(tipSpan);
        return tipBox;
    };

    var initBox = function () {
        var scale = 270 / 122;
        var w = document.body.clientWidth;
        var boxW = w * 0.65;
        var boxH = boxW / scale;
        this.boxW = boxW;
        this.boxH = boxH;
        var alertBox = document.createElement("div");
        var alertBoxCss = [
            "background-color:#ffffff",
            "border-radius:5px",
            "position:absolute",
            "width:" + boxW + "px",
            "height:" + boxH + "px",
            "left:50%",
            "top:45%",
            "margin-left:-" + boxW / 2 + "px",
            "margin-top:-" + boxH / 2 + "px",
            "box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.3);"
        ];
        alertBox.style.cssText = alertBoxCss.join(";");
        alertBox.appendChild(initFooter(this));
        alertBox.appendChild(initCenter(this));
        return alertBox;
    };
    var initFooter = function (alertBox) {
        var alertFooter = document.createElement("div");
        var scale = 270 / 47;
        var footerH = alertBox.boxW / scale;
        var footertCss = [
            "position:absolute",
            "width:" + alertBox.boxW + "px",
            "height:" + footerH + "px",
            "bottom:0",
            "font-size:17px",
            "border-top: 1px solid #d8d8d8;"
        ];

        var leftBtn = document.createElement("div");
        leftBtn.innerText = A.leftBtn.text;
        leftBtn.onclick = A.leftBtn.func;

        var leftBtnW = alertBox.boxW;

        if (A.rightBtn) {
            leftBtnW = alertBox.boxW / 2;
            var rightBtn = document.createElement("div");
            rightBtn.innerText = A.rightBtn.text;
            rightBtn.onclick = A.rightBtn.func;
            var btnRightCss = [
                "height:" + footerH + "px",
                "text-align:center",
                "width:" + (alertBox.boxW / 2 - 1) + "px",
                "float:right",
                "border-left:1px solid #d8d8d8",
                "line-height:" + footerH + "px"
            ];
            rightBtn.style.cssText = btnRightCss.join(";");
            alertFooter.appendChild(rightBtn);
        } else {

        }

        var btnLeftCss = [
            "height:" + footerH + "px",
            "width:" + leftBtnW + "px",
            "text-align:center",
            "float:left",
            "line-height:" + footerH + "px"
        ];

        alertFooter.style.cssText = footertCss.join(";");
        leftBtn.style.cssText = btnLeftCss.join(";");
        alertFooter.appendChild(leftBtn);

        A.leftBtn = leftBtn;
        A.rightBtn = rightBtn;
        return alertFooter;

    };
    var initCenter = function (alertBox) {
        var alertCenter = document.createElement("div");
        alertCenter.className = "PGAlert-center";
        var scale = 270 / 75;
        var centerH = alertBox.boxW / scale;
        var centerCss = [
            "position:absolute",
            "width:" + alertBox.boxW + "px",
            "height:" + centerH + "px",
            "top:0",
            "text-align:center",
            "line-height:" + centerH + "px",
            "font-size:16px",
            "color:#333"
        ];
        alertCenter.innerText = A.text;
        alertCenter.style.cssText = centerCss.join(";");
        A.alertCenter = alertCenter;
        return alertCenter;

    };
    var initAlert = function (options) {
        A.text = options.text;
        A.rightBtn = options.rightBtn;
        A.leftBtn = options.leftBtn;
        document.body.appendChild(initBg(initBox()));
    };
    var initTip = function (options) {
        A.text = options;
        document.body.appendChild(initBg(initTipBox()));
        setTimeout(function () {
            var PGAlert = document.getElementById("PGAlert");
            if (PGAlert) {
                PGAlert.style.display = "none";
            }
        }, 1500)
    };

    A.change = function (obj) {
        A.alertCenter.innerText = obj.text;
    };
    A.changeTip = function (options) {
        initTip(options);
    };
    A.changeAlert = function (options) {
        initAlert(options);
    };
    A.hide = function (obj) {
        var PGAlert = document.getElementById("PGAlert");
        if (PGAlert) {
            PGAlert.style.display = "none";
        }
    };

    window.PGAlert = PGAlert;
})();