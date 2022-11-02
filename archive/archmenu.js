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




class grprow {
    isdigit = 0; // 0 - analogue, 1-digital
    longname = '';
    name = '';
    bit = 0;

    constructor(dig, lname, _name, mskbit) {
        this.isdigit = dig;
        this.longname = lname;
        this.name = _name;
        this.bit = mskbit;
    }

}


let grprows = [];

// grprows.push(new grprow(0, 'Назва', '.', 0x0));
// grprows.push(new grprow(0, 'Дата та час приладу', 'Дата', 0x0));
grprows.push(new grprow(0, 'P1, кгс/см2', 'P1', 0x2)); //
grprows.push(new grprow(0, 'P2, кгс/см2', 'P2', 0x100)); //
grprows.push(new grprow(0, 'P3, мм.вод.ст.', 'P3', 0x4)); //
grprows.push(new grprow(1, 'ПЗК1', 'ПЗК1', 65536 << 1));
grprows.push(new grprow(1, 'ПЗК2', 'ПЗК2', 65536 << 9));
grprows.push(new grprow(0, 'ПСК1, % об.', 'ПСК1', 0x10)); //
grprows.push(new grprow(0, 'ПСК2, % об.', 'ПСК2', 0x200)); //
grprows.push(new grprow(0, 'Загазованість, % об.', 'Газ', 0x8)); //
grprows.push(new grprow(1, 'Двері_1', 'Дв1', 65536 << 2));
grprows.push(new grprow(1, 'Двері_2', 'Дв2', 65536 << 3));
grprows.push(new grprow(1, 'Двері_3', 'Дв3', 65536 << 4));
grprows.push(new grprow(1, 'Двері_4', 'Дв4', 65536 << 5));
grprows.push(new grprow(0, 'Tемпература1, °С', 'T1', 0x20)); //
grprows.push(new grprow(0, 'Tемпература2, °С', 'T2', 0x40)); //
grprows.push(new grprow(0, 'Езахисту, В', 'Eзах', 0x80)); //
grprows.push(new grprow(1, 'Живлення ~220, В', '~220', 65536 << 15));
grprows.push(new grprow(0, 'Aкумулятор, В', 'АК', 0x1)); //
grprows.push(new grprow(0, 'Aкумулятор зов., В', 'AKз', 0x400)); //
grprows.push(new grprow(1, 'Дельта', 'Дельта', 65536 << 13));
grprows.push(new grprow(1, 'Додатковий поріг', 'Д.пор', 65536 << 14));
grprows.push(new grprow(0, 'Рівень GSM', 'GSM', 0x8000)); //
grprows.push(new grprow(1, 'Охорона', 'Охор', 65536 << 7));



function getbitCount(value) {
    var cnt = 0;
    for (i = 0; i < 16; i++) {
        if (value & (1 << i))
            cnt++;
    }
    return cnt;
}

////////////////////////////////////////////////////////////




var isMobile = window.navigator.userAgent.includes('Mobile');
if (isMobile) {
    if (div = document.querySelector('.header'))
        div.style.display = 'none';
    if (dd = document.querySelector('.acontainer'))
        dd.style.marginTop = '2px';
    document.querySelector('#tablecontainer').style.marginRight = '2.0vw';
}
if (!isMobile) {
    var pc_color = getrootProp('--pc-background');
    setGlobalProp('--common-background', pc_color);


}







function handler(evt) {
    var dv = evt.target;
    if (dv.accessKey == 'on') {
        dv.style.opacity = '0.7';
        dv.style.color = 'dimgrey';
        dv.accessKey = '';
        dv.style.fontSize = '12px';
    } else {
        dv.style.opacity = '1';
        dv.accessKey = 'on';
        dv.style.color = 'black';
        dv.style.fontSize = '15px';
    }
}



function uniclick(evt) {
    var tp = evt.target.tagName;
    if (tp == 'INPUT') {
        var type = evt.target.type;
        evt.target.parentNode.style.opacity = evt.target.checked ? '1' : '0.35';
        var b = 0;

    }

    if (tp != 'INPUT') {
        evt.stopPropagation();
        var div = evt.target.childElementCount > 0 ? evt.target : evt.target.parentNode;
        if (tp == 'SPAN') {
            if (div)
                div.firstChild.checked = !div.firstChild.checked;

            div.style.opacity = div.firstChild.checked ? '1' : '0.35';
        }
    }

    var parent = evt.target.parentNode;
    var grandpa = parent.parentNode;

    // if (grandpa.id == 'hm1')
    //     askamount();


    correct_params();


    // else {
    //   evt.target.parentNode.style.opacity = evt.target.checked ? '1' : '0.4';
    // }
}


