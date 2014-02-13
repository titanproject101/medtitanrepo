

				function showAllDiv(n,a,b) {
					for  (var i=a;i<b;i++) {
						showDiv(n+i);
					}
				}

				function hideAllDiv(n,a,b) {
					for  (var i=a;i<b;i++) {
						hideDiv(n+i);
					}
				}

		NS4=(document.layers) ? true: false;
		function checkE(event,ff) {
			var code=0;
			if (NS4) { code=event.which;
			} else { code=event.keyCode;
			}
			if (code==13) { document.forms[ff].submit(); }
		}

			function urldecode(str) {
				 return decodeURIComponent((str+'').replace(/\+/g, '%20'));
			}


			function setSO(s) {
				document.forms['NAWOTSEARCH'].searchorderby.value=s;
				document.forms['NAWOTSEARCH'].resultstart.value='0';
				document.forms['NAWOTSEARCH'].submit();
			}

			function setView(s) {
				document.forms['NAWOTSEARCH'].resultview.value=s;
				document.forms['NAWOTSEARCH'].submit();
			}

			function setRS(s) {
				document.forms['NAWOTSEARCH'].resultstart.value=s;
				document.forms['NAWOTSEARCH'].submit();
			}
			function setSearch(v) {
				document.forms['NAWOTSEARCH'].filterkeywords.value=v;
				document.forms['NAWOTSEARCH'].submit();
			}




					function maintab(n) {
						for (var i=0;i<10;i++) {
							var E=document.getElementById('MAINTAB'+i);
							if (E==null) continue;
							if (i==n) {
								E.className=(''+E.className).replace('_inactive_bg','_active_bg');
								E.className=(''+E.className).replace('_inactive_hbg','_active_bg');
								E.className=(''+E.className).replace('_inactive_text','_active_text');
							} else {
								E.className=(''+E.className).replace('_active_bg','_inactive_bg');
								E.className=(''+E.className).replace('_active_text','_inactive_text');
							}


							var E=document.getElementById('MAINTAB'+i+'TABLE');
							if (E==null) continue;
							if (i==n) {
								E.className=(''+E.className).replace('_inactive_bg','_active_bg');
								E.className=(''+E.className).replace('_inactive_hbg','_active_bg');
								E.className=(''+E.className).replace('_inactive_text','_active_text');
							} else {
								E.className=(''+E.className).replace('_active_bg','_inactive_bg');
								E.className=(''+E.className).replace('_active_text','_inactive_text');
							}
						}	
					} 
					function subtab(n) {
						for (var i=0;i<10;i++) {
							var E=document.getElementById('MAINSUBTAB'+i);
							if (E==null) continue;
							if (i==n) {
								E.style.display='';
							} else {
								E.style.display='none';

							}
						}	
					}

					function sidetab_hi(n) {
						var E=document.getElementById(n);
						if (E!=null) {
							E.className=(''+E.className).replace('_inactive_bg','_inactive_hbg');
						}
					}

					function sidetab_lo(n) {
						var E=document.getElementById(n);
						if (E!=null) {
							E.className=(''+E.className).replace('_inactive_hbg','_inactive_bg');
						}
					}
					

	function showPANALYSIS() {
		var RVIEW=document.getElementById('RESVIEWOPS0');
		if (RVIEW!=null) {							
			RVIEWW=RVIEW.options[RVIEW.selectedIndex].value;
		}		
		if (RVIEWW==null || RVIEWW=='SEARCHPANELSYMRESULTS_TABSTABLE' || RVIEW=='') {
			maintab(1); subtab(0);
		} else {
			maintab(4);
		}
	}

				function fsec_flip(n) {
					for (var i=0;i<3;i++) {
						var E=document.getElementById('FSEC'+i);
						if (E!=null) {
							if (i==n) {
								E.className=(''+E.className).replace('_inactive_hg','_active_g');
								E.className=(''+E.className).replace('_inactive_g','_active_g');
							} else {
								E.className=(''+E.className).replace('_active_g','_inactive_g');
							}
						}
					}
				}
				function fsec_hi(n) {
					var E=document.getElementById('FSEC'+n);					
					if (E!=null) {
						E.className=(''+E.className).replace('_inactive_g','_inactive_hg');
					}
				}
				function fsec_lo(n) {
					var E=document.getElementById('FSEC'+n);					
					if (E!=null) {
						E.className=(''+E.className).replace('_inactive_hg','_inactive_g');
					}
				}


					function hlAGEDIV(n,v) {
						for (var j=0;j<200;j++) {
							var E=document.getElementById(n+j);
							if (E!=null) {
								if (j==v) {
									E.style.backgroundColor='orange';
								} else {
									E.style.backgroundColor='transparent';
								}
							}
						}
					}
					function setAGE1() {
						setSel('realage',0);
					}


function hideLQAGE() {
	var RA=document.getElementById('realage');
	if (RA!=null) {
		var aaa=RA.options[RA.selectedIndex].value;
		if (aaa<=11) {
			hideDiv('LIFESTYLE_STD_Q');
			hideDiv('LIFESTYLE_DRINKS_Q');
			hideDiv('LIFESTYLE_SMOKES_Q');
			hideDiv('LIFESTYLE_RCB_Q');
			hideDiv('LIFESTYLE_PREGNANT_Q');
		} else if (aaa>50) {
			hideDiv('LIFESTYLE_RCB_Q');
			hideDiv('LIFESTYLE_PREGNANT_Q');
			showDiv('LIFESTYLE_STD_Q');
			showDiv('LIFESTYLE_DRINKS_Q');
			showDiv('LIFESTYLE_SMOKES_Q');
		} else {
			showDiv('LIFESTYLE_STD_Q');
			showDiv('LIFESTYLE_DRINKS_Q');
			showDiv('LIFESTYLE_SMOKES_Q');
		}
	}
}

