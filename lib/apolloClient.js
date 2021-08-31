import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import withApollo from "next-with-apollo";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      credentials: "include",
      uri: "http://localhost:1337/graphql",
      headers: {
        cookie: headers?.cookie,
      },
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      const { apollo } = props;
      return (
        <ApolloProvider client={apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
