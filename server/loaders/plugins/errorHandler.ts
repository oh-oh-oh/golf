import fastify, {
  FastifyError,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';
import { ApiError, StatusCode } from '../../errors';

export const generateHandler =
  () => (err: FastifyError, req: FastifyRequest, res: FastifyReply) => {
    req.log.debug(err, 'ErrorHandler');
    if (err.statusCode === StatusCode.Unauthorized) {
      res.redirect('/login');
      return;
    }
    if (err instanceof ApiError) {
      res.code(err.statusCode).send({
        requestId: req.id,
        status: err.statusCode,
        type: err.type,
      });
      return;
    }
    req.log.error(err);
    const status = err.statusCode || StatusCode.InternalServerError;
    res.code(status).send({
      status,
      requestId: req.id,
    });
  };

const ErrorHandlerPlugin: FastifyPluginCallback = async (fastify, _) => {
  fastify.setErrorHandler(generateHandler());
};

export default fp(ErrorHandlerPlugin);
