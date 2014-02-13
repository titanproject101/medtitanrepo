

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var URLPARAMETERS=getUrlVars();

var CURRENTLANG='english';
if (1) {
	var CL=URLPARAMETERS["language"];
	if (CL!=null && CL.length>0) {
		CL=trim22(CL);
		if (CL.length>0) {
			CURRENTLANG=CL;
		}
	}

						if (CURRENTLANG.indexOf('#')>0) {
							var popo=CURRENTLANG.indexOf('#');
							CURRENTLANG=CURRENTLANG.substring(0,popo);
						}
}


var CURRENTSECTIONC='';
var MULTIROWON='';
var SINGLECOLUMNAUTO='';


				function clearBOX() {
					if (this.value!=null && this.value=='') {
						this.value='';
					}
					if (this.value!=null && this.value=='type another symptom (optional)') {
						this.value='';
					}
				}


				function createCookie(name,value,days) {
				   var expires="";
				    if (days) {
				        var date = new Date();
				        date.setTime(date.getTime()+(days*24*60*60*1000));
				        expires = "; expires="+date.toGMTString();
				    } else {expires = ""; }
				    document.cookie = name+"="+value+expires+"; path=/";
				}

				function readCookie(name) {
				    var nameEQ = name + "=";
				    var ca = document.cookie.split(';');
				    if (ca!=null) {
					    for (var i=0;i < ca.length;i++) {
					        var c = ca[i];
					        while (c.charAt(0)==' ') c = c.substring(1,c.length);
					        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
					    }
				    }
				    return null;
				}

				function eraseCookie(name) {
				    createCookie(name,"",-1);
				}


				function rowMOver(r) {

					if (r.className!='rowHEADER') {
						r.className='rowOver';
					} else {
						//r.style.cursor='hand';
					}
				}

				function rowMOut(r) {

					if (r.className!='rowHEADER') {
						r.className='rowColor';
					}

				}
							
				function toggleD(d) {
					var E=document.getElementById(d);
					var EIMG=document.getElementById('IMG'+d);
					if (E!=null) {
						if (E.style.display=='none') {
							E.style.display='';
							if (EIMG!=null) { 
								EIMG.src='/cms/interface/minus.gif';
							}
						} else {
							E.style.display='none';
							if (EIMG!=null) {
								EIMG.src='/cms/interface/plus.gif';
							}
						}
					}	
					var FIMG=document.getElementById(d+'ARROW');
					if (FIMG!=null) {
						if ((FIMG.src+'').indexOf('chev.png')>=0) {FIMG.src='/chevDOWN.png';}
						else if ((FIMG.src+'').indexOf('chevDOWN.png')>=0) {FIMG.src='/chev.png';}

						if ((FIMG.src+'').indexOf('IP_RARROW.png')>=0) {FIMG.src='/IP_RARROWDOWN.png';}
						else if ((FIMG.src+'').indexOf('IP_RARROWDOWN.png')>=0) {FIMG.src='/IP_RARROW.png';}

					}		
				}

				var openedSelect=new Array(); 

				function openSelect(a) {
					var b=a+'BOX';
					var E=document.getElementById(a);
					var F=document.getElementById(b);
					if (E!=null && F!=null) {

						F.style.display='block';
						openedSelect[openedSelect.length]=a;
					}	
				} 

				


				function closeSelect(a) {
					var b=a+'BOX';
					var E=document.getElementById(a);
					var F=document.getElementById(b);
					if (E!=null && F!=null) {

						F.style.display='none';

					}
				} 

				function closeAllSelects() {
					for (var i=0;i<openedSelect.length;i++) {

						closeSelect(openedSelect[i]);
					}
					openedSelect=new Array();


					for (var x=1;x<=5;x++) {

						var EA='DIVSYM'+x+'VALUE';
						var EN='DIVSYM'+x+'VALUECHOICE';						
						var EE=document.getElementById(EN);
						var EB=document.getElementById(EA);
						if (EB!=null) {

							EB.style.visibility="visible";
						}
						if (EE!=null) {
							EE.style.display="none";
						}

					}
				}

				function setTextValue(r,a) {
					var T=document.getElementById(a+'TEXT');
					var V=document.getElementById(a+'VALUE');
					if (T!=null && V!=null) {
						T.innerHTML=r.innerHTML;

						V.value=r.title;

					}
				}



							var activeCB=0;
							function activeClearButton(n) {
								activeCB=n;
							}
							function clearSym(i) {
								if (i!=activeCB) return;
								if (i!=-1) {
									var SN='DIVSYM'+i+'VALUE';
									//var SNTEXT='DIVSYM'+i+'TEXT';
									var E=document.getElementById(SN);
									//var F=document.getElementById(SNTEXT);
									if (E!=null) {
										//E.selectedIndex=0;
										E.value='';
										//F.innerHTML=' -- SELECT SYMPTOM --';
									}
								}
								if (i!=-1) {

									var SN='SYMPTOMDUR'+i;
									var E=document.getElementById(SN);
									if (E!=null) {
										E.selectedIndex=0;
									}
								}

							}

							function clearSearch() {
								for (var i=1;i<=4;i++) {
									var SN='DIVSYM'+i+'VALUE';
									//var SNTEXT='DIVSYM'+i+'TEXT';
									var E=document.getElementById(SN);
									//var F=document.getElementById(SNTEXT);
									if (E!=null) {
										//E.selectedIndex=0;
										E.value='';
										E.style.backgroundColor='#ffffff';
										//F.innerHTML=' -- SELECT SYMPTOM --';
									}
								}

								for (var i=1;i<=4;i++) {
									var SN='SYMPTOMDUR'+i;
									var E=document.getElementById(SN);
									if (E!=null) {
										E.selectedIndex=0;
									}
								}

							}

							

							function websearchfor(n) {
								var KWTB=document.getElementById("DIVSYM5VALUE");
								var SECE=document.getElementById("section");	
								if (KWTB==null) {
									KWTB=document.getElementById("DIVSYM1VALUE");
									window.location='?issearch=true&section=keyword&keyword='+escape(KWTB.value);

								} else {

						
								if (KWTB!=null && SECE!=null) {
									var txt='';

									for (var i=1;i<=4;i++) {
										var SN='DIVSYM'+i+'VALUE';
										var E=document.getElementById(SN);
										if (E!=null) {
											if (E.value!='') {
												var S=E.value;
												S=trim(S);
												txt+=S+' ';
												E.value='';
											}
										}
									}
									KWTB.value=txt;
									SECE.value="keyword";
									document.forms[0].submit();							
								}
	
								}
							}

							function setRIGHTTYPE(S) {
								var REALT=getMatchType(S);
								REALT=trim(REALT);
								REALT=trim22(REALT);
								//alert(REALT.length);
								if (REALT=='') REALT=CURRENTSECTIONC;
								/*	
								if (REALT=='') {
									REALT='other';

								}
								*/
								if (REALT=='symptom') REALT='';

								if (true || REALT!=CURRENTSECTIONC) {
									//alert(REALT);
									if (CURRENTSECTIONC=='keyword' && REALT=='') REALT=CURRENTSECTIONC;
									var ES=document.getElementById("section");
									if (ES!=null) {
										ES.value=REALT;
										CURRENTSECTIONC=REALT;
									}

									var EN='DIVSYM1VALUE';
									var EE=document.getElementById(EN);
									if (EE!=null) {
										if ('keyword'==CURRENTSECTIONC) {
											EE.name='keyword';
										} else if ('searchdrug'==CURRENTSECTIONC) {
											EE.name='drug';
										} else if ('searchproc'==CURRENTSECTIONC) {
											EE.name='procedure';
										} else if ('searchdoc'==CURRENTSECTIONC) {
											EE.name='associateddocs';
										//} else if ('other'==CURRENTSECTIONC) {
										//	EE.name='other';
										} else if (''==CURRENTSECTIONC) {
											EE.name='symptom';
										}
									}
								}
							}


							var INVERIFYU=0;
							function verifyUnderstanding() {

								
									if (1) {

										INVERIFYU=1;

										if (1) {
											var SN='DIVSYM1VALUE';
											var E=document.getElementById(SN);
											if (E!=null) {
												if (E.value!='' && E.value!='' && E.value!='type another symptom (optional)') {
													var S=E.value;
													S=trim(S);
													setRIGHTTYPE(S);
												}
											}
										}
									}
								
							}

							function alertMessage(m) {
								var F=document.getElementById('INFOALERTMESSAGEDIV');
								var E=document.getElementById('INFOALERTMESSAGEDIVMESSAGE');
								if (E!=null) {

									E.innerHTML='<span class="fbt mmTXT" style="color: red;">'+m+'</span>';
									showInfoCENTER('ALERTMESSAGEDIV');
								}
							}



							function verify() {

								var g=0;

								if (1==1) {
									var RAA=document.getElementById("realagegiven");
									if (RAA!=null) {
										RAA=RAA.options[RAA.selectedIndex].value;
										RAA*=1;
										if (RAA==0) RAA=29;
										var AGERANGE="18-29";
										if (RAA<=3) {					
											AGERANGE="1-3";
										} else if (RAA<=11) {
											AGERANGE="4-11";
										} else if (RAA<=17) {
											AGERANGE="12-17";
										} else if (RAA<=29) {
											AGERANGE="18-29";
										} else if (RAA<=50) {
											AGERANGE="30-50";
										} else {
											AGERANGE="50+";
										}	
																				
										var BAA=document.getElementById('agerangeselect');
										if (BAA!=null) {
											for (var i=0;i<BAA.options.length;i++) {
												var OO=BAA.options[i];
												if (OO.value==AGERANGE || OO.text==AGERANGE) {
													BAA.selectedIndex=i;
													//alert(AGERANGE+" "+i+" "+BAA.options[BAA.selectedIndex].value);
													break;
												}	
											}
										}

									}
								}

								if (CURRENTSECTIONC=='') {
								if (1==0) {
									var NS=document.getElementsByName("notsymptom");
									if (NS!=null) {
										for (var i=0;i<NS.length;i++) {
											var N=NS[i];
											if (N!=null) N.value='';
										}

									}
								}
								if (1==0) {

									var SN='DIVSYM5VALUE';
									var E=document.getElementById(SN);
									if (E!=null) {
										if (E.value!='') {
											doDiagmatixSearch();
											return true;
										}
									}
								}

				

								if (1) {
									var E=document.getElementById("section");
									if (E!=null) {
										E.value="";
			
									}
								}

								var ww=verifyUnderstanding();
								if (CURRENTSECTIONC!='') return verify();

								if (ww==5) return false;





								if (1==0) {

									var E=document.getElementsByName('gender');
									if (E!=null) {
										var h=0;
										for (var i=0;i<E.length;i++) {
											if (E[i].checked) {
												h=1;
												break;
											}
										}
										if (h==0) {
											alertMessage("Please select a gender");
											g=1;
											return false;
										}								
									}
								}

								if (1==0) {

									var E=document.getElementsByName('agerange');
									if (E!=null) {
										if (E.selectedIndex==0) {
											alertMessage("Please select an age range");
											g=1;
											return false;
										}
									}
								}
								if (1) {
									var SELS=0;
									for (var i=1;i<=4;i++) {
										var SN='DIVSYM'+i+'VALUE';
										var E=document.getElementById(SN);
										if (E!=null) {
											if (E.value=='type another symptom (optional)') {
												E.value='';
											}
											if (E.value=='') {
												SELS=SELS+1;
											}
										}
									}
									if (SELS==4) {
										alertMessage("Please select 1 or more symptoms");
										g=1;
										return false;
									}
								}

								if (1) {
									var PVV=-1;
									for (var i=1;i<=4;i++) {
										var SN='DIVSYM'+i+'VALUE';
										var E=document.getElementById(SN);
										if (E!=null) {
											
											if (E.value!='') {
												var D=document.getElementById('SYMPTOMDUR'+i);
												if (D!=null) {
													if (D.selectedIndex==0) {
														if (PVV==-1) {
															//alertMessage("Please select a duration for all specified symptoms");
															//D.focus();
															//g=1;
															//return false;
														} else {
															D.selectedIndex=PVV;
														}
													} else {
														PVV=D.selectedIndex;
													}
												}
											} else {
												//alert("B");

												var D=document.getElementById('SYMPTOMDUR'+i);
												if (D!=null) {
													if (PVV!=-1) {
														D.selectedIndex=PVV;
													} else {
														D.selectedIndex=0;
													}
												}
												
											}
										}
									}
								}


								} else {
									var SN='DIVSYM1VALUE';
									var E=document.getElementById(SN);
									if (E!=null) {
										var ESS=E.value;
										ESS=trim(ESS);
										ESS=trim22(ESS);
										if (ESS.length>0) {
											setRIGHTTYPE(ESS);
										}
									}
								}

								if (g==0) {
									var SEC=document.getElementById("section");
									if (SEC!=null) {
										SEC.value=CURRENTSECTIONC;
									}
									for (var i=1;i<=4;i++) {
										var SN='DIVSYM'+i+'VALUE';
										var E=document.getElementById(SN);
										if (E!=null) {
											if (E.value=='type another symptom (optional)') {
												E.value='';
											}
										}
									}

									var ADW='';
									//document.forms[0].w.value=ADW;
									if (document.forms[0].w!=undefined) {
										document.forms[0].w.value='';
									}
									var doo=1;

									var PPURL=document.getElementById('ppurl');
									if (PPURL!=undefined && PPURL!=null) {
										if (''!=PPURL.value) {
											var PPBASE=''+PPURL.value;
											var SUB=getMDataURL();
											SUB=SUB.replace("s=Search...&","");
											SUB=SUB.replace("s=Search...","");
											if (SUB.length>1 && PPBASE.charAt(PPBASE.length-1)=='/' && SUB.charAt(0)=='/') {
												SUB=SUB.substring(1,SUB.length);
												SUB=SUB.replace("issearch=true&indepth=false&restrict=false","");
												SUB=SUB.replace("issearch=true&section=keyword&indepth=false&restrict=false","");
												SUB=SUB.replace("issearch=true&section=searchdrug&indepth=false&restrict=false","");
												SUB=SUB.replace("issearch=true&section=searchproc&indepth=false&restrict=false","");

											}
											var ENDU=PPBASE+SUB;
											if (ENDU.length>1 && ENDU.charAt(ENDU.length-1)=='?') ENDU=ENDU.substring(0,ENDU.length-1);
											var PPCLEAR=document.getElementById('ppurlclear');

											if (PPCLEAR!=undefined && PPCLEAR!=null) {
												var ppds=(''+PPCLEAR.value).split('|');
												for (pq=0;pq<ppds.length;pq++) {
													ENDU=ENDU.replace(ppds[pq],'');
												}
											}
											if (ENDU.indexOf('realage')<0 && ENDU.indexOf('agerange')>0) {

												var mrxp = new RegExp('/agerange/([0-9\-]*)');
												ENDU=ENDU.replace(mrxp,'');
												ENDU=ENDU.replace(mrxp,'');
												ENDU=ENDU.replace(mrxp,'');

											} else {
												var mrxp = new RegExp('/agerange/([0-9\-]*)');
												ENDU=ENDU.replace(mrxp,'');
												ENDU=ENDU.replace(mrxp,'');
												ENDU=ENDU.replace(mrxp,'');
											}
											doo=0;
											window.location=ENDU;	
											//alert(CURRENTSECTIONC+" :: "+ENDU);
										}
									}
									if (doo==1) {
										document.forms['MEDGLEFORM'].submit();
									}
								}
															
							}






function getAllFormElements( parent_node ) {
	if( parent_node == undefined ) {
		parent_node = document;
		if (document.getElementById('HMEFORM')!=null) {
			parent_node = document.getElementById('HMEFORM');
		}
	}
	var out = new Array();
	var formInputs = parent_node.getElementsByTagName("input");
	for (var i = 0; i < formInputs.length; i++)
		out.push( formInputs.item(i) );

	formInputs = parent_node.getElementsByTagName("textarea");
	for (var i = 0; i < formInputs.length; i++)
		out.push( formInputs.item(i) );

	formInputs = parent_node.getElementsByTagName("select");
	for (var i = 0; i < formInputs.length; i++)
		out.push( formInputs.item(i) );

	formInputs = parent_node.getElementsByTagName("button");
	for (var i = 0; i < formInputs.length; i++)
		out.push( formInputs.item(i) );
	
	return out;
}


