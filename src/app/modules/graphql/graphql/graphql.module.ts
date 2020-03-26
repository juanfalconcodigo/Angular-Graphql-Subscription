import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloModule, Apollo } from 'apollo-angular';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

@NgModule({
  declarations: [],
  exports: [
    HttpClientModule,
    HttpLinkModule,
    ApolloModule
  ]

})

/* 'http://localhost:5200/graphql'
'ws://localhost:5200/graphql' */
export class GraphqlModule {
  constructor(private apollo: Apollo, private httpClient: HttpClient) {
    //configurar url principal con el link 
    const httpLink = new HttpLink(httpClient).create({
      uri: 'https://me-node-typescript-graphql.herokuapp.com/graphql'
    });
    //configurar el websocket con el link
    const subscriptionLink = new WebSocketLink({
      uri: 'wss://me-node-typescript-graphql.herokuapp.com/graphql',
      options: {
        reconnect: true
      }
    });
    //unir las 2 conexiones
    const link = split(
      ({ query }) => {
        const { kind, operation }: Definition = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      subscriptionLink,
      httpLink
    );
    //Crear conexión
    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}

interface Definition {
  kind: string;
  operation?: string;
};