const { mapSchema, getDirective, MapperKind } = require("@graphql-tools/utils");
const { ApolloError } = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

exports.isAuthDirectiveTransformer = (schema, directiveName) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const upperDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];

      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async (source, args, context, info) => {
          const { isAuth } = context.req;

          if (isAuth) {
            const result = await resolve(source, args, context, info);
            return result;
          } else {
            throw new ApolloError(
              "You must be the authenticated user to get this information"
            );
          }
        };
        return fieldConfig;
      }
    },
  });
};