// function cellclickhandler(evt) {
//   var chk = evt.target.firstChild;
//   if (chk)
//     chk.checked = !chk.checked;
// }

// function spanclickhandler(evt) {
//   if (evt.target.childElementCount == 0) {
//     parent = evt.target.parentNode;
//     parent.click();
//   }
//   // var chk = parent.firstChild;
//   // if (chk)
//   //   chk.checked = !chk.checked;
// }



function parse_devlist(str) {
    var s1 = str.trim();

    var s2 = s1.split(',');
    for (var i = 0; i < s2.length; i++)
        s2[i] = s2[i].trim();

    return s2;

}


// let tbm;
// parameters for archmenu 
var userobj;
var devlist;

function refill_params() {
    var last_last = last_objgrp.devlist;
    if (d2 = document.querySelector('.d3')) {
        // d1.style.background = 'grey';
        if (d2.id.length == 0) {
            // d2.style.overflowY = 'auto';
            d2.id = 'hm2';


            // var devlist = last_objgrp.devlist;

            // добавим params.. 
            var listid = devlist.Select(x => x.Id); //      last_objgrp.devlist.Select(x => x.Id);
            var parlist = last_objgrp.parlist.Where(x => listid.includes(x.device_id));

            var ainp = 0x8000; //GSM bitmask 
            var dinp = 0;


            devlist.forEach(x => {

                ainp |= x.inpmask;
                dinp |= x.bitmask;


                ainp &= (userobj.customs.user_inp_mask & userobj.customs.admin_inp_mask);
                dinp &= (userobj.customs.user_bit_mask & userobj.customs.admin_bit_mask);

                // var cell = document.createElement('div');
                // // cell.classList.add('tmpdatacell');
                // cell.id = element.Id;
                // cell.innerText = element.description;
                // cell.margin = '2px';
                // cell.style.fontSize = '16px';
            });

            var names = [];
            var mask32 = (dinp << 16) | ainp;
            var i = 0;
            for (i = 0; i < grprows.length; i++) {
                // if (mask32 & (1 << i)) {
                var grow = grprows[i];
                if (i == 20)
                    var b = 9;
                if (mask32 & grow.bit) {


                    if (false) {
                        var cell = document.createElement('div');
                        // cell.classList.add('tmpdatacell');
                        // cell.id = i; //element.Id;
                        cell.innerText = grow.name;
                        cell.style.margin = '2px';
                        cell.style.fontSize = '16px';
                        cell.style.textAlign = 'left';
                        //        
                        cell.style.paddingLeft = '5px';
                        cell.addEventListener('click', handler);
                        cell.accessKey = 'on';
                    }


                    var cell = document.createElement('div');
                    d2.appendChild(cell);
                    // cell.classList.add('tmpdatacell');
                    // cell.id = i; 
                    // cell.innerText = grow.name;
                    // cell.style.margin = '2px';
                    // cell.style.fontSize = '16px';
                    cell.style.textAlign = 'left';
                    //        
                    cell.style.paddingLeft = '5px';
                    // cell.style.color = 'black';
                    cell.style.whiteSpace = 'nowrap';
                    // cell.style.cursor = 'pointer';
                    // cell.addEventListener('click', handler);
                    // cell.accessKey = 'on';




                    if (true) {
                        var input = document.createElement('input');
                        input.name = 'name11';
                        input.type = 'checkbox';
                        input.className = "checkbox-class-name";
                        if (i < 3)
                            input.checked = true; //mmm == 0 ? false : true;
                        else {
                            input.checked = false;

                            cell.style.opacity = '0.35';
                        }

                        cell.appendChild(input);

                        // if (cell.childElementCount == 0) 
                        // {


                        var name = document.createElement('span');
                        name.innerText = grow.name;
                        name.style.paddingLeft = '5px';
                        name.style.cursor = 'pointer';
                        cell.appendChild(name);
                        name.addEventListener('click', uniclick); //  spanclickhandler);
                        cell.addEventListener('click', uniclick); //  cellclickhandler);
                        // cell.innerText = grow.name; //'';

                        // }
                    }


                }
            }





            var eee = 0;
        }


    }

    correct_params();

}

