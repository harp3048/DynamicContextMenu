
//Define Custom App Directive
    angular
    .module("contextMenuApp")
    .directive('ngContextMenu', function ($parse) {
            
           var contextMenu={}; //creating directive object
            contextMenu.restrict ="AE"; //restricting the difrective to be "attribute" or "element".
            contextMenu.scope = {"tag" : "=" }; //ISOLATING THE SCOPE. Array of context menu will be passed to the directive.

            //define the link function - action to be performed by the directive using local scope
            contextMenu.link = function (scope, element, attrs) {

                element.on('click', function (event) {   //to enable this functionality on right mouse click we can replace 'click' with 'contextmenu'
                    scope.$apply(function () {
                        //event.preventDefault(); //if we were replacing right click then we had to disable the default context menu                
                        
                        var options = scope.tag //assigning the context menu array to a variable
                       
                        if (options instanceof Array) { //ensuring that it is a valid array
                            
                             //Render the Context Menu using array items.
                                        
                                            if (!$) { var $ = angular.element; }
                                            $(event.currentTarget).addClass('context');
                                            
                                            var $contextMenu = $('<div>');
                                            $contextMenu.addClass('dropdown clearfix');
                                            var $ul = $('<ul>');
                                            $ul.addClass('dropdown-menu');
                                            $ul.attr({ 'role': 'menu' });
                                            $ul.css({
                                                display: 'block',
                                                position: 'absolute',
                                                left: event.pageX + 'px',
                                                top: event.pageY + 'px'
                                            });
                                            angular.forEach(options, function (item, i) {
                                                var $li = $('<li>');
                                                if (item === null) {
                                                    $li.addClass('divider');
                                                } else {
                                                
                                                    $a = $('<a>');
                                                    $a.attr({ tabindex: '-1', href: '#' });
                                                    $a.text(item[0]);
                                                    $li.append($a);
                                                    $li.on('click', function () {
                                                        scope.$apply(function() {
                                                            item[1].call(scope, scope);
                                                        });
                                                    });
                                                }
                                                $ul.append($li);
                                            });
                                            $contextMenu.append($ul);
                                            $contextMenu.css({
                                                width: '100%',
                                                height: '100%',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                zIndex: 9999
                                            });

                                            //Attach context Menu to the body
                                            $(document).find('body').append($contextMenu);
                                            
                                            // Remove the Context Menu if user clicks somewhere else on the screen
                                            $contextMenu.on("click", function (e) {
                                                $(event.currentTarget).removeClass('context');
                                                $contextMenu.remove();
                                             })

                                            //Remove the context menu if user right clicks somewhere else on the screen
                                           // .on('contextmenu', function (event) {
                                            //     $(event.currentTarget).removeClass('context');
                                            //     event.preventDefault();
                                            //     $contextMenu.remove();
                                            // });
                                       // };

                        } else { //if it was not a valid array
                            throw '"' + attrs.ngContextMenu + '" correct menu could not be rendered';                    
                        }
                    });
                });
            };
            return contextMenu
        });//end of Directive Declaration