function showFEMQ() {
	var d=1;
	var RA=document.getElementById('realage');
	if (RA!=null) {
		var aaa=RA.options[RA.selectedIndex].value;
		if (aaa<=11) { d=0; }
		if (aaa>=50) { d=0; }
	}
	if (d==1) {
		showDiv('LIFESTYLE_PREGNANT_Q');showDiv('LIFESTYLE_RCB_Q');
	}
}

					function setTxtMod(n,v) {
						var E=document.getElementById(n);
						if (E!=null) {
							var g=E.value*1;
							g+=(1*v);
							E.value=g;
						}
					}



								function showAllL(n,c) {
									for (var i=0;i<c;i++) {
										showDiv(n+i);
									}
									hideDiv(n+'MORE');
								}


							function setNextSymptomX(X,c,v) {
								var done=0;
								var i='';
									var SN=X+i+'VALUE';
									var E=document.getElementById(SN);
									if (E!=null) {
										if (E.value=='' || E.value=='' || E.value=='') {

											showThisSymptomRow(i);
											setRIGHTTYPE(v);
											if (SINGLECOLUMNAUTO!='') {
												var PV=E.value+'';
												PV=trim22(PV);
												if (PV.length>2 && PV.charAt(PV.length-1)!=',' && PV.charAt(PV.length-2)!=',') PV+=', ';
												if (PV.indexOf(v+',')<0) {
													E.value=PV+v+', ';
												}
											} else {
												E.value=v;
											}
											E.style.color='#000000';
											done=1;
										}  else {
											if (SINGLECOLUMNAUTO!='') {
												var PV=E.value+'';
												PV=trim22(PV);
												if (PV.length>2 && PV.charAt(PV.length-1)!=',' && PV.charAt(PV.length-2)!=',') PV+=', ';
												if (PV.indexOf(v+',')<0) {
													E.value=PV+v+', ';
												}
											}

										}
									}
								hideActiveDiv();
							}


			var MB=0; var MBR=0;
			function modulateB() {
				//if (MBR<2) alert('a');
				MBR++;
				if (MB==0) {
					document.body.style.backgroundColor='rgba(67,203,255,0.2)';
					MB=1;
				} else if (MB==1) {
					document.body.style.backgroundColor='rgba(67,203,255,0.22)';
					//document.body.style.backgroundColor='rgba(67,255,255,0.5)';
					MB=0;
				}				
				setTimeout('modulateB()',500);			
			}



				function symptomdetails() {
					//now get from IMMSYMVALUE, split and put in matrix
					var E=document.getElementById('IMMSYMVALUE');
					var G=document.getElementById('realdur');

					if (E!=null) {
						var q=E.value;
						q=trim22(q);
						var ds=q.split(',');						
						for (var i=0;i<ds.length;i++) {
							var sy=ds[i];
							sy=trim22(sy);	
													
							var F=document.getElementById('IMMSYMDET'+i+'VALUE');
							if (F!=null) {								
								if (trim22(F.value)=='' && sy!='') {
									F.value=sy;

									if (G.selectedIndex>0) {
										var H=document.getElementById('realdurdet'+i);
										if (H!=null) H.selectedIndex=G.selectedIndex;
									}
								}
							}
						}
					}
					showDiv('CHIEFCOMPLAINTDETAILS');
				}

				function closesymptomdetails() {
					var Z=document.getElementById('CHIEFCOMPLAINTDETAILS');
					if (Z!=null && Z.style.display=='none') return;
					var SYM='';
					var minsel=100;
					for (var i=0;i<10;i++) {
						var F=document.getElementById('IMMSYMDET'+i+'VALUE');
						if (F!=null) {
							var t=trim22(F.value);
							if (t.length>0) {
								SYM+=t;
								SYM+=',';
								var H=document.getElementById('realdurdet'+i);
								var hs=1*H.selectedIndex;
								if (hs<minsel) {
									minsel=hs;
								}
							}
						}
					}

					var E=document.getElementById('IMMSYMVALUE');
					var G=document.getElementById('realdur');
					if (E!=null && G!=null) {
						E.value=SYM;
						if (minsel<100) G.selectedIndex=minsel;
					}
					hideDiv('CHIEFCOMPLAINTDETAILS');

				}




				function addParametersPassed() {

					if (1) {
						var NOTS='';
						var AS=document.getElementsByName('nsym');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {									
									NOTS+='<input type="checkbox" value="'+O.value+'" name="notsymptom" id="notsymptom" checked>NOT '+O.value+'<br>'
								}
							}	
						}

						var AS=document.getElementsByName('rosnsym');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {									
									NOTS+='<input type="checkbox" value="'+O.value+'" name="notsymptom" id="notsymptom" checked>NOT '+O.value+'<br>'
								}
							}	
						}

						if (NOTS!='') {
							var E=document.getElementById('NOTSYMPTOMSTD');
							if (E!=null) {
								var DD=document.createElement('div');
								DD.className='FW';
								DD.innerHTML=NOTS;
								E.appendChild(DD);
							}
						}
					}




					if (1) {
						var LMM=document.getElementsByName("lifemods");
						if (LMM!=null && LMM.length>0) {
							for (var i=0;i<LMM.length;i++) {
								var OC=LMM[i];
								for (var j=0;j<CURRENT_LIFESTYLES.length;j+=2) {
									var qq=CURRENT_LIFESTYLES[j+1]+"_"+CURRENT_LIFESTYLES[j];
									if (qq==OC.value) {
										OC.checked=true;		
									}
								}
							}
						}
					}


					if (1) {
						var DTTT='';
						var EVV='';
						var E=document.getElementById('SELECTEDTX');
						if (E!=null) EVV=E.innerHTML;
						EVV=trim22(EVV);
						var AS=document.getElementsByName('selecttreatment');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {
									var vs=O.value;
									if (EVV.indexOf(vs+'\"')>=0) continue;
									DTTT+='<table border="0" cellpadding="0" cellspacing="0">';
									DTTT+='<TR>';
									DTTT+='<TD class="fbt ssvsmTXT MEDGREYCOLOR"><input type="checkbox" class="fbt ssvsmTXT" name="selecttreatmentcurrent" value="'+vs+'" checked  > '+vs+'</TD>';
									DTTT+='</TR>';
									DTTT+='</table>';

								}
							}
						}

						var AS=document.getElementsByName('selecttreatmentcurrent');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {
									var vs=O.value;
									if (EVV.indexOf(vs+'\"')>=0) continue;
									DTTT+='<table border="0" cellpadding="0" cellspacing="0">';
									DTTT+='<TR>';
									DTTT+='<TD class="fbt ssvsmTXT MEDGREYCOLOR"><input type="checkbox" class="fbt ssvsmTXT" name="selecttreatmentcurrent" value="'+vs+'" checked  > '+vs+'</TD>';
									DTTT+='</TR>';
									DTTT+='</table>';

								}
							}
						}


						if (DTTT!='') {
							var E=document.getElementById('SELECTEDTX');
							if (E!=null) {
								var DD=document.createElement('div');
								DD.className='FW';
								if (EVV.length==0) DTTT='<div class="pdT10 prx MEDGREYCOLOR smTXT">Selected Treatments</div>'+DTTT;
								DD.innerHTML=DTTT;
								E.appendChild(DD);
							}
						}
					}




					if (1) {
						var DTTT='';
						var EVV='';
						var E=document.getElementById('SELECTEDRX');
						if (E!=null) EVV=E.innerHTML;
						EVV=trim22(EVV);

						var AS=document.getElementsByName('selectmedication');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {
									var vs=O.value;
									if (EVV.indexOf(vs+'\"')>=0) continue;
									DTTT+='<table border="0" cellpadding="0" cellspacing="0">';
									DTTT+='<TR>';
									DTTT+='<TD class="fbt ssvsmTXT MEDGREYCOLOR"><input type="checkbox" class="fbt ssvsmTXT" name="selectmedicationcurrent" value="'+vs+'" checked  > '+vs+'</TD>';
									DTTT+='</TR>';
									DTTT+='</table>';

								}
							}
						}

						var AS=document.getElementsByName('selectmedicationcurrent');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {
									var vs=O.value;
									if (EVV.indexOf(vs+'\"')>=0) continue;
									DTTT+='<table border="0" cellpadding="0" cellspacing="0">';
									DTTT+='<TR>';
									DTTT+='<TD class="fbt ssvsmTXT MEDGREYCOLOR"><input type="checkbox" class="fbt ssvsmTXT" name="selectmedicationcurrent" value="'+vs+'" checked  > '+vs+'</TD>';
									DTTT+='</TR>';
									DTTT+='</table>';

								}
							}
						}


						if (DTTT!='') {
							var E=document.getElementById('SELECTEDRX');
							if (E!=null) {
								var DD=document.createElement('div');
								DD.className='FW';
								if (EVV.length==0) DTTT='<div class="pdT10 prx MEDGREYCOLOR smTXT">Selected Medications</div>'+DTTT;
								DD.innerHTML=DTTT;
								E.appendChild(DD);
							}
						}
					}







					if (1) {
						var DTTT='';

						var AS=document.getElementsByName('dtests');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {
									var vvv=O.value;
									var vs=vvv.split('_');
									if (vs.length==2) {
										DTTT+='<table class="FW" border="0" cellpadding="0" cellspacing="0">';
										DTTT+='<TR>';
										DTTT+='<TD class="fbt ssvsmTXT MEDGREYCOLOR">'+vs[0]+'</TD>';
										DTTT+='<TD class="fbt ssvsmTXT MEDGREYCOLOR"><input type="checkbox" class="fbt ssvsmTXT" name="dtestscurrent" value="'+vs[0]+'_'+vs[1]+'" checked  > '+vs[1]+'</TD>';
										DTTT+='</TR>';
										DTTT+='</table>';
									}
								}
							}
						}


						if (DTTT!='') {
							var E=document.getElementById('DTESTVTD');
							if (E!=null) {
								var DD=document.createElement('div');
								DD.className='FW';
								DD.innerHTML=DTTT;
								E.appendChild(DD);
							}
						}
						var E=document.getElementById('OLDPROCLIST');
						if (E!=null) E.innerHTML='';
					}



					if (1) {
						var DTTT='';
						var SDD=document.getElementById('SEVERESYMPDIV');
						if (SDD!=null) {
							var SDDINN=''+SDD.innerHTML;
							var AS=document.getElementsByName('addeddiagnoses');
							if (AS!=null && AS.length>0) {
								for (var i=0;i<AS.length;i++) {
									var O=AS[i];
									if (O!=null && O.checked) {
										if (SDDINN.indexOf(O.value+ "(acute)")<0) {
											DTTT+='<input type="checkbox" name="addeddiagnoses" value="'+O.value+'" checked> '+O.value+'(added)<br>';
										}
									}
								}	
							}
	
							if (DTTT!='') {
								var E=document.getElementById('SEVERESYMPDIV');
								if (E!=null) {
									var DD=document.createElement('div');
									DD.className='FW';
									DD.innerHTML=DTTT;
									E.appendChild(DD);
								}
							}
						}												
					}

					if (1) {
						var DTTT='';
						var SDD=document.getElementById('SEVERESYMPDIV');
						if (SDD!=null) {
							var SDDINN=''+SDD.innerHTML;
							var AS=document.getElementsByName('defacutesymptom');
							if (AS!=null && AS.length>0) {
								for (var i=0;i<AS.length;i++) {
									var O=AS[i];
									if (O!=null && O.checked) {
										if (SDDINN.indexOf(O.value+ "(acute)")<0) {
											DTTT+='<input type="checkbox" name="defacutesymptom" value="'+O.value+'" checked> '+O.value+'(acute)<br>';
										}
									}
								}	
							}
	
							if (DTTT!='') {
								var E=document.getElementById('SEVERESYMPDIV');
								if (E!=null) {
									var DD=document.createElement('div');
									DD.className='FW';
									DD.innerHTML=DTTT;
									E.appendChild(DD);
								}
							}
						}												
					}

					if (1) {
						var DTTT='';
						var SDD=document.getElementById('SEVERESYMPDIV');
						if (SDD!=null) {
							var SDDINN=''+SDD.innerHTML;
							var AS=document.getElementsByName('mildsymptom');
							if (AS!=null && AS.length>0) {
								for (var i=0;i<AS.length;i++) {
									var O=AS[i];
									if (O!=null && O.checked) {
										if (SDDINN.indexOf(O.value+ "(mild)")<0) {
											DTTT+='<input type="checkbox" name="mildsymptom" value="'+O.value+'" checked> '+O.value+'(mild)<br>';
										}
									}
								}	
							}
	
							if (DTTT!='') {
								var E=document.getElementById('SEVERESYMPDIV');
								if (E!=null) {
									var DD=document.createElement('div');
									DD.className='FW';
									DD.innerHTML=DTTT;
									E.appendChild(DD);
								}
							}
						}												
					}




					if (1) {
						var DTTT='';
						var SDD=document.getElementById('SEVERESYMPDIV');
						if (SDD!=null) {
							var SDDINN=''+SDD.innerHTML;
							var AS=document.getElementsByName('moderatesymptom');
							if (AS!=null && AS.length>0) {
								for (var i=0;i<AS.length;i++) {
									var O=AS[i];
									if (O!=null && O.checked) {
										if (SDDINN.indexOf(O.value+ "(moderate)")<0) {
											DTTT+='<input type="checkbox" name="moderatesymptom" value="'+O.value+'" checked> '+O.value+'(moderate)<br>';
										}
									}
								}	
							}
	
							if (DTTT!='') {
								var E=document.getElementById('SEVERESYMPDIV');
								if (E!=null) {
									var DD=document.createElement('div');
									DD.className='FW';
									DD.innerHTML=DTTT;
									E.appendChild(DD);
								}
							}
						}												
					}

					if (1) {
						var DTTT='';
						var SDD=document.getElementById('SEVERESYMPDIV');
						if (SDD!=null) {
							var SDDINN=''+SDD.innerHTML;
							var AS=document.getElementsByName('severesymptom');
							if (AS!=null && AS.length>0) {
								for (var i=0;i<AS.length;i++) {
									var O=AS[i];
									if (O!=null && O.checked) {
										if (SDDINN.indexOf(O.value+ "(severe)")<0) {
											DTTT+='<input type="checkbox" name="severesymptom" value="'+O.value+'" checked> '+O.value+'(severe)<br>';
										}
									}
								}	
							}
	
							if (DTTT!='') {
								var E=document.getElementById('SEVERESYMPDIV');
								if (E!=null) {
									var DD=document.createElement('div');
									DD.className='FW';
									DD.innerHTML=DTTT;
									E.appendChild(DD);
								}
							}
						}												
					}




					if (1) {
						var SSS='';
						var E=document.getElementById('SEVERESYMPDIV');
						var EINN=E.innerHTML; 
						var AS=document.getElementsByName('severesymptomquestion');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {									
									if (EINN.indexOf('yes '+O.value)<0 || EINN.indexOf('no '+O.value)>=0 ) {
										SSS+='<input type="checkbox" value="'+O.value+'" name="sesymqq" id="sesymqq'+i+'" checked>yes '+O.value+'<br>'
									}
								}
							}	
						}

						if (SSS!='') {
							var E=document.getElementById('SEVERESYMPDIV');
							if (E!=null) {
								var DD=document.createElement('div');
								DD.className='FW';
								DD.innerHTML=SSS;
								E.appendChild(DD);
							}
						}
					}





					if (1) {
						var SSS='';
						var E=document.getElementById('SEVERESYMPDIV');
						var EINN=E.innerHTML; 
						var AS=document.getElementsByName('negseveresymptomquestion');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {									
									if (EINN.indexOf('no '+O.value)<0  || EINN.indexOf('yes '+O.value)>0 ) {
										SSS+='<input type="checkbox" value="'+O.value+'" name="negsesymqq" id="negsesymqq'+i+'" checked>no '+O.value+'<br>'
									}
								}
							}	
						}

						if (SSS!='') {
							var E=document.getElementById('SEVERESYMPDIV');
							if (E!=null) {
								var DD=document.createElement('div');
								DD.className='FW';
								DD.innerHTML=SSS;
								E.appendChild(DD);
							}
						}
					}

					if (1) {
						var SSS='';
						var E=document.getElementById('SEVERESYMPDIV');
						var EINN=E.innerHTML; 
						var AS=document.getElementsByName('severediagnosisquestion');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {									
									if (EINN.indexOf('yes '+O.value)<0 || EINN.indexOf('no '+O.value)>=0 ) {
										SSS+='<input type="checkbox" value="'+O.value+'" name="sediagqq" id="sediagqq'+i+'" checked>yes '+O.value+'<br>'
									}
								}
							}	
						}

						if (SSS!='') {
							var E=document.getElementById('SEVERESYMPDIV');
							if (E!=null) {
								var DD=document.createElement('div');
								DD.className='FW';
								DD.innerHTML=SSS;
								E.appendChild(DD);
							}
						}
					}





					if (1) {
						var SSS='';
						var E=document.getElementById('SEVERESYMPDIV');
						var EINN=E.innerHTML; 
						var AS=document.getElementsByName('negseverediagnosisquestion');
						if (AS!=null && AS.length>0) {
							for (var i=0;i<AS.length;i++) {
								var O=AS[i];
								if (O!=null && O.checked) {									
									if (EINN.indexOf('no '+O.value)<0  || EINN.indexOf('yes '+O.value)>0 ) {
										SSS+='<input type="checkbox" value="'+O.value+'" name="negsediagqq" id="negsediagqq'+i+'" checked>no '+O.value+'<br>'
									}
								}
							}	
						}

						if (SSS!='') {
							var E=document.getElementById('SEVERESYMPDIV');
							if (E!=null) {
								var DD=document.createElement('div');
								DD.className='FW';
								DD.innerHTML=SSS;
								E.appendChild(DD);
							}
						}
					}
					
				}




				function prevdiagdetails(N,S,DD) {
					var E=document.getElementById(N);

					if (E!=null) {
						var q=E.value;
						q=trim22(q);
						var ds=q.split(',');						
						for (var i=0;i<ds.length;i++) {
							var sy=ds[i];
							sy=trim22(sy);	
													
							var F=document.getElementById(S+i+'VALUE'); //'IMMPREVDIAGDET'
							if (F!=null) {								
								if (trim22(F.value)=='' && sy!='') {
									F.value=sy;
								}
							}
						}
					}
					showDiv(DD); //'PREVDIAGDETAILSMATRIX'
				}



				function closeprevdiagdetails(N,S,DD) {
					var Z=document.getElementById(DD);
					if (Z!=null && Z.style.display=='none') return;
					var SYM='';
					var minsel=100;
					for (var i=0;i<10;i++) {
						var F=document.getElementById(S+i+'VALUE');
						if (F!=null) {
							var t=trim22(F.value);
							if (t.length>0) {
								SYM+=t;
								SYM+=', ';
							}
						}
					}

					var E=document.getElementById(N); //'IMMPREVDIAGVALUE'
					if (E!=null) {
						E.value=SYM;
					}
					hideDiv(DD); //'PREVDIAGDETAILSMATRIX'
				}


				function showDiagnosis(d) {
					d=d.replace("()","'");
					selST(1);
					if (parent!=self) parent.childselST(1);
					clearT('IMMDIAGVALUE');
					addSTT(d);
					getDiagSearch();
				}


				function showProcedure(d) {
						selST(2);
						if (parent!=self) parent.childselST(2);
						clearT('IMMPROCVALUE');
						addSTT(d);
						getProcSearch();
				}


				function showDrug(d) {
						selST(3);
						if (parent!=self) parent.childselST(3);
						clearT('IMMDRUGVALUE');
						addSTT(d);
						getDrugSearch();
				}





