class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
/**
1.class ErrorHandler extends Error {: This line defines a new class called ErrorHandler that extends the built-in Error class.

2.constructor(message, statusCode) {: This is the constructor method for the ErrorHandler class. It takes two parameters: message (the error message) and statusCode (the HTTP status code for the error).

3.super(message);: This line calls the constructor of the parent class (Error) and passes the message parameter to it. This sets the error message for the custom error object.

4.this.statusCode = statusCode;: This line adds a new property called statusCode to the custom error object, setting its value to the statusCode parameter passed to the constructor.

5.Error.captureStackTrace(this, this.constructor);: This line captures the stack trace for the custom error object. The captureStackTrace method is a static method of the Error class that takes two parameters: the error object (this) and the constructor function (this.constructor). This helps in debugging and provides more information about the error's origin.
 */
