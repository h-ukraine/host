if (!navigator.userAgent.includes('Mobile'))
    document.documentElement.style.setProperty('--backpicture', 'url(../img/orion.png)no-repeat center center fixed');
// setelemProp('.selform', 'background', 'url(../img/orion.png)no-repeat center center fixed');

function myblur() {
    var dd = [instance, instance2];

    dd.forEach(x => {

            if (x.dtbox) {
                var dtbox = x.dtbox;
                x.dtbox.cancelBlur = 0;
                x.dtbox.visible = false;
                x.inputElem.blur();
            }
        }

    );

}


function set_pages(mode) {
    if (mode == 0) {
        if (archtable.pages > 0) {
            archtable.pages--;
            archtable.correctbuttons(archtable.pages);
        }

    } else {
        archtable.pages++;
        archtable.correctbuttons(archtable.pages);
    }

    if (div = document.querySelector('#pgno'))
        div.innerText = archtable.pages;
}

function set_exactpage(ev) {
    var div = ev.currentTarget;
    var nmb = parseInt(div.innerText);
    var a = archtable;
    // nmb--;
    if (nmb >= 1) {

        if (nmb <= a.pages)
            a.curr = nmb - 1;
    }

    // if (dv = document.querySelector('#currno'))
    //     dv.innerText = a.curr;

    // if ((nmb == 1) || (nmb == (a.pages - 1)))
    if (dv2 = document.querySelector('#ccurrent')) {
        if (nmb == 1)
            dv2.innerText = 2;
        else if (nmb == (a.pages))
            dv2.innerText = a.pages - 1;
    }
    a.refill();
}


function set_currpage(dir) {
    var a = archtable;
    switch (dir) {
        case 'minus':
            if (a.curr > 0)
                a.curr--;
            break;

        case 'plus':
            if (a.curr < (a.pages - 1))
                a.curr++;
            break;

    }

    if (div = document.querySelector('#currno'))
        div.innerText = a.curr;
    a.refill();
}


const CmdType = {
    None: 0,
    SomeText: 1,
    GetLastSkzData: 2,
    GetDevices: 3,
    SaveLatLng: 4,
    Login: 5,

    GetNodeData: 8,
    GetLastGrpData: 9,
    GetNodeParams: 10,

    GetUserParams: 11,
    GetDataArchive: 12
}

let _starttime = new Date().getTime();

function myperf() {
    var t = new Date().getTime() - _starttime;
    // var ss = t.getSeconds();
    // var mm = t.getMilliseconds();
    // return ' ' + ss + '.' + mm;
    return (t / 1000).toFixed(3);
}


//----------------------------------------------
let ucustoms;

_vvv = ['red', 'green', 'yellow', 'blue'];
var _vcnt = 0;


let rect = new Object({
    w: 0,
    h: 0
});


var sizeinfo_enabled = false;

// colors
var bluewhite = 'rgb(160,220,220)';

function toggle_sizeinfo(evt) {
    evt.stopPropagation();
    sizeinfo_enabled = sizeinfo_enabled ? false : true;
    on_resize();

}

let sert;