(function() {
  d3.fisheye = {
    scale: function(scaleType) {
      return d3_fisheye_scale(scaleType(), 3, 0);
    },
    circular: function() {
      var radius = 200,
          distortion = 2,
          k0,
          k1,
          focus = [0, 0];

      function fisheye(d) {
        var dx = d.x - focus[0],
            dy = d.y - focus[1],
            dd = Math.sqrt(dx * dx + dy * dy);	    
	    
        if (!dd || dd >= radius) return {x: d.x, y: d.y, z: 1};
        var k = k0 * (1 - Math.exp(-dd * k1)) / dd * .75 + .25;
        return {x: focus[0] + dx * k, y: focus[1] + dy * k, z: Math.min(k, 10)};
      }

      function rescale() {
        k0 = Math.exp(distortion);
        k0 = k0 / (k0 - 1) * radius;
        k1 = distortion / radius;
        return fisheye;
      }

      fisheye.radius = function(_) {
        if (!arguments.length) return radius;
        radius = +_;
        return rescale();
      };

      fisheye.distortion = function(_) {
        if (!arguments.length) return distortion;
        distortion = +_;
        return rescale();
      };

      fisheye.focus = function(_) {
        if (!arguments.length) return focus;
        focus = _;
        return fisheye;
      };

      return rescale();
    }
  };

  function d3_fisheye_scale(scale, d, a) {

    function fisheye(_) {
      var x = scale(_),
          left = x < a,
          v,
          range = d3.extent(scale.range()),
          min = range[0],
          max = range[1],
          m = left ? a - min : max - a;
      if (m == 0) m = max - min;
      return (left ? -1 : 1) * m * (d + 1) / (d + (m / Math.abs(x - a))) + a;
    }

    fisheye.distortion = function(_) {
      if (!arguments.length) return d;
      d = +_;
      return fisheye;
    };

    fisheye.focus = function(_) {
      if (!arguments.length) return a;
      a = +_;
      return fisheye;
    };

    fisheye.copy = function() {
      return d3_fisheye_scale(scale.copy(), d, a);
    };

    fisheye.nice = scale.nice;
    fisheye.ticks = scale.ticks;
    fisheye.tickFormat = scale.tickFormat;
    return d3.rebind(fisheye, scale, "domain", "range");
  }
})();






