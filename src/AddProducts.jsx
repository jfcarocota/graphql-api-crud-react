import React, {Component} from 'react';
import { gql,  getApolloContext} from '@apollo/client';

import {Input, Label, Divider, TextArea, Form, FormField, Header, Button, Icon} from 'semantic-ui-react';
import BrandList from './BrandList';

const ADD_PRODUCT = gql`
    mutation($name: String!, $price: Float!, $descp: String!, $brandId: ID!){
        addProduct(name: $name, price: $price, descp: $descp, brandId: $brandId){
            name
            price
            descp
            brand{
                name
            }
        }
    }
`;

export default class AddProduct extends Component{

    state = {
        name: '',
        price: '',
        descp: '',
        brandId: ''
    }

    static contextType = getApolloContext();

    saveProduct = ()=>{
        //console.log(this.state);
        const {name, price, descp, brandId} = this.state;
        const {client} = this.context;
        //console.log(price);
        client.mutate({
            mutation: ADD_PRODUCT, 
            variables: {
                name: name,
                price: price,
                descp: descp,
                brandId: brandId
            }
        }).then(result => console.log(result))
        .catch((error) => { console.log(error); });
        //console.log(res.data.product);
    }

    catchName = e => this.setState({name: e.target.value});
    catchPrice = e => this.setState({price: parseFloat(e.target.value)});
    catchDescp = e => this.setState({descp: e.target.value});

    render() {
        return (
             <div>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='book' />
                        Add New Product
                    </Header>
                </Divider>

                <Form>
                    <FormField>
                        <Input label='Name' placeholder='product name' onChange={this.catchName}/>
                    </FormField>
                    <FormField>
                        <Input labelPosition='right' type='number' placeholder='Price' onChange={this.catchPrice}>
                            <Label basic>$</Label>
                            <input />
                            <Label>MXN</Label>
                        </Input> 
                    </FormField>
                    <FormField>
                        <BrandList parentContext={this}/>
                    </FormField>
                    <FormField>
                        <Header as='h4'>Description</Header>
                        <TextArea placeholder='Tell us more' onChange={this.catchDescp}/>
                    </FormField>
                    <Divider hidden/>
                    <Button primary onClick={this.saveProduct}>Save</Button>
                    <Divider hidden/>
                </Form>
             </div>
        );
    }
}