function on_resize() {
    w = screen.width;
    h = screen.height;
    ww = document.documentElement.clientWidth;
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    rect.w = ww;
    rect.h = scrollHeight;


    var elem = document.querySelector('.header');
    if (sizeinfo_enabled) {
        var clh = getrootProp('--cell-commonlineheight');
        elem.innerHTML = 'h' + h + ':: ' + document.body.clientHeight + ' ' + document.documentElement.clientHeight +
            'w' + w + ':' + screen.width + ' ' + ww + ' --c-lh=' + clh;
        elem.style.textAlign = 'center';
    } else {

        if (!sert) {
            elem.innerText = '';
        } else {
            elem.style.textAlign = 'right';
            elem.innerText = sert.iuser.login + ': ' + sert.iuser.name + ' ' + sert.iuser.lastname;
        }

    }

    return;

    // if (div = document.getElementById('a4'))
    //     div.innerText = 'width = ' + rect.w + ', height=' + rect.h;

    if (rect.w / rect.h > 1.02) {
        if (tbleft)
            tbleft.style.display = 'none';
        // tbleft ? tbleft.style.display = 'none' : '';
        if (tbfirst)
            tbfirst.style.display = 'block';
        if (tbl) {
            // tbl.tabl.style.width = 'calc(98vw - ' + _firstminwidth + ')';
            tbl.style.width = 'calc(98vw - 213px)';
            // tbl.style.background = 'rgb(150,150,150';

            var ht = '24px';
            // setGlobalProp('--cell-commonlineheight', '24px');
            // document.documentElement.style.setProperty('--cell-commonlineheight', ht);

            // tbl.rows.forEach(row => {
            //     Array.from(row.children).forEach(cell => cell.style.lineHeight = ht);
            //     // row.style.width = 'calc(98vw - 280px)';
            //     // row.style.background = 'magenta';
            // });
            // tbleft.rows.forEach(row => {
            //     Array.from(row.children).forEach(cell => cell.style.lineHeight = ht);
            // });
            // tbfirst.rows.forEach(row => {
            //     Array.from(row.children).forEach(cell => cell.style.lineHeight = ht);
            // });
        }
        htbl.row(0).style.gridTemplateColumns = ' 1fr 1fr 0.8fr'; // '242px  1fr 1fr 0.8fr';
        htbl.cell(0, 2).style.width = '';
        htbl.cell(0, 0).style.display = 'none';
        htbl.cell(0, 1).style.display = 'none';
        htbl.row(0).style.gridTemplateColumns = '1fr';
        if (c = document.getElementsByClassName('paramlabel')[0])
            c.style.marginTop = '';

    } else { //if (rect.w / rect.h < 0.98)
        if (tbfirst)
            tbfirst.style.display = 'none';
        if (tbleft)
            tbleft.style.display = 'block';
        if (tbl) {
            tbl.style.width = 'calc(98vw - 88px)';
            // tbl.style.background = 'grey';

            // var xprop = getelemProperty('tbl.cell(0, 0)', 'lineheight');

            // setGlobalProp('--cell-commonlineheight', '36px');
            // setrootProp('--cell-common-lineheight', '36px');
            document.documentElement.style.setProperty('--cell-commonlineheightt', '36px');
            var root = document.querySelector(':root');
            var result = root.getAttribute('var(--cell-common-lineheight)');


            var ee = getGlobalProp('--cell-common-lineheight');


            // var ht = '36px';
            // tbl.rows.forEach(row => {
            //     Array.from(row.children).forEach(cell => cell.style.lineHeight = ht);
            // });
            // tbleft.rows.forEach(row => {
            //     Array.from(row.children).forEach(cell => cell.style.lineHeight = ht);
            // });
            // tbfirst.rows.forEach(row => {
            //     Array.from(row.children).forEach(cell => cell.style.lineHeight = ht);
            // });
        }
        htbl.row(0).style.gridTemplateColumns = '0.5fr 0.5fr';
        htbl.cell(0, 2).style.width = '200%';

        //
        // setGlobalProp('--tbl-background1', 'grey');
        // document.documentElement.style.setProperty('--tbl-background1', 'red');

        var f = document.documentElement.style.getPropertyValue('--tbl-background1');
        var tmpcolor = getrootProp('--tbl-background1');
        var temp = getelemProperty(':root', '--tbl-background1');
        htbl.cell(0, 0).style.background = getGlobalProp('--tbl-background1'); //    
        htbl.cell(0, 1).style.background = getGlobalProp('--tbl-background1'); //    
        // $(':root').css("--tbl-background1", "#000000");
        //
        // get variable from inline style
        // element.style.getPropertyValue("--my-variable");

        // get variable from wherever
        // getComputedStyle(element).getPropertyValue("--my-variable");

        // set variable on inline style
        // element.style.setProperty("--my-variable", 4);
        // document.documentElement.style.setProperty("color-scheme", preferredTheme);

        /*
        htbl.cell(0, 0).style.display = '';
        htbl.cell(0, 1).style.display = '';
        */

        // htbl.cell(0, 0).style.visibility = 'hidden';
        // htbl.cell(0, 1).style.visibility = 'hidden';
        // htbl.cell(0, 2).style.height = '40px';

        // htbl.row(0).style.gridTemplateRows = '1fr 1fr';

        if (c = document.getElementsByClassName('paramlabel')[0])
            c.style.marginTop = '66px';



    }


}

window.onresize = on_resize;
// console.log('tmp.js: after  onresize=' + myperf());
// let tmppw;


