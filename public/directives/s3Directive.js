angular.module('myApp')
.directive('fileread', function (mainSvc,chatSvc) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {
        var reader = new FileReader();

        reader.onloadend = function (loadEvent) {
          var fileread = loadEvent.target.result;
// console.log(elem);

          var tempArray = elem[0].value.split('\\');
          var fileName = tempArray[tempArray.length - 1];
          mainSvc.storeImage(fileread, fileName)
          .then(function (result) {
            // console.log(result.data);
            result.data.message = fileName;
            chatSvc.postMessage(result.data);
            // scope.messages.unshift(result.data);
            // console.log(scope.messages);
            scope.$emit('client message', result.data);
          })
          .catch(function (err) {
            console.error(err);
          });
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  };
});
