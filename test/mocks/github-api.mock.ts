import * as github from "./@actions/github.mock";


const client = new github.GitHub();


export const getPrFile = jest.fn(async (_, path) => {
  const { data } = await client.repos.getContents({ path });
  return {
    path: data.path,
    content: data.content,
    encoding: data.encoding,
  };
}).mockName("github-api.getPrFile");

export const getPrFiles = jest.fn(async (_, prNumber) => {
  const { data } = await client.pulls.listFiles({
    pull_number: prNumber, /* eslint-disable-line @typescript-eslint/camelcase */
  });

  return data.map(details => ({
    path: details.filename,
    status: details.status,
  }));
}).mockName("github-api.getPrFiles");

export const getPrNumber = jest.fn().mockReturnValue(42).mockName("github-api.getPrNumber");
