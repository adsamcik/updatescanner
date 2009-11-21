/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is mozilla.org code.
 *
 * The Initial Developer of the Original Code is
 * Pierre Chanial <chanial@noos.fr>.
 * Portions created by the Initial Developer are Copyright (C) 1998
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *     Pete Burgers (updatescanner@gmail.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either of the GNU General Public License Version 2 or later (the "GPL"),
 * or the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
 
// This code is copied from the "AddToBookmarks" context menu item.

// See the end of the file for load/unload observers!

if (typeof(USc_overlay_exists) != 'boolean') {
var USc_overlay_exists = true;
var USc_overlay = {    

load : function() 
{
    var me = USc_overlay;
    // Eventlistener for the main context menu
    var menu = document.getElementById("contentAreaContextMenu");
    if (menu) {
        menu.addEventListener("popupshowing", me._showMenu, false);
    }

    // Eventlistener for the statusbar context menu
    var statusmenu = document.getElementById("UpdateScanStatusMenu");
    if (statusmenu) {
        statusmenu.addEventListener("popupshowing", me._showStatusMenu, false);
    }
},

// Don't show context menu item when text is selected,
// or if URL is in chrome:// space.
_showMenu : function() 
{
    if(gContextMenu.isTextSelected || !window.content.document.URL) {
        document.getElementById("AddToUpdateScan").hidden = true;
    } else {
        document.getElementById("AddToUpdateScan").hidden = false;
    }
},

_showStatusMenu : function()
{
    // Don't show context menu "Show All Changes" if there are no changes to show.
    var changed = USc_places.queryAnno(USc_places.getRootFolderId(),
                                       USc_places.ANNO_STATUS,
                                       USc_places.STATUS_UNKNOWN);
    if (changed == USc_places.STATUS_UPDATE) {
        document.getElementById("StatusMenuShowAllChanges").hidden = false;
    } else {
        document.getElementById("StatusMenuShowAllChanges").hidden = true;
    }

    // Don't show context menu "Scan Page For Updates" item if URL is in chrome:// space.
    if(!window.content.document.URL) {
        document.getElementById("StatusMenuAddToUpdateScan").hidden = true;
    } else {
        document.getElementById("StatusMenuAddToUpdateScan").hidden = false;
    }

    // Show/hide the enable/disable options as appropriate
    var prefBranch = (Components.classes["@mozilla.org/preferences-service;1"].
                      getService(Components.interfaces.nsIPrefService).
                      getBranch("extensions.updatescan."));

    if (prefBranch.getBoolPref("scan.enable")) {
        document.getElementById("StatusMenuDisableScanner").hidden = false;
        document.getElementById("StatusMenuEnableScanner").hidden = true;
    } else {
        document.getElementById("StatusMenuDisableScanner").hidden = true;        
        document.getElementById("StatusMenuEnableScanner").hidden = false;
    }
},

onShowAll : function(aEvent)
{
    USc_updatescan.showAllChangesInNewTabs();
},

_diffItemNewTabBackground : function(id, delay)
{
    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                       .getService(Components.interfaces.nsIWindowMediator);
    var window = wm.getMostRecentWindow("navigator:browser");

    var mainWindow = window.QueryInterface(
    Components.interfaces.nsIInterfaceRequestor)
    .getInterface(Components.interfaces.nsIWebNavigation)
    .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
    .rootTreeItem
    .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
    .getInterface(Components.interfaces.nsIDOMWindow);

    var diffURL = USc_updatescan._diffItem(id, delay);
    if (diffURL) {
      mainWindow.getBrowser().addTab(diffURL);
    }
},

};
}

window.addEventListener("load", USc_overlay.load, false);
