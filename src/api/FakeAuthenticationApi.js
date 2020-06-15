function wait(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const FakeAuthenticationApi = {
  login: async function (credentials) {
    await wait(1000);
    const { email, password } = credentials;
    if ((email === "bob@op.pl" && password === "secret")) {
      return {
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvYkBleGFtcGxlLmNvbSIsImlhdCI6MTU4OTg3OTkxNywiZXhwIjoxNTg5ODgzNTE3LCJzdWIiOiIyIn0.BRhgk1nXn4eDRrwei_No0EVom6uv8feCTOYLGOl-j1E",
      };
    }
  },
};

export default FakeAuthenticationApi;