// Resolves collisions between d and all other circles.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    //var r = d.radius + radius.domain()[1] + padding,
	var r = radius(d) + padding;
	//console.log("here3", r,d.x,d.y);
	//if (isNaN(d.x)) d.x=width*0.5;
	//if (isNaN(d.y)) d.y=height*0.5;
	if (isNaN(d.x)) d.x=Math.random()*width;
	if (isNaN(d.y)) d.y=Math.random()*height;

	if (isNaN(r)) r=6;
        var nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
	//console.log("here4", nx1,ny1,nx2,ny2);

    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
	    r = radius(d) + radius(quad.point) + (d.color !== quad.point.color) * padding;
	    //r = radius(d) + radius(quad.point) + (1) * padding;
	    //r = radius(d) + radius(quad.point) + (d.color !== quad.point.color) * padding;
            //r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
        if (l < r) {
          l = (l - r) / l * alpha;
	  //console.log("here2", l);
	  if (isNaN(l)) l=1;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2
          || x2 < nx1
          || y1 > ny2
          || y2 < ny1;
    });
  };
}

function combineGRAPH(X,Y) {
	X=JSON.parse(JSON.stringify(X));
	Y=JSON.parse(JSON.stringify(Y));



	var AN=X.nodes;
	var AL=X.links;

	var nmap={};
	AN.forEach(function(d, i) { 
		nmap[d.name]=d;
	});

	var lmap={};
	AL.forEach(function(d,i) {
		var kk=d.source+'_'+d.target;
		lmap[kk]=d;
		d.sets='A';
	});
	
	var BN=Y.nodes;
	var BL=Y.links;

	//first need to find what nodes are the same and what the new ones are and 
	//alert(AN.length+" :: "+AL.length+" <> "+BN.length+" :: "+BL.length);
	var nn=0;
	var newid={};

	BN.forEach(function(d, i) { 
		if (nmap.hasOwnProperty(d.name)) {
			var PREV=nmap[d.name];
			PREV.score=d.score;
			PREV.sets='AB';
			newid[d.id]=PREV.id;
		} else {
			//NEED TO ADD TO AN
			var nid=AN.length;
			AN[nid]=d;
			newid[d.id]=nid;
			d.id=nid;
			nn++;
			d.sets='B';
			nmap[d.name]=d;
		}
	});

	var ll=0;
	BL.forEach(function(d,i) {
		var ss=d.source;
		var tt=d.target;
		if (newid.hasOwnProperty(ss)) {
			ss=newid[ss];
		}
		if (newid.hasOwnProperty(tt)) {
			tt=newid[tt];
		}
		d.source=ss;
		d.target=tt;

		var kk=d.source+'_'+d.target;
		if (lmap.hasOwnProperty(kk)) {
			var PREV=lmap[kk];
			var NVAL=1*d.value;
			var PVAL=1*PREV.value;

			PREV.value=NVAL;
			PREV.sets='AB';
		} else {
			var nlid=AL.length;
			AL[nlid]=d;
			ll++;
			d.sets='B';
			lmap[kk]=d;
		}
		
	});

	var res={};
	res["nodes"]=AN;
	res["links"]=AL;
	//alert(nn+" :: "+ll);
	return res;

}


var width = 840, height = 500,rrr = 10, padding =20;

z = d3.scale.category20();
var SFCOLORS=[  
		"#FFB040","#D2A3E4","#55E0C6","#75E160","#CADA45",
		"#91D1D3","#8F7543","#AF8D8F","#D0D54A","#76D870",
		"#6FD59B","#CAD384","#618379","#D4A639","#7B90C5",

		"#6FD8A5","#CB647B","#D39F38","#7795C3","#90DE3D",

		"#628F3C","#578574","#CFCE98","#D06C44","#C083C4",

		"#7CD2D5","#C9DA3D","#D35F6B","#957C48","#CE7FBE",

		"#79DA59","#D3C7BE","#5E8D3D","#CC713D","#AA757E",
];

//var color = d3.scale.category20();
var color=d3.scale.ordinal().range(SFCOLORS);
//alert(color);
//alert(colorbrewer.RdBu[9]);
var fisheye = d3.fisheye.circular().radius(60).distortion(5);

		function radius(d) {
			var dd=d.score*2; 
			if (dd<1) {
				return 0.1;
			}
			return dd;
			
		}
		var mul=1;
		function xscale(x) {
			var TDX= mul*x;
			if (isNaN(TDX)) TDX=Math.random()*width; //width/2;
			return TDX;
		}
		function yscale(y) {
			var TDY= mul*y;
			if (isNaN(TDY)) TDY=Math.random()*height; //height/2;
			return TDY;
		}


		var radiusScale = d3.scale.linear().domain([0, 100]).range([0, 40]);
//     	.linkStrength( function(d) { var sc=d.value/100; if (sc<5) sc=5; return d.value/100; } )
var force=null;
/*
 var force = d3.layout.force()
                .charge(-30)
		.gravity(0.1)
     		.size([width, height]);

*/


/*
                .linkDistance( function(d) {
		                if (d.value<1) d.value=1;
				var inv=100/d.value;
				return 5*inv;
				} )

	.linkDistance( function(d) { return (d.value); } )
     	.linkStrength( function(d) { var sc=d.value/100; if (sc<5) sc=5; return d.value/100; } )
     	.size([width, height]);
*/

function keysbyValue(O){
    var A= [];
    for(var p in O){
        if(O.hasOwnProperty(p)) A.push([p, O[p]]);
    }
    A.sort(function(a, b){
        var a1= a[1], b1= b[1];
        return a1-b1;
    });
    for(var i= 0, L= A.length; i<L; i++){
        A[i]= A[i][0];
    }
    return A;
}