function getMDataURL(rp,rv) {
	var parent_node = document;
	if (document.getElementById('HMEFORM')!=null) {
		parent_node = document.getElementById('MEDGLEFORM');
	}

	var URL='';
	var BASEU='';
	var BASESYMU='';
	var SYMCOUNT=0;
	var DURCOUNT=0;
	var formInputs = parent_node.getElementsByTagName("input");
	for (var i = 0; i < formInputs.length; i++) {
		var E=formInputs.item(i);

		if (rp!=undefined && rp!=null && E.name==rp) {
			if (URL.length>0) URL+='&';
			URL+=E.name+'='+escape(rv);			
		} else {
			if (E.type=='checkbox') {
				if (E.checked==true) {
					if ('ppurl'==E.name || 'ppurlclear'==E.name || 'aasym'==E.name || 'NRDUR'==E.name) {
					} else {
						if (URL.length>0) URL+='&';
						URL+=E.name+'='+escape(E.value);
					}
				}
			} else if (E.type=='radio') {
				if (E.checked==true) {
					if ('ppurl'==E.name || 'ppurlclear'==E.name || 'aasym'==E.name || 'NRDUR'==E.name) {
					} else if ('gender'==E.name || 'realage'==E.name || 'duration'==E.name || 'notsymptom'==E.name || 'country'==E.name || 'language'==E.name || 'agerange'==E.name) {
						var EV=trim(E.value);
						if (EV.length>0) {
							if (BASEU.length>0) BASEU+='/';
							var ENAM=E.name;
							if ('gendersel'==ENAM) ENAM='gender';
							BASEU+=ENAM+'/'+escape(EV);
						}
					} else {
						if (URL.length>0) URL+='&';
						URL+=E.name+'='+escape(E.value);
					}
				}
			} else {
				if ('ppurl'==E.name || 'ppurlclear'==E.name || 'aasym'==E.name || 'NRDUR'==E.name) {

				} else if ('symptom'==E.name) {
					var EV=trim(E.value);
					if ('Search...'==EV) EV='';
					if (EV.length>0) {
						if (BASESYMU=='') BASESYMU='/symptom';
						BASESYMU+='/'+escape(E.value);
						SYMCOUNT++;
					}
				} else if ('keyword'==E.name) {
					var EV=trim(E.value);
					if (EV.length>0) {
						if (BASESYMU=='') BASESYMU='/disease';
						BASESYMU+='/'+escape(E.value);
						SYMCOUNT++;
					}
				} else if ('drug'==E.name) {
					var EV=trim(E.value);
					if (EV.length>0) {
						if (BASESYMU=='') BASESYMU='/drugs';
						BASESYMU+='/'+escape(E.value);
						SYMCOUNT++;
					}
				} else if ('procedure'==E.name) {
					var EV=trim(E.value);
					if (EV.length>0) {
						if (BASESYMU=='') BASESYMU='/procedures';
						BASESYMU+='/'+escape(E.value);
						SYMCOUNT++;
					}
				} else 	if ('gender'==E.name || 'realage'==E.name || 'duration'==E.name || 'notsymptom'==E.name || 'country'==E.name || 'language'==E.name || 'agerange'==E.name) {
					var EV=trim(E.value);
					if (EV.length>0) {
						if (BASEU.length>0) BASEU+='/';
						var ENAM=E.name;
						if ('gendersel'==ENAM) ENAM='gender';
						BASEU+=ENAM+'/'+escape(EV);
					}
				} else {
					var EV=trim(E.value);
					if (EV.length>0) {
						if (URL.length>0) URL+='&';
						URL+=E.name+'='+escape(E.value);
					}
				}
			}

		}
	}

	formInputs = parent_node.getElementsByTagName("textarea");
	for (var i = 0; i < formInputs.length; i++) {
		var E=formInputs.item(i);
		if (rp!=undefined && rp!=null && E.name==rp) {
			if (URL.length>0) URL+='&';
			URL+=E.name+'='+escape(rv);			
		} else {
			if (URL.length>0) URL+='&';
			URL+=E.name+'='+escape(E.value);
		}
	}

	formInputs = parent_node.getElementsByTagName("select");
	for (var i = 0; i < formInputs.length; i++) {
		var E=formInputs.item(i);
		if (rp!=undefined && rp!=null && E.name==rp) {
			if (URL.length>0) URL+='&';
			URL+=E.name+'='+escape(rv);			
		} else {
			if ('ppurl'==E.name || 'ppurlclear'==E.name || 'aasym'==E.name || 'NRDUR'==E.name) {
			} else if ('gender'==E.name || 'realage'==E.name || 'duration'==E.name || 'notsymptom'==E.name || 'country'==E.name || 'language'==E.name || 'agerange'==E.name) {
				var EV=trim(E.options[E.selectedIndex].value);
				if (EV.length>0) {
					if (E.name=='duration' && DURCOUNT==SYMCOUNT) continue;
					if (BASEU.length>0) BASEU+='/';
					var ENAM=E.name;
					//if ('gendersel'==ENAM) ENAM='gender';
					BASEU+=ENAM+'/'+escape(EV);
					if (E.name=='duration') DURCOUNT++;
				}
			} else if ('gendersel'==E.name) {

			} else {
				if (URL.length>0) URL+='&';
				URL+=E.name+'='+escape(E.options[E.selectedIndex].value);
			}
		}
	}

	if (BASEU.length>0 || BASESYMU.length>0) {
		if (BASEU.length>0 && BASESYMU.length>0) {
			URL=BASESYMU+'/'+BASEU+'/'+"?"+URL;
		} else if (BASESYMU.length>0) {
			URL=BASESYMU+'/'+"?"+URL;
		} else if (BASEU.length>0) {
			URL=BASEU+'/'+"?"+URL;
		}
	}
	return URL;
}


				var ADWORDSSYM=new Array();
				var ADWORDS=new Array();
				function getADWORD(sy) {
					for (var i=0;i<ADWORDS.length;i++) {
						if (sy==ADWORDSSYM[i]) {
							return ADWORDS[i];
						}
					}
					return '';
				}
				
		var commonsyms=["1.5-20cm pigmented lesions in skin","10-point Kurtzke Expanded Disability Status Scale (EDSS)","2 hour postprandial blood sugar > 180 mg/dL","2 to 8 shiny smooth red moist flat topped round lesions in diaper area","2-9mm papules on arm(s)","2-9mm papules on cheeks","2-9mm papules on chest","2-9mm papules on face","2-9mm papules on forehead","2-9mm papules on genital area in females","2-9mm papules on genital area in males","2-9mm papules on mouth","2-9mm papules on nose","2010 ACR/EULAR criteria for RA","2010 RA classification criteria","<1.5cm pigmented lesions in skin","ABO system antibodies","ACC/AHA stages of heart failure","ADHD","AUDIT questionnaire","Achilles tendinitis","Achilles tendonitis","African Americans","Age-Related Eye Disease Study Group (AREDS) criteria","Alberta Clinical Practice Guideline Working Group score for croup","Allen test","Allman classification of clavicle fractures","Alzheimer's Association workgroup criteria","Alzheimer's disease","Ambulation Index","American College of Cardiology/American Heart Association (ACC/AHA) heart failure guidelines stage A-high risk for heart failure but have no structural heart disease or symptoms of heart failure","American College of Cardiology/American Heart Association (ACC/AHA) heart failure guidelines stage B-structural heart disease but have no symptoms of heart failure","American College of Cardiology/American Heart Association (ACC/AHA) heart failure guidelines stage C-structural heart disease and have symptoms of heart failure","American College of Cardiology/American Heart Association (ACC/AHA) heart failure guidelines stage D-refractory heart failure requiring specialized interventions","American College of Rheumatology (ACR) criteria for SLE","American Joint Committee on Cancer TNM classification for cervical cancer","American Society for Reproductive Medicine classification of endometriosis","Amsel criteria for bacterial vaginosis","Amsler grid test","Amsterdam Criteria I for colorectal cancer","Apley test postivie","Ashkanazi Jewish","Ashkenazi Jews","Asians","Autism Diagnostic Interview Revised (ADI-R)","Autism Diagnostic Observation Schedule (ADOS)","Autism Screening Questionnaire","Autism Spectrum Quotient (AQ)","BB guns","BMD >=2.5 SD below the normal mean for young-adult women","BMD >=2.5 SD below the normal mean for young-adult women in a patient who has already experienced >=1 fractures","BMI > 95th percentile for age and sex","BMI >30 kg/m2","BP >=130/80 mmHg","BP >=130/85 mmHg","BP high on 3 separate occasions","BP in adults >= 140/90 mm Hg","BRCAPRO breast cancer risk assessment tool","Babinski sign negative","Beck Depression Inventory (BDI) for primary care","Bell phenomenon","Bell's palsy","Bethesda guidelines for testing colorectal tumors","Binswanger disease","Breast stage 2 females areola larger","Breast stage 2 females breast bud small","Breast stage 3 females areola larger but within countours of breast","Breast stage 3 females breast larger and elevated extending beyond areola","Breast stage 4 females areola and papilla form mound projecting from breast contour","Breast stage 4 females breast larger and more elevated","Breast stage 5 breast adult with variable size","Breast stage 5 females areola and breast in same plane with papilla projecting above areola","Butcher's warts","CAGE questionnaire","CMV infection","CURB 65-BP<90/60 mmHg","CURB 65-RR>=30/min","CURB 65-confusion","CURB 65-older than 65 years","CURB 65-uremia","Canadian Cardiovascular Society System classification class I chest pain only with strenuous rapid or prolonged exertion","Canadian Cardiovascular Society System classification class II chest pain causing slight limitation of ordinary activity","Canadian Cardiovascular Society System classification class III chest pain causing marked limitation of ordinary activity","Canadian Cardiovascular Society System classification class IV chest pain at rest","Caucasian","Center for Epidemiologic Studies Depression Scale","Charcot joint","Child Trauma Screening Questionnaire","Childhood Asperger Syndrome Test","Childhood Autism rating Scale (CARS)","Clinical Institute Withdrawal Assessment for Alcohol Revised (CIWA-Ar)","Consortium to Establish a Registry in Alzheimer's Disease guidelines","Cornell Scale for depression in dementia","Cotton ankle fracture","Couch breast cancer risk assessment tool","Crohn disease","Cruveilhier-Baumgarten murmur","DRE hard stool mass in rectum","DSM-IV criteria for ADHD (ADD)","DSM-IV criteria for depression","DSM-IV criteria of postconcussion syndrome","DSM-IV-TR Diagnostic Criteria for Dementia of the Alzheimer Type","DSM-IV-TR criteria for alcohol dependence","DSM-IV-TR criteria for nicotine addiction","DSM-IV-TR criteria for vascular dementia","DSM-IV-TR diagnostic criteria for trichotillomania","DUB","Danis-Weber ankle fracture type A","Danis-Weber ankle fracture type B","Danis-Weber ankle fracture type C","Dennie-Morgan lines","Diagnostic and Statistical Manual of Mental Disorders Fifth Edition (DSM-5) criteria for schizophrenia","Diagnostic and Statistical Manual of Mental Disorders Fourth Edition Text Revision (DSM-IV-TR) criteria for Asperger Syndrome","Diagnostic and Statistical Manual of Mental Disorders Fourth Edition Text Revision (DSM-IV-TR) criteria for major depressive episode","Diagnostic and Statistical Manual of Mental Disorders Fourth Revision Text Revision (DSM-IV-TR) for Alzeimer's Disease","Diagnostic and Statistical Manual of Mental Disorders Fourth edition (DSM-IV) criteria for encopresis","Drawer test","Dunphy sign","East Indians","Eastern European","Edinburgh Postnatal Depression Scale","Ege's test","Elschnig spots","Epworth Sleepiness Scale (ESS)","Filipinos","Fitzpatrick skin types III - VI","Fracture Risk Assessment (FRAX) tool","Framingham Diagnostic Criteria for Heart Failure","GERD","Gaenslen test","Gardnerella vaginalis","Gardnerella vaginalis infections","Genital Stage 2 males penis childlike","Genital Stage 2 males scrotum redder thinner and larger","Genital Stage 2 males testes volume 1.6-6ml","Genital Stage 3 males penis increased in length","Genital Stage 3 males scrotum further enlargement","Genital Stage 3 males testes volume 6-12ml","Genital Stage 4 males penis increased length and circumference","Genital Stage 4 males scrotum greater enlargement and pigmentation","Genital Stage 4 males testes volume 12-20 ml","Genital stage 5 males penis adult","Genital stage 5 males scrotum adult","Genital stage 5 males testes volume more than 20 ml","Geriatric Depression Scale","Ghent criteria for Marfan syndrome","Gilliam Autism Rating Scale","Glasgow Coma Scale (GCS) score 13-15","Goldmann applanation","Grade I hemorrhoids project into the anal canal and often bleed but do not prolapse","Grade II hemorrhoids may protrude beyond the anal verge with straining or defecating but reduce spontaneously when straining ceases","Grade III hemorrhoids protrude spontaneously or with straining and require manual reduction","Grade IV hemorrhoids chronically prolapse and cannot be reduced","Grave's disease","Graves disease","Gustilo classification for forearm fractures","H pylori gastritis","H1N1 vaccine","HLA-DR3 DQB1*0201","HLA-DR3/4","HLA-DR4 DQB1*0302","HPV infections","HPV types 13 and 32","HPV types 16 and 18","HPV types 6 and 11","Hachinski ischemic score","Hashimoto's thyroiditis","Hawkins test","Hawkins-Kennedy test","Head Injury Interdisciplinary Special Interest Group of the American Congress of Rehabilitation Medicine","Heberden nodes","Helicobacter pylori infection","Hispanics","Homans sign","Human herpesvirus 6 infections","IBS-A (alternating diarrhea and constipation)","IBS-C (constipation predominant)","IBS-D (diarrhea predominant)","IBS-M (mixed diarrhea and constipation)","ICU care","IDSA/ATS criteria for severe community-acquired pneumonia","IV drug use","IgA deficiency","IgA nephritis","International ARM Epidemiologic Study Group 1995 criteria","International Classification of Diseases Tenth Edition criteria for vascular dementia","International Classification of Sleep Disorders (ICSD)","International Federation of Gynecology and Obstetrics staging system for cervical cancer","International Index of Erectile Function (IIEF) questionnaire","International RLS Study Group criteria 1995","Jaccoud arthropathy","Japanese","Jobe test","Jones fracture","Koebner phenomenon","Leopold maneuvers","Less than 10% improvement in PEFR from baseline despite treatment","Lesser-Trélat sign","Levine sign positive","MANTRELS score","MRSA","MRSA colonization of skin or nasal passages","MS attacks last for more than 24 hours","MS attacks occur at different locations months or years apart","Mallet thumb","Mallory-Weiss tear","Manchester breast cancer risk assessment tool","March fracture","Marfan's Syndrome","Marijuana Abuse","Markle sign","May-Thurner syndrome","McMurray test positive","Mediterranean origin","Meniere's disease","Middle Eastern origin","Migraine Disability Assessment Scale (MIDAS)","Mini-Mental State Examination (MMSE)","Model for End-Stage Liver Disease (MELD) scoring system","Modified Checklist for Autism in Toddlers (M-CHAT) Form in 16-30 month olds","Montreal Cognitive Assessment (MoCA)","Morton neuroma","Multiple Sclerosis Functional Composite (MSFC)","Multiple Sleep Latency Test (MSLT)","Mycoplasma pneumoniae infections","Myriad I and II breast cancer risk assessment tool","N1a-signs but no symptoms of neuropathy","N2a-symptomatic mild diabetic polyneuropathy-able to heel walk","N2b-severe symptomatic diabetic polyneuropathy-unable to heel walk","N3-disabling diabetic polyneuropathy","NO- No neuropathy","NYHA classification of functional heart failure","National Cholesterol Education Program (NCEP) Adult Treatment Panel (ATP) guidelines for LDL-C levels","National Institute of Neurological Disorders and Stroke-Association International pour la Recherche at L'Enseignement en Neurosciences (NINDS-AIREN) criteria","National Institute on Aging criteria for Alzheimer Disease","National Institutes of Health Stroke Scale (NIHSS)","National Institutes of Health-Alzheimer's Disease and Related Disorders Association clinical guidelines","Neer impingement test for rotator cuff injuries positive","Neer/Hawkins impingement sign","New York Heart Association (NYHA) classification for heart failure Class I-no limitation of physical activity","New York Heart Association (NYHA) classification for heart failure Class II-slight limitation of physical activity","New York Heart Association (NYHA) classification for heart failure Class III-marked limitation of physical activity","New York Heart Association (NYHA) classification for heart failure Class IV-symptoms at rest and unable to carry on any physical activity without discomfort","Nintendo thumb","Norrbottnian Swedish","Northern European","Ober test","Ontario breast cancer Family History Assessment Tool","Orthomyxoviridae infections","Osgood-Schlatter's disease","Ottawa ankle rules","Ottawa foot rules","PHN-persistent or recurring pain in one or more involved skin dermatomes after resolution of acute shingles","PLMS index of greater than 5 on sleep study in children","PSI calculator","Pap smear","Papua New Guinea","Parkinson Disease symptoms","Parkinsonism","Patient Health Questionnaire-9 (PHQ-9)","Patrick-Fabere test","Payr sign","Phthiriasis palpebrarum infections","Pickwickian Syndrome","Pneumonia severity index","Postpartum Depression Screening Scale (PDSS)","Prehypertension adults >18 years- BP120-139 mm Hg/ 80-89 mm Hg","Pubic hair stage 3 females moderate amount of curly coarse hair extending laterally","Pubic hair stage 3 males moderate amount of curly coarse hair extending laterally","Pubic hair stage 4 males adult hair not extending to inner surface of thighsmPubic hair stage 4 females adult hair not extending to inner surface of thighs","Pubic hair stage 5 females adult hair extending to inner surface of thighs","Pubic hair stage 5 males adult hair extending to inner surface of thighs","Public hair stage 2 females long slightly pigmented downy hair along labia majora","Public hair stage 2 males long slightly pigmented downy hair along base of scrotum and penis","Pulfrich effect","Q angle measurement","Quick Confusion Scale","REM sleep disorder","RPE atrophy","RPE hypertrophy","RPE mottling","RV failure","RV hypertrophy","Ranchos Los Amigos Scale of Cognitive Functioning","Renne test","Rh system antibodies","Rome criteria for diagnosis of IBS","Rovsing sign","SIRS criteria-Heart rate > 90 beats per minute","SIRS criteria-Respiratory rate > 20 per minute or pCO2 < 32 mm Hg","SIRS criteria-temperature > 38 degrees C (100.4 degrees F) or < 36 degrees C (96.8 degrees F)","ST-segment elevation myocardial infarction (STEMI)","Saint Louis University Mental Status (SLUMS)","Sjögren's International Collaborative Clinical Alliance criteria","Snowboarder's ankle fracture","South Americans","Southern European","Sport Concussion Assessment Tool (SCAT)","Spurling test positive","Stage 1 hypertension for adults >18 years- BP140-159 / 90-99 mm Hg","Stage I uterine prolapse- descent of uterus to any point in vagina above level of hymen","Stage II uterine prolapse- descent of uterus to level of hymen","Stage III uterine prolapse- descent of uterus beyond hymen","Stage IV uterine prolapse- total eversion of uterus","Staphylococcus aureus gastroenteritis","Steinmann test positive","Still's murmur","The Alcohol Use Disorders Identification Test","Thessaly test","Thomas test","Tillaux ankle fracture","Timed Stereotypies Rating Scale","Timed Up and Go (TUG) test abnormal","Tinea corporis gladiatorum","Tinel sign positive","Tinel test negative at wrist","Tinnitus Handicap Inventory","Trichophyton mentagrophytes infection of nails","Trichophyton mentagrophytes var interdigitale infections","Trichophyton rubrum infections of feet","Trichophyton rubrum infections of nail","Triplane ankle fracture","US Preventive Services Task Force (USPSTF) recommendations for screening for osteoporosis","Uhthoff phenomenon","Valsalva maneuver","Wechsler Individual Achievement Test II (WIAT II)","Westley score for croup","Whipple triad present","Wide Range Achievement Test III (WRAT III)","Wisconsin Age-Related Maculopathy Grading System","Wolff-Parkinson-White syndrome","Wood lamp exam in vitiligo","Woodcock Johnson III (WJ III)","Zung Self-Rating Depression Scale","a painful swelling in breast in females","a painful swelling in neck","a painful swelling in skin","a painful swelling of ankle","a painful swelling on face","a painful swelling on great toe","abdominal breathing","abdominal pain at least 3 days a month for the last 3 months","abdominal pain cramping during menses","abdominal pain during menses about a year after menarche","abdominal pain occurs before defecation","abdominal pain partially relieved by defecation","abdominal surgery","abdominal tympany","able to lie down flat during an asthma episode","abnormal blood fats","abnormal gait","abnormal hair growth in females","abscess","absent menstrual periods","absent more than 1 day per month from school or work due to asthma","abuse of authority for sexual intercourse","acanthosis nigricans","acanthosis nigricans around neck","acanthosis nigricans in axillae","acanthosis nigricans over elbows","acanthosis nigricans under breasts","acetowhite changes and abnormal blood vessels on cervix","acne","acquired melanocytic nevus","acquired torticollis","acrocyanosis","acromioclavicular joint separation","acrylic nails","actinic skin damage","action related tremor","activities of daily living impaired","acute alcohol intoxication","acute anicteric hepatitis","acute appendicitis","acute bronchitis","acute cholecystitis","acute exacerbation of chronic bronchitis","acute gouty arthritis","acute hypertensive crises","acute inflammatory reaction to tattooing","acute laryngitis","acute lymphadenitis","acute phase of renal colic","acute physiology and chronic health evaluation (APACHE II) score","acute prostatitis","acute pulmonary edema","acute pyelonephritis","acute sinusitis","acute urticaria","acynanotic congenital heart disease","addicted to nicotine","addiction","adenocarcinoma of lung","adenoid enlargement","adenoid facies","adenoidectomy","adenovirus infections","adnexal cysts","adnexal fullness or tenderness","adult acquired flatfoot deformity","advanced paternal age","aerobics","aeromonas infections","aerophagia","afebrile pneumonia syndrome","afraid to have bowel movement due to pain","afraid to have sex due to pain","age 3-36 months and temperature more than 39-39.5 degrees C","age <= 3 months and temperature more than 38 degrees C","age greater than 55 years for men","age greater than 65 years for women","agonizing over perceived physical flaws","air-fluid levels in middle ear","airway blocked during sleep","airway floppy during sleep","airway narrow during sleep","alcohol addiction","alcohol used to relieve pain anixiety or insomnia","alcohol withdrawal","alcoholic hepatitis","alcoholism","alert verbal pain unresponsive (AVPU) system","allergic conjuntivitis","allergic contact dermatitis","allergic gastritis","allergic rhinitis","allergic salute","allergy to soaps or detergents","almost daily analgesic use","alopecia areata","alpha thalassemia minor","altered stool passage (straining and or urgency)","alternating smooth movement of eyes in one direction and saccadic movement in the other direction","amblyopia","amniocentesis","anaerobic bacteremia","anaerobic infection","anagen effluvium","anal fissure","anal fistula","anal sphincter tone normal","analgesia","anemia","anemia due to iron deficiency","anemia of chronic disease","anger","angina","angina pectoris","angina pectoris unstable","angiodysplasia of the GI tract","angiodysplasia of the upper GI tract","anicteric hepatitis","ankle flare","ankle sprain","ankle-brachial index (ABI) abnormal","annular lesions in skin with central clearing","anogenital warts","anteflexed or retroflexed uterus","anterior cerebral artery stroke","anterior chamber angle closure","anterior knee pain","anterior nosebleeds","antibiotic use in previous 30 days","anticholinergic toxidrome","antral-choanal polyp","anxiety","aphthous ulcers","apical mid to late systolic clicks","apical mid to late systolic murmur","applause sign positive","applying creams lotions or ointments","apprehension test for rotator cuff injuries positive","apraxia of eyelid opening or closure","aqueous tear deficiencies","argumentative","arm or forearm crepitus","arm tremor","arteriolosclerosis of retinal vessels","arthritis","arthritis for at least 6 weeks","arthropathy","articulation problems","ascariasis","ascites","aspiration pneumonia","asthma","asthma exacerbation despite recent or current use of corticosteroids","astigmatism","astroviruses infections","asymmetric breasts in females","asymmetric breath sounds","asymmetric hips","asymmetric motor signs","asymmetric oligoarthritis","asymmetric rigidity","asymmetric skin growth","asymmetrical neuropathy","asymptomatic genital warts","asymtomatic microscopic hematuria","atelectasis","atherosclerosis","athlete's foot","athletes that need weight limits for sports","athletic individual","atopic dermatitis","atopic diathesis","atrial fibrillation","atrophic actinic keratosis","atrophic vaginitis","attendance at Alcoholics Anonymous (AA) meeting","audiology testing","augmentation of labor with oxytocin","aura","autism","autism spectrum disorder","autoimmune thyroid disease","autoimmune thyroid disorder","autonomic neuropathy","autosomal dominant polycystic kidney disease","average adult female height 124 +/ - 5.9 cm","average adult male height 131 +/- 5.6 cm","aversion to certain types of music","aversion to loud music","avoidance of situations where talking is needed","awake for most of the night","axial rigidity","axial tremor","baby dropping to lower abdomen","back pain after coughing bending or lifting","bacteremia","bacterial enteritis","bacterial epididymitis","bacterial infections","bacterial pneumonia","bacterial vaginosis","bad breath","bad dreams","bad sleep habits","bad taste in mouth","bags under eyes","balanitis","balanoposthitis","baldness beginning at hairline","barefoot running","bariatric surgery","barrel chest","basal cell carcinoma","bedbug feces eggshells or shed skin in furniture","bee sting","beefy red confluent rash with sharp borders in diaper area","beefy red swollen uvula","behavioral changes","behavioral changes just before period","belching","benign MS","benign prostatic hyperplasia","benign sleep myoclonus of infancy","bicolored mole","bicycle riding","big toe looks infected","bilateral pulmonary infiltrates","bilateral symmetric flat soft yellow papules near inner canthus of eyelids","bilateral symmetric scaly macules with long axes along cleavage lines","bilateral symmetrical tremor","biliary colic","binge use of cocaine","birth weight >90th percent for gestational age for sex and ethnicity","birth weight of 4000-4500 g (8 lb 13 oz to 9 lb 15 oz)","bisexual men","bite pain","bites in a line of three","biting cheek accidentally","biting lip","black bump on scalp","black dots on scalp","black stools","blackheads","blaming others for own mistakes","blanchable erythema","bleeding after childbirth","bleeding after circumcision","bleeding excoriated skin","bleeding from ear(s)","bleeding from mouth","bleeding from umbilicus","bleeding from wound on arm(s)","bleeding from wound on face","bleeding from wound on finger(s)","bleeding from wound on foot (feet)","bleeding from wound on great toe","bleeding from wound on hand(s)","bleeding from wound on head","bleeding from wound on leg(s)","bleeding from wound on toe(s)","bleeding has stopped","bleeding in varicose vein","bleeding scalp","blepharitis","blindness","blister(s) or bump(s) around mouth","blister(s) or bump(s) in antecubital fossa","blister(s) or bump(s) in diaper area","blister(s) or bump(s) in genital area","blister(s) or bump(s) in genital area in females","blister(s) or bump(s) in genital area in males","blister(s) or bump(s) in groin","blister(s) or bump(s) in mouth","blister(s) or bump(s) in nasolabial folds","blister(s) or bump(s) in popliteal fossa","blister(s) or bump(s) on abdomen","blister(s) or bump(s) on arm(s)","blister(s) or bump(s) on back","blister(s) or bump(s) on eyelid(s)","blister(s) or bump(s) on face","blister(s) or bump(s) on face 2-4 weeks after birth","blister(s) or bump(s) on forehead","blister(s) or bump(s) on great toe","blister(s) or bump(s) on hand(s)","blister(s) or bump(s) on head","blister(s) or bump(s) on leg(s)","blister(s) or bump(s) on lips","blister(s) or bump(s) on nose","blister(s) or bump(s) on skin","blister(s) or bump(s) on toe(s)","blisters on palms of hands","blisters on soles of feet","blisters or bumps in skin folds","bloating","bloating at least 3 days a month for the last 3 months","blocked ear","blocked tear duct","blood in cough","blood in stool","blood on surface of stool","blood on toilet paper","blood stains on sheets pillowcases mattresses","blood sugar < 50 mg/dL","blood type O","bloody diarrhea","blotchy red halo around lesions on arm(s)","blotchy red halo around lesions on back","blotchy red halo around lesions on chest","blotchy red halo around lesions on face","blotchy red halo around lesions on leg(s)","blotchy red halo around skin lesions","blotchy red rash with tiny white center in newborns","blue lips or dusky skin","blue-gray birth marks","blue-gray pigmentation in multiple areas","blue-gray pigmentation on abdomen","blue-gray pigmentation on ankle","blue-gray pigmentation on arm(s)","blue-gray pigmentation on back","blue-gray pigmentation on buttocks","blue-gray pigmentation on chest","blue-gray pigmentation on elbow","blue-gray pigmentation on foot (feet)","blue-gray pigmentation on leg(s)","blue-gray pigmentation on pelvis","blue-gray pigmentation on shoulder","blue-gray pigmentation on wrist","bluish discoloration of cervix at 8-10 weeks pregnancy","bluish vesicles in mouth","bluish vesicles on lower lip","blushing","bodyache","boggy depressions in calf muscle","boggy pale nasal mucosa","bone age equal to chronological age","bone age equal to height age","bony bump on inside edge of big toe","bored with routine","bottle propping","bouncing","bowling","brachycephaly","brain death","breaking of bag of water","breast abscess","breast atypical ductal or lobular hyperplasia","breast cancer in relative younger than 50 years","breast fibroadenoma with complex features","breast fibrocystic disease","breast intraductal papilloma","breast lump behind nipple","breast milk inadequate","breast milk jaundice","breast pain associated with periods","breast solitary papilloma","breast ulceration","breastfeeding","breasts leaking watery premilk discharge","breath holding spell after painful stimulus","breath smells of alcohol","breathing fast","bright red well-defined plaques in diaper area","bright red well-defined plaques in groin","brittle diabetes","broken bone","broken bone in arm(s)","broken bone in elbow joint","broken bone in finger(s) or thumb(s)","broken bone in foot (feet)","broken bone in great toe","broken bone in hand(s)","broken bone in nose","broken bone in toe(s)","broken bone in wrist joint","broken collarbone","broken hairs of different lengths arranged in a circular pattern","broken skull bone","bronchial breath sounds","bronchiectasis","bronchiolitis","bronchitis","bronchogenic carcinoma","brown or black macules on skin","bruise at site of injection","bruised finger(s)","bruised great toe","bruised nose","bruised toe(s)","bruises on face","bruises on foot (feet)","bruises on head","bruises on leg(s)","bruising lip","bulge in vaginal canal","bulge outside vagina","bullying","bump in skin 1/4 to 2 inches","bump or vesicle on lips","bumps around nails","bumps feel like rough sandpaper","bumps in skin that can be moved easily with fingers","burn","burning feet syndrome","burning in calves","burning in thighs","burning or stinging under breasts","burning pain in extremities","burning pain in foot worse on lying down","burning pain in genital area","burning pain in leg(s)","burning pain sole of foot","burning sensation in back of throat","burning sensation in stomach after meals","burning urination","burning urination in females","burning urination in males","burns of hand(s)","cafe au lait spots","caffeine withdrawal","calcaneal apophysitis","calcium stones","calf pain","calicivirus infections","callus over plantar surface of metatarsal head","camping","campylobacter infections","can speak in complete sentences during an asthma episode","candida diaper dermatitis","candidal onychomycosis","candidiasis","cannot pretend play","carcinoma of prostate","cardiac arrhythmias","cardiogenic shock","cardiopulmonary arrest","cardiopulmonary resuscitation","cardiovascular disease","cardiovascular instrumentation","carotenemia","carpal compression test","cat scratch","cataract","cataract progression","cataract surgery","cauliflower like growth on sole of foot","cauliflowerlike plaques on hand(s)","cavity in tooth","celiac disease","cellulitis","central intraductal papilloma","central retinal vein occlusion","cerebrovascular accidents","cerumen impaction","cervical dilatation and effacement","cervical dysplasia","cervical erosion","cervical lymph node enlarged > 1.5 cm","cervical lymphadenitis","cervical radiculopathy","cervical spondylosis","cervical spondylotic myelopathy","cesarean delivery","chalazion","change in bowel habits","change in cognition","change in color of mole","change in gum color from pink to red","change in size shape or feel of breast or nipple","change in sleep patterns","change in tooth color","change in weather","changing character of mole","chaotic relationships","chapped lower lip","charcoal grills","cheesy vaginal discharge","chemical irritant vulvovaginitis","chemical used in hobbies","cherry angioma","cherry red lesion on abdomen","cherry red lesion on back","cherry red lesion on chest","cherry red lesion on skin","cherry red macules or papules on skin","chest dull to percussion","chest pain","chest pain at early hours of morning","chest pain at rest","chest pain for 30-60 minutes","chest pain in early morning hours","chest pain intense and unremitting","chest pain more than 20 minutes","chest pain not relieved by nitroglycerin","chest pain on exertion","chest pain on lying flat","chest pain radiating to jaw","chest pain radiating to left arm","chest pain radiating to left shoulder","chest pain radiating to neck","chest pain radiating to stomach","chest pain relieved by nitroglycerin","chest pain relieved by stopping activity","chest pain substernal","chest pain with coughing","chest pain with minimal activity","chest pain within last 2 days","chest pain worse with stress","chest tightness at night","chest tightness or pain during or after exercise","chest wall tenderness in skin or muscles or ribs of chest","chewing gum","chewing objects","chicken skin or goose bumps on upper outer arms or thighs","chickenbumps or goosebumps on buttocks","chickenbumps or goosebumps on cheeks","chickenbumps or goosebumps on face","chickenpox","childbirth after age 30 years","chills","chlamydia infections","chlamydial salpingitis","choledocholithiasis","cholestatic jaundice","cholesterol gallstones","chondrocalcinosis","chondromalacia patella","chromosomal abnormalities causing spontaneous abortion","chronic abacterial prostatitis/chronic pelvic pain syndrome (CPPS)","chronic bronchitis","chronic daily headache","chronic diseases","chronic glomerulonephritis","chronic hyperkeratotic tinea pedis","chronic insomniac","chronic kidney disease stage 1-GFR >90 mL/min/1.73 m2","chronic kidney disease stage 2-GFR 60-89 mL/min/1.73 m2","chronic kidney disease stage 3-GFR 30-59 mL/min/1.73 m2","chronic kidney disease stage 4-GFR 15-29 mL/min/1.73 m2","chronic kidney disease stage 5-renal failure GFR < 15 mL/min/1.73 m2 or dialysis","chronic lung disease","chronic migraine","chronic nonbacterial prostatitis","chronic obstructive pulmonary disease","chronic pain","chronic pelvic inflammatory disease","chronic pelvic pain","chronic polyarticular arthritis","chronic prostatitis","chronic sinusitis","chronic stationary psoriasis","chronic urinary tract infection","chronic venous insufficiency","cigarette smoking","circumcision problems","clear fluid dripping from nose","clear vaginal secretions","climbing hill","climbing stairs excessively","clinical pelvimetry","clinically isolated syndrome of MS","clonic phase of seizure activity","closed comedones periorbital area","closed comedones postauricular area","closed comedones temporal area","closed fracture","closed head injury","cloudy murky or turbid urine","clue cells present on wet mount of vaginal discharge","cluster of apneas","cocaine use","cognitive defect","cold sore(s) on lip","colic","coliform bacterial infections","colon cancer","colonic angiodysplasia","colposcopy","columella and caudal septum deviated from midline","combined hyperlipidemia","comedones","common bile duct obstruction","common cold","common warts","community acquired pneumonia","community-acquired MRSA","community-acquired pneumonia","complaining","compliant","compression fractures spine","concealed penis","concussion","cone biopsy cervix","conflict with parents","conflict with peers","conflict with teachers","confusion from high fever","congenital melanocytic nevus","congenital overlapping of 4th toe","congenital overlapping of 5th toe","conjunctival papillae","conjunctival petechiae","conning others for profit or pleasure","constant feeling of discomfort in legs","constant phase of renal colic","constantly rubbing leg(s)","constipation","constitutional short stature","consumption of charred meats","consumption of contaminated fried rice","consumption of contaminated fruits","consumption of contaminated kingfish","consumption of contaminated leafy vegetables","consumption of contaminated legumes","consumption of contaminated mahi-mahi","consumption of contaminated mollusks","consumption of contaminated nuts","consumption of contaminated raw fish","consumption of contaminated raw vegetables","consumption of contaminated shrimp","consumption of contaminated spices","consumption of contaminated tuna","consumption of deli meats","consumption of diet high in saturated animal fats","consumption of fructose rich foods and drinks","consumption of gas producing foods","consumption of highly saturated vegetable oils","consumption of homemade canned food","consumption of inorganic mercuric salts","consumption of liver","consumption of processed meats","consumption of raw eggs","consumption of red meat","consumption of sardines","consumption of sweetbread","consumption of undercooked meat","consumption of unpasteurized soft cheese","contact lens acute red eye","contact with CA-MRSA carrier","contaminated food","contaminated water","continuing care facilities","continuing to smoke despite health hazards","continuous non stop coughing","controlling behavior","contusion","convulsions","copper wiring of vessel wall on retinal exam","cor pulmonale","corneal astigmatism","corneal edema","corneal injection","coronary artery calcifications","coronary artery disease","coronary vasospasm","coronavirus infections","cottage cheese like lesions in mouth","cough","cough during or after exercise","cough wet","cough with sputum expectoration for at least 3 months a year during a period of 2 consecutive years","cough with yellow or green phlegm","cough worse in the morning","coughing at night","coughs during exercise","cow's milk intolerance","coxsackie virus A16 infections","coxsackievirus B infections","coxsackievirus infections","cracked flaking peeling skin between the toes or side of foot","cracked lips","cracked nails","cracked skin","cracks between toes","cracks on soles of feet","cradle cap","cramping abdominal pain","cranberry juice","cranial muscle tenderness","crash dieting","craving drug","craving for alcohol","craving novelty","craving sugar","crepitus over radiocapitellar joint with passive supination-pronation of forearm","criteria for measuring disease progression in RA","criteria for measuring disease remission in RA","criteria for measuring functional status in RA","cross country running","crossed straight leg raising test positive","crushing chest pain","crusting lesions","crusting of medial canthus","crusting of meibomian orifices","crusting on bumps","crusty eyelashes","crying usually in the evenings","crying with arched back","crying with clenched fists","crying with legs curled up","crying with tense abdominal muscles","crystal deposition disease","curvature of spine","cut on elbow","cut on face","cut on finger(s) or thumb(s)","cut on foot (feet)","cut on great toe","cut on hand(s)","cut on jaw","cut on knee","cut on leg(s)","cut on nose","cut on scalp","cut on skin","cut on toe(s)","cut on wrist","cutaneous infarction","cutaneous xanthomas","cuticle infected","cyclic mastalgia","cycling","cystitis","cystocele","damage to anterior talofibular ligament","damage to calcaneofibular ligament","damage to posterior talofibular ligament","damaged hair follicles","dancing","dangerous type of injury","dark blue patches on skin since birth","dark circles under eyes","dark coloration of tooth","dark reddish tan patches on arm(s)","dark reddish tan patches on back","dark reddish tan patches on chest","dark reddish tan patches on leg(s)","dark reddish tan patches on neck","dark reddish tan patches on underarms","dark stains or spots of bedbug excrement on mattresses bed clothes walls","daycare attendance","daytime sleepiness","debris in external ear canal","decorative tattoos","decrease in diastolic BP of at least 10mm within 3 mins of standing","decrease in systolic BP of at least 20mm within 3 mins of standing","decreased active range of motion of shoulder","decreased bleeding after oral contraceptives","decreased bone mineralization","decreased breath sounds unilateral","decreased effectiveness of throwing","decreased frequency of menstrual periods","decreased heart variability in response to deep breathing","decreased internal rotation shoulder","decreased mobility of the tympanic membrane","decreased omega-3 long-chain polyunsaturated fatty acid (LCPUFA) in diet","decreased sexual desire","decreased sexual desire in females","decreased sexual desire in males","decreased skin turgor","decreased systolic blood pressure","decreased throwing distance","decreased vomiting","decreasing focusing ability for near objects","deep infrapatellar bursitis","deep keratotic lesions around nails","deep keratotic lesions on heel","deep keratotic lesions on metatarsal heads","deep plantar warts","deep sinus tracts in between toes","deep sinus tracts plantar surface of foot","deep ulcerations in diaper area","deep venous insufficiency","defiant behavior","deformed discolored nails","deformity MTP joints","deformity of great toe","degenerative cervical spine stenosis","degenerative joint disease","delayed bone age compared to chronological age","delayed cord clamping","delayed development","delayed gastric emptying","delayed linear growth in first 3 years of life","delayed pubertal growth spurt","delayed verbal or ocular responses","deliberately annoying other people","dementia","denial of urge to defecate","dental braces","dental infections and other dental conditions","dental problems","dental procedures","depression","depression before menstrual period","depression during trying to quit smoking","depression for at least 2 weeks","depression rating scales","dermatofibroma","dermatographism","dermatomal pattern of sensory symptoms","dermographism","descending perineum syndrome","descent of fetal presenting part through maternal pelvis","development of pubic and axillary hair","developmental septal deviation","diabetes mellitus","diabetes mellitus type 2","diabetic ascending neuropathy","diabetic foot","diabetic nephropathy","diabetic neuropathy","diabetic retinopathy","diagnosis of intrinsic sphincteric deficiency (ISD) in urodynamic tests","diaper rash","diaper rash lasting more than 3 days","diarrhea","diastolic BP in adults >= 120 mm Hg","dicrotic pulse","diet history of inadequate iron or vitamin intake","diet rich in meat","dietary deficiency of iron","dietary triggers","difficult labor","difficulty adapting to changing light conditions","difficulty awaking","difficulty breathing","difficulty breathing through nose","difficulty breathing when lying flat","difficulty breathing with exertion relieved on resting","difficulty falling asleep","difficulty flexion of knee","difficulty hearing high pitched sounds such as (s) or (th)","difficulty hearing in noisy areas","difficulty hearing women's voices","difficulty localizing sound","difficulty making decisions","difficulty making friends","difficulty moving tongue side to side","difficulty problem solving","difficulty recognizing faces","difficulty seeing at night or in dim light","difficulty seeing fine detail","difficulty sleeping","difficulty speaking","difficulty staying asleep","difficulty swallowing","difficulty touching tongue to palate","difficulty understanding complex or unfamiliar vocabulary","difficulty understanding rapid speech","difficulty urinating","difficulty urinating in females","difficulty urinating in males","difficulty wearing dentures","difficulty with central auditory processing of information","diffuse abdominal pain","digital exam of vagina","digital rectal examination (DRE) abnormal","dilated blood vessels on hand(s)","dilated veins on breast","dilated vessels in the clear tissue covering the white of the eye","diminished lumbar extension","dimple sign positive","diphtheria vaccine","dirt in wound","disaccharidase deficiency","discharge from cervix","discharge from penis","discolored teeth","discrete yellow brown scaly or erythematous papules in diaper area","displays excessive emotionality","distended veins in popliteal fossa","disturbed interpersonal relationships","disturbing dreams","diverticular bleeding","diverticulitis","diverticulosis","dizziness on standing up","dizziness while straining at stool","does not adjust gaze to look at same objects as others","does not have asthma action plan","does not play interactive games","does not point to objects to bring them to attention of others","does not refer to self correctly","does not use spacer with inhaler","domestic violence","douches","downhill running","drawing up legs during crying episodes","drawing up legs during episodes of stomach pain","dribbling after urinating","dribbling after urinating in females","dribbling after urinating in males","drinking carbonated drinks","drinking cow's milk","drinking from a bottle throughout day","drinking green Gatorade or PowerAde","drinking more than 3 alcoholic drinks per day","drinking while lying on back","driver fatigue","drop-arm test positive","drowsiness","drug allergy","drug hypersensitivity","drug overdose","drug paraphernalia","drug tolerance","drugs and toxins","drusen","dry air","dry mucous membranes","dry patches on leg(s)","dry scales on scalp","dry scaly itchy red skin","dry scaly itchy red skin on back","dry scaly itchy red skin on chest","dry scaly itchy red skin on hands","dry scaly itchy red skin on legs","dry scaly itchy red skin on thighs","dry scaly rash on face","dry skin","dry skin on abdomen","dry skin on hand(s)","dry skin on leg(s)","dry skin on scalp","dry skin worse in winter","dry vasomotor rhinitis","dull ache over distal one-third of posteromedial tibia","duodenal ulcers","dysbetalipoproteinemia","dyshidrotic eczema","dysmenorrhea before age 20 years","dysmenorrhea beginning after age 25 years","dysuria in males with first morning void","dysuria in males worse with alcohol consumption","ear discharge","ear infection","ear pierced","earache","earlier menarche","early breast enlargement in girls < 3 years of age","early deepening of voice in boys","early fatigue during exercise","early feeling of fullness at least 3 days a month for the last 3 months","early increase in height growth","early muscle growth in boys","early sexual debut","easily distractible","easily influenced by others","eating an abnormally large amount of food within a defined period of time","eating before going to sleep","eating broccoli","eating green popsicles","eating green sherbet","eating large amounts of high calorie foods","eating large amounts of yellow and green vegetables","eating problems during infancy or early childhood","eating spinach","eccentric muscle overload of shoulder","echovirus infections","edema nasal cavity","edematous cervix","ejaculatory dysfunction","elevated LDL cholesterol","elevated arm stress test","elevated lesions on conjunctiva","elevated lesions on cornea","elevated serum triglycerides","elongated wide-bore stools","empathy","emphysema","empty can test","empty hair follicles","endotracheal tubes","engagement of widest diameter of presenting fetal part in the maternal pelvis","enlarged adenoids","enlarged fluid filled sac near joint","enlarged prostate","enlarged tonsils","enlarged uterus after bimanual examination","enlargement of penis and scrotum in boys","enterobiasis","enteroviral infection","enterovirus infections","environmental allergies","environmental exposures","epidemic gastroenteritis","epidermoid cysts","epididymitis","epididymo-orchitis","epigastric abdominal pain","episiotomy","episodic cough or wheezing","eruptive xanthomas on extensor surfaces of elbows","eruptive xanthomas on extensor surfaces of knees","eruptive xanthomas on shoulders","erythema infectiosum","erythema on cheeks with sparing of nasal perioral and periorbital areas","erythema toxicum","erythematous edematous linear lesions on arm(s)","erythematous edematous linear lesions on chest","erythematous edematous linear skin lesions","erythematous macular lesions in mouth","erythematous macular lesions on hard palate","erythematous macular lesions on tongue","erythematous macules in armpit","erythematous macules in flexural surface of elbows","erythematous macules in flexural surface of knees","erythematous macules in groin","erythematous macules in skin folds","erythematous macules in throat","erythematous macules on anterior pillars of fauces","erythematous macules on posterior pharynx","erythematous macules on soft palate","erythematous macules on tonsils","erythematous macules on uvula","erythematous maculopapular rash","erythematous papule or pustule","erythematous papules vesicles in throat","erythematous papules vesicles on anterior pillars of fauces","erythematous papules vesicles on soft palate","erythematous papules vesicles on tongue","erythematous papules vesicles on tonsils","erythematous papules vesicles on uvula","erythematous papules vesicles or pustules in skin","erythematous papules vesicles or pustules on abdomen","erythematous papules vesicles or pustules on arm(s)","erythematous papules vesicles or pustules on back","erythematous papules vesicles or pustules on chest","erythematous papules vesicles or pustules on face","erythematous papules vesicles or pustules on leg(s)","erythematous scaly plaque in skin","erythematous scaly plaque on abdomen","erythematous scaly plaque on arm(s)","erythematous scaly plaque on back","erythematous scaly plaque on chest","erythematous scaly plaque on hand(s)","erythematous scaly plaque on leg(s)","erythematous scaly plaques in skin","erythematous scaly plaques on arm(s)","erythematous scaly plaques on chest","erythematous scaly plaques on neck","erythematous scaly rash in lumbosacral areas","erythematous scaly rash on abdomen","erythematous scaly rash on arms","erythematous scaly rash on back","erythematous scaly rash on buttocks","erythematous scaly rash on chest","erythematous scaly rash on elbows","erythematous scaly rash on genitals","erythematous scaly rash on glans penis","erythematous scaly rash on intergluteal clefts","erythematous scaly rash on knees","erythematous scaly rash on legs","erythematous scaly rash on retroauricular area","erythematous scaly rash on scalp","erythematous scaly rash on skin","erythematous scaly rash on umbilicus","esophagitis","essential tremor","ethnic hirsutism","examining women with pelvic organ prolapse","excessive arm activity","excessive caloric intake","excessive maternal weight gain","excessive trabecular pigmentation deposits","excessively large bowel movements","exclamation point looking hairs at edge of bald patch","excoriation in skin plaque","exercise challenge provoking respiratory symptoms","exercise induced tachycardia","exposed to lightning","exposed to sun","exposure to aerosols","exposure to air fresheners incense sticks or scented candles","exposure to atmospheric pollution","exposure to bleach","exposure to car and diesel exhaust","exposure to cleaning products","exposure to cockroaches","exposure to cold or hot air","exposure to cosmetics","exposure to degreasing agents","exposure to dental cement","exposure to denture cleaners","exposure to disinfectants","exposure to dust mites","exposure to flavoring agents cinnamon compounds","exposure to formaldehyde","exposure to hairspray","exposure to ingredients of dental prosthesis","exposure to lead","exposure to lip balms","exposure to lipsticks","exposure to paint fumes","exposure to pesticides","exposure to pet fur or feathers","exposure to pet saliva","exposure to pet urine","exposure to potassium","exposure to preservatives","exposure to ragweed","exposure to rubber gloves","exposure to rubber orthodontic elastics","exposure to smog","exposure to topical antibiotics","exposure to topical antiseptics","exposure to topical steroids","exposure to vehicle or truck exhaust","extension and internal rotation of fetal occiput around maternal symphisis pubis","extensive time spent smoking or buying tobacco","external hemorrhoids","external rotation of fetal occiput and restitution to original alignment with body","extremes of maternal age","exudative macular degeneration","eye allergy","eye discharge","eye discharge clear","eye pain","eye strain","eyelid tic","eyes unable to focus light","face swelling on one side","facial pain","failure to properly clean exercise equipment","fall on outstretched hand","familial IgA nephropathy","familial combined hyperlipidemia","familial heart disease","familial macrocephaly","familial overlapping of toes","familial short stature","family history based risk assessment tools","family history of ADHD (ADD)","family history of acne","family history of age related hearing loss","family history of age related macular degeneration","family history of alcoholism","family history of allergic diseases","family history of allergic rhinitis","family history of amblyopia","family history of anemia","family history of asthma","family history of atopic dermatitis","family history of autoimmune disease","family history of bipolar disorder","family history of breast cancer in a first-degree relative","family history of colon cancer","family history of dysmenorrhea","family history of early puberty","family history of essential tremor","family history of gallstones","family history of glaucoma","family history of hearing loss","family history of heart disease","family history of heart disease age less than 55 years for men","family history of hypertriglyceridemia","family history of intestinal polyps","family history of kidney stones","family history of osteoarthritis","family history of osteoporosis","family history of psoriasis","family history of restless legs syndrome","family history of schizophrenia","family history of scoliosis","family history of seborrheic keratosis","family history of varicose veins","family history of venous thromboembolism","family problems","family stress","far sightedness","fast heart rate after painful stimulus","fasting blood sugar >=100 mg/dL","fatigue","fatigue in calves","fatigue in feet","fatigue in thighs","fatty liver","febrile delirium","fecal soiling during the day","feeling as if something is falling out of vagina","feeling keyed up or on edge","feeling of fullness in head","feeling of incomplete emptying of bladder","feeling of incomplete emptying of rectum","feeling of not having slept at all","feeling of superiority","feeling stoned","female completion of puberty 1.5-8 years","female sexual development with development of breast bud at 8.87-11 years","feminine sprays","femoral anteversion","fetal distress","fetal movements around 20 weeks pregnancy","fever","fever without source in infants","fewer than 3 bowel movements per week","fibroadenoma","fibroadenomas","fibrocystic disease of the breast","fibromyalgia rheumatica","filiform warts","financial problems","fine scaly patches behind knee","fine scaly patches in bend of elbow","fine scaly patches on arm(s)","fine scaly patches on face","fine scaly patches on leg(s)","finely papular red rash","finger sucking","fingertip blood glucose measurements","firm globe","first and second Steinmann signs","first stage of labor-regular uterine contractions with 10cm cervical dilatation","first trimester from conception to about the 12th week of pregnancy","first-born child","first-degree female relative 55 years or younger who had MI","first-degree male relative 45 years or younger who had MI","fissure in anus","fissures and excoriations of vulva and vagina","fixed frequency of tremor","flaky white yellowish rash on eyelids","flaky white yellowish scales on scalp","flank or abdominal pain radiating to testicles","flank or abdominal pain radiating to vulvar area","flank or abdominal pain starting slowly and increasing in severity","flank pain","flank pain radiating to groin","flat warts on face","flat warts on hand(s)","flattery","flatulence at least 3 days a month for the last 3 months","flea bites","flesh-coloured or slightly pigmented smooth or warty papules on face","flesh-coloured or slightly pigmented smooth or warty papules on hand(s)","flesh-coloured or slightly pigmented smooth or warty papules on shins","flexible flat foot","flexor tenosynovitis of fingers","flight of ideas","floating spots in front of eyes","flu symptoms","fluctuance","fluctuant swelling on gums extending to buccal side of gums","fluctuant swelling on gums extending to gingival-buccal reflection","fluorescein test positive","flushing of face","flying in an airplane","foamy vaginal discharge","focal vitiligo","folds around eyes due to to chronic eye rubbing","follicular keratosis arm(s)","follicular keratosis face","folliculitis","fondling","food allergy","forced expiratory time test","foreign body below inferior turbinate","foreign body foot","foreign body in conjunctiva","foreign body in cornea","foreign body in eye","foreign body in foot","foreign body in nose","foreign body sensation in skin","foreign body skin","foreskin adhered to glans after circumcision","foreskin swollen","forward-flexed gait","foul discharge from skin","foul odor in vaginal area","foul odor of urine","foul smelling vaginal discharge","fracture base of the second metatarsal","fracture distal phalanx","fracture great toe","fracture humerus or fracture radius/ulna","fracture metacarpal","fracture metatarsal","fractures","frequent arousals from sleep","frequent bathing or showering","frequent changes in eyeglass prescriptions","frequent cough with sputum","frequent eye blinking","frequent hospitalizations for asthma","frequent periods","frequent swallowing","frequent upper respiratory infections","frequent use of no spill sippy cup","friable cervix","frontal or maxillary sinus tenderness","fronto-occipital head circumference measurement","frustration","full or partial thickness burns of (foot) feet","full or partial thickness burns of face","functional amblyopia","functional heart murmur","functional systolic flow murmur","fungal infection nails","fungal infections scalp","furrows in skin","gallstones","gangrene","gangrenous appendicitis","gastric bypass surgery","gastric ulcers","gastritis","gastrointestinal bleeding","general anesthesia","generalized rash with pale pink papules","generalized swelling of body","genital herpes","genital herpes infections","genital ulcer(s)","genital ulcer(s) in females","genital ulcer(s) in males","genital warts","genu valgum","geographic tongue","germline mutations in BRCA1 and BRCA2 genes","gestational diabetes","gestational hypertension","giardiasis","gingivitis","glasses needed for reading","glaucoma","glib","golfing","gonioscopy","good response to levodopa or dopamine","gout","gouty arthritis","grade 1 cystocele-bladder dropping a little into the vagina","grade 2 cystocele-bladder dropping to reach vaginal opening","grade 3 cystocele-bladder bulging out through vaginal opening","gram-negative bacteremia","grapefruit juice","greasy oily areas back of neck","greasy oily areas behind ears","greasy oily areas creases of nose","greasy oily areas eyebrows","greasy oily areas eyelids","greasy oily areas face","greasy oily areas forehead","greasy oily areas in scalp","greasy oily areas lips","greasy oily areas of skin","greasy oily areas on chest","greasy oily areas outer ears","greasy scales on scalp","great toe bent towards 5th toe","grinding sensation on attempt to lift arm","group A beta hemolytic strep infections","grouped dome-shaped papules in skin","grouped herpetiform vesicles on erythematous base along one or more skin dermatomes","groups of blisters in genital area in males","groups of blisters on cheeks","groups of blisters on lips","groups of blisters on vermilion border of lips","groups of itchy papules in skin","groups of itchy papules on abdomen","groups of itchy papules on arm(s)","groups of itchy papules on back","groups of itchy papules on chest","groups of itchy papules on foot (feet)","groups of itchy papules on hand(s)","groups of itchy papules on leg(s)","groups of itchy vesicles in skin","groups of itchy vesicles on abdomen","groups of itchy vesicles on arm(s)","groups of itchy vesicles on back","groups of itchy vesicles on chest","groups of itchy vesicles on foot (feet)","groups of itchy vesicles on hand(s)","groups of itchy vesicles on leg(s)","growth along or parallel to lower percentiles of growth curves during childhood","growth curve parallel to normal growth curve during childhood","growth of facial hair in boys","gunshot wound","gunshot wound arm(s)","gunshot wound foot (feet)","gunshot wound hand(s)","gunshot wound leg(s)","had asthma inhaler or nebulizer and is better now","had circumcision","had convulsions but not seizing now","had pelvic inflammatory disease","had recent chickenpox vaccine","hair pull test","hair weaves","hammer toe","hammertoe","hand foot mouth disease","handprint pattern from lime juice","hangnail","hard swollen painful toenail","having sex","head and neck surgery","head lice","headache","headache dull","headache for 30 mins to 7 days","headache frontotemporal","headache in front of head","headache lasting 4-72 hours","headache pounding","headache pressure like","headache relieved by massaging scalp temples or base of neck","headache sinus type","headache starting as a dull ache and getting worse by the minute or hour","headache starting when awake","headache triggered by fatigue","headache triggered by glare","headache triggered by noise","headache triggered by stress","headache while doing fine work with hands","headache worse on bending down","headache worse on movement","headache worse on sleeping in cold room","headache worse with coughing or sneezing","healthcare workers","hearing loss","hearing loss not associated with other signs and symptoms","heart murmur","heart murmur less than 3/6 intensity","heart rate irregular","heart rate less than 100 during asthma attack","heart rate regular > 100 beats/min","heartburn","heartburn worse after eating large meal","heartburn worse on bending over","heartburn worse on lying flat on back","heartburn worse with wearing tight clothes","heaviness in genital area in females","heaviness or fullness in leg(s)","heavy lifting","heavy menstrual periods","heavy object dropped on toe","heel pain aggravated by sprinting","heel pain increased with activity","heel pain increasing with activity","heel pain on prolonged standing","heel pain on prolonged walking","heel pain relieved by rest","heel pain relieved by unloading on affected foot","heel pain with active toe raises","heel pain worse after prolonged walking","heel pain worse on prolonged standing","heel percussion test producing pain in hip","heel spur","heel spurs","hemangiomas","hematoma","hemoconcentration","hemodialysis","hemorrhoidal prolapse","hemorrhoids","hepatitis","hepatitis A virus infection","hepatitis B virus infection","hepatitis C virus infection","hepatitis D virus infection","hepatitis E virus infection","hepatojugular reflux positive","herniated disk","herpangina","herpes simplex virus infections","herpes zoster of mandibular branch of cranial nerve V","herpes zoster of maxillary branch of cranial nerve V","herpetic stomatitis","herpetiform vesicles on cheek","hhv 7 infections","hiatus hernia","hiccups","hidradenitis suppurativa","high blood pressure","high blood pressure while straining","high carbohydrate diet","high cholesterol","high fat diet","high frequency hearing loss","high pitched systolic heart murmur radiating to back and armpit","high salt diet","hiking","history of 2 or more years of infertility","history of UTI","history of acne","history of breast abscess","history of gynecological surgery","history of heart attack or bypass surgery","history of heart failure","history of increased use of home bronchodilators without improvement","history of muscle pain with statins","history of painful vesicular eruption in a dermatomal distribution","history of previous blood clots","history of severe eruption of shingles","history of severe pain before eruption of shingles","history of sexually transmitted diseases (STDs)","history of shingles","history of shingles in distribution of brachial plexus","history of shingles in sacral area","history of shingles in thoracic area","history of shingles in trigeminal distribution","history of shingles on jaw","history of smoking more than 55 pack-years","history of varicella-zoster virus (VZV) infections","hives","homogenous white adherent vaginal discharge","homosexuality","honey colored scabs","horseshoe pattern of hair at sides of head","hospital acquired infections","human herpes virus 7 infections","human metapneumovirus infections","hydrocele","hymenal opening closed","hymenal tags","hyperactive behavior","hyperemesis gravidarum","hyperkeratotic papules on finger(s)","hyperkeratotic papules on foot (feet)","hyperkeratotic papules on knee(s)","hyperlipidemia","hypermetropic anisometropia","hypertensive brain injury","hypertensive emergency","hypertensive heart disease","hypertensive retinopathy","hypertensive urgency","hypertrophied nasal turbinates","hyperuricosuria","hyperventilation","hypochondria","hypoglycemia","hypoglycemia unawareness","hypopigmented scaly patches on abdomen","hypopigmented scaly patches on arm(s)","hypopigmented scaly patches on back","hypopigmented scaly patches on chest","hypopigmented scaly patches on face","hypopigmented scaly patches on leg(s)","hypopigmented scaly patches on neck","hypopigmented scaly patches on skin","hypothyroidism","hypovolemic shock","idiopathic BPPV","idiopathic IgA nephropathy","idiopathic decreased production of breast milk","idiopathic dry eyes","idiopathic epistaxis","idiopathic hyperhidrosis","idiopathic infertility","idiopathic mononeuropathy","idiopathic oligo/azoospermia","idiopathic oligospermia","idiopathic polyneuropathy","idiopathic scoliosis","idiopathic stress incontinence","idiopathic telangiectasia","idiopathic toe walking","idiopathic tongue fissures","idiopathic urge incontinence","immunization H1N1","immunization diphtheria","immunization hepatitis A","immunization hepatitis B","immunization influenza","immunization measles","immunization pertussis","immunization polio","impaired sensations in foot (feet)","impetigo","impotence","improper stretching exercises","impulse on coughing palpable","impulsiveness","inability to complete tasks","inability to follow instructions","inability to have vaginal penetration","inability to listen well","inability to maintain erection","inability to open eye due to foreign body sensation","inability to organize","inability to react logically","inability to read small print","inability to recognize people and objects","inability to recognize printed letters and words","inadequate hand washing","inadequately cooked foods","inappropriate behavior","inappropriate footwear","inattentive","inconsolable crying in infants 2 weeks to 4 months","inconspicuous penis from congenital fat pad","incontinence of stool","incontinence of urine","incontinence of urine and or stool","incontinence of urine and or stool in females","incontinence of urine and or stool in males","incontinence of urine in females","increase in growth velocity in boys 11 years","increase in growth velocity in girls 9 years","increase in height","increase in hip size in girls","increase in shoulder width in boys","increased Mallampati score","increased appetite","increased cervical lordosis","increased growth of short new scalp hair","increased humidity","increased molding of bones of skull in newborn","increased number of lifetime sexual partners","increased pigmentation around neck","increased pigmentation in axillae","increased pronation of foot","increased restlessness at night or evening","increased skin sensitivity to sun","increased sweating","increased sweating on hand(s)","increased thirst","increasing pain in cervical radiculopathy","increasing respiratory effort for > 10 seconds followed by arousal from sleep","increasing sense of tension before hair pulling","indirect inguinal hernia","indirect ophthalmoscopy","indwelling catheters in bladder","inevitable abortion","infant of diabetic mother","infants of diabetic mothers","infected sores","infected stitch","infection around nail","infection in food handlers","infection of anterior mandibular tooth","infection of mandibular incisors","infection of maxillary canine","infection of molars","infection of third molar of mandible","infections of premolars","infectious colitis","infectious mononucleosis","infertility","infertility in females","infertility in males","inflamed oral mucosa","inflamed skin","inflammatory CPPS","inflammatory or vesicular tinea pedis","inflammatory papules arm(s)","inflammatory papules back","inflammatory papules chest","inflammatory papules face","influenza","influenza-like illness","infraclavicular murmur during systole and diastole","infrapatellar bursitis","infrequent passage of stools","infrequent use of moisturizers","ingrown hair","inguinal hernia","inguinal hernia in males","inhalation anesthesia","injury ankle","injury arm(s)","injury back","injury face","injury finger(s)","injury foot (feet)","injury forearm","injury hand(s)","injury head","injury knee","injury leg","injury lip","injury lung","injury nose","injury scalp","injury skin","injury tendon","injury toe(s)","injury tooth","insect bite less than 2 hours ago","insect bites","insistence on sameness","instep of foot in contact with ground when standing","insulin reaction","insulin resistance","interdigital tinea pedis","intermittent dyspnea","intermittent migratory monoarthritis","intermittent migratory monoarthritis in TMJ","intermittent migratory monoarthritis in knee","internal derangement of TMJ","internal metatarsal fractures","internal tibial torsion","interpersonal problems","intertriginous erythema","intertrigo","intoeing","intra-articular fracture big toe","intracapsular hip fracture femoral head","intracapsular hip fracture femoral neck","intracapsular hip fractures","intrapartum temperature >100.4ºF or >37.8ºC","intraretinal microvascular abnormalities","inversion injury of foot","involuntary repetitive periodic jerking limb movements","irregular firm prostate or nodule","irregular menstrual periods","irregular mole","irregular scaly plaques on finger(s)","irregular scaly plaques on foot (feet)","irregular scaly plaques on hand(s)","irregular scaly plaques on knee(s)","irritability","irritable bowel syndrome","ischemic foot","ischemic heart disease","itch-scratch cycle","itching","itching all over body","itching at site of injection","itching between toes","itching ear","itching foot","itching hand(s)","itching in genital area","itching in genital area in females","itching in genital area in males","itching in genital area or groin","itching in genital area or groin in females","itching in genital area or groin in males","itching in groin","itching in groin in females","itching in groin in males","itching leg(s)","itchy eye(s)","itchy nose","itchy papules on skin","itchy plaques in skin","itchy plaques knees","itchy plaques leg(s)","itchy plaques medial thighs","itchy plaques scrotum","itchy plaques vulva","itchy rash between toes","itchy scalp","itchy soles of feet","itchy tiny hard inflamed papules and vesicles around mouth","itchy tiny hard inflamed papules and vesicles on lips","jaw fatigue with talking","jaw pain with chewing","jogger's foot","jogging","joint creaking or grating","joint pain in evening","joint stiffness after prolonged sitting","joint stiffness after prolonged standing","jumping","juvenile plantar dermatitis","juxtaclavicular beaded lines","karate","keratic precipitates","keratoconjunctivitis","keratosis pilaris","kidney stone","labile hypertension","laceration lip","lack of breastfeeding","lack of fiber in diet","lacy rash on proximal arms and legs","language deterioration","lanugo hair in infants","laparoscopy","large baby in womb","large cell carcinoma of lung","large fetus","large for gestational age infant","large stools","last drink within 24 hours","late phase response 3-9 hours after initial aerobic exercise","laxatives do not help","leaking urine during exercise","leaking urine while getting up from sitting position","leaking urine while laughing","leaking urine while standing","leaking urine with sexual activity","learning problems","leaves seat in classroom when not supposed to","left lower quadrant abdominal pain","left upper quadrant abdominal pain","leg fatigue","lens opacities","lentigolike macules on arms","lentigolike macules on chest","lentigolike macules on face","lentigolike macules on scalp","lentigolike macules on skin","less than 3 bm per day in newborn","letter reversal","leukocytosis","lice seen","licking lips","light brown pigmented lesion in skin","limitation of movement","limitation of movement back","limited arm movements","limited interests","limited lateral bending of neck","limited leg movements","limited neck extension","limited neck movements","limited neck rotation","line on the skin running from belly button to pubis","linear growth velocity more than 2 SDs below the mean for gender and chronologic age","lipoma","little league elbow","liver cirrhosis","liver dysfunction","living in urban area","lobar pneumonia","lobular carcinoma of breast in situ (LCIS)","log roll test of hip","long standing rash with recent joint pain","long thin growths around eyelid(s)","long thin growths on face","looking or sounding sick","looks like a boil","looks like fungal infection in groin","looks like fungal infection of nails","looks like fungal infection of the foot","looks like fungal infection on face","looks like ringworm","loose hairs on face and neck","loss of all scalp hair","loss of friends or partners because of drinking","loss of hair in flattened area of head","loss of height","loss of interest in daily activities","loss of teeth","loud expiratory wheezing","louse feces in scalp","low back pain","low back pain radiating into buttocks","low back pain radiating to anterior thigh","low back pain radiating to bottom of foot","low back pain radiating to calf","low back pain radiating to groin","low back pain radiating to leg(s)","low back pain radiating to posterior thigh","low back pain worse after exercise","low back pain worse at night","low back pain worse on bending backwards","low back pain worse on sneezing coughing or straining","low back pain worse on walking a few yards","low back pain worse with one legged hyperextension maneuver","low back pain worse with standing on ipsilateral leg","low body weight","low high-density lipoprotein (HDL)","low self esteem","low socioeconomic status","low sperm count","low velocity injury","lower abdominal pain","lower abdominal pain during menses","lower abdominal pain during menses radiating to anterior or medial thigh","lower abdominal pain during menses radiating to back","lower abdominal pain increased by sexual intercourse","lower respiratory tract infections","lower urinary tract symptoms (LUTS)","lumbar puncture","lumbar radiculopathy","lumbosacral radiculoplexus neuropathy","lump in breast easily movable under the skin","lump in breast in females","lump on back of head","lump on gum near painful tooth","lump or swelling in genital area","lump or swelling in groin","lump or swelling in groin comes and goes","lump or swelling in groin in females","lump or swelling in groin in males","lump or swelling on face","lump or swelling on great toe","lump or swelling on head","lump or swelling on leg(s)","lump or swelling on toe(s)","lump or swelling with pus","lump under great toe","lump(s) in skin","lump(s) on back of heel","lump(s) on hips","lumpiness in breast(s) in females","lumps or blisters on eyelid margin","lumpy breasts before start of menstrual period","lying","lying awake for a long time before falling asleep","lymph nodes enlarged in groin","lymph nodes enlarged in multiple areas","lymph nodes enlarged in neck","lymph nodes erythematous","lymph nodes tender","lymphadenopathy","lymphocytosis","maceration between toes","macular degeneration","macular rash","maculopapular rash","malaise","male completion of puberty 2-5 years","male sexual development at genital stage 2 at 9.5-13.5 years","malignant melanoma","malleolar flare","malposed teeth","mandibular molar infections","manual breast stimulation","manual cervical distraction","manual labor","marijuana abuse","marital problems","martial arts","massive rectal bleeding","masturbation","maternal age >35 years","maternal history of previous LGA babies","maternal hyperglycemia","maternal obesity","may need burst of steroids","mean peak height velocity in boys 13.5 years","mean peak height velocity in girls 11.5 years","medial apophysitis","medial collateral ligament tear","medial epicondylitis","medication error","meibomian gland dysfunction","meningismus","menopause","menstrual period association","metabolic syndrome","metatarsalgia","microalbuminuria","microcytic hypochromic anemia","microsleeps","middle back pain","migraine","migraine attack for more than 15 days in a month for greater than 3 months","migraine attack for more than 72 hours","migraine aura 5-60 minutes before aura without headache","migraine aura- blurred vision","migraine aura- temporary scotomas","migraine aura-achromatopsia","migraine aura-altitudinal visual defects","migraine aura-blindness","migraine aura-bright or colored flashes","migraine aura-central scotomas","migraine aura-difficulty finding right words","migraine aura-eye pain","migraine aura-fractured vision","migraine aura-heat waves","migraine aura-heaviness of the limbs before a headache","migraine aura-homonymous hemianopsia","migraine aura-impaired sensations","migraine aura-latent period before the onset of headache","migraine aura-macropsia","migraine aura-micropsia","migraine aura-nausea","migraine aura-numbness starting in the hand migrating to the arm jumping to face lips and tongue","migraine awakening person at night","migraine like headaches","migraine trigger-caffeine","migraine trigger-caffeine withdrawal","migraine trigger-change in sleep pattern","migraine trigger-chocolate","migraine trigger-estrogen","migraine trigger-exposure to bright or fluorescent lighting","migraine trigger-exposure to tobacco smoke","migraine trigger-foods containing monosodium glutamate (MSG)","migraine trigger-head injury","migraine trigger-infectious diseases","migraine trigger-menstrual period","migraine trigger-missed meals","migraine trigger-motion sickness","migraine trigger-perfumes","migraine trigger-pregnancy","migraine trigger-strong odors","migraine without aura","migrainous disorder not fulfilling criteria","mild asthma","mild nonproliferative diabetic retinopathy (NPDR)","milia","miliaria","miliary sudamina on abdomen","miliary sudamina on feet","miliary sudamina on hands","milk bottle caries","missed meal","missing school","mittelschmerz","mixed hearing loss","moderate asthma","moderate nonproliferative diabetic retinopathy (NPDR)","moist debris in ear canal","moles on body","molluscum contagiosum","molluscum contagiosum infections","monoarticular arthritis","monthly abdominal pain lasting few hours to several days","mood disorders","mood swings","morbilliform rash","morbilliform rash after 3 days of fever","morning joint stiffness","morning sickness","morning stiffness fingers","morning stiffness hand(s)","mosquito bites","motion sickness","motor features of Parkinsonism","motor vehicle accidents","mouth looks infected","mucocele","mucopurulent cervical discharge","mucopurulent eye discharge","mucopurulent nasal discharge","mucopurulent vaginal discharge","multiparity","multiple complaints","multiple discrete pruritic erythematous papulovesicles in diaper area","multiple firm red brown papules on arm(s)","multiple firm red brown papules on back","multiple firm red brown papules on chest","multiple firm red brown papules on leg(s)","muscle ache generalized","muscle cramps","muscle cramps in foot (feet)","muscle cramps in leg(s)","muscle straining while giving birth","muscle tightness neck","muscle tightness scalp","muscle weakness in foot (feet)","muscle weakness in leg(s)","muscle weakness in leg(s) increased while walking","musty smell from bedbugs' scent glands","mycoplasma infections","mycoplasma pneumonia","myocardial infarction","nail biting","nail psoriasis","narrowing of arterioles on fundus exam","narrowing of cervical spinal canal to < 13mm","nasal cycle","nasal discharge","nasal discharge for more than 10 days","nasal mucosa erythematous","nasal mucosal irritation","nasal polyp","nasal septum deviation","nasal symptoms after barometric pressure change","nasal symptoms after temperature change","nasogastric tube","nausea","near-work induced transient myopia","neck deformity","neck distraction test positive","neck pain during axial loading of neck","neck pain during lateral bending of neck","neck pain during neck extension","neck pain during rotation of neck","needs DTaP","needs MMR","needs asthma medicine more often than every four hours","needs flu shot","needs flu vaccine","needs immunization","needs laxative to have bm","needs varicella vaccine","neisseria infections","neonatal sepsis","nerve entrapment syndrome","nervousness","neurocardiogenic syncope","neutropenia","never had varicella vaccine","nevi back","nevi chest","nevi face","new sexual partner","nicotine abuse","nicotine withdrawal-agitation","nicotine withdrawal-anxiety","nicotine withdrawal-depression","nicotine withdrawal-difficulty sleeping","nicotine withdrawal-headache","nicotine withdrawal-increased appetite","nicotine withdrawal-irritability","nicotine withdrawal-nervousness","nicotine withdrawal-poor concentration","nicotine withdrawal-weight gain","night cramps in leg(s)","nightmares","nipples darkening","nits attached to hair shafts","no bm for more than 4 days","no chest retractions","no previous tetanus immunization","nodules on tendons","nodules over ischial tuberosities","nodules over olecranon process","nodules over proximal ulna","noisy breathing","non contact injuries","non healing bump","non-ST-segment elevation myocardial infarction (NSTEMI)","non-pitting edema hands and feet","non-small cell lung cancer (NSCLC)","nonalcoholic fatty liver disease (NAFLD)","nonalcoholic steatohepatitis (NASH)","nonbacterial epididymitis","nonchlamydial urethritis","noncommunicating hydrocele","noncompliance with antihypertensive medications","nonexudative bilateral conjunctivitis","nonexudative macular degeneration","nonmenstrual pelvic pain of 3 months or more","nonsyndromic deafness autosomal recessive","nonsyndromic macrocephaly","normal BP for adults >18 years -<120/80 mmHg","normal adult sexual development","normal adult stature","normal age of onset of puberty","normal labor","normal linear growth velocity for age","normal onset of menstrual period in girls","normal prepubertal growth rate","normal puberty","normal trunk length","normal variant short stature","normalizing middle ear pressure","normochromic normocytic anemia","norovirus infections","nose bleeds","nose picking","not eating enough when taking insulin or diabetes medication","not feeling tired despite thinking that one has not slept","not gaining weight","not had an office visit for asthma for more than one year","not tolerating fatty foods","notched tongue when stuck out","nummular dermatitis","nymphs seen in hair body or genital areas","obese","objective normal sleep duration","obliteration of lateral sulcus of prostate","obstructive sleep apnea","occupation assembly line worker","occupation auto work","occupation automotive worker","occupation beauticians","occupation carpenter","occupation daycare worker","occupation dental workers","occupation driver","occupation dry cleaners","occupation dye worker","occupation janitor","occupation leather and apparel work","occupation metal work","occupation painter","occupation paper production workers","occupation pesticide applicators","occupation physicians","occupation playing musical instruments","occupation plumbing","occupation truck drivers","occupation typing","occupational exposures-construction","occupational exposures-transportation","occupational injury","ocular surgery","oculovestibular reflex","oily flaking adherent yellowish white scales back of neck","oily flaking adherent yellowish white scales behind ears","oily flaking adherent yellowish white scales chest","oily flaking adherent yellowish white scales creases of nose","oily flaking adherent yellowish white scales eyebrows","oily flaking adherent yellowish white scales eyelids","oily flaking adherent yellowish white scales forehead","oily flaking adherent yellowish white scales lips","oily flaking adherent yellowish white scales on skin","oily flaking adherent yellowish white scales outer ears","oily flaking adherent yellowish white scales scalp","oligospermia","on period now","on-field dizziness","onychoschizia","ophthalmopathy","oppositional behavior","oral leukoplakia","oral sex","organ transplantation","organic brain syndrome","orientation to time place and person","orthostatic hypotension","orthostatic intolerance","orthostatic syncope","osteoarthritis","osteomalacia","osteopenia","osteoporosis","otitis externa","otitis media","otosclerosis","out toeing","oval erythematous plaques in skin","oval erythematous plaques on abdomen","oval erythematous plaques on arm(s)","oval erythematous plaques on back","oval erythematous plaques on chest","oval erythematous plaques on foot (feet","oval erythematous plaques on hand(s)","oval erythematous plaques on leg(s)","overactive bladder [OAB]","overbite or underbite","overeating","overestimate the time taken to fall asleep","overestimating sleep time","overexertion","overflow urinary incontinence","overhead painting","overlapping of 5th toe over 4th toe","overuse injury","overweight","overwhelming desire to smoke despite trying to quit","oxygen saturation in room air >95","pacemaker","pacing about","pain along tendon","pain around anus","pain at site of injection","pain beginning at onset of menstruation and lasting 1-3 days","pain behind eye(s)","pain during walking","pain edema and blanched appearance to leg(s)","pain glans penis","pain great toe","pain in 11 out of 18 areas of body","pain in MCP joints","pain in MTP joints","pain in PIP joints","pain in TMJ radiating to ear","pain in TMJ radiating to jaw","pain in TMJ worse with chewing","pain in abdomen during menses during first or second cycles after menarche","pain in abdomen starting several hours before or just after menstrual flow","pain in ankle","pain in anus","pain in anus lasting several minutes to hours after bowel movement","pain in arm(s)","pain in back","pain in back radiating to abdomen","pain in back reduced by spinal flexion such as sitting and leaning forward while standing","pain in back worse by movement","pain in back worse with weight bearing","pain in bottom of foot","pain in breast in females","pain in breasts in females just before menstrual period","pain in calves at night","pain in calves relieved by rest","pain in cervical paraspinal muscles","pain in cheek worse on bending down","pain in dermatome before onset of rash","pain in elbow","pain in eyelid(s)","pain in finger with passive extension","pain in foot (feet)","pain in foot (feet) on standing","pain in foot (feet) when walking","pain in foot increased with activity","pain in foot relieved by rest","pain in forefoot","pain in genital area","pain in genital area in females","pain in genital area in males","pain in genital area or groin","pain in genital area or groin in females","pain in genital area or groin in males","pain in hand radiating to finger","pain in hand(s)","pain in hip","pain in hip on bearing weight","pain in hip relieved by rest","pain in hip worse after bearing weight","pain in hip worse after exercise","pain in joints relieved by rest","pain in joints worse after exercise","pain in knee","pain in knee before during or after physical activity","pain in knee during running jumping squatting or going up and down stairs","pain in knee going up and down stairs","pain in knee relieved by rest","pain in knee worse after bearing weight","pain in knee worse after exercise","pain in knee worse with exercise","pain in lateral epicondyle","pain in leg(s)","pain in leg(s) decreased on lying supine","pain in leg(s) decreased on sitting","pain in leg(s) decreased with stationary biking","pain in leg(s) in late afternoon or early evening before bed","pain in leg(s) increased with prone lumbar hyperextension","pain in leg(s) relieved by elevating leg(s)","pain in leg(s) relieved by walking","pain in leg(s) waking child up from sleep","pain in leg(s) worse on prolonged standing","pain in leg(s) worse on standing erect or walking downhill","pain in lower back worse after exercise","pain in lump with activity","pain in medial aspect of knee","pain in medial aspect of knee on weight bearing","pain in medial thigh","pain in metatarsal head(s)","pain in metatarsal phalangeal joint great toe","pain in mouth","pain in neck","pain in neck radiating to area between shoulder blades","pain in neck radiating to arm","pain in neck radiating to hand","pain in neck radiating to occiput","pain in neck radiating to shoulder","pain in neck relieved on lying down","pain in neck worse on Valsalva maneuver","pain in neck worse on lifting objects","pain in outer part of knee","pain in patellar tendon","pain in patellar tendon worse when walking or running uphill","pain in penile foreskin","pain in penis","pain in scrotum or testicle","pain in several joints","pain in shoulder","pain in skin","pain in swelling","pain in temporomandibular joint","pain in thigh(s) relieved by rest","pain in thighs when walking","pain in tmj","pain in tongue worse on eating hot spicy salty or acidic foods","pain in tooth when eating sweet foods","pain in tooth with eating hot or warm foods","pain in wart when standing","pain in wart when walking","pain in wrist","pain in wrist worse at night","pain itching or paresthesias along one or more skin dermatomes","pain on collarbone","pain on moving earlobe or outer ear","pain on moving neck","pain on swallowing","pain radiating along involved nerve root","pain radiating down arm(s)","pain radiating down leg(s)","pain with resistance to knee extension","painful blisters on lips","painful bowel movements","painful ear canal","painful fissures between toes","painful menstrual periods","painful red lump on eyelid margin","painful sensory radiculitis","painful sex","painful sex in females","painful swelling on undersurface of toe","painful ulcers in mouth","painful urination","painful urination in females","painful urination in males","painless lump in breast","painless rectal bleeding","palatal enanthem","palatal petechei","pale bluish gray nasal mucosa","pale tongue","palmar warts","palmoplantar warts","palpable notches over anterior tibia","palpable short saphenous vein in popliteal fossa","palpable sigmoid cord","palpable stool on abdominal examination","palpable veins around ankle","palpitations","palpitations with fever","palpitations without fever","panacinar emphysema","pancreatitis","papillary conjunctivitis","papillary hemorrages on fundus exam","papular dermatitis","parainfluenza infections","paralysis","paravertebral muscle spasms","paravertebral muscle spasms decreased on lying supine","paravertebral muscle spasms worse on activity","parent-child psychopathology","parental height","parental marital problems","paronychia","partial adontia","participating in track","participation in sports","parulis","parvo B19 infection","passed out but now well","passing flatus during crying episodes","passing gas from rectum","passing mucus plug through vagina during labor","passing out","passing out after painful stimulus","passing out after prolonged standing","passing out after standing up suddenly","passive flexion of the fetal occiput","pasted on appearance of growths","patches of discolored skin with sharp borders and fine scales","patches of hair loss in beard","patches of hair loss on arm(s)","patches of hair loss on leg(s)","patches on tongue that move from day to day","patchy areas of redness on tongue","patchy areas of smooth tongue","paternal age","patronizing","pattern on tongue","peak flow rate 50-80 percent of baseline","peak flow rate > 80 percent of baseline","peak flow rate less than 50 percent of baseline","peak height velocity in boys 5.8 cm to 13.1 cm","peak height velocity in girls 5.4 cm to 11.2 cm","pediculosis","peeling hands","pelvic examination","pelvic floor myalgia (levator ani spasm)","pelvic floor tone normal","pelvic inflammatory disease","pelvic pain","pelvic pain in females","pelvimetry","people's voices sound mumbled or slurred","perception of not being able to sleep","percussion test over flexor retinaculum positive","perianal skin tag","perianal skin tags","periarticular osteoporosis","perimalleolar swelling","perinatal transmission","perineum ballooning below the bony outlet of the pelvis during straining","periodic leg movements of sleep (PLMS)","periodontal abscess","periodontal destruction","periodontal disease","periodontitis","perioral cyanosis","perioral rash","periorbital headache","peripheral IV line","peripheral anterior synechiae of iris","peripheral neuropathy","peripheral vascular disease","peritoneal dialysis","periumbilical abdominal pain","periumbilical abdominal pain followed by right lower quadrant pain","periungual inflammation","permanent birth mark","persistent desire to smoke","personality disorders","pertussis","pes planus","petechei in the center of wart","pharyngitis","phlegmonous appendicitis","photophobia","physical abuse","physiologic goiter","physiologic nystagmus","physiologic splitting of S2","physiologic stressor causing increased heart rate","physiologic vaginal discharge","physiological myoclonus","picornavirus infections","pigment epithelial detachments (PEDs)","pigmented lesion with irregular borders","pigmented lesion with regular borders","pigmented lesion with sharp borders","pill rolling rest tremor","piloerection","pimples on face in newborn","pinguecula","pink macule with collarette scale and well demarcated border","pink macule with collarette scale and well demarcated border in scalp","pink macule with collarette scale and well demarcated border on abdomen","pink macule with collarette scale and well demarcated border on back","pink macule with collarette scale and well demarcated border on chest","pink macule with collarette scale and well demarcated border on neck","pink morbilliform exanthem","pinkish birth marks","pinkish flat irregular patches on back of neck","pinkish flat irregular patches on eyelid(s)","pinkish flat irregular patches on face","pinkish flat irregular patches on forehead","pinkish flat irregular patches on nose","pinkish flat irregular patches on upper lip","pinkish red birth marks on abdomen","pinkish red birth marks on arm(s)","pinkish red birth marks on back","pinkish red birth marks on chest","pinkish red birth marks on face","pinkish red birth marks on leg(s)","pinkish red birth marks on neck","pinkish small bumps on upper arms and thighs","pinworm contact","pinworms seen in perineal area","pinworms seen in stool","pits or holes in teeth","pityriasis alba","plantar fasciitis","plantar keratosis","plaque on teeth","plaque psoriasis","plaques in skin with central clearing","playing baseball","playing basketball","playing contact sports","playing cricket","playing football","playing handball","playing on synthetic surfaces","playing racquet sports","playing raquetball","playing soccer","playing tennis with topspin forehand","playing throwing sports","playing volleyball","pneumonia","point tenderness fracture site","polycystic ovarian disease","polycystic ovaries on ultrasound","polygenic hypercholesterolemia","polyp in middle meatus","poor appetite","poor communication","poor communication in the family","poor comprehension","poor concentration","poor coordination","poor distance vision","poor family support","poor fluid intake","poor grooming habits","poor handwashing","poor intrauterine fetal growth","poor judgement","poor oral hygiene","poor parenting skills","poor posture","poor relationship with significant other","poor self image","poor social skills","poor spelling","poor temperature regulation","poorly fitting shoes","popping or clicking in knee joint","port wine stain","positional nasal congestion","positional plagiocephaly","positive skin test for tuberculosis","post acute alcohol withdrawal syndrome","post concussion syndrome","post cough vomiting","post void discomfort","posterior cervical lymphadenopathy","postherpetic neuralgia","postherpetic neuralgia (PHN)","postictal headache","postinflammatory hyperpigmentation","postinflammatory hyperpigmentation on arm(s)","postinflammatory hypopigmentation","postmenopausal hirsutism","postmenopausal osteoporosis (type I osteoporosis)","postnasal discharge","postnasal drip","postoperative infections","postpartum anemia","postpartum period","postponing other activities to smoke","postprandial stomach pain","postprandial urgency to have bm","posttraumatic amnesia","posttraumatic confusional state","posttraumatic stress disorder","posttraumatic syndrome","postural kyphosis","pre-eclampsia","prediabetes","predictable crying episodes","pregnancy","pregnancy > 20 weeks gestation","pregnant","premature birth of baby","premature labor","premature menopause","premenstrual syndrome","presbycusis","presbyopia","preservation of peripheral visual acuity","pressure tenderness above inner canthus","previous alcohol withdrawal convulsions","previous breast cancer","previous cesarean delivery in mother","previous children with hemolytic disease","previous concussion","previous head injury","previous history of mental illness","previous ocular surgery","previous photocoagulation","previous unsuccessful antihypertensive medication","prickly feeling in skin","primary dysmenorrhea","primary genital herpes","primary milia","primary progressive MS","primigravida","prior alcohol detoxification","problems in sexual relationship","problems reading writing and working with numbers","problems with authority","proctoscopy","prodrome of burning pain at site of eruption","progesterone IUDs","progressive cardiac and respiratory failure","progressive exercise intolerance","progressive-relapsing MS","prolapsed uterus","proliferative diabetic retinopathy","prolonged expiration","prolonged exposure to wet diapers","prolonged kneeling or squatting","prolonged menstrual periods","prolonged recovery time after exercise","prolonged rupture of membranes","prolonged standing in occupation","prolonged typing or computer work","promiscuous male partners","pronated feet","propionibacterium acnes infections","prostate cancer","prostate infections","prostate needle biopsy","prostate size more than 2-3 fingerbreadths wide","prostatic biopsy","prostatitis","prosthetic devices","protozoal infections","proximal subungual onychomycosis","pruritic annular plaque in skin","pruritic urticarial papules and plaques of pregnancy","pseudo-Jones fracture","psoriatic arthritis","psychiatric problems","pubertal gynecomastia","puffy face","pulling out own hair","pulmonary ejection murmur","pulmonary embolism","pulmonary flow murmur","pulmonary nodules","pulmonary venous congestion","pulse volume decreased","pulse wave along vein on percussion","pulsus paradoxus absent","punctate cervical hemorrhages with ulcerations","punctate epithelial keratopathy","punctate vaginal hemorrages with ulceration","puncture wound","puncture wound foot","puncture wound head","purine rich foods","purplish birth marks","purplish birth marks on abdomen","purplish birth marks on arm(s)","purplish birth marks on back","purplish birth marks on chest","purplish birth marks on face","purplish birth marks on leg(s)","purplish birth marks on neck","pus draining from finger(s) or toe(s)","pus draining from skin","pus draining from tooth","pus in corner of nail","pus in stool","pus in the middle meatus","pus in the superior meatus","racing thoughts","radiating leg pain associated with walking","radiating leg pain relieved on resting","radicular symptoms decreased by abducting shoulder and placing hand behind head","radiculopathy","rales","rash","rash from drooling","rash in areas of friction","rash in genital area","rash in genital area in females","rash in genital area in males","rash in genital area or groin","rash in genital area or groin in females","rash in genital area or groin in males","rash in groin","rash in skin folds of diaper area","rash on arm(s)","rash on face","rash on perineum","rash on sole of foot","rash worse after bathing in hot water","rash worse in winter clearing up in summer","rash worse with changes in environmental temperature","rash worse with exercise","rash worse with stress","rash worse with sun exposure","razor bumps","razor bumps in females","razor bumps in males","receding gums","receding hairline","recent cast placement","recent childbirth","recent decreased tearing","recent dental surgery","recent gastrointestinal illness","recent hip or leg fractures","recent immunization","recent infections","recent plane trip","recent surgery","recent travel outside US","recent upper respiratory infection","recent use of an intravenous (IV) line or catheter","recently drinking a lot of alcohol","recurrent DVT","recurrent chalazion","recurrent cold sore(s) with fever stress or sunburn","recurrent cold sores","recurrent cystitis","recurrent genital herpes","recurrent genital herpes with stress","red blotches on the vaginal wall or cervix","red external ear canal","red eye(s)","red face","red itchy foot(feet)","red itchy scaly rash on body","red itchy scaly rash on cheeks","red itchy scaly rash on leg(s)","red itchy scaly rash on scalp","red nose","red oozing rash in flexural surface of elbows and behind knees","red raised birthmarks","red rash behind knees","red rash in diaper area","red rash on soles of feet","red strawberry tongue","red swelling on body","red swelling on face","red swollen tonsils with exudate","red thickened skin on inside of big toe","red tongue","reddening and thinning of scrotum in boys","reddish birth marks","redness and tenderness along course of vein","redness around anus","redness around boil","redness around site of injection","redness between toes","redness in genital area","redness in genital area in females","redness in genital area in males","redness in genital area or groin","redness in genital area or groin in females","redness in genital area or groin in males","redness in groin","redness in skin in one area","redness of cervix","redness on breast(s) in females","redness on eyelid(s)","redness on finger(s) or thumb(s)","redness on foot (feet)","redness on great toe","redness on hand(s)","redness on leg(s)","redness on one side of face","redness on toe(s)","reflux following gastric resection","refractory period less than one hour to 3 hours after initial aerobic exercise","refusing to follow directions","regular painful uterine contractions","regurgitation","reheating foods","relapsing-remitting MS","relief of pain on scrotal elevation","relief phase of renal colic","remission of rash","renal dialysis","repetitive and submaximal loading of bone","repetitive compression at wrist","repetitive flexion and extension of knee","repetitive passages","repetitive throwing","resolution of acute back pain in 4-6 weeks","resolution of stomach pain 1-2 days after start of menstruation","respirations increasing in depth and rate then followed by decrease resulting in apnea","respiratory rate >20/min in adults","respiratory syncytial virus infection","restless legs","restless legs syndrome","restlessness","restlessness in legs relieved by activity","restlessness in legs worse when resting","reticular veins on leg(s)","retractile testes","retro-orbital headache","reverse Phalen test positive","reversible cough or wheezing","rheumatoid arthritis","rheumatoid nodules","rhinitis medicamentosa","rhinosinusitis","rhinovirus infections","rib hump","right lower quadrant abdominal pain","right upper quadrant abdominal pain","right ventricular heave","ring around cornea","ringing sound in ears","ritualistic play","rosacea","roseola infantum","roseola syndrome","rotation of fetal anterior shoulder under maternal symphysis pubis and subsequent delivery of fetus","rotation of fetal presenting part to AP position under maternal symphysis pubis","rotavirus infection","rough nails","rough skin","round back","round erythematous plaques in skin","round erythematous plaques on abdomen","round erythematous plaques on arm(s)","round erythematous plaques on back","round erythematous plaques on chest","round erythematous plaques on foot (feet)","round erythematous plaques on hand(s)","round erythematous plaques on leg(s)","rubbery bump in breast","rubs mouth","rubs surfaces","runner's knee","running","runny nose","ruptured grouped vesicles along one or more skin dermatomes","salmonellosis","saphenofemoral junction reflux","sarcoidsis","satellite moles","saunas","scabies","scabs on body","scaling between toes","scaling crusting papules","scaling erythematous macules in skin","scaling erythematous plaques on knees","scaling erythematous plaques on scalp","scalp hair loss","scalp hair loss at hair line","scalp psoriasis","scaly erythematous lesions in scalp","scaly patches on skin","scaly plaques in concentric rings","scaly rash behind ear","scaly rash in diaper area","scaly scalp","scanty periods","scarlatiniform rash","school absences due to joint pain","school phobia","sciatica","scleral injection","scooter riding","scratch marks in skin plaques","scratchy feeling in eye","scrotal swelling decreased on lying down","scrotal swelling increasing on standing up","sculpted nails","seasonal wheezing and cough","sebaceous cyst","sebaceous hyperplasia","seborrhea","seborrheic dermatitis","seborrheic dermatitis on scalp","seborrheic keratosis","second ray of foot longer than first","second stage of labor-from complete cervical dilatation to delivery of fetus","second trimester from about 13 to 27 weeks of pregnancy","secondary dysmenorrhea","secondary herpes infection","secondary hyperlipoproteinemia","secondary progressive MS","sedentary","seizure disorder","seizures treated with valproic acid","self assured","senile comedones","senile dementia","senile keratoses","senile osteoporosis (type II osteoporosis)","senile ptosis","sensation of fullness in lower abdomen","sensory neuropathy","serum pH greater than 7.30","severe asthma exacerbation","severe asthma unresponsive to repeated courses of beta-agonist therapy","severe difficulty breathing","severe headache not relieved by pain medications","sex with multiple partners","sex with someone with sexually transmitted infection","sexual assault","sexual harassment","sexual kissing","sexual performance anxiety","sexual problems","sharing personal items","sharing sports equipment","shaving frequently","shigellosis","shiny gums","shoe dermatitis","shoe inserts","short attention span","short first metatarsal","short maternal stature","short parents","short sleep","short stature","short thick lingual frenulum","shortness of breath at rest","shortness of breath only during or after exercise","shortness of breath with exercise","shoulder stiff in morning","side of head is flat","sigmoid tenderness","significant other report of apnea","similar illness in at least 2 people","simple anal fistula","simple myopia","simplified acute physiology score (SAPS II)","single extension braids","single marital status","single pigmented lesion in skin","single-duct discharge","sinus arrhythmia","sinus congestion","sinus tachycardia","sinusitis","sitting height","situational syncope","situational vaginismus","skin cancer","skin colored bumps","skin growth elevated","skin growth feels rough","skin growth larger than 6mm","skin inflammation","skin lines prominent in plaque","skin looks infected","skin red and irritated at edge of cast","skin tags","skin tags in front of ears","skin tethering over breast","skipping meals","sleep aids","sleep deprivation","sleep disorders","sleep starts","sleep state misperception","sleeping at night at the breast","sleeping for only short periods","sleeping while working","slow motor skills","slow movements","slowing of linear growth velocity and weight gain starting at 3-6 months","slowly progressive tremor","slurred speech","small (up to 1-2 mm) folliculocentric keratotic papules on upper arms and thighs","small bowel angiodysplasia","small bumps on buttocks","small bumps on face","small bumps on upper arms and thighs","small cell lung cancer (SCLC)","small chest cavity","small hard stools","small papules or pustules on an erythematous base with a central hair","small penis","small rough spots in skin","small rough spots on arm(s)","small rough spots on face","small rough spots on hand(s)","small rough spots on scalp","small yellow soft papules on breast","small yellow soft papules on cheeks","small yellow soft papules on chest","small yellow soft papules on face","small yellow soft papules on forehead","small yellow soft papules on genital area in females","small yellow soft papules on genital area in males","small yellow soft papules on mouth","small yellow soft papules on nose","smashed finger","smoking cessation","smoking excessively","smoking more than usual","smooth red patches and sores on tongue","smooth tongue","snap felt when injured","sneezing","sniffles","snobbish","snoring","snoring with interrupted sleep","snorting","snorting while breathing","soft rubbery lump in arm(s)","soft rubbery lump in back","soft rubbery lump in buttocks","soft rubbery lump in shoulder(s)","soft rubbery lump in skin","soft rubbery lump in thighs","softening and enlargement of the cervix at around 6 weeks pregnancy","soiling underwear","solar keratoses","somatized tension","sore gums or bleeding gums","sore nipple in females","sore throat","sound errors","speech delay","sperm count of less than 20 million sperm/ml","spinal anesthesia","spinal epidural anesthesia","spinal stenosis","spinning around vertical axis","spiteful","spitting up in infants","splinter in skin","spondylitis","spondylolysis","spondylosis","spontaneous breathing present after head injury","sports injury","sprinting","squamous cell carcinoma","squatting repeatedly","squint","squish test","stable ankle fracture","staphylococcal blepharitis","staphylococcus aureus adenitis","staphylococcus aureus dermatitis","staphylococcus infections","start of nighttime ejaculations","start of testicular enlargement in boys","stasis ulcers","status asthmaticus","staying in bed despite being wide awake","stereotypical orofacial behavior","sticky stringy eye discharge","stiff neck","stiffening during crying episodes","stiffness in joints relieved by exercise","stiffness in joints relieved by heat","stiffness in medial aspect of knee","still hungry after feeds","stomach cramping during bm","stomach pain","stomach pain accompanying bleeding during menstruation","stomach pain around middle of menstrual cycle","stomach pain at night","stomach pain burning","stomach pain for few days before menstrual period","stomach pain increased on jumping","stomach pain relieved by bowel movement","stomach pain severe","stomach swelling","stomatitis","stool withholding","stoop test positive","stopped taking oral contraceptives","stopped taking seizure medicine","stopping breathing at night","stopping breathing for > 20 secs in premature baby","stopping estrogen containing medications","stopping pain medications","stopping sleeping pills","stopping tranquillizers","stoves","straining at stool","straining during bowel movement","straining to maintain urination","straining to start urination","strains and sprains","stranguria","strep exposure","streptococcal pharyngitis","streptococcus pneumoniae infections","stress with changes in life situations","stressful event during pregnancy or delivery","stretch marks on abdomen","stretch marks on breasts","stretch marks on buttocks","stretch marks on thighs","striae distensae","stridor","stringy mucoid nasal discharge","strong need for sameness","stubbed toe","stuffy nose","stye","subclinical genital warts","submandibular lymph nodes enlarged","subretinal disciform scarring of macula","substance abuse","sudden difficulty breathing at night","sudden inability to move","sudden onset of flank pain radiating inferiorly and anteriorly","sudden onset wheezing after bee sting","suddenly stopping laxatives","suicidal ideation","sunburn","sundowning","superficial tear of scalp","superficial tear of skin","superficial venous insufficiency","suppurative appendicitis","supracondylar fractures","suprapubic abdominal pain","suprapubic abdominal pain radiating to buttocks","suprapubic abdominal pain radiating to lower back","suprapubic abdominal pain radiating to perineum","suspensions or expulsions from school","sustained and enlarged cardiac apical impulse","sutured or stapled wound","sutures due to be removed","swan neck deformity of finger(s)","sweating while straining at stool","sweetened drinks in bottle at bedtime","swelling along course of vein","swelling and tenderness on proximal tibia","swelling at the site of injection","swelling in genital area or groin","swelling in genital area or groin in females","swelling in genital area or groin in males","swelling in groin enlarging on standing","swelling in groin enlarging with increased intra-abdominal pressure","swelling in groin increased on standing up","swelling near angle of jaw","swelling of the submandibular triangle of neck","swelling on back of neck","swelling on scalp in newborn extending across midline","swelling on scrotum","swelling or lump in genital area in males","swimming","swimming breastroke","swine flu exposure","swinging baseball bat","swollen MCP joints","swollen MTP joints","swollen PIP joints","swollen and discolored skin","swollen ankle","swollen breast(s)","swollen breasts in females","swollen elbow","swollen external ear canal","swollen feet","swollen feet and legs","swollen first MTP joint","swollen foot","swollen foot and leg","swollen great toe","swollen joint(s)","swollen knee","swollen leg","swollen legs","swollen lips","swollen lymph node in back of head","swollen nipple in females","swollen nose","swollen shoulder","swollen testicle","swollen veins in leg(s)","swollen wrist","symmetrical crops of clear vesicles on fingers palms or soles of feet or toes","symmetrical dark patches on cheeks","symmetrical dark patches on face","symmetrical dark patches on forehead","symmetrical dark patches on nose","symmetrical dark patches on upper lip","symmetrical hyperpigmented velvety plaques in neck armpits and groin","symmetrical signs in early stages of disease","symptoms are reduced or go away after bm","symptoms last 3-6 months after initial head injury","symptoms occur within one to several weeks after initial head injury","symptoms triggered by movement","symptoms triggered by sensory stimuli","systemic flow murmur","systolic ejection heart murmur at superior aspect of LLSB","systolic hypertension","tachycardia during exercise","taking ACE inhibitors","taking Viagra","taking albuterol","taking antiarrhythmic medication","taking antibiotics","taking antidepressant medication","taking antihistamines","taking antihypertensive drugs","taking antipsychotic drugs","taking antiulcer drugs","taking appetite suppressants","taking arthritis medicines","taking beta agonists","taking beta-blockers","taking calcium channel blockers","taking decongestants","taking diet pills","taking diuretics","taking doxycycline","taking erythromycin","taking ferrous sulfate","taking herbs and supplements","taking lasex","taking levodopa","taking many headache medications","taking naproxen","taking narcotic medications","taking oral contraceptives","taking penicillin","taking prazosin","taking repaglinide","taking sedatives","taking selective serotonin reuptake inhibitors (SSRIs)","taking sleeping pills","taking statins","taking stimulant medications","taking tetracycline","taking tetracyclines","taking too much insulin or diabetes medication","talar tilt exam","talking loudly","talking too much","tartar on teeth","tattoos","tear in anus","tearfulness","teeth grinding","teething","telogen effluvium","temporal headache","temporomandibular joint dysfunction","tender nodules along thickened uterosacral ligaments","tender nodules in posterior cul de sac","tender nodules on uterus","tenderness femoral neck","tenderness tibia","tenosynovitis","tension headache","tension-type headaches","testicle moves in and out of scrotum and groin","tetanus immunization","thalassemia minor","thermal burn","thiamine deficiency","thick toenails","thick twisted veins in leg(s)","thick twisted veins on foot (feet)","thickened area on sole of foot","thickening of skin over breast","thigh pain following 30 seconds of lumbar extension","thin build","thin individual","thin watery nasal secretions","thinned out bones","third stage of labor-between delivery of fetus to delivery of placenta and fetal membranes","third trimester from about 28 weeks of pregnancy until birth","throat tickle","throwing sports","thrush in mouth","thrush patches on vulva","thyroid swelling","tibial shaft fractures","tibial torsion","tight Achilles tendon","tight feeling on back of neck","tight undergarments","tight-fitting or nonabsorbent clothing","tightening of pelvic muscles to prevent urinating","tightly grouped warts on hand(s)","tightly grouped warts on soles of foot (feet)","tightness on both sides of head","time to first cigarette","tinea pedis","tinea versicolor","tiny bumps on arm(s)","tiny bumps on thighs","tiny painful water blisters in genital area","tiny pearly white yellowish lesions along nasal groove","tiny pearly white yellowish lesions around areolae","tiny pearly white yellowish lesions in mouth or palate","tiny pearly white yellowish lesions in skin","tiny pearly white yellowish lesions on chest","tiny pearly white yellowish lesions on face","tiny pearly white yellowish lesions on neck","tiny pearly white yellowish lesions on nose","tiny vesicles on lateral aspects of fingers and or toes","tiny vesicles on palms","tiny white bumps on gums","toenail appears to be growing under the skin","toenail hard and painful","toenails not trimmed properly","tolerance to nicotine","tongue tie","tonometry","tonometry difference between two eyes of more than or equal to 3mm","tonsillitis","took allergic medicine less than 2 hours ago","tooth abscess","tooth enamel erosion","tooth tender to percussion","tooth tender to pressure","toothache","total number of cigarettes per day","traction alopecia","trading sex for drugs","tragal tenderness","transient erythematous smooth raised blotches in skin","transient hiccups","transient ischemic attacks","transient tachypnea of the newborn","transient tics","trauma","traumatic life events","tremor","tremor affecting both sides asymmetrically","tremor amplitude is worsened by emotion hunger fatigue temperature extremes","tremor amplitude reduced with alcohol intake","tremor amplitude slowly increasing over several years","tremor beginning in one upper extremity and then affecting the other","tremor can be suppressed voluntarily","tremor essential","tremor resolving during sleep","trichomoniasis","triple response of Lewis","truncal obesity","trying too hard to sleep","tubal ligation","tuberculosis","tumors in skin","turning blue briefly","twisted and broken hairs of varying length","twisted enlarged veins in the scrotum","twisted growth along the spermatic cord","two or fewer bowel movements in a week","two or more relatives with breast or ovarian cancer","tympanic membrane bulging","tympanic membrane dull or opaque","tympanic membrane impaired mobility","tympanic membrane opaque","tympanic membrane red","tympanic membrane retracted","ulcer(s) on foot (feet)","ulcer(s) on leg(s)","ulcer(s) on leg(s) and feet","ulceration in skin plaques","ulcers inbetween toes","umbilical cord fallen off","umbilicated dome-shaped papules with caseous plug in groin","umbilicated dome-shaped papules with caseous plug in intertriginous areas","umbilicated dome-shaped papules with caseous plug in skin","umbilicated dome-shaped papules with caseous plug in vulvar area","umbilicated dome-shaped papules with caseous plug on abdomen","umbilicated dome-shaped papules with caseous plug on arm(s)","umbilicated dome-shaped papules with caseous plug on back","umbilicated dome-shaped papules with caseous plug on chest","umbilicated dome-shaped papules with caseous plug on face","umbilicated dome-shaped papules with caseous plug on leg(s)","umbilicated dome-shaped papules with caseous plug on palms","umbilicated dome-shaped papules with caseous plug on scrotum or penis","umbilicated dome-shaped papules with caseous plug on soles","unable to achieve orgasm","unable to ejaculate","unable to exercise or play sports due to asthma","unable to get erection","unable to go back to sleep","unable to protrude tongue","unable to tolerate cold","unable to tolerate dairy products","unable to work","uncircumcised male","underperformance on the field of play","unilateral cervical lymphadenopathy","unilateral facial pain","unilateral grouped vesicles along one or more skin dermatomes","unilateral headache","unrefreshed sleep","unstable angina pectoris","unstable ankle fracture","unstable foot","unusual attachments to objects","upper abdominal pain","upper airway resistance syndrome (UARS)","upper back pain","upper respiratory infection","upper respiratory tract infection","upper to lower body ratio less than 1 in adulthood","upper to lower body segment ratio more than 1 in childhood","ureteral stone","urethritis","urge incontinence","urgency to have a bowel movement","urgency to urinate","urgency to urinate in females","urgency to urinate in males","urinary hesitancy","urinary hesitancy in females","urinary hesitancy in males","urinary tract abnormalities","urinary tract infections","urinating at night or bedwetting","urinating large amounts","urinating less than 6 diapers per day in newborn","urinating less than normal","urinating often","urinating small amounts at a time","urinating when coughing or straining","uses more than 1 inhaler per month","using CPAP machines","using condoms","using dental materials","using deodorants","using hands to propel wheelchair","using laptop computer","using lotions that contain alcohol","using mouthwashes","using nail glue","using poorly fitting dentures","using radiocontrast dye","using sanitary napkins","using shaving lotions","using soaps or detergents","using sunscreens","using toothpastes","uterine contractions","uterine prolapse symptoms worse on prolonged standing or walking","uterus palpable low in the abdomen at around 12 weeks pregnancy","uterus removed","uvular edema","vWD type I","vaccination with live vaccines","vaginal bleeding after intercourse","vaginal bleeding unrelated to periods","vaginal discharge","vaginal discharge bubbly","vaginal discharge frothy yellow-green","vaginal discharge has fishy odor","vaginal discharge purulent","vaginal discharge thin gray-white","vaginal itching after intercourse","vaginal or vulvar itching or irritation","vaginal or vulvar swelling or lump","vaginal pH > 4.5","vaginitis","valgus injury to knee","variable hair regrowth","varicose veins","various combinations of hairs","varus injury to knee","vasomotor rhinitis","venous hum","venous stasis","vertigo","very high body temperature","vesicles and bullae in advancing border","vibratory injury","vibratory systolic ejection heart murmur heard at inferior aspect of LLSB","vigorous sexual exercise","viral conjunctivitis","viral gastroenteritis","viral infections","viral pharyngitis","viral pneumonia","viral rash","viral syndrome","vision problems","visual inattention","vitamin D deficiency","vitiligo","vocal misuse","volar subluxation and ulnar deviation of MCP joints","vomiting","vulvovaginitis","vulvovaginitis from poor hygiene","waist circumference > 80 cm (31.5 in) in women","waist circumference > 94 cm (37 in) in men","waist circumference in men >=102 cm (40 in)","waist circumference in women >=88 cm (35 in)","waist-to-hip ratio > 0.8 in women","waist-to-hip ratio > 0.95 in men","wakes up often from sleep due to asthma attack","waking up too early","warmth at the site of injection","warmth in arm(s)","warmth in breast swelling","warmth in foot (feet)","warmth in great toe","warmth in groin swelling","warmth in leg(s)","warmth in lump on eyelid margin","warmth in neck swelling","warmth in skin","warmth in swelling on arm(s)","warmth in swelling on buttocks","warmth in swelling on face","warmth in swelling on leg(s)","wart like growths on abdomen","wart like growths on arm(s)","wart like growths on back","wart like growths on chest","wart like growths on face","wart like growths on foot (feet)","wart like growths on hand(s)","wart like growths on leg(s)","wart like growths on neck","wart like growths on shoulders","wart like growths on skin","wart on undersurface of toe","warts","warts in perianal area","warts on sole of foot","washed out look","watching or experiencing medical procedures","watching scary movies","wax in ear","waxy growths on abdomen","waxy growths on arm(s)","waxy growths on back","waxy growths on chest","waxy growths on face","waxy growths on foot (feet)","waxy growths on hand(s)","waxy growths on leg(s)","waxy growths on neck","waxy growths on shoulders","waxy growths on skin","weak immune system","weak urinary stream","weakness","weakness elbow extension","weakness elbow flexion","weakness shoulder abduction","weakness thumb extension","weakness wrist flexion","weakness wrist ulnar deviation","wearing 3 point restraint seat belt during MVA","wearing closed shoes","wearing high heels","wearing narrow tight shoes","wearing open sandals","wearing tight ponytail pigtails or braids","weather extremes","weeping ulcers on cheeks","weeping ulcers on chin","weeping ulcers on lips","weight gain","weight lifting","weight loss","well demarcated silvery plaques on abdomen","well demarcated silvery plaques on back","well demarcated silvery plaques on chest","well demarcated silvery plaques on knees","well demarcated silvery plaques on scalp","well demarcated silvery plaques over erythematous areas","well demarcated thickened plaques in skin","well groomed","wet vasomotor rhinitis","wheezing","wheezing and coughing after exposure to cold dry air","wheezing changing in location and intensity after deep cough","wheezing during or after exercise","wheezing end expiratory","wheezing expiratory and inspiratory","whiff test positive","white bumps on face","white flat growths on cervix","white flat growths on penis","white flat growths on vulva","white patches in mouth bleed when scraped","white patches in mouth or throat","white patches on tonsils","white scales in diaper area","white superficial onychomycosis","white velvety sores in mouth","white velvety sores on cheeks","white velvety sores on lips","white velvety sores on palate","white velvety sores on tongue","whiteheads","withdrawal from progestin","withdrawal symptoms occur 7-14 days after start of abstinence","withdrawal symptoms peak around 3-6 months after start of abstinence","withdrawal syndrome","woman who has never had children","wool clothing","workplace accidents","workplace exposure","works as farm worker zookeeper laboratory worker veterinarian or gardener","worried about strep throat","worries about sleep","worsening diabetes control","wrinkled or wavy hair shafts","wrinkles in sun exposed skin","xanthelasma palpebrarum","yawning","yeast infection vagina","yellow brown or black growths on abdomen","yellow brown or black growths on arm(s)","yellow brown or black growths on back","yellow brown or black growths on chest","yellow brown or black growths on face","yellow brown or black growths on foot (feet)","yellow brown or black growths on hand(s)","yellow brown or black growths on leg(s)","yellow brown or black growths on neck","yellow brown or black growths on shoulders","yellow brown or black growths on skin","yellow color of skin and eyes","yellow crusts on scalp","yellow green pus in cervix","yellow vaginal discharge","yoga","zigzag deformity of fingers and wrist"];
		




			
	var currentSub=new Array();


	var matchString	="matchString";
	var matchStringMALE ="matchStringMALE";
	var matchStringFEMALE ="matchStringFEMALE";


	var matchStringCOPY=matchString;
	var matchStringCOPYORIG=matchString;
	var matchStringCOPYMALE=matchStringMALE;
	var matchStringCOPYFEMALE=matchStringFEMALE;



	var matchDoccString	="matchDoccString";
	var matchMedsString	="matchMedsString";
	var matchProcString	="matchProcString";
	var matchDiagString="matchDiagString";


	var matchStringCAT	="matchStringCAT";
	var matchDoccStringCAT	="matchDoccStringCAT";
	var matchMedsStringCAT	="matchMedsStringCAT";
	var matchProcStringCAT	="matchProcStringCAT";
	var matchDiagStringCAT	="matchDiagStringCAT";

	function containsAllWords2(t,w) {
			if (w.indexOf(t)!=-1) {
				return 1;
			}
			var ts=t.split(' ');
			if (ts!=null) {
			for (var i=0;i<ts.length;i++) {
				var TT=ts[i];

				if (TT.length>2) {

					if (w.indexOf(TT)==-1) {
						if (TT.charAt(TT.length-1)=='s') {
							var TTS=TT.substring(0,TT.length-1);
							if (w.indexOf(TTS)==-1) return 0;
						} else {
							return 0;
						}
					}
				}
			} 
			}
			return 1;
					//alert(w+" "+TT);
					//if (ts[i]=='in' || ts[i]=='a' || ts[i]=='the' || ts[i]=='i' ) continue;
				//if (ts[i].length>2 && ts[i]!=' ' && ts[i]!='') 
	}


	function containsAllWords(ts,w,a) {
			for (var i=0;i<ts.length;i++) {
				if (ts[i] && ts[i].length>2) {
					if (w.indexOf(ts[i])==-1) return 0;					
				}
			} 
			return 1;

	}


	function trim(value) {
	   var temp = value;
	   var obj = /^(\s*)([\W\w]*)(\b\s*$)/;
	   if (obj.test(temp)) { temp = temp.replace(obj, '$2'); }
	   var obj = / +/g;
	   temp = temp.replace(obj, " ");
	   if (temp == " ") { temp = ""; }
		if (temp.length>0 && temp.charAt(0)==' ') temp=temp.substring(1);
		if (temp.length>0 && temp.charAt(temp.length-1)==' ') temp=temp.substring(0,temp.length-1);
	   return temp;
	}

	function trim22(stringToTrim) {
		if (stringToTrim==undefined || stringToTrim==null) return stringToTrim;
		return stringToTrim.replace(/^\s+|\s+$/g,"");
	}

			function ghostingFocus(n,v,c,s) {

				var E=document.getElementById(n);
				if (E!=null) {
					var T=E.value;					
					T=''+T;
					T=trim22(T);
					if (T.length==0) {
						//n.value=v;
					} else if (v==T) {
						E.value='';
						E.className=''+(''+E.className).replace(c,s);


					}
				}
			}
			function changeInputType(n,x) {
				var E=document.getElementById(n);
				if (E!=null) {
					E.type=x;
				}
			}



	function baseSymptoms(found) {
		var f=new Array(found.length);
		for (var x=0;x<found.length;x++) {
			var w=found[x];
			if (w!=null) {
				var ds=w.split('/');
				if (ds!=null) {
				if (ds.length>1) {
					var q=ds[0];
					if (q.charAt(q.length-1)==':') {
						q=q.substring(0,q.length-1);
					}
					f[f.length]=q;
				} else {
					f[f.length]=w;
				}
				}
			}
		}
		return f;
	}

	function injectSyn(t,w,pos,BR) {
		
		//return w;

		//t=trim(t);
	
		var ds=w.split('/');	
		if (ds!=null) {
		if (ds.length>1) {
			var dsQ=w.split('/');

			if (t=='') {
				var q=ds[0];
				q=trim(q);
				if (q.charAt(q.length-1)==':') q=q.substring(0,q.length-1);
				//alert("A: "+q+" : "+w);
				return q;
			}

			for (var i=0;i<ds.length;i++) {
				var q=ds[i];
				q=trim(q);
				ds[i]=q;

				var qc=q;
				if (qc.indexOf("(")!=-1) {
					qc=qc.replace("(","");
					qc=qc.replace(")","");
					dsQ[i]=qc;
				}
			}

			for (var i=0;i<ds.length;i++) {
				var q=ds[i];
				var qc=dsQ[i];
				if (qc.indexOf(t)!=-1) {
					if (i==0 && q.charAt(q.length-1)==':') {
						q=q.substring(0,q.length-1);
						return q;
					}
					return q;

				}
			}

			for (var i=0;i<ds.length;i++) {
				var q=ds[i];	
				var qc=dsQ[i];
				var caw=containsAllWords2(t,qc);
				if (caw==1) {
					if (i==0 && q.charAt(q.length-1)==':') {
						q=q.substring(0,q.length-1);
						//alert("C: "+q+" : "+w);
						return q;
					}
					
					return q;
				}
			}

			//alert("INJECT SYN: "+q);
			var q=ds[0];
			if (q.charAt(q.length-1)==':') q=q.substring(0,q.length-1);
			//alert("D: "+q+" : "+w);
			return q;
		}
		}

		return w;


	}




      function charConversion(intext){
        var intext;
        var outtext = '';
        // loop through the text one character at a time.
        for (var i=0; i<=intext.length; i++) {

		var code = intext.charCodeAt(i);
          	// Setup single char to single char conversions to be made
          	if (code == 8220){code = 34;} //  curly-double quote open
          	if (code == 8221){code = 34;} //  curly-double quote close

	  	if (code == 8217){code = 39;} //  curly-single quote open 
          	if (code == 8216){code = 39;} //  curly-single quote close  
          	if (code == 8211){code = 45;} //  en-dash with -

		// Setup and handle single char to multiple char replacements
		if (code == 8212){ //  em-dash with --
			code = '';
			outtext = outtext+String.fromCharCode(45,45);		
		}		
		if (code == 8482){ //  TM symbol  to (TM)
			code = '';
			outtext = outtext+String.fromCharCode(40,84,77,41);		
		}		
		if (code == 8230){ //  ellipsis  to three-periods
			code = '';
			outtext = outtext+String.fromCharCode(46,46,46);		
		} 
		
		// Handles all single char to single char replacements.
		if (code!=''){	
			//outtext = outtext+String.fromCharCode(code);
			var ttt=''+code;
			if ('NaN'!=ttt) {
				outtext = outtext+'&#'+code+';';
			}
		}
	}
	
	return outtext;

	}



	var TRYCC=0;
	function matchAA() {
		TRYCC++;
		var hreq=HREQQ;
		if (hreq.readyState == 4) {
			if (hreq.status == 200) {
				var R=hreq.responseText;
				R=trim22(R);				
				uAutoCRes(R);
			} else {
				if (TRYCC<3) {
					//setTimeout('matchAA()',100);
				}
			}
		} else {
			if (TRYCC<3) {
				//setTimeout('matchAA()',100);
			}			
		}

	}

	function uAutoCRes(R) {
				var multi=0;
				var DSR=R.split('!');
				HREQQRESALL=new Array();
				//alert(DSR.length);
				for (var g=0;g<DSR.length;g++) {
					R=DSR[g];
					R=trim(R);
					R=trim22(R);

					var rss=R.split('~');
					if (rss.length==2) {	
						var A=rss[0];
						var B=rss[1];
						var X=A.split('|');
						var Y=B.split('|');
						//if (R.length>0) alert(R.length+" "+X.length+" "+Y.length);
						if (X.length==Y.length) {

							var n=new Array(X.length);		
							currentSub=new Array(Y.length);
							var ci=0;
							for (var i=0;i<X.length;i++) {
								if (X[i].length>0) {
									n[ci]=X[i];
									currentSub[ci]=Y[i];
									ci++;
								}
							}

							HREQQRES=n;

							//return n;
							if (DSR.length>1) {
								HREQQRESALL[HREQQRESALL.length]=n;
								//alert(n.length);
							}

						} else {

						}
					}

				}

	}


	var MATCHREQOBJ=null;
	var HREQQTXT='';
	var HREQQ=null;
	var HREQQRES=new Array();
	var HREQQRESALL=new Array();
	var HREQQPREVREQ='';
	var HREQQMSTRING='';
	var HREQQMSTRINGCAT='';
	var PREVQQQTXTREQ='';
	function getMatches(matchString,matchStringCAT,t) {
		//TESTTINEA=(new Date()).getTime();
		var n=new Array(100);		
		currentSub=new Array(100);
		HREQQRES=n;
		HREQQRESALL=new Array(10);
		HREQQTXT=t;
		HREQQMSTRING=matchString;
		HREQQMSTRINGCAT=matchStringCAT;

		if (t==null || trim(t).length<1) return;


		if (matchString==matchStringCAT) matchString='';

		
		
		var gen='';
		if (1) {
			var E=document.getElementsByName('gendersel');
			if (E!=null) {
				var h=0;
				for (var i=0;i<E.length;i++) {
					if (E[i].checked) {
						gen=E[i].value;
						break;
					}
				}
			}
			if (gen=='') {
				var E=document.getElementsByName('gender');
				if (E!=null) {
					var h=0;
					for (var i=0;i<E.length;i++) {
						if (E[i].checked) {
							gen=E[i].value;
							break;
						}
					}
				}
			}
		}

		
		var url='/ajaxmatch.jsp?matchString='+escape(matchString)+'&matchStringCAT='+escape(matchStringCAT)+'&t='+escape(t)+'&language=english'+'&gender='+escape(gen);



		if (HREQQPREVREQ==url) {
			return;	
		}
		HREQQPREVREQ=url;




		//var rand_no = ''+(10000*Math.random());
		//rand_no=escape(rand_no);
		//url+='&rand='+rand_no;


		url+='&ul=true';
		
		//alert(url);
		
		var req = false;
		// branch for native XMLHttpRequest object
		if (MATCHREQOBJ==null) {
			if(window.XMLHttpRequest && !(window.ActiveXObject)) {
			   	try {
					req = new XMLHttpRequest();
			    } catch(e) {
					req = false;
			    }
			    // branch for IE/Windows ActiveX version
			} else if(window.ActiveXObject) {
				try {
					req = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					try {
						req = new ActiveXObject("Microsoft.XMLHTTP");
					} catch(e) {
						req = false;
					}
				}
			}
			MATCHREQOBJ=req;
		} else {
			req=MATCHREQOBJ;
		}	
		try {
			req.abort();
		} catch (e) {}


		if(req) {	


			/*
			if (matchString=='matchString') {
				HREQQ=req;
				var EEE=getMatchesClient(matchStringClient,t);			
				doMMAATT(EEE);
				return;
			}
			*/

			HREQQ=req;
			//req.onreadystatechange = displayAMatch();
			req.onreadystatechange = displayAMatch;
			//req.open("GET", url, false);
			req.open("GET", url);
			req.send("");			

			TRYCC=0;


		}		

	}

	function doMMAATT(R) {

				R=trim22(R);
				uAutoCRes(R);

				var n=HREQQRES;

				ALLOPS=new Array();

				if (SINGLECOLUMNAUTO!='') {
					if ('symptom'==SINGLECOLUMNAUTO) {

						if (THISS.matchS=='matchDiagString') {

							ALLOPS[0]=new Array();
							ALLOPS[1]=n;
							ALLOPS[2]=new Array();
							ALLOPS[3]=new Array();
							ALLOPS[4]=new Array();
							ALLOPS[5]=new Array();
							ALLOPS[6]=new Array();
						} else if (THISS.matchS=='matchMedsString') {
	
							ALLOPS[0]=new Array();
							ALLOPS[1]=new Array();
							ALLOPS[2]=new Array();
							ALLOPS[3]=n;
							ALLOPS[4]=new Array();
							ALLOPS[5]=new Array();
							ALLOPS[6]=new Array();
						} else if (THISS.matchS=='matchProcString') {

							ALLOPS[0]=new Array();
							ALLOPS[1]=new Array();
							ALLOPS[2]=new Array();
							ALLOPS[3]=new Array();
							ALLOPS[4]=n;
							ALLOPS[5]=new Array();
							ALLOPS[6]=new Array();

						} else if (THISS.matchS=='matchImmuString') {

							ALLOPS[0]=new Array();
							ALLOPS[1]=new Array();
							ALLOPS[2]=new Array();
							ALLOPS[3]=new Array();
							ALLOPS[4]=new Array();
							ALLOPS[5]=n;
							ALLOPS[6]=new Array();

						} else if (THISS.matchS=='matchAlrgString') {

							ALLOPS[0]=new Array();
							ALLOPS[1]=new Array();
							ALLOPS[2]=new Array();
							ALLOPS[3]=new Array();
							ALLOPS[4]=new Array();
							ALLOPS[5]=new Array();
							ALLOPS[6]=n;
						} else {
							ALLOPS[0]=n;
							ALLOPS[1]=new Array();
							ALLOPS[2]=new Array();
							ALLOPS[3]=new Array();
							ALLOPS[4]=new Array();
							ALLOPS[5]=new Array();
							ALLOPS[6]=new Array();
						}

					} else if ('diagnosis'==SINGLECOLUMNAUTO) {

						ALLOPS[0]=new Array();
						ALLOPS[1]=n;
						ALLOPS[2]=new Array();
						ALLOPS[3]=new Array();
						ALLOPS[4]=new Array();
						ALLOPS[5]=new Array();
						ALLOPS[6]=new Array();


					} else if ('medication'==SINGLECOLUMNAUTO) {
						ALLOPS[0]=new Array();
						ALLOPS[1]=new Array();
						ALLOPS[2]=new Array();
						ALLOPS[3]=n;
						ALLOPS[4]=new Array();
						ALLOPS[5]=new Array();
						ALLOPS[6]=new Array();

					} else if ('procedure'==SINGLECOLUMNAUTO) {
						ALLOPS[0]=new Array();
						ALLOPS[1]=new Array();
						ALLOPS[2]=new Array();
						ALLOPS[3]=new Array();
						ALLOPS[4]=n;
						ALLOPS[5]=new Array();
						ALLOPS[6]=new Array();


					} else if ('immunization'==SINGLECOLUMNAUTO) {
						ALLOPS[0]=new Array();
						ALLOPS[1]=new Array();
						ALLOPS[2]=new Array();
						ALLOPS[3]=new Array();
						ALLOPS[4]=new Array();
						ALLOPS[5]=n;
						ALLOPS[6]=new Array();

					} else if ('allergy'==SINGLECOLUMNAUTO) {
						ALLOPS[0]=new Array();
						ALLOPS[1]=new Array();
						ALLOPS[2]=new Array();
						ALLOPS[3]=new Array();
						ALLOPS[4]=new Array();
						ALLOPS[5]=new Array();
						ALLOPS[6]=n;


					} else if ('physician'==SINGLECOLUMNAUTO) {
						ALLOPS[0]=new Array();
						ALLOPS[1]=new Array();
						ALLOPS[2]=n;
						ALLOPS[3]=new Array();
						ALLOPS[4]=new Array();
						ALLOPS[5]=new Array();
						ALLOPS[6]=new Array();
					}
				} else {
					//ALLOPS=getMatches('matchAll','',txt);
					ALLOPS=n;
				}




				displayMMMM();

				HREQQTXT='';
				HREQQ=null;
				HREQQRES=new Array();
				HREQQRESALL=new Array();
				HREQQPREVREQ='';
				TRYCC=0;

	}


	function displayAMatch() {
		var hreq=HREQQ;
		if (hreq==null) return;
		var matchString=HREQQMSTRING;
		var matchStringCAT=HREQQMSTRINGCAT;

		TRYCC++;
		//var hreq=MATCHREQOBJ;

		if (hreq.readyState == 4) {
			if (hreq.status == 200) {
				TRYCC=10;
				var R=hreq.responseText;
				R=trim22(R);

				uAutoCRes(R);

				var WARNINGT=hreq.getResponseHeader('Warning');
				var n=HREQQRES;
				if (matchString=='matchAll') {
					n=HREQQRESALL;
				}
				

				ALLOPS=new Array();

				//alert(CURTXTTXT+" "+WARNINGT+"\n\n"+R);
				//alert(WARNINGT);
				if (WARNINGT!=null && WARNINGT.length>0 && WARNINGT.indexOf('&')<0 ) {
					if (WARNINGT!=CURTXTTXT) {
						
						displayMMMM();
		
						HREQQTXT='';
						HREQQ=null;
						HREQQRES=new Array();
						HREQQRESALL=new Array();
						HREQQPREVREQ='';
						TRYCC=0;
						return;
					}
				}



				
				if (SINGLECOLUMNAUTO!='') {
					if ('symptom'==SINGLECOLUMNAUTO) {

						if (THISS.matchS=='matchDiagString') {

							ALLOPS[0]=new Array();
							ALLOPS[1]=n;
							ALLOPS[2]=new Array();
							ALLOPS[3]=new Array();
							ALLOPS[4]=new Array();

							ALLOPS[5]=new Array();
							ALLOPS[6]=new Array();
						} else if (THISS.matchS=='matchMedsString') {
	
							ALLOPS[0]=new Array();
							ALLOPS[1]=new Array();
							ALLOPS[2]=new Array();
							ALLOPS[3]=n;
							ALLOPS[4]=new Array();
							ALLOPS[5]=new Array();
							ALLOPS[6]=new Array();
						} else if (THISS.matchS=='matchProcString') {

							ALLOPS[0]=new Array();
							ALLOPS[1]=new Array();
							ALLOPS[2]=new Array();
							ALLOPS[3]=new Array();
							ALLOPS[4]=n;
							ALLOPS[5]=new Array();
							ALLOPS[6]=new Array();

						} else if (THISS.matchS=='matchImmuString') {

							ALLOPS[0]=new Array();
							ALLOPS[1]=new Array();
							ALLOPS[2]=new Array();
							ALLOPS[3]=new Array();
							ALLOPS[4]=new Array();
							ALLOPS[5]=n;
							ALLOPS[6]=new Array();

						} else if (THISS.matchS=='matchAlrgString') {

							ALLOPS[0]=new Array();
							ALLOPS[1]=new Array();
							ALLOPS[2]=new Array();
							ALLOPS[3]=new Array();
							ALLOPS[4]=new Array();
							ALLOPS[5]=new Array();
							ALLOPS[6]=n;
						} else {
							ALLOPS[0]=n;
							ALLOPS[1]=new Array();
							ALLOPS[2]=new Array();
							ALLOPS[3]=new Array();
							ALLOPS[4]=new Array();
							ALLOPS[5]=new Array();
							ALLOPS[6]=new Array();
						}

					} else if ('diagnosis'==SINGLECOLUMNAUTO) {

						ALLOPS[0]=new Array();
						ALLOPS[1]=n;
						ALLOPS[2]=new Array();
						ALLOPS[3]=new Array();
						ALLOPS[4]=new Array();
						ALLOPS[5]=new Array();
						ALLOPS[6]=new Array();


					} else if ('medication'==SINGLECOLUMNAUTO) {
						ALLOPS[0]=new Array();
						ALLOPS[1]=new Array();
						ALLOPS[2]=new Array();
						ALLOPS[3]=n;
						ALLOPS[4]=new Array();
						ALLOPS[5]=new Array();
						ALLOPS[6]=new Array();

					} else if ('procedure'==SINGLECOLUMNAUTO) {
						ALLOPS[0]=new Array();
						ALLOPS[1]=new Array();
						ALLOPS[2]=new Array();
						ALLOPS[3]=new Array();
						ALLOPS[4]=n;
						ALLOPS[5]=new Array();
						ALLOPS[6]=new Array();

					} else if ('immunization'==SINGLECOLUMNAUTO) {
						ALLOPS[0]=new Array();
						ALLOPS[1]=new Array();
						ALLOPS[2]=new Array();
						ALLOPS[3]=new Array();
						ALLOPS[4]=new Array();
						ALLOPS[5]=n;
						ALLOPS[6]=new Array();

					} else if ('allergy'==SINGLECOLUMNAUTO) {
						ALLOPS[0]=new Array();
						ALLOPS[1]=new Array();
						ALLOPS[2]=new Array();
						ALLOPS[3]=new Array();
						ALLOPS[4]=new Array();
						ALLOPS[5]=new Array();
						ALLOPS[6]=n;


					} else if ('physician'==SINGLECOLUMNAUTO) {
						ALLOPS[0]=new Array();
						ALLOPS[1]=new Array();
						ALLOPS[2]=n;
						ALLOPS[3]=new Array();
						ALLOPS[4]=new Array();
						ALLOPS[5]=new Array();
						ALLOPS[6]=new Array();
					}
				} else {
					//ALLOPS=getMatches('matchAll','',txt);
					ALLOPS=n;
				}




				displayMMMM();

				HREQQTXT='';
				HREQQ=null;
				HREQQRES=new Array();
				HREQQRESALL=new Array();
				HREQQPREVREQ='';
				TRYCC=0;
			}
		} else {
			if (TRYCC<5) {
				setTimeout('displayAMatch()',500);
			}
		}
	}




	function getMatchesGUI(matchString,matchStringCAT,t) {
		//TESTTINEA=(new Date()).getTime();
		var n=new Array(100);		
		currentSub=new Array(100);
		HREQQRES=n;
		HREQQRESALL=new Array(10);
		HREQQTXT=t;
		if (t==null || trim(t).length<1) return;


		if (matchString==matchStringCAT) matchString='';

		

		var gen='';
		if (1) {
			var E=document.getElementsByName('gender');
			if (E!=null) {
				var h=0;
				for (var i=0;i<E.length;i++) {
					if (E[i].checked) {
						gen=E[i].value;
						break;
					}
				}
			}
		}


		var url='/ajaxmatch.jsp?matchString='+escape(matchString)+'&matchStringCAT='+escape(matchStringCAT)+'&t='+escape(t)+'&language=english'+'&gender='+escape(gen);


		if (HREQQPREVREQ==url) {
			return;	
		}
		HREQQPREVREQ=url;

		//var rand_no = ''+(10000*Math.random());
		//rand_no=escape(rand_no);
		//url+='&rand='+rand_no;


		url+='&ul=true';
		
		//alert(url);
		
		var req = false;
		// branch for native XMLHttpRequest object
		if (MATCHREQOBJ==null) {
			if(window.XMLHttpRequest && !(window.ActiveXObject)) {
			   	try {
					req = new XMLHttpRequest();
			    } catch(e) {
					req = false;
			    }
			    // branch for IE/Windows ActiveX version
			} else if(window.ActiveXObject) {
				try {
					req = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					try {
						req = new ActiveXObject("Microsoft.XMLHTTP");
					} catch(e) {
						req = false;
					}
				}
			}
			MATCHREQOBJ=req;
		} else {
			req=MATCHREQOBJ;
		}	

		if(req) {	
			//req.setRequestHeader("Content-Type","application/x-javascript; charset:ISO-8859-1");  //req.overrideMimeType('text/xml; charset=iso-8859-1'); //req.onreadystatechange = fun;
			req.open("GET", url, false);
			req.send("");			
			HREQQ=req;

			TRYCC=0;
			matchAA();

			n=HREQQRES;
			if (matchString=='matchAll') {
				n=HREQQRESALL;
			}

		}		


		HREQQTXT='';
		HREQQ=null;
		HREQQRES=new Array();
		HREQQRESALL=new Array();
		HREQQPREVREQ='';

		ALLOPS=n;
		return n;
	}





