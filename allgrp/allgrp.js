//------------- 1st way  ---   extending Array
Array.prototype.Add = function(element) {
    this.push(element);
};

Array.prototype.Where = function(args) {
    return this.filter(args);
};

Array.prototype.Select = function(args) {
    return this.map(args);
};
//----------------------------------------------
function isJSON(str) {
    if (/^\s*$/.test(str)) return false;
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (/^[\],:{}\s]*$/).test(str);
}

function setGlobalProp(prop, val) {
    var root = document.querySelector(':root');
    // var rootStyles = getComputedStyle(root);

    root.style.setProperty(prop, val);
    // var mainColor = rootStyles.getPropertyValue('--main-color');

    // console.log(mainColor); // '#ffeead'

    // Для обновления переменной CSS, просто вызовите метод setProperty на элементе, в котором была объявлена переменная, и передайте имя переменной в качестве первого параметра и новое значение — вторым.

    // root.style.setProperty('--main-color', '#88d8b0');
}

function getGlobalProp(prop, val) {
    var root = document.querySelector(':root');
    var rootStyles = getComputedStyle(root, null);

    var bbb = root.style.getPropertyValue(prop);
    return rootStyles.getPropertyValue(prop);
}


function getelemProperty(elem, propname) {
    // var item = document.getElementById(elem);
    var item = document.querySelector(elem);
    // var cls = document.getElementsByClassName(classname)[0];
    var theCSSprop = window.getComputedStyle(item, null).getPropertyValue(propname);
    return theCSSprop;
}

function getrootProp(propname) {
    var root = document.querySelector(':root');
    var theCSSprop = window.getComputedStyle(root, null).getPropertyValue(propname);
    return theCSSprop;
}

function setrootProp(propname, value) {
    var root = document.querySelector(':root');
    // var rootstyle = window.getComputedStyle(root, null);
    root.setProperty(propname, value);
    var t = getrootProp(propname);
    return t;
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

    GetUserParams: 11
}

let _starttime = new Date().getTime();
let Trefresh = Date.now();



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

    if (div = document.querySelector('.username')) {
        if (sert)
            div.children[1].innerText = sert.iuser.name + ' ' + sert.iuser.lastname;
    }

    if (false) {
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
    }


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
function parse_devlist(str) {
    var s1 = str.trim();

    var s2 = s1.split(',');

    for (var i = 0; i < s2.length; i++)
        s2[i] = s2[i].trim();

    return s2;

}

