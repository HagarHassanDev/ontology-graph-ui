import React, { Component } from "react";
import axios from "axios";


class CreateDomain extends Component {
    state={
        domainName : '' , 
    }


    changeHandler =(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        },
        );

    }

    submitHandler =(e)=>{
        e.preventDefault();      
        axios.post(`http://localhost:8080/api/domains/insert/${this.state.domainName}`)
            .then(response => { console.log(response) })
            .catch(error => {console.log(error) })

    }


    render() {
        var { domainName } = this.state
    
        return (
            <div className="container bg-white p-3 m-auto col-5">

                <form onSubmit={this.submitHandler} enctype="multipart/form-data" autoComplete="off">
                    <fieldset className="border p-3">
                        <legend className="w-auto p-2">Create New Domain</legend>              

                        <div className="form-group">
                            <label htmlFor="">Name </label>
                            <input type="text" className="form-control" name="domainName" placeholder="Name" value={domainName} onChange={this.changeHandler} />
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

export default CreateDomain ; 