import React, { Component } from "react";
import axios from "axios";

import FormRowArray from "./FormRowArray";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: { domainList: [], isLoaded: false },
            concept: { conceptList: [] },
            dselectedvalue: { value: '', changed: false },
            relationList: [],
            items: [{}],
            termItems: [{}],
            ccode: '',
            cname: '',
            cdescription: '',
            cdepth: "",
            cdomain: '',
            term: [],
            termDef: [],
            rel: [],
            consWith: [],
            other: false,
            items: ['']


        }
    }

    componentDidMount() {
        fetch('http://ec2-34-245-120-121.eu-west-1.compute.amazonaws.com:8080/api/domains')
            .then(res => res.json())
            .then(json => {
                this.setState(
                    prevState => ({
                        domain: { domainList: json, isLoaded: true }
                    }));
            });


        fetch('http://ec2-34-245-120-121.eu-west-1.compute.amazonaws.com:8080/api/relations')
            .then(res => res.json())
            .then(json => {
                this.setState(
                    {
                        relationList: json
                    });
            });
    }


    handleDomainChange = (e) => {
        this.setState(
            {
                dselectedvalue: { value: e.target.value, changed: true }
            });
        fetch(`http://ec2-34-245-120-121.eu-west-1.compute.amazonaws.com:8080/api/concepts?domainId=${this.state.dselectedvalue.value}`)
            .then(res => res.json())
            .then(json => {
                this.setState(
                    {
                        concept: { conceptList: json }
                    });
            });
    }

    handleConceptChange = (e) => {

        if (e.target.value === "") {
            this.setState({
                other: true
            });
        } else {
            this.setState({
                other: false
            })
        }

    }


    addItem = () => {
        this.setState(prevState => ({
            items: prevState.items.concat('')
          }))
    }


    removeItem = (index , e) => {
        var copyItems = Object.assign([] , this.state.items);
        copyItems.splice(index , 1);
        this.setState({
            items : copyItems
        })
    }

    addItemTerm = () => {
        var { termItems } = this.state;
        termItems.push({});
        this.setState({ termItems });
    }

    removeItemTerm = (index) => {
        var { termItems } = this.state;
        termItems.splice(index, 1);
        this.setState({ termItems });
    }


    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        },
        );
    }


    submitHandler = e => {
        e.preventDefault();
     
   axios.post(`http://localhost:8080/api/concepts/insert/${this.state.cname}/${this.state.cdescription}/${this.state.cdepth}/${this.state.cdomain}/${this.state.term}/${this.state.termDef}/${this.state.rel}/${this.state.consWith}`)
            .then(res => console.log(res)).catch(err => console.log(err));
    }
    render() {
        var { isLoaded, domainList } = this.state.domain;
        var {  conceptList } = this.state.concept;
        var {  termItems, term, termDef, cdepth, cdescription, cdomain,  cname } = this.state;
        
        if (!isLoaded) {
            return <div>Loading ... </div>
        }
        else {
            return (
                <div className="container bg-white p-3 m-auto col-8" >


                    <form onSubmit={this.submitHandler} >
                        <fieldset className="border p-3">
                            <legend className="w-auto p-2">Create New Concept </legend>
                            <div className="form-group">
                                <label htmlFor="domainSelect">Domain</label>
                                <select className="custom-select" onChange={(e) => { this.handleDomainChange(e); this.changeHandler(e) }} value={cdomain} name="cdomain" className="form-control" id="domainSelect">
                                    <option value="" disabled>Select domain</option>
                                    {domainList.map(item => (
                                        <option key={item.domainId} value={item.domainId}>{item.domainName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="conceptSelect">Concept Name</label>
                                <select className="custom-select" className="form-control" onChange={(e) => { this.handleConceptChange(e); this.changeHandler(e) }} value={cname} name="cname" id="conceptSelect" >
                                    <option value="" disabled>Select Concept</option>
                                    {(conceptList || []).map(item => (
                                        <option key={item.conceptId} value={item.conceptId}>{item.conceptName}</option>
                                    ))}
                                    <option value="" >Other</option>
                                </select>
                            </div>

                            {this.state.other ?
                                <div className="form-group">
                                    <label htmlFor="cname">New Concept Name</label>
                                    <input type="text" className="form-control" id="cname" onChange={this.changeHandler} placeholder="concept Name" name="cname" value={cname} />
                                </div> : null}


                            <div className="form-group">
                                <label htmlFor="cDescription"> Description</label>
                                <input type="text" className="form-control" id="cDescription" value={cdescription} name="cdescription" placeholder="description" onChange={this.changeHandler} />
                            </div>

                            <div>
                                <FormRowArray  items={this.state.items} addItem ={this.addItem} removeItem={this.removeItem.bind(this)} relationList={this.state.relationList} conceptList={this.state.concept.conceptList}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="cDepth"> Depth</label>
                                <input type="text" className="form-control" id="cDepth" value={cdepth} name="cdepth" placeholder="depth" onChange={this.changeHandler} />
                            </div>


                            <div className="form-group">
                                <span className=" btn-warning p-2 rounded-bottom rounded-top" >Add Terminology</span>
                            </div>

                            {termItems.map((item, k) => (

                                <div className="row m-3" >
                                    <div className="col">
                                        <input type="text" className="form-control " placeholder="Term Name"  name={`term${k}`} onChange={this.changeHandler} />
                                    </div>
                                    <div className="col" >
                                        <input type="text" className="form-control" placeholder="Term Definition"  name={`termDef${k}`} onChange={this.changeHandler} />
                                    </div>

                                    <button type="button" className="btn btn-sm btn-outline-success mr-1" onClick={this.addItemTerm} >+</button>
                                    <button type="button" className="btn btn-sm btn-outline-danger " onClick={this.removeItemTerm}>-</button>
                                </div>
                            ))}

                            <div className="form-group offset-sm-5">

                                <button type="submit" className="btn btn-sm btn-outline-success " >Submit</button>
                            </div>
                        </fieldset>
                    </form>


                </div>
            );
        }
    }
}

export default Form;