function correct_params() {
    if (d1 = document.querySelector('.d1')) {

        var listchecked = d1.children.Where(x => x.firstChild.checked).Select(x => x.children[1].innerText);
        // var nameschecked = listchecked.Select(x => x.children[1].innerText);

        // listchecked = Array.from(d1.children).filter(x => x.firstChild.checked)
        //     .map(x => x.children[1].innerText);

        devchecked = devlist.Where(x => listchecked.includes(x.description));

        inpmaskchecked = devchecked.length > 0 ? 0x8000 : 0; //GSM bitmask 
        bitmaskchecked = 0;

        devchecked.forEach(x => {
            inpmaskchecked |= x.inpmask;
            bitmaskchecked |= x.bitmask;
        });


        inpmaskchecked &= (userobj.customs.user_inp_mask & userobj.customs.admin_inp_mask);
        bitmaskchecked &= (userobj.customs.user_bit_mask & userobj.customs.admin_bit_mask);


        // var ainp = 0x8000; //GSM bitmask 
        // var dinp = 0;
        // devchecked.forEach(x => {

        //     ainp |= x.inpmask;
        //     dinp |= x.bitmask;

        //     ainp &= (userobj.customs.user_inp_mask & userobj.customs.admin_inp_mask);
        //     dinp &= (userobj.customs.user_bit_mask & userobj.customs.admin_bit_mask);
        // });


        if (d2 = document.querySelector('.d3')) {
            d2.children.forEach(cell => {

                var name = cell.children[1].innerText;
                var grow = grprows.find(x => x.name == name);
                var bit = grow.bit;
                if (!grow.isdigit) {
                    // if ((inpmaskchecked & bit) && cell.firstChild.checked)
                    if ((inpmaskchecked & bit))
                        cell.style.opacity = '1';
                    else
                        cell.style.opacity = '0.35';
                } else {
                    // if ((bitmaskchecked & (bit >> 16)) && cell.firstChild.checked)
                    if ((bitmaskchecked & (bit >> 16)))
                        cell.style.opacity = '1';
                    else
                        cell.style.opacity = '0.35';


                }
                if (cell.firstChild.checked)
                    cell.children[1].style.color = 'white';
                else
                    cell.children[1].style.color = 'grey';

            });



        }



    }

}


function fill_menu() {
    if (last_objgrp) {

        var tmppw = localStorage.getItem('tmppw');

        // var userobj;
        if (tmppw) {
            if (isJSON(tmppw))
                userobj = JSON.parse(tmppw);
        }

        // добавим узлы.. 
        devlist = last_objgrp.devlist;
        var str = userobj.customs.devlist;

        if (str)
            if (str.length > 0) {
                var dev_ids = parse_devlist(str);
                var devlist2 = devlist.Where(x => dev_ids.includes(x.Id.toString()));
                devlist = devlist2;
            }


        if (d1 = document.querySelector('.d1')) {

            var dc1 = document.querySelector('.dc1');

            // var ttt = document.createElement('div');
            // ttt.style.border = '1px solid red';
            // ttt.innerText = 'HHH';
            // d1.appendChild(ttt);

            // d1.style.background = 'grey';
            if (d1.id.length == 0) {

                d1.id = 'hm1';
                // tbm = document.createElement('div');
                // d1.appendChild(tbm);
                // tbm.style.width = '90%';
                // tbm.style.border = '1px solid black';
                // tbm.style.minHeight = '230px';
                // tbm.style.display = 'block';
                // tbm.style.




                var t = 0;

                var oncetrue = true;
                devlist.forEach(x => {
                    var cell = document.createElement('div');
                    cell.margin = '2px';
                    // cell.style.fontSize = '16px';
                    cell.style.textAlign = 'left';
                    // cell.style.paddingLeft = '5px';
                    d1.appendChild(cell);
                    if (true) {
                        var input = document.createElement('input');
                        input.name = 'name11';
                        input.type = 'checkbox';
                        input.className = "checkbox-class-name";
                        input.checked = oncetrue; //mmm == 0 ? false : true;
                        if (!input.checked)
                            cell.style.opacity = '0.35';
                        oncetrue = false;

                        cell.appendChild(input);

                        // cell.style.color = 'black';
                        cell.style.whiteSpace = 'nowrap';
                        // cell.style.cursor = 'pointer';

                        // if (cell.childElementCount == 0) 
                        // {


                        var name = document.createElement('span');
                        name.innerText = x.description;
                        name.style.paddingLeft = '8px';
                        name.style.cursor = 'pointer';
                        cell.appendChild(name);
                        name.addEventListener('click', uniclick); //  spanclickhandler);
                        cell.addEventListener('click', uniclick); //  cellclickhandler);
                        // cell.innerText = grow.name; //'';

                        // }
                        // cell.style.border = '1px solid yellow';
                        cell.style.marginLeft = '0px';
                    }

                    //column dc1
                    if (true) {
                        var cell = document.createElement('div');
                        cell.style.textAlign = 'center';
                        cell.style.whiteSpace = 'nowrap';
                        cell.innerText = ''; // '0';
                        cell.style.opacity = '0';
                        dc1.appendChild(cell);
                    }




                });




                // tbm = new jsTable('hhm', 12, 1, d1.id, 'row', 'tmpgridsquare');
                var eee = 0;
            }


        }


        refill_params();



    }

}