function doCOLORING(node,link) {

	var NOD={};
	var SCORE={}
	var MAX_NSCORE=1;
	node.each (function(d) {
		var ss=1*d.score;
		if (ss>MAX_NSCORE) MAX_NSCORE=ss;
		NOD[d.id]=d;
		SCORE[d.id]=ss;
	});
	var MAXSC=MAX_NSCORE;

	var MAX_LSCORE=0;
	var GRAPH={};
	link.each (function(d) {
		var ss=1*d.value;
		if (ss>MAX_LSCORE) MAX_LSCORE=ss;
		var A=d.source;
		var B=d.target;

			   if (GRAPH[A]==null) {
			      var LLL={};
			      GRAPH[A]=LLL;			     			      
			   }
			   if (GRAPH[B]==null) {
			      var LLL={};
			      GRAPH[B]=LLL;			     			      
			   }
			   if (1) {
			      var LLL=GRAPH[A];
			      LLL[B]=ss;
			   }
			   if (1) {
			      var LLL=GRAPH[B];
			      LLL[A]=ss;
			   }
		
	});
	

		    var GCO={};

		    var FINALSCORES={}
		    var COLC=0;
		    var COLCY=0;
		    for (var key in NOD) {
  		    	if (NOD.hasOwnProperty(key)) {
			   var score=Math.round(100*SCORE[key]/MAXSC); if (score<1) score=1;
			   FINALSCORES[key]=score;
			}
		    }
		    //find top
		    var BYV=keysbyValue(FINALSCORES);
		    BYV.reverse();

		    var NNN=7; 
		    if (BYV.length>200) NNN=14;
		    if (BYV.length>500) NNN=21;
		    if (BYV.length>1000) NNN=28;

		    if (BYV.length<NNN) NNN=BYV.length;
		    var TRS='';
		    var TOPFEW={};
		    for (var w=0;w<NNN;w++) {
		    	var A=BYV[w];
			TOPFEW[A]="1";
		    }
		    var TIGHT=0;
		    var QRS='';
		    //alert("NNN: "+NNN+" :: "+BYV.length);
		    for (var w=0;w<NNN;w++) {
		    	var A=BYV[w];

			TRS+=A+", "+FINALSCORES[A]+" : ";
			if (GCO[A]==null) {
			      var rr=COLC % SFCOLORS.length;
			      GCO[A]=SFCOLORS[rr];
			      COLC++;
			      COLCY++;
			      //if (rr==0 && i<1500) alert("loop");

			   if (1==1) {
			      //NOW NEED TO COLOR LINKS
			      var LLL=GRAPH[A];
			      if (LLL!=null) {
			      	 for (var edge in LLL) {
				     if (LLL.hasOwnProperty(edge) && TOPFEW[edge]!=undefined && TOPFEW[edge]!=null &&TOPFEW[edge]=='1') {
				     	var SCC=LLL[edge];
					var SCCRR=SCC/MAX_LSCORE;
					if (SCCRR>=0.8) {
					   QRS+="SAME COLOR: "+A+" "+edge+" "+SCCRR+" ?? "+SCC+" "+MAX_LSCORE+"\n";
				     	   if (GCO[edge]==null) {
					      TIGHT++;
					      GCO[edge]=GCO[A];
					      if ((NNN+1)<BYV.length) NNN++;
					   }
					}				     	
				     }
				 }
			      }			      
			   }
			}
		    }
		    //alert("TIGHT:: "+TIGHT);
		    //alert(QRS);
		    //alert(TRS);
		    //alert("COL COUNT: "+COLCY);

		    for (var key in NOD) {
  		    	if (NOD.hasOwnProperty(key)) {
			   
			   var A=key;
			   try {
			   var rr=1;
			   if (GCO[A]==null) {
			      rr=COLC % SFCOLORS.length;
			      GCO[A]=SFCOLORS[rr];
			      COLC++;
			      COLCY++;
			      //if (rr==0 && i<1500) alert("loop");
			   }

			   if (1==1) {
			      //NOW NEED TO COLOR LINKS
			      var LLL=GRAPH[A];
			      //if (rr==0 & i<1500) alert(GCO[A]+" ?? "+JSON.stringify(LLL));
			      if (LLL!=null) {
			      	 for (var edge in LLL) {
				     if (LLL.hasOwnProperty(edge)) {
				     	var SCC=LLL[edge];
					var SCCRR=SCC/MAX_LSCORE;
					if (SCCRR>=0.1) {
				     	   if (GCO[edge]==null) {
					      GCO[edge]=GCO[A];
					   }
					}				     	
				     }
				 }
			      }			      
			   }
			   } catch (err) {
			     //alert(err);
			   }

			}
		    }
		    //alert("COL COUNT: "+COLCY);

		    for (var key in NOD) {
  		    	if (NOD.hasOwnProperty(key)) {
			   var THECOL=GCO[key];
			   if (THECOL!=undefined && THECOL!=null) {
			      var d=NOD[key];
			      d.color=THECOL;
			   }
			}
		    }

}
function doHMM(node,link,t,start) {
	 doHMM(node,link,t,start,0)
}
function doHMM(node,link,t,start,DOCOLOR) {
	if (t==start) {
	   	/*
		var TRR='';
		node.each (function(d) {
			  TRR+=d.name+" : "+d.score+"\n";		
		});
		alert(TRR);
		*/

	   	/*
		node.each (function(d) {
			  d.score=1;
		});
		*/

		/*
		var TRR='';
		link.each (function(d) {
		var S=d.source;
		var T=d.target;
		TRR+=d.source+" -> "+d.target+" : "+d.value+"\n";
		});
		alert(TRR);
		*/
	}
	if (t==0) {
	   	var NC=0;
	   	var MINV=10000000;
		var MAXV=0;
		var TRR='';
		node.each (function(d) {
			  TRR+=d.name+" : "+d.score+"\n";
			if (d.score<MINV) MINV=d.score;
			if (d.score>MAXV) MAXV=d.score;
			NC++;
		});
		//alert(TRR);
		var NONZERO=0.0001*MINV;
		var MDIF=MAXV-MINV;

		node.each (function(d) {
			var range=NONZERO+ (d.score-MINV);
			var ss=10*range/MDIF;
			if (ss>30) ss=30;
			d.score=ss;
		});
		

		var MAXLLV=1;
		var AVG=0;
		var COUN=0;

		link.each (function(d) {
			var ss=d.value;
			if (ss>MAXLLV) MAXLLV=ss;
			AVG+=ss;
			COUN++;
		});
		if (MAXLLV<100) MAXLLV=100;
		//alert(MAXLLV+" "+AVG/COUN);
		MAXLLV*=2;
		var setTS=0;
		var LRS='';
		var maxww=width/1.3;
		var NEWMAX=0;
		link.each (function(d) {
			var LFF=d.value;			
			LFF=LFF/MAXLLV;
			LFF++;
			/*	
			if (LFF<=.90) {
			   d.istransparent='true';
			   setTS++;
			}
			*/
			var ss=Math.exp(LFF*1.6180339887);
			ss=Math.round(ss);
			if (ss>maxww) ss=maxww;
			d.value=ss;
			//LRS+=d.value+', ';
			if (d.value>NEWMAX) NEWMAX=d.value;
		});
		var MULLER=1;
		if (NEWMAX<10) {
		   MULLER=2;
		} else if (NEWMAX<100) {
		   MULLER=3;
		}
		//alert("MULLER: "+MULLER);
		if (NEWMAX<100) {
		link.each (function(d) {
			var LFF=d.value;						
			if (MULLER==2) {
			   d.value=Math.exp(LFF*0.4);
			} else if (MULLER==3) {
			   d.value=Math.exp(LFF*0.5);
			}
			if (d.value>NEWMAX) NEWMAX=d.value;
		});
		//alert("NEWMAX: "+NEWMAX);
		}
		//alert(setTS);
		//alert(LRS);


		

		var RR='';
		RR+='[NODES: '+NC+']\n\n';
		node.each (function(d) {		
			  RR+=d.name+' i:'+d.inboundCount+' o:'+d.outboundCount+' -> '+d.score+'\n';
		});
		//alert(RR);
		if (DOCOLOR==1 || DOCOLOR==true) {
		   doCOLORING(node,link);
		}   


		return;
		
	} else {

	var mapp={};
	var MAX_NSCORE=1;
	node.each (function(d) {
		var ss=1*d.score;
		if (ss>MAX_NSCORE) MAX_NSCORE=ss;
		d.tempScore=0;
		d.inboundCount=1;
		d.outboundCount=1;
		mapp[d.id]=d;

	});

	var MAX_LSCORE=1;
	link.each (function(d) {
		var ss=1*d.value;
		if (ss>MAX_LSCORE) MAX_LSCORE=ss;
		var S=d.source;
		var T=d.target;
		var AFF=mapp[T];
		var SSS=mapp[S];
		/*
		if (AFF.inboundCount==undefined) AFF.inboundCount=0;
		if (AFF.outboundCount==undefined) AFF.outboundCount=0;
		if (SSS.inboundCount==undefined) SSS.inboundCount=0;
		if (SSS.outboundCount==undefined) SSS.outboundCount=0;
		*/
		if (AFF!=undefined && AFF.inboundCount!=undefined) {
		   AFF.inboundCount++;
		}
		if (SSS!=undefined && SSS.outboundCount!=undefined) {
		   SSS.outboundCount++;
		}
		
	});

	MAX_NSCORE++;
	MAX_LSCORE++;

	var cval=0.5;

	//circular - stay in place!
	node.each (function(d) {
		var neiC=d.outboundCount;
		if (neiC<1) neiC=1;

		var xxxC=d.inboundCount;
		
		var contrib=d.score/MAX_NSCORE;
		//contrib/=neiC;
		//contrib*=1;

		var v=cval*contrib;
		d.tempScore+=v;	
		//d.tempScore=0.000000001;
		//if (d.outboundCount==1 && d.inboundCount==1) d.tempScore=0.000000001;
		if (d.outboundCount<=2 && d.inboundCount<=2) d.tempScore=0.000001;
		//if (d.name=='V04.81') alert("temps: "+d.tempScore+" :: "+d.outboundCount+" :: "+d.inboundCount);
	});

	link.each (function(d) {
		var S=d.source;
		var T=d.target;
		var AFF=mapp[T];
		var SSS=mapp[S];
		//var neiC=SSS.inboundCount+SSS.outboundCount;
		var neiC=SSS.outboundCount;
		if (neiC<1) neiC=1000;

		var contrib=SSS.score/MAX_NSCORE;
		contrib/=neiC;
		contrib*=d.value/MAX_LSCORE;

		var v=cval*contrib;
		if (AFF!=undefined && AFF.tempScore!=undefined) {
		   AFF.tempScore+=v;		
		}
	});

	var RR='';
	node.each (function(d) {
		var VV=1*d.tempScore;
		//VV=Math.round(VV*1000)*0.001;
		//if (VV>1) VV=1;
		//var NEWS=(d.score/MAX_NSCORE)*(0.15+VV);
		var NEWS=VV;//(0.15+VV);
		RR+=d.name+' '+d.inboundCount+' '+d.outboundCount+' :: '+d.score+' -> '+d.tempScore+' -> '+NEWS+'\n';
		d.score=NEWS;
	});
	//alert(RR);

	   	var NC=0;
	   	var MINV=10000000;
		var MAXV=0;
		node.each (function(d) {
			if (d.score<MINV) MINV=d.score;
			if (d.score>MAXV) MAXV=d.score;
			NC++;
		});
		var NONZERO=0.0001*MINV;
		var MDIF=MAXV-MINV;

		node.each (function(d) {
			var range=NONZERO+ (d.score-MINV);
			var ss=10*range/MDIF;
			if (ss>30) ss=30;
			d.score=ss;
		});

		doHMM(node,link,t-1,start,DOCOLOR);

	}

}

