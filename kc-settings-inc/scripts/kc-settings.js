var win=window.dialogArguments||opener||parent||top;(function(a){win.kcFileMultiple=function(f){var b=win.kcSettings.upload.target,g=b.data("currentFiles"),d=b.children().last(),h=a(),c=null;for(var e in f){if(!f.hasOwnProperty(e)||a.inArray(f[e].id,g)>-1){continue}c=d.clone().removeClass("hidden");c.find("img").attr("src",f[e].img);c.find("input").val(f[e].id).prop("checked",false);c.find(".title").text(f[e].title);h=h.add(c)}b.append(h);if(d.is(".hidden")){h.show();d.remove()}b.show().prev(".info").show()};win.kcFileSingle=function(d){var b=win.kcSettings.upload.target.removeAttr("data-type"),c=b.find("span").text(d.title);b.find("input").val(d.id).trigger("change",{update:true}).siblings("a").hide().siblings("p").fadeIn().find("img").attr("src",d.img);if(d.type=="image"){b.attr("data-type",d.type);c.hide()}else{c.show()}}})(jQuery);jQuery(document).ready(function(e){var l=e("#kcsb"),f=e("form.kcsb"),c=e("#kc-settings-form");if(c.length){var d=c.find("div.metabox-holder");if(d.length){var b=d.attr("id"),j=c.find(":checkbox");if(j.length){var k=e();j.each(function(){var o=e("#"+b+"-"+this.value);if(!o.length){return}var n=e(this),m=e("#"+b+"-"+this.value+"-hide");n.data("sectHider",m).data("sectBox",o);if(!(this.checked===m[0].checked)){m.prop("checked",this.checked).triggerHandler("click")}k=k.add(n)});if(k.length){k.change(function(){var m=e(this);m.data("sectHider").prop("checked",this.checked).triggerHandler("click");if(this.checked){m.data("sectBox").kcGoto({offset:-40,speed:"slow"})}})}}}}e("ul.kc-rows").sortable({axis:"y",start:function(m,n){n.placeholder.height(n.item.outerHeight())},stop:function(m,n){n.item.parent().kcReorder(n.item.data("mode"),true).children().each(function(){e("> .actions .count",this).text(e(this).index()+1)})}});e(".row a.del").live("click",function(q){var p=e(this),m=p.closest(".row"),n=m.parent(),r=m.data("mode"),o=m.is(":last-child");if(!m.siblings(".row").length){return false}m.addClass("removing").fadeOut("slow",function(){m.remove();if(!o){n.kcReorder(r,true);if(f.length){n.children().each(function(){e("> .actions .count",this).text(e(this).index()+1)})}}});return false});e(".row a.add").live("click",function(r){var s=e(this),u=s.closest(".row"),n=u.parent(),q=u.data("mode"),o=u.is(":last-child"),p=u.clone(false).addClass("adding"),t=false,m=400;if(q=="sections"){t=true;m=1200}else{if(q=="fields"){t=true;m=800}}if(f.length){p.find(".kc-rows").each(function(){var v=e(this).children(".row");if(v.length>1){v.not(":first").remove()}});p.find(":input").each(function(){var v=e(this);if(this.type=="text"||this.type=="textarea"){v.removeAttr("style").val("")}else{if(this.type=="checkbox"||this.type=="radio"){v.prop("checked",this.checked)}}if(v.is(".kcsb-ids")){v.kcsbUnique()}})}else{p.find(":input").each(function(){if(e(this).data("nocleanup")!==true){e(this).val("")}})}u.after(p);if(t){p.kcGoto({offset:-100,speed:m})}setTimeout(function(){p.removeClass("adding")},m);n.kcReorder(q,true);if(f.length){if(o){e("> .actions .count",p).text(p.index()+1)}else{n.children().each(function(){e("> .actions .count",this).text(e(this).index()+1)})}}return false});e(".row a.clear").live("click",function(m){e(this).closest(".row").find(":input").val("");return false});var a=e("input[type=date]");if(a.length&&Modernizr.inputtypes.date===false){var g=e("body").is(".admin-color-classic")?"cupertino":"flick";Modernizr.load([{load:win.kcSettings.paths.styles+"/jquery-ui/"+g+"/style.css",complete:function(){a.datepicker({dateFormat:"yy-mm-dd"})}}])}var i=e("input[type=color]");if(i.length&&Modernizr.inputtypes.color===false){Modernizr.load([{load:[win.kcSettings.paths.scripts+"/colorpicker/js/colorpicker.js",win.kcSettings.paths.scripts+"/colorpicker/css/colorpicker.css",win.kcSettings.paths.scripts+"/rgbcolor.js"],complete:function(){i.ColorPicker({onBeforeShow:function(){e(this).ColorPickerSetColor(this.value)},onSubmit:function(m,q,o,p){var n="#"+q;e(p).css({backgroundColor:n,color:invertColor(n)}).val(n).ColorPickerHide()}}).each(function(){var m=e(this);if(m.val()!==""){m.css({backgroundColor:this.value,color:invertColor(this.value)})}})}}])}e(".kcs-file a.rm").live("click",function(o){o.preventDefault();var n=e(this),m=n.closest(".row");m.addClass("removing").fadeOut("slow",function(){if(m.siblings().length){m.remove()}else{m.removeClass("removing").addClass("hidden").find(":input").val("").prop("checked",false);e("input.fileID",m).prop("disabled",true);m.parent().hide().prev(".info").hide()}})});e("a.kcsf-upload").live("click",function(q){q.preventDefault();var o=e(this),m=o.siblings(".kc-rows"),n=m.find(".row.hidden"),p=[];if(n.length){e("input.fileID",n).prop("disabled",false)}else{e("input.fileID",m).each(function(){p.push(this.value)})}win.kcSettings.upload.target=m.data("currentFiles",p);tb_show("",o.attr("href"))});var h=e(".kcs-file-single");if(h.length){e("a.rm",h).click(function(m){m.preventDefault();e(this).fadeOut().closest("div").find("p.current").fadeOut(function(){e(this).siblings("a.up").show().siblings("input").val("")})});e("a.up",h).click(function(n){n.preventDefault();var m=e(this);win.kcSettings.upload.target=m.closest("div");tb_show("",m.attr("href"))});e("input",h).live("change",function(r,q){if(q===undefined||q.hasOwnProperty(update)||!q.update){return}var p=e(this),n=p.val();if(!n){return}var m=p.closest("div"),o=m.size;e.ajax({type:"POST",url:ajaxurl,data:{action:"kc_get_image_url",id:n,size:m.data("size")},success:function(s){if(s!==0){m.find("img").attr("src",s)}}})})}e("ul.kc-sortable").sortable({axis:"y",start:function(m,n){n.placeholder.height(n.item.outerHeight())}});e("a.kc-help-trigger").live("click",function(){if(win.kcHelpBox!==undefined){win.kcPopHelp()}else{e("#contextual-help-link").click();e("#screen-meta").kcGoto()}return false});if(l.length){if(!l.is(".hidden")){l.kcGoto()}e(".hasdep",l).kcFormDep();e("input.kcsb-slug").live("blur",function(){var n=e(this),m=n.val();n.val(kcsbSlug(m))});e("input.kcsb-ids").kcsbUnique();e("input.required, input.clone-id").live("blur",function(){e(this).kcsbCheck()});e("#new-kcsb").live("click",function(){l.kcGoto();return false});e("a.kcsb-cancel").live("click",function(){e("#kcsb").fadeOut(function(){e("body").kcGoto()});return false});e("a.clone-open").live("click",function(){e(this).parent().children().hide().filter("div.kcsb-clone").fadeIn();return false});e("a.clone-do").click(function(){var m=e(this),n=e(this).siblings("input");if(n.kcsbCheck()===false){return false}m.attr("href",m.attr("href")+"&new="+n.val())});e("input.clone-id").bind("keypress",function(o){var m=o.keyCode||o.which;if(m===13){var n=e(this);o.preventDefault();n.blur().siblings("a.clone-do").data("new",n.val()).trigger("click")}});e(".kcsb-tools a.close").live("click",function(){var n=e(this),m=n.parent();n.siblings("input").val("");m.fadeOut(function(){e(this).siblings().show()});return false});f.submit(function(n){var m=true;e(this).find("input.required").not(":disabled").each(function(){if(e(this).kcsbCheck()===false){m=false;return false}});if(!m){return false}})}});