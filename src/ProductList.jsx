import React, {Component} from 'react';
import { gql,  getApolloContext} from '@apollo/client';
import { Fragment } from "react";
import {Header, Icon, List, Divider, Table, TableBody, Button} from 'semantic-ui-react';


const GET_PRODUCTS = gql`
  {
    products{
      id
      name
      price
      descp
      brand{
        id
        name
      }
    }
  }
`;

export default class ProductLsit extends Component{

    state = {
        products: []
    }

    static contextType = getApolloContext();

    componentDidMount = async ()=>{
        const { client } = this.context;
        const res = await client.query({ query: GET_PRODUCTS });
        this.setState({products: res.data.products});
        //console.log(this.state.products);
    };

    render() {
        return (
            <Fragment>
              <Divider horizontal>
                <Header as='h4'>
                  <Icon name='list' />
                  Product List
                </Header>
              </Divider>

                <div>
                  <List celled>
                    {this.state.products.map(product => {
                      return <List.Item key={product.id}>
                        <List.Content>
                          <Divider hidden/>
                          <List.Header as='h3'>
                            {product.name} 
                          </List.Header>
                          <Divider hidden/>
                          <Button animated onClick={()=> console.log('click')}>
                            <Button.Content visible>Inspect</Button.Content>
                            <Button.Content hidden>
                              <Icon name='edit' />
                            </Button.Content>
                          </Button>
                          <Table definition>
                            <TableBody>
                              <Table.Row>
                                <Table.Cell width={2}>Price</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Brand</Table.Cell>
                                <Table.Cell>{product.brand.name}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Description</Table.Cell>
                                <Table.Cell>{product.descp}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>#Identifier</Table.Cell>
                                <Table.Cell>{product.id}</Table.Cell>
                              </Table.Row>
                            </TableBody>
                          </Table>
                          <Divider hidden/>
                        </List.Content>
                      </List.Item>
                    })}
                  </List>
                  <Divider hidden/>
                </div>
            </Fragment>
        );
    }
}