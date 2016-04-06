import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js';
import { Meteor } from 'meteor/meteor';
 
import template from './todosList.html';
 
class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);
 
    this.helpers({
      tasks() {
        const selector = {};

        // If hide completed is checked, filter tasks
        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }

        // Show newest tasks at the top
        return Tasks.find({});
      },
      incompleteCount() {
        return Tasks.find({
          checked: {
            $ne: true
          }
        }).count();
      },
      currentUser() {
        return Meteor.user();
      }
    })
  }
  
  addTask(newTask) {
    // Insert a task into the collection
    Tasks.insert({
      text: newTask,
      createdAt: new Date,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
 
    // Clear form
    this.newTask = '';
  }
}
 

export default angular.module('todosList', [angularMeteor])
  .component('messages', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });