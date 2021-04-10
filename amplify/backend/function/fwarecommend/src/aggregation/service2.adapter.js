const { default: axios } = require("axios");
const crypto = require("crypto");

const SERVICE_URL = process.env.SERVICE2_URL;

exports.fetch = async ({ height, weight, dob }) => {
  const [year, month, day] = dob.split("-");
  const birthDate = new Date(year, month - 1, day);
  const recommendations = (await axios.post(SERVICE_URL, {
    measurements: {
      mass: weight * 2.205,
      height: height / 30.48,
    },
    birth_date: Math.round(birthDate.valueOf() / 1000),
    session_token: crypto.randomBytes(16).toString("hex"),
  })).data || [];

  return recommendations.map(({ priority, title, details }) => ({
    priority,
    recommendation: [title, details]
  }));
};
