


function fillgrp_params_feedback_555(obj) {
  if (!obj)
    return;
  var _t1 = performance.now();

  var idev = obj.devlist.find(x => x.Id == Id);
  if (idev) {
    lastsavedDevicesObject = new Object();
    lastsavedDevicesObject.arrdev = obj.devlist;
    init_tblfirst_tbleft();
  }
  if (tbfirst.rowCount != tbl.rowCount)
    tbl.setrows(tbfirst.rowCount);



  var lastmeasured = obj.arrgrp.sort((a, b) => Date.parse(b.mcu_datetime) - Date.parse(a.mcu_datetime));

  // tbleft.cell(0, 0).innerText = 'Устав.';
  // tbfirst.cell(0, 0).innerText = 'Уставка';
  var backcolor = 'rgb(70,70,70)';
  var color = 'rgb(230,230,230)';

  var bordercol = ' ' + 'rgb(160,160,160)';

  if (vismode == 3)
    tbl.rows.forEach(row => {
      // row.style.gridTemplateColumns = '0.4fr repeat(' + (tbl.colCount - 1).toString() + ', 1fr)';

      // row.style.gridTemplateColumns = '0.5fr repeat(' + (tbl.colCount - 1).toString() + ', 1fr)';
      // row.children[0].style.minWidth = '80px';
      row.children[0].innerText = 'xxx';
      if (tbl.rows.indexOf(row) == 0) {
        row.children[0].innerText = 'Поріг1';
        row.children[1].innerText = 'Поріг2';


        row.children[0].style.background = backcolor;
        row.children[1].style.background = backcolor;


        row.children[0].style.color = color;
        row.children[1].style.color = color;
      }
      else if (tbl.rows.indexOf(row) == 1) {
        row.children[0].innerText = '12';
        row.children[1].innerText = '5';

        // var gradient = 'linear-gradient(to bottom , grey, rgb(230,230,230)';
        var gradient = 'linear-gradient(to bottom , rgb(100,100,100), rgba(150, 210, 140, 0.95)';
        row.children[0].style.background = gradient;
        row.children[1].style.background = gradient;


        row.children[0].style.color = 'black';
        row.children[1].style.color = 'black';

      }
    });
  else if (vismode == 4)
    tbl.rows.forEach(row => {
      row.style.gridTemplateColumns = '0.4fr 0.4fr 0.4fr repeat(' + (tbl.colCount - 3).toString() + ', 1fr)';
      row.children[0].style.minWidth = '65px';
      row.children[1].style.minWidth = '65px';
      row.children[2].style.minWidth = '65px';
      // row.children[0].innerText = '0';

      // row.children[1].style.minWidth = '100px';
      // row.children[2].style.minWidth = '100px';
      for (i = 3; i < tbl.colCount; i++) {
        row.children[i].style.minWidth = '90px';
      }

      if (tbl.rows.indexOf(row) == 0) {
        row.children[0].innerText = 'Прилад';
        row.children[1].innerText = 'Адмін.';
        row.children[2].innerText = 'Корист.';
        row.children[3].innerText = 'Дані';
        row.children[4].innerText = 'Поріг1';
        row.children[5].innerText = 'Поріг2';

        for (i = 0; i < tbl.colCount; i++) {
          row.children[i].style.color = color;
          row.children[i].style.background = backcolor;
          if (i < tbl.colCount - 1)
            row.children[i].style.borderRight = '1px solid ' + 'rgb(90,90,90)';
        }
        var b = 0;
      }
      else if (tbl.rows.indexOf(row) == 1) {
        row.children[0].innerText = String.fromCodePoint(10003);  //галочка
        row.children[1].innerText = String.fromCodePoint(10003);  //галочка
        row.children[2].innerText = String.fromCodePoint(10003);  //галочка
        // row.children[1].innerText = '12';
        // row.children[2].innerText = '5';

        // var gradient = 'linear-gradient(to bottom , grey, rgb(230,230,230)';
        var gradient = 'linear-gradient(to bottom , rgb(100,100,100), rgba(150, 210, 140, 0.95)';
        for (i = 0; i < tbl.colCount; i++) {
          row.children[i].style.background = gradient;
          row.children[i].style.color = 'black';
          row.children[i].style.borderRight = '1px solid ' + bordercol;
          if (tbl.rowCount > 2) {
            row.children[i].style.borderRadius = '';

          }

          if (tbl.rowCount > 2) {
            row.children[0].style.borderRadius = '';
            row.children[1].style.borderRadius = '';
            row.children[2].style.borderRadius = '';

          }
        }
      }

    });

  if (!obj.parlist)
    return;

  var parlist = obj.parlist.Where(x => x.device_id == Id);
  if (parlist.length > 0) {
    var par = parlist[0];
    var por1 = [], por2 = [];

    // por1.push(5);
    por1.push(par.ak_v1);
    por1.push(par.p1_v1);
    por1.push(par.p3_v1);
    por1.push(par.gas_v1);
    por1.push(par.psk1_v1);
    por1.push(par.t1_v1);
    por1.push(par.t2_v1);
    por1.push(par.ez_v1);
    por1.push(par.p2_v1);
    por1.push(par.psk2_v1);
    por1.push(par.akz_v1);

    // por2.push(12);
    por2.push(par.ak_v2);
    por2.push(par.p1_v2);
    por2.push(par.p3_v2);
    por2.push(par.gas_v2);
    por2.push(par.psk1_v2);
    por2.push(par.t1_v2);
    por2.push(par.t2_v2);
    por2.push(par.ez_v2);
    por2.push(par.p2_v2);
    por2.push(par.psk2_v2);
    por2.push(par.akz_v2);


    var col = tbl.colCount;



    // Light = 'rgba(230, 230, 230, 0.95)';
    Light = 'rgba(150, 210, 140, 0.95)';
    // Light = 'rgba(200,230,210, 0.95)';
    var Grey = 'rgb(45,45,53)';
    var Red = 'rgba(255,70,0,0.7)'; //    'rgba(255,70,0,0.7)';

    var i = 0;
    var dev = obj.devlist.Where(x => x.Id == Id);
    if (dev.length > 0) {

      var admin_inp = 65535;
      var user_inp = 65535;


      var ainp = dev[0].inpmask; // & dev[0].inp_flags;

      var k = 2;
      var rc = tbl.rowCount;

      if (vismode == 4) {
        if (lastmeasured.length > 0) {
          // filledit(tbl.cell(1, col - 2), 12);
          // filledit(tbl.cell(1, col - 1), 5);
          var j = 1;
          var item = lastmeasured[0];

          tbl.cell(j++, col - 3).innerText = item.csq_level.toFixed(0);
          tbl.cell(j++, col - 3).innerText = item.ak.toFixed(2);
          tbl.cell(j++, col - 3).innerText = item.p1.toFixed(2);
          tbl.cell(j++, col - 3).innerText = item.p3.toFixed(0);
          tbl.cell(j++, col - 3).innerText = item.gas.toFixed(2);
          tbl.cell(j++, col - 3).innerText = item.psk1.toFixed(2);
          tbl.cell(j++, col - 3).innerText = item.t1.toFixed(2);
          tbl.cell(j++, col - 3).innerText = item.t2.toFixed(2);
          tbl.cell(j++, col - 3).innerText = item.ukz.toFixed(2);
          tbl.cell(j++, col - 3).innerText = item.p2.toFixed(2);
          tbl.cell(j++, col - 3).innerText = item.psk2.toFixed(2);
          tbl.cell(j++, col - 3).innerText = item.akext.toFixed(2);
          //0xe23e                //0xe63f
          // tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x0001 ? 1 : '-';  //ПСК1
          tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x0002 ? 1 : '-';     //ПЗК1
          tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x0004 ? 1 : '-';     //Дв_1
          tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x0008 ? 1 : '-';     //Дв_2    
          tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x0010 ? 1 : '-';     //Дв_3
          tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x0020 ? 1 : '-';     //Дв_4
          tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x0100 ? 1 : '-';     //ПЗК2
          // tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x0200 ? 1 : '-';     //ПСК2
          tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x0010 ? 1 : '-';     //Дельта
          tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x4000 ? 1 : '-';     //Додат.поріг
          tbl.cell(j++, col - 3).innerText = idev.bitmask & 0x8000 ? 1 : '-';     //Живл.220
        }





        tbl.cell(1, col - 2).innerText = 12;
        tbl.cell(1, col - 1).innerText = 5;
      }



      por1.forEach(elem => {
        if (k < rc) {
          if (vismode == 4) {
            tbl.row(k).style.gridTemplateColumns = 'repeat(0.4fr,3) repeat( 1fr, 3)';
            tbl.cell(k, 1).style.display = '';
            // tbl.cell(k, 3).style.fontStyle = 'oblique';
          }
          for (n = 0; n < tbl.colCount; n++) {

            tbl.cell(k, n).style.background = Light;
            tbl.cell(k, n).style.borderRadius = '';
            tbl.cell(k, n).style.borderRight = '1px solid ' + bordercol;
          }

          // tbl.cell(k, col - 2).style.borderRight = '1px solid' + bordercol;
          // tbl.cell(k, 0).style.borderRight = '1px solid' + bordercol;
          if ((ainp & (1 << i)) || (vismode == 4)) {

            if (vismode == 4) {
              var val = por1[i] < 10 ? por1[i].toFixed(2) : por1[i];
              filledit(tbl.cell(k, col - 2), val);
              var valm = por2[i] < 10 ? por2[i].toFixed(2) : por2[i];
              filledit(tbl.cell(k, col - 1), valm);
            }
            else {
              if (por1[i] < -999)
                tbl.cell(k, col - 2).innerText = '---';
              else
                tbl.cell(k, col - 2).innerText = por1[i] < 10 ? por1[i].toFixed(2) : por1[i];

              if (por2[i] < -999)
                tbl.cell(k, col - 1).innerText = '---';
              else
                tbl.cell(k, col - 1).innerText = por2[i] < 10 ? por2[i].toFixed(2) : por2[i];
            }


            if (vismode == 4) {
              fillcheckbox(tbl.cell(k, 0), ainp & (1 << i));
              fillcheckbox(tbl.cell(k, 1), admin_inp & (1 << i));
              fillcheckbox(tbl.cell(k, 2), user_inp & (1 << i));
              //old variant
              // tbl.cell(k, 0).innerText = ainp & (1 << i) ? 1 : 0;
              // tbl.cell(k, 0).style.background = Light;
            }
            k++;
          }
        }

        i++;
      });



      //discret flags
      // var dinp = item.bit_flags & dev.bitmask & 0xe63f;
      var dinp = dev[0].bitmask & 0xe23e; //0xe63f;

      var admin_bit = 65535;
      var user_bit = 65535;

      // if (dinp)
      //     nodealarm = true;

      i = k;

      // var arr = [0, 1, 2, 3, 4, 5, 9, 10, 13, 14, 15];   //0xe63f
      var arr = [1, 2, 3, 4, 5, 9, 13, 14, 15];   //0xe23e



      function fillcheckbox(vcell, mmm) {
        var input = document.createElement('input');
        input.name = 'name11';
        input.type = 'checkbox';
        input.className = "checkbox-class-name";
        input.checked = mmm == 0 ? false : true;

        // var vcell = tbl.cell(tbl.rowCount - 1, 0);
        if (vcell.childElementCount == 0) {
          vcell.innerText = '';
          vcell.appendChild(input);
        }
      }















      function filledit(vcell, mmm) {
        var input = document.createElement('input');
        input.name = 'name22';
        input.type = 'text';
        input.className = "number-class-name";
        input.maxLength = 12;
        input.value = mmm;

        // input.checked = mmm == 0 ? false : true;

        // var vcell = tbl.cell(tbl.rowCount - 1, 0);
        if (vcell.childElementCount == 0) {
          vcell.innerText = '';
          vcell.appendChild(input);
        }


        return input;

      }




      arr.forEach(j => {

        if (i < tbl.rowCount) {


          if ((dev[0].bitmask & 0xe23e & (1 << j)) && (vismode == 3)) {
            // tbl.row(i).removeChild(tbl.row(i).lastChild);
            tbl.cell(i, col - 1).style.display = 'none';
            tbl.row(i).style.gridTemplateColumns = '1fr';
            tbl.cell(i, 0).innerText = (dinp & (1 << j)) ? 'Активний' : '-';
            tbl.cell(i, 0).style.background = Light;
            i++;

          }











          else if (vismode == 4) {
            // tbl.cell(i, col - 2).style.background = (dinp & (1 << j)) == 0 ? 'white' : 'red';
            tbl.cell(i, col - 2).innerText = (dinp & (1 << j)) ? 'Активний' : '-';
            // tbl.cell(i, col - 1).innerText = (dinp & (1 << j)) != 0 ? 'Активний' : '-';
            tbl.cell(i, col - 1).style.display = 'none';
            tbl.row(i).style.gridTemplateColumns = '0.4fr 0.4fr 0.4fr 1fr 2fr';

            for (n = 0; n < tbl.colCount; n++) {
              if (n < (tbl.colCount - 1))
                tbl.cell(i, n).style.display = '';
              tbl.cell(i, n).style.background = Light;
              tbl.cell(i, n).style.borderRadius = '';
              // if (n == 1)
              //     tbl.cell(i, n).style.display = 'none';
              if (n < tbl.colCount - 1)
                tbl.cell(i, n).style.borderRight = '1px solid ' + bordercol;
            }


            // tbl.cell(i, col - 2).style.color = 'black';
            // tbl.cell(i, col - 2).style.borderRight = '1px solid ' + bordercol;

            // tbl.cell(i, 3).style.fontStyle = 'oblique';

            if (vismode == 4) {
              fillcheckbox(tbl.cell(i, 0), dinp & (1 << j));
              fillcheckbox(tbl.cell(i, 1), admin_inp & (1 << j));
              fillcheckbox(tbl.cell(i, 2), admin_bit & (1 << j));
              // filledit(tbl.cell(i, 3), 3);

              // tbl.cell(i, 0).style.borderRight = '1px solid ' + bordercol;
            }

            i++;
          }


        }

      });




      if (false) {
        arr.forEach(j => {

          if (i < tbl.rowCount) {
            if (((vismode == 3) && (dev[0].bitmask & 0xe63f & (1 << j))) || (vismode == 4)) {
              // tbl.cell(i, col - 2).style.background = (dinp & (1 << j)) == 0 ? 'white' : 'red';
              tbl.cell(i, col - 2).innerText = (dinp & (1 << j)) ? 'Активний' : '-';
              tbl.cell(i, col - 1).innerText = (dinp & (1 << j)) != 0 ? 'Активний' : '-';


              for (n = 0; n < tbl.colCount; n++) {


                tbl.cell(i, n).style.background = Light;
                tbl.cell(i, n).style.borderRadius = '';
                if (n == 1)
                  tbl.cell(i, n).style.display = 'none';

              }


              // tbl.cell(i, col - 2).style.color = 'black';
              tbl.cell(i, col - 2).style.borderRight = '1px solid ' + bordercol;



              if (vismode == 4) {
                fillcheckbox(tbl.cell(i, 0), dinp & (1 << j));
                tbl.cell(i, 0).style.borderRight = '1px solid ' + bordercol;
              }

              i++;
            }


          }

        });
      }

      // var rcw = tbl.rowCells(tbl.rowCount - 1);

      tbl.rowCells(tbl.rowCount - 1).forEach(x => {
        x.style.borderRadius = " 0px 0px 10px 10px";


      });


      // tbl.cell(tbl.rowCount - 1, 0).style.borderRadius = " 0px 0px 10px 10px";
      // tbl.cell(tbl.rowCount - 1, col - 1).style.borderRadius = " 0px 0px 10px 10px";
      // tbl.cell(tbl.rowCount - 1, col - 2).style.borderRadius = " 0px 0px 10px 10px";




      //+++++++++++++++++   R E P L A C E !!! +++++++++++++++++++++++++
      { //replace last cell with select
        // replace:  Varian1.
        // var chng = htbl.row(1).children[3];
        // chng.replaceWith(document.getElementById('itp'));
        //
        /*********** or replace: Variant2   */
        // htbl.row(0).children[htbl.colCount - 1].replaceWith(document.getElementById('itp'));
        // htbl.row(0).children[0].replaceWith(document.getElementById('itp'));

        /************ or replace: Variant3   */
        // htbl.row(1).insertBefore(document.getElementById('itp'), child);
        // htbl.row(1).removeChild(child);
        //----------------------------------------------------------------
      }

      vissav = vismode;
      if (vismode == 4) {

        var input = document.createElement('input');
        input.name = 'name11';
        input.type = 'checkbox';
        input.className = "checkbox-class-name";
        input.checked = true;

        // var children = 
        // var vcell = tbl.cell(tbl.rowCount - 1, 0);
        // if (vcell.childElementCount == 0) {
        //     vcell.innerText = '';
        //     vcell.appendChild(input);
        //     // tbl.cell(tbl.rowCount - 1, 0).innerText = '';
        //     // tbl.cell(tbl.rowCount - 1, 0).appendChild(input);
        // }

        // tbl.cell(tbl.rowCount - 1, 0).replaceWith(input);


        //     <div>
        //     <input class='chkb' type="checkbox" id='scales0' name="scales0" checked>
        //     <label id=lb0 for="scales0">Scales</label>
        // </div>

      }









      var dummyu = 789;
    }

  }

}



