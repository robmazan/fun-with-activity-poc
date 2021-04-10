const resolvers = {
    Query: {
        recommendations: async ctx => {
            return [{
                priority: 42,
                recommendation: "test"
            }];
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
