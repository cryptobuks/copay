'use strict';
angular.module('copayApp.controllers').controller('ProfileController', function($scope, $rootScope, $location, $modal, backupService, identityService) {
  $scope.username = $rootScope.iden.getName();
  $scope.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

  $rootScope.title = 'Profile';
  $scope.hideAdv = true;

  $scope.downloadProfileBackup = function() {
    backupService.profileDownload($rootScope.iden);
  };

  $scope.viewProfileBackup = function() {
    $scope.backupProfilePlainText = backupService.profileEncrypted($rootScope.iden);
    $scope.hideViewProfileBackup = true;
  };
  
  $scope.deleteWallet = function(w) {
    if (!w) return;
    identityService.deleteWallet(w, function(err) {
      $scope.loading = false;
      if (err) {
        log.warn(err);
      }
    });
  };

  $scope.setWallets = function() {
    if (!$rootScope.iden) return;
    $scope.wallets=$rootScope.iden.listWallets();
  };


  $scope.downloadWalletBackup = function(w) {
    if (!w) return;
    backupService.walletDownload(w);
  }

  $scope.viewWalletBackup = function(w) {
    var ModalInstanceCtrl = function($scope, $modalInstance) {

      if (!w) return;
      $scope.backupWalletPlainText = backupService.walletEncrypted(w);
      $scope.hideViewWalletBackup = true;
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    };

    $modal.open({
      templateUrl: 'views/modals/backup-text.html',
      windowClass: 'tiny',
      controller: ModalInstanceCtrl
    });
  };

  $scope.deleteProfile = function () {

  };
});
