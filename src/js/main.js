import angular from 'angular';

// Import our Controllers
import { Controller } from './controllers/controller';
import { SERVER } from './server';


angular
  .module('app', []) // Register our module (always first)
  .constant('SERVER', SERVER)
  .controller('Controller', Controller);