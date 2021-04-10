const { default: axios } = require("axios");

const SERVICE_URL = process.env.SERVICE1_URL;
const SERVICE_TOKEN = process.env.SERVICE1_API_TOKEN;

exports.fetch = async ({ height, weight }) => {
  const recommendations = (await axios.post(SERVICE_URL, {
    weight,
    height,
    token: SERVICE_TOKEN
  })).data || [];

  return recommendations.map(({ confidence, recommendation }) => ({
    priority: Math.round(confidence * 1000),
    recommendation: [recommendation]
  }));
};
