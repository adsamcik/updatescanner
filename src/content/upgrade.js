/* ***** BEGIN LICENSE BLOCK *****
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * 
 * The Original Code is Update Scanner.
 * 
 * The Initial Developer of the Original Code is Pete Burgers.
 * Portions created by Pete Burgers are Copyright (C) 2006-2007
 * All Rights Reserved.
 * 
 * Contributor(s):
 * 
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.  
 * ***** END LICENSE BLOCK ***** */

if (typeof(USc_upgrade_exists) != 'boolean') {
var USc_upgrade_exists = true;
var USc_upgrade = {    


kVERSION_MAJOR : 2,
kVERSION_MINOR : 3,
kVERSION_REVISION : 0,

check : function()
{
    var me = USc_upgrade;
    var nodes;
    var node;
    var id;
    var filebase;
    var versionMajor;
    var versionMinor;
    var versionRevision;
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].
                 getService(Components.interfaces.nsIPrefService).
                 getBranch("extensions.updatescan.");
    var locale = Components.classes["@mozilla.org/preferences-service;1"].
                 getService(Components.interfaces.nsIPrefService).
                 getBranch("general.useragent.").
                 getCharPref("locale");
    var filebase;
    
    try {
        versionMajor = prefs.getIntPref("versionMajor");
        versionMinor = prefs.getIntPref("versionMinor");
        versionRevision = prefs.getIntPref("versionRevision");
    } catch (e) {
        // New installation
        versionMajor = 0;
        versionMinor = 0;
        versionRevision = 0;
    }

// We should really just silently refuse to upgrade from really old installations,
// just in case

    if (      versionMajor < 2 || 
              versionMajor == 2 && versionMinor < 3) {
        if (me.upgrade_2_3_0()) {
//            prefs.setIntPref("versionMajor", me.kVERSION_MAJOR);
//            prefs.setIntPref("versionMinor", me.kVERSION_MINOR);
//            prefs.setIntPref("versionRevision", me.kVERSION_REVISION);
        }
    }
},

upgrade_2_3_0 : function()
{
    var me = USc_upgrade;

    me.createRootBookmarks();
    
    return true;
},

createRootBookmarks : function ()
{
    var locale = Components.classes["@mozilla.org/preferences-service;1"].
                 getService(Components.interfaces.nsIPrefService).
                 getBranch("general.useragent.").
                 getCharPref("locale");
    var updatescanURL="http://updatescanner.mozdev.org/redirect.php?page=index.html&source=scan&locale="+locale;
    var bookmarksService = Cc["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Ci.nsINavBookmarksService);

    var folderId = bookmarksService.createFolder(bookmarksService.bookmarksMenuFolder, "Update Scanner's Pages", bookmarksService.DEFAULT_INDEX);
    USc_places.setRootFolderId(folderId);
    USc_places.addBookmark("Update Scanner Website", updatescanURL);

    filebase = USc_file.escapeFilename(folderId);
    USc_file.USwriteFile(filebase+".new", "**NEW**");
/*
    USc_rdf.modifyItem(id, "lastscan", "");  // lastscan not defined
    USc_rdf.modifyItem(id, "changed", "0");  // not changed 
    USc_rdf.modifyItem(id, "error", "0");    // no error
    USc_rdf.save();
*/    
}


}
}
