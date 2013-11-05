angular.module('angularFinalApp')
  .directive('animatedShow', function ($rootScope) {
    return {
      scope: {
        animatedShow: '=',
        effect: '=',
        completeShow: '&',
        completeHide: '&',
      },
      link: function (scope, element, attrs) {
        scope.$watch('animatedShow', function(newVal, oldVal) {
          if (newVal) {
            element.show({
              effect: scope.effect,
              complete: function () {
                if (completeShow){
                  // This SO post has information about dealing with
                  // the $digest in progress error.
                  // (http://stackoverflow.com/questions/12729122
                  // /prevent-error-digest-already-in-progress-when-
                  // calling-scope-apply) I noticed this was only
                  // happening on the first iteration, and all
                  // following clicks to the toggle service went off
                  // without a hitch. The SO post also links to some
                  // comments on the Angular JS github page that
                  // suggests that this kind of checking (to see if
                  // a digest is in progress) is NOT a good
                  // practice, in general. I think it's defensible
                  // here.

                  if (!($rootScope.$$phase || $rootScope.$apply())) {
                    scope.$apply(function () {
                      scope.completeShow();
                    })
                  }
                }
              }
            });
          } else {
            element.hide({
              effect: scope.effect,
              complete: function () {
                if (completeHide){
                  scope.$apply(function () {
                    scope.completeHide();
                  });
                } 
              }
            });
          }
        });
      }
    };
  });