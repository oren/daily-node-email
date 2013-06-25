'use strict';

function Scan($scope) {
  $scope.scanning = false;

  $scope.scan = function () {
    $scope.scanning = true;
  };
}
