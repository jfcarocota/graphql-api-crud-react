import React, {Component} from 'react';
import { gql,  getApolloContext} from '@apollo/client';
import {Header, Input, Divider, Icon} from 'semantic-ui-react';

const GET_PRODUCT_BY_ID = gql`
    query($id: ID!){
        product(id: $id){
            name
            price
            descp
            brand{
                name
            }
        }
    }
`;

export default class ProductSearch extends Component{

    state = {
        id: ''
    }

    static contextType = getApolloContext();

    search = async ()=>{
        const { client } = this.context;
        const res = await client.query({ 
            query: GET_PRODUCT_BY_ID, 
            variables: {
                id: this.state.id
            } 
        });
        console.log(res.data.product);
    };  

    render() {
        return (
            <div>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='search' />
                        Serach Product
                    </Header>
                </Divider>

                <Input action={{content: 'Search', onClick:()=>{this.search()} }} 
                placeholder='Search...' onChange={e => this.setState({id: e.target.value})}/>
            </div>
        );
    }
}