function decodeutf8(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }





	function getMatchType(t) {

		if (t==null || trim(t).length<1) return;

		if (matchString==matchStringCAT) matchString='';

		

		var url='/ajaxmatch.jsp?task=gettype&t='+escape(t)+'&language=english';
		var rand_no = Math.random();

		//url+='&rand='+rand_no;
		
		var req = false;
		// branch for native XMLHttpRequest object
		if(window.XMLHttpRequest && !(window.ActiveXObject)) {
		   	try {
				req = new XMLHttpRequest();
		    } catch(e) {
				req = false;
		    }
		    // branch for IE/Windows ActiveX version
		} else if(window.ActiveXObject) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					req = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					req = false;
				}
			}
		}
		

		if(req) {	
			//req.overrideMimeType('text/xml; charset=iso-8859-1');  
			//req.onreadystatechange = fun;
			req.open("GET", url, false);
			req.send("");			

			return matchTT(req);
		}		

		return '';
	}


	function matchTT(hreq) {
		if (hreq.readyState == 4) {
			if (hreq.status == 200) {
				var R=hreq.responseText;
				R=trim(R);
				R=trim22(R);
				if (R.length==0) R=''+CURRENTSECTIONC;
				//alert(R+"||"+CURRENTSECTIONC);
				return R;
			} else {

			}
		} else {

		}

	}



	function containsAlreadySimple(ar,v) {
		var ARL=ar.length;
		for (var i=0;i<ARL;i++) {
			if (ar[i]==v) return 1;
		}
		return 0;
	}


	function containsAlready(ar,v) {
		var S=v+'d';
		var T=v+'s';
		for (var i=0;i<ar.length;i++) {

			if (ar[i]==v) return 1;
			if (ar[i]==S) return 1;
			if (ar[i]==T) return 1;

			if ((ar[i]+'d')==v) return 1;
			if ((ar[i]+'s')==v) return 1;

		}
		return 0;
	}


	function containsAlreadySS(ar,v) {
		var S=v+'d';
		var T=v+'s';
		for (var i=0;i<ar.length;i++) {
			if (ar[i]==null) continue;

			if (ar[i]==v) return 1;
			if (ar[i]==S) return 1;
			if (ar[i]==T) return 1;

			if ((ar[i]+'d')==v) return 1;
			if ((ar[i]+'s')==v) return 1;
			if (v.length>10 && ar[i].indexOf(v)!=-1) return 1;

		}
		return 0;
	}


	function showSearchEdit() {
		var E=document.getElementById('searchformarea');
		var F=document.getElementById('searcheditsearch');

		if (E!=null && F!=null) {
			if (E.style.display=='none') {
				E.style.display='';
				F.style.display='none';
			} else {
				E.style.display='none';
				F.style.display='';
			}
		}
	}
	function showWebSearch() {
		window.location='?section=keyword';
	}
	
	var SYMTXTWIDTHSMALL='450px';
	var SYMTXTWIDTHLARGE='780px';
	var AUTOCOMPWIDTHLARGE='930px';
	



	function showDURQ() {

		for (var x=1;x<=4;x++) {
			var EN='DIVSYM'+x+'VALUE';
			var EE=document.getElementById(EN);
			if (EE!=null) {
				if (EE.value.length>=0) {
					var F=document.getElementById('DURADIV'+x);
					if (F!=null) {
						EE.style.width=SYMTXTWIDTHSMALL;//'240px';

						var FN='DIVSYM'+x+'VALUECONTAINER';
						var FE=document.getElementById(FN);
						FE.style.width=SYMTXTWIDTHSMALL;//'240px';


						F.style.display='';
					}
				}
			}
		}

		if (1) {
			var E=document.getElementById('SYMSEARCHPLUSSIGN');
			if (E!=null) E.style.display='';
			var E=document.getElementById('SYMSEARCHGENAGE');
			if (E!=null) E.style.display='';
		}
	}

	function hideDurations() {

		for (var x=2;x<=4;x++) {
			var F=document.getElementById('DURADIV'+x);
			if (F!=null) F.style.display='none';

		}
		if (1) {
			var E=document.getElementById('SYMSEARCHPLUSSIGN');
			if (E!=null) E.style.display='none';
			var E=document.getElementById('SYMSEARCHGENAGE');
			if (E!=null) E.style.display='none';
		}
	}

	function showDurations() {
		for (var x=1;x<=4;x++) {
			var F=document.getElementById('DURADIV'+x);
			if (F!=null) F.style.display='';

		}
	}


	function hideDURQ() {

		if (CURRENTSECTIONC!='' && MULTIROWON!='false') {
			for (var x=4;x>1;x--) {
				var EN='DIVSYM'+x+'VALUE';
				var EE=document.getElementById(EN);
				if (EE!=null) {				
					var q=EE.value;
					q=trim(q);
					if (q.length>0 && q!='type another symptom (optional)') {						
						var FN='DIVSYM1VALUE';
						var FE=document.getElementById(FN);
						if (FE!=null) {
							FE.value=q;
						}
						break;
					}
				}
			}

			if (1) {
				var E=document.getElementById('SYMSEARCHPLUSSIGN');
				if (E!=null) E.style.display='none';
				var E=document.getElementById('SYMSEARCHGENAGE');
				if (E!=null) E.style.display='none';
			}
		}

		for (var x=1;x<=4;x++) {
			
			var EN='DIVSYM'+x+'VALUE';
			var EE=document.getElementById(EN);
			if (EE!=null) {
				if (EE.value.length>0) {
					var F=document.getElementById('DURADIV'+x);
					if (F!=null) {
						EE.style.width=SYMTXTWIDTHLARGE;//'680px';
						var FN='DIVSYM'+x+'VALUECONTAINER';
						var FE=document.getElementById(FN);
						FE.style.width=SYMTXTWIDTHLARGE;//'680px';


						F.style.display='none';
					}
				}
			}
			if (x>1 && MULTIROWON!='false') {
				var EN='DIVSYM'+x+'VALUE';
				var EE=document.getElementById(EN);
				var g=0;
				if (EE!=null) {
					EE.value='';
					var YEN='SYMPTOMROW'+x;
					var YEE=document.getElementById(YEN);
					if (YEE!=null) {
						YEE.style.display='none';
					}
				}
			}
		}



	}
	function showThisSymptomRow(n) {
		var E=document.getElementById('SYMPTOMROWCONTROL'+n);
		var F=document.getElementById('SYMPTOMROWDETT'+n);
		var G=document.getElementById('SYMPTOMROWDETTB'+n);
		if (E!=null && F!=null && G!=null) {
			E.style.display='none';
			F.style.display='';
			G.style.display='';

			var H=document.getElementById('DIVSYM'+n+'VALUE');
			if (H!=null) {
				H.focus();
			}
		}
	}

	function showNextSymptomRow() {

		var FF=document.getElementById("section"); if (FF!=null) FF.value=CURRENTSECTIONC;
		
		

		if (CURRENTSECTIONC=='') {
			if (1) {
				var EN='DIVSYM1VALUE';
				var EE=document.getElementById(EN);
				if (EE!=null) {
					if (EE.value!='' && EE.value!=''  && EE.value!='type another symptom (optional)') {
						showDurations();
						showDURQ();
					}
				}
			}

			for (var x=1;x<=4;x++) {
			var EN='DIVSYM'+x+'VALUE';
			var EE=document.getElementById(EN);
			var g=0;
			if (EE!=null) {
				EE.name='symptom';
				if (EE.value!='' && EE.value!=''  && EE.value!='type another symptom (optional)') {
					if (x==1) g=1;
					var y=x+1;					
					if (y<=4) {
						var YEN='SYMPTOMROW'+y;
						var YEE=document.getElementById(YEN);
						if (YEE!=null) {
							YEE.style.display='';
						}
					}

				}
			}
			}		
			showslide('1');
		} else {


			var EN='DIVSYM1VALUE';
			var EE=document.getElementById(EN);
			if (EE!=null) {
				if ('keyword'==CURRENTSECTIONC) {
					EE.name='keyword';
					showslide('2');
					hideDURQ();
				} else if ('searchdrug'==CURRENTSECTIONC) {
					EE.name='drug';
					showslide('3');
					hideDURQ();
				} else if ('searchproc'==CURRENTSECTIONC) {
					EE.name='procedure';
					showslide('4');
					hideDURQ();
				} else if ('searchdoc'==CURRENTSECTIONC) {
					EE.name='associateddocs';
					showslide('5');
					hideDURQ();

				} else if (''==CURRENTSECTIONC) {
					EE.name='symptom';
					showslide('1');
				}
			}
			

		}

	}



	function showAdvancedSearch() {
		var E=document.getElementById('advancedsearch');
		var F=document.getElementById('ADVLINK');
		if (E!=null && F!=null) {
			if (E.style.display=='none') {
				E.style.display='';
				F.innerHTML='advanced';
			} else {
				E.style.display='none';
				F.innerHTML='advanced';
			}
		}
	}

	function showGraphicalSearch() {

		var E=document.getElementById('GRAPHICALSEARCH');
		if (E!=null ) {
			if (E.style.display=='none') {
				E.style.display='';
			} else {
				E.style.display='none';
			}
		}
		
	}
	

