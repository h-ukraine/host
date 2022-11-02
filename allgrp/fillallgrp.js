function tbl_getvalue(bit, grp, dv) {

    var aobj = new Object({
        alarm: grp.inp_flags & dv.inpmask & bit ? true : false,
        notactive: false
    });

    var dvmask = dv.bitmask << 16 | dv.inpmask;
    if ((dvmask & bit) == 0) {

        var ttt = 90;
        aobj.notactive = true;
        return aobj;
    }



    if ((bit & 0xffff) != 0) {
        if (bit == 1)
            aobj.text = Math.abs(grp.ak) < 10 ? grp.ak.toFixed(2) : grp.ak.toFixed(0)
        else if (bit == 2)
            aobj.text = Math.abs(grp.p1) < 10.0 ? grp.p1.toFixed(2) : grp.p1.toFixed(0);
        else if (bit == 4)
            aobj.text = Math.abs(grp.p3) < 10.0 ? grp.p3.toFixed(2) : grp.p3.toFixed(0);
        else if (bit == 8)
            aobj.text = Math.abs(grp.gas) < 10 ? grp.gas.toFixed(2) : grp.gas.toFixed(0);
        else if (bit == 16)
            aobj.text = Math.abs(grp.psk1) < 10 ? grp.psk1.toFixed(2) : grp.psk1.toFixed(0);
        else if (bit == 32)
            aobj.text = Math.abs(grp.t1) < 10 ? grp.t1.toFixed(2) : grp.t1.toFixed(0);
        else if (bit == 64)
            aobj.text = Math.abs(grp.t2) < 10 ? grp.t2.toFixed(2) : grp.t2.toFixed(0);
        else if (bit == 128)
            aobj.text = Math.abs(grp.ukz) < 10 ? grp.ukz.toFixed(2) : grp.ukz.toFixed(0);
        else if (bit == 256)
            aobj.text = Math.abs(grp.p2) < 10 ? grp.p2.toFixed(2) : grp.p2.toFixed(0);
        else if (bit == 512)
            aobj.text = Math.abs(grp.psk2) < 10 ? grp.psk2.toFixed(2) : grp.psk2.toFixed(0);
        else if (bit == 1024)
            aobj.text = Math.abs(grp.akext) < 10 ? grp.akext.toFixed(2) : grp.akext.toFixed(1);

        return aobj;
    }

    //
    else {
        bit = (bit >> 16) & 0xffff;
        if (bit > 0) {

            var vc = grp.bit_flags & dv.bitmask & bit;
            var zbj = new Object({
                alarm: vc > 0 ? true : false,
                text: vc > 0 ? 'Аварія' : 'Норма'
            });

            return zbj;
        }
    }

}


var alarmobjects = [];

// function playsound() {}
var alarmevents = [];


function wrap_alarmsound(hastmout, dev, grp) {
    var amask = dev.inpmask;
    var dmask = dev.bitmask;

    var aflags = grp.inp_flags;
    var dflags = grp.bit_flags;

    var id = dev.Id;

    var obj = {
        id: id,
        a: aflags & amask,
        d: dflags & dmask
    }

    var last = alarmobjects.find(x => x.id == obj.id);
    var result = false;

    if (!last) {
        alarmobjects.push(obj);
        if ((obj.a != 0) || (obj.d != 0)) {
            if (!hastmout)
                return true; //    playsound();
        }
    } else {
        // if (dev.Id == 82) {
        var fresult = false;
        var a0 = obj.a & last.a;
        a0 = obj.a ^ a0;
        if (a0)
            fresult = true;

        var d0 = obj.d & last.d;
        d0 = obj.d ^ d0;
        if (d0)
            fresult = true;

        result = !hastmout ? fresult : false;
        if (result) {

            var evt = {
                id: dev.Id,
                dt: Date.now(),
                aflags: a0,
                dflags: d0,
                ack: false
            };

            alarmevents.push(evt);
            if (alarmevents.length > 1000)
                alarmevents.splice(0, 1);
            var nnn = 0;
        }

        // } 
        // else {
        //     for (var i = 0; i < 16; i++) {
        //         if ((obj.a & (1 << i)) && ((last.a & (1 << i)) == 0))
        //             result = true;
        //         if ((obj.d & (1 << i)) && ((last.d & (1 << i)) == 0))
        //             result = true;
        //         if (result)
        //             break;
        //     }
        // }

        var ind = alarmobjects.indexOf(last);
        if (ind >= 0) {
            alarmobjects[ind].a = obj.a;
            alarmobjects[ind].d = obj.d;
        }
    }

    return hastmout ? false : result;
}



