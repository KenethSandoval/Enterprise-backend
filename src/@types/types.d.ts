type TMongoId = import('mongoose').Schema.Types.ObjectId;

type TMongoDocument = import('mongoose').Document;

type TResponse = import('express').Response;

type TRequest = import('express').Request;

type TNext = import('express').NextFunction;
 
type Handler = (
  req: TRequest,
  res: TResponse,
  next: import('express').NextFunction
) => Promise<TResponse | void> | TResponse | void;

/************************************* DECLARATIONS *************************************/

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}