import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({
  models: {
    menu: Model,
    project: Model,
  },

  seeds(server) {
    server.create("project", {
    id: "1",
    name: 'Menu Standard',
    alias: 'IB',
    description: 'IB',
    createdAt: new Date('2021-02-12')
  })

    server.create("menu", {
      id: "1",
      name: 'Menu Standard',
      application: 'IB',
      createdAt: new Date('2021-02-12')
    })

    server.create("menu", {
      id: "2",
      name: 'Menu Default',
      application: 'IOS',
      createdAt: new Date('2021-02-12')
    })
  },

  routes() {
    this.namespace = "api";

    this.get('/projects', (schema) => {
      return schema.projects.all();
    })

    this.get('/menus', (schema) => {
      return schema.menus.all();
    })

    this.post('/menus', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('menu', data);
    })

    this.delete('/menus/:id', (schema, request) => {
      const id = request.params.id;
      schema.menus.find(id).destroy();
      return schema.menus.all();
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);