const services = [
  require("./service1.adapter"),
  require("./service2.adapter"),
];

exports.fetchRecommendations = async (params) => {
  const recommendations = await Promise.all(services.map(service => service.fetch(params)));
  return recommendations.flat().sort((r1, r2) => r2.priority - r1.priority);
};
