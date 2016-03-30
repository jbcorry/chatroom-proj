angular.module('myApp')
.directive('fileread', function (mainSvc,chatSvc,loginSvc) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {
        var reader = new FileReader();

        reader.onloadend = function (loadEvent) {



          var fileread = loadEvent.target.result;
          console.log('in the directive');
          var tempArray = elem[0].value.split('\\');
          var fileName = tempArray[tempArray.length - 1];
          mainSvc.storeImage(fileread, fileName)
          .then(function (result) {
            console.log(result);
            result.data.message = fileName;
            result.data.user = loginSvc.getCurrentUser();
            chatSvc.postMessage(result.data);
            // scope.messages.unshift(result.data);
            // console.log(scope.messages);
            scope.$emit('client message', result.data);
          })
          .catch(function (err) {
            console.error(err);
          });
        };
        console.log(changeEvent.target.files);
        if (changeEvent.target.files.size > 100000) {
          alert('Sorry! Your file is too big!');
        } else{

              if (changeEvent.target.files[0].name.split('.')[1] !== 'js' &&
                  changeEvent.target.files[0].name.split('.')[1] !== 'html' &&
                  changeEvent.target.files[0].name.split('.')[1] !== 'pdf') {

                      reader.readAsDataURL(changeEvent.target.files[0]);

              } else {
                reader.readAsBinaryString(changeEvent.target.files[0]);
              }

      }
      });
    }
  };
});
