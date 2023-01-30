const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/pizza-reviewer_development",
      test: "postgres://postgres:postgres@localhost:5432/pizza-reviewer_test",
      e2e: "postgres://postgres:postgres@localhost:5432/pizza-reviewer_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
