import angular from 'angular';

// Import our Controllers
import { Controller } from './controllers/controller';


angular
  .module('app', []) // Register our module (always first)
  .controller('Controller', Controller);