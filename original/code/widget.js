/*
	partical emulation of window.widget and window.menu primitives known from Nokia
	it is needed to test app on normal browser on PC

    Copyright (C) 2012  Paweł Pyrczak

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/



if ((!window.widget)){
    
    
    
    function setCookie(c_name,value,exdays)
    {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    }    

    function getCookie(c_name)
    {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name)
        {
        return unescape(y);
        }
      }
    }    
    
    widget = function() {
        this.isrotationsupported=false;   
    }
    
    widget.prototype = {

        setNavigationEnabled : function(n) {
        },
    
        setDisplayLandscape : function(n) {
        },
    
        prepareForTransition : function(n) {
        },
        
        performTransition : function(n) {
        },
    
        setRightSoftkeyLabel : function(n,a) {
        },
    
        preferenceForKey : function(key) {
            return getCookie(key);    
        },
    
        setPreferenceForKey : function(data, key) {
            setCookie(key,data,(5*365)); // five years ? isn't too long ?
            return true;
        }
    }

    menu = function() {
        this.isrotationsupported=false;   
    }    

    menu.prototype = {
        test : true,
        hideSoftkeys : function(){
        },
        
        showSoftkeys : function(){
        },

        setRightSoftkeyLabel : function(a,b){
        },
        
        setLeftSoftkeyLabel : function(a,b){
        }
    }
      
    window.widget = new widget();
    window.menu = new menu();

}
