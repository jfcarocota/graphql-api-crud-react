import React, {Component} from 'react';
import { gql,  getApolloContext} from '@apollo/client';

import {Select} from 'semantic-ui-react';

const GET_BRANDS = gql`
    {
        brands{
            id
            name
        }
    }
`;

export default class BrandList extends Component{

    static contextType = getApolloContext();

    state = {
        brands: [],
        selectedOption: '',
        parentContext: this.props.parentContext ? this.props.parentContext : {id: ''}
    }

    componentDidMount = async ()=>{
        const { client } = this.context;
        const res = await client.query({ query: GET_BRANDS });
        this.setState({brands: res.data.brands.map(brand =>{
            return {
                key: brand.id,
                value: brand.id,
                text: brand.name
            }
        })});
    }

    handleSelect = (e, {value})=>{
        this.state.parentContext.setState({brandId: value});
        //console.log(this.state.parentContext);
    }

    render() {
        return (
            <Select placeholder='Select a brand' options={this.state.brands} onChange={this.handleSelect}/>
        );
    }
}