function limitbyuser(devs) {
    if (devs.length > 0) {
        var b = 0;

        // if (!tmppw)
        var tmppw = localStorage.getItem('tmppw'); //last_objgrp.devlist;
        if (isJSON(tmppw)) {
            sert = JSON.parse(tmppw);
            if (sert) {
                var eee = sert.customs.devlist;
                if (eee != null) {
                    if (eee.length > 0)
                        var dev_ids = parse_devlist(eee);



                    //   var dev_ids = parse_devlist(str);

                    var devlist2 = devs.Where(x => dev_ids.includes(x.Id.toString()));

                    // var devlist2 = devlist.Where(x => devlist.includes(x.Id.toString()));
                    devlist = devlist2;
                    devs = devlist2;

                }
            }
        }
    }

    return devs;
}


function cleartable(evt) {
    var ar = archtable;

    ar.clear();



}



var chtypemode = 1;
let lastsavedDevicesObject = null;

function refresh_tabcontainer() {
    var devs = lastsavedDevicesObject.arrdev;
    if (chtypemode == 1)
        devs = lastsavedDevicesObject.arrdev.Where(x => x.binarytype == 0x40);
    else if (chtypemode == 2)
        devs = lastsavedDevicesObject.arrdev.Where(x => x.binarytype == 0x42);

    devs = limitbyuser(devs);

    var devs = devs.sort((a, b) => a.Id - b.Id);
    var descriptions = devs.Select(x => x.description === 'надо_редактировать' ?
        x.description + '_id=' + x.Id : x.description);

    if (div = document.getElementById('tabcontainer')) {
        // var children = div.children;
        for (i = 0; i < div.childElementCount;) {
            // if (!descriptions.includes(div.children[i].innerText)) {
            if (!descriptions.includes(div.children[i].innerText)) {
                div.removeChild(div.children[i]);
            } else
                i++;
            // while (div.childElementCount > 1) {
            //     var elem = div.lastelementChild;
            //     if (!descriptions.includes(elem.innerText)) {
            //         div.removeChild(elem);
            //         //         div.removeChild(div.children[i]);
            //     }
        }

        if (chtypemode == 0) {
            var tyyyuuh = 0;
        }

        var array = Array.from(div.children).Select(x => x.innerText);
        for (i = 0; i < devs.length; i++) {
            var idescription = devs[i].description === "надо_редактировать" ? devs[i].description + '_id=' + devs[i].Id : devs[i].description;
            // if (!array.includes(devs[i].description)) {
            if (!array.includes(idescription)) {


                var cv = document.createElement('div');
                cv.className = 'swtab';
                // cv.style.width = '100px';

                // cv.innerText = devs[i].description != 'надо_редактировать' ?
                //     devs[i].description : devs[i].description + '_id=' + devs[i].Id;
                cv.innerText = idescription;

                // cv.innerHTML = "<div class='swtab' onclick='openPageUniversal()>" + devs[i].description + "</div>"
                div.appendChild(cv);
                cv.addEventListener('click', openPageUniversal);
            }

        }
    }

}

let myid = 0;
let mydescription;
const bc = new BroadcastChannel('test_channel');


var last_arrdev = null;
var last_objgrp = null;

var mass_sav = [];
var colsav = 0;
let vismode = 0;

function deepEqual(obj1, obj2) {
    var q1 = JSON.stringify(obj1);
    var q2 = JSON.stringify(obj2);
    var res = (q1 === q2);

    return res;

    return JSON.stringify(obj1) === JSON.stringify(obj2);
}



var xcnt = 0;