var arrsaved;

// var lastfilled_arrgrp;



async function _fillallgrp(obj) {


    if (obj)
        if (obj.arrgrp.length > 0) {
            let t1 = performance.now();

            if (!forceShowEmptyBlocks) {

            }


            Light = 'rgba(150, 210, 140, 0.95)';
            // Light = 'rgba(200,230,210, 0.95)';
            var Grey = 'rgb(45,45,53)';
            var Red = 'rgba(255,70,0,0.7)'; //  

            var rowamount = 1; //textnames.length; // 8;
            var mask32 = 0;
            var devs;


            if ((!lastsavedDevicesObject) || (lastsavedDevicesObject == null)) {
                setTimeout(() => _fillallgrp(obj), 100);
                return;
            }

            if (lastsavedDevicesObject != null) {
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


                // for allgrp
                devs = lastsavedDevicesObject.arrdev.Where(x => x.binarytype == 0x40);

                devs = limitbyuser(devs);

                var abits = 0;
                devs.forEach(x => abits |= x.inpmask);

                var dbits = 0;
                devs.forEach(x => dbits |= x.bitmask);
                mask32 = ((dbits << 16) & 0xe23e0000) | (abits & 0x07ff) | (1 << 32);
                var dummy = 0;



            }






            rowamount = tbfirst.rowCount;

            tbl.setrows(rowamount);
            tbl.rows.forEach(row => {
                row.style.gridTemplateColumns = 'repeat(' + tbl.colCount.toString() + ', 1fr)';
            });


            // ---------------    experiment !!!!
            var nids = obj.arrgrp.Select(x => x.device_id);

            if (!forceShowEmptyBlocks)
                obj.arrgrp = obj.arrgrp.Where(x => x.device_id);




            var collength = devs.length; //   obj.arrgrp.length; //            devs.Where(x => x.device_enabled > 0).length; //  obj.arrgrp.length;

            // collength = 3;

            tbl.setColumns(collength);
            // tbl.rows.forEach(row => {
            //   row.style.gridTemplateColumns = 'repeat(' + row.colCount + ', 1fr)';
            // });

            // obj.arrgrp.forEach(xgrp => {

            var description_maxlen = 6.5; // min-width = 65   !!!
            var list = limitbyuser(obj.devlist);
            // obj.devlist.forEach(x => {
            list.forEach(x => {
                if (x.description.length > description_maxlen)
                    description_maxlen = x.description.length;
            });

            var anynode_havealarm = false; // if any node have internal alarm
            var anynode_havetimeout = false; // if any node have internal timeout

            var playresult = false;

            // var sorted_grparray_by_id = obj.arrgrp.sort((a, b) => a.Id - b.Id);
            // obj.arrgrp = sorted_grparray_by_id;
            for (j = 0; j < collength; j++) {

                var BorderColour = 'rgba(140,150,150,0.63)';

                var dev = list[j];
                var xgrp = obj.arrgrp.find(x => x.device_id == dev.Id);
                if (!xgrp) {
                    tbl.cell(0, j).innerText = dev.description;
                    var istyle = tbl.cell(0, j).style;

                    var trows = tbl.rowCount;
                    for (let g = 0; g < trows; g++) {
                        tbl.cell(g, j).style.minWidth = (description_maxlen * 10).toString() + 'px';
                    }

                    // istyle.minWidth = (description_maxlen * 10).toString() + 'px'; ///            90px';
                    istyle.letterSpacing = '-0.03em';
                    // istyle.borderRight = '1px solid ' + 'rgba(120,120,120,0.33)';

                    tbl.cell(1, j).innerText = 'id = ' + dev.Id;
                    istyle = tbl.cell(1, j).style;
                    // istyle.color = 'rgb(50,150,170)';
                    istyle.color = 'rgb(30,200,200)';
                    istyle.fontWeight = '500';
                    istyle.fontSize = '16px';
                    // istyle.borderRight = '1px solid ' + 'rgba(120,120,120,0.33)';
                }

                var needredraw = true;
                var _deep_result;
                var _iarr;
                if (arrsaved) {
                    if (arrsaved.length > 0) {
                        if (xgrp == undefined) {
                            needredraw = false;
                            let undf = 0;

                        } else {

                            var tmp_xgrp = obj.arrgrp.find(x => x.device_id == dev.Id);
                            var tmp_airr = arrsaved.find(x => x.device_id == dev.Id);

                            var eq555 = deepEqual(tmp_xgrp, tmp_airr);

                            if (eq555 == true)
                                needredraw = false;

                            _iarr = arrsaved.find(x => x.device_id == dev.Id);
                            _deep_result = deepEqual(_iarr, xgrp);
                            if (_deep_result == undefined) {
                                let rrr = -9;
                            }

                            if (_deep_result == true)
                                needredraw = false;
                            else {

                                var dsakakbakad = 0;

                            }
                        }
                    }
                }


                // if (typeof(_deep_result) == "undefined") {
                //     needredraw = false;

                // }

                // if (xgrp) {
                //     if (obj)
                //         if (obj.devlist)
                //             if (obj.devlist.find(x => x.Id == xgrp.device_id) == null)
                //                 needredraw = false;

                // }


                if (needredraw && xgrp) {
                    //version = 08.06-4


                    // var xgrp =  obj.arrgrp[j];
                    // var dev = obj.devlist.find(x => x.Id == xgrp.device_id);

                    // get timeout info
                    var devtm_min = dev.timeout;

                    var serverlastdt = xgrp ? Date.parse(xgrp.server_datetime) : 0;
                    var nowdt = Date.now();

                    var tmdiff = (nowdt - serverlastdt) / (1000.0 * 60);


                    var nodehavetimeout = false;

                    if (tmdiff > devtm_min) {
                        anynode_havetimeout = nodehavetimeout = true;
                    }



                    // async function bbb(nstart) {

                    //     for (let j = nstart; j < nstart + 20; j++) {


                    var rrr = xgrp ? wrap_alarmsound(nodehavetimeout, dev, xgrp) : false;
                    if (rrr)
                        playresult = true;


                    var k = 0;

                    for (i = 0; i < grprows.length; i++) {
                        var grow = grprows[i];
                        var icell = tbl.cell(k, j);
                        var needstyle = false;

                        if ((i < 2) || (i == grprows.length - 1)) {
                            needstyle = true;

                        } else if (grow.bit & mask32) {
                            needstyle = true;
                        }

                        // var xgrp = obj.arrgrp[0];


                        if (needstyle) {
                            icell = tbl.cell(k, j);
                            var istyle = icell.style;

                            var cname = icell.className;
                            // istyle.className = '';

                            istyle.minWidth = (description_maxlen * 10).toString() + 'px'; ///            90px';
                            istyle.letterSpacing = '-0.03em';
                            // icell.style.width = '190px';
                            // istyle.paddingLeft = _firstpadddingleft;
                            // istyle.marginRight = '1px';
                            if (i < 2) {
                                istyle.borderRight = '1px solid ' + 'rgba(120,120,120,0.33)';
                                if (j == 0)
                                    istyle.borderLeft = '1px solid ' + 'rgba(120,120,120,0.25)';
                            } else {
                                istyle.borderRight = '1px solid ' + (!nodehavetimeout ? BorderColour : 'rgba(60,60,60,0.3)');
                            }


                            icell.style.textAlign = 'center';
                            icell.style.color = 'rgb(20,20,20)'; //   'rgb(0,220,220)'; //    i == 0 ? 'cyan' : 'rgb(100,180,180)';
                            icell.style.background = 'rgb(230,230,230)';
                            // istyle.lineHeight = _lineheight;
                            istyle.fontSize = _fontsize;

                            if (k == 0) {
                                if (icell.innerText != dev.description) {
                                    icell.onclick = openPageUniversal;
                                    icell.style.cursor = 'pointer';
                                    // icell.addEventListener('click', openPageUniversal);
                                }
                                icell.innerText = dev.description;


                                icell.style.color = !nodehavetimeout ? 'rgb(240,240,240)' : 'rgba(240,240,240,0.6)';
                                icell.style.background = '';
                                icell.style.borderRadius = '0px';
                            } else if (k == 1) {

                                var yy = xgrp.mcu_datetime.slice(2, 4);
                                var mm = xgrp.mcu_datetime.slice(5, 7);
                                var dd = xgrp.mcu_datetime.slice(8, 10);


                                if (true) {
                                    var imonth = parseInt(mm);
                                    var arr = ['0', 'січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру']
                                    mm = arr[imonth];
                                }



                                var tim = xgrp.mcu_datetime.slice(11, 16); //    (11, 20);
                                var dt_string = dd + ' ' + mm + ' ' + tim;

                                icell.innerText = dt_string;
                                icell.style.background = '';
                                icell.style.color = 'rgb(30,200,200)';
                                icell.style.fontWeight = '500';
                                icell.style.fontSize = '16px';

                            } else if (k == (tbl.rowCount - 1)) {
                                icell.innerText = xgrp.csq_level;
                                icell.style.backgroundColor = nodehavetimeout ? 'rgba(220,220,220,0.6)' : 'rgb(220,220,220)';

                            } else {
                                var res = tbl_getvalue(grow.bit, xgrp, dev);
                                if (typeof(res) === 'object') {
                                    if (res.notactive == true) {
                                        // not used device input

                                        icell.style.backgroundColor = nodehavetimeout ? 'rgba(220,220,220,0.6)' : 'rgb(220,220,220)'; // 'rgb(190,190,190)';
                                        icell.innerText = '-';

                                    } else {
                                        if (nodehavetimeout)
                                            icell.style.backgroundColor = res.alarm ? 'rgba(220,70,19,0.6)' : 'rgba(220,220,220,0.6)';
                                        else {
                                            icell.style.backgroundColor = res.alarm ? Red : 'rgb(220,220,220)';

                                            //  use alarmevents...
                                            // if (dev.Id == 82) 
                                            //{
                                            if (res.alarm) {
                                                var _events = alarmevents.Where(x => x.id == dev.Id);
                                                if (_events.length > 0) {
                                                    var evsorted = _events.sort((a, b) => b.dt - a.dt);
                                                    var msk = grow.bit;
                                                    var ccc = !grow.isdigit ? evsorted.find(ev => ev.aflags & msk) : evsorted.find(ev => ev.dflags & (msk >> 16));
                                                    if (ccc) {
                                                        if (((Date.now() - ccc.dt) / 1000) < 20)
                                                            icell.style.color = 'rgb(255,255,240)';
                                                        else
                                                            icell.style.color = 'black';
                                                        var vvv = 0;
                                                    }

                                                    var rrr = 0;
                                                }

                                            }
                                            //}

                                            if (res.alarm)
                                                anynode_havealarm = true;
                                        }
                                        icell.innerText = res.text; //        tbl_getvalue(grow.bit, xgrp, dev);   //              grow.name;
                                        var e = 5;
                                    }
                                } else
                                    icell.innerText = tbl_getvalue(grow.bit, xgrp, dev);
                            }




                            k++;

                        }
                    }

                    // }

                    // nstart += 20;
                    // var nstart = Math.min(80, nstart);
                    // setTimeout(bbb(nstart), 10);



                    // };

                    // setTimeout(() => {
                    //         bbb(0);
                    //     },
                    //     10);



                } // end of if(xgrp)
            }

            arrsaved = obj.arrgrp;

            if (playresult && (playenabled == true))
                _play();

            if (led = document.getElementById('led')) {


                led.style.background = anynode_havealarm ? 'rgb(255,70,19)' : (anynode_havetimeout ? 'rgb(120,120,120)' : 'rgb(30,230,49)');
                led.innerText = anynode_havealarm ? 'А' : (anynode_havetimeout ? 'C' : 'Н');

                led.style.color = 'white';
                led.style.textAlign = 'center';
                led.style.lineHeight = '32px';
                led.style.fontSize = '20px';
            }


            let t2 = performance.now();
            var t3 = (t2 - t1).toFixed(3);
            console.log("perf =" + (t2 - t1).toFixed(3));

        }


    var dummy = 6;
}