function AutoComplete(aStr, aStrCAT,oText, oDiv, oCont,nMaxSize,iN,addto)
{

	// initialize member variables
	this.matchS=aStr;
	this.matchSCAT=aStrCAT;
	this.oText = oText;
	this.oDiv = oDiv;
	this.oCont = oCont;
	this.activeTDIV=null;
	this.indexName=iN;
	this.nMaxSize = nMaxSize;
	this.usingKeys = 0;
	this.inDIV=0;
	this.addtofield=addto;
	if (this.addtofield==undefined || this.addtofield==null) {
		this.addtofield='false';
	}
	this.SNR=true;
	if (oDiv!=null) {
		if ((''+oDiv.id).indexOf('DTESTVALUE')>=0) {
			this.SNR=false;
		}
	}

	// preprocess the texts for fast access
			
	// attach handlers to the text-box
	if (oText!=null) {
		oText.AutoComplete = this;
		oText.onkeyup = AutoComplete.prototype.onTextChange;
		oText.onkeydown = AutoComplete.prototype.onKD;
		oText.onblur = AutoComplete.prototype.onTextBlur;
		//oCont.on = function() { alert("AA"); } //AutoComplete.prototype.onBMOO;
		oCont.AutoComplete=this;
		oDiv.AutoComplete=this;
		oText.onfocus = AutoComplete.prototype.onTextFocus;
		oText.onclick = AutoComplete.prototype.onClickT;
	}


}