DateFromlocaleString = function(str) {
    // It's pretty simple to convert your date string to a format that will give the expected result ('yyyy/mm/dd' or 'yyyy-mm-dd'):
    // var time2 = new Date(pk1.value.substring(0, 10).split('.').reverse().join('-') + 'T' + pk1.value.slice(12, 30));
    return new Date(str.slice(0, 10).split('.').reverse().join('-') + 'T' + str.slice(12, 30));
};


function fill_dtpickers() {
    var pk1 = document.getElementById('dtpk1');
    if (pk1) {
        var date = new Date();

        if (pk2 = document.getElementById('dtpk2')) {
            // pk2.getterSetter('year', '2022');
            if (pk2.value.length == 0) {
                date.setHours(23);
                date.setMinutes(59);
                date.setSeconds(59);
                pk2.value = date.toLocaleString().slice(0, 6) + date.toLocaleString().slice(8, 20);
            }
        }

        // date.setHours(date.getHours() - 1);
        // date.setMonth(date.getMonth() - 1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        if (pk1.value.length == 0)
            pk1.value = date.toLocaleString().slice(0, 6) + date.toLocaleString().slice(8, 20);

        if (false) {
            var year = pk1.value.slice(6, 10);
            var month = pk1.value.slice(3, 5);
            var day = pk1.value.slice(0, 2);
            var time = pk1.value.slice(11, 50).trim();

            var str = pk1.value.replace(',', 'T').replaceAll('.', '-').replaceAll(' ', '').replace('20', '');
            str = year + '-' + month + '-' + day + 'T' + time;
            var ttt = new Date(str);
            var xtime = ttt.toLocaleString();
        }

        //reverse convert example:
        if (false) {
            var time2 = DateFromlocaleString(pk1.value);
            var itime = time2.toLocaleString();

            var x = 0;
        }

    }

}




function onselmenu(evt) {

    if (myblur)
        myblur();

    archtable.clear();

    var dd = document.querySelector('.selform');
    // dd.style.display = 'block';
    // dd.style.margintop = 'calc(var(--stop) + 80px)'; //'5vh';
    // if (!isMobile) {
    dd.style.height = 'calc(100% - 68px)';

    dd.style.width = '97.5vw';
    // }

    // dd.style.marginTop = '-0px';
    // setelemProp(':root', '--stop', '10px');
    // setelemProp('.formflex', 'height', '300px');
    // usermenu = !usermenu;
    // _fillallgrp(last_objgrp);
    // refresh_data();
    // dd.style.opacity = '1';
    setelemProp(':root', '--stop', '0px');

    if (isMobile) {
        dd.style.marginLeft = '2vw';
        dd.style.width = '96.0vw';
        dd.style.marginTop = 'calc(var(--stop) + 45px)';
    }
    // else
    //     dd.style.marginLeft = '1.0vw';

    fill_menu();
    fill_dtpickers();

    document.querySelector('.redline').style.display = 'none';
    document.querySelector('.cbtext').style.display = 'none';
    document.querySelector('.cbutcontainer').style.display = 'none';
}


