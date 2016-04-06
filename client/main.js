import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';
import '../imports/components/accounts/accounts-config.js';

angular.module('ChatApp', [angularMeteor, todosList.name,'accounts.ui']);