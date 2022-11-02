



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
  isdigit = 0;       // 0 - analogue, 1-digital
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


    {  // for allgrp
      devs = lastsavedDevicesObject.arrdev.Where(x => x.binarytype == 0x40);

      var abits = 0;
      devs.forEach(x => abits |= x.inpmask);

      var dbits = 0;
      devs.forEach(x => dbits |= x.bitmask);
      mask32 = ((dbits << 16) & 0xe23e0000) | (abits & 0x07ff) | (1 << 32);
      var dummy = 0;

    }

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
    }
    else if (grow.bit & mask32) {
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
    }
    else if (grow.bit & mask32) {
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
      div.innerText = 'Id = ' + Id;
    if (div = document.getElementById('a4'))
      div.innerText = '- дані оновлюються...';
  }


}


// init_tblfirst_tbleft(true);


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



if (true && tbl) {   // (!params) {

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
  type: '_wsocket',   //                  'nodedata', //           '_wsocket',
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





window.onload = (() => {

  var nav = navigator.userAgent.includes('Mobile');
  if (nav) {
    if (div = document.querySelector('.header'))
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

  setTimeout(() => {
    if (tbl.rowCount < 2)
      refresh_lastgrpdata();
  }, 180);
});




on_resize();

console.log('tmpgrp.js: after onresize=' + myperf());


function selperiod(evt) {

}


let usermenu = false;

function onselmenu(evt) {
  usermenu = !usermenu;
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
    case 3:     // Параметри вузла
      {
        new_count = 200;
        // vismode = 4;
        break;


      }
    case 4:     // Налаштування параметрів
      {
        new_count = 2;
        vismode = 3;
        break;
      }
    case 5:     // Налаштування параметрів
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

      }
      else {
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
        var srctext = div.innerText;
        e.stopPropagation();
        e.currentTarget.innerText = 'Сторінка у розробці';
        var cc = e.currentTarget;
        setTimeout(() => {
          cc.innerText = srctext;
        }, 600);


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