module.exports = {
  content: [
    "./*.html",
    "./src/**/*.css",
    "./src/**/*.module.css",
    "./src/**/**/*.css",
    "./src/**/**/*.module.css",
  ],
  plugins: [require("@tailwindcss/forms")],
};