function prepare_DataArchiveQuery(mode = 0) {

    pk1 = document.getElementById('dtpk1');
    pk2 = document.getElementById('dtpk2');
    if (pk1 && pk2) {
        if ((pk1.value.length > 0) && (pk2.value.length > 0)) {

            var val1 = pk1.value.slice(0, 6) + '20' + pk1.value.slice(6, 20);

            var date1 = DateFromlocaleString(val1);


            var date2 = DateFromlocaleString(pk2.value.slice(0, 6) + '20' + pk2.value.slice(6, 20));



            if (d1 = document.querySelector('.d1')) {

                var ch = d1.children;
                var descriptions = []

                Array.from(ch).forEach(cell => {
                    if (cell.children[0].checked)
                        descriptions.push(cell.children[1].innerText);


                });


                var c = -2;
            }

            var ddd = new Date()
            var gmtHours = -ddd.getTimezoneOffset() / 60;

            var obj = new Object({
                type: '_wsocket',
                caller: 'archmenu',
                ObjectType: CmdType.GetDataArchive,
                // id: Id, //myid,
                description: mydescription,
                // newcount: wcnt,
                sertif: sert.sertif,
                gmtHours: gmtHours,
                dleft: date1,
                dright: date2,
                list: descriptions,
                mode: mode,
                nskip: 0,
                ntake: 50 * 100000,
                // amode: rb.children.find(x => x.style.opacity == 1)
            });

            //
            // amode
            var rb = document.querySelector('#radiobuttons'); //.firstElementChild;
            var adiv = Array.from(rb.children).find(x => x.style.opacity == 1);

            obj.amode = Array.from(rb.children).indexOf(adiv);


            // 
            // добавим ainp and dinp
            // var listid = devlist.Select(x => x.Id); //      last_objgrp.devlist.Select(x => x.Id);
            // var parlist = last_objgrp.parlist.Where(x => listid.includes(x.device_id));




            var ainp = 0x8000; //GSM bitmask 
            var dinp = 0;
            // var rnames = [];

            var parinpmask = 0;
            var parbitmask = 0;

            if (d3 = document.querySelector('.d3')) {
                d3.children.forEach(x => {

                    if (x.firstChild.checked) {
                        var grp = grprows.find(v => v.name == x.children[1].innerText);
                        if (grp.isdigit)
                            parbitmask |= grp.bit >> 16;
                        else
                            parinpmask |= grp.bit;
                    }
                });
            }


            // grprows.forEach(rw => {
            //     // var grpr = grprows.find(x => x.name === rw.name);

            //     if (xparams.includes(rw.name)) {
            //         // rnames.push(rw.name);
            //         if (!rw.isdigit)
            //             ainp |= rw.bit;

            //         else
            //             dinp |= (rw.bit >> 16);

            //     }
            // });












            devlist.forEach(x => {

                ainp |= x.inpmask;
                dinp |= x.bitmask;

                ainp &= (userobj.customs.user_inp_mask & userobj.customs.admin_inp_mask);
                dinp &= (userobj.customs.user_bit_mask & userobj.customs.admin_bit_mask);

            });

            obj.ainp = ainp & parinpmask;
            obj.dinp = dinp & parbitmask;

            return obj;

        }
    }



}




var znames = [];
var vnames = [];
var xparams = [];


function graph(evt) {
    evt.target.style.opacity = '0.5';

}

function onCSV(evt) {
    evt.target.style.opacity = '0.5';
}



