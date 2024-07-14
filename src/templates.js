const templates = [
  {
    name: "Axum",
    description: "Axum template for Solana Blinks by Solana Developers",
    repo: "https://github.com/solana-developers/solana-actions",
    path: "examples/axum",
  },
  {
    name: "Express",
    description: "Express template for Solana Blinks by Solana Developers",
    repo: "https://github.com/solana-developers/solana-actions",
    path: "examples/express",
  },
  {
    name: "NextJS Basic",
    description:
      "Basic NextJS template for Solana Blinks from Solana Developers",
    repo: "https://github.com/solana-developers/solana-actions",
    path: "examples/next-js",
  },
  {
    name: "NextJS",
    description: "NextJS template for Solana Blinks by Arihant",
    repo: "https://github.com/arihantbansal/solana-actions-template",
    path: "",
  },

  // Add more templates here
];

export function getTemplates() {
  return templates;
}
