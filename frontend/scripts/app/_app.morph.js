var app = app || {};

(function(body){
    "use strict";

    app.morph = {

        init: function() {
            function morphDropdown( element ) {
                this.element = element;
                this.mainNavigation = this.element.find('.main-nav');
                this.mainNavigationItems = this.mainNavigation.find('.has-dropdown');
                this.dropdownList = this.element.find('.dropdown-list');
                //...
                
                this.bindEvents();
            }

            morphDropdown.prototype.bindEvents = function() {
                var self = this;
                
                this.mainNavigationItems.mouseenter(function(event){
                    //hover over one of the nav items -> show dropdown
                    self.showDropdown($(this));
                }).mouseleave(function(){
                    //if not hovering over a nav item or a dropdown -> hide dropdown
                    if( self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) self.hideDropdown();
                });
            };

            morphDropdown.prototype.showDropdown = function(item) {
                var selectedDropdown = this.dropdownList.find('#'+item.data('content')),
                    selectedDropdownHeight = selectedDropdown.innerHeight(),
                    selectedDropdownWidth = selectedDropdown.children('.content').innerWidth(),
                    selectedDropdownLeft = item.offset().left + item.innerWidth()/2 - selectedDropdownWidth/2;
             
                //update dropdown and dropdown background position and size
                this.updateDropdown(selectedDropdown, parseInt(selectedDropdownHeight), selectedDropdownWidth, parseInt(selectedDropdownLeft));
                
                //add the .active class to the selected .dropdown and .is-dropdown-visible to the .cd-morph-dropdown 
                //...
            };
             
            morphDropdown.prototype.updateDropdown = function(dropdownItem, height, width, left) {
                this.dropdownList.css({
                    '-moz-transform': 'translateX(' + left + 'px)',
                    '-webkit-transform': 'translateX(' + left + 'px)',
                    '-ms-transform': 'translateX(' + left + 'px)',
                    '-o-transform': 'translateX(' + left + 'px)',
                    'transform': 'translateX(' + left + 'px)',
                    'width': width+'px',
                    'height': height+'px'
                });
             
                this.dropdownBg.css({
                    '-moz-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
                    '-webkit-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
                    '-ms-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
                    '-o-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
                    'transform': 'scaleX(' + width + ') scaleY(' + height + ')'
                });
            };

        }

    };

})(document.body);