bc.onmessage = function(ev) {


        if (ev.data.type) {
            if (ev.data.type == 'sync1000') {
                ////// document.getElementById('a4').style.background = (_vvv[(_vcnt++) & 3]);
                // document.querySelector('.header').style.background = (_vvv[(_vcnt++) & 3]);
            }

        } else {

            // try {
            if (ev.data) {

                if (ev.data.includes('archive=close()') || ev.data.includes('all=close()')) {
                    // if (ev.data.includes(mydescription)) {
                    // if (ev.data.includes('archive')) {
                    document.documentElement.style.display = 'none';
                    window.top.close();
                    // }
                }

                if (!document.hidden) {
                    // console.log("открыта");
                } else {
                    // console.log("закрыта");
                    return;
                }
                if (isJSON(ev.data)) {
                    var obj = JSON.parse(ev.data);
                    if (obj.type == "answer")
                        switch (obj.ObjectType) {
                            //
                            case CmdType.GetUserParams:
                                {
                                    var zdummy = obj;
                                    console.log("--received: CmdType.GetUserParams");

                                    ucustoms = obj.customs;




                                }
                                break;

                            case CmdType.GetDevices:
                                if (obj.arrdev.length == 0) {
                                    var dummy = 7;


                                } else {

                                    lastsavedDevicesObject = obj;
                                    last_arrdev = obj.arrdev.Where(x => x.binarytype == 0x40);
                                    // var mydev = obj.arrdev.Where(x => x.Id == Id);

                                    // var dev = mydev[0];

                                    // myid = dev.Id;
                                    mydescription = 'Архів'; // dev.description;
                                    document.title = mydescription;

                                    if (a1 = document.getElementById('a1')) {
                                        // a1.innerHTML = "<div>inv# " + dev.inventory_name + ',' +
                                        // var _name = dev.description == 'надо_редактировать' ? dev.description + '_id' + Id : dev.description;
                                        // a1.innerHTML = "<div >" + dev.inventory_name + ',' +
                                        //     "<span style='font-size:20px;padding-left:20px;color:white;'>" + _name + "</span></div>";

                                        // var bbb = dev.inventory_name.length > 0 ? "<span style=padding-left:10px;>" + dev.inventory_name + "</span>" : '';

                                        // a1.innerHTML = "<div>" + "<span style='font-size:20px;padding-left:0px; text-align:left; margin-left:0px; color:white;'>" + _name + "</span>"
                                        //     + bbb + "</div>";
                                        a1.innerText = mydescription;
                                        // a1.style.letterSpacing = '0.6em';
                                        a1.style.textAlign = 'center';
                                        // a1.style.color = 'rgba(225,225,220,0.999)'; //    bluewhite; //  'rgba(255,70,0,0.98)';
                                        // a1.style.color = 'rgba(225,185,120,0.999)'; //    bluewhite; //  'rgba(255,70,0,0.98)';
                                        a1.style.fontSize = '24px';
                                        // a1.style.background = 'blue';

                                    }

                                    if (a4 = document.getElementById('a4')) {
                                        a4.innerText = '';
                                        a4.innerText = 'Aварії відсутні'; //    dev.address ? dev.address : 'Id = ' + dev.Id;
                                        a4.style.color = 'forestgreen';
                                        a4.style.display = 'none';
                                    }



                                    refresh_tabcontainer();
                                    if (lastsavedDevicesObject) {
                                        // if (lastsavedDevicesObject.arrdev.find(x => x.Id == Id))
                                        // init_tblfirst_tbleft();
                                    }
                                }

                                break;

                            case CmdType.GetDataArchive:

                                var cnt = obj.count;


                                // if (obj.arrgrp == null) {
                                amnt = document.querySelector('.amntinfo');
                                if (amnt) {
                                    // amnt.innerText = /*'Записів: ' + */ obj.count;
                                    var sss = obj.count;
                                    if (obj.tmlist.length > 0)
                                    // sss += ' + ' + obj.tmlist.length;
                                        sss = obj.count + 1;
                                    amnt.children[0].innerText = sss; //obj.count;

                                    // var count = parseInt(obj.count);
                                    // if (count == 0)
                                    //     amnt.style.opacity = '0';
                                    amnt.style.opacity = '1';
                                }


                                if (d1 = document.querySelector('.d1'))
                                    if (dc1 = document.querySelector('.dc1')) {
                                        for (var i = 0; i < d1.childElementCount; i++) {
                                            var descr = d1.children[i].innerText;
                                            var Yellow = 'rgba(200,200,20,0.85)';
                                            var fff = obj.cntlist.Where(x => x.description == descr);
                                            if (fff.length > 0) {
                                                var names = obj.tmlist.Select(x => x.description);
                                                // var sss = '';
                                                // if ((obj.amode == 3) && (names.includes(descr))) {
                                                //     sss = 'x ';
                                                // }
                                                // dc1.children[i].innerText = sss + fff[0].count;
                                                dc1.children[i].style.background = '';

                                                dc1.children[i].innerHTML = fff[0].count;
                                                if ((obj.amode == 3) && (names.includes(descr))) {
                                                    // dc1.children[i].style.background = Yellow;
                                                }

                                                var count = parseInt(fff[0].count);
                                                dc1.children[i].style.opacity = '1';



                                            } else {
                                                var names = obj.tmlist.Select(x => x.description);
                                                if ((obj.amode == 3) && (names.includes(descr))) {
                                                    dc1.children[i].innerText = 'оффлайн'; // "зв'язок";
                                                    dc1.children[i].style.opacity = '1';
                                                    // dc1.children[i].style.background = 'grey';

                                                } else {
                                                    dc1.children[i].innerText = 0;
                                                    dc1.children[i].style.opacity = '0';
                                                    dc1.children[i].style.background = '';
                                                }

                                            }




                                        }




                                    }




                                    // }
                                if (obj.arrgrp != null) {
                                    // var archtable = new arctable('#arch', 5, 1, obj);
                                    if (archtable)
                                        archtable.refresh(obj);


                                }


                                var n = 0;

                                break;

                            case CmdType.GetLastSkzData:

                                // var _t1 = performance.now();
                                // console.log('tmpgrp.js: before fillskz() t=' + myperf());
                                // fillskz(obj);
                                // console.log('   ==> msg_len = ' + ev.data.length);
                                // console.log('tmpgrp.js:  after fillskz() t=' + myperf());
                                break;

                            case CmdType.GetLastGrpData:

                                last_objgrp = obj;
                                // _fillarchive(last_objgrp);
                                // archtable.fill(last_objgrp);

                                break;

                            case CmdType.GetNodeData:

                                if (false) {
                                    var _t1 = performance.now();
                                    // console.log('tmpgrp.js: before fillgrp() t=' + myperf());
                                    // if (dev)
                                    // if (lastsavedDevicesObject)
                                    if (obj.devlist.length > 0) {
                                        if (obj.arrgrp.Where(x => x.device_id == Id).length > 0)
                                            fillgrp(obj);
                                    }
                                    // console.log('   ==> msg_len = ' + ev.data.length);
                                    // console.log('tmpgrp.js:  after fillgrp() t=' + myperf());
                                    if (send_ms_flag) {
                                        send_ms_flag = false;
                                        console.log('________' + (performance.now() - browserSend_ms));
                                    }
                                }
                                break;

                            default:



                                break;

                        }


                }


            }
            // } catch (se) {
            //     console.log('ОШИБКА! - bc.onmessage')
            //     var d = 0;
            // }
        }

        // console.log(ev);
        // document.getElementById('a4').style.background = (_vvv[(_vcnt++) & 3]); //ev.data;

    }
    // bc.postMessage('This is a test message.');
    // bc.close();