function limitbyuser(devs) {
    if (devs.length > 0) {
        var b = 0;


        var tmppw = localStorage.getItem('tmppw'); //last_objgrp.devlist;
        if (isJSON(tmppw)) {
            var nnn = JSON.parse(tmppw);
            if (nnn) {
                var eee = nnn.customs.devlist;
                if (eee != null)
                    if (eee.length > 0) {
                        var dev_ids = parse_devlist(eee); //devlist; //userobj.customs.devlist;



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
    if (!obj1 || !obj2) {

        let yyy = -2;


    }
    if (obj1 == null) {

        let r1 = -2;

    }
    if (obj2 == null) {

        let r1 = -2;

    }


    var q1 = JSON.stringify(obj1);
    var q2 = JSON.stringify(obj2);
    var res = (q1 === q2);

    if (res == undefined) {
        let r = -1;



    }

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

            try {
                if (ev.data) {

                    if (ev.data.includes('allgrp=close()') || ev.data.includes('all=close()')) {
                        // if (ev.data.includes(mydescription)) {
                        // if (ev.data.includes('allgrp')) {
                        document.documentElement.style.display = 'none';
                        window.top.close();
                        // }
                    }

                    if (!document.hidden) {
                        // console.log("открыта");
                    } else {
                        // console.log("закрыта");
                        if (ev.data.includes('serverevent') == false)
                            return;
                    }
                    if (isJSON(ev.data)) {
                        var obj = JSON.parse(ev.data);
                        if (obj.serverevent)
                            if (obj.serverevent == true) {

                                Trefresh = Date.now();
                            }
                        if (obj.type == "answer")
                            switch (obj.ObjectType) {
                                //
                                case CmdType.GetUserParams:
                                    {
                                        var zdummy = obj;
                                        console.log("--received: CmdType.GetUserParams");
                                        // Trefresh = Date.now();
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

                                        if (a1 = document.getElementById('a1')) {
                                            // a1.innerHTML = "<div>inv# " + dev.inventory_name + ',' +
                                            // var _name = dev.description == 'надо_редактировать' ? dev.description + '_id' + Id : dev.description;
                                            // a1.innerHTML = "<div >" + dev.inventory_name + ',' +
                                            //     "<span style='font-size:20px;padding-left:20px;color:white;'>" + _name + "</span></div>";

                                            // var bbb = dev.inventory_name.length > 0 ? "<span style=padding-left:10px;>" + dev.inventory_name + "</span>" : '';

                                            // a1.innerHTML = "<div>" + "<span style='font-size:20px;padding-left:0px; text-align:left; margin-left:0px; color:white;'>" + _name + "</span>"
                                            //     + bbb + "</div>";
                                            a1.innerText = 'Дані ГРП';
                                            a1.style.letterSpacing = '0.6em';
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
                                        // myid = dev.Id;
                                        mydescription = 'Дані ГРП'; // dev.description;
                                        document.title = mydescription;


                                        refresh_tabcontainer();
                                        if (lastsavedDevicesObject)
                                        // if (lastsavedDevicesObject.arrdev.find(x => x.Id == Id))
                                            init_tblfirst_tbleft();
                                    }

                                    break;



                                case CmdType.GetLastSkzData:

                                    // var _t1 = performance.now();
                                    // console.log('tmpgrp.js: before fillskz() t=' + myperf());
                                    // fillskz(obj);
                                    // console.log('   ==> msg_len = ' + ev.data.length);
                                    // console.log('tmpgrp.js:  after fillskz() t=' + myperf());
                                    break;

                                case CmdType.GetLastGrpData:
                                    // console.log("--received: CmdType.GetLastGrpData");
                                    var enable_refresh = true;

                                    if (last_objgrp != null)
                                        enable_refresh = !deepEqual(last_objgrp, obj);
                                    last_objgrp = obj;
                                    if (enable_refresh) {
                                        console.log("start _fillallgrp(last_objgrp)");
                                        _fillallgrp(last_objgrp);

                                    }


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
            } catch (se) {
                console.log('ОШИБКА! - bc.onmessage')
                var d = 0;
            }
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


var tbfirst, tbleft, tbl;

// var params = JSON.parse(sessionStorage.getItem('alarm_tmp_params_' + Id));


var htbl = new jsTable('htl', 1, 3, 'htable');
htbl.rows.forEach(x => x.style.gridTemplateColumns = ' 1fr  1fr 0.8fr'); //'242px  1fr  1fr 0.8fr');
// htbl.cell(0, 0).style.maxWidth = '230px';
htbl.row(0).style.gridColumnGap = '0px';
htbl.cell(0, 0).style.display = 'none';
htbl.cell(0, 1).style.display = 'none';
// htbl.cell(0, 0).style.width = '20px';
// htbl.setcolumnProperty(htbl.colCount - 1, 'width', '10%');
// htbl.setMinWidth(['25%', '35%', '10%', '30%']);
// htbl.setMinWidth(['55%', '35%', '10%', '30%']);
// htbl.cell(1, 2).replaceWith(document.getElementById('itp'));
var child = htbl.cell(htbl.rowCount - 1, htbl.colCount - 1);
// var src = htbl.row(1).parentNode.appendChild(document.getElementById('itp'));
// htbl.row(1).parentNode.replaceChild(child, src);   
// src.parentNode.replaceChild(child, src);

//+++++++++++++++++   R E P L A C E !!! +++++++++++++++++++++++++
{ //replace last cell with select
    // replace:  Varian1.
    // var chng = htbl.row(1).children[3];
    // chng.replaceWith(document.getElementById('itp'));
    //
    /*********** or replace: Variant2   */
    htbl.row(0).children[htbl.colCount - 1].replaceWith(document.getElementById('doubleitp'));

    // htbl.row(0).children[0].replaceWith(document.getElementById('itp'));

    /************ or replace: Variant3   */
    // htbl.row(1).insertBefore(document.getElementById('itp'), child);
    // htbl.row(1).removeChild(child);
    //----------------------------------------------------------------
}

htbl.cell(0, 0).innerText = '10.01  10:30:01';
// htbl.cell(0, 0).style.width = _firstminwidth;
htbl.cell(0, 1).innerText = '10.01  10:35:22';


// htbl.row(1).children[2].inneHTML = document.getElementById('itp').innerHTML;
// var rdfr = htbl.cell(1, htbl.colCount - 1);
// rdfr.data = 'rrr';
// htbl.cell(1, 3).innerText = "345";

class grprow {
    isdigit = 0; // 0 - analogue, 1-digital
    longname = '';
    name = '';
    bit = 0;

    constructor(dig, ln, _name, mskbit) {
        this.isdigit = dig;
        this.longname = ln;
        this.name = _name;
        this.bit = mskbit;
    }

}


let grprows = [];

grprows.push(new grprow(0, 'Назва', '.', 0x0));
grprows.push(new grprow(0, 'Дата та час приладу', 'Дата', 0x0));
grprows.push(new grprow(0, 'P1, кгс/см2', 'P1, кгс', 0x2));
grprows.push(new grprow(0, 'P2, кгс/см2', 'P2, кгс', 0x100));
grprows.push(new grprow(0, 'P3, мм.вод.ст.', 'P3, мм', 0x4));
grprows.push(new grprow(1, 'ПЗК1', 'ПЗК1', 65536 << 1));
grprows.push(new grprow(1, 'ПЗК2', 'ПЗК2', 65536 << 9));
grprows.push(new grprow(0, 'ПСК1, % об.', 'ПСК1', 0x10));
grprows.push(new grprow(0, 'ПСК2, % об.', 'ПСК2', 0x200));
grprows.push(new grprow(0, 'Загазованість, % об.', 'Газ, %', 0x8));
grprows.push(new grprow(1, 'Двері_1', 'Дв1', 65536 << 2));
grprows.push(new grprow(1, 'Двері_2', 'Дв2', 65536 << 3));
grprows.push(new grprow(1, 'Двері_3', 'Дв3', 65536 << 4));
grprows.push(new grprow(1, 'Двері_4', 'Дв4', 65536 << 5));
grprows.push(new grprow(0, 'Tемпература1, °С', 'T1, °С', 0x20));
grprows.push(new grprow(0, 'Tемпература2, °С', 'T2, °С', 0x40));
grprows.push(new grprow(0, 'Езахисту, В', 'Eзах, В', 0x80));
grprows.push(new grprow(1, 'Живлення ~220, В', '~220, В', 65536 << 15));
grprows.push(new grprow(0, 'Aкумулятор, В', 'АК, В', 0x1));
grprows.push(new grprow(0, 'Aкумулятор зов., В', 'AKз, В', 0x400));
grprows.push(new grprow(1, 'Дельта', 'Дельта', 65536 << 13));
grprows.push(new grprow(1, 'Додатковий поріг', 'Д.пор', 65536 << 14));
grprows.push(new grprow(0, 'Рівень GSM', 'GSM', 65536 << 16));



function getbitCount(value) {
    var cnt = 0;
    for (i = 0; i < 16; i++) {
        if (value & (1 << i))
            cnt++;
    }
    return cnt;
}

function init_tblfirst_tbleft(firsttime = false) {
    var rowamount = 1; //textnames.length; // 8;
    var mask32 = 0;
    if (lastsavedDevicesObject) {
        // var dev = lastsavedDevicesObject.arrdev.find(x => x.Id == Id);
        // if (dev) {

        //     var abits = getbitCount(dev.inpmask & 0x07ff);
        //     var dbits = getbitCount(dev.bitmask & 0xe23e);
        //     rowamount = 1 + 1 + getbitCount(dev.inpmask & 0x07ff) + getbitCount(dev.bitmask & 0xe23e);
        //     // var fff = dev.bitmask << 16;

        //     mask32 = ((dev.bitmask << 16) & 0xe23e0000) | (dev.inpmask & 0x07ff);
        //     if (vismode == 4) {
        //         rowamount = 1 + 1 + getbitCount(0x07ff) + getbitCount(0xe23e);
        //         mask32 = 0xe23e0000 | (0x07ff);
        //     }
        //     // mask32 = ((dev.bitmask << 16) & 0xffff0000) | (dev.inpmask & 0xffff);
        //     var dummy7 = 7;
        // }

        // else 


        { // for allgrp
            devs = lastsavedDevicesObject.arrdev.Where(x => x.binarytype == 0x40);

            if (sert)
                if (sert.customs)
                    if (sert.customs.devlist) {
                        if (sert.customs.devlist.length > 0)
                            devs = devs.Where(x => sert.customs.devlist.includes(x.Id));

                    }

            var abits = 0;
            devs.forEach(x => abits |= x.inpmask);

            var dbits = 0;
            devs.forEach(x => dbits |= x.bitmask);
            mask32 = ((dbits << 16) & 0xe23e0000) | (abits & 0x07ff) | (1 << 32);
            var dummy = 0;

        }

        //use user masks

        var ty = sert;



    }


    rowamount = 3;
    for (i = 0; i < 32; i++) {
        if (mask32 & (1 << i))
            rowamount++;


    }



    // ----------- длинная левая таблица с названиями параметров tbfirst

    if (!tbfirst) {
        tbfirst = new jsTable('fff', rowamount, 1, 'ftable', 'row', 'tmpgridsquare');
        tbfirst.style.marginRight = '3px';
        tbfirst.style.cursor = 'pointer';
        // tbfirst.style.minWidth = '10vw';
        tbfirst.cell(0, 0).addEventListener('click', toggle_sizeinfo);
    }



    tbfirst.setrows(rowamount);



    //
    var k = 0;
    for (i = 0; i < grprows.length; i++) {
        var grow = grprows[i];
        var icell = tbfirst.cell(k, 0);
        var needstyle = false;

        if ((i < 2) || (i == grprows.length - 1)) {
            needstyle = true;
        } else if (grow.bit & mask32) {
            needstyle = true;
        }


        if (needstyle) {
            icell.innerText = grow.longname;
            var istyle = icell.style;
            istyle.minWidth = _firstminwidth;
            istyle.paddingLeft = _firstpadddingleft;
            icell.style.textAlign = 'left';
            icell.style.color = 'rgb(0,220,220)'; //    i == 0 ? 'cyan' : 'rgb(100,180,180)';
            if (i >= 2)
                icell.style.color = bluewhite;
            // istyle.lineHeight = _lineheight;
            istyle.fontSize = _fontsize;
            if (i == 0)
                istyle.color = 'rgb(200,200,200)';
            k++;

        }
    }



    // ------------------ короткая левая таблица  tbleft

    if (!tbleft) {
        tbleft = new jsTable('sss', rowamount, 1, 'atable', 'row', 'tmpgridsquare');
        tbleft.cell(0, 0).addEventListener('click', toggle_sizeinfo);
        // var tbleft = new jsTable('sss', params.rows, 1, 'atable');
        // tbleft.style.minWidth = '10px';
        tbleft.style.marginRight = '3px';
        // tbleft.style.minWidth = '10vw';
    }
    tbleft.setrows(rowamount);


    k = 0;
    for (i = 0; i < grprows.length; i++) {
        var grow = grprows[i];
        var icell = tbleft.cell(k, 0);
        var needstyle = false;

        if ((i < 2) || (i == grprows.length - 1)) {
            needstyle = true;
        } else if (grow.bit & mask32) {
            needstyle = true;
        }


        if (needstyle) {
            icell.innerText = grow.name;
            var istyle = icell.style;
            istyle.minWidth = _leftwidth;
            istyle.paddingLeft = _firstpadddingleft;
            icell.style.textAlign = 'left';
            icell.style.color = 'rgb(0,220,220)'; //    i == 0 ? 'cyan' : 'rgb(100,180,180)';
            if (i >= 2)
                icell.style.color = bluewhite;
            // istyle.lineHeight = _lineheight;
            istyle.fontSize = _fontsize;
            if (i == 0)
                istyle.color = 'rgb(200,200,200)';
            k++;

        }
    }

    //  в первый раз
    if (firsttime) {
        if (div = document.getElementById('a1'))
            div.innerText = ''; //Id = ' + Id;
        if (div = document.getElementById('a4'))
            div.innerText = '- дані оновлюються...';
    }


}


init_tblfirst_tbleft(true);


function set_tblstyles() {
    tbl.rows.forEach(row => {
        var array = Array.from(row.children); // Array from HTMLCollection
        var ind = tbl.rows.indexOf(row);
        array.forEach(cell => {
            if (ind == 0) {
                cell.className = 'tmpgridsquare';
                cell.style.color = 'rgb(0,220,220)';
                cell.style.fontSize = '16px';
            } else {
                cell.className = 'tmpdatacell'; // cell.className = 'tmpgridsquare';
                // cell.style.color = 'rgb(0,200,50)';
                // var t = icell.classList;
                // t = cell.classList;

                // var istyle = icell.style;
                // row.children[i].style.lineHeight = '30px';
                // istyle.lineHeight = _lineheight;
                cell.style.fontSize = _fontsize;

                // icell.style.border = '1px solid blue';
                // icell.style.boxShadow = '';

            }
            // cell.style.minWidth = '120px';
        });
    });
}



if (true) { // (!params) {

    var tbl = new jsTable('sss2', tbleft.rowCount, 1, 'btable', 'row', 'tmpdatacell'); //                    'tmpgridsquare');
    tbl.style.overflowX = 'auto';
    if (tbl) {
        tbl.rows.forEach(row => {
            Array.from(row.children).forEach(cell => {
                cell.className = 'tmpdatacell'; //   'tmpgridsquare';
                var t = cell.classList;
                // cell.style.lineHeight = getGlobalProp('--cell-common-lineheight') 
                // cell.style.lineHeight = 'var(--cell-common-lineheight)');
            });
        });
    }
    set_tblstyles();

}

if (false) {
    // if (true) {
    //
    var len = Math.min(params.colnames.length, params.rows);

    /// основная таблица
    // var tbl = new jsTable('sss2', params.rows, params.cols, 'btable');
    // tbl = new jsTable('sss2', params.rows, 20, 'btable', {
    //     cellclass: 'tmpgridsquare'
    // });

    var tbl = new jsTable('sss2', params.rows, params.cols, 'btable', 'row', 'tmpgridsquare');
    // tbl = new jsTable({
    //     idname: 'vvv',
    //     _rows: 8,
    //     _cols: 20,
    //     where: 'btable',
    //     rowclass: 'row'
    //     cellclass: 'tmpgridsquare',
    // });
    tbl.style.overflowX = 'auto'; //        'auto';


    // if (tbl) {
    //     tbl.rows.forEach(row => {
    //         Array.from(row.children).forEach(cell => {
    //             // cell.style.lineHeight = 'var(--cell-common-lineheight)'
    //             cell.className = 'tmpgridsquare';
    //             var t = cell.classList;
    //         });
    //     });
    // }


    // tbl.setMinWidth([200, 3, 4]);

    // tbl.style.background = 'blue';
    // tbl.tabl.style.maxWidth = 'calc(98vw - 78px)';
    // tbl.tabl.style.width = '80vw';
    // tbl.style.width = '500px';


    // var len = Math.min(params.colnames.length, params.rows);
    // for (i = 0; i < len; i++) {
    //     tbl.cell(i, 0).innerText = params.colnames[i];

    // }



    //Вариант 1.  (работает) красим колонку:
    // var icolumn = tbl.columnCells(2);
    // icolumn.forEach(cell => {
    //     cell.style.background = 'darkslategrey';
    // });

    //********************  Покраска строки и столбца - рабочая 
    // tbl.columnCells(2).forEach(cell => cell.style.background = 'red');
    // tbl.rowCells(3).forEach(cell => cell.style.background = 'green');
    //********************************************************* 

    tbl.rows.forEach(row => {

        /* for (i = 0; i < row.childElementCount; i++) {
             var icell = row.children[i]; */

        var array = Array.from(row.children); // Array from HTMLCollection
        //            array
        // acnt = 0;
        array.forEach(icell => {
            var t = icell.classList;
            icell.className = 'tmpgridsquare';
            t = icell.classList;

            var istyle = icell.style;
            // row.children[i].style.lineHeight = '30px';
            // istyle.lineHeight = _lineheight;
            istyle.fontSize = _fontsize;
            istyle.minWidth = '120px';
            // icell.style.border = '1px solid blue';
            // icell.style.boxShadow = '';
            // acnt++;

        });

        // if (tb.indexOf(row) == 0) {
        if (tbl.rows.indexOf(row) == 0) {
            array.forEach(cell => {

                cell.style.color = 'rgb(0,220,220)';
                cell.style.fontSize = '16px';
                // cell.className = 'tmpdatacell';
            });
        } else array.forEach(cell => {
            // cell.className = 'tmpgridsquare';
            // cell.style.color = 'rgb(0,200,50)';

            cell.className = 'tmpdatacell'; //             'tmpgridsquare';
        });
    });

    // Array.from(tb[0].children).forEach(cell => {
    //     cell.style.color = 'rgb(0,220,220)';
    // });


    if (true) {
        // var dev = JSON.parse(params.devjson);
        dev = params.devjson;
        // var text = dev.inventory_name + ', ...' + dev.description + '\n' +
        //     dev.address + '\n';

        // if (document.getElementById('msg')) {
        //     msg.innerText = text;
        // }
        if (a1 = document.getElementById('a1')) {
            a1.innerHTML = "<div>inv# " + dev.inventory_name + ',' +
                "<span style='font-size:22px;padding-left:20px;color:white;'>" + dev.description + "</span></div>";
        }
        if (a4 = document.getElementById('a4'))
            a4.innerText = dev.address;
        mydescription = dev.description;
        document.title = mydescription;
        // document.title.style.background = 'yellow';
        // title.style.color = 'blue';
    }

}


// First time reading data


var ggggg = Object.keys(localStorage).Where(x => x.includes('tmpp'));



var tmp = localStorage.getItem('tmppw');

console.log('tmpgrp.js: after localstorage=' + myperf());
var sert = '';

if (tmp)
    if (isJSON(tmp)) {
        sert = JSON.parse(tmp);
    }
console.log('tmpgrp.js: after JSON.parse=' + myperf());
// if (        /*      (    !location.search.includes('device_Id=')) ||   */
//     (!location.search.includes('uca9iaug1efqflqeg6iviyVUfyv3kYtgvVyfTdttu685t8p97t'))) {
//     sert = '';
// }
var cmdobj = {
    type: '_wsocket', //                  'nodedata', //           '_wsocket',
    caller: 'allgrp',
    ObjectType: CmdType.GetUserParams,
    // devnumbers: [],
    // id: Id, //   myid,
    description: mydescription,
    // newcount: 4, // new_count,
    sertif: sert.sertif,
    totalid: sert.totalid
}

bc.postMessage(cmdobj);
console.log('----------------------- GetUserParams');

// sendCmd(cmdobj);
// cmdobj.type = "_wsocket";
// cmdobj.caller = "main";
browserSendTime = new Date();
browserSend_ms = performance.now(); //    new Date().getTime();
var send_ms_flag = false;



console.log('tmpgrp.js: before Date()=' + myperf());

var tm = new Date().getTime();



function refresh_lastgrpdata() {
    var ind = document.getElementById('itp').selectedIndex;

    // if (ind < 4) {
    //     var wcnt = 1;
    //     if (ind == 1) wcnt = 10;
    //     else if (ind == 2)
    //         wcnt = 50;
    //     else if (ind == 3)
    //         wcnt = 200;



    var cmdobj = {
        type: '_wsocket',
        caller: 'allgrp',
        ObjectType: CmdType.GetLastGrpData,
        // id: Id, //myid,
        // description: mydescription,
        newcount: 1, //wcnt,
        sertif: sert.sertif
    }

    browserSendTime = new Date();
    browserSend_ms = performance.now();
    send_ms_flag = true;
    bc.postMessage(cmdobj);
    console.log('----------------------- refresh_lastgrpdata()');
    // }
}



function onwinfocus() {
    // refresh_data();
}

function onwinblur() {

}

var playenabled = true;


function setspeakerstyle(value) {
    let div = document.querySelector('.speaker');
    if (value) {
        div.style.webkitFilter = '';
        div.style.filter = '';
    } else {
        div.style.webkitFilter = 'invert(40%)';
        div.style.filter = 'invert(40%)';
        stop_play();

    }
}

function speaker() {
    playenabled = !playenabled;

    localStorage.setItem('playenabled', playenabled);

    setspeakerstyle(playenabled);
}

window.onload = (() => {
    let ply = localStorage.getItem('playenabled');
    playenabled = ply == 'true' ? true : false;
    setspeakerstyle(playenabled);

    var nav = window.navigator.userAgent.includes('Mobile');
    if (nav) {
        if (div = document.querySelector('.dashheader'))
            div.style.display = 'none';
        if (dd = document.querySelector('.acontainer'))
            dd.style.marginTop = '2px';


    }
    if (!nav) {
        var pc_color = getrootProp('--pc-background');
        setGlobalProp('--common-background', pc_color);


    }


    if (tmp = localStorage.getItem('tmppw')) {
        var sert = '';

        if (isJSON(tmp)) {
            sert = JSON.parse(tmp);

            if (false) {
                var tmplen = tmp.length;
                var compressed = LZString.compressToUTF16(tmp);
                localStorage['compressed'] = compressed;
                var compressed2 = localStorage.getItem('compressed');
                var destring = LZString.decompressFromUTF16(compressed2);
                var comprlen = compressed.length;

                var vobj = {

                    n: 1,
                    aaa: compressed,
                    bbb: 'string'

                };
                var seri_zed = JSON.stringify(vobj);
                var objrestored = JSON.parse(seri_zed);
            }


            var user = sert.iuser;
            if ((user.login != 'user1') && (user.login != 'user5')) {

                // x.style.display = 'block';
                var seldiv = document.querySelector('#itp');

                if (seldiv) {
                    seldiv.selectedIndex = 0;


                    var opt = seldiv.options;
                    var one = Array.from(opt).find(x => x.innerText.includes('лаштув'));

                    // var ttt = seldiv.options.item(seldiv.options.length - 1);

                    seldiv.options[4].remove();
                    // one.disabled = true;
                    var e = 3;

                }
            }
        }
    }
    send_ms_flag = true;
    bc.postMessage(cmdobj);
    window.onfocus = onwinfocus;
    window.onblur = onwinblur;

    // setTimeout(() => {
    if (tbl.rowCount < 4)
        refresh_lastgrpdata();
    // }, 18);
});







on_resize();

console.log('tmpgrp.js: after onresize=' + myperf());


function selperiod(evt) {



}


let usermenu = false;

var forceShowEmptyBlocks = false;

function onselmenu(evt) {
    usermenu = !usermenu;
    forceShowEmptyBlocks = !forceShowEmptyBlocks

    evt.target.style.background = forceShowEmptyBlocks ? 'blue' : '';



    _fillallgrp(last_objgrp);
    // refresh_data();
}





function selhandler(evt) {
    // var ddd = this.innerText;
    var ind = evt.selectedIndex;
    var option = evt.selectedOptions[0];
    // set_tblRowAmount(1 + ind * ind * 3);
    vismode = 0;
    var new_count = 1;
    switch (ind) {
        case 0:
            new_count = 1;
            break;
        case 1:
            new_count = 10;
            break;
        case 2:
            new_count = 50;
            break;
        case 3: // Параметри вузла
            {
                new_count = 200;
                // vismode = 4;
                break;


            }
        case 4: // Налаштування параметрів
            {
                new_count = 2;
                vismode = 3;
                break;
            }
        case 5: // Налаштування параметрів
            {
                new_count = 6;
                vismode = 4;
                break;
            }

        case 33:
            // new_count = 64;
            var eee = evt.options;
            if (eee[0].innerText.includes('Поточні')) {

                eee[0].label = '• Архів';

                eee[1].label = '• за добу';
                eee[2].label = '• за інтервал';
                eee[3].label = '• Поточні дані';

            } else {
                eee[0].label = '• Поточні дані';

                eee[1].label = '• 10 останніх записів';
                eee[2].label = '• 50 останніх записів';
                eee[3].label = '• Архів';

            }



            eee.selectedIndex = 0;
            var r = 0;

            break;



        default:
            new_count = 128;
            break;

    }


    // tbl.setColumns(new_count);


    var t1 = performance.now();
    tbl.maxcolCount = new_count > 0 ? new_count : 1;
    tbl.setColumns(new_count > 0 ? new_count : 1);
    // if (new_count > 1)
    //     tbl.rows().forEach(row => row.style.gridTemplateColumns = '1fr 1fr 1fr');
    var t2 = performance.now();
    set_tblstyles();
    var t3 = performance.now();

    _fillallgrp(last_objgrp);

    var t4 = performance.now();
    console.log('[setcolumns]: ' + 'set: ' + (t2 - t1).toFixed(1) + ' style:' + (t3 - t2).toFixed(1) +
        ' fill:' + (t4 - t3).toFixed(1));
    evt.blur();
    // setmode(evt.selectedIndex);


    // var obj = new Object({ type: 'node', id: myid, description: mydescription, newcount: new_count });
    // bc.postMessage(obj);

    var tmp = localStorage.getItem('tmppw');
    var sert = '';
    if (tmp)
        if (isJSON(tmp)) {
            sert = JSON.parse(tmp);
        }
    if ((!location.search.includes('device_Id=')) ||
        (!location.search.includes('uca9iaug1efqflqeg6iviyVUfyv3kYtgvVyfTdttu685t8p97t'))) {
        sert = '';
    }

    /*
    if ((vismode == 3) || (vismode == 4)) {
        var cmdobj = {
            type: '_wsocket',
            caller: 'node',
            ObjectType: CmdType.GetNodeParams,
            id: myid,
            description: mydescription,
            newcount: new_count,
            sertif: sert.sertif
        }
 
        browserSendTime = new Date();
        browserSend_ms = t1; //performance.now(); //    new Date().getTime();
        send_ms_flag = true;
        // bc.postMessage(cmdobj);
    }
    else {
 
        */

    var cmdobj = {
        type: '_wsocket',
        caller: 'node',
        ObjectType: CmdType.GetNodeData,
        // devnumbers: [],
        id: myid,
        description: mydescription,
        newcount: new_count,
        sertif: sert.sertif
    }

    // sendCmd(cmdobj);
    // cmdobj.type = "_wsocket";
    // cmdobj.caller = "main";
    browserSendTime = new Date();
    browserSend_ms = t1; //performance.now(); //    new Date().getTime();
    send_ms_flag = true;
    bc.postMessage(cmdobj);

}

//Налаштування...
var nal = document.getElementById('anim');
nal.addEventListener('click', nalasht_handler);
tbleft.tabl.addEventListener('click', nalasht_handler);
tbfirst.tabl.addEventListener('click', nalasht_handler);


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



function openPageUniversal(e) {
    var tmaxobj = new Object({
        type: "tmax=300"
    });
    bc.postMessage(tmaxobj);
    var div = e.currentTarget;

    switch (div.innerText) {
        case 'Карта':
            {
                var mapcloseobj = new Object({
                    type: "map=close()"
                });
                bc.postMessage(mapcloseobj);
                var path = '../index2.html?map=force';
                path += '?map=force&pw="uca9iaug1efqflqeg6iviyVUfyv3kYtgvVyfTdttu685t8p97t"';
                // var ewin = window.open('../index2.html?map=force', 'mapwindow');
                // window.name = 'ttt';
                // var ewin = window.open(path, 'mapwindow');
                // var etmp = window.open(location.href);
                var ewin = window.open(path); //, '_self'); //, 'mapwindow');
                // ewin.blur();
                // ewin.focus();
                // window.close();
                // setTimeout(() => ewin.focus(), 10);

                // function open_in_new_tab(url) {
                //     var win = window.open(url, '_blank');
                //     win.focus();
                // }
                //
                // t.href = 'http://' + location.host + '/data/index2.html';
                // t.href += '?map=force&pw="uca9iaug1efqflqeg6iviyVUfyv3kYtgvVyfTdttu685t8p97t"';

                break;
            }
        case 'Дані ГРП':
            {
                return;

                e.stopPropagation();
                e.currentTarget.innerText = 'Сторінка у розробці';
                var cc = e.currentTarget;
                setTimeout(() => {

                    cc.innerText = 'Дані ГРП';


                }, 600);
                // bc.postMessage('alarms' + '=close()');

                // ewin = window.open('../pagealarms/alarms.html');
                break;
            }

        case 'Архів':
            {
                // bc.postMessage('allgrp=close()');
                // ewin = window.open('allgrp/allgrp.html');




                // var srctext = div.innerText;
                // e.stopPropagation();
                // e.currentTarget.innerText = 'Сторінка у розробці';
                // var cc = e.currentTarget;
                // setTimeout(() => {
                //     cc.innerText = srctext;
                // }, 600);

                bc.postMessage('archive=close()');
                ewin = window.open('../archive/archive.html');
                break;
            }

        default:
            // var dev = devchk.answDevices.filter(x => x.Id == Id)[0];
            // log('Click on dev.Id=' + Id + '...cnt:' + on_cnt++);
            // bc.postMessage(dev.description + '=close()');


            if (div.innerText.includes('надо_редактировать')) {
                var n = div.innerText.indexOf('=');
                if (n > 0) {
                    var sss = div.innerText.slice(n + 1);
                    if (sss) {
                        var id = parseInt(sss);
                        bc.postMessage(div.innerText + '=close()');
                        ewin = window.open('../pages/tmpgrp.html?device_Id=' + id + '&pw="uca9iaug1efqflqeg6iviyVUfyv3kYtgvVyfTdttu685t8p97t"');
                        //
                    }
                }
            } else {
                var vvv = last_arrdev.Where(x => x.description.trim() == div.innerText);

                if (vvv && vvv.length > 0)
                    vvv = vvv[0];
                else
                    vvv = null;

                if (vvv) {
                    if (vvv.description.trim() != mydescription.trim()) {
                        bc.postMessage(div.innerText + '=close()');
                        ewin = window.open('../pages/tmpgrp.html?device_Id=' + vvv.Id + '&pw="uca9iaug1efqflqeg6iviyVUfyv3kYtgvVyfTdttu685t8p97t"');
                    }
                }
            }


            break;


    }



}


let archivemode = 0;

function showmode(event) {
    archivemode = archivemode == 0 ? 1 : 0;
    var a2 = document.getElementById('a2');
    a2.innerText = archivemode == 0 ? 'Поточні' : 'Архівні';
    // init_tblfirst_tbleft();


}



var showleds = localStorage.getItem('showleds') == 'true' ? true : false;



function ind_handler(ev) {

    showleds = !showleds;
    localStorage.setItem('showleds', showleds);
    _showleds();
}

function _showleds() {
    indval = document.querySelector('.indvalue');

    var nsec = (0.001 * (Date.now() - Trefresh)).toFixed();


    // var nstr = '';

    // var secnsec / 60;

    // nstr = (nsec / 60).toFixed(0) + ':' + ( (nsec%60) < 10 ? '0' + nsec : nsec);


    indval.innerHTML = `<span class=secamount >` + nsec + 'c' + '</span>';

    if (nsec > 35)
        nsec = 35;
    // var len = indval.childElementCount;

    // while (indval.childElementCount < (nsec + 1))

    if (showleds)
        for (var k = 0; k < nsec; k++) {
            var led = document.createElement('div');
            led.className = 'indled';
            // if (k > 22)
            //     led.style.background = 'red';
            // else if (k > 18)
            //     led.style.background = 'yellow';
            if (nsec >= 35)
                led.style.background = 'yellow';
            indval.appendChild(led);

        }
    else {
        while (indval.childElementCount > 2)
            indval.remove(indval.lastChild);
    }
}

// Indicator
setInterval(() => _showleds(), 1000);

function stop_play() {
    var sound = document.querySelector('#siren'); //   .stop();
    sound.pause();
    sound.currentTime = 0;
}

function _play() {
    var playPromise = document.querySelector('#siren').play();
    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise !== undefined) {
        playPromise.then(function() {
            // Automatic playback started!
            var b = 0;
        }).catch(function(error) {
            // Automatic playback failed.
            // Show a UI element to let the user manually start playback.
            c = 7;
        });
    }
}



setInterval(() => {
    return;
    var playPromise = document.querySelector('#siren').play();
    // var playPromise = document.querySelector('#myAudio').play();
    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise !== undefined) {
        playPromise.then(function() {
            // Automatic playback started!
            var b = 0;
        }).catch(function(error) {
            // Automatic playback failed.
            // Show a UI element to let the user manually start playback.
            c = 7;
        });
    }

    if (false) {

        // play('myAudio', true);
        if (ddd = document.getElementById('myAudio')) {

        }
    }


}, 5000);