function offselmenu(evt) {

    // document.querySelector('.selform').style.display = 'none';
    var dd = document.querySelector('.selform');
    // if (!isMobile) {
    dd.style.height = '0px';
    dd.style.width = '50px';
    // dd.style.marginTop = '-100px';
    setelemProp(':root', '--stop', '50vh');
    // setelemProp('.formflex', 'height', '0px');
    // dd.style.opacity = '0';

    var _d1 = document.querySelector('.d1');
    _d1.children.forEach(x => { // Array.from(xx.children).forEach(x => {
        if (x.firstChild.checked)
            znames.push(x.children[1].innerText);
    });

    znames = _d1.children.Select(x => x.firstChild.checked ? x.children[1].innerText : null).Where(y => y != null);
    // znames = [];
    znames = _d1.children.Select(x => { if (x.firstChild.checked) return x.children[1].innerText; });
    // znames = xx.children.Select(x => function() { if (x.firstChild.checked) x.children[1].innerText });

    // vnames = Array.from(xx.children).Where(n => n.firstChild.checked)
    //     .Select(x => x.children[1].innerText)

    vnames = _d1.children.Where(n => n.firstChild.checked).Select(x => x.children[1].innerText);




    var _d3 = document.querySelector('.d3');

    // Array.from(_d3.children).forEach(x => {
    //     if (x.firstChild.checked)
    //         xparams.push(x.children[1].innerText);
    // });

    xparams = _d3.children.Where(x => x.firstChild.checked).Select(x => x.children[1].innerText);


    // fill_menu();
    // archtable.columnlist.slice(1).forEach(x => {
    //     x.setrows(1, 2);
    // });

    // archtable.fill(last_objgrp);

    // document.querySelector('.cbutcontainer').style.display = 'none';
    var elem22 = document.querySelector('.redline');
    elem22.style.display = 'block';
    document.querySelector('.cbtext').innerText = 'Запрос даних триває';
    document.querySelector('.cbtext').style.display = 'block';


    var parcount = 0;
    if (d3 = document.querySelector('.d3'))
        parcount = d3.children.Where(x => x.firstChild.checked).length;



    var obj = prepare_DataArchiveQuery(1);
    // if ((obj.list.length == 0) || ((parcount == 0) && (obj.amode != 3))) {
    if (obj.list.length == 0)
        document.querySelector('.cbtext').innerText = 'Не вибрано жодного пристрою !';
    else if ((parcount == 0) && (obj.amode != 3))
        document.querySelector('.cbtext').innerText = 'Не вибрано жодного параметру !';




    // }
    else if (obj)
        bc.postMessage(obj);


}








function askamount() {
    if (div = document.querySelector('.amntinfo')) {
        div.style.opacity = '0.3';
    }
    if (dv = document.querySelector('.dc1'))
    // dv.style.opacity = '0.4';
        dv.children.forEach(x => {
        // x.innerText = '';
        // if (x.innerText != 0)
        x.style.opacity = '0';

    });

    var obj = prepare_DataArchiveQuery(0);
    var parcount = 0;
    if (d3 = document.querySelector('.d3'))
        parcount = d3.children.Where(x => x.firstChild.checked).length;

    if ((obj.list.length == 0) || ((parcount == 0) && (obj.amode != 3))) {


        if (err = document.querySelector('.errinfo'))
            err.style.display = 'block';
        if (amnt = document.querySelector('.amntinfo'))
            amnt.style.display = 'none';


        if (obj.list.length == 0) {
            if (div = document.querySelector('.errinfo')) {
                div.innerText = 'Не вибрано жодного пристрою !';
            }

        } else if ((parcount == 0) && (obj.amode != 3)) {
            if (div = document.querySelector('.errinfo')) {
                div.innerText = 'Не вибрано жодного параметру !';
            }
        }

    } else {
        if (err = document.querySelector('.errinfo'))
            err.style.display = 'none';
        if (amnt = document.querySelector('.amntinfo'))
            amnt.style.display = 'block';
        if (obj)
            bc.postMessage(obj);
    }
}





// offselmenu();






var bb = document.querySelector('#radiobuttons').firstElementChild;
bb.click();
// bb.dispatchEvent('click');
// bb.click();




function radiobut(e) {
    var parent = e.target.parentNode;
    Array.from(parent.children).forEach(x => {
        if (x != e.target)
            x.style.opacity = '0.33';
        else x.style.opacity = '1';


    });


}




