import React, { Component } from "react";
import axios from "axios";


class CreateOntology extends Component {
    state={
        ontologyName : '' , 
        cdomain : '' , 
        domain : {domainList : [] , isLoaded: false}
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
        }



    changeHandler =(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        },
        );

    }

    submitHandler =(e)=>{
        e.preventDefault();
        console.log(this.state);
      
        axios.post(`http://localhost:8080/api/ontologies/insert/${this.state.ontologyName}/${this.state.cdomain}`)
            .then(response => { console.log(response) })
            .catch(error => {console.log(error) })

    }


    render() {
        var { isLoaded, domainList } = this.state.domain;
        var {  ontologyName  , cdomain} = this.state
        if (!isLoaded) {
            return <div>Loading ... </div>
        }
        else {
        return (
            <div className="container bg-white p-3 m-auto col-5">

                <form onSubmit={this.submitHandler} enctype="multipart/form-data" autoComplete="off">
                    <fieldset className="border p-3">
                        <legend className="w-auto p-2">Create New Ontology</legend>

                        <div className="form-group">
                                <label htmlFor="domainSelect">Domain</label>
                                <select className="custom-select" onChange ={(e)=>this.changeHandler(e) } value={cdomain} name="cdomain" className="form-control" id="domainSelect">
                                    <option value="" disabled>Select domain</option>
                                    {domainList.map(item => (
                                        <option key={item.domainId} value={item.domainId}>{item.domainName}</option>
                                    ))}
                                </select>
                            </div>


                        <div className="form-group">
                            <label htmlFor="">Name </label>
                            <input type="text" className="form-control" name="ontologyName" placeholder="Name" value={ontologyName} onChange={this.changeHandler} />
                        </div>

                        <div className="form-group offset-sm-5">
                            <button type="submit" className="btn btn-outline-danger"><i className="fa fa-database"></i> Submit</button>
                        </div>
                    </fieldset>

                </form>
            </div>

        )
    }
}
}

export default CreateOntology; 