function setForce(json) {

	var MAXVV=1;
	//var RT='';
	json.links.forEach(function(d, i) { 
		//RT+=d.value+", ";
		if (d.value>MAXVV) MAXVV=d.value;
	});


	var MAXSCORE=0;
	var CCC=0;
	var MULLER=1;
	if (MAXVV<1) MULLER=100;
	else if (MAXVV<10) MULLER=10;
	var RQ='';
	//alert("MAX:: "+MAXVV);
	var maxww=width/1.3;	
	json.links.forEach(function(d, i) { 
		d.value=d.value*MULLER;
		if (d.value<1) d.value=1;			       

		var inv=MAXVV/d.value;			       
		if (inv<1) inv=1;
		//if (inv>maxww) inv=maxww;
		inv=Math.round(maxww*(inv)/MAXVV);
		if (inv<1) inv=1;
		RQ+=d.value+"::"+inv+", ";
		if (inv>MAXSCORE) MAXSCORE=inv;
		CCC++;
	});
	//alert(RQ);
	//alert("FIRST PASS: "+MAXSCORE+" ?? "+CCC+" ?? "+MAXVV);

	var doEE=0;
	if (MAXSCORE<10) {
	      doEE=1;
	}
	var mul5=0;
	if (MAXSCORE<100) {
	   mul5=1;
	}

	var RRR='';
	if (true || donew==1 || 1==1) {

		//alert("MAX VALUE : "+MAXVV+" ?? MAX WIDTH :: " +maxww);
		force = d3.layout.force()
                .charge(-30)
		.gravity(0.1)
                .linkDistance( function(d) {
			       if (d.value<1) d.value=1;
			       
			       var inv=MAXVV/d.value;
			       var OINV=inv;
			       
			       //if (doEE) inv=Math.exp(inv*2.718);
			       if (doEE) inv=Math.exp(inv*1.6180339887);
			       if (mul5==1) inv*=5;
			       if (inv<1) inv=1;
			       inv=Math.round(maxww*(inv)/MAXVV);
			       if (inv<1) inv=1;
			       if (inv<5) inv=5;
			       if (inv>maxww*2) inv=maxww*2;

			       //var inv=Math.log(Math.round(width*(MAXVV-d.value)/MAXVV));
			       
			       return inv;
			       } )


     		.size([width, height]);
	}

}

var CHARTGRAPHMAP="chartgraphmap";
var CHARTGRAPHTABLE='chartgraphtable';
var GRAPHJSON="graphjson";

function doGM(donew) {
	if (donew==undefined || donew==null) donew=1;
	donew=1;
	nlmap={};

	

	if (donew==1) {
		var C=document.getElementById(CHARTGRAPHMAP);
		if (C!=null) C.innerHTML="";
	}



	var E=document.getElementById(GRAPHJSON);
	if (E!=null) {
		var REALJSON=JSON.parse(E.value);
		doGRAPH(REALJSON,donew);
	}
}

