/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('sessions', 'SessionController.store');
Route.post('forgot', 'ForgotPasswordController.store');
Route.post('reset', 'ResetPasswordController.store');

Route.group(() => {
  Route.get('users', 'UserController.index');
  Route.post('users', 'UserController.store');
  Route.put('users/:id', 'UserController.update');
  Route.delete('users/:id', 'UserController.destroy');
  Route.post('roles', 'RoleController.store');
  Route.post('users/:id/role', 'RoleController.assign');
}).middleware(['auth']);