let srch = '{"' + location.search.replace("?", "");

srch = srch.replace('&', ',"');
while (srch.includes('='))

    srch = srch.replace('=', '":');
while (srch.includes('%22'))
    srch = srch.replace('%22', '"');

srch += '}';

var Tparam;
var Id;
var passw;

var ttt = isJSON(srch);

// try {
//     Tparam = JSON.parse(srch);
//     Id = Tparam.device_Id;
//     passw = Tparam.pw;
// } catch { }

// .replace(',', '}{"')


//  Размеры таблиц...
var _firstminwidth = '185px';
var _firstpadddingleft = '6px';
//
var _leftwidth = '60px';
var _fontsize = '17px';
var _lineheight = '22px';



console.log('allgrp.js: before tables=' + myperf());





function nalasht_handler() {

    // var nal = document.getElementById('anim');
    var nal = document.querySelector('.nalasht');


    var vvprop = getelemProp('.nalasht', 'display');

    if (vvprop == 'none') {
        setelemProp('.nalasht', 'display', 'block');
        // nal.style.display = '';
        setTimeout(() => {
            nal.style.opacity = 1;
            nal.style.marginLeft = '0px';
            // fullscreen3(nal);
        }, 30);


    } else {
        // setelemProp('.nalasht', 'display', '');
        // nal.style.display = '';
        // nal.style.marginLeft = '-101vw';
        nal.style.opacity = 0;
        nal.style.marginLeft = '-101vw';
        setTimeout(() => {
            setelemProp('.nalasht', 'display', 'none');

        }, 400);
    }
}

nalasht_handler();


var archtable = new arctable('#tablecontainer', 1, 1); //new arctable('#arch', 5);


//Налаштування...
var nal = document.getElementById('anim');
nal.addEventListener('click', nalasht_handler);

var iled = document.getElementById('lmenu');
iled.addEventListener('click', nalasht_handler);
// archtable.left.addEventListener('click', nalasht_handler);
// archtable.left.style.cursor = 'pointer';

// tbleft.tabl.addEventListener('click', nalasht_handler);
// tbfirst.tabl.addEventListener('click', nalasht_handler);


// setInterval(() => {
//     var g = document.querySelector('.selmenu2');
//     if (g) {
//         var fff = g.innerText;
//         g.click();
//         // g.dispatchEvent(new Event('click'));
//     }
// }, 10);
var _________t = 999;


onresize();