AutoComplete.prototype.onKD = function (oEvent) {
	if (!oEvent) {

		oEvent = window.event;
	}
	if (this.value!=null && this.value=='') {
		this.value='';
	}
	if (this.value!=null && this.value=='type another symptom (optional)') {
		this.value='';
	}
	//alert(oEvent);
	//oEvent.cancelBubble=true;

	switch(oEvent.keyCode) {
        case 38: //up arrow
            //this.previousSuggestion();
			this.AutoComplete.usingKeys=1;
			if (this.AutoComplete.activeTDIV==null) {
				//this.AutoComplete.activeTDIV=this.AutoComplete.oDiv.firstChild;
				this.AutoComplete.activeTDIV=this.AutoComplete.oDiv.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild;
				var OFTOP=this.AutoComplete.activeTDIV.offsetTop;
				this.AutoComplete.oDiv.scrollTop=OFTOP;
			}
			if (this.AutoComplete.activeTDIV && this.AutoComplete.activeTDIV!=null) {
				//alert("D"+this.AutoComplete.activeTDIV.previousSibling+" "+this);
				if (this.AutoComplete.activeTDIV.previousSibling) {
					this.AutoComplete.activeTDIV.className = "AutoCompleteBackground";
					this.AutoComplete.activeTDIV.previousSibling.className = "AutoCompleteHighlight";
					this.AutoComplete.activeTDIV=this.AutoComplete.activeTDIV.previousSibling;
					var OFTOP=this.AutoComplete.activeTDIV.offsetTop;
					this.AutoComplete.oDiv.scrollTop=OFTOP;
				}
		 	}


            break;
        case 37: //left arrow
			this.AutoComplete.usingKeys=1;
			if (this.AutoComplete.activeTDIV && this.AutoComplete.activeTDIV!=null) {
				
				if (this.AutoComplete.activeTDIV.parentNode.parentNode.previousSibling) {
					this.AutoComplete.activeTDIV.className = "AutoCompleteBackground";
					this.AutoComplete.activeTDIV=this.AutoComplete.activeTDIV.parentNode.parentNode.previousSibling.firstChild.firstChild;
					this.AutoComplete.activeTDIV.className = "AutoCompleteHighlight";
				}
			}
            break;
        case 39: //right arrow
			this.AutoComplete.usingKeys=1;
			if (this.AutoComplete.activeTDIV && this.AutoComplete.activeTDIV!=null) {			
				if (this.AutoComplete.activeTDIV.parentNode.parentNode.nextSibling) {
					this.AutoComplete.activeTDIV.className = "AutoCompleteBackground";
					this.AutoComplete.activeTDIV=this.AutoComplete.activeTDIV.parentNode.parentNode.nextSibling.firstChild.firstChild;
					this.AutoComplete.activeTDIV.className = "AutoCompleteHighlight";
				}
			}
            break;
        case 40: //down arrow
            //this.nextSuggestion();
		
			//this.AutoComplete.usingKeys=1;
			if (this.AutoComplete.activeTDIV==null) {
				if (this.AutoComplete.oDiv!=null && this.AutoComplete.oDiv.firstChild!=null) {
					this.AutoComplete.activeTDIV=this.AutoComplete.oDiv.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild;
					this.AutoComplete.activeTDIV.className = "AutoCompleteHighlight";

					var OFTOP=this.AutoComplete.activeTDIV.offsetTop;
					this.AutoComplete.oDiv.scrollTop=OFTOP;
					//document.getElementById('ADDINTINFODIV').innerHTML=''+OFTOP+" "+this.AutoComplete.activeTDIV.scrollHeight+" "+this.AutoComplete.activeTDIV.getAttribute('number')+" ??"+this.AutoComplete.activeTDIV.innerHTML;
				} else {
					
				}
			} else {

				if (this.AutoComplete.activeTDIV && this.AutoComplete.activeTDIV!=null) {
					//alert("D"+this.AutoComplete.activeTDIV.nextSibling+" "+this);
	
					if (this.AutoComplete.activeTDIV.nextSibling) {
						this.AutoComplete.activeTDIV.className = "AutoCompleteBackground";
						this.AutoComplete.activeTDIV.nextSibling.className = "AutoCompleteHighlight";
						this.AutoComplete.activeTDIV=this.AutoComplete.activeTDIV.nextSibling;

						var OFTOP=this.AutoComplete.activeTDIV.offsetTop;
						this.AutoComplete.oDiv.scrollTop=OFTOP;
		
					} else {
					}
			 	} else {
				}
			}

            break;
        case 13: //enter

			this.AutoComplete.usingKeys=1;
			if (this.AutoComplete.activeTDIV!=null) {

				//this.AutoComplete.oText.value = this.AutoComplete.activeTDIV.innerHTML;
				if (false && this.AutoComplete.activeTDIV.title==this.AutoComplete.activeTDIV.title.toUpperCase()