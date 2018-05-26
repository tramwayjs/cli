Contributions are welcome!

To contribute
1. Please open a ticket describing the changes you want to make
2. Write a quick set of tests with the goal of finding out when a change will break it for someone who relies on it
    - Project uses mocha runner and Node's Assert library (run with `npm test`)
3. Use JSDoc on all methods and classes and use correct types. This is important for VSCode's hinting.
4. File a pull request linked to that ticket and indicate what kind of changes were made
5. Please include some high level documentation on your feature, how to use it and what its benefit is.

Some things to know about this project:
1. It uses ES2015 and runs on Node v6+ (It may run on older versions but support hasn't been tested)
2. The npm package itself will contain transpiled ES5 code
3. Unit testing is encouraged using Mocha

If you're using VSCode, here are some handy plugins:
1. Add jsdoc comments by stevencl v0.0.8+
2. Document This by Joel Day v0.3.4+