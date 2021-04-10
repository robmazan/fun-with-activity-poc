const { fetchRecommendations } = require("./aggregation");

const resolvers = {
    Query: {
        recommendations: async ctx => {
            return fetchRecommendations(ctx.arguments.input);
        }
    }
};

exports.handler = async (event) => {
    const typeHandler = resolvers[event.typeName];
    if (typeHandler) {
      const resolver = typeHandler[event.fieldName];
      if (resolver) {
        return await resolver(event);
      }
    }
    throw new Error("Resolver not found.");
};