var vissav = -1;


function fillgrp_444(obj) {
  if (!obj)
    return;
  var _t1 = performance.now();

  var bbb = obj.devlist.find(x => x.Id == Id);
  if (bbb) {
    lastsavedDevicesObject = new Object();
    lastsavedDevicesObject.arrdev = obj.devlist;
    init_tblfirst_tbleft();
  }


  if ((vismode == 3) || (vismode == 4)) {
    if (vissav != vismode) {
      // vissav = vismode;
      fillgrp_params_feedback(obj);
    }
    colsav = tbl.colCount;
    return;
  }
  vissav = vismode;

  last_objgrp = obj;

  var otype = obj.ObjectType;


  if (otype == CmdType.GetNodeData) {
    var t = 6789;
  }

  var mass = obj.arrgrp.Where(x => x.device_id == Id).
    sort((a, b) => Date.parse(b.mcu_datetime) - Date.parse(a.mcu_datetime));

  var needrefresh = false;

  if (colsav != tbl.colCount) {
    // if (colsav < tbl.colCount)
    needrefresh = true;
    colsav = tbl.colCount;
  }
  // if (mass_sav.length !== mass.length) {

  if (mass_sav.length < mass.length) {
    needrefresh = true;
    mass_sav = mass;
  } else if (!needrefresh) {
    // var et1 = performance.now();
    for (m = 0; m < mass.length; m++) {
      if (!deepEqual(mass[m], mass_sav[m])) {
        needrefresh = true;
        break;
      }

    }
    // var et2 = performance.now();
    // console.log('---------------------- deepEqual... ' + (et2 - et1).toFixed(1));

  }



  var Light = 'linear-gradient(to bottom right, white, rgb(200,200,200)'; //                          
  Light = 'rgba(230, 230, 230, 0.95)';
  var Grey = 'rgb(45,45,53)';
  var Red = 'rgba(255,70,0,0.7)'; //    'rgba(255,70,0,0.7)';



  if (mass.length > 0) {
    if (mass.length < tbl.colCount) {
      needrefresh = true;
      tbl.setColumns(mass.length);
    }
    else if (mass.length > tbl.colCount) {
      needrefresh = true;
      tbl.setColumns(Math.min(mass.length, tbl.maxcolCount));
    }
  }



  if (tbfirst.rowCount != tbl.rowCount)
    tbl.setrows(tbfirst.rowCount);

  var col = 0;
  if (tbl && needrefresh) {

    var nodealarm = false;
    var vmass = mass;
    vmass.forEach(item => {
      var i = 0;

      // setcell = (text, color) => {
      //     tbl.cell(i, 0).innerText = text;
      //     if (color)
      //         tbl.cell(i, 0).style.color = color;
      //     i++;
      // }
      // if (tbl)
      if ((i < tbl.rowCount) && (col < tbl.colCount)) {
        // ДАТА
        var yy = item.mcu_datetime.slice(2, 4);
        var mm = item.mcu_datetime.slice(5, 7);
        var dd = item.mcu_datetime.slice(8, 10);


        if (true) {
          var imonth = parseInt(mm);

          var arr = ['0', 'січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру']

          mm = arr[imonth];

        }

        var BorderColour = 'rgba(140,140,140,0.33)';

        var tim = item.mcu_datetime.slice(11, 16); //    (11, 20);
        var dt_string = dd + ' ' + mm + ' ' + tim;
        // tbl.cell(i, col).style.color = 'rgb(0,220,220)';
        if (i == 0) //andrew_mode
        {
          tbl.cell(i, col).style.background = '#b8b8b8db';//    Light;
          tbl.cell(i, col).style.color = 'black';
          // tbl.cell(i, col).style.background = '#bbbbbb77';//    Light;
          // tbl.cell(i, col).style.color = 'rgb(220,220,220)';
          tbl.cell(i, col).style.borderRight = '1px solid ' + BorderColour;

        }
        tbl.cell(i++, col).innerText = dt_string;

        // var dt_string = dd + '.' + mm + ' ' + "<span style='color:white'>" + tim + '</span>';
        // tbl.cell(i++, col).innerText = dt_string; //item.mcu_datetime.replace('T', ' ').substr(5, 30);

        // if (!lastsavedDevicesObject)
        //     return;
        // var _devs = lastsavedDevicesObject.arrdev.Where(x => x.Id == Id);
        // var _devs = obj.devlist.Where( x=> x.Id == Id);
        var _devs = obj.devlist.Where(x => x.Id == Id);
        var dev = null;
        if (_devs.length > 0)
          dev = _devs[0];

        var ainp = item.inp_flags & dev.inpmask & 0x7ff;
        if (ainp)
          nodealarm = true;


        var avalues = ['dummy'];
        avalues.push(item.ak);
        avalues.push(item.p1);
        avalues.push(item.p3);
        avalues.push(item.gas);
        avalues.push(item.psk1);
        avalues.push(item.t1);
        avalues.push(item.t2);
        avalues.push(item.ukz);
        avalues.push(item.p2);
        avalues.push(item.psk2);
        avalues.push(item.akext);

        // GSM row
        tbl.cell(i, col).style.color = 'black';
        tbl.cell(i, col).style.background = Light;
        tbl.cell(i, col).style.background = 'linear-gradient(to bottom, rgb(150,150,150),rgb(230,230,230))';
        // tbl.cell(i, col).innerText = (item.csq_level * 100 / 31).toFixed(0);
        tbl.cell(i, col).innerText = item.csq_level;
        tbl.cell(i, col).style.borderRight = '1px solid ' + BorderColour;

        //other rows
        var rr = 2;
        for (; i <= 12; i++) {
          // if (i > 0)
          //     tbl.cell(i, col).style.className = 'tmpdatacell';
          var amask = dev.inpmask & (1 << (i - 1)) & 0x7ff;
          if (amask) {
            tbl.cell(rr, col).style.color = 'black';
            tbl.cell(rr, col).style.background = (ainp & (1 << (i - 1))) == 0 ? Light : Red;
            var value = avalues[i];

            // tbl.cell(i, col).innerText = value < 10 ? value.toFixed(1) : value.toFixed(0);
            var aval = Math.abs(value);
            if (value < -999.0)
              tbl.cell(rr, col).innerText = '-';
            else
              tbl.cell(rr, col).innerText = (aval < 10) && (aval > 0) ? value.toFixed(2) : value.toFixed(0);
            // tbl.cell(i, col).style.borderRight = '1px solid rgb(190,190,190)';
            tbl.cell(rr, col).style.borderRight = '1px solid ' + BorderColour;
            rr++;
          }
        }

        //discret flags
        var dinp = item.bit_flags & dev.bitmask & 0xe23e;
        if (dinp)
          nodealarm = true;

        i = rr;

        var arr = [0, 1, 2, 3, 4, 5, 9, 10, 13, 14, 15];

        arr.forEach(k => {
          if (dev.bitmask & 0xe23e & (1 << k)) {
            tbl.cell(i, col).style.background = (dinp & (1 << k)) == 0 ? Light : Red;
            tbl.cell(i, col).innerText = (dinp & (1 << k)) != 0 ? 'Аварія' : 'Норма';
            tbl.cell(i, col).style.color = 'black';
            // tbl.cell(i, col).style.borderRight = '1px solid rgb(190,190,190)';
            tbl.cell(i, col).style.borderRight = '1px solid ' + BorderColour;
            tbl.cell(i, col).style.display = '';
            i++;
          } k++;


        });

        tbl.cell(tbl.rowCount - 1, col).style.borderRadius = " 0px 0px 10px 10px";

      }
      col++;


      var div = document.getElementById('led');
      if (div) {
        if (nodealarm)
          div.className = 'redled';
        else
          div.className = 'greenled';
      }
    });
  }
  var _t2 = performance.now();
  console.log('grp: ' + (_t2 - _t1).toFixed(1) + ", col= " + col + '    xcnt = ' + xcnt++);
}