function selprofile(sel, ind) {
    if (ind)
        sel.selectedIndex = ind;

    // var index = ind ? ind : sel.selectedIndex;
    if (sel.selectedIndex > 0) {
        // if (sel.selectedIndex > 0) {
        instance.enabled = false;
        instance2.enabled = false;

        var dtpks = Array.from(document.getElementsByClassName('dtclass'));
        dtpks.forEach(x => {
            x.style.background = 'rgb(40,40,40)';
            x.style.color = 'lightblue';
            x.disabled = 'true';

        });


    } else {
        instance.enabled = true;
        instance2.enabled = true;
        var dtpks = Array.from(document.getElementsByClassName('dtclass'));
        dtpks.forEach(x => {
            x.style.background = 'rgb(99, 103, 116)';
            x.style.color = 'rgb(237, 247, 181';
            x.disabled = '';
        });

    }

    // if (sel.selectedIndex > 0) {
    //     sel.style.fontSize = '16px';

    //     if (div = document.getElementById('dtpk1'))
    //         div.style.display = 'none';
    //     if (div = document.getElementById('dtpk2'))
    //         div.style.display = 'none';
    // } else {
    //     sel.style.fontSize = '20px';
    //     if (div = document.getElementById('dtpk1'))
    //         div.style.display = 'block';
    //     if (div = document.getElementById('dtpk2'))
    //         div.style.display = 'block';
    // }

    // document.body.click();


    if (false) {
        var time = times[i].mcu_datetime;
        var dt = new Date(time);
        var options = { day: 'numeric', month: 'numeric' };
        _columntable.cell(i, 0).innerText = dt.toLocaleTimeString() + '  ' + dt.toLocaleDateString('ua-Ua', options);
        _columntable.cell(i, 0).style.whiteSpace = 'nowrap';
        // _columntable.cell(i, 0).style.fontSize = '15px';

        if (i == 1) {
            // this.columnlist[0].header.innerText = dt.toLocaleDateString();
            var options = { day: 'numeric', month: 'numeric', year: '2-digit' };


            this.columnlist[0].params[0].innerText = 'Дата'; //dt.toLocaleDateString('ua-Ua', options);
            this.columnlist[0].params[0].style.fontSize = '15px';
            // this.columnlist[0].header.style.fontSize = '15px';
            // this.columnlist[0].header.style.lineHeight = '29px';
        }

    }
    var date1 = new Date();
    var date2 = new Date();
    var pk1 = document.querySelector('#dtpk1');
    var pk2 = document.querySelector('#dtpk2');

    var options = { day: 'numeric', month: 'numeric', year: '2-digit' };


    date1.setHours(0);
    date1.setMinutes(0);
    date1.setSeconds(0);

    date2.setHours(23);
    date2.setMinutes(59);
    date2.setSeconds(59);





    switch (sel.value) {
        case '12 годин': //12 hours
            date1 = new Date();
            date1.setHours(new Date().getHours() - 12);
            // date2.setHours(date2.getHours() - 24);
            break;

        case 'доба': //12 hours
            // date1.setHours(date1.getHours() - 24);
            // date2.setHours(date2.getHours() - 24);
            break;

        case 'минула': // nowday
            date1.setHours(date1.getHours() - 24);
            date2.setHours(date2.getHours() - 24);

            break;

        case 'позаминула': // nowday
            date1.setHours(date1.getHours() - 48);
            date2.setHours(date2.getHours() - 48);
            break;

        case 'тиждень': // nowday
            date1.setHours(date1.getHours() - 24 * 7);
            // date2.setHours(date2.getHours() - 24 * 7);
            break;

        case 'місяць': // nowday
            date1.setMonth(date1.getMonth() - 1);
            // date2.setMonth(date2.getMonth() - 1);
            break;
        case '3 місяці': // nowday
            date1.setMonth(date1.getMonth() - 3);
            // date2.setMonth(date2.getMonth() - 1);
            break;

    }
    if (sel.value != 'інтервал') {
        pk1.value = date1.toLocaleDateString('ua-Ua', options) + ', ' + date1.toLocaleTimeString();
        pk2.value = date2.toLocaleDateString('ua-Ua', options) + ', ' + date2.toLocaleTimeString();
    }

    document.querySelector('.selform').dispatchEvent(new Event('click'));

    // askamount();

}

if (true)
    var tim200 = setInterval(() => {
        if (last_objgrp != null) {

            clearInterval(tim200);

            var g = document.querySelector('.selmenu2');
            if (g) {
                var fff = g.innerText;
                g.click();
                // g.dispatchEvent(new Event('click'));
            }
        }
    }, 100);




var csel = document.getElementById('aselector'); //.selectedIndex = 2;
// csel.selectedIndex = 3;

selprofile(csel, 2);