function getKeys(arr) {
        var key, keys = [];
        for (i = 0; i < arr.length; i++) {
            for (key in arr[i]) {
                if (arr[i].hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        return keys;
    };

var nlmap={};

var nodes;
var svg;
var curJSON;
var graph_parameter_fix_y=0;
var graph_parameter_fix_x=0;
var graph_background_color="#ffffff";
function setGraphParameterFixY(n) {
	graph_parameter_fix_y=n;
}
function setGraphParameterFixX(n) {
	graph_parameter_fix_x=n;
}

function setGraphDisplayWidth(n) {
	width=n;
}

function setGraphDisplayHeight(n) {
	height=n;
}

function setGraphDisplayWidthScreenMinus(n) {
				var WHW=window.innerWidth+''; 
				if (WHW==undefined || WHW=='undefined') WHW=''+document.body.clientWidth;	
				if (WHW==undefined || WHW=='undefined') WHW=''+document.documentElement.clientWidth;
				if (WHW!=null) WHW=WHW.replace('px','');
				else WHW=600;	
	WHW=WHW-n;
	width=WHW;
}

function setGraphDisplayHeightScreenMinus(n) {
				var WHH=window.innerHeight+''; 
				if (WHH==undefined || WHH=='undefined') WHH=''+document.body.clientHeight;
				if (WHH==undefined || WHH=='undefined') WHH=''+document.documentElement.clientHeight;
				if (WHH!=null) WHH=WHH.replace('px','');
				else WHH=500;		
				WHH=1*WHH-n;	
	height=WHH;
}

function setGraphDisplayBackground(n) {
	graph_background_color=n;
}

var doHMMCalc=false;
var doHMMSteps=10;
function setGraphDoHMM(n,s) {
	doHMMCalc=n;
	doHMMSteps=s;
}

var doCOLORINGFUNC=0;
function setGraphDoColoring(C) {
	 doCOLORINGFUNC=C;
}

var SIMPLIFYLINKS=0;
function setGraphSimplifyLinks(l) {
	 SIMPLIFYLINKS=l;
}

function type(obj){
    return Object.prototype.toString.call(obj).slice(8, -1);
}

  function doGRAPH(json,donew) {


  var CHART=document.getElementById(CHARTGRAPHMAP);
  if (CHART!=null) {
  CHART.style.display='';
  }

  if (1==1 || donew==1 ) {
  var DCC="#"+CHARTGRAPHMAP;

		svg = d3.select(DCC).append("svg")
     		.attr("width", width)
     		.attr("height", height)
		.attr("pointer-events", "all")
  		.append('svg:g')
    		.call(d3.behavior.zoom().on("zoom", redraw))
  		.append('svg:g');

		svg.append('svg:rect')
    		.attr('width', width)
    		.attr('height', height)
    		.attr('fill', 'transparent');


		function redraw() {
  			//console.log("here", d3.event.translate, d3.event.scale);
  			svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
		}
		
		curJSON=json;
	} 




	nodes=json.nodes;
	var n = json.nodes.length;	

	var NODECOUNT=n;

	var MAXGROUP=0;

	json.nodes.forEach(function(d, i) { 
		if (d.group!=undefined) {
			var GROUP=1*d.group;
			if (GROUP>MAXGROUP) MAXGROUP=GROUP;
		}
	});


	if (SIMPLIFYLINKS) {
	var MAXLINKV=0;
	json.links.forEach(function(d, i) { 
		var ss=d.value;
		if (ss>MAXLINKV) MAXLINKV=ss;
	});
	var MAKET=0;
	json.links.forEach(function(d, i) { 
		var ss=d.value;
		ss/=MAXLINKV;
		if (ss<=.8) {
		   MAKET++;
		   d.istransparent='true';
		}
	});
	//alert(MAKET);
	}

	var GROUPMUL=20;
	if (MAXGROUP>0) {
		MAXGROUP++;
		var step=width/MAXGROUP;
		if (step<20) step=20;
		GROUPMUL=step;
	}

	var PSS='';	
	//alert(MAXGROUP+" :: "+GROUPMUL);
	json.nodes.forEach(function(d, i) { 
		if (d.group=='0') {
			if (donew==1) {
				d.x = width / 2; 
				d.y = height / 2;
				//var SCORE=d.score; d.y=d.y-SCORE; if (d.y<0) {d.y=0;} 				
				if (graph_parameter_fix_x==1) {
					if (d.group!=undefined) {
						var GROUP=d.group*20-100;
						//d.x=width/2-GROUP;
						d.x=GROUPMUL*d.group;
						if (d.x<20) { d.x=20;} 
						if (d.x>width) { d.x=width;}
						//alert(d.name+" "+d.group+" :: "+d.x);
					}
				}
			}
		} else {
			if (1) {
			   var it=i%n;			   
				d.x = width * (it / (n+20));
				d.y = height* (it / (n+20));

				if (graph_parameter_fix_x==0) {
					if (d.score!=undefined) {
						var SCORE=d.score*30; 
						d.y=height - SCORE;
						//d.y=d.y-SCORE; 
						if (d.y<0) {d.y=0;}
					}
					if (d.group!=undefined) {
						var GROUP=d.group*20-100;
						d.x=width/2-GROUP;
						if (d.x<0) { d.x=0;} 
					}
				} else {
					if (d.group!=undefined) {
						var GROUP=d.group*20-100;
						//d.x=width/2-GROUP;
						d.x=GROUPMUL*d.group;
						if (d.x<20) { d.x=20;} 
						if (d.x>width) { d.x=width;}
						//alert(d.name+" "+d.group+" :: "+d.x);
					}

					if (d.score!=undefined) {
						var SCORE=d.score*30; 
						d.y=height - SCORE;
						//d.y=d.y-SCORE; 
						if (d.y<0) {d.y=0;}
					}
				}

				if (graph_parameter_fix_x!=1 && graph_parameter_fix_y!=1) {
				d.x+=Math.random()*100;
				d.y+=Math.random()*100;
  }
				d.x=Math.round(d.x);
				d.y=Math.round(d.y);
				if (d.x<20) d.x=20;
				if (d.y<20) d.y=20;
				if (d.x>width) d.x=width;
				if (d.y>height) d.y=height;
				PSS+=d.x+" "+d.y+", ";

				//var SCORE=d.score; d.y=d.y-SCORE; if (d.y<0) {d.y=0;} 				
				//alert(i+" "+width+" "+height+" :: "+d.x+" , "+d.y);
				//if (d.name=='constipation') alert(JSON.stringify(d)+"  "+width+" "+height+" :: "+width/2+" "+height/2);
			} else if (d.x==undefined || d.y==undefined || d.x==null || d.y==null) {
			   var it=i%n;
				d.x = width * (it / (n+20));
				d.y = height* (it / (n+20));
				if (graph_parameter_fix_x!=1 && graph_parameter_fix_y!=1) {
				d.x+=Math.random()*100;
				d.y+=Math.random()*100;
  }
				d.x=Math.round(d.x);
				d.y=Math.round(d.y);
				if (d.x<20) d.x=20;
				if (d.y<20) d.y=20;
				if (d.x>width) d.x=width;
				if (d.y>height) d.y=height;


				//d.x = width / n * i; 
				//d.y = height / n * i; 

			}
		}
	});

	//alert(PSS);



	
	if (donew==0 && 1==1) {
		//update 
		if (curJSON!=null) {
			var nmap={};
			curJSON.nodes.forEach(function(d, i) { 
				nmap[d.name]=d;
			});
		
			var re='';
			var mvc=0;
			json.nodes.forEach(function(d, i) { 
				//if already have dx,dy
				if (nmap.hasOwnProperty(d.name)) {
					var PREV=nmap[d.name];
					if (PREV.x!=undefined && PREV.y!=undefined) {
						re+=d.x+" :: "+d.y+" --> "+PREV.x+" :: "+PREV.y+"\n";
						d.x=PREV.x;
						d.y=PREV.y;
						mvc++;
					}
					//json.nodes[i]=PREV;

				}
			});
			//alert(re);

		}
		curJSON=json;

	}

	//alert(JSON.stringify(json.links));
	setForce(json);


  	force
      	.nodes(json.nodes);

	force
      	.links(json.links);


  	var link = svg.selectAll(".link")
      	.data(json.links)
    	.enter().append("svg:path")
    	.attr("class", "path")
	.style("fill","none");



  	var node = svg.selectAll(".node")
	.data(json.nodes)
	.enter().append("g")
      	.attr("class", "node")
       	.attr("r", function(d) { return radiusScale(radius(d));  })
       	.attr("width", function(d) { return radiusScale(radius(d));  })
       	.attr("height", function(d) { return radiusScale(radius(d));  })

	.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
	.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
      	.call(force.drag);

	if (doHMMCalc) {
		doHMM(node,link,doHMMSteps,doHMMSteps,doCOLORINGFUNC);
		doHMMCalc=false;

	} else {
	  if (doCOLORINGFUNC==1 || doCOLORINGFUNC==true) {

	     doCOLORING(node,link);
	  }
	}
	var EE=document.getElementById(CHARTGRAPHTABLE);
	if (EE!=null) {
	   var NOD={};
	   var FINALSCORES={};
	   node.each (function(d) {
	   	 var ID=d.id;
		 var SC=d.score;
		 FINALSCORES[ID]=SC;
		 NOD[ID]=d;
	   });
	   var BYV=keysbyValue(FINALSCORES);
	   BYV.reverse();
	   var tabtxt='<table border="0" cellpadding="0" cellspacing="0">';
	   for (var ii=0;ii<BYV.length;ii++) {
	       var ID=BYV[ii];
	       var d=NOD[ID];
	       if (d!=undefined && d!=null) {
	       	  //tabtxt+='<TR><TD class="pdL5 fbt smTXT MEDGREYCOLOR">'+d.name+'</TD><TD class="pdL5 fbt smTXT MEDGREYCOLOR">'+d.score+'</TD></TR>';
		  tabtxt+='<TR><TD class="pdL5 fbt smTXT MEDGREYCOLOR">'+d.name+'</TD></TR>';
	       }
	       if (ii>=20) break;
	   }
	   tabtxt+='</table>';
	   EE.innerHTML=tabtxt;

	   
	}

	node.each (function(d) {

		try {
		var TY="circle";
		if (d.prestype!=undefined && d.prestype!=null) TY=''+d.prestype;
		var X=d3.select(this);
		X.append(TY)
	       	.attr("r", function(d) { return radiusScale(radius(d));  })
	       	.attr("width", function(d) { return radiusScale(radius(d));  })
	       	.attr("height", function(d) { return radiusScale(radius(d));  })
		.on("click", function (d) { if (d.link!=undefined) { var DL=d.link; if (DL!=undefined) { if (DL.indexOf("function()")>=0) { eval(DL);} else { window.open(d.link); } } }  })
       		.style("fill", function(d) { 
			if (d.istransparent!=undefined && "true"==d.istransparent) {
			   return "transparent";
			}
			if (d.isring!=undefined && "true"==d.isring) {
				if (d.color!=undefined) { 
					return graph_background_color;
					//return "#ffffff";
					//return "#000000";
					//return "transparent";
				} else { return color(d.group); }
			} else {
				if (d.color!=undefined) { return d.color;} else { return color(d.group); }
			}

		})
		.style("stroke", function(d) { 
			if (d.istransparent!=undefined && "true"==d.istransparent) {
			   return "transparent";
			}
			if (d.isring!=undefined && "true"==d.isring) {
				if (d.color!=undefined) { return d.color;} else { return color(d.group); }
			} else {
				if (d.color!=undefined) { return d3.rgb(d.color).darker(); }  else { return d3.rgb(color(d.group)).darker();  }
			}
		});
		} catch (err) {alert(err);}

	});
	//.style("fill", function(d) { if (d.color!=undefined) { return d.color;} return color(d.group); })
	var fivemul=1;
	if (1==1) {
	   fivemul*=Math.round(NODECOUNT/1000);
	   if (isNaN(fivemul)) fivemul=1;
	   if (fivemul>10) fivemul=10;
	   if (fivemul<1) fivemul=1;
	}
	fivemul=1;
	var fiveW=width*fivemul;
	var fiveH=height*fivemul;


	node.append("text")
      	.attr("dy", ".35em")
	.attr("text-anchor", "middle")
      	.attr("class", "nodetext")
      	.text(function(d) { 
		//if (radius(d)>10) {return d.name;} else { return "";} 
		if (undefined!=d.iscenter && "true"==d.iscenter) {
			return d.name;
		} else {
			return "";
		}
	});

      	node.each(function(d) { d.fisheye = fisheye(d);  });

    		node.attr("transform", function(d) { return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")"; });
		//if (NODECOUNT<50) {

		    		node.attr("cx", function(d) { return d.x = Math.max(rrr, Math.min(fiveW - rrr, d.x)); })
        			.attr("cy", function(d) {return d.y = Math.max(rrr, Math.min(fiveH - rrr, d.y)); });
				node.attr("x", function(d) { return d.x = Math.max(rrr, Math.min(fiveW - rrr, d.x)); })
				.attr("y", function(d) {return d.y = Math.max(rrr, Math.min(fiveH - rrr, d.y)); });

		//}

	json.links.forEach(function(d) {
		var TOO=d.target;
		var SOO=d.source;
		d.target.fisheye=fisheye(d.target);
		d.source.fisheye=fisheye(d.source);
		var FF=nlmap[SOO];
		if (FF==null) {
			FF=new Array(); nlmap[SOO]=FF;
		}
		FF[FF.length]=TOO;

		var GG=nlmap[TOO];
		if (GG==null) {
			GG=new Array(); nlmap[TOO]=GG;
		}
		GG[GG.length]=SOO;
	});






	if (1==1) {
	    	// Center the nodes in the middle.
    		var ox = 0, oy = 0;
    		json.nodes.forEach(function(d) { ox += d.x, oy += d.y; });
	    	ox = ox / n - width / 2, oy = oy / n - height / 2;
	    	json.nodes.forEach(function(d) { d.x -= ox, d.y -= oy; });
	}


	function disp() {
			    
		//var coordinates = [width*0.5, height*0.5]; 
		var coordinates = [0, 0]; 
		try {
			coordinates = d3.mouse(this);
		} catch (err) {}
		var x = coordinates[0]; var y = coordinates[1];
		//alert("a: "+x+" "+y);


		//fisheye.focus(d3.mouse(this));
		fisheye.focus(coordinates);
		var LTOO={};

		/* .attr("cx", function(d) { return d.fisheye.x; }).attr("cy", function(d) { return d.fisheye.y; }).attr("r", function(d) { return d.fisheye.z * 4.5; }) */
      		node.each(function(d) { d.fisheye = fisheye(d); 
		var zz=1*d.fisheye.z; 
		if (zz>2 || (undefined!=d.iscenter && "true"==d.iscenter)) {   

			var TOO=nlmap[d.id];
			if (TOO!=null) {
				for (var i=0;i<TOO.length;i++) {
					LTOO[TOO[i]]='1';
				}
			}
		}
		});

      		node.each(function(d) { d.fisheye = fisheye(d); })
        	.style("opacity", function(d) {
		var zz=1*d.fisheye.z;  
		if (LTOO[d.id]=='1') {if (zz<3) {zz=3;}}
		return 1;
		if (zz==1) {
			return 0.5;
		} else {
			var zp=zz/3;
			return zp;
		}
		});


		node.selectAll('text').each(function(d) { d.fisheye = fisheye(d); })
     		.style("font-size", function(d) { 
			var ss=0.25*(radiusScale(radius(d))); 
			if (ss<0.25) ss=0.25;  
			if (undefined!=d.iscenter && "true"==d.iscenter) ss=12;
			return ss+'pt'; 
		})
      		.text(function(d) { 
			var zz=1*d.fisheye.z; 
			if (LTOO[d.id]=='1') {if (zz<3) {zz=3;}}
			if (undefined!=d.iscenter && "true"==d.iscenter) {
				zz=3;
				return d.name;
			}
			if (zz==1) {
			   //if (radius(d)>10) {return d.name;} else { return "";};  
			   return "";
			} else {		
			  return d.name;
			//return d.name+" : "+d.score;		
			}
	 	})
       		.style("fill", function(d) { 
			//return "#767676";
			var zz=1*d.fisheye.z; 
			if (LTOO[d.id]=='1') {if (zz<3) {zz=3;}}
			if (undefined!=d.iscenter && "true"==d.iscenter) zz=3;
			if (zz==1) {
			   return "#eaeae";
			} else {
			  //return "#ff0000";
			  var zp=zz/3;		
			  if (zp>1) zp=1; 
			
			  var cc=256-10*zz; 
			  if (cc>225) {cc=225; }
			  if (cc<0) {cc=0; }
			  cc=Math.floor(cc); 
			  var cx=Number(cc).toString(16); 
			  //var cs="#"+cx+"0000";  
			  var cs="rgba("+cc+",0,0,"+zp+")";
			  //alert(cs+" :: "+zz);
			  return cs; 
			}		
		})
       		.style("opacity", function(d) {
		var zz=1*d.fisheye.z;  

		if (LTOO[d.id]=='1') {if (zz<3) {zz=3;}}
		if (undefined!=d.iscenter && "true"==d.iscenter) {
			zz=3;
			return 1;
		}
		var min=0.1;
		if (zz==1) {
			
			return min;
		} else {
			var zp=zz/3;
			if (zp<min) zp=min;
			return zp;
		}
	})


      	  link
	  .style("stroke", function(d) { 
		d.source.fisheye = fisheye(d.source);
		d.target.fisheye = fisheye(d.target);
		var zz=0;
		var tt=0;
		if (d.source!=undefined && d.source.fisheye!=undefined) zz=1*d.source.fisheye.z;  
		if (d.target!=undefined && d.target.fisheye!=undefined) tt=1*d.target.fisheye.z;  

		if (d.target.istransparent!=undefined && d.source.istransparent!=undefined && ('true'==d.target.istransparent || 'true'==d.source.istransparent) ) {
			if ((zz<=3 && tt<=3) || (d.istransparent!=undefined && d.istransparent=='true')) {
				return "transparent";
			} else {
				return "#00aaff";
			}
		} else {
		  		      
			if (zz<=3 && tt<=3) {
			   if (d.istransparent!=undefined && d.istransparent=='true') {
				return "transparent";
			   } else {
				if (d.source.color!=undefined) { 
					//return d.source.color;
					return d3.rgb(d.source.color).brighter();
					//return d3.rgb(d.source.color).darker();
				} else {
					return color(d.source.group); 
				}
				return "#acacac";
			    }
			} else {
				return "#00aaff";
			}
		}
	   })
       	   .style("opacity", function(d) {
		d.source.fisheye = fisheye(d.source);
		d.target.fisheye = fisheye(d.target);
		//var zz=1*d.source.fisheye.z;  
		//var tt=1*d.target.fisheye.z;  
		var zz=0;
		var tt=0;
		if (d.source!=undefined && d.source.fisheye!=undefined) zz=1*d.source.fisheye.z;  
		if (d.target!=undefined && d.target.fisheye!=undefined) tt=1*d.target.fisheye.z;  
		if (zz<=3 && tt<=3) {  
			return 0.3;
		} else {
			var zp=2*zz/3;
			if (zp<0.4) zp=0.4;
			return zp;
		}
	    });

    }

    
	//var PSS=''; node.each (function( PSS+=d.x+" "+d.y+", "; }); alert("START: "+PSS);


	//radius(d)*d.fisheye.z * 4.5;
 	svg.on("mousemove", disp );
	force.on("tick", function(e) {

	try {
	    //var PSS=''; node.each (function( PSS+=d.x+" "+d.y+", "; }); alert("START: "+PSS);
    		link.attr("x1", function(d) { 
			if ('rect'==d.source.prestype) {

			} else {
				return xscale(d.source.x); 
			}
		})
		.attr("y1", function(d) { 
			if ('rect'==d.source.prestype) {

			} else {
				return yscale(d.source.y); 
			}
		})
		.attr("x2", function(d) { 
			if ('rect'==d.target.prestype) {

			} else {
				return xscale(d.target.x); 
			}
		})
		.attr("y2", function(d) { 
			if ('rect'==d.target.prestype) {

			} else {
				return yscale(d.target.y); 
			}
		});




    		link.attr("d", function(d) { 
			var midx= (xscale(d.target.x) + xscale(d.source.x))*0.5;
			var mody=20;
			if (d.target.y<d.source.y) mody=-20;
			var diffy=d.target.y-d.source.y;
			if (diffy<0) diffy*=-1;
			diffy/=50;
			mody*=diffy;
			var midy= (yscale(d.target.y) + yscale(d.source.y))*0.5+mody;
			if ('NaN'==(''+midy)) {
				midy=yscale(d.source.y);
			}

			var TX=d.target.x;
			var TY=d.target.y;
			var SX=d.source.x;
			var SY=d.source.y;
			
			if ('rect'==d.target.prestype) {
				var DIFV=Math.round(0.5*radiusScale(radius(d.target)));
				
				TX+=DIFV;
				TY+=DIFV;
			}

			if ('rect'==d.source.prestype) {
				var DIFV=Math.round(0.5*radiusScale(radius(d.source)));
				SX+=DIFV;
				SY+=DIFV;
			}

			return "M " + xscale(TX) + " " + yscale(TY) + " Q " + midx+ " "+midy + " " + xscale(SX) + " " + yscale(SY);
			//return "M " + xscale(d.target.x) + " " + yscale(d.target.y) + " S " + midx+ " "+midy + " " + xscale(d.source.x) + " " + yscale(d.source.y);
			//return "M 100 350 q 150 -300 300 0";
			//return xscale(d.source.x); 
		});



		
    		node.attr("transform", function(d) { 
			if (graph_parameter_fix_y==1) {
				if (d.score!=undefined) {
					var SCORE=d.score*30; 
					d.y=height - SCORE;
					//d.y=d.y-SCORE; 
					if (d.y<0) {d.y=0;}
				}
			}
			if (graph_parameter_fix_x==1) {
				if (d.score!=undefined) {
					if (d.group!=undefined) {
						var GROUP=d.group*20-100;
						//d.x=width/2-GROUP;
						d.x=GROUPMUL*d.group - d.score;
						if (d.x<20) { d.x=20;} 
						if (d.x>width) { d.x=width;}
						//alert(d.name+" "+d.group+" :: "+d.x);

					}
				}
			}
			//return "translate(" + d.x + "," + d.y + ")"; 
			return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")"; 
			
		});

		//if (NODECOUNT<50) {
		//}

		node.attr("cx", function(d) { return d.x = Math.max(rrr, Math.min(fiveW - rrr, d.x)); })
		.attr("cy", function(d) {return d.y = Math.max(rrr, Math.min(fiveH - rrr, d.y)); });
		node.attr("x", function(d) { return d.x = Math.max(rrr, Math.min(fiveW - rrr, d.x)); })
		.attr("y", function(d) {return d.y = Math.max(rrr, Math.min(fiveH - rrr, d.y)); });


		node.each(collide(0.5));
		//node.each(collide(0.5));
	    //var PSS=''; node.each (function( PSS+=d.x+" "+d.y+", "; }); alert("START: "+PSS);

		mc--;

		if (mc<=0) {
		   //alert("??");
			disp();


		}
		if (mc<=0) force.stop();
	} catch (err) { alert(err); force.stop();}
	});

	disp();

	var mc=n;
	if (mc<100) mc=100;
	if (mc>2000) mc=2000;

	mc=10;
	force.start();


	setTimeout('force.stop()',40000);


}


